import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    setOrder,
    userConfirmOrderAsync,
} from '../../../redux/features/orderSlice';
import ModalConfirmOrder from './modalConfirmOrder';
import ModalCreateReview from '../review/modalCreateReview';

export default function TransactionHistoryBox(props) {
    const dispatch = useDispatch();
    const [modalConfirm, setModalConfirm] = useState(false);
    const parseExpiredDate = new Date(
        props?.data?.value?.order_statuses[0]?.expired,
    );
    const [countdown, setCountdown] = useState(parseExpiredDate - Date.now());
    const [modalReview, setModalReview] = useState(false);
    const [orderId, setOrderId] = useState(0);

    const handleConfirmOrder = () => {
        dispatch(userConfirmOrderAsync({ order_id: props?.data?.value?.id }));
        setModalConfirm(false);
        props?.state?.setStatusId(5);
    };

    const formatTime = ({ timeInMs }) => {
        const seconds = Math.floor((Number(timeInMs) / 1000) % 60);
        const minutes = Math.floor((Number(timeInMs) / 1000 / 60) % 60);
        const hours = Math.floor((Number(timeInMs) / 1000 / 60 / 60) % 24);
        return `${hours}:${minutes}:${seconds}`;
    };

    useEffect(() => {
        if (
            countdown <= 1000 &&
            props?.data?.value?.order_statuses[
                props?.data?.value?.order_statuses.length - 1
            ]?.status_id === 1
        ) {
            props?.state?.setExpiredTime(false);
        } else if (
            countdown > 1000 &&
            props?.data?.value?.order_statuses[
                props?.data?.value?.order_statuses.length - 1
            ]?.status_id === 1
        ) {
            const interval = setInterval(() => {
                setCountdown((prevTime) =>
                    prevTime > 1000 ? prevTime - 1000 : 0,
                );

                return clearInterval(interval);
            }, 1000);
        }
    }, [countdown, orderId]);

    return (
        <>
            <div className="border w-full h-full shadow-xl rounded-2xl px-2">
                <div className="flex justify-between gap-9 items-center border-b py-2 px-7 py-2">
                    <div className="flex gap-9 items-center">
                        <div>{props?.data?.value?.createdAt}</div>
                        <div
                            className={`border px-4 py-1 rounded-full ${
                                props?.data?.value?.order_statuses[
                                    props?.data?.value?.order_statuses.length -
                                        1
                                ]?.status_id === 1
                                    ? 'bg-[#F9E79F] text-[#D6A500] border-[#F8C471]'
                                    : ''
                            }
                                ${
                                    props?.data?.value?.order_statuses[
                                        props?.data?.value?.order_statuses
                                            .length - 1
                                    ]?.status_id === 2
                                        ? 'bg-[#F5CBA7] text-[#E67E22] border-[#F5B041]'
                                        : ''
                                }
                                ${
                                    props?.data?.value?.order_statuses[
                                        props?.data?.value?.order_statuses
                                            .length - 1
                                    ]?.status_id === 3
                                        ? 'bg-[#D2B4DE] text-[#8E44AD] border-[#AF7AC5]'
                                        : ''
                                }
                                ${
                                    props?.data?.value?.order_statuses[
                                        props?.data?.value?.order_statuses
                                            .length - 1
                                    ]?.status_id === 4
                                        ? 'bg-[#AED6F1] text-[#2471A3] border-[#7FB3D5]'
                                        : ''
                                }
                                ${
                                    props?.data?.value?.order_statuses[
                                        props?.data?.value?.order_statuses
                                            .length - 1
                                    ]?.status_id === 5
                                        ? 'bg-[#A9DFBF] text-[#28B463] border-[#7DCEA0]'
                                        : ''
                                }
                                ${
                                    props?.data?.value?.order_statuses[
                                        props?.data?.value?.order_statuses
                                            .length - 1
                                    ]?.status_id === 6
                                        ? 'bg-[#F1948A] text-[#EE0303] border-[#FC4A4A]'
                                        : ''
                                }`}
                        >
                            {
                                props?.data?.value?.order_statuses[
                                    props?.data?.value?.order_statuses.length -
                                        1
                                ]?.status?.name
                            }
                        </div>
                        <div className="font-bold">
                            {props?.data?.value?.invoice_number}
                        </div>
                    </div>
                    {props?.data?.value?.order_statuses[
                        props?.data?.value?.order_statuses.length - 1
                    ]?.status_id === 1 ? (
                        <div className="border-2 border-black p-1 flex gap-1 w-[150px]">
                            <div>Expired in</div>
                            <div className="font-bold">
                                {formatTime({ timeInMs: countdown })}
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
                <div className="flex justify-between px-7 py-4">
                    <div className="pt-4 flex gap-9">
                        <div className=" h-[200px] w-[200px]">
                            <img
                                src={
                                    props?.data?.value?.cart?.cart_products[0]
                                        ?.image
                                }
                                alt="product_image"
                                className="h-[200px] w-[200px]"
                            />
                        </div>
                        <div className="pt-4 ">
                            <div className="font-bold text-lg">
                                {
                                    props?.data?.value?.cart?.cart_products[0]
                                        ?.product_name
                                }
                            </div>
                            <div className="flex gap-2 divide-x">
                                <div>
                                    {
                                        props?.data?.value?.cart
                                            ?.cart_products[0].quantity
                                    }{' '}
                                    x items
                                </div>
                                <div className="px-2">
                                    Rp{' '}
                                    {props?.data?.value?.cart?.cart_products[0].price.toLocaleString(
                                        'ID-id',
                                    )}
                                </div>
                            </div>
                            <div className="pt-2">
                                {props?.data?.value?.cart?.cart_products
                                    .length > 1
                                    ? `+ ${
                                          props?.data?.value?.cart
                                              ?.cart_products.length - 1
                                      } other items`
                                    : ''}
                            </div>
                        </div>
                    </div>
                    <div className="border-l px-9 flex flex-col justify-center gap-2">
                        <div className="border-b">Total</div>
                        <div className="font-bold">
                            Rp{' '}
                            {props?.data?.value?.total.toLocaleString('ID-id')}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center border-t px-7 py-2">
                    <div className="text-sky-700 font-bold flex gap-9 py-2">
                        <Link to={`/orders/${props?.data?.value?.id}`}>
                            <Button className="px-2 bg-sky-700 text-yellow-200 hover:cursor-pointer hover:bg-sky-900">
                                Transaction Details
                            </Button>
                        </Link>
                        {props?.data?.value?.order_statuses[
                            props?.data?.value?.order_statuses.length - 1
                        ]?.status_id >= 3 &&
                        props?.data?.value?.order_statuses[
                            props?.data?.value?.order_statuses.length - 1
                        ]?.status_id !== 6 ? (
                            <Button className="px-2 bg-sky-700 text-yellow-200 hover:cursor-pointer hover:bg-sky-900">
                                Generate Invoice
                            </Button>
                        ) : (
                            ''
                        )}
                    </div>
                    {props?.data?.value?.order_statuses[
                        props?.data?.value?.order_statuses.length - 1
                    ]?.status_id === 1 ? (
                        <div className="flex gap-4">
                            <Link to={`/orders/${props?.data?.value?.id}`}>
                                <Button className="px-2 bg-yellow-200 text-sky-700 hover:cursor-pointer hover:bg-sky-700 hover:text-yellow-200">
                                    Upload Payment Receipt
                                </Button>
                            </Link>
                            <Button
                                onClick={() => {
                                    props?.state?.setOrderId(
                                        props?.data?.value?.id,
                                    );
                                    props?.state?.setCancelOrder(true);
                                }}
                                color={'light'}
                            >
                                Cancel Order
                            </Button>
                        </div>
                    ) : props?.data?.value?.order_statuses[
                          props?.data?.value?.order_statuses.length - 1
                      ]?.status_id === 4 ? (
                        <div>
                            <Button
                                onClick={() => {
                                    dispatch(setModalConfirm(true));
                                }}
                                className="px-2 bg-yellow-200 text-sky-700 hover:cursor-pointer hover:bg-sky-700 hover:text-yellow-200"
                            >
                                Confirm Delivery
                            </Button>
                        </div>
                    ) : props?.data?.value?.order_statuses[
                          props?.data?.value?.order_statuses.length - 1
                      ]?.status_id === 5 ? (
                        <div>
                            <Button
                                onClick={() => {
                                    setOrderId(props?.data?.value?.id);
                                    setModalReview(true);
                                }}
                                className="px-2 bg-yellow-200 text-sky-700 hover:cursor-pointer hover:bg-sky-700 hover:text-yellow-200"
                            >
                                Review Products
                            </Button>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
            <ModalConfirmOrder
                state={{ modalConfirm, setModalConfirm }}
                func={{ handleConfirmOrder }}
            />
            <ModalCreateReview
                state={{ modalReview, setModalReview, setOrderId }}
                data={{
                    products: props?.data?.value?.cart?.cart_products,
                    order_id: orderId,
                }}
            />
        </>
    );
}
