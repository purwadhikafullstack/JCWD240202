import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = (props) => {

    return (
        <DatePicker
            type="date"
            className="input input-bordered h-9 w-[220px]"
            selected={props.data.startDate}
            onChange={props.data.handleDateChange}
            startDate={props.data.startDate}
            endDate={props.data.endDate}
            selectsRange
            placeholderText="Search by date range"
        />
    );
};

export default DateRangePicker;
