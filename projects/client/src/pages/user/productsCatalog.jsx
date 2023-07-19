import { useDispatch } from 'react-redux';
import FilterButton from '../../components/user/button/filterButton';
import SortButton from '../../components/user/button/sortButton';
import SearchBar from '../../components/user/searchInput/searchBar';
import ProductsCard from '../../components/user/products/productsCard';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllProductsAsync } from '../../redux/features/productSlice';
import PaginationButton from '../../components/user/pagination/paginationButton';

export default function ProductsCatalog() {
    const dispatch = useDispatch();
    const productLists = useSelector((state) => state.product.products);

    useEffect(() => {
        dispatch(getAllProductsAsync());
    }, []);
    return (
        <div className="p-[100px]">
            <div className="font-bold text-4xl">All Products</div>
            <div className="flex justify-between pt-9">
                <div className="flex flex-1 gap-9 w-full">
                    <FilterButton />
                    <SortButton />
                </div>
                <div className="flex-2">
                    <div>
                        <SearchBar />
                    </div>
                </div>
            </div>
            <div className=" flex gap-6 flex-wrap pt-12">
                {productLists?.data?.rows?.map((value, index) => {
                    return <ProductsCard key={index} data={value} />;
                })}
            </div>
            <div className="pt-9 flex justify-center">
                <PaginationButton data={productLists?.totalPage} />
            </div>
        </div>
    );
}
