import { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { deleteWarehouseAdmin } from '../../../redux/features/adminSlice';

export default function DeleteAdmin({ showModal, selected, page }) {
    const dispatch = useDispatch();
    const setDisabledButton = useSelector(
        (state) => state.admin.disabledButton,
    );
    const setModal = useSelector((state) => state.admin.modal);

    useEffect(() => {
        if (setModal === true) {
            showModal(false);
        }
    }, [setModal]);

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
                                    Change Password Warehouse Admin
                                </h3>
                                <button
                                    onClick={() => showModal(false)}
                                    className="text-gray-500"
                                >
                                    <AiOutlineClose size={16} />
                                </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <div className="p-6 space-y-6 text-black">
                                Are you sure you want to delete this admin ?
                            </div>
                            {/* <!-- Modal footer --> */}
                            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button
                                    className="bg-[#0051BA] enabled:hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3 enabled:hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3 disabled:cursor-not-allowed"
                                    disabled={setDisabledButton}
                                    onClick={() => {
                                        dispatch(
                                            deleteWarehouseAdmin(selected?.id),
                                        );
                                        page(1);
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
