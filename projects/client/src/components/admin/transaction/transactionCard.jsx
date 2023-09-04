/* eslint-disable jsx-a11y/alt-text */
import {
    FcCalendar,
    FcFinePrint,
    FcHighPriority,
    FcViewDetails,
    FcVoicePresentation,
} from 'react-icons/fc';
import SkeletonTransactionAdmin from './skeletonTransactionAdmin';
import CountdownAdmin from './countdownAdmin';

export default function TransactionCard(props) {
    const countdownExpired = () => {
        props?.time?.setExpiredTime(false);
    };
    return (
        <>
            {props?.transaction?.data?.rows?.length !== 0 ? (
                props?.transaction?.data?.rows?.map((value, index) => {
                    if(props?.loading) {
                    return (
                        <div
                            key={index}
                            className="border p-2 rounded-lg shadow-lg mt-3"
                        >
                            <div className="flex flex-col gap-2 md:flex-row md:justify-between md:gap-0 border-b py-2">
                                <div className="md:w-72 flex flex-col md:flex-row items-center justify-center md:justify-start">
                                    <div
                                        className={`border truncate w-fit rounded-full px-3 flex items-center
                                    ${
                                        value?.order_statuses[0]?.status_id ===
                                        1
                                            ? 'bg-[#F9E79F] text-[#D6A500] border-[#F8C471]'
                                            : ''
                                    }
                                    ${
                                        value?.order_statuses[0]?.status_id ===
                                        2
                                            ? 'bg-[#F5CBA7] text-[#E67E22] border-[#F5B041]'
                                            : ''
                                    }
                                    ${
                                        value?.order_statuses[0]?.status_id ===
                                        3
                                            ? 'bg-[#D2B4DE] text-[#8E44AD] border-[#AF7AC5]'
                                            : ''
                                    }
                                    ${
                                        value?.order_statuses[0]?.status_id ===
                                        4
                                            ? 'bg-[#AED6F1] text-[#2471A3] border-[#7FB3D5]'
                                            : ''
                                    }
                                    ${
                                        value?.order_statuses[0]?.status_id ===
                                        5
                                            ? 'bg-[#A9DFBF] text-[#28B463] border-[#7DCEA0]'
                                            : ''
                                    }
                                    ${
                                        value?.order_statuses[0]?.status_id ===
                                        6
                                            ? 'bg-[#F1948A] text-[#EE0303] border-[#FC4A4A]'
                                            : ''
                                    }
                                    `}
                                    >
                                        {value?.order_statuses[0]?.status?.name}
                                    </div>
                                    {value?.order_statuses[0]?.status_id === 1 ? <CountdownAdmin expiredDate={value?.order_statuses[0]?.expired } countdownExpired={countdownExpired}/> : null}
                                </div>
                                <div className="flex-1 flex md:justify-center items-center">
                                    <FcViewDetails className="text-[22px]" />
                                    <div className="w-auto px-1 text-[#34498d]">
                                        {value?.invoice_number}
                                    </div>
                                </div>
                                <div className="flex-1 flex md:justify-end items-center">
                                    <FcCalendar className="text-[22px]" />
                                    <div className="w-auto px-1">
                                        {[
                                            new Date(value.createdAt)
                                                .toString()
                                                .split(
                                                    'GMT+0700 (Western Indonesia Time)',
                                                ),
                                        ]}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row mt-3">
                                <div className="flex justify-between md:justify-start md:w-96">
                                    <div className="w-[120px] h-[120px]">
                                        <img
                                            src={value?.cart?.cart_products[0]?.image.startsWith('PIMG') ? process.env.REACT_APP_API_IMAGE_URL + value?.cart?.cart_products[0]?.image : value?.cart?.cart_products[0]?.image}
                                        />
                                    </div>
                                    <div className="m-3 flex flex-col items-end md:items-start">
                                        <div className="font-bold text-lg text-end md:text-start">
                                            {value?.cart?.cart_products[0]?.product_name}
                                        </div>
                                        <div className="text-sm my-1 text-slate-500">
                                            {
                                                value?.cart?.cart_products[0]
                                                    ?.quantity
                                            }{' '}
                                            x Rp.{' '}
                                            {value?.cart?.cart_products[0]?.price.toLocaleString(
                                                'id',
                                            )}
                                        </div>
                                        {value?.cart?.cart_products.length >
                                        1 ? (
                                            <div className="text-sm text-slate-600">
                                                +
                                                {value?.cart?.cart_products
                                                    .length - 1}{' '}
                                                other products
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="flex-auto md:w-10 mx-5 md:pl-3">
                                    <div>
                                        <div className="italic text-center">
                                            Deliver from :
                                            <span className="text-lg font-semibold">
                                                {' '}
                                                WH - {value?.warehouse?.city}
                                            </span>
                                        </div>
                                        <div className="md:border-l flex flex-col gap-3 pl-2 mt-5">
                                            <div className="text-center">
                                                Total Price :
                                            </div>
                                            <div className="text-center font-semibold text-lg">
                                                Rp.{' '}
                                                {value?.total.toLocaleString(
                                                    'id',
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col-reverse md:flex-row mt-3">
                                <div className="flex-1 flex justify-between md:justify-start gap-5 mt-3 border-t md:border-none">
                                    <div className="flex items-center cursor-pointer">
                                        <FcVoicePresentation className="text-[22px]" />
                                        <div className="text-[#2296f3]">
                                            Chat With Buyer{' '}
                                        </div>
                                    </div>
                                    <div className="flex items-center cursor-pointer">
                                        <FcFinePrint className="text-[22px]" />
                                        <div
                                            onClick={() => {
                                                props?.detail?.setDetailId(
                                                    value?.cart_id,
                                                );
                                                props?.detail?.setOpenDetail(
                                                    true,
                                                );
                                            }}
                                            className="text-[#2296f3]"
                                        >
                                            Transaction Detail
                                        </div>
                                        {value?.order_statuses[0]?.status_id ===
                                        2 ? (
                                            <FcHighPriority className="ml-1 text-[22px]" />
                                        ) : null}
                                    </div>
                                </div>
                                {props.transaction.roleId === 2 && value?.order_statuses[0]?.status_id === 3 ? (
                                    <div className="flex-1 flex justify-end gap-5 mr-5">
                                        <button
                                            onClick={() => { props.confirm?.setShowConfirm(true); props.confirm?.setFuncConfirm(3); props.confirm?.setValueConfirm(value.id)}}
                                                className={`bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white py-1 text-sm p-3 w-36`}
                                            >
                                                Ready To Ship
                                            </button>
                                            <button
                                            onClick={() => { props.notification?.setModalNotification(true); props.confirm?.setFuncConfirm(4); props.confirm?.setValueConfirm(value.id)}}
                                            className="bg-red-600 hover:bg-gray-400 rounded-lg text-white py-1 text-sm p-3 w-36">
                                                Cancel
                                            </button>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        );
                    } else {
                        return <SkeletonTransactionAdmin key={index} />;
                    }
                })
            ) : (
                <div className="flex items-center justify-center py-8">
                    <div>
                        <div className="flex justify-center items-center font-bold text-xl">
                            <h1>Not Found</h1>
                        </div>
                        <div className="w-full flex justify-center items-center">
                            <img
                                src="/images/not-found-3.png"
                                alt="not-found"
                                className="min-w-[200px] max-w-[400px]"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
