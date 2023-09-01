import { useEffect } from 'react';
import { BsFillPeopleFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCustomersAsync } from '../../../redux/features/dashboardSlice';

export default function TotalCustomer() {
    const dispatch = useDispatch();
    const customerCount = useSelector((state) => state.dashboard.customers);

    useEffect(() => {
        dispatch(getCustomersAsync());
    }, []);
    return (
        <div className="bg-white w-full h-full rounded-2xl shadow-lg p-4">
            <div className="flex gap-2 items-center">
                <div>
                    <BsFillPeopleFill size={36} />
                </div>
                <div className="font-bold text-xl">Total Users</div>
            </div>
            <div className="pt-4">
                <div className='font-bold text-2xl'>{customerCount?.data?.totalCustomer}</div>
            </div>
        </div>
    );
}
