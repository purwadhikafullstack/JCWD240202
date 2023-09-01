import React from 'react';
import { AiOutlineBell } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userReadNotificationAsync } from '../../../redux/features/notificationSlice';
import { getOrderDetailsAsync } from '../../../redux/features/orderSlice';

export default function Notification(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <>
            <div
                onClick={() => props?.state?.setNotification(!props?.state?.notification)}
                className={`flex items-center w-12 h-12 justify-center relative hover:cursor-pointer ${
                    props?.state?.notification === true
                        ? 'border rounded shadow-lg bg-gray-200'
                        : ''
                }`}
            >
                <div className="relative">
                    <AiOutlineBell size={25} />
                    {props?.state?.notification === true ? (
                        <div
                            className="absolute -right-16 mt-4 w-64 bg-white border-4 shadow-lg border-sky-700 rounded-xl"
                        >
                            {props?.data?.notification?.notifications?.rows
                                ?.length === 0 ? (
                                <div className="p-9 font-bold flex items-center justify-center">
                                    No Notifications
                                </div>
                            ) : (
                                <>
                                    {props?.data?.notification?.notifications?.rows?.map(
                                        (value, index) => {
                                            return index < 3 ? (
                                                <div
                                                    key={index}
                                                    onClick={() => {
                                                        dispatch(
                                                            userReadNotificationAsync(
                                                                {
                                                                    notification_id:
                                                                        value.id,
                                                                },
                                                            ),
                                                        );
                                                        dispatch(
                                                            getOrderDetailsAsync(
                                                                {
                                                                    order_id:
                                                                        value.order_id,
                                                                },
                                                            ),
                                                        );
                                                        navigate(
                                                            `/orders/${value.order_id}`,
                                                        );
                                                    }}
                                                    className={`p-4 border-b  relative hover:bg-gray-300 ${
                                                        index === 0
                                                            ? 'rounded-t-xl'
                                                            : ''
                                                    } ${
                                                        value?.is_read === true
                                                            ? 'bg-gray-200'
                                                            : ''
                                                    }`}
                                                >
                                                    <div className="font-bold">
                                                        {value.title}
                                                    </div>
                                                    <div>{value.message}</div>
                                                    {value?.is_read ===
                                                    false ? (
                                                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500"></div>
                                                    ) : (
                                                        ''
                                                    )}
                                                </div>
                                            ) : (
                                                ''
                                            );
                                        },
                                    )}
                                    <div
                                        onClick={() =>
                                            navigate('/users/notifications')
                                        }
                                        className="flex justify-center items-center py-2"
                                    >
                                        See All
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        ''
                    )}
                </div>
                <div
                    className={`${
                        props?.data?.notification?.unReadCount === 0
                            ? 'hidden'
                            : 'border rounded-full bg-red-700 text-white w-6 h-6 flex items-center justify-center absolute top-0 right-0'
                    }`}
                >
                    {props?.data?.notification?.unReadCount}
                </div>
            </div>
        </>
    );
}
