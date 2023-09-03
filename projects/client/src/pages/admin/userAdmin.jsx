/* eslint-disable jsx-a11y/scope */
import SideBarAdmin from '../../components/admin/adminPageSideBar';
import { useEffect } from 'react';
import { getDataAdminUser, setLoading } from '../../redux/features/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import RegisterAdmin from '../../components/admin/adminSetting/registerAdminModal';
import UserAdminTable from '../../components/admin/adminSetting/userAdminTable';
import SearchBarAdmin from '../../components/admin/searchBarAdmin';
import FilterAdmin from '../../components/admin/filterAdmin';
import SortAdmin from '../../components/admin/sortAdmin';
import PaginationAdmin from '../../components/admin/paginationAdmin';
import { useSearchParams } from 'react-router-dom';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function UserAdmin() {
    const [showRegisModal, setShowRegisModal] = useState(false);
    const dispatch = useDispatch();
    const admins = useSelector((state) => state.admin.dataAdmin);
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [sort, setSort] = useState(searchParams.get('sort') || '');
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [warehouse, setWarehouse] = useState(searchParams.get('warehouse') || '');
    const loading = useSelector((state) => state.admin.loading)

    const pageChange = (event, value) => {
        setPage(value);
    };

    const sortChange = (sort) => {
        setSort(sort);
        setPage(1);
    };

    const searchChange = (search) => {
        setSearch(search);
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
        if (warehouse) {
            queryParams['warehouse'] = warehouse;
        }
        setSearchParams(queryParams);
        dispatch(getDataAdminUser(page, sort, search, warehouse));
        return () => dispatch(setLoading(false))
    }, [page, sort, search, warehouse]);

    return (
        <>
            <Toaster />
            <Helmet>
                <title>IKEWA | User Management</title>
                <meta name="description" content="user-management" />
            </Helmet>
            <div>
                <div className="sm:flex">
                    <SideBarAdmin />
                    <div className="bg-blue-200 p-8 w-full">
                        <div className="font-bold text-2xl">
                            <h1 className="text-4xl">ADMIN</h1>
                        </div>
                        <div className="mt-5 p-3 bg-white shadow-md rounded-lg">
                            <div className="sm:flex sm:justify-between w-full mb-2">
                                <div className="sm:flex sm:justify-start sm:items-center sm:gap-2 w-full">
                                    <SearchBarAdmin data={{ searchChange, search }}/>
                                    <SortAdmin data={{ sortChange, sort }} />
                                    <FilterAdmin data={{ warehouseChange, warehouse }}/>
                                </div>
                                <div>
                                    <button onClick={() => setShowRegisModal(true)} className="text-white text-[10px] font-bold border p-1 rounded-lg bg-[#0051BA] hover:bg-gray-400 focus:ring-2 focus:ring-main-500 w-28 p-3 mt-5 md:mt-0">+ Register Admin</button>
                                </div>
                            </div>
                            <div className="w-full sm:flex sm:justify-start mb-3">
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
                                            <th scope="col" className="px-6 py-3 border-r border-gray-300 text-center">Admin Name</th>
                                            <th scope="col" className="px-6 py-3 border-r border-gray-300 text-center">Email</th>
                                            <th scope="col" className="px-6 py-3 border-r border-gray-300 text-center">Phone Number</th>
                                            <th scope="col" className="px-6 py-3 border-r border-gray-300 text-center">Warehouse</th>
                                            <th scope="col" className="px-6 py-3 border-gray-300 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(admins?.data?.rows?.length > 0 || admins === null) && (<UserAdminTable data={admins?.data?.rows} params={{page, search, sort, warehouse}} page={setPage} loading={loading}/>)}
                                    </tbody>
                                </table>
                                {admins?.data?.rows?.length === 0 && (
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
                                        totalPage: admins?.totalPage,
                                        page,
                                        pageChange,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <>
                    {/* Register Admin */}
                    {showRegisModal === true ? (
                        <RegisterAdmin
                            showModal={setShowRegisModal}
                            params={{ page, sort, search, warehouse }}
                        />
                    ) : (
                        <></>
                    )}
                </>
            </div>
        </>
    );
}
