import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import CardDetail from './cardTransactionDetail';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { transactionHistory } from '../../../redux/features/transactionSlice';
import History from './history';

export default function DataDetail(props) {
    console.log(props.data)
    const dispatch = useDispatch();
    const [openMore, setOpenMore] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const [idZoom, setIdZoom] = useState('');
    return (
        <>
            {props?.data?.data?.rows?.map((value, index) => {
                console.log(value.id, 'kakakakka')
                if (value?.cart_id === props?.detailId) {
                    return (
                        <div key={index} className="flex-auto w-full">
                            <div className="flex justify-center mb-3">
                                <div
                                    className={`border truncate w-fit rounded-full px-3
                                ${
                                    value?.order_statuses[0]?.status_id === 1
                                        ? 'bg-[#F9E79F] text-[#D6A500] border-[#F8C471]'
                                        : ''
                                }
                                ${
                                    value?.order_statuses[0]?.status_id === 2
                                        ? 'bg-[#F5CBA7] text-[#E67E22] border-[#F5B041]'
                                        : ''
                                }
                                ${
                                    value?.order_statuses[0]?.status_id === 3
                                        ? 'bg-[#D2B4DE] text-[#8E44AD] border-[#AF7AC5]'
                                        : ''
                                }
                                ${
                                    value?.order_statuses[0]?.status_id === 4
                                        ? 'bg-[#AED6F1] text-[#2471A3] border-[#7FB3D5]'
                                        : ''
                                }
                                ${
                                    value?.order_statuses[0]?.status_id === 5
                                        ? 'bg-[#A9DFBF] text-[#28B463] border-[#7DCEA0]'
                                        : ''
                                }
                                ${
                                    value?.order_statuses[0]?.status_id === 6
                                        ? 'bg-[#F1948A] text-[#EE0303] border-[#FC4A4A]'
                                        : ''
                                }
                                `}
                                >
                                    {value?.order_statuses[0]?.status.name}
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <div className="text-slate-500">History</div>
                                <div onClick={() => { dispatch(transactionHistory(value.id)); props.history?.setShow(!props.history?.show) }} className='flex items-center mb-3 cursor-pointer w-fit text-sm text-[#2296f3]'>
                                    {props.history?.show? <> Hide <IoIosArrowUp className="text-[20px] ml-2" /> </> : <> See Details <IoIosArrowDown className="text-[20px] ml-2" /> </>}
                                    
                                </div>
                            </div>
                            {props.history?.show ? <History /> : null}
                            <hr />
                            <div className="flex justify-between mt-3">
                                <div className="text-slate-500">
                                    No. Invoice
                                </div>
                                <div className="text-[#34498d]">
                                    {value?.invoice_number}
                                </div>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <div className="text-slate-500">
                                    Purchase Date
                                </div>
                                <div className='text-end'>
                                    {[
                                        new Date(value.createdAt)
                                            .toString()
                                            .split(
                                                'GMT+0700 (Western Indonesia Time)',
                                            ),
                                    ]}
                                </div>
                            </div>
                            {/* confirm payment */}
                            {value?.order_statuses[0]?.status_id === 2 ||
                            value?.order_statuses[0]?.status_id === 3 ||
                            value?.order_statuses[0]?.status_id === 4 ||
                            value?.order_statuses[0]?.status_id === 5 ? (
                                <div className="border-b mt-3 pb-3">
                                    <div className="text-lg font-semibold">
                                        Payment Proof
                                    </div>
                                    <div className="text-xs text-slate-400">
                                        *click image to zoom in & out
                                    </div>
                                    <div className="flex justify-center">
                                        <img
                                            onClick={() => {
                                                setIsZoomed(!isZoomed);
                                                setIdZoom(value.id);
                                            }}
                                            alt="payment-proof"
                                            src={
                                                value?.payment_proof.startsWith(
                                                    'PIMG',
                                                )
                                                    ? process.env
                                                          .REACT_APP_API_IMAGE_URL +
                                                      value?.payment_proof
                                                    : value?.payment_proof
                                            }
                                            className={`cursor-pointer w-[125px] h-[125px] rounded-md ${
                                                isZoomed && idZoom === value.id
                                                    ? 'md:scale-[4] scale-[3] transition duration-500'
                                                    : ''
                                            }`}
                                        />
                                    </div>
                                    {value?.order_statuses[0]?.status_id ===
                                    2 ? (
                                        <div className="flex justify-center mt-3">
                                            <button
                                                onClick={() => { props.confirm?.setShowConfirm(true); props.confirm?.setFuncConfirm(1); props.confirm?.setValueConfirm(value.cart_id)}}
                                                className={`bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3 disabled:cursor-not-allowed`}
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                onClick={() => { props.notification?.showNotificationModal(); props.confirm?.setFuncConfirm(2); props.confirm?.setValueConfirm(value.id)}}
                                                className="bg-red-600 hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3 ml-2"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    ) : null}
                                </div>
                            ) : null}
                            <div>
                                <div className="my-3 text-lg font-semibold">
                                    Product Detail
                                </div>
                                <div
                                    className={`overflow-y-auto ${
                                        !openMore ? '' : 'h-64'
                                    }`}
                                >
                                    <CardDetail
                                        data={value?.cart?.cart_products}
                                        func={{ openMore, setOpenMore }}
                                    />
                                </div>
                                {value?.cart?.cart_products?.length > 1 ? (
                                    <div className=" flex justify-end">
                                        {!openMore ? (
                                            <div
                                                onClick={() =>
                                                    setOpenMore(!openMore)
                                                }
                                                className="flex items-center mb-3 cursor-pointer w-fit text-sm text-[#2296f3]"
                                            >
                                                +
                                                {value?.cart?.cart_products
                                                    ?.length - 1}{' '}
                                                Other Products
                                                <IoIosArrowDown className="text-[20px] ml-2" />
                                            </div>
                                        ) : (
                                            <div
                                                onClick={() =>
                                                    setOpenMore(!openMore)
                                                }
                                                className="flex items-center mb-3 cursor-pointer w-fit text-[#2296f3]"
                                            >
                                                {' '}
                                                Show Less
                                                <IoIosArrowUp className="text-[20px] ml-2" />
                                            </div>
                                        )}
                                    </div>
                                ) : null}
                            </div>
                            <div className="mt-2 border-b border-t py-3">
                                <div className="text-lg font-semibold">
                                    Shipping Info
                                </div>
                                <div className="flex mt-3">
                                    <div className="md:w-28 text-slate-500">
                                        Courier
                                    </div>
                                    <div>
                                        {' '}
                                        <span className="mr-4">:</span>
                                        {value?.courier} -{' '}
                                        {value?.shipping_method}
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-28 text-slate-500">
                                        Address
                                    </div>
                                    <div>
                                        <div className="font-semibold">
                                            <span className="mr-4 font-normal">
                                                :
                                            </span>
                                            {value?.receiver_name}
                                        </div>
                                        <div className="ml-5">
                                            {value?.receiver_number}
                                        </div>
                                        <div className="ml-5">
                                            {value?.shipping_address}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 ">
                                <div className="text-lg font-semibold">
                                    Payment Details
                                </div>
                                <div className="flex justify-between mt-3">
                                    <div className="text-slate-500">
                                        Payment Method
                                    </div>
                                    <div className="">Bank Transfer</div>
                                </div>
                                <div className="flex justify-between my-1">
                                    <div className="text-slate-500">
                                        Total Price (
                                        {value?.cart?.cart_products?.length}{' '}
                                        products)
                                    </div>
                                    <div>
                                        Rp.{' '}
                                        {value?.total_cart_price.toLocaleString(
                                            'id',
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="text-slate-500">
                                        Total Shipping Fee (
                                        {value?.total_weight} gr)
                                    </div>
                                    <div>
                                        Rp.{' '}
                                        {value?.shipping_fee.toLocaleString(
                                            'id',
                                        )}
                                    </div>
                                </div>
                                <hr />
                                <div className="flex justify-between mt-2">
                                    <div className="font-semibold">Total</div>
                                    <div className="font-semibold">
                                        Rp. {value?.total.toLocaleString('id')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
            })}
        </>
    );
}
