import { AiOutlineCaretDown } from 'react-icons/ai';

export default function OrderStatus(props) {
    return (
        <>
            {console.log(props)}
            <div className="text-lg border-b my-6 font-bold flex items-center gap-2">
                <div>Order Status</div>{' '}
                <div
                    onClick={() =>
                        props?.state?.setShowHistoryStatus(
                            !props?.state?.showHistoryStatus,
                        )
                    }
                    className="hover:cursor-pointer"
                >
                    <AiOutlineCaretDown />
                </div>
            </div>
            {props?.state?.showHistoryStatus === false ? (
                <div
                    className={`flex justify-evenly items-center py-4 rounded-2xl ${
                        props?.data?.userOrderDetails?.data?.order_statuses[0]
                            ?.status_id === 1
                            ? 'bg-[#F9E79F] text-[#D6A500] border-[#F8C471]'
                            : ''
                    }
            ${
                props?.data?.userOrderDetails?.data?.order_statuses[0]
                    ?.status_id === 2
                    ? 'bg-[#F5CBA7] text-[#E67E22] border-[#F5B041]'
                    : ''
            }
            ${
                props?.data?.userOrderDetails?.data?.order_statuses[0]
                    ?.status_id === 3
                    ? 'bg-[#D2B4DE] text-[#8E44AD] border-[#AF7AC5]'
                    : ''
            }
            ${
                props?.data?.userOrderDetails?.data?.order_statuses[0]
                    ?.status_id === 4
                    ? 'bg-[#AED6F1] text-[#2471A3] border-[#7FB3D5]'
                    : ''
            }
            ${
                props?.data?.userOrderDetails?.data?.order_statuses[0]
                    ?.status_id === 5
                    ? 'bg-[#A9DFBF] text-[#28B463] border-[#7DCEA0]'
                    : ''
            }
            ${
                props?.data?.userOrderDetails?.data?.order_statuses[0]
                    ?.status_id === 6
                    ? 'bg-[#F1948A] text-[#EE0303] border-[#FC4A4A]'
                    : ''
            }`}
                >
                    {
                        props?.data?.userOrderDetails?.data?.order_statuses[0]
                            ?.status?.name
                    }
                </div>
            ) : (
                props?.data?.userOrderDetails?.data?.order_statuses.map(
                    (value, index) => {
                        console.log('value', value);
                        return (
                            <>
                                <div
                                    className={`flex justify-evenly items-center py-4 rounded-2xl mt-4 ${
                                        value?.status_id === 1
                                            ? 'bg-[#F9E79F] text-[#D6A500] border-[#F8C471]'
                                            : ''
                                    }
        ${
            value?.status_id === 2
                ? 'bg-[#F5CBA7] text-[#E67E22] border-[#F5B041]'
                : ''
        }
        ${
            value?.status_id === 3
                ? 'bg-[#D2B4DE] text-[#8E44AD] border-[#AF7AC5]'
                : ''
        }
        ${
            value?.status_id === 4
                ? 'bg-[#AED6F1] text-[#2471A3] border-[#7FB3D5]'
                : ''
        }
        ${
            value?.status_id === 5
                ? 'bg-[#A9DFBF] text-[#28B463] border-[#7DCEA0]'
                : ''
        }
        ${
            value?.status_id === 6
                ? 'bg-[#F1948A] text-[#EE0303] border-[#FC4A4A]'
                : ''
        }`}
                                >
                                    {value?.status?.name}
                                </div>
                                <div>{value?.createdAt}</div>
                            </>
                        );
                    },
                )
            )}
        </>
    );
}
