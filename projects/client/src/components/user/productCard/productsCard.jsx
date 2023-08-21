import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { FcLike } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userAddToCartAsync } from '../../../redux/features/cartSlice';
import {
    addWishlistsAsync,
    removeWishlistAsync,
} from '../../../redux/features/wishlistSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

export default function ProductsCard(props) {
    const dispatch = useDispatch();
    const wishlistProducts = useSelector((state) => state.wishlist.wishlistIds);
    const userLogin = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    const navigate = useNavigate();

    return (
        <div className="w-[400px] h-[550px] border flex flex-col p-2 relative shadow-lg mt-9">
            {userLogin ? (
                wishlistProducts.includes(props?.data?.value?.id) === true ? (
                    <div
                        onClick={() =>
                            dispatch(
                                removeWishlistAsync({
                                    product_id: props?.data?.value?.id,
                                }),
                            )
                        }
                        className="absolute left-5 top-5 hover:cursor-pointer"
                    >
                        <FcLike size={30} />
                    </div>
                ) : (
                    <div
                        onClick={() =>
                            dispatch(
                                addWishlistsAsync({
                                    product_id: props?.data?.value?.id,
                                }),
                            )
                        }
                        className="absolute left-5 top-5 hover:cursor-pointer"
                    >
                        <AiOutlineHeart size={30} />
                    </div>
                )
            ) : (
                <div
                    onClick={() => {
                        toast.error('Please Login/Register First');
                        navigate('/login');
                    }}
                    className="absolute left-5 top-5 hover:cursor-pointer"
                >
                    <AiOutlineHeart size={30} />
                </div>
            )}

            <Link to={`/products/${props?.data?.value?.id}`}>
                <div className="flex justify-center">
                    <img
                        src={props?.data?.value?.product_images[0]?.name.startsWith('PIMG') ? process.env.REACT_APP_API_IMAGE_URL + props?.data?.value?.product_images[0]?.name : props?.data?.value?.product_images[0]?.name}
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
            {userLogin ? (
                props?.data?.value?.total_stock === 0 ? (
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
                )
            ) : props?.data?.value?.total_stock === 0 ? (
                <div className="absolute bottom-5 right-5 text-red-700 font-bold hover:cursor-pointer">
                    Out Of Stock!
                </div>
            ) : (
                <div
                    onClick={() => {
                        toast.error('Please Login/Register First');
                        navigate('/login');
                    }}
                    className="absolute bottom-5 right-5 hover:cursor-pointer hover:border hover: rounded-full hover:p-4 hover:bg-sky-700 hover:text-yellow-200"
                >
                    <AiOutlineShoppingCart size={25} />
                </div>
            )}
        </div>
    );
}
