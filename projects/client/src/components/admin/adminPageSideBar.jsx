import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import {
    FcSalesPerformance,
    FcInTransit,
    FcTemplate,
    FcClock,
    FcBriefcase,
    FcAssistant,
    FcUndo,
    FcExternal,
    FcShop,
} from 'react-icons/fc';
import toast from 'react-hot-toast';
import { getDataLogin } from '../../redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function SideBarAdmin() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const { pathname } = window.location;
    const [disabled, setDisabled] = useState(false);
    const dispatch = useDispatch();
    const dataLogin = useSelector((state) => state.user.dataLogin);

    const onLogout = () => {
        try {
            setDisabled(true);
            localStorage.removeItem('user');
            toast.success('Logout success!', {
                position: 'top-center',
                duration: 2000,
                style: {
                    border: '2px solid #000',
                    borderRadius: '10px',
                    background: '#0051BA',
                    color: 'white',
                },
            });
            setTimeout(() => {
                setDisabled(false);
                navigate('/admins/login');
            }, 200);
        } catch (error) {
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
    };

    useEffect(() => {
        dispatch(getDataLogin());
    }, []);

    return (
        <>
            <div className="hidden sm:block h-screen sticky top-0">
                <div
                    className={`${
                        open ? 'w-60' : 'w-20'
                    } p-5 pt-8 h-screen bg-white relative`}
                >
                    <IoIosArrowBack
                        size={30}
                        className={`absolute right-6 ${
                            open ? 'right-[-15px]' : ''
                        } rounded-full cursor-pointer top-12 border-2 duration-300 bg-white ${
                            !open && 'rotate-180'
                        } ring-2 ring-[#0051BA]`}
                        onClick={() => setOpen(!open)}
                    />
                    <div
                        className="flex ml-1 gap-x-3 items-center"
                        onClick={() => navigate('/admins/dashboard')}
                    >
                        <img
                            src="https://preview.redd.it/uhiuxnz5ber21.jpg?auto=webp&s=76182965b43ea456c3525a050ba0f16f12b44c98"
                            className={`h-16 cursor-pointer duration-300 ${
                                !open && 'hidden'
                            }`}
                            alt="logo"
                        />
                        {/* <span
                            className={`cursor-pointer origin-center bg-[#0051BA] text-[40px] text-transparent font-extrabold bg-clip-text ${
                                !open && 'hidden'
                            }`}
                        >
                            IKEA
                        </span> */}
                    </div>
                    <ul className={`pt-16 mx-1 ${open === true ? 'pt-9' : ''}`}>
                        <li
                            className={`${
                                pathname === '/admins/dashboard'
                                    ? 'underline'
                                    : 'no-underline'
                            } font-semibold text-xl flex items-center gap-x-4 cursor-pointer hover:bg-grey-400 rounded-md ${
                                !open && 'mt-5'
                            }`}
                            onClick={() => navigate('/admins/dashboard')}
                        >
                            <FcTemplate
                                size={30}
                                className={`duration-500 ${
                                    open && 'rotate-[360deg]'
                                }`}
                            />
                            <span className={`${!open && 'hidden'}`}>
                                Dashboard
                            </span>
                        </li>
                        <li
                            className={`${
                                pathname === '/admins/products'
                                    ? 'underline'
                                    : 'no-underline'
                            } font-semibold text-xl flex items-center gap-x-4 cursor-pointer hover:bg-grey-400 rounded-md mt-10`}
                            onClick={() => navigate('/admins/products')}
                        >
                            <FcBriefcase
                                size={30}
                                className={`duration-500 ${
                                    open && 'rotate-[360deg]'
                                }`}
                            />
                            <span className={`${!open && 'hidden'}`}>
                                Product
                            </span>
                        </li>
                        <li
                            className={`${
                                pathname === '/admins/setting'
                                    ? 'underline'
                                    : 'no-underline'
                            } font-semibold text-xl flex items-center gap-x-4 cursor-pointer hover:bg-grey-400 rounded-md mt-10 ${
                                dataLogin?.role?.name === 'warehouse admin'
                                    ? 'hidden'
                                    : ''
                            }`}
                            onClick={() => navigate('/admins/setting')}
                        >
                            <FcAssistant
                                size={30}
                                className={`duration-500 ${
                                    open && 'rotate-[360deg]'
                                }`}
                            />
                            <span className={`${!open && 'hidden'}`}>
                                Admin
                            </span>
                        </li>
                        <li
                            className={`${
                                pathname === '/admins/warehouse/setting'
                                    ? 'underline'
                                    : 'no-underline'
                            } font-semibold text-xl flex items-center gap-x-4 cursor-pointer hover:bg-grey-400 rounded-md mt-10 ${
                                dataLogin?.role?.name === 'warehouse admin'
                                    ? 'hidden'
                                    : ''
                            }`}
                            onClick={() =>
                                navigate('/admins/warehouse/setting')
                            }
                        >
                            <FcShop
                                size={30}
                                className={`duration-500 ${
                                    open && 'rotate-[360deg]'
                                }`}
                            />
                            <span className={`${!open && 'hidden'}`}>
                                Warehouse
                            </span>
                        </li>
                        <li
                            className={`${
                                pathname === '/admins/transactions'
                                    ? 'underline'
                                    : 'no-underline'
                            } font-semibold text-xl flex items-center gap-x-4 cursor-pointer hover:bg-grey-400 rounded-md mt-10`}
                            onClick={() => navigate('/admins/transactions')}
                        >
                            <FcInTransit
                                size={30}
                                className={`duration-500 ${
                                    open && 'rotate-[360deg]'
                                }`}
                            />
                            <span className={`${!open && 'hidden'}`}>
                                Transaction
                            </span>
                        </li>
                        <li
                            className={`${
                                pathname === '/admins/dashboard'
                                    ? 'underline'
                                    : 'no-underline'
                            } font-semibold text-xl flex items-center gap-x-4 cursor-pointer hover:bg-grey-400 rounded-md mt-10`}
                            onClick={() => navigate('/admins/dashboard')}
                        >
                            <FcExternal
                                size={30}
                                className={`duration-500 ${
                                    open && 'rotate-[360deg]'
                                }`}
                            />
                            <span className={`${!open && 'hidden'}`}>
                                Mutation
                            </span>
                        </li>
                        <li
                            className={`${
                                pathname === '/admins/dashboard'
                                    ? 'underline'
                                    : 'no-underline'
                            } font-semibold text-xl flex items-center gap-x-4 cursor-pointer hover:bg-grey-400 rounded-md mt-10`}
                            onClick={() => navigate('/admins/dashboard')}
                        >
                            <FcSalesPerformance
                                size={30}
                                className={`duration-500 ${
                                    open && 'rotate-[360deg]'
                                }`}
                            />
                            <span className={`${!open && 'hidden'}`}>
                                Sales Report
                            </span>
                        </li>
                        <li
                            className={`${
                                pathname === '/admins/dashboard'
                                    ? 'underline'
                                    : 'no-underline'
                            } font-semibold text-xl flex items-center gap-x-4 cursor-pointer hover:bg-grey-400 rounded-md mt-10`}
                            onClick={() => navigate('/admins/dashboard')}
                        >
                            <FcClock
                                size={30}
                                className={`duration-500 ${
                                    open && 'rotate-[360deg]'
                                }`}
                            />
                            <span className={`${!open && 'hidden'}`}>
                                Product History
                            </span>
                        </li>
                        <li>
                            <button
                                className={`${
                                    pathname === '/admins/dashboard'
                                        ? 'underline'
                                        : 'no-underline'
                                } font-semibold text-xl flex items-center gap-x-4 cursor-pointer hover:bg-grey-400 rounded-md mt-9 disabled:cursor-not-allowed ${
                                    dataLogin?.role?.name === 'warehouse admin'
                                        ? 'mt-[44px]'
                                        : ''
                                }${open === false ? 'mt-[44px]' : ''} ${
                                    open === false &&
                                    dataLogin?.role?.name === 'warehouse admin'
                                        ? 'mt-[44px]'
                                        : ''
                                }`}
                                disabled={disabled}
                                onClick={onLogout}
                            >
                                <FcUndo
                                    size={30}
                                    className={`duration-500 ${
                                        open && 'rotate-[360deg]'
                                    }`}
                                />
                                <span className={`${!open && 'hidden'}`}>
                                    Logout
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-10 sm:hidden w-full flex items-center justify-center pb-6">
                <div className="flex justify-center items-center">
                    {/* <img
                        src="https://preview.redd.it/uhiuxnz5ber21.jpg?auto=webp&s=76182965b43ea456c3525a050ba0f16f12b44c98"
                        className="h-10 cursor-pointer"
                        alt="logo"
                    /> */}
                    <ul className="flex items-center justify-center gap-4">
                        <li
                            className="font-semibold text-xl flex items-center justify-center gap-x-4 cursor-pointer hover:bg-gray-300 rounded-md mt-5"
                            onClick={() => navigate('/admins/dashboard')}
                        >
                            <FcTemplate size={25} />
                        </li>
                        <li
                            className="font-semibold text-xl flex items-center justify-center gap-x-4 cursor-pointer hover:bg-gray-300 rounded-md mt-5"
                            onClick={() => navigate('/admins/dashboard')}
                        >
                            <FcBriefcase size={25} />
                        </li>
                        <li
                            className="font-semibold text-xl flex items-center justify-center gap-x-4 cursor-pointer hover:bg-gray-300 rounded-md mt-5"
                            onClick={() => navigate('/admins/setting')}
                        >
                            <FcAssistant size={25} />
                        </li>
                        <li
                            className="font-semibold text-xl flex items-center justify-center gap-x-4 cursor-pointer hover:bg-gray-300 rounded-md mt-5"
                            onClick={() =>
                                navigate('/admins/warehouse/setting')
                            }
                        >
                            <FcShop size={25} />
                        </li>
                        <li
                            className="font-semibold text-xl flex items-center justify-center gap-x-4 cursor-pointer hover:bg-gray-300 rounded-md mt-5"
                            onClick={() => navigate('/admins/dashboard')}
                        >
                            <FcInTransit size={25} />
                        </li>
                        <li
                            className="font-semibold text-xl flex items-center justify-center gap-x-4 cursor-pointer hover:bg-gray-300 rounded-md mt-5"
                            onClick={() => navigate('/admins/dashboard')}
                        >
                            <FcExternal size={25} />
                        </li>
                        <li
                            className="font-semibold text-xl flex items-center justify-center gap-x-4 cursor-pointer hover:bg-gray-300 rounded-md mt-5"
                            onClick={() => navigate('/admins/dashboard')}
                        >
                            <FcSalesPerformance size={25} />
                        </li>
                        <li
                            className="font-semibold text-xl flex items-center justify-center gap-x-4 cursor-pointer hover:bg-gray-300 rounded-md mt-5"
                            onClick={() => navigate('/admins/dashboard')}
                        >
                            <FcClock size={25} />
                        </li>
                        <li
                            className="font-semibold text-xl flex items-center justify-center gap-x-4 cursor-pointer hover:bg-gray-300 rounded-md mt-5"
                            onClick={onLogout}
                        >
                            <FcUndo size={25} />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
