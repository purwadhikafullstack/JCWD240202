import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllStatus } from '../../../redux/features/statusSlice';

export default function TransactionTabs() {
    const dispatch = useDispatch();
    const getStatus = useSelector((state) => state.status.status);

    useEffect(() => {
        dispatch(getAllStatus());
    }, []);
    return (
        <div className="flex gap-9 items-center">
            <div className="border px-7 py-2 rounded-full">
                All Transactions
            </div>
            {getStatus?.data?.map((value, index) => {
                return (
                    <div className="border px-7 py-2 rounded-full">
                        {value.label}
                    </div>
                );
            })}
        </div>
    );
}
