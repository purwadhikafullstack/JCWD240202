import { useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { changePasswordWarehouseAdmin } from '../../../redux/features/adminSlice';
import { useSelector, useDispatch } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function ChangePasswordAdmin({ showModal, selected, params }) {
    const [showNewPassword, setShowNewPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);

    // input
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const dispatch = useDispatch();
    const setDisabledButton = useSelector(
        (state) => state.admin.disabledButton,
    );
    const setModal = useSelector((state) => state.admin.modal);

    useEffect(() => {
        if (setModal === true) {
            setShowNewPassword(true);
            setShowConfirmPassword(true);
            showModal(false);
        }
    }, [setModal]);

    return (
        <>
            <div className="bg-black bg-opacity-50 fixed inset-0 z-50">
                <div className="fixed flex items-center justify-center z-999 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
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
                            <div className="p-6 space-y-6">
                                <form>
                                    <div className="block mb-2">
                                        <span className="block text-sm font-medium text-slate-700 mb-1">
                                            New Password{' '}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </span>
                                        <div className="flex items-center relative">
                                            <input
                                                type={
                                                    showNewPassword
                                                        ? 'password'
                                                        : 'text'
                                                }
                                                className="border border-gray-400 w-[300px] rounded-md px-2 h-10 w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1 text-black"
                                                placeholder="New Password"
                                                value={newPassword}
                                                onChange={(e) => {
                                                    setNewPassword(
                                                        e.target.value,
                                                    );
                                                }}
                                            />
                                            {showNewPassword ? (
                                                <AiFillEye
                                                    onClick={() =>
                                                        setShowNewPassword(
                                                            !showNewPassword,
                                                        )
                                                    }
                                                    className="text-2xl absolute right-2 cursor-pointer bg-white pl-2"
                                                />
                                            ) : (
                                                <AiFillEyeInvisible
                                                    onClick={() =>
                                                        setShowNewPassword(
                                                            !showNewPassword,
                                                        )
                                                    }
                                                    className="text-2xl absolute right-2 cursor-pointer bg-white pl-2"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="block">
                                        <span className="block text-sm font-medium text-slate-700 mb-1">
                                            Confirm Password{' '}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </span>
                                        <div className="flex items-center relative">
                                            <input
                                                type={
                                                    showConfirmPassword
                                                        ? 'password'
                                                        : 'text'
                                                }
                                                className="border border-gray-400 w-[300px] rounded-md px-2 h-10 w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1 text-black"
                                                placeholder="Confirm Password"
                                                value={confirmNewPassword}
                                                onChange={(e) => {
                                                    setConfirmNewPassword(
                                                        e.target.value,
                                                    );
                                                }}
                                            />
                                            {showConfirmPassword ? (
                                                <AiFillEye
                                                    onClick={() =>
                                                        setShowConfirmPassword(
                                                            !showConfirmPassword,
                                                        )
                                                    }
                                                    className="text-2xl absolute right-2 cursor-pointer bg-white pl-2"
                                                />
                                            ) : (
                                                <AiFillEyeInvisible
                                                    onClick={() =>
                                                        setShowConfirmPassword(
                                                            !showConfirmPassword,
                                                        )
                                                    }
                                                    className="text-2xl absolute right-2 cursor-pointer bg-white pl-2"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button
                                    className="bg-[#0051BA] enabled:hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3 disabled:cursor-not-allowed"
                                    disabled={
                                        !newPassword ||
                                        !confirmNewPassword ||
                                        setDisabledButton
                                    }
                                    onClick={() => {
                                        dispatch(
                                            changePasswordWarehouseAdmin(
                                                newPassword,
                                                confirmNewPassword,
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
                                <Backdrop
                                    sx={{
                                        color: '#fff',
                                        zIndex: (theme) =>
                                            theme.zIndex.drawer + 1,
                                    }}
                                    open={setDisabledButton}
                                >
                                    <CircularProgress color="inherit" />
                                </Backdrop>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
