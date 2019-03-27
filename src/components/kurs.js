import React from 'react';

class Kurs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currency: this.props.currency,
            middleValue: this.props.middleValue
        };
    }

    render() {
        return(
            <li>
                <img src={process.env.PUBLIC_URL +"/flags/"+this.state.currency+".jpg"} alt={this.state.currency} /> {this.state.currency} = {this.state.middleValue} денари
            </li>
        );
    }
}

export default Kurs;