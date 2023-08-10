import SideBarAdmin from '../../components/admin/adminPageSideBar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllMutation } from '../../redux/features/mutationSlice';
import RequestMutation from '../../components/admin/requestMutationModal';
import MutationCard from '../../components/admin/mutationCard';
import { useSearchParams } from 'react-router-dom';
import SortStatusMutation from '../../components/admin/sortStatusMutation';
import { IoCloseCircleSharp } from 'react-icons/io5';
import SortNewestMutation from '../../components/admin/sortNewestMutation';
import FilterDate from '../../components/admin/filterDateRange';
import PaginationAdmin from '../../components/admin/paginationAdmin';
import { AiOutlineCalendar } from 'react-icons/ai';
import FilterAdmin from '../../components/admin/filterAdmin';
import { Toaster } from 'react-hot-toast';

export default function MutationPage() {
    const dispatch = useDispatch();
    const dataMutation = useSelector((state) => state.mutation.allMutation);
    const dataLogin = useSelector((state) => state.user.dataLogin);
    console.log(dataLogin);

    const [searchParams, setSearchParams] = useSearchParams();

    const [showRequestModal, setShowRequestModal] = useState(false);
    const [tabs, setTabs] = useState('');
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [response, setResponse] = useState(
        searchParams.get('response') || '',
    );
    const [request, setRequest] = useState(searchParams.get('request') || '');
    const [status, setStatus] = useState(searchParams.get('status') || '');
    const [sort, setSort] = useState(searchParams.get('status') || '');
    const [warehouse, setWarehouse] = useState(
        searchParams.get('warehouse') || '',
    );
    const [date1, setDate1] = useState('');
    const [date2, setDate2] = useState('');
    const [startDate, setStartDate] = useState(
        searchParams.get('startDate') || '',
    );
    const [endDate, setEndDate] = useState(searchParams.get('endDate') || '');

    const pageChange = (event, value) => {
        setPage(value);
    };

    const statusChange = (status) => {
        setStatus(status);
        setPage(1);
    };

    const sortChange = (sort) => {
        setSort(sort);
        setPage(1);
    };

    const filterDate = (startDate, endDate) => {
        setStartDate(startDate);
        setEndDate(endDate);
        setDate1(startDate);
        setDate2(endDate);
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

        if (response) {
            queryParams['response'] = response;
        }

        if (request) {
            queryParams['request'] = request;
        }

        if (status) {
            queryParams['status'] = status;
        }

        if (warehouse) {
            queryParams['warehouse'] = warehouse;
        }

        if (sort) {
            queryParams['sort'] = sort;
        }

        if (startDate) {
            queryParams['startDate'] = startDate;
        }

        if (endDate) {
            queryParams['endDate'] = endDate;
        }

        setSearchParams(queryParams);

        dispatch(
            getAllMutation(
                page,
                response,
                request,
                status,
                warehouse,
                sort,
                startDate,
                endDate,
            ),
        );
    }, [page, response, request, status, warehouse, sort, startDate, endDate]);

    return (
        <>
            <Toaster />
            <div>
                <div className="sm:flex">
                    <SideBarAdmin />
                    <div className="bg-blue-200 p-8 w-full">
                        <div className="font-bold text-2xl">
                            <h1 className='text-4xl mb-8'>Mutation Management</h1>
                            {dataLogin?.warehouse?.city ? (
                                <>
                                    <h1>
                                        Welcome, {dataLogin?.first_name}{' '}
                                        {dataLogin?.last_name}!
                                    </h1>
                                    <h1 className="mt-3">
                                        {dataLogin?.warehouse?.city} Warehouse
                                        Mutation
                                    </h1>
                                </>
                            ) : (
                                <>
                                    <h1>Welcome, Admin!</h1>
                                </>
                            )}
                        </div>
                        <div className="mt-5 p-3 bg-white shadow-md rounded-lg">
                            <div className="sm:flex sm:justify-between w-full mb-2">
                                <div className="sm:flex sm:justify-start sm:items-center sm:gap-2 w-full">
                                    <SortStatusMutation
                                        data={{ statusChange, status }}
                                    />
                                    <SortNewestMutation
                                        data={{ sortChange, sort }}
                                    />
                                    {dataLogin?.role_id === 3 ? (
                                        <FilterAdmin
                                            data={{
                                                warehouseChange,
                                                warehouse,
                                            }}
                                        />
                                    ) : (
                                        <></>
                                    )}

                                    {status ? (
                                        <button
                                            onClick={() => {
                                                setStatus('');
                                            }}
                                            className="flex items-center gap-1 mr-2"
                                        >
                                            <IoCloseCircleSharp size={12} />

                                            <div className="bg-[#0051BA] text-white rounded-lg px-2 py-1 text-[10px] flex items-center">
                                                {status === 'waiting'
                                                    ? 'Waiting'
                                                    : status === 'confirmed'
                                                    ? 'Confirmed'
                                                    : 'Rejected'}
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
                                            className="flex items-center gap-1 mr-2"
                                        >
                                            <IoCloseCircleSharp size={12} />

                                            <div className="bg-[#0051BA] text-white rounded-lg px-2 py-1 text-[10px] flex items-center">
                                                {sort === 'newest'
                                                    ? 'Newest'
                                                    : 'Oldest'}
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
                                </div>
                                {dataLogin?.role_id === 3 ? (
                                    <></>
                                ) : (
                                    <button
                                        onClick={() =>
                                            setShowRequestModal(true)
                                        }
                                        className="text-white text-[10px] font-bold border p-1 rounded-lg bg-[#0051BA] hover:bg-gray-400 focus:ring-2 focus:ring-main-500 w-28 p-2 mt-5 md:mt-0"
                                    >
                                        Request Mutation
                                    </button>
                                )}
                            </div>

                            <div className="mb-4">
                                <hr className="border border-gray-200"></hr>
                            </div>
                            <div className="flex flex-col md:flex-row gap-3 mb-4">
                                <button
                                    disabled={
                                        tabs || dataLogin?.role_id === 3
                                            ? true
                                            : false
                                    }
                                    className={`border rounded-lg w-auto whitespace-nowrap rounded-full px-3 cursor-pointer ${
                                        response || request
                                            ? 'border rounded-lg w-auto whitespace-nowrap rounded-full px-3 cursor-pointer'
                                            : 'bg-[#0051BA] border-gray-600 text-white'
                                    }`}
                                    onClick={() => {
                                        setTabs('all');
                                        setResponse('');
                                        setRequest('');
                                        setPage(1);
                                    }}
                                >
                                    All Mutations
                                </button>
                                {dataLogin?.role_id === 3 ? (
                                    <></>
                                ) : (
                                    <button
                                        disabled={
                                            response === 'response-list'
                                                ? true
                                                : false
                                        }
                                        className={`border rounded-lg w-auto whitespace-nowrap rounded-full px-3 cursor-pointer ${
                                            response === 'response-list'
                                                ? 'bg-[#0051BA] border-gray-600 text-white'
                                                : ''
                                        }`}
                                        onClick={() => {
                                            setTabs('');
                                            setRequest('');
                                            setResponse('response-list');
                                            setPage(1);
                                        }}
                                    >
                                        Response Mutations
                                    </button>
                                )}
                                {dataLogin?.role_id === 3 ? (
                                    <></>
                                ) : (
                                    <button
                                        disabled={
                                            request === 'request-list'
                                                ? true
                                                : false
                                        }
                                        className={`border rounded-lg w-auto whitespace-nowrap rounded-full px-3 cursor-pointer ${
                                            request === 'request-list'
                                                ? 'bg-[#0051BA] border-gray-600 text-white'
                                                : ''
                                        }`}
                                        onClick={() => {
                                            setTabs('');
                                            setResponse('');
                                            setRequest('request-list');
                                            setPage(1);
                                        }}
                                    >
                                        Request Mutations
                                    </button>
                                )}

                                <div className="w-full flex sm:justify-center md:justify-end relative">
                                    <FilterDate
                                        data={{
                                            filterDate,
                                            startDate,
                                            endDate,
                                        }}
                                    />
                                    {!date1 && !date2 ? (
                                        <button
                                            className="text-gray-300 absolute bg-white top-2 right-2 mr-[3px]"
                                            onClick={() => {
                                                setStartDate('');
                                                setEndDate('');
                                            }}
                                        >
                                            <AiOutlineCalendar size={16} />
                                        </button>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                            <div>
                                <MutationCard
                                    data={dataMutation}
                                    dataLogin={dataLogin}
                                    params={{
                                        page,
                                        response,
                                        request,
                                        status,
                                        sort,
                                        startDate,
                                        endDate,
                                    }}
                                />
                            </div>
                            <div className="w-full flex justify-center">
                                <PaginationAdmin
                                    data={{
                                        totalPage: dataMutation?.totalPage,
                                        page,
                                        pageChange,
                                        // setPage,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Request Modal */}
            {showRequestModal === true ? (
                <RequestMutation
                    showModal={setShowRequestModal}
                    dataLogin={dataLogin}
                    params={{
                        page,
                        response,
                        request,
                        status,
                        sort,
                        startDate,
                        endDate,
                    }}
                />
            ) : (
                <></>
            )}
        </>
    );
}
