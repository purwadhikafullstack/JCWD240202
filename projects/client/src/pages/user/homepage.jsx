import CarouselHome from '../../components/user/homepage/carousel';
import CategoryCard from '../../components/user/homepage/categoryCard';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import {
    getAllCategoriesAsync,
    getBestSellerAsync,
    getNewArrivalsAsync,
} from '../../redux/features/homepageSlice';
import ServicesBox from '../../components/user/homepage/services';
import BestSellerCard from '../../components/user/productCard/bestSellerCard';
import { Toaster } from 'react-hot-toast';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
    Navigation,
    Pagination,
    A11y,
    Scrollbar,
    Autoplay,
    EffectCards,
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { userAddToCartAsync } from '../../redux/features/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.homepage.category);
    const bestSeller = useSelector((state) => state.homepage.bestSeller);
    const newArrivals = useSelector((state) => state.homepage.newArrivals);
    const navigate = useNavigate();

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
            <div className='w-full'>
                <CarouselHome />
            </div>
            <div className="pt-9 w-full">
                <div className="flex justify-center my-9 text-3xl font-bold">
                    Shop By Category
                </div>
                <div className="flex justify-evenly items-center gap-17 flex-wrap px-24">
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
                <div className="flex justify-center gap-14 md:px-24 max-md:px-2">
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={100}
                        slidesPerView={2}
                        navigation
                    >
                        {newArrivals?.data?.map((value, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <div className="rounded-xl shadow-2xl flex lg:flex-row max-lg:flex-col h-full">
                                        <div className="w-full flex-1">
                                            <img
                                                src={
                                                    value?.product_images[0]
                                                        ?.name
                                                }
                                                alt="..."
                                                className="lg:h-[400px] w-full"
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
                                            <div className='max-lg:hidden'>{value?.description}</div>
                                            <div className="absolute right-5 bottom-5 flex gap-4">
                                                <div
                                                    className="hover:cursor-pointer hover:border hover:rounded-full hover:p-4 hover:bg-yellow-200 hover:text-sky-700"
                                                    onClick={() =>
                                                        dispatch(
                                                            userAddToCartAsync({
                                                                product_id:
                                                                    value.id,
                                                                quantity: 1,
                                                            }),
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
                            );
                        })}
                    </Swiper>
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
            <div className="pt-9 overflow-auto">
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
