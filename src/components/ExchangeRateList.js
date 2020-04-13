import React from 'react';
import ExchangeRate from './ExchangeRate';
import SelectDate from './SelectDate';
import CurrencyGraph from './CurrencyGraph';
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

    readData(startDate, endDate) {
        // Format date for API
        var formattedStartDate = moment(startDate).format('DD.MM.YYYY');
        var formattedEndDate = moment(endDate).format('DD.MM.YYYY');
        var params = 'startDate='+formattedStartDate+'&endDate='+formattedEndDate+'&isStateAuth=1';

        this.setState({
            startDate: startDate,
            endDate: endDate,
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
                let range = false;
                let currencies = [];

                // If it's a different start & end date then we get a range of days with data
                if(formattedStartDate !== formattedEndDate) {
                    range = true;
                    xml.ArrayOfExchangeRatesByDay.ExchangeRatesByDay.forEach(day => {
                        var currencyDate = day['Date'].text.split('T')[0];

                        day.ExchangeRates.ExchangeRateStateAuthoritiesModel.forEach((element) => {
                            var data = [];
                            var dataItem = [];
                            var currency = {};

                            currency['label'] = element['Oznaka'].text;
                            dataItem[0] = new Date(currencyDate);
                            dataItem[1] = element['Sreden'].text;

                            data.push(dataItem);
                            currency['data'] = data;
                            currencies.push(currency);
                        });
                        
                        // Filter out array
                        var seen = {};
                        currencies = currencies.filter(function(entry) {
                            var previous;
                        
                            // Have we seen this label before?
                            if (seen.hasOwnProperty(entry.label)) {
                                previous = seen[entry.label];
                                previous.data.push(entry.data[0]);

                                return false;
                            }
                        
                            if (!Array.isArray(entry.data)) {
                                entry.data = [entry.data];
                            }
                            seen[entry.label] = entry;

                            return true;
                        });
                    });
                } else {
                    currencies = xml.ArrayOfExchangeRatesByDay.ExchangeRatesByDay.ExchangeRates.ExchangeRateStateAuthoritiesModel;
                }

                this.setState({
                    isLoaded: true,
                    isRange: range,
                    items: currencies
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
        this.readData(new Date(), new Date());
    }

    render() {
        const { error, isLoaded, items } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            if(this.state.isRange === false) {
                return (
                    <div>
                        <SelectDate startDate={this.state.startDate} endDate={this.state.endDate} readData={this.readData} /><br/>
                        <ul>
                            {items.map(item => (
                                <ExchangeRate key={item.Valuta.text} currency={item.Oznaka.text} middleValue={item.Sreden.text} />
                            ))}
                        </ul>
                    </div>
                );
            } else {
                return (
                    <div>
                        <SelectDate startDate={this.state.startDate} endDate={this.state.endDate} readData={this.readData} /><br/>
                        <CurrencyGraph graphData={this.state.items} />
                    </div>
                );
            }
        }
    }
}

export default ExchangeRatesList;