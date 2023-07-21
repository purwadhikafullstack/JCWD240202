import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getNewArrivalsAsync } from '../../../redux/features/homepageSlice';

export default function NewArrivalsCard() {
    const dispatch = useDispatch();
    const newArrivalsList = useSelector((state) => state.homepage.newArrivals);

    useEffect(() => {
        dispatch(getNewArrivalsAsync());
    }, []);
    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={100}
            slidesPerView={3}
            navigation
        >
            {newArrivalsList?.data?.map((value, index) => {
                return (
                    <div key={index} className="mx-24">
                        <SwiperSlide>
                            <div className="border rounded shadow-xl flex">
                                <div className="w-full flex-1">
                                    <img
                                        src={value?.product_images[0]?.name}
                                        alt="..."
                                        className="h-[400px] w-full"
                                    />
                                </div>
                                <div className="w-full text-center flex-1 py-9 border-l bg-sky-700 text-yellow-300 px-4 relative flex flex-col gap-4">
                                    <div className="font-bold text-lg">
                                        {value?.name}
                                    </div>
                                    <div>
                                        Rp {(value?.price).toLocaleString('id')}
                                    </div>
                                    <div>{value?.description}</div>
                                    <div className="absolute right-5 bottom-5 flex gap-4">
                                        <div>
                                            <AiOutlineShoppingCart size={25} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </div>
                );
            })}
        </Swiper>
    );
}
