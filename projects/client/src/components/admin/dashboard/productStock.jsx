import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getDataStock } from '../../../redux/features/stockSlice';
import { BsFillHouseDoorFill } from 'react-icons/bs';
import { Table } from 'flowbite-react';
import PaginationButton from '../../user/pagination/paginationButton';
import { getDataLogin } from '../../../redux/features/userSlice';
import SkeletonStock from './skeletonStock';

export default function ProductTotalStock(props) {
    const dispatch = useDispatch();
    const stockData = useSelector((state) => state.stock.stocks);
    const loginData = useSelector((state) => state.user.dataLogin)
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [category, setCategory] = useState('');
    const [warehouse, setWarehouse] = useState('');

    const pageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        dispatch(getDataLogin())
        dispatch(getDataStock(page, search, sort, category, warehouse));
    }, [page, search, sort, category, warehouse]);
    return (
        <>{
            props?.data?.loading ? <div className="w-full p-4 bg-white rounded-2xl shadow-xl h-full">
            <div className="flex gap-4 items-center">
                <div>
                    <BsFillHouseDoorFill size={35} />
                </div>
                <div className="font-bold text-xl">Product Stocks {loginData?.role_id === 2 ? `(${loginData?.warehouse?.city})` : ''}</div>
            </div>
            <div className='pt-4'>
                <Table>
                    <Table.Head>
                        <Table.HeadCell>Product Name</Table.HeadCell>
                        <Table.HeadCell>Total Stock</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {stockData?.data?.rows?.map((value, index) => {
                            return (
                                <Table.Row key={index}>
                                    <Table.Cell>{value.name}</Table.Cell>
                                    <Table.Cell>{loginData?.role_id === 3 ? value?.total_stock : value?.product_stocks[0]?.stock}</Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            </div>
            <div className='pt-2 flex justify-center'>
                <PaginationButton
                    data={{
                        totalPage: stockData?.totalPage,
                        page,
                        pageChange,
                    }}
                />
            </div>
        </div> : <SkeletonStock />
        }</>
    );
}
