import { useEffect, useState } from 'react';
import SideBarAdmin from '../../components/admin/adminPageSideBar';
import FilterAdmin from '../../components/admin/filterAdmin';
import StatusBar from '../../components/admin/transaction/statusBarTransaction';
import TransactionCard from '../../components/admin/transaction/transactionCard';
import { useDispatch, useSelector } from 'react-redux';
import { allTransactionAsync, cancelConfirmPaymentAsync, cancelShipping, confirmPaymentAsync, sendUserOrder, setLoading } from '../../redux/features/transactionSlice';
import { getAllStatus } from '../../redux/features/statusSlice';
import DateRangePicker from '../../components/admin/transaction/dateRangePicker';
import PaginationAdmin from '../../components/admin/paginationAdmin';
import { useSearchParams } from 'react-router-dom';
import DropdownSort from '../../components/admin/transaction/dropdownSort';
import ModalTransactionDetail from '../../components/admin/transaction/modalTransactionDetail';
import { Helmet } from 'react-helmet';
import ModalConfirmTransaction from '../../components/admin/product/modalConfirmTransaction';
import { Toaster } from 'react-hot-toast';
import SearchTransaction from '../../components/admin/transaction/searchTransaction';
import ModalNotificationMessage from '../../components/admin/transaction/modalNotificationMessage';
import { createNotificationAsync } from '../../redux/features/notificationSlice';

export default function TransactionAdmin() {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.status.status);
    const transaction = useSelector((state) => state.transaction.data);
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [warehouse, setWarehouse] = useState(
        searchParams.get('warehouse') || '',
    );
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [statusId, setStatus] = useState(
        searchParams.get('statusId') || null,
    );
    const [sort, setSort] = useState(searchParams.get('sort') || 'Newest');
    const [detailId, setDetailId] = useState('');
    const [openDetail, setOpenDetail] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [funcConfirm, setFuncConfirm] = useState('');
    const [valueConfirm, setValueConfirm] = useState('');
    const loading = useSelector((state) => state.transaction.loading);
    const [modalNotification, setModalNotification] = useState(false);
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [expiredTime, setExpiredTime] = useState(false);

    const pageChange = (event, value) => {
        setPage(value);
    };
    const warehouseChange = (warehouse) => {
        setWarehouse(warehouse);
        setPage(1);
    };
    const searchChange = (search) => {
        setSearch(search);
        setPage(1);
    };
    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        if (start && end) {
            setPage(1);
        }
    };
    const handleStatusChange = (statusId) => {
        setStatus(statusId);
        setPage(1);
    };
    const handleSort = (sort) => {
        setSort(sort);
    };
    const reset = () => {
        setPage(1);
        setWarehouse('');
        setSearch('');
        setStartDate('');
        setEndDate('');
        setStatus('');
    };
    const handleConfirm = () => {
        if (funcConfirm === 4) {
            dispatch(cancelShipping(valueConfirm, page, warehouse, search, startDate, endDate, statusId, sort))
            dispatch(createNotificationAsync({order_id : valueConfirm, title, message}))
        } else if (funcConfirm === 3) {
            dispatch(sendUserOrder(valueConfirm, page, warehouse, search, startDate, endDate, statusId, sort))
        } else if (funcConfirm === 2) {
            dispatch(cancelConfirmPaymentAsync(valueConfirm, page, warehouse, search, startDate, endDate, statusId, sort))
            dispatch(createNotificationAsync({order_id : valueConfirm, title, message}))
        } else if (funcConfirm === 1) {
            dispatch(confirmPaymentAsync(valueConfirm, page, warehouse, search, startDate, endDate, statusId, sort))
        }
    };
    useEffect(() => {
        let queryParams = {};
        if (page) {
            queryParams['page'] = page;
        }
        if (warehouse) {
            queryParams['warehouse'] = warehouse;
        }
        if (search) {
            queryParams['search'] = search;
        }
        if (startDate && endDate) {
            queryParams['startDate'] = startDate;
            queryParams['endDate'] = endDate;
        }
        if (statusId) {
            queryParams['statusId'] = statusId;
        }
        if (sort) {
            queryParams['sort'] = sort;
        }
        setSearchParams(queryParams);
        dispatch(
            allTransactionAsync(
                page,
                warehouse,
                search,
                startDate,
                endDate,
                statusId,
                sort,
            ),
        );
        dispatch(getAllStatus());
        return () => dispatch(setLoading(false))
    }, [page, warehouse, search, startDate, endDate, statusId, sort, expiredTime]);
    return (
        <>
            <Toaster />
            <Helmet>
                <title>IKEWA | Admin Transaction</title>
                <meta name="description" content="admin-transaction" />
            </Helmet>
            <div className="sm:flex">
                <SideBarAdmin />
                <div className="p-2 md:p-8 w-full">
                    <div className="font-bold text-2xl mt-2">Transaction</div>
                    <div className="my-3 p-2">
                        <div className="flex justify-between">
                            <div className="flex items-center flex-wrap gap-2">
                                {transaction.roleId === 3 ? (
                                    <FilterAdmin
                                        data={{ warehouseChange, warehouse }}
                                    />
                                ) : null}
                                <DateRangePicker
                                    data={{
                                        handleDateChange,
                                        startDate,
                                        endDate,
                                    }}
                                />
                                <SearchTransaction
                                    data={{ searchChange, search }}
                                />
                                <button onClick={reset} className='hover:underline text-xs text-[#2296f3]'>Reset Filter</button>
                            </div>
                            <div className="">
                                <DropdownSort data={{ handleSort, sort }} />
                            </div>
                        </div>
                        <StatusBar
                            status={status}
                            data={{ handleStatusChange, statusId, reset }}
                        />
                    </div>
                    <div className="w-full flex justify-center mt-3 sm:hidden">
                        <PaginationAdmin
                            data={{
                                totalPage: transaction?.totalPage,
                                page: Number(page),
                                pageChange,
                            }}
                        />
                    </div>
                    <TransactionCard
                        transaction={transaction}
                        detail={{ setDetailId, detailId, setOpenDetail }}
                        confirm={{
                            setShowConfirm,
                            setFuncConfirm,
                            setValueConfirm,
                        }}
                        loading={loading}
                        notification={{ setModalNotification, setDetailId }}
                        time={setExpiredTime}
                    />
                    <div className="w-full flex justify-center mt-3">
                        <PaginationAdmin
                            data={{
                                totalPage: transaction?.totalPage,
                                page: Number(page),
                                pageChange,
                            }}
                        />
                    </div>
                </div>
            </div>
            <ModalTransactionDetail
                data={{ setOpenDetail, openDetail, detailId, transaction }}
                confirm={{ setShowConfirm, setFuncConfirm, setValueConfirm, setModalNotification }}
            />
            <ModalConfirmTransaction
                data={{ showConfirm, setShowConfirm, funcConfirm, reset }}
                handleConfirm={handleConfirm}
            />
            <ModalNotificationMessage
                state={{ modalNotification, setModalNotification, setShowConfirm, setTitle, setMessage }}
            />
        </>
    );
}
