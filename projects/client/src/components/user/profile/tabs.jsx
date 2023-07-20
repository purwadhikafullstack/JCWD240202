import { FaAddressBook, FaUserCircle, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { SiSpringsecurity } from 'react-icons/si';

export default function ProfileTabs() {
    const navigate = useNavigate();
    const { pathname } = window.location;

    return (
        <>
            <div className="container mx-auto border border-t-0 border-l-0 border-r-0 h-14">
                <div className="flex">
                    <div
                        className={`flex justify-center items-center w-24 h-14 pt-3 pr-2 cursor-pointer ${
                            pathname === '/users/profile' &&
                            'border-2 border-t-0 border-l-0 border-r-0 border-[#0051BA]'
                        }`}
                        onClick={() => navigate('/users/profile')}
                    >
                        <FaUserCircle
                            size={22}
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
                        className={`flex justify-center items-center w-24 h-14 pt-3 ml-2 pr-2 cursor-pointer ${
                            pathname === '/users/address' &&
                            'border-2 border-t-0 border-l-0 border-r-0 border-[#0051BA]'
                        }`}
                        onClick={() => navigate('/users/address')}
                    >
                        <FaAddressBook
                            size={22}
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
                        className={`flex justify-center items-center w-24 h-14 pt-3 ml-2 pr-2 cursor-pointer ${
                            pathname === '/users/change-password' &&
                            'border-2 border-t-0 border-l-0 border-r-0 border-[#0051BA]'
                        }`}
                        onClick={() => navigate('/users/change-password')}
                    >
                        <FaLock
                            size={25}
                            className={`${
                                pathname === '/users/change-password'
                                    ? 'text-[#0051BA]'
                                    : 'text-[#4b5563]'
                            } ml-2`}
                        />
                        <p
                            className={`text-sm leading-6 pl-2 hidden md:block ${
                                pathname === '/users/change-password'
                                    ? 'text-[#0051BA]'
                                    : 'text-[#4b5563]'
                            }`}
                        >
                            Password
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
