import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class SelectDate extends React.Component {
    changeStartDate = date => {
        this.props.readData(date, this.props.endDate);
    }

    changeEndDate = date => {
        this.props.readData(this.props.startDate, date);
    }

    render() {
        return (
            <>
              <DatePicker
                selected={this.props.startDate}
                onChange={this.changeStartDate}
                selectsStart
                startDate={this.props.startDate}
                endDate={this.props.endDate}
                dateFormat="dd.MM.YYYY"
                filterDate={(date) => {
                   return moment() > date;
                }}
              />
              <DatePicker
                selected={this.props.endDate}
                onChange={this.changeEndDate}
                selectsEnd
                startDate={this.props.startDate}
                endDate={this.props.endDate}
                minDate={this.props.startDate}
                dateFormat="dd.MM.YYYY"
                filterDate={(date) => {
                   return moment() > date;
                }}
              />
            </>
        )
    }
}

export default SelectDate;