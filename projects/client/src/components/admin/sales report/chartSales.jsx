import { Select } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { AiOutlineAreaChart } from 'react-icons/ai';
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getChartDataAsync } from '../../../redux/features/reportSlice';
import SkeletonSalesChart from './skeletonSalesChart';

export default function ChartSales(props) {
    const dispatch = useDispatch();
    const [chosenTime, setChosenTime] = useState('daily');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedYear, setSelectedYear] = useState(new Date());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const chartData = useSelector((state) => state.report.chartData);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setYear(date.getFullYear());
        setMonth(date.getMonth() + 1);
    };

    const handleYearChange = (date) => {
        setSelectedYear(date);
        setMonth('');
        setYear(date.getFullYear());
    };

    useEffect(() => {
        dispatch(
            getChartDataAsync({
                month: month,
                year: year,
                warehouse_id: props?.data?.warehouseId,
            }),
        );
    }, [month, year, chosenTime, props?.data?.warehouseId]);
    return (
        <>
            {props?.data?.loading ? (
                <div className="shadow-lg flex-1 w-full h-inherit bg-white rounded-2xl p-4 flex flex-col justify-between">
                    <div className="flex-1 sm:flex justify-between">
                        <div className="flex gap-2 items-center">
                            <div>
                                <AiOutlineAreaChart size={36} />
                            </div>
                            <div className="text-xl font-bold">Sales Chart</div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div>
                                <Select
                                    onChange={(e) => {
                                        setChosenTime(e.target.value);
                                        setYear(new Date().getFullYear());
                                        if (e.target.value === 'monthly') {
                                            setMonth('');
                                            setSelectedYear(new Date());
                                        } else if (e.target.value === 'daily') {
                                            setMonth(new Date().getMonth() + 1);
                                            setSelectedDate(new Date());
                                        }
                                    }}
                                >
                                    <option value={'daily'}>Daily</option>
                                    <option value={'monthly'}>Monthly</option>
                                </Select>
                            </div>
                            <div>
                                {chosenTime === 'monthly' ? (
                                    <DatePicker
                                        type="date"
                                        className="input input-bordered h-11 w-[150px] hover:cursor-pointer"
                                        onChange={handleYearChange}
                                        showYearPicker
                                        dateFormat={'yyyy'}
                                        placeholderText="Choose Year"
                                        selected={selectedYear}
                                    />
                                ) : chosenTime === 'daily' ? (
                                    <DatePicker
                                        type="date"
                                        className="input input-bordered h-11 w-[150px] hover:cursor-pointer"
                                        onChange={handleDateChange}
                                        showMonthYearPicker
                                        dateFormat={'MMMM yyyy'}
                                        placeholderText="Choose Month"
                                        selected={selectedDate}
                                    />
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                    </div>
                    {console.log(chartData)}
                    {chosenTime === 'daily' ? (
                        <div className="h-[500px] w-full overflow-x-auto">
                            <ResponsiveContainer width={'99%'} height={'99%'}>
                                <LineChart
                                    width={1100}
                                    height={400}
                                    data={chartData?.data}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="5 5" />
                                    <XAxis dataKey="date" />
                                    <YAxis
                                        type="number"
                                        domain={['auto', chartData?.highestVal]}
                                        allowDataOverflow={true}
                                    />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="total"
                                        stroke="#0369a1"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    ) : chosenTime === 'monthly' ? (
                        <div className="h-[500px] w-full overflow-x-auto">
                            <ResponsiveContainer width={'99%'} height={'99%'}>
                                <LineChart
                                    width={1100}
                                    height={400}
                                    data={chartData?.data}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="5 5" />
                                    <XAxis dataKey="monthYear" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="total"
                                        stroke="#0369a1"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            ) : (
                <SkeletonSalesChart />
            )}
        </>
    );
}
