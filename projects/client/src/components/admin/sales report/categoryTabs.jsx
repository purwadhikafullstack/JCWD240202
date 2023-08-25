import { getAllCategoriesAsync } from '../../../redux/features/homepageSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

export default function CategoryTabs(props) {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.homepage.category);

    useEffect(() => {
        dispatch(getAllCategoriesAsync());
    }, []);
    return (
        <div className="pt-4 sm:flex justify-evenly items-center gap-2">
            <div
                onClick={() => {
                    props?.state?.setCategory('');
                    props?.state?.setPage(1);
                }}
                className={`py-1 px-3 hover:cursor-pointer rounded-xl ${
                    props?.state?.category === ''
                        ? 'bg-sky-700 text-yellow-300'
                        : ''
                }`}
            >
                ALL
            </div>
            {categories?.data?.map((value, index) => {
                return (
                    <div
                        key={index}
                        onClick={() => {
                            props?.state?.setCategory(value.id);
                            props?.state?.setPage(1);
                        }}
                        className={`py-1 px-3 hover:cursor-pointer rounded-xl ${
                            props?.state?.category === value.id
                                ? 'bg-sky-700 text-yellow-300'
                                : ''
                        }`}
                    >
                        {value.name}
                    </div>
                );
            })}
        </div>
    );
}
