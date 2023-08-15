import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { userAddToCartAsync } from '../../../redux/features/cartSlice';

export default function ProductsCard(props) {
    const dispatch = useDispatch();

    return (
        <div className="w-[400px] h-[550px] border flex flex-col p-2 relative shadow-lg mt-9">
            <Link to={`/products/${props?.data?.value?.id}`}>
                <div className="flex justify-center">
                    <img
                        src={props?.data?.value?.product_images[0]?.name}
                        alt="..."
                        className="h-[300px]"
                    />
                </div>
                <div className="font-bold text-xl pt-4">
                    {props?.data?.value?.name}
                </div>
                <div>Rp {props?.data?.value?.price.toLocaleString('id')}</div>
                <div>{props?.data?.value?.description}</div>
            </Link>
            {props?.data?.value?.total_stock === 0 ? (
                <div className="absolute bottom-5 right-5 text-red-700 font-bold hover:cursor-pointer">
                    Out Of Stock!
                </div>
            ) : (
                <div
                    onClick={() => {
                        dispatch(
                            userAddToCartAsync({
                                product_id: props?.data?.value?.id,
                                quantity: 1,
                            }),
                        );
                        props?.state?.setAddNewItem(true);
                    }}
                    className="absolute bottom-5 right-5 hover:cursor-pointer hover:border hover: rounded-full hover:p-4 hover:bg-sky-700 hover:text-yellow-200"
                >
                    <AiOutlineShoppingCart size={25} />
                </div>
            )}
        </div>
    );
}
