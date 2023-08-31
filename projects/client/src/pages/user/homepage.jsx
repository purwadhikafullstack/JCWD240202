import CarouselHome from '../../components/user/homepage/carousel';
import CategoryCard from '../../components/user/homepage/categoryCard';
import { Helmet } from 'react-helmet';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import NewArrivalsCard from '../../components/user/productCard/newArrivalsCard';
import {
    getAllCategoriesAsync,
    getBestSellerAsync,
    setLoading,
} from '../../redux/features/homepageSlice';
import ServicesBox from '../../components/user/homepage/services';
import BestSellerCard from '../../components/user/productCard/bestSellerCard';
import { Toaster } from 'react-hot-toast';
import SkeletonBestSeller from '../../components/user/productCard/skeletonBestSeller';

export default function Homepage() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.homepage.category);
    const bestSeller = useSelector((state) => state.homepage.bestSeller);
    const loading = useSelector((state) => state.homepage.loading);
    useEffect(() => {
        dispatch(getAllCategoriesAsync());
        dispatch(getBestSellerAsync());
        return () => dispatch(setLoading(false))
    }, []);

    return (
        <div className="mb-16">
            <Toaster />
            <Helmet>
                <title>IKEWA | Home of Furniture</title>
                <meta name="description" content="homepage" />
            </Helmet>
            <div>
                {loading ? (
                    <CarouselHome />
                ) : (
                    <div className="w-full h-[440px] bg-gray-300 dark:bg-gray-300 animate-pulse"></div>
                )}
            </div>
            <div className="pt-9 w-full">
                {loading ? (
                    <div className="flex justify-center my-9 text-3xl font-bold">
                        Shop By Category
                    </div>
                ) : (
                    <div className="my-9 flex justify-center">
                        <div className="bg-gray-300 dark:bg-gray-300 w-52 h-8 rounded-lg animate-pulse"></div>
                    </div>
                )}

                <div className="flex justify-evenly gap-24 flex-wrap px-[300px]">
                    {categories?.data?.map((value, index) => {
                        if (loading) {
                            return (
                                <div key={index}>
                                    <CategoryCard data={value} />
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    key={index}
                                    className="hover:border hover:rounded-lg hover:shadow-lg hover:font-bold"
                                >
                                    <div className="w-[200px] h-[150px]">
                                        <div className="w-full h-full bg-gray-300 dark:bg-gray-300 rounded-lg animate-pulse"></div>
                                    </div>
                                    <div className="flex justify-center items-center p-4">
                                        <div className="w-32 h-8 bg-gray-300 dark:bg-gray-300 rounded-lg animate-pulse"></div>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
            <div className="pt-9">
                {loading ? (
                    <div className="flex justify-center my-9 text-3xl font-bold">
                        New Arrivals
                    </div>
                ) : (
                    <div className="my-9 flex justify-center">
                        <div className="bg-gray-300 dark:bg-gray-300 w-52 h-8 rounded-lg animate-pulse"></div>
                    </div>
                )}
                <div className="flex justify-center gap-14 px-9">
                    <NewArrivalsCard loading={loading} />
                </div>
            </div>
            <div className="pt-9">
                {loading ? (
                    <div className="flex justify-center my-9 text-3xl font-bold">
                        Best Seller
                    </div>
                ) : (
                    <div className="my-9 flex justify-center">
                        <div className="bg-gray-300 dark:bg-gray-300 w-52 h-8 rounded-lg animate-pulse"></div>
                    </div>
                )}
                <div className="flex justify-center flex-wrap gap-24 px-[100px]">
                    {bestSeller?.data?.map((value, index) => {
                        if (loading) {
                            return (
                                <BestSellerCard key={index} data={{ value }} />
                            );
                        } else {
                            return <SkeletonBestSeller key={index} />;
                        }
                    })}
                </div>
            </div>
            <div className="pt-9">
                <div className="flex justify-center my-9 text-3xl font-bold">
                    Services For Your Convenience
                </div>
                <div>
                    <ServicesBox loading={loading} />
                </div>
            </div>
        </div>
    );
}
