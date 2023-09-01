export default function CartLists(props) {
    return (
        <div className="flex py-4 gap-9 max-md:h-[200px]">
            <div className="md:w-[200px] md:h-[150px] max-md:flex-2">
                <img
                    src={props?.data?.value?.image}
                    alt="product_image"
                    className="md:w-[200px] md:h-[150px] max-md:w-[100px] max-md:h-[150px]"
                />
            </div>
            <div className="relative max-md:flex-1">
                <div className="font-bold text-xl">
                    {props?.data?.value?.product_name}
                </div>
                <div>{props?.data?.value?.quantity} Items</div>
                <div className="text-lg font-bold">
                    Rp{' '}
                    {(
                        props?.data?.value?.price * props?.data?.value?.quantity
                    ).toLocaleString('ID-id')}
                </div>
                <div className="absolute bottom-0">
                    {(
                        (props?.data?.value?.product?.weight *
                            props?.data?.value?.quantity) /
                        1000
                    ).toFixed(2)}{' '}
                    Kg
                </div>
            </div>
        </div>
    );
}
