import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { userAddToCartAsync } from '../../../redux/features/cartSlice';
export default function ProductsCard(props) {
    const dispatch = useDispatch();

    return (
        <div className="w-[400px] h-[550px] border flex flex-col p-2 relative shadow-lg mt-9">
            <Link to={`/products/${props?.data?.id}`}>
                <div className="flex justify-center">
                    {console.log('', props)}
                    <img
                        src={props?.data?.product_images[0]?.name}
                        alt="..."
                        className="h-[300px]"
                    />
                </div>
                <div className="font-bold text-xl pt-4">{props.data.name}</div>
                <div>Rp {props?.data?.price.toLocaleString('id')}</div>
                <div>{props?.data?.description}</div>
            </Link>
            <div
                onClick={() =>
                    dispatch(
                        userAddToCartAsync({
                            product_id: props?.data?.id,
                            quantity: 1,
                        }),
                    )
                }
                className="absolute bottom-5 right-5 hover:cursor-pointer hover:border hover: rounded-full hover:p-4 hover:bg-sky-700 hover:text-yellow-200"
            >
                <AiOutlineShoppingCart size={25} />
            </div>
        </div>
    );
}
