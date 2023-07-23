import { Carousel } from 'flowbite-react';

export default function CarouselDetails(props) {
    return (
        <Carousel>
            {props?.data?.proDetails?.data?.product_images?.map(
                (value, index) => {
                    return (
                        <img
                            key={index}
                            src={value.name}
                            alt="images"
                            className="object-fit h-[700px]"
                        />
                    );
                },
            )}
        </Carousel>
    );
}
