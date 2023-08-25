import { Button, Table } from 'flowbite-react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export default function GenerateInvoice({ data }) {
    const _invoice = useRef();

    const handleInvoice = useReactToPrint({
        content: () => _invoice.current,
        documentTitle: 'Invoice',
        onAfterPrint: () => 'Generate Invoice Success',
    });

    return (
        <>
            {console.log('', data)}
            <div>
                <Button
                    onClick={handleInvoice}
                    className="px-2 bg-sky-700 text-yellow-200 hover:cursor-pointer hover:bg-sky-900"
                >
                    Generate Invoice
                </Button>
            </div>
            <div>
                <div className="hidden">
                    <div ref={_invoice} className="p-14 relative h-screen">
                        <div className="flex justify-between items-center">
                            <div className="flex-1 flex justify-start">
                                <img
                                    src="/logo2.png"
                                    alt="logo_image"
                                    className="w-52"
                                />
                            </div>
                            <div className="flex-1 flex flex-col items-end">
                                <div className="font-bold">Invoice Number</div>
                                <div>{data?.order?.invoice_number}</div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-9">
                            <div>
                                <div className="font-bold">Seller</div>
                                <div className="pt-2">IKEWA STORE</div>
                            </div>
                            <div className="w-72">
                                <div className="font-bold">Buyer</div>
                                <div className="flex flex-col gap-2 pt-2">
                                    <div className="flex justify-between gap-2">
                                        <div className="flex-2 w-24 flex justify-between">
                                            <div>Name</div>
                                            <div>:</div>
                                        </div>
                                        <div className="flex justify-start flex-1 font-bold">
                                            {data?.order?.receiver_name}
                                        </div>
                                    </div>
                                    <div className="flex justify-between gap-2">
                                        <div className="flex-2 w-24 flex justify-between">
                                            <div>Date</div>
                                            <div>:</div>
                                        </div>
                                        <div className="flex justify-start flex-1 font-bold">
                                            {data?.order?.createdAt}
                                        </div>
                                    </div>
                                    <div className="flex justify-between gap-2">
                                        <div className="flex-2 w-24 flex justify-between">
                                            <div>Address</div>
                                            <div>:</div>
                                        </div>
                                        <div className="flex justify-start flex-1 font-bold">
                                            {data?.order?.shipping_address}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-9">
                            <Table className="drop-shadow-none">
                                <Table.Head className="border-y border-black">
                                    <Table.HeadCell className="bg-white py-4">
                                        Product Name
                                    </Table.HeadCell>
                                    <Table.HeadCell className="bg-white py-4">
                                        Quantity
                                    </Table.HeadCell>
                                    <Table.HeadCell className="bg-white py-4">
                                        Price
                                    </Table.HeadCell>
                                    <Table.HeadCell className="bg-white py-4">
                                        Total Price
                                    </Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y border-b">
                                    {data?.order?.cart?.cart_products?.map(
                                        (value, index) => {
                                            return (
                                                <Table.Row key={index}>
                                                    <Table.Cell>
                                                        {value.product_name}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {value?.quantity}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        Rp{' '}
                                                        {value?.price.toLocaleString(
                                                            'id-ID',
                                                        )}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        Rp{' '}
                                                        {(
                                                            value?.quantity *
                                                            value?.price
                                                        ).toLocaleString(
                                                            'id-ID',
                                                        )}
                                                    </Table.Cell>
                                                </Table.Row>
                                            );
                                        },
                                    )}
                                </Table.Body>
                            </Table>
                        </div>
                        <div className="flex justify-end pt-4">
                            <div className="w-1/2 flex flex-col gap-2">
                                <div className="flex justify-between">
                                    <div className="flex-1">Shipping Fee</div>
                                    <div className="flex-1 pl-24 flex justify-start font-bold">
                                        Rp{' '}
                                        {data?.order?.shipping_fee.toLocaleString(
                                            'id-ID',
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex-1">
                                        Total Cart Price
                                    </div>
                                    <div className="flex-1 pl-24 flex justify-start font-bold">
                                        Rp{' '}
                                        {data?.order?.total_cart_price.toLocaleString(
                                            'id-ID',
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-between border-t pt-2">
                                    <div className="flex-1">Total</div>
                                    <div className="flex-1 pl-24 flex justify-start font-bold">
                                        Rp{' '}
                                        {data?.order?.total.toLocaleString(
                                            'id-ID',
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-t mt-9 flex justify-between pt-2">
                            <div className="flex-1 flex justify-start">
                                <div>
                                    <div>Courier : </div>
                                    <div className="font-bold">
                                        {data?.order?.courier.toUpperCase()} -{' '}
                                        {data?.order?.shipping_method}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 flex justify-start">
                                <div>
                                    <div>Payment Method : </div>
                                    <div className="font-bold">
                                        Bank Transfer
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute left-5 bottom-0">
                            <img
                                src="/wm_paid.png"
                                alt="wm_image"
                                className="opacity-50"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
