import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import EditWareHouseModal from './editWarehouseModal';
import DeleteWarehouseModal from './deleteWarehouseModal';
import { getDataProvincesRo } from '../../redux/features/warehouseSlice';
import { getDataCitiesRo } from '../../redux/features/warehouseSlice';

export default function WarehouseTableSetting({ data }) {
    const [showEditWhModal, setShowEditWhModal] = useState(false);
    const [showDeleteWhModal, setShowDeleteWhModal] = useState(false);
    const [selectedEdit, setSelectedEdit] = useState({});
    console.log(data)

    const dispatch = useDispatch();
    const dataProvinces = useSelector(
        (state) => state.warehouse.dataProvincesRo,
    );
    const dataCities = useSelector((state) => state.warehouse.dataCitiesRo);

    useEffect(() => {
        dispatch(getDataProvincesRo());
        dispatch(getDataCitiesRo());
    }, []);

    return (
        <>
            {data?.map((value, index) => {
                return (
                    <tr
                        key={index}
                        scope="row"
                        className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                    >
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-r">
                            <div>{value.city}</div> <div>{value.province}</div>
                        </td>
                        <td className="px-6 py-4 border-r text-center">
                            {value?.subdistrict}
                        </td>
                        <td className="px-6 py-4 border-r text-center">
                            {value?.street}
                        </td>
                        <td className="px-6 py-4 border-r text-center">
                            {value?.postcode}
                        </td>
                        <td className="px-6 py-4 border-r text-center">
                            {value?.user !== null ? (
                                <>
                                    <div className="font-bold">
                                        {value?.user?.first_name}
                                        <br />
                                        {value?.user?.last_name}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="text-red-600 font-semibold">
                                        ADMIN <br /> NOT <br /> ASSIGNED
                                    </div>
                                </>
                            )}
                        </td>
                        <td className="pl-3 py-4 text-center">
                            <button
                                className="font-medium text-center text-blue-600 mr-3"
                                onClick={() => {
                                    setShowEditWhModal(true);
                                    setSelectedEdit(value);
                                }}
                            >
                                <AiFillEdit size={18} />
                            </button>
                            <button
                                className="font-medium text-center text-red-600 mr-3"
                                onClick={() => {
                                    setShowDeleteWhModal(true);
                                    setSelectedEdit(value);
                                }}
                            >
                                <AiFillDelete size={18} />
                            </button>
                        </td>
                    </tr>
                );
            })}

            <tr>
                <td>
                    {/* Edit Warehouse Modal */}
                    {showEditWhModal === true ? (
                        <EditWareHouseModal
                            showModal={setShowEditWhModal}
                            selected={selectedEdit}
                            dataProvince={dataProvinces}
                            dataCity={dataCities}
                        />
                    ) : (
                        <></>
                    )}

                    {/* DELETE Warehouse Modal */}
                    {showDeleteWhModal === true ? (
                        <DeleteWarehouseModal
                            showModal={setShowDeleteWhModal}
                            selected={selectedEdit}
                        />
                    ) : (
                        <></>
                    )}
                </td>
            </tr>
        </>
    );
}
