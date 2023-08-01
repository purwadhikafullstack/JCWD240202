/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react';
import {
    FcCalendar,
    FcFinePrint,
    FcViewDetails,
    FcVoicePresentation,
} from 'react-icons/fc';

export default function TransactionCard(props) {
    return (
        <>
            {props?.transaction?.data?.rows?.length !== 0 ? (
                props?.transaction?.data?.rows?.map((value, index) => {
                    return (
                        <div key={index} className="border p-2 rounded-lg shadow-lg mt-3">
                            {/* {()=>setStatus(value?.order_statuses[0]?.status_id)} */}
                            <div className="flex justify- border-b py-2">
                                <div className="w-72">
                                    <div
                                        className={`border truncate w-fit rounded-full px-3 
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
                                </div>
                                <div className="flex-1 flex justify-center items-center">
                                    <FcViewDetails className="text-[22px]" />
                                    <div
                                        className="w-auto px-1 text-[#34498d]"
                                    >
                                        {value?.invoice_number}
                                    </div>
                                </div>
                                <div className="flex-1 flex justify-end items-center">
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
                            <div className="flex mt-3 px-1">
                                <div className="flex-auto w-64 flex">
                                    <div className="bg-red-200 w-[120px] h-[120px]">
                                        <img
                                            
                                            src={
                                                value?.cart?.cart_products[0]
                                                    ?.image
                                            }
                                        />
                                    </div>
                                    <div className="m-3">
                                        <div
                                            
                                            className="font-bold text-lg"
                                        >
                                            {
                                                value?.cart?.cart_products[0]
                                                    ?.product_name
                                            }
                                        </div>
                                        <div  className="text-sm my-1 text-slate-500">
                                            {
                                                value?.cart?.cart_products[0]
                                                    ?.quantity
                                            }{' '}
                                            x Rp.{' '}
                                            {value?.cart?.cart_products[0]?.price.toLocaleString(
                                                'id',
                                            )}
                                        </div>
                                        {value?.cart?.cart_products.length > 1 ? <div className='text-sm text-slate-600'>+{value?.cart?.cart_products.length -1} other products</div> : null}
                                    </div>
                                </div>
                                <div className="flex-auto w-10 mx-5 pl-3">
                                    <div>
                                        <div className="italic">
                                            Deliver from :
                                            <span
                                                
                                                className="text-lg font-semibold"
                                            >
                                                {' '}
                                                WH - {value?.warehouse?.city}
                                            </span>
                                        </div>
                                        <div className="border-l flex  flex-col gap-3 pl-2 mt-5">
                                            <div className="text-center">
                                                Total Price :
                                            </div>
                                            <div
                                                
                                                className="text-center font-semibold text-lg"
                                            >
                                                Rp.{' '}
                                                {value?.total.toLocaleString(
                                                    'id',
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex mt-3 gap-5">
                                <div className="flex items-center cursor-pointer">
                                    <FcVoicePresentation className="text-[22px]" />
                                    <div className="text-[#2296f3]">
                                        Chat With Buyer{' '}
                                    </div>
                                </div>
                                <div className="flex items-center cursor-pointer">
                                    <FcFinePrint className="text-[22px]" />
                                    <div onClick={() => { props?.detail?.setDetailId(value?.cart_id);  props?.detail?.setOpenDetail(true)}} className="text-[#2296f3]">
                                        Transaction Detail
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="flex justify-center py-24 font-bold tex-2xl">
                    No Transaction Found ...
                </div>
            )}
        </>
    );
}
