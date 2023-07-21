import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { productRecommenadationAsync } from '../../../redux/features/productSlice';
import { Link } from 'react-router-dom';

export default function RelatedProducts(props) {
    const dispatch = useDispatch();
    const recommendation = useSelector(
        (state) => state.product.recommendations,
    );

    useEffect(() => {
        dispatch(productRecommenadationAsync(props?.data?.id));
        console.log('recommendation =>', recommendation);
    }, []);

    return (
        <>
            {recommendation?.data?.map((value, index) => {
                return (
                    <div className="w-[300px] h-[400px] flex flex-col rounded shadow-2xl">
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
                            <Link to={`/products/${value.id}`}>
                                <div className="border-t flex justify-center py-2 bg-yellow-300 text-sky-700 hover:cursor-pointer hover:bg-yellow-400">
                                    Details
                                </div>
                            </Link>
                        </div>
                    </div>
                );
            })}
        </>
    );
}
