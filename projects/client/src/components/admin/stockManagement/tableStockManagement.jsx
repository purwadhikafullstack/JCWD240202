import { useState } from 'react';
import { FcPlus, FcMinus } from 'react-icons/fc';
import AddQuantityModal from './addQtyModal';
import ReduceQuantityModal from './reduceQtyModal';
import { useDispatch } from 'react-redux';

export default function TableStockManagement({ data, params, dataLogin }) {
    const [showAddQtyModal, setShowAddQtyModal] = useState(false);
    const [showReduceQtyModal, setShowReduceQtyModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});

    return (
        <>
            {data?.map((value, index) => {
                return (
                    <tr
                        key={index}
                        scope="row"
                        className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                    >
                        <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-r flex justify-center">
                            <img
                                className="min-w-[40px] max-w-[80px]"
                                src={
                                    value?.product_images[0]?.name.startsWith(
                                        'PIMG',
                                    )
                                        ? process.env.REACT_APP_API_IMAGE_URL +
                                          value?.product_images[0]?.name
                                        : value?.product_images[0]?.name
                                }
                                alt="product_image"
                            />
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-r">
                            {' '}
                            {value.name}
                        </td>
                        <td className="px-6 py-4 border-r text-center">
                            {value.category.name}
                        </td>
                        {!params.warehouse && dataLogin?.role_id === 3 ? (
                            <></>
                        ) : (
                            <td className="px-6 py-4 border-r text-center">
                                {value?.product_stocks[0]?.warehouse?.city}
                            </td>
                        )}
                        {!params.warehouse && dataLogin?.role_id === 3 ? (
                            <td className="px-6 py-4 border-r text-center">
                                {value.total_stock}
                            </td>
                        ) : (
                            <td className="px-6 py-4 border-r text-center">
                                {value?.product_stocks[0]?.stock}
                            </td>
                        )}
                        {!params.warehouse && dataLogin?.role_id === 3 ? (
                            <></>
                        ) : (
                            <td className="pl-3 py-4">
                                <div className="w-full flex items-center justify-center">
                                    <button
                                        className="font-medium text-center mr-3 border-2 border-sky-700 rounded-full"
                                        onClick={() => {
                                            setShowReduceQtyModal(true);
                                            setSelectedProduct(value);
                                        }}
                                    >
                                        <FcMinus size={18} />
                                    </button>
                                    <button
                                        className="font-medium text-center mr-3"
                                        onClick={() => {
                                            setShowAddQtyModal(true);
                                            setSelectedProduct(value);
                                        }}
                                    >
                                        <FcPlus size={25} />
                                    </button>
                                </div>
                            </td>
                        )}
                    </tr>
                );
            })}
            <tr>
                <td>
                    {showAddQtyModal === true ? (
                        <AddQuantityModal
                            showModal={setShowAddQtyModal}
                            selected={selectedProduct}
                            params={params}
                        />
                    ) : (
                        <></>
                    )}

                    {showReduceQtyModal === true ? (
                        <ReduceQuantityModal
                            showModal={setShowReduceQtyModal}
                            selected={selectedProduct}
                            params={params}
                        />
                    ) : (
                        <></>
                    )}
                </td>
            </tr>
        </>
    );
}
