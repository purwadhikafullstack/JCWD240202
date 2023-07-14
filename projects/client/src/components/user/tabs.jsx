import { FaAddressBook, FaUserCircle, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function ProfileTabs() {
    const navigate = useNavigate();
    const { pathname } = window.location;

    return (
        <>
            <div className="container mx-auto border border-t-0 border-l-0 border-r-0 h-14">
                <div className="flex">
                    <div
                        className={`flex justify-center w-24 h-14 pt-3 pr-2 cursor-pointer ${
                            pathname === '/users/profile' &&
                            'border-2 border-t-0 border-l-0 border-r-0 border-[#0051BA]'
                        }`}
                        onClick={() => navigate('/users/profile')}
                    >
                        <FaUserCircle
                            size={25}
                            className={`${
                                pathname === '/users/profile'
                                    ? 'text-[#0051BA]'
                                    : 'text-[#4b5563]'
                            } ml-2`}
                        />
                        <p
                            className={`text-sm leading-6 pl-2 hidden md:block ${
                                pathname === '/users/profile'
                                    ? 'text-[#0051BA]'
                                    : 'text-[#4b5563]'
                            }`}
                        >
                            Profile
                        </p>
                    </div>
                    <div
                        className={`flex justify-center w-24 h-14 pt-3 ml-2 pr-2 cursor-pointer ${
                            pathname === '/users/address' &&
                            'border-2 border-t-0 border-l-0 border-r-0 border-[#0051BA]'
                        }`}
                        onClick={() => navigate('/users/address')}
                    >
                        <FaAddressBook
                            size={25}
                            className={`${
                                pathname === '/users/address'
                                    ? 'text-[#0051BA]'
                                    : 'text-[#4b5563]'
                            } ml-2`}
                        />
                        <p
                            className={`text-sm leading-6 pl-2 hidden md:block ${
                                pathname === '/users/address'
                                    ? 'text-[#0051BA]'
                                    : 'text-[#4b5563]'
                            }`}
                        >
                            Address
                        </p>
                    </div>
                    <div
                        className={`flex justify-center md:w-[150px] w-24 h-14 pt-3 ml-2 pr-2 cursor-pointer ${
                            pathname === '/users/reset-password' &&
                            'border-2 border-t-0 border-l-0 border-r-0 border-[#0051BA]'
                        }`}
                        onClick={() => navigate('/users/reset-password')}
                    >
                        <FaLock
                            size={25}
                            className={`${
                                pathname === '/users/reset-password'
                                    ? 'text-blue-600'
                                    : 'text-[#4b5563]'
                            } ml-2`}
                        />
                        <p
                            className={`text-sm leading-6 pl-2 hidden md:block ${
                                pathname === '/users/reset-password'
                                    ? 'text-blue-600'
                                    : 'text-[#4b5563]'
                            }`}
                        >
                            Reset Password
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
