import { useEffect, useState } from 'react';
import { BsFillPieChartFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai';

import CategoryTabs from './categoryTabs';
import { Table } from 'flowbite-react';
import { getSalesPerProducts } from '../../../redux/features/reportSlice';
import PaginationButton from '../../user/pagination/paginationButton';
import SkeletonTotalSalesProduct from './skeletonTotalSalesProduct';

export default function SalesPerProducts(props) {
    const dispatch = useDispatch();
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const productSales = useSelector((state) => state.report.productSales);

    const pageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        dispatch(
            getSalesPerProducts({
                month: props?.data?.month,
                year: props?.data?.year,
                warehouse_id: props?.data?.warehouseId,
                page,
                category_id: category,
                search,
            }),
        );
    }, [
        props?.data?.month,
        props?.data?.year,
        props?.data?.warehouseId,
        page,
        category,
        search,
    ]);

    return (
        <>
            {props?.data?.loading ? (
                <div className="shadow-lg flex-1 w-full h-inherit bg-white rounded-2xl p-4">
                    <div className="sm:flex justify-between">
                        <div className="flex gap-2 items-center mb-3 sm:mb-0">
                            <div>
                                <BsFillPieChartFill size={36} />
                            </div>
                            <div className="text-xl font-bold">
                                Total Sales Per Product
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="h-9 border flex items-center px-1">
                                <input
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search Product"
                                    className="h-full w-full px-1 outline-none"
                                ></input>
                                <AiOutlineSearch size={20} />
                            </div>
                        </div>
                    </div>
                    <CategoryTabs state={{ category, setCategory, setPage }} />
                    <div className="pt-4  overflow-auto">
                        <Table>
                            <Table.Head>
                                <Table.HeadCell className="text-center">
                                    Product Name
                                </Table.HeadCell>
                                <Table.HeadCell className="text-center">
                                    Category
                                </Table.HeadCell>
                                <Table.HeadCell className="text-center">
                                    Quantity Sold
                                </Table.HeadCell>
                                <Table.HeadCell className="text-center">
                                    Total Sales
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {productSales?.data?.sales?.map(
                                    (value, index) => {
                                        return (
                                            <Table.Row key={index}>
                                                <Table.Cell>
                                                    {value.productName}
                                                </Table.Cell>
                                                <Table.Cell className="text-center">
                                                    {value.category}
                                                </Table.Cell>
                                                <Table.Cell className="flex justify-center">
                                                    {value.totalQuantity}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <div className='flex justify-center'>
                                                        <div className='flex justify-start w-2/3'>
                                                            Rp{' '}
                                                            {Number(
                                                                value.totalSales,
                                                            ).toLocaleString(
                                                                'id-ID',
                                                            )}
                                                        </div>
                                                    </div>
                                                </Table.Cell>
                                            </Table.Row>
                                        );
                                    },
                                )}
                            </Table.Body>
                        </Table>
                    </div>
                    <div className="pt-4 flex justify-center">
                        <PaginationButton
                            data={{
                                totalPage: productSales?.data?.totalPage,
                                page,
                                pageChange,
                            }}
                        />
                    </div>
                </div>
            ) : (
                <SkeletonTotalSalesProduct />
            )}
        </>
    );
}
