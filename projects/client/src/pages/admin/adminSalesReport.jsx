import SideBarAdmin from '../../components/admin/adminPageSideBar';
import FilterWarehouse from '../../components/admin/sales report/filterWarehouse';
import FilterMonth from '../../components/admin/sales report/filterMonth';
import TotalSalesMonthly from '../../components/admin/sales report/totalSalesMonthly';
import { useEffect, useState } from 'react';
import SalesPerCategory from '../../components/admin/sales report/salesPerCategory';
import SalesPerProducts from '../../components/admin/sales report/salesPerProducts';
import ChartSales from '../../components/admin/sales report/chartSales';
import TotalOrdersReport from '../../components/admin/sales report/totalOrders';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getDataLogin } from '../../redux/features/userSlice';

export default function AdminSalesReport() {
    const dispatch = useDispatch();
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [warehouseId, setWarehouseId] = useState('');
    const [warehouseName, setWarehouseName] = useState('');
    const loginData = useSelector((state) => state.user.dataLogin);

    useEffect(() => {
        dispatch(getDataLogin());
    }, []);

    return (
        <>
            <div className="sm:flex">
                <SideBarAdmin />
                <div className="bg-blue-200 py-8 px-14 w-full">
                    <div className="flex gap-2 items-end">
                        <div className="font-bold text-3xl">Sales Report</div>
                        <div className="">
                            {loginData?.role?.id === 3
                                ? warehouseName
                                    ? `(${warehouseName})`
                                    : `(All Warehouses)`
                                : `(${loginData?.warehouse?.province})`}
                        </div>
                    </div>
                    <div className="flex justify-start items-center gap-9 px-9 pt-4">
                        {loginData?.role?.id === 3 ? (
                            <FilterWarehouse
                                state={{ setWarehouseId, setWarehouseName }}
                            />
                        ) : (
                            ''
                        )}

                        <FilterMonth state={{ setMonth, setYear }} />
                    </div>
                    <div className="flex justify-evenly pt-9">
                        <TotalSalesMonthly
                            data={{ month, year, warehouseId }}
                        />
                        <TotalOrdersReport
                            data={{ month, year, warehouseId }}
                        />
                        <SalesPerCategory data={{ month, year, warehouseId }} />
                    </div>
                    <div className="flex justify-evenly pt-9 gap-4">
                        <ChartSales data={{ warehouseId }} />
                        <SalesPerProducts data={{ month, year, warehouseId }} />
                    </div>
                </div>
            </div>
        </>
    );
}
