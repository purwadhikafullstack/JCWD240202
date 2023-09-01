import SalesPerCategory from '../sales report/salesPerCategory';
import SalesPerProducts from '../sales report/salesPerProducts';
import TotalSalesMonthly from '../sales report/totalSalesMonthly';
import Income from './income';
import NewCustomer from './newCustomer';
import ProductTotalStock from './productStock';
import TotalCustomer from './totalCustomers';

export default function SuperAdminView(props) {
    return (
        <div>
            <div className="flex flex-col sm:flex-row pt-9 gap-4 w-full">
                <Income />
                <TotalCustomer />
                <NewCustomer />
            </div>
            <div className="flex gap-9 pt-9">
                <div className="flex-1 flex flex-col gap-4">
                    <SalesPerCategory
                        data={{
                            loading: props?.state?.loading,
                            month: props?.state?.month,
                            year: props?.state?.year,
                            warehouseId: props?.state?.warehouseId,
                        }}
                    />
                    <SalesPerProducts
                        data={{
                            loading: props?.state?.loading,
                            month: props?.state?.month,
                            year: props?.state?.year,
                            warehouseId: props?.state?.warehouseId,
                        }}
                    />
                </div>
                <div className="flex-1">
                    <ProductTotalStock />
                </div>
            </div>
        </div>
    );
}
