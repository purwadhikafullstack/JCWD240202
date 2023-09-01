import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllStatus } from '../../../redux/features/statusSlice';
import { Select } from 'flowbite-react';

export default function TransactionTabs(props) {
    const dispatch = useDispatch();
    const getStatus = useSelector((state) => state.status.status);

    const handleChange = (e) => {
        const id = e.target.value.split(',')[0];
        const name = e.target.value.split(',')[1];
        props?.state?.setStatusId(id);
        props?.state?.setPage(1);
        props?.state?.setStatusName(name);
    };

    useEffect(() => {
        dispatch(getAllStatus());
    }, []);
    return (
        <>
            <div className="flex gap-4 justify-evenly items-center w-full max-md:hidden">
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
            <div className="md:hidden">
                <Select onChange={handleChange}>
                    <option value={''}>All Transactions</option>
                    {getStatus?.data?.map((value, index) => {
                        return (
                            <option
                                value={`${value.id},${value.name}`}
                                key={index}
                            >
                                {value.label}
                            </option>
                        );
                    })}
                </Select>
            </div>
        </>
    );
}
