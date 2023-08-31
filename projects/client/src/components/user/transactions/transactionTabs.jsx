import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllStatus } from '../../../redux/features/statusSlice';

export default function TransactionTabs(props) {
    const dispatch = useDispatch();
    const getStatus = useSelector((state) => state.status.status);

    useEffect(() => {
        dispatch(getAllStatus());
    }, []);
    return (
        <div className="flex gap-9 items-center">
            <div
                onClick={() => {
                    props?.state?.setStatusId(0);
                    props?.state?.setPage(1);
                    props?.state?.setStatusName('');
                }}
                className={`border px-7 py-2 rounded-full hover:cursor-pointer ${
                    props?.state?.status_id === 0
                        ? 'bg-sky-700 text-yellow-200 font-bold'
                        : ''
                }`}
            >
                All Transactions
            </div>
            {getStatus?.data?.map((value, index) => {
                return (
                    <div
                        onClick={() => {
                            props?.state?.setStatusId(value.id);
                            props?.state?.setPage(1);
                            props?.state?.setStatusName(value.label);
                        }}
                        className={`border px-7 py-2 rounded-full hover:cursor-pointer ${
                            props?.state?.status_id === value.id
                                ? 'bg-sky-700 text-yellow-200 font-bold'
                                : ''
                        }`}
                        key={index}
                    >
                        {value.label}
                    </div>
                );
            })}
        </div>
    );
}
