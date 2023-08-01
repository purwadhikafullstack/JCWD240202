import { Button } from 'flowbite-react';

export default function OrderSummary(props) {
    return (
        <div className="border h-[500px] w-[350px] mt-9 rounded-2xl shadow-xl relative">
            <div className="font-bold text-lg p-4 border-b bg-sky-700 text-yellow-200">
                Order Summary
            </div>
            <div className="p-4 flex flex-col gap-4">
                <div className="flex justify-between gap-4">
                    <div className="font-bold">Warehouse Origin </div>
                    <div>
                        {props?.data?.closestWH?.data?.warehouseData.city}
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="font-bold">Total Weight</div>{' '}
                    <div>{props?.data?.weight} Kg</div>
                </div>
                <div className="flex justify-between">
                    <div className="font-bold">Distance </div>
                    <div>{props?.data?.closestWH?.data?.distanceInKm} Km</div>
                </div>
                <div className="flex justify-between">
                    <div className="font-bold">Shipping Fee</div>
                    <div>
                        Rp{' '}
                        {Number(props?.data?.shippingFee).toLocaleString(
                            'ID-id',
                        )}
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="font-bold">Total Cart Price</div>
                    <div>
                        Rp {Number(props?.data?.price).toLocaleString('ID-id')}
                    </div>
                </div>
                <div className="border-t pt-4 flex justify-between">
                    <div className="font-bold">Total</div>
                    <div>
                        Rp{' '}
                        {(
                            Number(props?.data?.shippingFee) +
                            Number(props?.data?.price)
                        ).toLocaleString('ID-id')}
                    </div>
                </div>
            </div>
            <div className="w-full absolute bottom-0 p-2">
                <Button className="w-full bg-sky-700 text-yellow-200 h-[70px]">
                    <div className="text-2xl">Confirm Order</div>
                </Button>
            </div>
        </div>
    );
}
