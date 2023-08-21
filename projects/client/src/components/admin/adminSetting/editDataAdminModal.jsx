import { useEffect, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editDataWarehouseAdmin } from '../../../redux/features/adminSlice';

export default function EditDataAdmin({ showModal, selected, params }) {
    // input
    const [inputFirstName, setInputFirstName] = useState('');
    const [inputLastName, setInputLastName] = useState('');
    const [inputPhoneNumber, setInputPhoneNumber] = useState('');

    const dispatch = useDispatch();
    const setDisabledButton = useSelector(
        (state) => state.admin.disabledButton,
    );
    const setModal = useSelector((state) => state.admin.modal);

    useEffect(() => {
        setInputFirstName(selected?.first_name);
        setInputLastName(selected?.last_name);
        setInputPhoneNumber(selected?.phone_number);
        if (setModal === true) {
            showModal(false);
        }
    }, [
        setModal,
        selected?.first_name,
        selected?.last_name,
        selected?.phone_number,
    ]);

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
                                    Edit Data Warehouse Admin
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
                                <form>
                                    <div className="block mb-3">
                                        <span className="block text-sm font-medium text-slate-700 mb-1">
                                            First Name{' '}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </span>
                                        <input
                                            type="text"
                                            className="border border-gray-400 w-[300px] rounded-md px-2 h-10 w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1 text-black"
                                            placeholder="First Name"
                                            value={inputFirstName}
                                            onChange={(e) =>
                                                setInputFirstName(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="block mb-3">
                                        <span className="block text-sm font-medium text-slate-700 mb-1">
                                            Last Name{' '}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </span>
                                        <input
                                            type="text"
                                            className="border border-gray-400 w-[300px] rounded-md px-2 h-10 w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1 text-black"
                                            placeholder="Last Name"
                                            value={inputLastName}
                                            onChange={(e) =>
                                                setInputLastName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="block mb-3">
                                        <span className="block text-sm font-medium text-slate-700 mb-1">
                                            Email
                                        </span>
                                        <input
                                            type="email"
                                            className="border border-gray-400 w-[300px] rounded-md px-2 h-10 w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1 disabled:text-gray-600 disabled:bg-gray-200 text-black"
                                            placeholder={selected?.email}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className="block mb-2">
                                        <span className="block text-sm font-medium text-slate-700 mb-1">
                                            Phone Number{' '}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </span>
                                        <input
                                            type="tel"
                                            maxLength="12"
                                            className="border border-gray-400 w-[300px] rounded-md px-2 h-10 w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1 text-black"
                                            placeholder="Phone Number"
                                            value={inputPhoneNumber}
                                            onChange={(e) =>
                                                setInputPhoneNumber(
                                                    e.target.value.replace(
                                                        /[^0-9]/g,
                                                        '',
                                                    ),
                                                )
                                            }
                                        />
                                    </div>
                                </form>
                            </div>
                            {/* <!-- Modal footer --> */}
                            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button
                                    className="bg-[#0051BA] enabled:hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3 disabled:cursor-not-allowed"
                                    disabled={
                                        !inputFirstName ||
                                        !inputLastName ||
                                        !inputPhoneNumber ||
                                        setDisabledButton
                                    }
                                    onClick={() => {
                                        dispatch(
                                            editDataWarehouseAdmin(
                                                inputFirstName,
                                                inputLastName,
                                                inputPhoneNumber,
                                                selected?.id,
                                                params,
                                            ),
                                        );
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
