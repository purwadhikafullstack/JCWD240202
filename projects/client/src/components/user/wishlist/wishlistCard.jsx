import { Button } from 'flowbite-react';
import { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FcCancel } from 'react-icons/fc';
import ModalRemoveWishlist from './modalRemoveWishlist';
import { useDispatch } from 'react-redux';
import { removeWishlistAsync } from '../../../redux/features/wishlistSlice';
import { useNavigate } from 'react-router-dom';
import { userAddToCartAsync } from '../../../redux/features/cartSlice';
import { BsFillCartCheckFill } from 'react-icons/bs';

export default function WishlistCard(props) {
    const dispatch = useDispatch();
    const [addCart, setAddCart] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [modalRemove, setModalRemove] = useState(false);
    const [afterAddCart, setAfterAddCart] = useState(false);
    const navigate = useNavigate();

    const removeProduct = () => {
        dispatch(
            removeWishlistAsync({
                product_id: props?.data?.value?.product?.id,
            }),
        );
    };

    return (
        <>
            <div className="border rounded-xl h-[250px] w-full p-4 mb-4">
                <div className="h-full w-full flex items-center gap-4 relative">
                    <div
                        onClick={() => {
                            navigate(
                                `/products/${props?.data?.value?.product?.id}`,
                            );
                        }}
                        className="flex-1 h-full w-full flex items-center gap-9 hover:cursor-pointer"
                    >
                        <div className='max-md:hidden'>
                            <img
                                src={
                                    props?.data?.value?.product
                                        ?.product_images[0].name
                                }
                                alt="wishlist_image"
                                className="h-[200px]"
                            />
                        </div>
                        <div className="h-full py-4 flex flex-col gap-1 relative">
                            <div className="font-bold">
                                {props?.data?.value?.product?.name}
                            </div>
                            <div>
                                Rp{' '}
                                {props?.data?.value?.product?.price.toLocaleString(
                                    'id-ID',
                                )}
                            </div>
                            <div className="flex gap-1">
                                <div
                                    className="border h-7 w-7"
                                    style={{
                                        backgroundColor:
                                            props?.data?.value?.product?.color
                                                ?.color_code,
                                    }}
                                ></div>
                                <div>
                                    {props?.data?.value?.product?.color?.name}
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0">
                                <div>
                                    {(
                                        props?.data?.value?.product?.weight /
                                        1000
                                    ).toFixed(2)}{' '}
                                    Kg
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full h-full flex items-center justify-center">
                        <div>
                            {props?.data?.value?.product?.total_stock <= 0 ? (
                                <div className="font-bold text-red-700">
                                    Out of Stock
                                </div>
                            ) : afterAddCart === true ? (
                                <div className="flex flex-col items-center border bg-yellow-300 text-sky-700 p-2 rounded-xl">
                                    <BsFillCartCheckFill size={25} />
                                    Added to Cart
                                </div>
                            ) : addCart === true ? (
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 flex items-center justify-center">
                                        <div className="flex-1 flex items-center justify-center">
                                            <div className="flex border gap-9 p-4 rounded-full items-center">
                                                <div
                                                    onClick={() => {
                                                        quantity > 1
                                                            ? setQuantity(
                                                                  quantity - 1,
                                                              )
                                                            : setQuantity(
                                                                  quantity,
                                                              );
                                                    }}
                                                    className="text-xl hover:cursor-pointer"
                                                >
                                                    -
                                                </div>
                                                <div>{quantity}</div>
                                                <div
                                                    onClick={() =>
                                                        setQuantity(
                                                            quantity + 1,
                                                        )
                                                    }
                                                    className="text-xl hover:cursor-pointer"
                                                >
                                                    +
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => {
                                            dispatch(
                                                userAddToCartAsync({
                                                    product_id:
                                                        props?.data?.value
                                                            ?.product?.id,
                                                    quantity: quantity,
                                                }),
                                            );
                                            setQuantity(1);
                                            setAddCart(false);
                                            setAfterAddCart(true);
                                        }}
                                        className="bg-sky-700 text-yellow-300 h-[40px] w-[40px]"
                                    >
                                        <AiOutlineShoppingCart size={20} />
                                    </Button>
                                    <Button
                                        color={'light'}
                                        className="h-[40px] w-[40px]"
                                        onClick={() => setAddCart(false)}
                                    >
                                        <FcCancel size={20} />
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    onClick={() => setAddCart(true)}
                                    className="bg-sky-700 text-yellow-300"
                                >
                                    <div className="flex gap-2 items-center">
                                        <div>Add to Cart</div>{' '}
                                        <div>
                                            <AiOutlineShoppingCart size={20} />
                                        </div>
                                    </div>
                                </Button>
                            )}
                        </div>
                        <div></div>
                    </div>
                    <div
                        onClick={() => setModalRemove(true)}
                        className="absolute bottom-0 right-0 underline text-sm hover:cursor-pointer"
                    >
                        remove
                    </div>
                </div>
            </div>
            <ModalRemoveWishlist
                state={{ modalRemove, setModalRemove }}
                data={{ product_id: props?.data?.value?.product?.id }}
                func={{ removeProduct }}
            />
        </>
    );
}
