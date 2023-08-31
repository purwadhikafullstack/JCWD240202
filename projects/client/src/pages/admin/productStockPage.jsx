import SideBarAdmin from '../../components/admin/adminPageSideBar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import PaginationAdmin from '../../components/admin/paginationAdmin';
import SearchBarAdmin from '../../components/admin/searchBarAdmin';
import SortAdmin from '../../components/admin/sortAdmin';
import FilterAdmin from '../../components/admin/filterAdmin';
import FilterCategoryAdmin from '../../components/admin/filterCategoryProductAdmin';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { getDataStock, setLoading } from '../../redux/features/stockSlice';
import TableStockManagement from '../../components/admin/stockManagement/tableStockManagement';
import { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function ProductStockPage() {
    const dispatch = useDispatch();
    const dataStocks = useSelector((state) => state.stock.stocks);
    const dataLogin = useSelector((state) => state.user.dataLogin);
    const loading = useSelector((state) => state.stock.loading)

    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [sort, setSort] = useState(searchParams.get('sort') || '');
    const [category, setCategory] = useState(searchParams.get('category') || '');
    const [warehouse, setWarehouse] = useState(searchParams.get('warehouse') || '');

    const pageChange = (event, value) => {
        setPage(value);
    };

    const searchChange = (search) => {
        setSearch(search);
        setPage(1);
    };

    const sortChange = (sort) => {
        setSort(sort);
        setPage(1);
    };

    const categoryChange = (category) => {
        setCategory(category);
        setPage(1);
    };

    const warehouseChange = (warehouse) => {
        setWarehouse(warehouse);
        setPage(1);
    };

    useEffect(() => {
        let queryParams = {};
        if (page) {
            queryParams['page'] = page;
        }
        if (search) {
            queryParams['search'] = search;
        }
        if (sort) {
            queryParams['sort'] = sort;
        }
        if (category) {
            queryParams['category'] = category;
        }
        if (warehouse) {
            queryParams['warehouse'] = warehouse;
        }
        setSearchParams(queryParams);
        dispatch(getDataStock(page, search, sort, category, warehouse));
        return () => dispatch(setLoading(false))
    }, [page, search, sort, category, warehouse]);
    
    return (
        <>
            <Toaster />
            <Helmet>
                <title>IKEWA | Stock</title>
                <meta name="description" content="stock" />
            </Helmet>
            <div>
                <div className="sm:flex">
                    <SideBarAdmin />
                    <div className="bg-blue-200 p-8 w-full">
                        <div className="font-bold text-2xl">
                            <h1 className="text-4xl mb-8">PRODUCT STOCK MANAGEMENT</h1>
                            {dataLogin?.warehouse?.city ? (
                                <>
                                    <h1>Welcome, {dataLogin?.first_name}{' '}{dataLogin?.last_name}!</h1>
                                    <h1>{dataLogin?.warehouse?.city} Warehouse</h1>
                                </>
                            ) : (
                                <h1>Welcome, Admin!</h1>
                            )}
                        </div>
                        <div className="mt-5 p-3 bg-white shadow-md rounded-lg">
                            <div className="sm:flex sm:justify-between w-full mb-2">
                                <div className="sm:flex sm:justify-start sm:items-center sm:gap-2 w-full">
                                    <SearchBarAdmin data={{ searchChange, search }}/>
                                    <SortAdmin data={{ sortChange, sort }} />
                                    <FilterCategoryAdmin data={{ categoryChange, category }}/>
                                    {dataLogin?.role_id === 3 ? (
                                        <FilterAdmin data={{warehouseChange, warehouse}}/>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                            <div className="w-full flex justify-start mb-3">
                                {search ? (
                                    <button onClick={() => {setSearch(''); setPage(1)}} className="flex items-center gap-1 mr-2 mb-1 sm:mb-0">
                                        <IoCloseCircleSharp />
                                        <div className="bg-[#0051BA] text-white rounded-lg px-2 py-1 text-xs flex items-center">{search}</div>
                                    </button>
                                ) : (
                                    <></>
                                )}
                                {sort ? (
                                    <button onClick={() => {setSort(''); setPage(1)}} className="flex items-center gap-1 mr-2 mb-1 sm:mb-0">
                                        <IoCloseCircleSharp />
                                        <div className="bg-[#0051BA] text-white rounded-lg px-2 py-1 text-xs flex items-center">
                                            {sort === 'name-asc' ? 'A-Z' : sort === 'name-desc' ? 'Z-A' : sort === 'newest' ? 'Newest' : 'Oldest'}
                                        </div>
                                    </button>
                                ) : (
                                    <></>
                                )}
                                {category ? (
                                    <button onClick={() => {setCategory(''); setPage(1)}} className="flex items-center gap-1 mr-2 mb-1 sm:mb-0">
                                        <IoCloseCircleSharp />
                                        <div className="bg-[#0051BA] text-white rounded-lg px-2 py-1 text-xs flex items-center">{category.replace(/%/g, ' ')}</div>
                                    </button>
                                ) : (
                                    <></>
                                )}
                                {warehouse ? (
                                    <button onClick={() => {setWarehouse(''); setPage(1)}} className="flex items-center gap-1 mr-2 mb-1 sm:mb-0">
                                        <IoCloseCircleSharp />
                                        <div className="bg-[#0051BA] text-white rounded-lg px-2 py-1 text-xs flex items-center">{warehouse.replace(/%/g, ' ')}</div>
                                    </button>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div className="relative overflow-x-auto shadow-md rounded-lg">
                                <table className="w-full text-sm text-left text-gray-600 dark:text-gray-400">
                                    <thead className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 border-r border-gray-300 text-center">Image</th>
                                            <th scope="col" className="px-6 py-3 border-r border-gray-300 text-center">Product Name</th>
                                            <th scope="col" className="px-6 py-3 border-r border-gray-300 text-center">Category</th>
                                            {!warehouse && dataLogin?.role_id === 3 ? (<></>) : (<th scope="col" className="px-6 py-3 border-r border-gray-300 text-center">Warehouse</th>
                                            )}
                                            <th scope="col" className="px-6 py-3 border-r border-gray-300 text-center">Stock</th>
                                            {!warehouse && dataLogin?.role_id === 3 ? (<></>) : (<th scope="col" className="px-6 py-3 border-gray-300 text-center">Action</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(dataStocks?.data?.rows?.length > 0 || dataStocks === null) && <TableStockManagement data={dataStocks?.data?.rows} params={{page, search, sort, category, warehouse}} dataLogin={dataLogin} loading={loading}/>}
                                    </tbody>
                                </table>
                                {dataStocks?.data?.rows?.length === 0 && (
                                    <div className="flex items-center justify-center py-8">
                                        <div>
                                            <div className="flex justify-center items-center font-bold text-xl">
                                                <h1>Not Found</h1>
                                            </div>
                                            <div className="w-full flex justify-center items-center">
                                                <img
                                                    src="/images/not-found-3.png"
                                                    alt="not-found"
                                                    className="min-w-[200px] max-w-[400px]"
                                                ></img>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="w-full flex justify-center mt-3">
                                <PaginationAdmin
                                    data={{
                                        totalPage: dataStocks?.totalPage,
                                        page,
                                        pageChange,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
