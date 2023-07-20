import CarouselHome from '../../components/user/homepage/carousel';
import CategoryCard from '../../components/user/homepage/categoryCard';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import NewArrivalsCard from '../../components/user/homepage/newArrivalsCard';
import { getAllCategoriesAsync } from '../../redux/features/homepageSlice';
import ServicesBox from '../../components/user/homepage/services';
import BestSellerCard from '../../components/user/homepage/bestSellerCard';

export default function Homepage() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.homepage.category);

    useEffect(() => {
        dispatch(getAllCategoriesAsync());
    }, []);

    return (
        <div>
            <div>
                <CarouselHome />
            </div>
            <div className="pt-9 w-full">
                <div className="flex justify-center my-9 text-3xl font-bold">
                    Shop By Category
                </div>
                <div className="flex justify-evenly gap-24 flex-wrap px-[300px]">
                    {categories?.data?.map((value, index) => {
                        return <CategoryCard key={index} data={value} />;
                    })}
                </div>
            </div>
            <div className="pt-9">
                <div className="flex justify-center my-9 text-3xl font-bold">
                    New Arrivals
                </div>
                <div className="flex justify-center gap-14">
                    <NewArrivalsCard />
                </div>
            </div>
            <div className="pt-9">
                <div className="flex justify-center my-9 text-3xl font-bold">
                    Best Seller
                </div>
                <div className="flex justify-center flex-wrap gap-24 px-[100px]">
                    <BestSellerCard />
                </div>
            </div>
            <div className="pt-9">
                <div className="flex justify-center my-9 text-3xl font-bold">
                    Layanan Untuk Kenyamanan Anda
                </div>
                <div>
                    <ServicesBox />
                </div>
            </div>
        </div>
    );
}
