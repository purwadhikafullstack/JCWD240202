import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getTotalMonthlySalesAsync } from '../../../redux/features/reportSlice';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { BsGraphUpArrow } from 'react-icons/bs';
import { BsGraphDownArrow } from 'react-icons/bs';

export default function TotalSalesMonthly(props) {
    const dispatch = useDispatch();
    const sales = useSelector((state) => state.report.totalSales);

    useEffect(() => {
        dispatch(
            getTotalMonthlySalesAsync({
                month: props?.data?.month,
                year: props?.data?.year,
                warehouse_id: props?.data?.warehouseId,
            }),
        );
    }, [props?.data?.month, props?.data?.year, props?.data?.warehouseId]);
    return (
        <>
            <div className="shadow-lg w-[400px] h-[300px] bg-white rounded-2xl p-4">
                <div className="flex gap-2 items-center">
                    <div>
                        <RiMoneyDollarCircleLine size={36} />
                    </div>
                    <div className="text-xl font-bold">Total Income</div>
                    <div>
                        {props?.data?.month && props?.data?.year
                            ? `(${props?.data?.month}/${props?.data?.year})`
                            : ''}
                    </div>
                </div>
                <div className="pt-4">
                    <div className="font-bold">Previous Month :</div>
                    <div>
                        {sales?.data?.salesPreviousMonth[0]?.total_sales ===
                        null
                            ? 'Rp 0'
                            : `Rp ${Number(
                                  sales?.data?.salesPreviousMonth[0]
                                      ?.total_sales,
                              ).toLocaleString('id-ID')}`}
                    </div>
                </div>
                <div className="pt-4">
                    <div className="font-bold">Current Month : </div>
                    <div className="flex items-center gap-9 pt-4">
                        <div
                            className={`text-4xl flex ${
                                Number(
                                    sales?.data?.salesCurrentMonth[0]
                                        ?.total_sales,
                                ) >
                                Number(
                                    sales?.data?.salesPreviousMonth[0]
                                        ?.total_sales,
                                )
                                    ? 'text-green-500'
                                    : Number(
                                          sales?.data?.salesCurrentMonth[0]
                                              ?.total_sales,
                                      ) ===
                                      Number(
                                          sales?.data?.salesPreviousMonth[0]
                                              ?.total_sales,
                                      )
                                    ? 'text-black'
                                    : Number(
                                          sales?.data?.salesCurrentMonth[0]
                                              ?.total_sales,
                                      ) <
                                      Number(
                                          sales?.data?.salesPreviousMonth[0]
                                              ?.total_sales,
                                      )
                                    ? 'text-red-500'
                                    : ''
                            }`}
                        >
                            Rp{' '}
                            {sales?.data?.salesCurrentMonth[0]?.total_sales ===
                            null
                                ? '0'
                                : `${Number(
                                      sales?.data?.salesCurrentMonth[0]
                                          ?.total_sales,
                                  ).toLocaleString('id-ID')}`}
                        </div>
                        <div>
                            {Number(
                                sales?.data?.salesCurrentMonth[0]?.total_sales,
                            ) >
                            Number(
                                sales?.data?.salesPreviousMonth[0]?.total_sales,
                            ) ? (
                                <BsGraphUpArrow size={25} />
                            ) : Number(
                                  sales?.data?.salesCurrentMonth[0]
                                      ?.total_sales,
                              ) ===
                              Number(
                                  sales?.data?.salesPreviousMonth[0]
                                      ?.total_sales,
                              ) ? (
                                ''
                            ) : Number(
                                  sales?.data?.salesCurrentMonth[0]
                                      ?.total_sales,
                              ) <
                              Number(
                                  sales?.data?.salesPreviousMonth[0]
                                      ?.total_sales,
                              ) ? (
                                <BsGraphDownArrow size={25} />
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
