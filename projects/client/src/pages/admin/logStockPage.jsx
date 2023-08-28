import SideBarAdmin from '../../components/admin/adminPageSideBar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterAdmin from '../../components/admin/filterAdmin';
import DatePicker from 'react-datepicker';
import SearchBarAdmin from '../../components/admin/searchBarAdmin';
import SortNewestMutation from '../../components/admin/sortNewestMutation';
import TableStockLog from '../../components/admin/stockLog/tableStockLog';
import { getStockLog } from '../../redux/features/stockHistorySlice';
import PaginationAdmin from '../../components/admin/paginationAdmin';
import { IoCloseCircleSharp } from 'react-icons/io5';
import * as XLSX from 'xlsx';
import PrintStockLog from '../../components/admin/stockLog/printStockLog';
import { Helmet } from 'react-helmet';
const moment = require('moment');

export default function StockLogPage() {
    const dispatch = useDispatch();
    const dataLogin = useSelector((state) => state.user.dataLogin);
    const dataStockLog = useSelector((state) => state.stockHistory.stockLog);
    const dataExport = useSelector((state) => state.stockHistory.export);

    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [date, setDate] = useState(searchParams.get('date') || null);
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [warehouse, setWarehouse] = useState(searchParams.get('warehouse') || '');
    const [sort, setSort] = useState(searchParams.get('status') || '');
    const [loading, setLoading] = useState(false);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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

    const handleExportFile = () => {
        const ws = XLSX.utils.json_to_sheet(dataExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Product Stock Log');
        XLSX.writeFile(wb, 'ProductStockLog.xlsx');
    };

    useEffect(() => {
        let queryParams = {};
        if (page) {
            queryParams['page'] = page;
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
        setTimeout(() => {
            setLoading(true);
        }, 1000);
        clearTimeout(setLoading(false))
        dispatch(getStockLog(page, date, search, warehouse, sort));
    }, [page, date, search, warehouse, sort]);

    return (
        <>
            <Helmet>
                <title>IKEWA | Stock Log</title>
                <meta name="description" content="stock-log" />
            </Helmet>
            <div>
                <div className="sm:flex">
                    <SideBarAdmin />
                    <div className="bg-blue-200 p-8 w-full">
                        <div className="mb-6 font-bold text-4xl">STOCK LOG</div>
                        <div className="font-bold text-2xl">
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
                            <div className="flex justify-between items-end">
                                {dataLogin?.role_id === 3 ? (
                                    <div className="mr-3 w-2/6">
                                        <FilterAdmin data={{warehouseChange, warehouse}}/>
                                    </div>
                                ) : (
                                    <></>
                                )}
                                <div className="flex justify-end items-center w-full gap-2 ml-5">
                                    <label className="hidden md:block text-xs text-gray-700" htmlFor="A">
                                        Choose month :
                                    </label>
                                    <DatePicker
                                        dateFormat="MMMM yyyy"
                                        id="A"
                                        showMonthYearPicker
                                        placeholderText="Select month"
                                        className="bg-white border w-fit border-gray-300 text-gray-900 text-xs rounded-md"
                                        selected={dataStockLog?.dates ? new Date(dataStockLog?.dates) : new Date()}
                                        onChange={(date) => {setDate(moment(new Date(date)).format('MM/01/YYYY')); setPage(1)}}
                                    />
                                </div>
                            </div>
                            <div className={`w-full flex items-center ${search || date || warehouse || sort ? 'mt-4' : ''} mb-4`}>
                                {search || date || warehouse || sort ? (
                                    <div className="mr-2 text-xs">Reset Filter :</div>
                                ) : (
                                    <></>
                                )}
                                {search ? (
                                    <button onClick={() => {setSearch(''); setPage(1)}}
                                        className="flex items-center gap-1 mr-2 mb-1 sm:mb-0"
                                    >
                                        <IoCloseCircleSharp />
                                        <div className="bg-[#0051BA] text-white rounded-lg px-2 py-1 text-xs flex items-center">{search}</div>
                                    </button>
                                ) : (
                                    <></>
                                )}
                                {date ? (
                                    <button onClick={() => {setDate(''); setPage(1)}}
                                        className="flex items-center gap-1 mr-2 mb-1 sm:mb-0"
                                    >
                                        <IoCloseCircleSharp />
                                        <div className="bg-[#0051BA] text-white rounded-lg px-2 py-1 text-xs flex items-center">{months[new Date(date).getMonth()]}</div>
                                    </button>
                                ) : (
                                    <></>
                                )}
                                {warehouse ? (
                                    <button onClick={() => {setWarehouse(''); setPage(1)}}
                                        className="flex items-center gap-1 mr-2 mb-1 sm:mb-0"
                                    >
                                        <IoCloseCircleSharp />
                                        <div className="bg-[#0051BA] text-white rounded-lg px-2 py-1 text-xs flex items-center">{warehouse.replace(/%/g, ' ')}</div>
                                    </button>
                                ) : (
                                    <></>
                                )}
                                {sort ? (
                                    <button onClick={() => {setSort(''); setPage(1)}}
                                        className="flex items-center gap-1 mr-2"
                                    >
                                        <IoCloseCircleSharp size={12} />
                                        <div className="bg-[#0051BA] text-white rounded-lg px-2 py-1 text-xs flex items-center">{sort === 'newest' ? 'Newest' : 'Oldest'}</div>
                                    </button>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div className="mb-4">
                                <hr className="border border-gray-200"></hr>
                            </div>
                            <div className="flex justify-between gap-3 mb-4">
                                <div className="flex gap-3">
                                    <SearchBarAdmin data={{ searchChange, search }}/>
                                    <SortNewestMutation data={{ sortChange, sort }}/>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={handleExportFile} className="border border-gray-200 rounded-lg text-xs px-4">
                                        Export Data
                                    </button>
                                    <PrintStockLog data={dataExport} />
                                </div>
                            </div>
                            <div className="relative overflow-x-auto shadow-md rounded-lg">
                                <table className="w-full text-sm text-left text-gray-600 dark:text-gray-400">
                                    <thead className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 border-r border-gray-300 text-center">Date</th>
                                            <th scope="col" className="px-6 py-3 border-r border-gray-300 text-center">Product Name</th>
                                            <th scope="col" className="px-6 py-3 border-r border-gray-300 text-center">User</th>
                                            <th scope="col" className="px-6 py-3 border-r border-gray-300 text-center">Quantity</th>
                                            <th scope="col" className="px-6 py-3 border-r border-gray-300 text-center">Warehouse</th>
                                            <th scope="col" className="px-6 py-3 border-r border-gray-300 text-center">Type</th>
                                            <th scope="col" className="px-6 py-3 border-r border-gray-300 text-center">Information</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(dataStockLog?.data?.rows?.length > 0 || dataStockLog === null) && (<TableStockLog data={dataStockLog?.data} loading={loading}/>)}
                                    </tbody>
                                </table>
                                {dataStockLog?.data?.rows?.length === 0 && (
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
                                <PaginationAdmin data={{totalPage: dataStockLog?.totalPage, page, pageChange}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
