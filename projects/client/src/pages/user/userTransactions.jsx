import { useDispatch } from 'react-redux';
import TransactionTabs from '../../components/user/transactions/transactionTabs';
import { useEffect, useState } from 'react';
import {
    getAllUserOrderAsync,
    setLoading,
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
import { Helmet } from 'react-helmet';
import SkeletonTransactionCard from '../../components/user/transactions/skeletonTransaction';

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
    const [expiredTime, setExpiredTime] = useState(false);
    const loading = useSelector((state) => state.order.loading)
 
    const pageChange = (event, value) => {
        setPage(value);
    };

    const handleCancelOrder = async () => {
        await dispatch(userCancelOrderAsync({ order_id: orderId }));
        await dispatch(
            getAllUserOrderAsync({
                sort: sortTransaction,
                page,
                status_id,
                search,
            }),
        );
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
        return () => dispatch(setLoading(false))
    }, [page, sortTransaction, status_id, search, expiredTime]);
    return (
        <>
            <Toaster />
            <Helmet>
                <title>IKEWA | Transactions</title>
                <meta name="description" content="transactions" />
            </Helmet>
            <div className="flex justify-center gap-4 py-[80px] max-lg:flex-col max-lg:w-full max-lg:items-center max-lg:px-9 lg:flex-row">
                <div className="md:w-1/4 flex justify-center">
                    <UserSidebar />
                </div>
                <div className="w-full md:flex md:justify-start">
                    <div>
                        <div className="">
                            <div className="font-bold text-3xl">
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
                        <div className="flex sm:flex-row max-sm:flex-col max-md:gap-4 justify-between w-full items-center">
                            <div className="flex items-center gap-4">
                                <SortTransactionSelect
                                    state={{
                                        setSortTransaction,
                                        sortTransaction,
                                    }}
                                />
                            </div>
                            <div className='max-sm:order-first'>
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
                                                key={index}
                                                data={{ value }}
                                                state={{
                                                    setCancelOrder,
                                                    setOrderId,
                                                    setStatusId,
                                                    setExpiredTime,
                                                }}
                                            />
                                        );
                                    },
                                )
                            )}
                        </div>
                        {orderLists?.data?.data?.rows ? (
                            <div className="flex justify-center">
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
