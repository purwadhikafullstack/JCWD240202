/* eslint-disable no-throw-literal */
import { useState } from 'react';
import ProfileTabs from '../../components/user/tabs';
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function ChangePasswordUser() {
    // Input
    const [prevPassword, setPrevPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    console.log(newPassword);
    console.log(confirmPassword);

    // Show hide password
    const [showPassword, setShowPassword] = useState('password');
    const [showNewPassword, setShowNewPassword] = useState('password');
    const [showConfirmPassword, setShowConfirmPassword] = useState('password');

    const showPass = () => {
        if (showPassword === 'password') {
            setShowPassword('text');
        } else if (showPassword === 'text') {
            setShowPassword('password');
        }
    };

    const showNewPass = () => {
        if (showNewPassword === 'password') {
            setShowNewPassword('text');
        } else if (showNewPassword === 'text') {
            setShowNewPassword('password');
        }
    };

    const showConfirmPass = () => {
        if (showConfirmPassword === 'password') {
            setShowConfirmPassword('text');
        } else if (showConfirmPassword === 'text') {
            setShowConfirmPassword('password');
        }
    };

    const token = JSON.parse(localStorage?.getItem('user'));
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    const changePassword = async () => {
        try {
            if (
                prevPassword === '' ||
                newPassword === '' ||
                confirmPassword === ''
            ) {
                throw { message: "Field can't be empty" };
            } else if (
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
                    showPass();
                    showNewPass();
                    showConfirmPass();
                }
            }
        } catch (error) {
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
                                                    type={showPassword}
                                                    onChange={(e) =>
                                                        setPrevPassword(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={prevPassword}
                                                />
                                                {showPassword === 'password' ? (
                                                    <AiOutlineEye
                                                        onClick={showPass}
                                                        className="text-2xl absolute right-2 cursor-pointer"
                                                    />
                                                ) : (
                                                    <AiOutlineEyeInvisible
                                                        onClick={showPass}
                                                        className="text-2xl absolute right-2 cursor-pointer"
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
                                                    type={showNewPassword}
                                                    onChange={(e) =>
                                                        setNewPassword(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={newPassword}
                                                />
                                                {showNewPassword ===
                                                'password' ? (
                                                    <AiOutlineEye
                                                        onClick={showNewPass}
                                                        className="text-2xl absolute right-2 cursor-pointer"
                                                    />
                                                ) : (
                                                    <AiOutlineEyeInvisible
                                                        onClick={showNewPass}
                                                        className="text-2xl absolute right-2 cursor-pointer"
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
                                                    type={showConfirmPassword}
                                                    onChange={(e) =>
                                                        setConfirmPassword(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={confirmPassword}
                                                />
                                                {showConfirmPassword ===
                                                'password' ? (
                                                    <AiOutlineEye
                                                        onClick={
                                                            showConfirmPass
                                                        }
                                                        className="text-2xl absolute right-2 cursor-pointer"
                                                    />
                                                ) : (
                                                    <AiOutlineEyeInvisible
                                                        onClick={
                                                            showConfirmPass
                                                        }
                                                        className="text-2xl absolute right-2 cursor-pointer"
                                                    />
                                                )}
                                            </div>
                                        </label>
                                    </form>
                                    <button
                                        className="bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white px-5 py-2 mt-2 text-sm"
                                        onClick={changePassword}
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
