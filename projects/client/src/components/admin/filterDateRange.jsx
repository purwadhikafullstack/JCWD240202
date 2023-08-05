import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

export default function FilterDate({ data }) {
    const handleDates = (startDate, endDate) => {
        data.filterDate(startDate, endDate);
    };

    const initialRange = [
        data.startDate ? data.startDate : 'Start Date',
        data.endDate ? data.endDate : 'End Date',
    ];

    return (
        <>
            <div className="">
                <div className="relative">
                    <RangePicker
                        style={{ width: '100%' }}
                        placeholder={initialRange}
                        showClose={false}
                        onChange={(values) => {
                            const startDate = values
                                ? values[0]?.format('YYYY-MM-DD')
                                : '';
                            const endDate = values
                                ? values[1]?.format('YYYY-MM-DD')
                                : '';
                            handleDates(startDate, endDate);
                        }}
                    />
                </div>
            </div>
        </>
    );
}
