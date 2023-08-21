import { useEffect, useState } from 'react';
import { BsFillPieChartFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai';

import CategoryTabs from './categoryTabs';
import { Table } from 'flowbite-react';
import { getSalesPerProducts } from '../../../redux/features/reportSlice';
import PaginationButton from '../../user/pagination/paginationButton';

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
            <div className="shadow-lg flex-1 w-full h-inherit bg-white rounded-2xl p-4 overflow-auto">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
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
                <div className="pt-4">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Product Name</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                            <Table.HeadCell>Quantity Sold</Table.HeadCell>
                            <Table.HeadCell>Total Sales</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {productSales?.data?.sales?.map((value, index) => {
                                return (
                                    <Table.Row key={index}>
                                        <Table.Cell>
                                            {value.productName}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {value.category}
                                        </Table.Cell>
                                        <Table.Cell className="flex justify-center">
                                            {value.totalQuantity}
                                        </Table.Cell>
                                        <Table.Cell>
                                            Rp{' '}
                                            {Number(
                                                value.totalSales,
                                            ).toLocaleString('id-ID')}
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
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
        </>
    );
}
