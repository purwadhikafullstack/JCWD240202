import { useDispatch } from 'react-redux';
import FilterButton from '../../components/user/button/filterButton';
import SortButton from '../../components/user/button/sortButton';
import SearchBar from '../../components/user/searchInput/searchBar';
import ProductsCard from '../../components/user/productCard/productsCard';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllProductsAsync, setLoading } from '../../redux/features/productSlice';
import PaginationButton from '../../components/user/pagination/paginationButton';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AfterAddCart from '../../components/user/productsCatalog/afterAddCart';
import { Helmet } from 'react-helmet';
import { Button } from 'flowbite-react';
import { MdFilterAlt } from 'react-icons/md';
import { MdFilterAltOff } from 'react-icons/md';
import ColorFilter from '../../components/user/button/colorFilter';
import SkeletonProductCard from '../../components/user/productCard/skeletonProductCard';

export default function ProductsCatalog() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    const [colorId, setColorId] = useState(null);
    const [colorName, setColorName] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [addNewItem, setAddNewItem] = useState(false);
    const productLists = useSelector((state) => state.product.products);
    const [showFilter, setShowFilter] = useState(false);
    const loading = useSelector((state) => state.product.loading);

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

    const colorChange = (color) => {
        setColorId(color);
    };

    const resetFilter = () => {
        setColorName('');
        setColorId(null);
        setCategory('');
        setPage(1);
        setShowFilter(!showFilter);
    };

    const showProducts = (page, category, sort, search) => {
        dispatch(
            getAllProductsAsync({
                page: page,
                category: category,
                sort: sort,
                search: search,
                color_id: colorId,
            }),
        );
    };

    useEffect(() => {
        if (addNewItem === true) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        let queryParams = {};
        if (page) {
            queryParams['page'] = page;
        }
        if (category) {
            queryParams['category'] = category.replaceAll(' ', '%');
        }
        if (sort) {
            queryParams['sort'] = sort;
        }
        if (search) {
            queryParams['search'] = search;
        }
        if (colorName) {
            queryParams['color'] = colorName;
        }
        setSearchParams(queryParams);
        showProducts(page, category, sort, search);
        return () => dispatch(setLoading(false))
    }, [page, category, sort, search, addNewItem, colorId, colorName]);
    return (
        <div className="relative">
            <Helmet>
                <title>IKEWA | Products</title>
                <meta name="description" content="products" />
            </Helmet>
            <div
                className={`p-[100px] z-20 transform  ${
                    addNewItem === true
                        ? 'inset-0 opacity-50 pointer-events-none'
                        : ''
                }`}
            >
                <div className="font-bold text-4xl">All Products</div>
                <div className="flex justify-between pt-9">
                    <div className="flex flex-1 gap-9 w-full">
                        <Button
                            onClick={() => {
                                showFilter === false
                                    ? setShowFilter(!showFilter)
                                    : resetFilter();
                            }}
                            color={'light'}
                        >
                            <div className="flex gap-2 items-center">
                                {showFilter === false ? (
                                    <>
                                        <MdFilterAlt size={20} /> Filter{' '}
                                    </>
                                ) : (
                                    <>
                                        <MdFilterAltOff size={20} />
                                        Reset Filter
                                    </>
                                )}
                            </div>
                        </Button>
                        <SortButton data={{ sortChange, sort }} />
                    </div>
                    <div className="flex-2">
                        <div>
                            <SearchBar data={{ searchChange }} />
                        </div>
                    </div>
                </div>
                <div
                    className={`${
                        showFilter === false ? 'hidden' : ''
                    } flex gap-4 mt-4 p-4 border`}
                >
                    <FilterButton
                        data={{ categoryChange, setPage, category }}
                    />
                    <ColorFilter
                        state={{
                            setColorName,
                            colorName,
                            colorChange,
                            setPage,
                        }}
                    />
                </div>
                {productLists?.data?.rows?.length !== 0 ? (
                    <div className=" flex gap-6 flex-wrap pt-12">
                        {productLists?.data?.rows?.map((value, index) => {
                            if (loading) {
                                return (
                                    <ProductsCard
                                        key={index}
                                        data={{ value }}
                                        state={{ setAddNewItem }}
                                    />
                                );
                            } else {
                                return <SkeletonProductCard key={index} />;
                            }
                        })}
                    </div>
                ) : (
                    <div className="flex items-center justify-center py-8">
                        <div>
                            <div className="flex justify-center items-center font-semibold text-xl mb-6">
                                <h1 className="font-semibold text-2xl">
                                    No Product Found
                                </h1>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <img
                                    src="/images/not-found-user.png"
                                    alt="not-found"
                                    className="min-w-[200px] max-w-[400px]"
                                ></img>
                            </div>
                        </div>
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
            <AfterAddCart state={{ setAddNewItem, addNewItem }} />
        </div>
    );
}
