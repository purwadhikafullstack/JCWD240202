import { useEffect, useState } from 'react';
import SideBarAdmin from '../../components/admin/adminPageSideBar';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getStockHistory } from '../../redux/features/stockHistorySlice';
import { getAllCategoriesAsync } from '../../redux/features/homepageSlice';
import { IoCloseCircleSharp } from 'react-icons/io5';
import SortAdmin from '../../components/admin/sortAdmin';
import FilterAdmin from '../../components/admin/filterAdmin';
import DatePicker from 'react-datepicker';
import SearchBarAdmin from '../../components/admin/searchBarAdmin';
import TableStockHistory from '../../components/admin/tableStockHistory';
import PaginationAdmin from '../../components/admin/paginationAdmin';
const moment = require('moment');

export default function StockHistoryProduct() {
    const dispatch = useDispatch();
    const dataLogin = useSelector((state) => state.user.dataLogin);
    const dataStockHistory = useSelector(
        (state) => state.stockHistory.stockHistories,
    );
    const categories = useSelector((state) => state.homepage.category);

    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [category, setCategory] = useState(
        searchParams.get('category') || 'LIVING ROOM'.replace(' ', '%'),
    );
    const [date, setDate] = useState(searchParams.get('date') || null);
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [warehouse, setWarehouse] = useState(
        searchParams.get('warehouse') || '',
    );
    const [sort, setSort] = useState(searchParams.get('sort') || '');

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const pageChange = (event, value) => {
        setPage(value);
    };

    const searchChange = (search) => {
        setSearch(search);
        setPage(1);
    };

    const warehouseChange = (warehouse) => {
        setWarehouse(warehouse);
        setPage(1);
    };

    const sortChange = (sort) => {
        setSort(sort);
        setPage(1);
    };

    useEffect(() => {
        let queryParams = {};
        if (page) {
            queryParams['page'] = page;
        }
        if (category) {
            queryParams['category'] = category;
        }
        if (date) {
            queryParams['date'] = date;
        }
        if (search) {
            queryParams['search'] = search;
        }
        if (warehouse) {
            queryParams['warehouse'] = warehouse;
        }
        if (sort) {
            queryParams['sort'] = sort;
        }
        setSearchParams(queryParams);
        dispatch(
            getStockHistory(page, date, category, search, warehouse, sort),
        );
        dispatch(getAllCategoriesAsync());
    }, [page, date, category, search, warehouse, sort]);

    return (
        <>
            <div>
                <div className="sm:flex">
                    <SideBarAdmin />
                    <div className="bg-blue-200 p-8 w-full">
                        <div className="mb-6 font-bold text-4xl">
                            STOCK HISTORY
                        </div>
                        <div className="font-bold text-2xl">
                            {dataLogin?.warehouse?.city ? (
                                <>
                                    <h1>
                                        Welcome, {dataLogin?.first_name}{' '}
                                        {dataLogin?.last_name}!
                                    </h1>
                                    <h1>
                                        {dataLogin?.warehouse?.city} Warehouse
                                    </h1>
                                </>
                            ) : (
                                <h1>Welcome, Admin!</h1>
                            )}
                        </div>
                        <div className="mt-5 p-3 bg-white shadow-md rounded-lg">
                            <div className="flex justify-between items-end">
                                {dataLogin?.role_id === 3 ? (
                                    <div className="mr-3 w-2/6">
                                        <FilterAdmin
                                            data={{
                                                warehouseChange,
                                                warehouse,
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <></>
                                )}
                                <div className="flex justify-end items-center w-full gap-2 ml-5">
                                    <label
                                        className="hidden md:block text-xs text-gray-700"
                                        htmlFor="A"
                                    >
                                        Choose month :
                                    </label>
                                    <DatePicker
                                        dateFormat="MMMM yyyy"
                                        id="A"
                                        showMonthYearPicker
                                        placeholderText="Select month"
                                        className="bg-white border w-fit border-gray-300 text-gray-900 text-xs rounded-md"
                                        selected={
                                            dataStockHistory?.data?.dates
                                                ? new Date(
                                                      dataStockHistory?.data?.dates,
                                                  )
                                                : new Date()
                                        }
                                        onChange={(date) => {
                                            setDate(
                                                moment(new Date(date)).format(
                                                    'MM/01/YYYY',
                                                ),
                                            );
                                            setPage(1);
                                        }}
                                    />
                                </div>
                            </div>
                            <div
                                className={`w-full flex items-center ${
                                    search || date || warehouse || sort
                                        ? 'mt-4'
                                        : ''
                                } mb-4`}
                            >
                                {search || date || warehouse || sort ? (
                                    <div className="mr-2 text-xs">
                                        Reset Filter :
                                    </div>
                                ) : (
                                    <></>
                                )}
                                {search ? (
                                    <button
                                        onClick={() => {
                                            setSearch('');
                                        }}
                                        className="flex items-center gap-1 mr-2 mb-1 sm:mb-0"
                                    >
                                        <IoCloseCircleSharp />

                                        <div className="bg-[#0051BA] text-white rounded-lg px-2 py-1 text-xs flex items-center">
                                            {search}
                                        </div>
                                    </button>
                                ) : (
                                    <></>
                                )}
                                {date ? (
                                    <button
                                        onClick={() => {
                                            setDate('');
                                        }}
                                        className="flex items-center gap-1 mr-2 mb-1 sm:mb-0"
                                    >
                                        <IoCloseCircleSharp />

                                        <div className="bg-[#0051BA] text-white rounded-lg px-2 py-1 text-xs flex items-center">
                                            {months[new Date(date).getMonth()]}
                                        </div>
                                    </button>
                                ) : (
                                    <></>
                                )}
                                {warehouse ? (
                                    <button
                                        onClick={() => {
                                            setWarehouse('');
                                        }}
                                        className="flex items-center gap-1 mr-2 mb-1 sm:mb-0"
                                    >
                                        <IoCloseCircleSharp />

                                        <div className="bg-[#0051BA] text-white rounded-lg px-2 py-1 text-xs flex items-center">
                                            {warehouse.replace(/%/g, ' ')}
                                        </div>
                                    </button>
                                ) : (
                                    <></>
                                )}
                                {sort ? (
                                    <button
                                        onClick={() => {
                                            setSort('');
                                        }}
                                        className="flex items-center gap-1 mr-2 mb-1 sm:mb-0"
                                    >
                                        <IoCloseCircleSharp />

                                        <div className="bg-[#0051BA] text-white rounded-lg px-2 py-1 text-xs flex items-center">
                                            {sort === 'name-asc'
                                                ? 'A-Z'
                                                : sort === 'name-desc'
                                                ? 'Z-A'
                                                : sort === 'newest'
                                                ? 'Newest'
                                                : 'Oldest'}
                                        </div>
                                    </button>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div className="mb-4">
                                <hr className="border border-gray-200"></hr>
                            </div>
                            <div className="md:flex md:justify-between md:items-center md:flex-wrap mb-4 gap-3 w-full relative">
                                <div className="text-center md:flex md:gap-3">
                                    {categories?.data.map((value, index) => {
                                        return (
                                            <button
                                                key={index}
                                                disabled={
                                                    category.replace(
                                                        /%/g,
                                                        ' ',
                                                    ) === value.name
                                                }
                                                className={`border rounded-lg w-auto whitespace-nowrap rounded-full px-3 cursor-pointer mr-2 mb-2 md:mr-0 md:mb-0 ${
                                                    category.replace(
                                                        /%/g,
                                                        ' ',
                                                    ) === value.name
                                                        ? 'bg-[#0051BA] border-gray-600 text-white'
                                                        : ''
                                                }`}
                                                onClick={() => {
                                                    setCategory(
                                                        value.name.replace(
                                                            / /g,
                                                            '%',
                                                        ),
                                                    );
                                                    setPage(1);
                                                }}
                                            >
                                                {value.name}
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="sm:ml-0 flex justify-center gap-3">
                                    <SortAdmin data={{ sortChange, sort }} />
                                    <SearchBarAdmin
                                        data={{ searchChange, search }}
                                    />
                                </div>
                            </div>
                            <div className="relative overflow-x-auto shadow-md rounded-lg">
                                <table className="w-full text-sm text-left text-gray-600 dark:text-gray-400">
                                    <thead className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 border-r border-gray-300 text-center"
                                            >
                                                Product Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 border-r border-gray-300 text-center"
                                            >
                                                Category
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 border-r border-gray-300 text-center"
                                            >
                                                Addition
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 border-r border-gray-300 text-center"
                                            >
                                                Reduction
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 border-gray-300 text-center"
                                            >
                                                Final Stock
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataStockHistory?.data?.getProduct
                                            ?.rows?.length !== 0 ? (
                                            <TableStockHistory
                                                data={dataStockHistory?.data}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                    </tbody>
                                </table>
                                {dataStockHistory?.data?.getProduct?.rows
                                    ?.length == 0 ? (
                                    <div className="w-full flex justify-center items-center">
                                        <img
                                            src="/images/not-found-pic.png"
                                            alt="not-found"
                                            className="min-w-[200px]"
                                        ></img>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div className="w-full flex justify-center mt-3">
                                <PaginationAdmin
                                    data={{
                                        totalPage: dataStockHistory?.totalPage,
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
