export default function ReceiverAddress(props) {
    return (
        <>
            <div className="text-lg border-b py-4 font-bold flex items-center">
                Receiver Address
            </div>
            <div className="w-1/2 flex-wrap py-4 flex items-center">
                {props?.data?.userOrderDetails?.data?.shipping_address}
            </div>
        </>
    );
}
