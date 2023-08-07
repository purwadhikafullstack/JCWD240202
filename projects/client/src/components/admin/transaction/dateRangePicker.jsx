import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = (props) => {
    // const a = props?.data?.startDate
    // const b = props?.data?.endDate
    // if (a && b) {
    //     var start = a.getTime()
    //     var end = b.getTime()
    // }
    // console.log(start, end)

    // if (props?.data?.endDate) {
    //     console.log('masukkkkk')
    //     var end = props?.data?.endDate.getTime()
    // }
    // console.log(start, end)
    return (
        <DatePicker
            type='date'
            className='input input-bordered h-9 w-[220px]'
            selected={props.data.startDate}
            onChange={props.data.handleDateChange}
            startDate={props.data.startDate}
            endDate={props.data.endDate}
            selectsRange
            placeholderText='Search by date range'
        />
    );
};

export default DateRangePicker;
