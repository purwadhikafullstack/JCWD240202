import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';

export default function TransactionHistoryBox(props) {
    return (
        <div className="border w-full h-full shadow-xl rounded-2xl px-4">
            <div className="flex gap-9 items-center border-b py-2">
                <div>{props?.data?.value?.createdAt}</div>
                <div
                    className={`border px-4 py-1 rounded-full ${
                        props?.data?.value?.order_statuses[0]?.status_id === 1
                            ? 'bg-[#F9E79F] text-[#D6A500] border-[#F8C471]'
                            : ''
                    }
                                    ${
                                        props?.data?.value?.order_statuses[0]
                                            ?.status_id === 2
                                            ? 'bg-[#F5CBA7] text-[#E67E22] border-[#F5B041]'
                                            : ''
                                    }
                                    ${
                                        props?.data?.value?.order_statuses[0]
                                            ?.status_id === 3
                                            ? 'bg-[#D2B4DE] text-[#8E44AD] border-[#AF7AC5]'
                                            : ''
                                    }
                                    ${
                                        props?.data?.value?.order_statuses[0]
                                            ?.status_id === 4
                                            ? 'bg-[#AED6F1] text-[#2471A3] border-[#7FB3D5]'
                                            : ''
                                    }
                                    ${
                                        props?.data?.value?.order_statuses[0]
                                            ?.status_id === 5
                                            ? 'bg-[#A9DFBF] text-[#28B463] border-[#7DCEA0]'
                                            : ''
                                    }
                                    ${
                                        props?.data?.value?.order_statuses[0]
                                            ?.status_id === 6
                                            ? 'bg-[#F1948A] text-[#EE0303] border-[#FC4A4A]'
                                            : ''
                                    }`}
                >
                    {props?.data?.value?.order_statuses[0]?.status?.name}
                </div>
                <div className="font-bold">
                    {props?.data?.value?.invoice_number}
                </div>
            </div>
            <div className="flex justify-between">
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
                                    props?.data?.value?.cart?.cart_products[0]
                                        .quantity
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
                            {props?.data?.value?.cart?.cart_products.length > 1
                                ? `+ ${
                                      props?.data?.value?.cart?.cart_products
                                          .length - 1
                                  } other items`
                                : ''}
                        </div>
                    </div>
                </div>
                <div className="border-l px-9 flex flex-col justify-center gap-2">
                    <div className="border-b">Total</div>
                    <div className="font-bold">
                        Rp {props?.data?.value?.total.toLocaleString('ID-id')}
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center border-t">
                <div className="text-sky-700 font-bold flex gap-9 py-2">
                    <Link to={`/orders/${props?.data?.value?.id}`}>
                        <Button className="px-2 bg-sky-700 text-yellow-200 hover:cursor-pointer hover:bg-sky-900">
                            Transaction Details
                        </Button>
                    </Link>
                    {props?.data?.value?.order_statuses[0]?.status_id >= 3 &&
                    props?.data?.value?.order_statuses[0]?.status_id !== 6 ? (
                        <div className="px-2 bg-sky-700 text-yellow-200 hover:cursor-pointer hover:bg-sky-900">
                            Generate Invoice
                        </div>
                    ) : (
                        ''
                    )}
                </div>
                {props?.data?.value?.order_statuses[0]?.status_id === 1 ? (
                    <Button className="px-2 bg-yellow-200 text-sky-700 hover:cursor-pointer hover:bg-sky-700 hover:text-yellow-200">
                        Upload Payment Receipt
                    </Button>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}
