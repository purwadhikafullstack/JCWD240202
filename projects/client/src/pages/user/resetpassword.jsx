import { useState } from 'react';
import ProfileTabs from '../../components/user/tabs';
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineEyeInvisible } from 'react-icons/ai';

export default function ResetPassword() {
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

    return (
        <>
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
                                        <label className="block mb-3">
                                            <span className="block text-sm font-medium text-slate-700 mb-1">
                                                New Password
                                            </span>
                                            <div className="flex items-center relative">
                                                <input
                                                    className="border border-gray-400 w-[500px] rounded-md px-2 h-8 disabled:text-gray-600 disabled:cursor-not-allowed focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                                    name="new_password"
                                                    type={showNewPassword}
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
                                        <label className="block mb-3">
                                            <span className="block text-sm font-medium text-slate-700 mb-1">
                                                Confirm Password
                                            </span>
                                            <div className="flex items-center relative">
                                                <input
                                                    className="border border-gray-400 w-[500px] rounded-md px-2 h-8 disabled:text-gray-600 disabled:cursor-not-allowed focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                                    name="confirm Password"
                                                    type={showConfirmPassword}
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
                                    <button className="bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white px-5 py-2 mt-2 text-sm">
                                        Save
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
