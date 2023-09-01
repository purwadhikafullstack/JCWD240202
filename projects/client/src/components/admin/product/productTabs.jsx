import { useNavigate } from 'react-router-dom';
import { BiCategory } from 'react-icons/bi';
import { VscSymbolColor } from 'react-icons/vsc';
import {MdOutlineCategory} from 'react-icons/md'

export default function ProductTabs() {
    const navigate = useNavigate();
    const { pathname } = window.location;

    return (
        <>
            <div className="border-b border-slate-200">
                <div className="container h-12">
                    <div className="flex">
                        <div
                            className={`flex justify-center items-center w-24 h-12 pt-1 pr-2 cursor-pointer ${
                                pathname === '/admins/products' &&
                                'border-2 border-t-0 border-l-0 border-r-0 border-[#0051BA]'
                            }`}
                            onClick={() => navigate('/admins/products')}
                        >
                            <BiCategory
                                size={20}
                                className={`${
                                    pathname === '/admins/products'
                                        ? 'text-[#0051BA]'
                                        : 'text-[#4b5563]'
                                } ml-2`}
                            />
                            <p
                                className={`text-sm leading-6 pl-2 hidden md:block ${
                                    pathname === '/admins/products'
                                        ? 'text-[#0051BA]'
                                        : 'text-[#4b5563]'
                                }`}
                            >
                                Product
                            </p>
                        </div>
                        <div
                            className={`flex justify-center items-center w-26 gap-2 h-12 pt-1 ml-2 pr-2 cursor-pointer ${
                                pathname === '/admins/products/categories' &&
                                'border-2 border-t-0 border-l-0 border-r-0 border-[#0051BA]'
                            }`}
                            onClick={() =>
                                navigate('/admins/products/categories')
                            }
                        >
                            <MdOutlineCategory
                                size={22}
                                className={`${
                                    pathname === '/admins/products/categories'
                                        ? 'text-[#0051BA]'
                                        : 'text-[#4b5563]'
                                } ml-2`}
                            />
                            <p
                                className={`text-sm leading-6 pl- hidden md:block ${
                                    pathname === '/admins/products/categories'
                                        ? 'text-[#0051BA]'
                                        : 'text-[#4b5563]'
                                }`}
                            >
                                Category
                            </p>
                        </div>
                        <div
                            className={`flex justify-center items-center w-24 h-12 pt-1 ml-2 pr-2 cursor-pointer ${
                                pathname === '/admins/products/colors' &&
                                'border-2 border-t-0 border-l-0 border-r-0 border-[#0051BA]'
                            }`}
                            onClick={() => navigate('/admins/products/colors')}
                        >
                            <VscSymbolColor
                                size={20}
                                className={`${
                                    pathname === '/admins/products/colors'
                                        ? 'text-[#0051BA]'
                                        : 'text-[#4b5563]'
                                } ml-2`}
                            />
                            <p
                                className={`text-sm leading-6 pl-2 hidden md:block ${
                                    pathname === '/admins/products/colors'
                                        ? 'text-[#0051BA]'
                                        : 'text-[#4b5563]'
                                }`}
                            >
                                colour
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
