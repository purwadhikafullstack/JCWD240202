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
                        src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/combo-in.jpeg"
                        alt="..."
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__en_us_1683106020290__5.jpeg"
                        alt="..."
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__en_us_1689500719448__1.webp"
                        alt="..."
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__en_us_1686277985451__1.jpeg"
                        alt="..."
                    />
                </SwiperSlide>
            </Swiper>
        </>
    );
}
