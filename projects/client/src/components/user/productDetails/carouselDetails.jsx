import { Carousel } from 'flowbite-react';

export default function CarouselDetails(props) {
    return (
        <Carousel>
            {props?.data?.proDetails?.findProduct?.product_images?.map(
                (value, index) => {
                    return (
                        <img
                            key={index}
                            src={value.name.startsWith('PIMG') ? process.env.REACT_APP_API_IMAGE_URL + value.name : value.name}
                            alt="images"
                            className="object-fit h-[700px]"
                        />
                    );
                },
            )}
        </Carousel>
    );
}
