export default function ShippingDetails(props) {
    return (
        <>
            <div className="text-lg border-b py-4 font-bold flex items-center">
                Shipping Details
            </div>
            <div className="flex flex-col divide-y">
                <div className="flex justify-between items-center py-4">
                    <div className="flex-1">Courier</div>
                    <div className="flex-1">
                        {props?.data?.userOrderDetails?.data?.courier}
                    </div>
                </div>
                <div className="flex justify-between items-center py-4">
                    <div className="flex-1">Method</div>
                    <div className="flex-1">
                        {props?.data?.userOrderDetails?.data?.shipping_method}
                    </div>
                </div>
                <div className="flex justify-between items-center py-4">
                    <div className="flex-1">Shipping Fee</div>
                    <div className="flex-1">
                        Rp{' '}
                        {props?.data?.userOrderDetails?.data?.shipping_fee.toLocaleString(
                            'ID-id',
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
