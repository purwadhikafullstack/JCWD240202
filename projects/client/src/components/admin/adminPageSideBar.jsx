import { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';
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
    FcAddDatabase,
    FcFilingCabinet,
    FcViewDetails,
    FcProcess,
} from 'react-icons/fc';
import { getDataLogin } from '../../redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ModalLogoutAdmin from './modalLogoutAdmin';

export default function SideBarAdmin() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const [openProduct, setOpenProduct] = useState(false);
    const [openProductHistory, setOpenProductHistory] = useState(false);
    const { pathname } = window.location;
    const [disabled, setDisabled] = useState(false);
    const dispatch = useDispatch();
    const dataLogin = useSelector((state) => state.user.dataLogin);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(getDataLogin());
    }, []);

    return (
        <>
            <div className="hidden sm:block h-screen sticky top-0 left-0">
                <div
                    className={`${
                        open ? 'w-60' : 'w-20'
                    } p-5 pt-4 h-screen bg-white relative`}
                >
                    <IoIosArrowBack
                        size={30}
                        className={`absolute right-6 ${
                            open ? 'right-[-15px]' : ''
                        } rounded-full cursor-pointer top-9 border-2 duration-300 bg-white ${
                            !open && 'rotate-180'
                        } ring-2 ring-[#0051BA]`}
                        onClick={() => setOpen(!open)}
                    />
                    <div
                        className="flex ml-1 gap-x-3 items-center"
                        onClick={() => navigate('/admins/dashboard')}
                    >
                        <img
                            src="https://64.media.tumblr.com/22d27700f3eda4e98a4f3dc3afec2cbf/e20133d87d137a53-46/s2048x3072/4261a63cdcb7805a99d16f57642b3ccf70800f1e.pnj"
                            className={`h-16 cursor-pointer duration-300 ${
                                !open && 'hidden'
                            }`}
                            alt="logo"
                        />
                    </div>
                    <ul className={`mx-1 ${open === true ? 'mt-6' : 'mt-20'}`}>
                        <li
                            className={`${
                                pathname === '/admins/dashboard'
                                    ? 'underline'
                                    : 'no-underline'
                            } font-semibold text-lg flex items-center gap-x-4 cursor-pointer hover:bg-grey-400 rounded-md ${
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
                            className="font-semibold text-lg flex items-center gap-x-4 cursor-pointer hover:bg-grey-400 rounded-md mt-7"
                            onClick={() => {
                                setOpenProduct(!openProduct);
                                setOpenProductHistory(false);
                            }}
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
                            <IoIosArrowDown
                                className={`${
                                    open ? 'block ml-8 duration-200' : 'hidden'
                                } ${
                                    openProduct
                                        ? 'rotate-[180deg] duration-200'
                                        : ''
                                }`}
                            />
                        </li>
                        {/* List */}
                        <li
                            className={`${
                                pathname === '/admins/products'
                                    ? 'underline'
                                    : 'no-underline'
                            } ${
                                openProduct ? 'block' : 'hidden'
                            } font-semibold text-xs flex items-center gap-x-4 cursor-pointer hover:bg-grey-400 rounded-md mt-5 ${
                                open ? 'ml-8' : ''
                            }`}
                            onClick={() => navigate('/admins/products')}
                        >
                            <FcAddDatabase
                                size={`${open ? 20 : 30}`}
                                className={`duration-500 ${
                                    open && 'rotate-[360deg]'
                                }`}
                            />
                            <span className={`${!open && 'hidden'}`}>
                                Product List
                            </span>
                        </li>
                        {/* Stock */}
                        <li
                            className={`${
                                pathname === '/admins/stock-management'
                                    ? 'underline'
                                    : 'no-underline'
                            } ${
                                openProduct ? 'block' : 'hidden'
                            } font-semibold text-xs flex items-center gap-x-4 cursor-pointer hover:bg-grey-400 rounded-md mt-5 ${
                                open ? 'ml-8' : ''
                            }`}
                            onClick={() => navigate('/admins/stock-management')}
                        >
                            <FcFilingCabinet
                                size={`${open ? 20 : 30}`}
                                className={`duration-500 ${
                                    open && 'rotate-[360deg]'
                                }`}
                            />
                            <span className={`${!open && 'hidden'}`}>
                                Product Stock
                            </span>
                        </li>
                        <li
                            className={`${
                                pathname === '/admins/user-management'
                                    ? 'underline'
                                    : 'no-underline'
                            } font-semibold text-lg flex items-center gap-x-4 cursor-pointer hover:bg-grey-400 rounded-md mt-7 ${
                                dataLogin?.role?.name === 'warehouse admin'
                                    ? 'hidden'
                                    : ''
                            }`}
                            onClick={() => navigate('/admins/user-management')}
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
                                pathname === '/admins/warehouse-management'
                                    ? 'underline'
                                    : 'no-underline'
                            } font-semibold text-lg flex items-center gap-x-4 cursor-pointer hover:bg-grey-400 rounded-md mt-7 ${
                                dataLogin?.role?.name === 'warehouse admin'
                                    ? 'hidden'
                                    : ''
                            }`}
                            onClick={() =>
                                navigate('/admins/warehouse-management')
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
                            } font-semibold text-lg flex items-center gap-x-4 cursor-pointer hover:bg-grey-400 rounded-md mt-7`}
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
                                pathname === '/admins/mutation-management'
                                    ? 'underline'
                                    : 'no-underline'
                            } font-semibold text-lg flex items-center gap-x-4 cursor-pointer hover:bg-grey-400 rounded-md mt-7`}
                            onClick={() =>
                                navigate('/admins/mutation-management')
                            }
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
                                pathname === '/admins/sales_report'
                                    ? 'underline'
                                    : 'no-underline'
                            } font-semibold text-lg flex items-center gap-x-4 cursor-pointer hover:bg-grey-400 rounded-md mt-7`}
                            onClick={() => navigate('/admins/sales-report')}
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
                        {/* PRODUCT HISTORY */}
                        <li
                            className="font-semibold text-lg flex items-center gap-x-4 cursor-pointer hover:bg-grey-400 rounded-md mt-7"
                            onClick={() => {
                                setOpenProductHistory(!openProductHistory);
                                setOpenProduct(false);
                            }}
                        >
                            <FcClock
                                size={30}
                                className={`duration-500 ${
                                    open && 'rotate-[360deg]'
                                }`}
                            />
                            <span className={`${!open && 'hidden'}`}>
                                Product <br></br> History
                            </span>
                            <IoIosArrowDown
                                className={`${
                                    open ? 'block ml-8 duration-200' : 'hidden'
                                } ${
                                    openProductHistory
                                        ? 'rotate-[180deg] duration-200'
                                        : ''
                                }`}
                            />
                        </li>
                        {/* Stok History */}
                        <li
                            className={`${
                                pathname === '/admins/stock-history'
                                    ? 'underline'
                                    : 'no-underline'
                            } ${
                                openProductHistory ? 'block' : 'hidden'
                            } font-semibold text-xs flex items-center gap-x-4 cursor-pointer hover:bg-grey-400 rounded-md mt-5 ${
                                open ? 'ml-8' : ''
                            }`}
                            onClick={() => navigate('/admins/stock-history')}
                        >
                            <FcProcess
                                size={`${open ? 20 : 30}`}
                                className={`duration-500 ${
                                    open && 'rotate-[360deg]'
                                }`}
                            />
                            <span className={`${!open && 'hidden'}`}>
                                Stock History
                            </span>
                        </li>
                        {/* Log Stock */}
                        <li
                            className={`${
                                pathname === '/admins/stock-log'
                                    ? 'underline'
                                    : 'no-underline'
                            } ${
                                openProductHistory ? 'block' : 'hidden'
                            } font-semibold text-xs flex items-center gap-x-4 cursor-pointer hover:bg-grey-400 rounded-md mt-5 ${
                                open ? 'ml-8' : ''
                            }`}
                            onClick={() => navigate('/admins/stock-log')}
                        >
                            <FcViewDetails
                                size={`${open ? 20 : 30}`}
                                className={`duration-500 ${
                                    open && 'rotate-[360deg]'
                                }`}
                            />
                            <span className={`${!open && 'hidden'}`}>
                                Log Stock
                            </span>
                        </li>
                        <li>
                            <button
                                className={`font-semibold text-lg flex items-center gap-x-4 cursor-pointer hover:bg-grey-400 rounded-md mt-7 disabled:cursor-not-allowed fixed bottom-5`}
                                disabled={disabled}
                                onClick={() => setShowModal(true)}
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
                <div className="flex flex-col justify-center items-center">
                    <ul className="flex items-center justify-center gap-4">
                        <li
                            className="font-semibold text-lg flex items-center justify-center gap-x-4 cursor-pointer hover:bg-gray-300 rounded-md mt-5"
                            onClick={() => navigate('/admins/dashboard')}
                        >
                            <FcTemplate size={25} />
                        </li>
                        <li
                            className="font-semibold text-lg flex items-center justify-center gap-x-4 cursor-pointer hover:bg-gray-300 rounded-md mt-5"
                            onClick={() => setOpenProduct(!openProduct)}
                        >
                            <FcBriefcase size={25} />
                        </li>
                        <li
                            className="font-semibold text-lg flex items-center justify-center gap-x-4 cursor-pointer hover:bg-gray-300 rounded-md mt-5"
                            onClick={() => navigate('/admins/user-management')}
                        >
                            <FcAssistant size={25} />
                        </li>
                        <li
                            className="font-semibold text-lg flex items-center justify-center gap-x-4 cursor-pointer hover:bg-gray-300 rounded-md mt-5"
                            onClick={() =>
                                navigate('/admins/warehouse-management')
                            }
                        >
                            <FcShop size={25} />
                        </li>
                        <li
                            className="font-semibold text-lg flex items-center justify-center gap-x-4 cursor-pointer hover:bg-gray-300 rounded-md mt-5"
                            onClick={() => navigate('/admins/transactions')}
                        >
                            <FcInTransit size={25} />
                        </li>
                        <li
                            className="font-semibold text-lg flex items-center justify-center gap-x-4 cursor-pointer hover:bg-gray-300 rounded-md mt-5"
                            onClick={() =>
                                navigate('/admins/mutation-management')
                            }
                        >
                            <FcExternal size={25} />
                        </li>
                        <li
                            className="font-semibold text-xl flex items-center justify-center gap-x-4 cursor-pointer hover:bg-gray-300 rounded-md mt-5"
                            onClick={() => navigate('/admins/sales-report')}
                        >
                            <FcSalesPerformance size={25} />
                        </li>
                        <li
                            className="font-semibold text-lg flex items-center justify-center gap-x-4 cursor-pointer hover:bg-gray-300 rounded-md mt-5"
                            onClick={() =>
                                setOpenProductHistory(!openProductHistory)
                            }
                        >
                            <FcClock size={25} />
                        </li>
                        <li
                            className="font-semibold text-lg flex items-center justify-center gap-x-4 cursor-pointer hover:bg-gray-300 rounded-md mt-5"
                            onClick={() => setShowModal(true)}
                        >
                            <FcUndo size={25} />
                        </li>
                    </ul>
                    <div className="flex justify-between w-full">
                        <div className="ml-6">
                            <div className="w-full flex justify-center mr-11">
                                <IoIosArrowDown
                                    className={`${
                                        openProduct
                                            ? 'rotate-[180deg] duration-200'
                                            : 'duration-200'
                                    }`}
                                />
                            </div>
                            <ul className="flex justify-start gap-2 w-full">
                                <li
                                    className={`${
                                        openProduct ? 'block' : 'hidden'
                                    } font-semibold text-lg flex items-center justify-center gap-x-4 cursor-pointer hover:bg-gray-300 rounded-md`}
                                    onClick={() => navigate('/admins/products')}
                                >
                                    <FcAddDatabase size={25} />
                                </li>
                                <li
                                    className={`${
                                        openProduct ? 'block' : 'hidden'
                                    } font-semibold text-lg flex items-center justify-center gap-x-4 cursor-pointer hover:bg-gray-300 rounded-md`}
                                    onClick={() =>
                                        navigate('/admins/stock-management')
                                    }
                                >
                                    <FcFilingCabinet size={25} />
                                </li>
                            </ul>
                        </div>
                        <div className="mr-6">
                            <div className="w-full flex justify-center mr-11">
                                <IoIosArrowDown
                                    className={`${
                                        openProductHistory
                                            ? 'rotate-[180deg] duration-200'
                                            : 'duration-200'
                                    }`}
                                />
                            </div>
                            <ul className="flex justify-start gap-2 w-full">
                                <li
                                    className={`${
                                        openProductHistory ? 'block' : 'hidden'
                                    } font-semibold text-lg flex items-center justify-center gap-x-4 cursor-pointer hover:bg-gray-300 rounded-md`}
                                    onClick={() =>
                                        navigate('/admins/stock-history')
                                    }
                                >
                                    <FcProcess size={25} />
                                </li>
                                <li
                                    className={`${
                                        openProductHistory ? 'block' : 'hidden'
                                    } font-semibold text-lg flex items-center justify-center gap-x-4 cursor-pointer hover:bg-gray-300 rounded-md`}
                                    onClick={() =>
                                        navigate('/admins/stock-log')
                                    }
                                >
                                    <FcViewDetails size={25} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {showModal ? <ModalLogoutAdmin showModal={setShowModal} disabled={setDisabled} disable={disabled}/> : <></>}
        </>
    );
}
