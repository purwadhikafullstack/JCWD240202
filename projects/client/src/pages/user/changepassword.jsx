/* eslint-disable no-throw-literal */
import { useState } from 'react';
import ProfileTabs from '../../components/user/profile/tabs';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function ChangePasswordUser() {
    // Input
    const [prevPassword, setPrevPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Show hide password
    const [showPassword, setShowPassword] = useState(true);
    const [showNewPassword, setShowNewPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);

    const [disabled, setDisabled] = useState(false);
    const token = JSON.parse(localStorage?.getItem('user'));
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    const changePassword = async () => {
        try {
            setDisabled(true);
            if (
                pattern.test(newPassword) === false ||
                pattern.test(confirmPassword) === false
            ) {
                throw {
                    message:
                        'Password must be 8 characters, 1 uppercase, 1 lowercase and 1 number!',
                };
            } else if (newPassword !== confirmPassword) {
                throw { message: "Password doesn't match" };
            } else {
                const updatePassword = await axios.patch(
                    process.env.REACT_APP_API_BASE_URL +
                        '/users/change-password',
                    {
                        prev_password: prevPassword,
                        new_password: newPassword,
                        confirm_password: confirmPassword,
                    },
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    },
                );

                if (updatePassword.data.success) {
                    setDisabled(false);
                    toast.success('Password updated!', {
                        position: 'top-center',
                        duration: 2000,
                        style: {
                            border: '2px solid #000',
                            borderRadius: '10px',
                            background: '#0051BA',
                            color: 'white',
                        },
                    });
                    setPrevPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                    setShowPassword(true);
                    setShowNewPassword(true);
                    setShowConfirmPassword(true);
                }
            }
        } catch (error) {
            setDisabled(false);
            if (error.response) {
                toast.error(error.response.data.message, {
                    position: 'top-center',
                    duration: 2000,
                    style: {
                        border: '2px solid #000',
                        borderRadius: '10px',
                        background: '#DC2626',
                        color: 'white',
                    },
                });
            } else {
                toast.error(error.message, {
                    position: 'top-center',
                    duration: 2000,
                    style: {
                        border: '2px solid #000',
                        borderRadius: '10px',
                        background: '#DC2626',
                        color: 'white',
                    },
                });
            }
        }
    };

    return (
        <>
            <Toaster />
            <div className="mt-[5px] p-[20px]">
                <div className="w-full flex justify-center">
                    <div className="w-full md:w-[80%] flex justify-center">
                        <div className="py-[10px] px-[30px] border-2 border-gray-200 rounded-lg pb-[30px] shadow w-full">
                            <ProfileTabs />
                            <div className="w-full md:flex justify-center mt-8">
                                <div>
                                    <form>
                                        <label className="block mb-3 w-full md:w-[500px]">
                                            <span className="block text-sm font-medium text-slate-700 mb-1">
                                                Password
                                            </span>
                                            <div className="flex items-center relative">
                                                <input
                                                    className="border border-gray-400 w-full md:w-[500px] rounded-md px-2 h-8 disabled:text-gray-600 disabled:cursor-not-allowed focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                                    name="password"
                                                    type={
                                                        showPassword
                                                            ? 'password'
                                                            : 'text'
                                                    }
                                                    onChange={(e) =>
                                                        setPrevPassword(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={prevPassword}
                                                />
                                                {showPassword ? (
                                                    <AiFillEye
                                                        onClick={() =>
                                                            setShowPassword(
                                                                !showPassword,
                                                            )
                                                        }
                                                        className="text-2xl absolute right-2 cursor-pointer bg-white pl-2"
                                                    />
                                                ) : (
                                                    <AiFillEyeInvisible
                                                        onClick={() =>
                                                            setShowPassword(
                                                                !showPassword,
                                                            )
                                                        }
                                                        className="text-2xl absolute right-2 cursor-pointer bg-white pl-2"
                                                    />
                                                )}
                                            </div>
                                        </label>
                                        <label className="block mb-3 w-full md:w-[500px]">
                                            <span className="block text-sm font-medium text-slate-700 mb-1">
                                                New Password
                                            </span>
                                            <div className="flex items-center relative">
                                                <input
                                                    className="border border-gray-400 w-full md:w-[500px] rounded-md px-2 h-8 disabled:text-gray-600 disabled:cursor-not-allowed focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                                    name="new_password"
                                                    type={
                                                        showNewPassword
                                                            ? 'password'
                                                            : 'text'
                                                    }
                                                    onChange={(e) =>
                                                        setNewPassword(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={newPassword}
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
                                        </label>
                                        <label className="block mb-3 w-full md:w-[500px]">
                                            <span className="block text-sm font-medium text-slate-700 mb-1">
                                                Confirm Password
                                            </span>
                                            <div className="flex items-center relative">
                                                <input
                                                    className="border border-gray-400 w-full md:w-[500px] rounded-md px-2 h-8 disabled:text-gray-600 disabled:cursor-not-allowed focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                                    name="confirm Password"
                                                    type={
                                                        showConfirmPassword
                                                            ? 'password'
                                                            : 'text'
                                                    }
                                                    onChange={(e) =>
                                                        setConfirmPassword(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={confirmPassword}
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
                                        </label>
                                    </form>
                                    <button
                                        className="bg-[#0051BA] enabled:hover:bg-gray-400 rounded-lg text-white px-5 py-2 mt-2 text-sm disabled:cursor-not-allowed disabled:bg-black"
                                        onClick={changePassword}
                                        disabled={
                                            !prevPassword ||
                                            !newPassword ||
                                            !confirmPassword ||
                                            disabled
                                        }
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="bg-rose-600 hover:bg-gray-400 rounded-lg text-white px-4 py-2 mt-2 text-sm ml-2"
                                        onClick={() => {
                                            setPrevPassword('');
                                            setNewPassword('');
                                            setConfirmPassword('');
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
