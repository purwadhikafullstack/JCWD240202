import CarouselHome from '../../components/user/homepage/carousel';
import CategoryCard from '../../components/user/homepage/categoryCard';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import NewArrivalsCard from '../../components/user/productCard/newArrivalsCard';
import {
    getAllCategoriesAsync,
    getBestSellerAsync,
} from '../../redux/features/homepageSlice';
import ServicesBox from '../../components/user/homepage/services';
import BestSellerCard from '../../components/user/productCard/bestSellerCard';
import { Toaster } from 'react-hot-toast';

export default function Homepage() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.homepage.category);
    const bestSeller = useSelector((state) => state.homepage.bestSeller);

    useEffect(() => {
        dispatch(getAllCategoriesAsync());
        dispatch(getBestSellerAsync());
    }, []);

    return (
        <div className="mb-16">
            <Toaster />
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
                    {/* <NewArrivalsCard /> */}
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
