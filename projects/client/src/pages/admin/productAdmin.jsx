import { useDispatch, useSelector } from 'react-redux';
import SideBarAdmin from '../../components/admin/adminPageSideBar';
import ProductTabs from '../../components/admin/product/productTabs';
import { getAllProductsAsync } from '../../redux/features/productSlice';
import { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import FilterButton from '../../components/user/button/filterButton';
import SortButton from '../../components/user/button/sortButton';
import SearchBar from '../../components/user/searchInput/searchBar';
import PaginationButton from '../../components/user/pagination/paginationButton';
import ComListProduct from '../../components/admin/product/comListProduct';
import ModalAddProduct from '../../components/admin/product/modalAddProduct';
import ModalEditProduct from '../../components/admin/product/modalEditProduct';
import { getAllCategoriesAsync } from '../../redux/features/homepageSlice';
import { getAllColorAsync } from '../../redux/features/homepageSlice';
import ModalDeleteProduct from '../../components/admin/product/modalDeleteProduct';
import { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function ProductAdmin() {
    const dispatch = useDispatch();
    const dataLogin = JSON.parse(localStorage?.getItem('user'));
    const products = useSelector((state) => state.product.products);
    const categories = useSelector((state) => state.homepage.category);
    const color = useSelector((state) => state.homepage.color);
    const isSuccess = useSelector((state) => state.product.success);
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(searchParams.get('page') || 1);
    const [category, setCategory] = useState(
        searchParams.get('category') || '',
    );
    const [sort, setSort] = useState(searchParams.get('sort') || '');
    const [search, setSearch] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [dataDetail, setDataDetail] = useState('');

    const defaultValue = () => {
        if (isSuccess) {
            setOpenModal(false);
        }
    };

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
        setPage(1);
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
        dispatch(getAllCategoriesAsync());
        dispatch(getAllColorAsync());
        defaultValue();
    }, [page, category, sort, search, isSuccess]);

    if (!dataLogin) {
        return <Navigate to="/admins/login" />;
    }

    return (
        <>
            <Toaster />
            <Helmet>
                <title>IKEWA | Admin Products</title>
                <meta name="description" content="admin-product" />
            </Helmet>
            <div>
                <div className="sm:flex">
                    <SideBarAdmin />
                    <div className="p-8 w-full">
                        <div className="font-bold text-2xl mt-2">
                            <h1>PRODUCTS</h1>
                        </div>
                        <ProductTabs />
                        <div className="mt-3 p-3 bg-white drop-shadow-lg rounded-lg">
                            <div className="flex justify-between items-center w-full mb-4">
                                <div className="flex gap-2 items-center">
                                    <SearchBar data={{ searchChange }} />
                                    <FilterButton
                                        data={{ categoryChange, category }}
                                    />
                                    <SortButton data={{ sortChange, sort }} />
                                </div>
                                <button
                                    onClick={() => setOpenModal(true)}
                                    className="text-white text-[10px] border p-2 rounded-lg bg-[#0051BA] hover:bg-gray-400 font-bold focus:ring-2 focus:ring-main-500 w-22 md:mt-0"
                                >
                                    + ADD NEW PRODUCT
                                </button>
                            </div>
                            <div className="relative overflow-x-auto shadow-m rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px- py-3 border-r text-center w-[150px]"
                                            >
                                                Image
                                            </th>
                                            <th
                                                scope="col"
                                                className="px- py-3 border-r text-center"
                                            >
                                                name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px- py-3 border-r text-center"
                                            >
                                                Description
                                            </th>
                                            <th
                                                scope="col"
                                                className="px- py-3 border-r text-center"
                                            >
                                                Category
                                            </th>
                                            {/* <th
                                            scope="col"
                                            className="px- py-3 border-r text-center"
                                        >
                                            color
                                        </th> */}
                                            <th
                                                scope="col"
                                                className="px- py-3 border-r text-center"
                                            >
                                                price
                                            </th>
                                            <th
                                                scope="col"
                                                className="px- py-3 border-r text-center"
                                            >
                                                size & weight
                                            </th>
                                            <th
                                                scope="col"
                                                className="px- py-3 text-center"
                                            ></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <ComListProduct
                                            funcShow={setOpenModalEdit}
                                            funcData={setDataDetail}
                                            modalDelete={setOpenModalDelete}
                                            product={products}
                                        />
                                    </tbody>
                                </table>
                                <div className="pt-9 flex justify-center">
                                    <PaginationButton
                                        data={{
                                            totalPage: products?.totalPage,
                                            page,
                                            pageChange,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <ModalAddProduct
                        show={openModal}
                        funcShow={setOpenModal}
                        category={categories}
                        color={color}
                    />
                    <ModalEditProduct
                        show={openModalEdit}
                        funcShow={setOpenModalEdit}
                        data={dataDetail}
                        category={categories}
                        color={color}
                        filter={{page, category, sort, search}}
                    />
                    <ModalDeleteProduct
                        show={openModalDelete}
                        funcShow={setOpenModalDelete}
                        data={dataDetail}
                        filter={{page, category, sort, search}}
                    />
                </div>
            </div>
        </>
    );
}
