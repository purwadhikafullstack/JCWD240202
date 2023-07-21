import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { productDetailsAsync } from '../../redux/features/productSlice';
import { Button } from 'flowbite-react';
import { SlArrowRight } from 'react-icons/sl';
import CarouselDetails from '../../components/user/productDetails/carouselDetails';
import ProductDescription from '../../components/user/productDetails/productDescription';
import RelatedProducts from '../../components/user/productCard/recommendationCard';

export default function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const proDetails = useSelector((state) => state.product.details);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(productDetailsAsync(id));
    }, []);
    return (
        <div className="divide-y">
            <div className="flex px-[200px] justify-evenly gap-14 pt-9">
                <div className="flex-1">
                    <div className="h-[700px]">
                        <CarouselDetails data={{ proDetails }} />
                    </div>
                    <div className="border-t border-b my-9">
                        <div className="flex items-center justify-between py-9">
                            <div className="text-lg font-bold">Reviews</div>
                            <div>
                                <SlArrowRight />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-2 w-[500px]">
                    <ProductDescription data={{ proDetails }} />
                    <div className="flex justify-between items-center pt-14">
                        <div>Quantity</div>
                        <div className="flex gap-2 items-center border rounded-lg">
                            <div
                                onClick={
                                    quantity <= 1
                                        ? ''
                                        : () => setQuantity(quantity - 1)
                                }
                                className="p-2 hover:cursor-pointer"
                            >
                                -
                            </div>
                            <div className="px-9">{quantity}</div>
                            <div
                                onClick={() => setQuantity(quantity + 1)}
                                className="p-2 hover:cursor-pointer"
                            >
                                +
                            </div>
                        </div>
                    </div>
                    <div className="mt-9">
                        <Button
                            gradientDuoTone="purpleToBlue"
                            pill
                            className="w-full p-4"
                        >
                            <div className="text-xl">Add to Cart</div>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="px-[200px]">
                <div className="pt-9 text-3xl font-bold">Related Products</div>
                <div className="pt-9 flex gap-9">
                    <RelatedProducts data={{ id: proDetails?.data?.id }} />
                </div>
            </div>
        </div>
    );
}
