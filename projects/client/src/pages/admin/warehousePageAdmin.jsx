import AddWareHouseModal from '../../components/admin/addWarehouseModal';
import SideBarAdmin from '../../components/admin/adminPageSideBar';
import WarehouseTableSetting from '../../components/admin/tableWarehouseSetting';
import { getAllDataWh } from '../../redux/features/warehouseSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import PaginationAdmin from '../../components/admin/paginationAdmin';
import SearchBarAdmin from '../../components/admin/searchBarAdmin';
import SortAdmin from '../../components/admin/sortAdmin';
import FilterAdmin from '../../components/admin/filterAdmin';
import { IoCloseCircleSharp } from 'react-icons/io5';

export default function WarehousePageAdmin() {
    const [showAddWhModal, setShowAddWhModal] = useState(false);

    const dispatch = useDispatch();
    const warehouse = useSelector((state) => state.warehouse.dataWh);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [wh, setWh] = useState('');

    const [searchParams, setSearchParams] = useSearchParams();

    const pageChange = (event, value) => {
        setPage(value);
    };

    const searchChange = (search) => {
        setSearch(search);
    };

    const sortChange = (sort) => {
        setSort(sort);
    };

    const warehouseChange = (wh) => {
        setWh(wh);
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
        if (wh) {
            queryParams['warehouses'] = wh;
        }
        setSearchParams(queryParams);
        dispatch(getAllDataWh(page, search, sort, wh));
    }, [page, search, sort, wh]);

    return (
        <>
            <div>
                <div className="sm:flex">
                    <SideBarAdmin />
                    <div className="bg-blue-200 p-8 w-full">
                        <div className="font-bold text-2xl">
                            <h1>WAREHOUSE</h1>
                        </div>
                        <div className="mt-5 p-3 bg-white shadow-md rounded-lg">
                            <div className="sm:flex sm:justify-between w-full mb-2">
                                <div className="sm:flex sm:justify-start sm:items-center sm:gap-2 w-full">
                                    <SearchBarAdmin
                                        data={{ searchChange, search }}
                                    />
                                    <SortAdmin data={{ sortChange, sort }} />
                                    <FilterAdmin
                                        data={{ warehouseChange, wh }}
                                    />
                                </div>
                                <button
                                    onClick={() => setShowAddWhModal(true)}
                                    className="text-white text-[10px] font-bold border p-1 rounded-lg bg-[#0051BA] hover:bg-gray-400 focus:ring-2 focus:ring-main-500 w-28 p-2 mt-5 md:mt-0"
                                >
                                    + Add Warehouse
                                </button>
                            </div>
                            <div className="w-full flex justify-start mb-3">
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
                                                : 'Z-A'}
                                        </div>
                                    </button>
                                ) : (
                                    <></>
                                )}
                                {wh ? (
                                    <button
                                        onClick={() => {
                                            setWh('');
                                        }}
                                        className="flex items-center gap-1 mr-2 mb-1 sm:mb-0"
                                    >
                                        <IoCloseCircleSharp />

                                        <div className="bg-[#0051BA] text-white rounded-lg px-2 py-1 text-xs flex items-center">
                                            {wh}
                                        </div>
                                    </button>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div className="relative overflow-x-auto shadow-md rounded-lg">
                                <table className="w-full text-sm text-left text-gray-600 dark:text-gray-400">
                                    <thead className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 border-r border-gray-300 text-center"
                                            >
                                                Location
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 border-r border-gray-300 text-center"
                                            >
                                                Subdistrict
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 border-r border-gray-300 text-center"
                                            >
                                                Street
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 border-r border-gray-300 text-center"
                                            >
                                                Post Code
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 border-gray-300 text-center"
                                            >
                                                Admin
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 border-gray-300 text-center"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {warehouse?.data?.rows?.length !== 0 ? (
                                            <WarehouseTableSetting
                                                data={warehouse?.data?.rows}
                                            />
                                        ) : (
                                            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 text-center text-2xl">
                                                <td></td>
                                                <td></td>
                                                <td className="p-12">
                                                    Not Found
                                                </td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="w-full flex justify-center mt-3">
                                <PaginationAdmin
                                    data={{
                                        totalPage: warehouse?.totalPage,
                                        page,
                                        pageChange,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <>
                    {/* Add Warehouse */}
                    {showAddWhModal === true ? (
                        <AddWareHouseModal showModal={setShowAddWhModal} />
                    ) : (
                        <></>
                    )}
                </>
            </div>
        </>
    );
}