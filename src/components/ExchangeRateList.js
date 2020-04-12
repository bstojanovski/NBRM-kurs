import React from 'react';
import ExchangeRate from './ExchangeRate';
import SelectDate from './SelectDate';
import moment from 'moment';
var convert = require('xml-js');

class ExchangeRatesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            error: null,
            isLoaded: false,
            items: []
        };
        this.readData = this.readData.bind(this);
    }

    readData(date) {
        // Format date for API
        let formatted_date = moment(date).format('DD.MM.YYYY');
        var params = 'startDate='+formatted_date+'&endDate='+formatted_date+'&isStateAuth=1';

        this.setState({
            startDate: date,
            endDate: date,
            isLoaded: false
        });

        fetch('https://cors-anywhere.herokuapp.com/http://www.nbrm.mk/services/ExchangeRates.asmx/GetEXRates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        })
        .then(res => res.text())
        .then(
            (result) => {
                var xml = JSON.parse(convert.xml2json(result, {compact: true, spaces: 2, nativeType: true, nativeTypeAttributes: true, trim: true, textKey: "text"}));

                this.setState({
                    isLoaded: true,
                    items: xml.ArrayOfExchangeRatesByDay.ExchangeRatesByDay.ExchangeRates.ExchangeRateStateAuthoritiesModel
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    componentDidMount() {
        // Get data initially for today
        this.readData(new Date());
    }

    render() {
        const { error, isLoaded, items } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <SelectDate selectedDate={this.state.startDate} readData={this.readData} />
                    <ul>
                        {items.map(item => (
                            <ExchangeRate key={item.Valuta.text} currency={item.Oznaka.text} middleValue={item.Sreden.text} />
                        ))}
                    </ul>
                </div>
            );
        }
    }
}

export default ExchangeRatesList;