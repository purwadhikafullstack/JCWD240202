import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    getProductDetailsAsync,
    productJelasAsync,
} from '../../redux/features/productSlice';

export default function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const proDetails = useSelector((state) => state.product.details);

    useEffect(() => {
        dispatch(productJelasAsync(id));
    }, []);
    return (
        <div className="flex px-[200px] justify-evenly gap-9">
            <div className="flex-1 border">{proDetails?.data?.name}</div>
            <div className="flex-1 border">sc</div>
        </div>
    );
}
