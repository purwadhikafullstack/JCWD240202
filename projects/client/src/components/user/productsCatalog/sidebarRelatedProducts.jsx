import { Button } from 'flowbite-react';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    productDetailsAsync,
    productRecommenadationAsync,
} from '../../../redux/features/productSlice';

export default function SidebarRelatedProducts(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <>
            <div className="md:w-[150px] md:h-[280px] max-md:w-[100px] max-md:h-[300px] relative">
                <div>
                    <img
                        src={props?.data?.value?.product_images[0]?.name.startsWith('PIMG') ? process.env.REACT_APP_API_IMAGE_URL + props?.data?.value?.product_images[0]?.name : props?.data?.value?.product_images[0]?.name}
                        alt="related_images"
                        className="w-[150px] h-[150px]"
                    />
                </div>
                <div className="font-bold">{props?.data?.value?.name}</div>
                <div>
                    Rp {props?.data?.value?.price.toLocaleString('ID-id')}
                </div>
                <div className="absolute bottom-0 right-0">
                    <Button
                        onClick={() => {
                            dispatch(
                                productDetailsAsync(
                                    Number(props?.data?.value?.id),
                                ),
                            );
                            dispatch(
                                productRecommenadationAsync(
                                    Number(props?.data?.value?.id),
                                ),
                            );
                            navigate(`/products/${props?.data?.value?.id}`);
                        }}
                        className="text-yellow-300 bg-sky-700"
                    >
                        <HiOutlineMagnifyingGlass size={20} />
                    </Button>
                </div>
            </div>
        </>
    );
}
