import { AiOutlineClose } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAvailableWh } from '../../redux/features/warehouseSlice';
import { setWhAdmin } from '../../redux/features/warehouseSlice';

export default function AssignWarehouseAdmin({ showModal, selected }) {
    const dispatch = useDispatch();
    const availableWh = useSelector((state) => state.warehouse.availableWh);
    const status = useSelector((state) => state.warehouse.isAssigned);
    const [disabled, setDisabled] = useState(false);

    // input
    const [warehouseId, setWarehouseId] = useState(0);

    useEffect(() => {
        dispatch(getAvailableWh());
        if (status === true) {
            showModal(false);
        }
    }, [status]);

    return (
        <>
            <div className="bg-black bg-opacity-50 fixed inset-0 z-50">
                {/* <!-- Main modal --> */}
                <div className="fixed flex items-center justify-center z-999 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-full max-w-2xl max-h-full">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Assign Warehouse Admin
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
                                        Warehouses
                                    </span>
                                    <select
                                        type="text"
                                        onChange={(e) =>
                                            setWarehouseId(e.target.value)
                                        }
                                        className="border border-gray-400 w-[300px] rounded-md px-2 h-11 disabled:text-gray-600 disabled:cursor-not-allowed w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                        name="warehouse"
                                    >
                                        {availableWh?.length > 0 ? (
                                            <option
                                                value=""
                                                className="w-1/2 text-gray-200"
                                            >
                                                Warehouse
                                            </option>
                                        ) : (
                                            <option
                                                value=""
                                                className="w-1/2 text-gray-200"
                                            >
                                                Warehouse not available, please
                                                unassigned or remove admin
                                                first!
                                            </option>
                                        )}

                                        {availableWh?.map((value, index) => {
                                            return (
                                                <option
                                                    value={value.id}
                                                    key={index}
                                                >
                                                    {value.city}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                            {/* <!-- Modal footer --> */}
                            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button
                                    className="bg-[#0051BA] enabled:hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3 disabled:cursor-not-allowed disabled:bg-black"
                                    disabled={disabled}
                                    onClick={() => {
                                        setDisabled(true);
                                        setTimeout(() => {
                                            dispatch(
                                                setWhAdmin(
                                                    warehouseId,
                                                    selected?.id,
                                                ),
                                            );
                                            setTimeout(() => {
                                                setDisabled(false);
                                            }, 1000);
                                        }, 500);
                                    }}
                                >
                                    Confirm
                                </button>
                                <button
                                    className="bg-red-600 hover:bg-gray-400 rounded-lg text-white text-sm text-white py-2 text-sm p-3"
                                    onClick={() => showModal(false)}
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
