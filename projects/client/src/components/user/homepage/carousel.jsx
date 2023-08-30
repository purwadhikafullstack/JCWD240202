import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function CarouselHome() {
    return (
        <>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
            >
                <SwiperSlide>
                    <img
                        src="/images/banner-pwd.png"
                        alt="..."
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/banner-4.png"
                        alt="..."
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/banner-1.png"
                        alt="..."
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="/images/banner-3.png"
                        alt="..."
                    />
                </SwiperSlide>
            </Swiper>
        </>
    );
}
