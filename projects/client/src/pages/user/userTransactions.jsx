import { useDispatch } from 'react-redux';
import TransactionTabs from '../../components/user/transactions/transactionTabs';
import { useEffect, useState } from 'react';
import {
    getAllUserOrderAsync,
    userCancelOrderAsync,
} from '../../redux/features/orderSlice';
import { useSelector } from 'react-redux';
import TransactionHistoryBox from '../../components/user/transactions/historyBox';
import UserSidebar from '../../components/user/sidebar/userSidebar';
import PaginationButton from '../../components/user/pagination/paginationButton';
import SortTransactionSelect from '../../components/user/transactions/sortSelect';
import ModalCancelOrder from '../../components/user/transactions/modalCancelOrder';
import { Toaster } from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InvoiceSearch from '../../components/user/transactions/invoiceSearch';

export default function UserTransactions() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderLists = useSelector((state) => state.order.order);
    const [sortTransaction, setSortTransaction] = useState('');
    const [page, setPage] = useState(1);
    const [status_id, setStatusId] = useState(0);
    const [statusName, setStatusName] = useState('');
    const [cancelOrder, setCancelOrder] = useState(false);
    const [orderId, setOrderId] = useState(0);
    const [search, setSearch] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const pageChange = (event, value) => {
        setPage(value);
    };

    const handleCancelOrder = () => {
        dispatch(userCancelOrderAsync({ order_id: orderId }));
        navigate(`/orders/${orderId}`);
        setOrderId(0);
        setCancelOrder(false);
    };

    useEffect(() => {
        let queryParams = {};
        if (page) {
            queryParams['page'] = page;
        }
        if (sortTransaction) {
            queryParams['sort'] = sortTransaction;
        }
        if (search) {
            queryParams['search'] = search;
        }
        if (statusName) {
            queryParams['filter'] = statusName.replaceAll(' ', '%');
        }
        setSearchParams(queryParams);
        dispatch(
            getAllUserOrderAsync({
                sort: sortTransaction,
                page,
                status_id,
                search,
            }),
        );
    }, [page, sortTransaction, status_id, search]);
    return (
        <>
            <Toaster />
            <div className="flex justify-center gap-2">
                <div className="py-[80px]">
                    <UserSidebar />
                </div>
                <div className="p-[80px] flex flex-col items-center">
                    <div className="w-full">
                        <div className="font-bold text-2xl">
                            Transaction History
                        </div>
                    </div>
                    <div className="py-9">
                        <TransactionTabs
                            state={{
                                status_id,
                                setStatusId,
                                setPage,
                                setStatusName,
                            }}
                        />
                    </div>
                    <div className="flex justify-between w-full items-center">
                        <div className="flex items-center gap-4">
                            <SortTransactionSelect
                                state={{ setSortTransaction, sortTransaction }}
                            />
                        </div>
                        <div>
                            <InvoiceSearch
                                state={{ search, setSearch, setPage }}
                            />
                        </div>
                    </div>
                    <div className=" p-9 flex flex-col gap-7 w-full">
                        {!orderLists?.data?.data?.rows ? (
                            <div className="flex justify-center">
                                No Transaction Found
                            </div>
                        ) : (
                            orderLists?.data?.data?.rows?.map(
                                (value, index) => {
                                    return (
                                        <TransactionHistoryBox
                                            data={{ value }}
                                            state={{
                                                setCancelOrder,
                                                setOrderId,
                                                setStatusId,
                                            }}
                                        />
                                    );
                                },
                            )
                        )}
                    </div>
                    {orderLists?.data?.data?.rows ? (
                        <div>
                            <PaginationButton
                                data={{
                                    totalPage: orderLists?.data?.totalPage,
                                    page,
                                    pageChange,
                                }}
                            />
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
            <ModalCancelOrder
                state={{
                    setCancelOrder,
                    cancelOrder,
                    orderId,
                    setOrderId,
                }}
                func={{ handleCancelOrder }}
            />
        </>
    );
}
