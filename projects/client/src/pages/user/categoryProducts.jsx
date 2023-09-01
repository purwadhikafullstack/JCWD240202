import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getProductCategoryAsync } from '../../redux/features/categorySlice';
import { useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ProductsCard from '../../components/user/productCard/productsCard';
import PaginationButton from '../../components/user/pagination/paginationButton';
import ColorFilter from '../../components/user/button/colorFilter';
import SortButton from '../../components/user/button/sortButton';

export default function CategoryProducts() {
    const dispatch = useDispatch();
    const productCategory = useSelector(
        (state) => state.category.productCategory,
    );
    const location = useLocation();
    const id = location.state && location.state.categoryId;
    const [page, setPage] = useState(1);
    const [colorId, setColorId] = useState(null);
    const [colorName, setColorName] = useState('');

    const pageChange = (event, value) => {
        setPage(value);
    };

    const colorChange = (color) => {
        setColorId(color);
    };

    useEffect(() => {
        dispatch(getProductCategoryAsync({ id: id, page, colorId }));
    }, [page, colorId]);

    return (
        <>
            {console.log('=>', colorId)}
            <div>
                <Helmet>
                    <title>IKEWA | Category</title>
                    <meta name="description" content="products" />
                </Helmet>
                <div className="h-[400px] w-full">
                    <img
                        src={
                            productCategory?.data?.image.startsWith('PIMG')
                                ? process.env.REACT_APP_API_IMAGE_URL +
                                  productCategory?.data?.image
                                : productCategory?.data?.image
                        }
                        alt="category_thumbnail"
                        className="w-full h-[400px] object-cover object-center"
                    />
                </div>
                <div className="p-[100px]">
                    <div className="font-bold text-4xl">
                        {productCategory?.data?.name}
                    </div>
                    <div className="pt-9 flex gap-9">
                        <ColorFilter
                            state={{ colorChange, colorName, setColorName }}
                        />
                    </div>
                    <div className=" flex gap-6 flex-wrap pt-9">
                        {productCategory?.data?.products?.length === 0 ? (
                            <div className="flex justify-center w-full py-[100px] font-bold text-lg">
                                No Results
                            </div>
                        ) : (
                            productCategory?.data?.products?.map(
                                (value, index) => {
                                    return (
                                        <ProductsCard
                                            key={index}
                                            data={{ value }}
                                        />
                                    );
                                },
                            )
                        )}
                    </div>
                    <div className="flex justify-center items-center w-full pt-9">
                        <PaginationButton
                            data={{
                                totalPage: productCategory?.totalPage,
                                page,
                                pageChange,
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
