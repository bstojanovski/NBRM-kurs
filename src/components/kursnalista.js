import React from 'react';
import Kurs from './kurs.js';
var convert = require('xml-js');

class KursnaLista extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: "27.03.2019",
            endDate: "27.03.2019",
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        var params = 'startDate='+this.state.startDate+'&endDate='+this.state.startDate+'&isStateAuth=1';

        fetch('https://cors-anywhere.herokuapp.com/http://www.nbrm.mk/services/ExchangeRates.asmx/GetEXRates', {
                method: 'POST',
                headers: {
                    'Origin': 'http://www.nbrm.mk',
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

    render() {
        const { error, isLoaded, items } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {items.map(item => (
                        <Kurs key={item.Valuta.text} currency={item.Oznaka.text} middleValue={item.Sreden.text} />
                    ))}
                </ul>
            );
        }
    }
}

export default KursnaLista;