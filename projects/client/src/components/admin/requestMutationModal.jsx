import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getListWhMutation } from '../../redux/features/mutationSlice';
import { FcSearch } from 'react-icons/fc';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { requestMutation } from '../../redux/features/mutationSlice';

export default function RequestMutation({ showModal, dataLogin, params }) {
    const dispatch = useDispatch();
    const listWhMutation = useSelector(
        (state) => state.mutation.listWhMutation,
    );
    const setDisabledButton = useSelector(
        (state) => state.mutation.disabledButton,
    );
    const setModal = useSelector((state) => state.mutation.modal);

    const [whDestinationId, setWhDestinationId] = useState('');
    const [productStockId, setProductStockId] = useState('');
    const [stock, setStock] = useState('');
    const [reqMutationQty, setReqMutationQty] = useState('');
    const [search, setSearch] = useState('');
    const [change, setChange] = useState(false);
    const [products, setProducts] = useState(null);

    const token = JSON.parse(localStorage?.getItem('user'));

    const productLists = async () => {
        try {
            const lists = await axios.post(
                process.env.REACT_APP_API_BASE_URL + '/mutations/product-list',
                {
                    warehouse_id: whDestinationId,
                    search: search,
                },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );

            if (lists?.data?.data) {
                setProducts(lists?.data?.data);
                setChange(true);
            } else {
                toast.error('Product Not Found', {
                    position: 'top-center',
                    duration: 2000,
                    style: {
                        border: '2px solid #000',
                        borderRadius: '10px',
                        background: '#DC2626',
                        color: 'white',
                    },
                });
                setChange(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        dispatch(getListWhMutation());
        if (setModal === true) {
            showModal(false);
        }
    }, [setModal]);

    return (
        <>
            <Toaster />
            <div className="bg-black bg-opacity-50 fixed inset-0 z-50">
                {/* <!-- Main modal --> */}
                <div className="fixed flex items-center justify-center z-999 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-full max-w-2xl max-h-full">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Request Mutation Product
                                </h3>
                                <button
                                    onClick={() => showModal(false)}
                                    className="text-gray-500"
                                >
                                    <AiOutlineClose size={16} />
                                </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <div className="p-6 space-y-6">
                                <div className="block mb-3">
                                    <span className="block text-sm font-medium text-slate-700 mb-1">
                                        Warehouse Origin
                                    </span>
                                    <select
                                        type="text"
                                        className="border border-gray-400 w-[300px] rounded-md px-2 h-11 disabled:text-gray-600 disabled:cursor-not-allowed disabled:bg-gray-200 w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                        name="warehouse_origin"
                                        disabled={true}
                                    >
                                        <option
                                            value=""
                                            className="w-1/2 text-gray-200"
                                        >
                                            {dataLogin?.warehouse?.city}
                                        </option>
                                    </select>
                                </div>
                                <div className="block mb-3">
                                    <span className="block text-sm font-medium text-slate-700 mb-1">
                                        Warehouse Destination
                                        <span className="text-red-600">*</span>
                                    </span>
                                    <select
                                        className="border border-gray-400 w-full rounded-md px-2 h-11 disabled:text-gray-600 disabled:cursor-not-allowed w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                        name="warehouse_destination"
                                        onChange={(e) => {
                                            setWhDestinationId(e.target.value);
                                        }}
                                    >
                                        <option value="" className="w-2">
                                            Choose Warehouse
                                        </option>
                                        {listWhMutation?.data?.map(
                                            (value, index) => {
                                                if (
                                                    value.city ===
                                                    dataLogin?.warehouse?.city
                                                ) {
                                                    return null;
                                                } else {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={value.id}
                                                            className="w-2"
                                                        >
                                                            {value.city}
                                                        </option>
                                                    );
                                                }
                                            },
                                        )}
                                    </select>
                                </div>
                                <div className="block mb-3">
                                    <span className="block text-sm font-medium text-slate-700 mb-1">
                                        Search Product
                                        <span className="text-red-600">*</span>
                                    </span>
                                    <div className="relative flex items-center">
                                        <input
                                            className="border border-gray-400 w-[300px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:cursor-not-allowed w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                            name="search_product"
                                            placeholder="Search Product"
                                            type="text"
                                            disabled={!whDestinationId}
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                        />
                                        <button
                                            className="absolute right-3 disabled:cursor-not-allowed"
                                            disabled={
                                                !whDestinationId || !search
                                            }
                                            onClick={() => {
                                                setStock(0);
                                                productLists();
                                            }}
                                        >
                                            <FcSearch size={25} />
                                        </button>
                                    </div>
                                    {change === true ? (
                                        <div className="w-full flex justify-end mt-2">
                                            <button
                                                onClick={() => {
                                                    setSearch('');
                                                    setProducts(null);
                                                    setChange(false);
                                                    setStock(0);
                                                }}
                                                className="mr-3"
                                            >
                                                <p className="text-xs font-bold">
                                                    Clear
                                                </p>
                                            </button>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div
                                    className={
                                        products
                                            ? 'flex flex-wrap items-center justify-center gap-4'
                                            : 'hidden'
                                    }
                                >
                                    {products?.map((value, index) => {
                                        return (
                                            <button
                                                key={index}
                                                className="border-2 border-gray-400 w-36 text-black font-bold rounded-md px-2 h-14 disabled:text-gray-600 disabled:cursor-not-allowed disabled:bg-gray-200 focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1 text-xs"
                                                name="destination_quantity"
                                                onClick={() => {
                                                    setStock(0);
                                                    setProductStockId(value.id);
                                                    setStock(value.stock);
                                                }}
                                            >
                                                <p>{value?.product.name}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="block mb-3">
                                    <span className="block text-sm font-medium text-slate-700 mb-1">
                                        Warehouse Destination Product Stock
                                    </span>
                                    <input
                                        className="border border-gray-400 w-[300px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:cursor-not-allowed disabled:bg-gray-200 w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                        name="destination_quantity"
                                        disabled={true}
                                        placeholder={stock ? stock : 0}
                                        type="number"
                                    />
                                </div>
                                <div className="block">
                                    <span className="block text-sm font-medium text-slate-700 mb-1">
                                        Request Mutation Quantity
                                        <span className="text-red-600">*</span>
                                    </span>
                                    <input
                                        className="border border-gray-400 w-[300px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:cursor-not-allowed disabled:bg-gray-200 w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                        name="destination_quantity"
                                        placeholder={
                                            !whDestinationId || !products
                                                ? 0
                                                : 0
                                        }
                                        value={reqMutationQty}
                                        type="number"
                                        onChange={(e) =>
                                            setReqMutationQty(
                                                e.target.value.replace(
                                                    /[^0-9]/g,
                                                    '',
                                                ),
                                            )
                                        }
                                        max={stock}
                                        min={0}
                                    />
                                </div>
                            </div>
                            {/* <!-- Modal footer --> */}
                            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button
                                    className="bg-[#0051BA] enabled:hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3 disabled:cursor-not-allowed"
                                    disabled={
                                        !whDestinationId ||
                                        !productStockId ||
                                        !products ||
                                        !stock ||
                                        !reqMutationQty ||
                                        setDisabledButton
                                    }
                                    onClick={() => {
                                        dispatch(
                                            requestMutation(
                                                productStockId,
                                                dataLogin?.warehouse?.id,
                                                Number(whDestinationId),
                                                stock,
                                                Number(reqMutationQty),
                                                params,
                                            ),
                                        );
                                    }}
                                >
                                    Submit
                                </button>
                                <button
                                    className="bg-red-600 hover:bg-gray-400 rounded-lg text-white text-sm text-white py-2 text-sm p-3"
                                    onClick={() => {
                                        showModal(false);
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
