import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    productDetailsAsync,
    productRecommenadationAsync,
} from '../../redux/features/productSlice';
import { Button } from 'flowbite-react';
import { SlArrowRight, SlArrowDown } from 'react-icons/sl';
import CarouselDetails from '../../components/user/productDetails/carouselDetails';
import ProductDescription from '../../components/user/productDetails/productDescription';
import RelatedProducts from '../../components/user/productCard/recommendationCard';
import { userAddToCartAsync } from '../../redux/features/cartSlice';
import { AiOutlineHeart } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import { FcLike } from 'react-icons/fc';
import {
    addWishlistsAsync,
    removeWishlistAsync,
} from '../../redux/features/wishlistSlice';
import { getReviewsAsync } from '../../redux/features/reviewSlice';
import ReviewLists from '../../components/user/productDetails/reviewLists';
import ModalReviewLists from '../../components/user/productDetails/modalReviewLists';
import SkeletonProductDescription from '../../components/user/productDetails/skeletonProductDescription';
import SkeletonRecommendationCard from '../../components/user/productCard/skeletonRecommendationCard';

export default function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const proDetails = useSelector((state) => state.product.details);
    const recommendation = useSelector(
        (state) => state.product.recommendations,
    );
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState('');
    const [reviewSort, setReviewSort] = useState('');
    const [openReview, setOpenReview] = useState(false);
    const [allReview, setAllReview] = useState(false);
    const wishlistCheck = useSelector((state) => state.wishlist.wishlistIds);
    const reviewData = useSelector((state) => state.review.reviews);
    const userLogin = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    const loading = useSelector((state) => state.product.loading);

    const addQuantity = () => {
        if (quantity === proDetails?.data?.findProduct?.total_stock) {
            toast.error('Not enough stock available');
        } else {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity <= 1) {
            return null;
        } else {
            setQuantity(quantity - 1);
        }
    };

    useEffect(() => {
        dispatch(productDetailsAsync(id));
        dispatch(productRecommenadationAsync(id));
        dispatch(
            getReviewsAsync({
                product_id: id,
                rating,
                sort: reviewSort,
                page: 1,
            }),
        );
    }, []);
    return (
        <>
            <div className="divide-y mb-16">
                <Toaster />
                <div className="flex min-[0px]:flex-col min-[0px]:mb-9 xl:flex-row xl:px-[200px] min-[0px]:px-4 justify-evenly gap-14 pt-9">
                    <div className="flex-1">
                        <div className="h-[700px]">
                            {loading ? (
                                <CarouselDetails
                                    data={{ proDetails: proDetails.data }}
                                />
                            ) : (
                                <div className="h-[700px] bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg"></div>
                            )}
                        </div>
                        {loading ? (
                            <>
                                <div className="border-t border-b my-9">
                                    <div
                                        onClick={() =>
                                            setOpenReview(!openReview)
                                        }
                                        className="flex items-center justify-between py-6 hover:cursor-pointer"
                                    >
                                        <div className="text-lg font-bold">{`Reviews (${reviewData?.data?.count})`}</div>
                                        <div>
                                            {openReview === false ? (
                                                <SlArrowRight />
                                            ) : (
                                                <SlArrowDown />
                                            )}
                                        </div>
                                    </div>
                                    {openReview === false
                                        ? ''
                                        : reviewData?.data?.rows?.length === 0
                                        ? ''
                                        : reviewData?.data?.rows?.map(
                                              (value, index) => {
                                                  return (
                                                      <ReviewLists
                                                          key={index}
                                                          data={{ value }}
                                                      />
                                                  );
                                              },
                                          )}
                                    {reviewData?.data?.count < 5 ? (
                                        ''
                                    ) : (
                                        <div
                                            className={`py-4 flex justify-center border-t ${
                                                openReview === true
                                                    ? ''
                                                    : 'hidden'
                                            }`}
                                        >
                                            <Button
                                                onClick={() => {
                                                    setAllReview(true);
                                                    setOpenReview(false);
                                                    window.scrollTo({
                                                        top: 0,
                                                        behavior: 'smooth',
                                                    });
                                                }}
                                                color={'light'}
                                            >
                                                See All Reviews
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-16 rounded-lg bg-gray-300 dark:bg-gray-700 mb-1 mt-9 mb-9 animate-pulse"></div>
                        )}
                    </div>
                    <div className="flex-2 xl:w-[500px]">
                        {loading ? (
                            <ProductDescription
                                data={{ proDetails: proDetails.data }}
                            />
                        ) : (
                            <SkeletonProductDescription />
                        )}

                        {loading ? (
                            <>
                                {proDetails?.data?.findProduct?.total_stock ===
                                0 ? (
                                    ''
                                ) : (
                                    <div className="flex justify-between items-center pt-14">
                                        <div>Quantity</div>
                                        <div className="flex gap-2 items-center border rounded-lg">
                                            <div
                                                onClick={decreaseQuantity}
                                                className="p-2 hover:cursor-pointer"
                                            >
                                                -
                                            </div>
                                            <div className="px-9">
                                                {quantity}
                                            </div>
                                            <div
                                                onClick={addQuantity}
                                                className="p-2 hover:cursor-pointer"
                                            >
                                                +
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {proDetails?.data?.findProduct?.total_stock <
                                    10 &&
                                proDetails?.data?.findProduct?.total_stock >
                                    0 ? (
                                    <div className="text-red-700 text-xl">
                                        Low Stock!
                                    </div>
                                ) : (
                                    ''
                                )}
                            </>
                        ) : (
                            <>
                                <div className="flex justify-between items-center pt-14">
                                    <div className="w-16 h-5 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                                    <div className="w-32 h-10 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                                </div>
                            </>
                        )}

                        {loading ? (
                            <>
                                {proDetails?.data?.findProduct?.total_stock ===
                                0 ? (
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
                                            {userLogin ? (
                                                wishlistCheck?.includes(
                                                    proDetails?.data
                                                        ?.findProduct?.id,
                                                ) ? (
                                                    <div
                                                        onClick={() =>
                                                            dispatch(
                                                                removeWishlistAsync(
                                                                    {
                                                                        product_id:
                                                                            proDetails
                                                                                ?.data
                                                                                ?.findProduct
                                                                                ?.id,
                                                                    },
                                                                ),
                                                            )
                                                        }
                                                        className="flex-2"
                                                    >
                                                        <FcLike
                                                            size={60}
                                                            className="rounded-full border p-4 hover:cursor-pointer"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={() =>
                                                            dispatch(
                                                                addWishlistsAsync(
                                                                    {
                                                                        product_id:
                                                                            proDetails
                                                                                ?.data
                                                                                ?.findProduct
                                                                                ?.id,
                                                                    },
                                                                ),
                                                            )
                                                        }
                                                        className="flex-2"
                                                    >
                                                        <AiOutlineHeart
                                                            size={60}
                                                            className="rounded-full border p-4 hover:cursor-pointer"
                                                        />
                                                    </div>
                                                )
                                            ) : (
                                                <div className="flex-2">
                                                    <AiOutlineHeart
                                                        size={60}
                                                        className="rounded-full border p-4 hover:cursor-pointer"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="mt-9 flex items-center gap-9">
                                        <div className="flex-1">
                                            <Button
                                                pill
                                                className="w-full p-4 bg-sky-700 text-yellow-200"
                                                onClick={() => {
                                                    userLogin ?
                                                    dispatch(
                                                        userAddToCartAsync({
                                                            product_id:
                                                                Number(id),
                                                            quantity: quantity,
                                                        }),
                                                    ) : toast.error('Please Login/Register First')
                                                }}
                                            >
                                                <div className="text-xl">
                                                    Add to Cart
                                                </div>
                                            </Button>
                                        </div>
                                        {userLogin ? (
                                            wishlistCheck?.includes(
                                                proDetails?.data?.findProduct
                                                    ?.id,
                                            ) ? (
                                                <div
                                                    onClick={() =>
                                                        dispatch(
                                                            removeWishlistAsync(
                                                                {
                                                                    product_id:
                                                                        proDetails
                                                                            ?.data
                                                                            ?.findProduct
                                                                            ?.id,
                                                                },
                                                            ),
                                                        )
                                                    }
                                                    className="flex-2"
                                                >
                                                    <FcLike
                                                        size={60}
                                                        className="rounded-full border p-4 hover:cursor-pointer"
                                                    />
                                                </div>
                                            ) : (
                                                <div
                                                    onClick={() =>
                                                        dispatch(
                                                            addWishlistsAsync({
                                                                product_id:
                                                                    proDetails
                                                                        ?.data
                                                                        ?.findProduct
                                                                        ?.id,
                                                            }),
                                                        )
                                                    }
                                                    className="flex-2"
                                                >
                                                    <AiOutlineHeart
                                                        size={60}
                                                        className="rounded-full border p-4 hover:cursor-pointer"
                                                    />
                                                </div>
                                            )
                                        ) : (
                                            <div
                                                onClick={() => {
                                                    toast.error(
                                                        'Please Login/Register First',
                                                    );
                                                }}
                                                className="flex-2"
                                            >
                                                <AiOutlineHeart
                                                    size={60}
                                                    className="rounded-full border p-4 hover:cursor-pointer"
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="mt-9 flex items-center gap-9 animate-pulse">
                                    <div className="w-full h-20 rounded-lg bg-gray-300 dark:bg-gray-700 mb-1"></div>
                                    <div className="w-20 h-16 rounded-full bg-gray-300 dark:bg-gray-700 mb-1"></div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="xl:px-[200px] sm:px-[50px]">
                    {loading ? (
                        <div className="pt-9 text-3xl font-bold">
                            Related Products
                        </div>
                    ) : (
                        <div className="pt-9 animate-pulse">
                            <div className="w-52 h-10 rounded-lg bg-gray-300 dark:bg-gray-700 mb-1"></div>
                        </div>
                    )}
                    <div className="pt-9 flex gap-9 max-md:w-screen max-md:overflow-auto">
                        <RelatedProducts data={{ recommendation, loading, setQuantity }} />
                    </div>
                </div>
            </div>
            <ModalReviewLists
                state={{ allReview, setAllReview }}
                data={{ review: reviewData?.data, product_id: id }}
            />
        </>
    );
}
