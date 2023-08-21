import SideBarAdmin from '../../components/admin/adminPageSideBar';
import { Button, Select, Label } from 'flowbite-react';
import FilterWarehouse from '../../components/admin/sales report/filterWarehouse';
import FilterMonth from '../../components/admin/sales report/filterMonth';
import { Helmet } from 'react-helmet';

export default function AdminSalesReport() {
    return (
        <>
            <Helmet>
                <title>IKEWA | Sales Report</title>
                <meta name="description" content="sales-report" />
            </Helmet>
            <div className="sm:flex">
                <SideBarAdmin />
                <div className="bg-blue-200 p-8 w-full">
                    <div className="font-bold text-2xl">Sales Report</div>
                    <div className="flex justify-start gap-9 px-9 pt-4">
                        <FilterMonth />
                        <FilterWarehouse />
                    </div>
                    <div className="flex justify-evenly pt-9">
                        <div className="border w-[400px] h-[300px] bg-white rounded-2xl">
                            Total Sales
                        </div>
                        <div className="border w-[400px] h-[300px] bg-white rounded-2xl">
                            Avg Sales Per Day
                        </div>
                        <div className="border w-[400px] h-[300px] bg-white rounded-2xl">
                            Total Sales per Category
                        </div>
                    </div>
                    <div className="flex justify-evenly pt-9 gap-9">
                        <div className="border w-full h-[400px] bg-white rounded-2xl">
                            Chart Sales per month
                        </div>
                        <div className="border w-full h-[400px] bg-white rounded-2xl">
                            Sales per Product
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
