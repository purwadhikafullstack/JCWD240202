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
                <Income data={{loading: props?.state?.loading}}/>
                <TotalCustomer data={{loading: props?.state?.loading}}/>
                <NewCustomer data={{loading: props?.state?.loading}}/>
            </div>
            <div className="flex lg:flex-row max-lg:flex-col gap-9 pt-9">
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
                    <ProductTotalStock data={{loading: props?.state?.loading}}/>
                </div>
            </div>
        </div>
    );
}
