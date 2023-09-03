import { useEffect } from 'react';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getTotalMonthlySalesAsync } from '../../../redux/features/reportSlice';
import SkeletonDashboard from './skeletonDashboard';

export default function Income(props) {
    const dispatch = useDispatch();
    const income = useSelector((state) => state.report.totalSales);
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    useEffect(() => {
        dispatch(
            getTotalMonthlySalesAsync({
                month,
                year,
                warehouse_id: '',
            }),
        );
    }, []);

    return (
        <>
            {props?.data?.loading ? (
                <div className="w-full h-full p-4 bg-white rounded-2xl shadow-xl">
                    <div className="flex gap-4 items-center">
                        <div>
                            <RiMoneyDollarCircleLine size={35} />
                        </div>
                        <div className="font-bold text-xl">
                            Income this month
                        </div>
                    </div>
                    <div className="pt-4">
                        <div className="font-bold text-2xl">
                            Rp{' '}
                            {Number(
                                income?.data?.salesCurrentMonth[0]?.total_sales,
                            ).toLocaleString('id-ID')}
                        </div>
                    </div>
                </div>
            ) : (
                <SkeletonDashboard />
            )}
        </>
    );
}
