import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class SelectDate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment().toDate()
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: this.props.startDate
        });

        console.log(this.state.startDate);

        let formatted_date = ("0" + date.getDate()).slice(-2) + "." + ("0" + (date.getMonth()+1)).slice(-2) + "." + date.getFullYear();
        this.props.onChange(formatted_date);
    }

    render() {
        return (
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                dateFormat="dd.MM.YYYY"
                filterDate={(date) => {
                   return moment() > date;
                }}
            />
        )
    }
}

export default SelectDate;