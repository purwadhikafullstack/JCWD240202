import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBestSellerAsync } from '../../redux/features/home/homepageSlice';
import { AiOutlineHeart } from 'react-icons/ai';

export default function BestSellerCard() {
    const dispatch = useDispatch();
    const bestSellerList = useSelector((state) => state.homepage.bestSeller);

    useEffect(() => {
        dispatch(getBestSellerAsync());
    }, []);
    return (
        <>
            {bestSellerList?.data?.map((value, index) => {
                return (
                    <div className="w-[200px] h-[350px] flex flex-col">
                        <div className="flex-1 relative">
                            <img
                                src={value.product_images[0]?.name}
                                alt="best seller products"
                            />
                        </div>
                        <div className="flex flex-col gap-2 flex-1 border bg-sky-700 text-yellow-300 flex flex-col">
                            <div className="font-bold flex-1 px-2 pt-2">
                                {value.name}
                            </div>
                            <div className="flex-1 px-2">
                                Rp {value.price.toLocaleString('id')}
                            </div>
                            <div className="border-t flex justify-center py-2 bg-yellow-300 text-sky-700 hover:cursor-pointer hover:bg-yellow-400">
                                Add to Cart
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}
