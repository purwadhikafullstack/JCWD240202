import { Select, Label } from 'flowbite-react';

export default function FilterMonth() {
    const month = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    return (
        <>
            <div>
                <Label>Showing : </Label>
                <Select>
                    <option>Choose Month</option>
                    {month?.map((value, index) => {
                        return <option>{value}</option>;
                    })}
                </Select>
            </div>
        </>
    );
}
