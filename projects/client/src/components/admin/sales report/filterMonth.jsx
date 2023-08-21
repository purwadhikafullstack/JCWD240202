import { Label } from 'flowbite-react';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function FilterMonth(props) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
        props?.state?.setMonth(date?.getMonth() + 1);
        props?.state?.setYear(date?.getFullYear());
    };

    return (
        <>
            <div className="flex flex-col justify-center">
                <Label>Choose Month :</Label>
                <DatePicker
                    type="date"
                    className="input input-bordered h-11 w-[220px] hover:cursor-pointer"
                    onChange={handleDateChange}
                    showMonthYearPicker
                    dateFormat={'MMMM yyyy'}
                    placeholderText="Search"
                    selected={selectedDate}
                />
            </div>
        </>
    );
}
