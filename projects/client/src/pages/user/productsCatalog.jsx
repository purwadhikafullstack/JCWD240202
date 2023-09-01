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
import AfterAddCart from '../../components/user/productsCatalog/afterAddCart';
import { Helmet } from 'react-helmet';
import { Button } from 'flowbite-react';
import { MdFilterAlt } from 'react-icons/md';
import { MdFilterAltOff } from 'react-icons/md';
import ColorFilter from '../../components/user/button/colorFilter';

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

    const pageChange = (event, value) => {
        setPage(value);
    };

    const categoryChange = (category) => {
        setCategory(category);
        setPage(1);
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
                <div className="flex md:flex-row min-[0px]:flex-col min-[0px]:gap-4 justify-between pt-9">
                    <div className="flex flex-1 gap-9 w-full min-[0px]:order-last md:order-none">
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
                    <FilterButton data={{ categoryChange, category }} />
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
                    <div className=" flex max-sm:flex-col gap-6 flex-wrap pt-12">
                        {productLists?.data?.rows?.map((value, index) => {
                            return (
                                <ProductsCard
                                    key={index}
                                    data={{ value }}
                                    state={{ setAddNewItem }}
                                />
                            );
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
            <AfterAddCart state={{ setAddNewItem, addNewItem }} />
        </div>
    );
}
