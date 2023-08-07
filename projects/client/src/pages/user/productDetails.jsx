import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    productDetailsAsync,
    productRecommenadationAsync,
} from '../../redux/features/productSlice';
import { Button } from 'flowbite-react';
import { SlArrowRight } from 'react-icons/sl';
import CarouselDetails from '../../components/user/productDetails/carouselDetails';
import ProductDescription from '../../components/user/productDetails/productDescription';
import RelatedProducts from '../../components/user/productCard/recommendationCard';
import { userAddToCartAsync } from '../../redux/features/cartSlice';
import { AiOutlineHeart } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';

export default function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const proDetails = useSelector((state) => state.product.details);
    const recommendation = useSelector(
        (state) => state.product.recommendations,
    );
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(productDetailsAsync(id));
        dispatch(productRecommenadationAsync(id));
    }, []);
    return (
        <div className="divide-y">
            <Toaster />
            <div className="flex px-[200px] justify-evenly gap-14 pt-9">
                <div className="flex-1">
                    <div className="h-[700px]">
                        <CarouselDetails
                            data={{ proDetails: proDetails.data }}
                        />
                    </div>
                    <div className="border-t border-b my-9">
                        <div className="flex items-center justify-between py-9">
                            <div className="text-lg font-bold">Reviews</div>
                            <div>
                                <SlArrowRight />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-2 w-[500px]">
                    <ProductDescription
                        data={{ proDetails: proDetails.data }}
                    />
                    {proDetails?.data?.findProduct?.total_stock === 0 ? (
                        ''
                    ) : (
                        <div className="flex justify-between items-center pt-14">
                            <div>Quantity</div>
                            <div className="flex gap-2 items-center border rounded-lg">
                                <div
                                    onClick={
                                        quantity <= 1
                                            ? ''
                                            : () => setQuantity(quantity - 1)
                                    }
                                    className="p-2 hover:cursor-pointer"
                                >
                                    -
                                </div>
                                <div className="px-9">{quantity}</div>
                                <div
                                    onClick={() => {
                                        quantity ===
                                        proDetails?.data?.findProduct
                                            ?.total_stock
                                            ? toast.error(
                                                  'Not enough stock available',
                                              )
                                            : setQuantity(quantity + 1);
                                    }}
                                    className="p-2 hover:cursor-pointer"
                                >
                                    +
                                </div>
                            </div>
                        </div>
                    )}
                    {proDetails?.data?.findProduct?.total_stock < 10 &&
                    proDetails?.data?.findProduct?.total_stock > 0 ? (
                        <div className="text-red-700 text-xl">Low Stock!</div>
                    ) : (
                        ''
                    )}

                    {proDetails?.data?.findProduct?.total_stock === 0 ? (
                        <>
                            <div className="text-red-700 text-xl pt-9">
                                Out Of Stock!
                            </div>
                            <div className="mt-9 flex items-center gap-9">
                                <div className="flex-1">
                                    <Button
                                        pill
                                        className="w-full p-4 bg-sky-700 text-yellow-200"
                                        onClick={() =>
                                            toast.error(
                                                'Sorry product currently out of stock..',
                                            )
                                        }
                                    >
                                        <div className="text-xl line-through">
                                            Add to Cart
                                        </div>
                                    </Button>
                                </div>
                                <div className="flex-2">
                                    <AiOutlineHeart
                                        size={60}
                                        className="rounded-full border p-4 hover:bg-red-700 hover:text-yellow-200"
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="mt-9 flex items-center gap-9">
                            <div className="flex-1">
                                <Button
                                    pill
                                    className="w-full p-4 bg-sky-700 text-yellow-200"
                                    onClick={() =>
                                        dispatch(
                                            userAddToCartAsync({
                                                product_id: Number(id),
                                                quantity: quantity,
                                            }),
                                        )
                                    }
                                >
                                    <div className="text-xl">Add to Cart</div>
                                </Button>
                            </div>
                            <div className="flex-2">
                                <AiOutlineHeart
                                    size={60}
                                    className="rounded-full border p-4 hover:bg-red-700 hover:text-yellow-200"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="px-[200px]">
                <div className="pt-9 text-3xl font-bold">Related Products</div>
                <div className="pt-9 flex gap-9">
                    <RelatedProducts data={{ recommendation }} />
                </div>
            </div>
        </div>
    );
}
