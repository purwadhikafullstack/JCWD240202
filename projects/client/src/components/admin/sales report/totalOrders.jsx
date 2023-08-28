import { useEffect } from 'react';
import { TbTruckDelivery } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getTotalOrderAsync } from '../../../redux/features/reportSlice';
import SkeletonTotalOrder from './skeletonTotalOrders';

export default function TotalOrdersReport(props) {
    const dispatch = useDispatch();
    const orderData = useSelector((state) => state.report.totalOrder);

    useEffect(() => {
        dispatch(
            getTotalOrderAsync({
                month: props?.data?.month,
                year: props?.data?.year,
                warehouse_id: props?.data?.warehouseId,
            }),
        );
    }, [props?.data?.month, props?.data?.year, props?.data?.warehouseId]);
    return (
        <>
            {props?.data?.loading ? (
                <div className="shadow-lg w-full bg-white rounded-2xl p-4">
                    <div className="flex gap-2 items-center">
                        <div>
                            <TbTruckDelivery size={36} />
                        </div>
                        <div className="text-xl font-bold">Total Orders</div>
                    </div>
                    <div className="pt-4 flex flex-col gap-7">
                        <div className="font-bold text-3xl">
                            {orderData?.data?.countOrder} New Orders Created
                        </div>
                        <div className="font-bold text-green-500 text-xl">
                            {orderData?.data?.completeOrder} Completed
                        </div>
                        <div className="font-bold text-red-500 text-xl">
                            {orderData?.data?.cancelledOrder} Cancelled
                        </div>
                    </div>
                </div>
            ) : (
                <SkeletonTotalOrder />
            )}
        </>
    );
}
