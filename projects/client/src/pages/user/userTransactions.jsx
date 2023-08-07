import { useDispatch } from 'react-redux';
import TransactionTabs from '../../components/user/transactions/transactionTabs';
import { useEffect } from 'react';
import { getAllUserOrderAsync } from '../../redux/features/orderSlice';
import { useSelector } from 'react-redux';
import TransactionHistoryBox from '../../components/user/transactions/historyBox';
import UserSidebar from '../../components/user/sidebar/userSidebar';

export default function UserTransactions() {
    const dispatch = useDispatch();
    const orderLists = useSelector((state) => state.order.order);

    useEffect(() => {
        dispatch(getAllUserOrderAsync());
    }, []);
    return (
        <>
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
                        <TransactionTabs />
                    </div>
                    <div className=" p-9 flex flex-col gap-7 w-full">
                        {orderLists?.data?.data?.rows?.map((value, index) => {
                            return <TransactionHistoryBox data={{ value }} />;
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
