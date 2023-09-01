import { Swiper, SwiperSlide } from 'swiper/react';
import {
    Navigation,
    Pagination,
    A11y,
    Scrollbar,
    Autoplay,
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

export default function CarouselHome() {
    return (
        <>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                autoplay
            >
                <SwiperSlide>
                    <img
                        src="/images/banner-pwd.png"
                        alt="..."
                    />
                </SwiperSlide>
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
                    <img src="/images/banner-1.png" alt="..." />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/images/banner-2.png" alt="..." />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/images/banner-3.png" alt="..." />
                </SwiperSlide>
            </Swiper>
        </>
    );
}
