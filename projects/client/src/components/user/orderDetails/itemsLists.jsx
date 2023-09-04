export default function ShoppingItemLists(props) {
    return (
        <>
            {props?.data?.userOrderDetails?.map((value, index) => {
                return (
                    <div key={index} className="flex border-b py-4">
                        <div className="flex-1 md:w-[300px] pr-4 flex items-center gap-4">
                            <div className="md:w-[100px]">
                                <img
                                    src={value?.image ? process.env.REACT_APP_API_IMAGE_URL + value?.image : value?.image}
                                    className="h-[100px] w-[100px]"
                                    alt="image_shopping_list"
                                />
                            </div>
                            <div className="flex-1 md:w-[200px] flex flex-wrap">
                                {value?.product_name}
                            </div>
                        </div>
                        <div className="flex-2 md:w-[200px] flex items-center justify-center">
                            Rp {value?.price.toLocaleString('ID-id')}
                        </div>
                        <div className="flex-2 md:w-[100px] flex items-center justify-center">
                            {value?.quantity}
                        </div>
                    </div>
                );
            })}
        </>
    );
}
