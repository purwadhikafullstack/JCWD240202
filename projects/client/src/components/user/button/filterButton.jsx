import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllCategoriesAsync } from '../../../redux/features/homepageSlice';

export default function FilterButton() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.homepage.category);

    useEffect(() => {
        dispatch(getAllCategoriesAsync());
    }, []);
    return (
        <select className="select select-bordered w-full max-w-xs">
            <option selected>Filter by Category</option>
            {categories?.data?.map((value, index) => {
                return <option>{value?.name}</option>;
            })}
        </select>
    );
}
