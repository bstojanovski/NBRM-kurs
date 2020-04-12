import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class SelectDate extends React.Component {
    handleChange = date => {
        this.props.readData(date);
    }

    render() {
        return (
            <DatePicker
                selected={this.props.selectedDate}
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