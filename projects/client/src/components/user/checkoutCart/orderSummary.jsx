import { Button, Label, Radio } from 'flowbite-react';
import { useState } from 'react';
import ModalConfirmationOrder from './modalConfirmationOrder';

export default function OrderSummary(props) {
    const [modalConfirmation, setModalConfirmation] = useState(false);
    const [choosePayment, setChoosePayment] = useState(false);

    return (
        <>
            <div
                className={`border h-[600px] w-[500px] mt-9 rounded-2xl shadow-xl relative ${
                    choosePayment === true ? 'h-[550px]' : 'h-max'
                }`}
            >
                <div className="font-bold text-lg p-4 border-b bg-gray-200 rounded-t-2xl">
                    Order Summary
                </div>
                <div className="p-4 flex flex-col">
                    <div className="flex justify-between items-center border-b py-2 gap-4">
                        <div className="font-bold">Warehouse Origin </div>
                        <div>
                            {props?.data?.closestWH?.data?.warehouseData.city
                                ? props?.data?.closestWH?.data?.warehouseData
                                      .city
                                : '-'}
                        </div>
                    </div>
                    <div className="flex justify-between items-center border-b py-2">
                        <div className="font-bold">Total Weight</div>{' '}
                        <div>
                            {props?.data?.weight
                                ? (props?.data?.weight / 1000).toFixed(2)
                                : 0}{' '}
                            Kg
                        </div>
                    </div>
                    <div className="flex justify-between items-center border-b py-2">
                        <div className="font-bold">Distance </div>
                        <div>
                            {props?.data?.closestWH?.data?.distanceInKm
                                ? props?.data?.closestWH?.data?.distanceInKm
                                : 0}{' '}
                            Km
                        </div>
                    </div>
                    <div className="flex justify-between items-center border-b py-2">
                        <div className="font-bold">Shipping Fee</div>
                        <div>
                            Rp{' '}
                            {Number(props?.data?.shippingFee).toLocaleString(
                                'ID-id',
                            )}
                        </div>
                    </div>
                    <div className="flex justify-between items-center border-b py-2">
                        <div className="font-bold">Total Cart Price</div>
                        <div>
                            Rp{' '}
                            {props?.data?.price
                                ? Number(props?.data?.price).toLocaleString(
                                      'ID-id',
                                  )
                                : 0}
                        </div>
                    </div>
                    <div className="pt-4 flex justify-between">
                        <div className="font-bold">Total</div>
                        <div>
                            Rp{' '}
                            {props?.data?.price
                                ? (
                                      Number(props?.data?.shippingFee) +
                                      Number(props?.data?.price)
                                  ).toLocaleString('ID-id')
                                : '0'}
                        </div>
                    </div>
                </div>
                <div className="border-t px-4 py-4 bg-gray-200">
                    <div className="font-bold">Choose Payment Method</div>
                    <div className="pt-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 items-center mb-2">
                                <Radio
                                    onClick={() => {
                                        setChoosePayment(!choosePayment);
                                    }}
                                    checked={
                                        choosePayment === true ? true : false
                                    }
                                ></Radio>
                                <Label className="text-md">Bank Transfer</Label>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div
                                className={`w-max p-2 ${
                                    choosePayment === true ? '' : 'hidden'
                                }`}
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/BANK_BRI_logo_%28vertical%29.svg/1200px-BANK_BRI_logo_%28vertical%29.svg.png"
                                    alt="payment_image"
                                    className="w-[90px] h-[60px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`w-full absolute bottom-0 p-4 bg-gray-200 ${
                        choosePayment === true ? '' : 'hidden'
                    }`}
                >
                    <Button
                        onClick={() => setModalConfirmation(true)}
                        className="w-full bg-sky-700 text-yellow-200 h-[50px]"
                    >
                        <div className="text-xl">Confirm Order</div>
                    </Button>
                </div>
            </div>
            <ModalConfirmationOrder
                data={{
                    modalConfirmation,
                    setModalConfirmation,
                    submitOrder: props?.data?.createOrder,
                }}
            />
        </>
    );
}
