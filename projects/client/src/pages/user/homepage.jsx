import CarouselHome from '../../components/user/homepage/carousel';
import CategoryCard from '../../components/user/homepage/categoryCard';
import { Helmet } from 'react-helmet';

//redux
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import NewArrivalsCard from '../../components/user/productCard/newArrivalsCard';
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';

import {
    getAllCategoriesAsync,
    getBestSellerAsync,
    getNewArrivalsAsync,
} from '../../redux/features/homepageSlice';
import ServicesBox from '../../components/user/homepage/services';
import BestSellerCard from '../../components/user/productCard/bestSellerCard';
import { Toaster } from 'react-hot-toast';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { userAddToCartAsync } from '../../redux/features/cartSlice';

export default function Homepage() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.homepage.category);
    const bestSeller = useSelector((state) => state.homepage.bestSeller);
    const newArrivals = useSelector((state) => state.homepage.newArrivals);

    useEffect(() => {
        dispatch(getAllCategoriesAsync());
        dispatch(getBestSellerAsync());
        dispatch(getNewArrivalsAsync());
    }, []);

    return (
        <div className="mb-16">
            <Toaster />
            <Helmet>
                <title>IKEWA | Home of Furniture</title>
                <meta name="description" content="homepage" />
            </Helmet>
            <div>
                <CarouselHome />
            </div>
            <div className="pt-9 w-full">
                <div className="flex justify-center my-9 text-3xl font-bold">
                    Shop By Category
                </div>
                <div className="flex justify-evenly gap-24 flex-wrap px-[300px]">
                    {categories?.data?.map((value, index) => {
                        return (
                            <div key={index}>
                                <CategoryCard data={value} />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="pt-9">
                <div className="flex justify-center my-9 text-3xl font-bold">
                    New Arrivals
                </div>
                <div className="flex justify-center gap-14 px-9">
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={100}
                        slidesPerView={3}
                        navigation
                    >
                        {newArrivals?.data?.map((value, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <div key={index} className="mx-24">
                                        <SwiperSlide>
                                            <div className="rounded shadow-xl flex">
                                                <div className="w-full flex-1">
                                                    <img
                                                        src={
                                                            value
                                                                ?.product_images[0]
                                                                ?.name
                                                        }
                                                        alt="..."
                                                        className="h-[400px] w-full"
                                                    />
                                                </div>
                                                <div className="w-full text-center flex-1 py-9 border-l bg-sky-700 text-yellow-300 px-4 relative flex flex-col gap-4">
                                                    <div className="font-bold text-lg">
                                                        {value?.name}
                                                    </div>
                                                    <div>
                                                        Rp{' '}
                                                        {(value?.price).toLocaleString(
                                                            'id',
                                                        )}
                                                    </div>
                                                    <div>
                                                        {value?.description}
                                                    </div>
                                                    <div className="absolute right-5 bottom-5 flex gap-4">
                                                        <div
                                                            className="hover:cursor-pointer hover:border hover:rounded-full hover:p-4 hover:bg-yellow-200 hover:text-sky-700"
                                                            onClick={() =>
                                                                dispatch(
                                                                    userAddToCartAsync(
                                                                        {
                                                                            product_id:
                                                                                value.id,
                                                                            quantity: 1,
                                                                        },
                                                                    ),
                                                                )
                                                            }
                                                        >
                                                            <AiOutlineShoppingCart
                                                                size={25}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </Swiper>
                    {console.log(newArrivals)}
                </div>
            </div>
            <div className="pt-9">
                <div className="flex justify-center my-9 text-3xl font-bold">
                    Best Seller
                </div>
                <div className="flex justify-center flex-wrap gap-24 px-[100px]">
                    {bestSeller?.data?.map((value, index) => {
                        return <BestSellerCard key={index} data={{ value }} />;
                    })}
                </div>
            </div>
            <div className="pt-9">
                <div className="flex justify-center my-9 text-3xl font-bold">
                    Services For Your Convenience
                </div>
                <div>
                    <ServicesBox />
                </div>
            </div>
        </div>
    );
}
