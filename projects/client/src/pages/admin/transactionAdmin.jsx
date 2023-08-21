import { useEffect, useState } from 'react';
import SideBarAdmin from '../../components/admin/adminPageSideBar';
import FilterAdmin from '../../components/admin/filterAdmin';
import SearchBarAdmin from '../../components/admin/searchBarAdmin';
import StatusBar from '../../components/admin/transaction/statusBarTransaction';
import TransactionCard from '../../components/admin/transaction/transactionCard';
import { useDispatch, useSelector } from 'react-redux';
import { allTransactionAsync } from '../../redux/features/transactionSlice';
import { getAllStatus } from '../../redux/features/statusSlice';
import DateRangePicker from '../../components/admin/transaction/dateRangePicker';
import PaginationAdmin from '../../components/admin/paginationAdmin';
import { useSearchParams } from 'react-router-dom';
import DropdownSort from '../../components/admin/transaction/dropdownSort';
import ModalTransactionDetail from '../../components/admin/transaction/modalTransactionDetail';
import { Helmet } from 'react-helmet';

export default function TransactionAdmin() {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.status.status);
    const transaction = useSelector((state) => state.transaction.data);
    // console.log(transaction)
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(searchParams.get('page') || 1);
    const [warehouse, setWarehouse] = useState(
        searchParams.get('warehouse') || '',
    );
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [statusId, setStatus] = useState(
        searchParams.get('statusId') || null,
    );
    const [sort, setSort] = useState(searchParams.get('sort') || 'Newest');
    const [detailId, setDetailId] = useState('');
    const [openDetail, setOpenDetail] = useState(false);

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
    }, [page, warehouse, search, startDate, endDate, statusId, sort]);
    return (
        <>
            <Helmet>
                <title>IKEWA | Admin Transaction</title>
                <meta name="description" content="admin-transaction" />
            </Helmet>
            <div className="sm:flex">
                <SideBarAdmin />
                <div className="p-8 w-full">
                    <div className="font-bold text-2xl mt-2">Transaction</div>
                    <div className="my-3 p-2">
                        <div className="flex justify-between">
                            <div className="flex gap-2">
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
                                <SearchBarAdmin
                                    data={{ searchChange, search }}
                                />
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
                    <TransactionCard
                        transaction={transaction}
                        detail={{ setDetailId, detailId, setOpenDetail }}
                    />
                    <div className="w-full flex justify-center mt-3">
                        <PaginationAdmin
                            data={{
                                totalPage: transaction?.totalPage,
                                page,
                                pageChange,
                            }}
                        />
                    </div>
                </div>
            </div>
            <ModalTransactionDetail
                data={{ setOpenDetail, openDetail, detailId, transaction }}
            />
        </>
    );
}
