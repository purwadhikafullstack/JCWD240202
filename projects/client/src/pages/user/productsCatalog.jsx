import { useDispatch } from 'react-redux';
import FilterButton from '../../components/user/button/filterButton';
import SortButton from '../../components/user/button/sortButton';
import SearchBar from '../../components/user/searchInput/searchBar';
import ProductsCard from '../../components/user/productCard/productsCard';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllProductsAsync } from '../../redux/features/productSlice';
import PaginationButton from '../../components/user/pagination/paginationButton';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function ProductsCatalog() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const productLists = useSelector((state) => state.product.products);

    const pageChange = (event, value) => {
        setPage(value);
    };

    const categoryChange = (category) => {
        setCategory(category);
    };

    const sortChange = (sortCat) => {
        setSort(sortCat);
    };

    const searchChange = (search) => {
        setSearch(search);
    };

    const showProducts = (page, category, sort, search) => {
        dispatch(
            getAllProductsAsync({
                page: page,
                category: category,
                sort: sort,
                search: search,
            }),
        );
    };

    useEffect(() => {
        let queryParams = {};
        if (page) {
            queryParams['page'] = page;
        }
        if (category) {
            queryParams['category'] = category;
        }
        if (sort) {
            queryParams['sort'] = sort;
        }
        if (search) {
            queryParams['search'] = search;
        }
        setSearchParams(queryParams);
        showProducts(page, category, sort, search);
    }, [page, category, sort, search]);
    return (
        <div className="p-[100px]">
            <div className="font-bold text-4xl">All Products</div>
            <div className="flex justify-between pt-9">
                <div className="flex flex-1 gap-9 w-full">
                    <FilterButton data={{ categoryChange }} />
                    <SortButton data={{ sortChange }} />
                </div>
                <div className="flex-2">
                    <div>
                        <SearchBar data={{ searchChange }} />
                    </div>
                </div>
            </div>
            {productLists?.data?.rows?.length !== 0 ? (
                <div className=" flex gap-6 flex-wrap pt-12">
                    {productLists?.data?.rows?.map((value, index) => {
                        return <ProductsCard key={index} data={value} />;
                    })}
                </div>
            ) : (
                <div className="flex justify-center py-24 font-bold tex-2xl">
                    No Product Found
                </div>
            )}

            <div className="pt-9 flex justify-center">
                {/* pagination component here */}
                <PaginationButton
                    data={{
                        totalPage: productLists?.totalPage,
                        page,
                        pageChange,
                    }}
                />
            </div>
        </div>
    );
}
