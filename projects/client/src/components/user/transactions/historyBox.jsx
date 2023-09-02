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
import CurrentStatus from './currentStatus';
import GenerateInvoice from './generateInvoice';
import Countdown from './countdown';

export default function TransactionHistoryBox(props) {
    const dispatch = useDispatch();
    const [modalConfirm, setModalConfirm] = useState(false);
    const [modalReview, setModalReview] = useState(false);
    const [orderId, setOrderId] = useState(0);

    const handleConfirmOrder = () => {
        dispatch(userConfirmOrderAsync({ order_id: props?.data?.value?.id }));
        setModalConfirm(false);
        props?.state?.setStatusId(5);
    };

    const countdownExpired = () => {
        props?.state?.setExpiredTime(false);
    };

    return (
        <>
            <div className="border h-full shadow-xl rounded-2xl px-2">
                <div className="flex max-md:flex-col justify-between max-md:gap-4 md:gap-9 md:items-center border-b py-2 px-7 py-2">
                    <div className="flex max-sm:flex-col max-sm:gap-2 sm:gap-9 sm:items-center">
                        <div>{props?.data?.value?.createdAt}</div>
                        <CurrentStatus
                            data={{
                                status: props?.data?.value?.order_statuses,
                            }}
                        />
                        <div className="font-bold">
                            {props?.data?.value?.invoice_number}
                        </div>
                    </div>
                    {props?.data?.value?.order_statuses[
                        props?.data?.value?.order_statuses.length - 1
                    ]?.status_id === 1 ? (
                        <Countdown
                            expiredDate={
                                props?.data?.value?.order_statuses[0]?.expired
                            }
                            countdownExpired={countdownExpired}
                        />
                    ) : (
                        ''
                    )}
                </div>
                <div className="flex justify-between max-md:flex-col px-7 py-4">
                    <div className="pt-4 flex gap-9">
                        <div className=" max-md:hidden md:h-[200px]
                         md:w-[200px]">
                            <img
                                src={
                                    props?.data?.value?.cart?.cart_products[0]
                                        ?.image
                                }
                                alt="product_image"
                                className="max-md:hidden md:h-[200px] md:w-[200px]"
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
                    <div className="md:border-l max-md:border-t max-md:pt-4 md:px-9 flex flex-col justify-center gap-2">
                        <div className="border-b">Total</div>
                        <div className="font-bold">
                            Rp{' '}
                            {props?.data?.value?.total.toLocaleString('ID-id')}
                        </div>
                    </div>
                </div>
                <div className="flex md:flex-row max-md:flex-col md:justify-between md:items-center border-t px-7 py-2">
                    <div className="text-sky-700 font-bold flex max-sm:flex-col max-sm:items-start max-md:gap-2 md:gap-9 py-2">
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
                        ]?.status_id < 6 ? (
                            <GenerateInvoice
                                data={{ order: props?.data?.value }}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                    {props?.data?.value?.order_statuses[
                        props?.data?.value?.order_statuses.length - 1
                    ]?.status_id === 1 ? (
                        <div className="flex max-sm:flex-col gap-4">
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
