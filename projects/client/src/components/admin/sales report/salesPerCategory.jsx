import { useEffect } from 'react';
import { BiCategoryAlt } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getSalesPerCategoryAsync } from '../../../redux/features/reportSlice';
import SkeletonTotalSalesCategory from './skeletonTotalSalesCategory';

export default function SalesPerCategory(props) {
    const dispatch = useDispatch();
    const salesPerCategory = useSelector((state) => state.report.categorySales);
    useEffect(() => {
        dispatch(
            getSalesPerCategoryAsync({
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
                            <BiCategoryAlt size={36} />
                        </div>
                        <div className="text-xl font-bold">
                            Total Sales Per Category
                        </div>
                    </div>
                    <div className="pt-4">
                        {salesPerCategory?.data?.map((value, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex justify-between border-b py-1"
                                >
                                    <div className="flex-1">
                                        {value.category}
                                    </div>
                                    <div className="flex-1 flex justify-start">
                                        Rp{' '}
                                        {Number(
                                            value.totalSales,
                                        ).toLocaleString('id-ID')}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <SkeletonTotalSalesCategory data={salesPerCategory?.data}/>
            )}
        </>
    );
}
