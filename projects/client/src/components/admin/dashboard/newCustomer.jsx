import { useEffect } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCustomersAsync } from '../../../redux/features/dashboardSlice';
import SkeletonDashboard from './skeletonDashboard';

export default function NewCustomer(props) {
    const dispatch = useDispatch();
    const customerCount = useSelector((state) => state.dashboard.customers);

    useEffect(() => {
        dispatch(getCustomersAsync());
    }, []);
    return (
        <>
            {props?.data?.loading ? (
                <div className="bg-white w-full h-full rounded-2xl shadow-lg p-4">
                    <div className="flex gap-2 items-center">
                        <div>
                            <FaUserPlus size={36} />
                        </div>
                        <div className="font-bold text-xl">New Users</div>
                    </div>
                    <div className="pt-4">
                        <div className="font-bold text-2xl">
                            {customerCount?.data?.newCustomer}
                        </div>
                    </div>
                </div>
            ) : (
                <SkeletonDashboard />
            )}
        </>
    );
}
