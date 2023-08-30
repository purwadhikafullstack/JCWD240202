import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    productDetailsAsync,
    productRecommenadationAsync,
} from '../../../redux/features/productSlice';
import { getReviewsAsync } from '../../../redux/features/reviewSlice';
import SkeletonRecommendationCard from './skeletonRecommendationCard';

export default function RelatedProducts(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <>
            {props?.data?.recommendation?.data?.map((value, index) => {
                if(props?.data?.loading) {
                    return (
                        <div
                            key={index}
                            className="w-[300px] h-[450px] flex flex-col rounded shadow-2xl"
                        >
                            <div className="flex-1 relative">
                                <img
                                    src={value.product_images[0]?.name}
                                    alt="best seller products"
                                    className="w-[300px] h-[300px]"
                                />
                            </div>
                            <div className="flex flex-col gap-2 flex-1 border bg-sky-700 text-yellow-300 flex flex-col">
                                <div className="font-bold flex-1 px-2 pt-2 text-clip">
                                    {value.name}
                                </div>
                                <div className="flex-1 px-2">
                                    Rp {value.price.toLocaleString('id')}
                                </div>
    
                                <div
                                    onClick={() => {
                                        dispatch(productDetailsAsync(value.id));
                                        dispatch(
                                            productRecommenadationAsync(value.id),
                                        );
                                        dispatch(
                                            getReviewsAsync({
                                                product_id: value.id,
                                                rating: '',
                                                sort: '',
                                            }),
                                        );
                                        navigate(`/products/${value.id}`);
                                    }}
                                    className="border-t flex justify-center py-2 bg-yellow-300 text-sky-700 hover:cursor-pointer hover:bg-yellow-400"
                                >
                                    Details
                                </div>
                            </div>
                        </div>
                    );
                } else {
                    return <SkeletonRecommendationCard key={index}/>
                }
            })}
        </>
    );
}
