import { useNavigate } from 'react-router-dom';
import { GrCatalog } from 'react-icons/gr';
import { BiCategory } from 'react-icons/bi';
import { VscSymbolColor } from 'react-icons/vsc';

export default function ProductTabs() {
    const navigate = useNavigate();
    const { pathname } = window.location;

    return (
        <>
            <div className="border-b border-slate-200">
                <div className="container h-14">
                    <div className="flex">
                        <div
                            className={`flex justify-center items-center w-24 h-14 pt-3 pr-2 cursor-pointer ${
                                pathname === '/admins/products' &&
                                'border-2 border-t-0 border-l-0 border-r-0 border-[#0051BA]'
                            }`}
                            onClick={() => navigate('/admins/products')}
                        >
                            <GrCatalog
                                size={22}
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
                            className={`flex justify-center items-center w-24 h-14 pt-3 ml-2 pr-2 cursor-pointer ${
                                pathname === '/admins/products/category' &&
                                'border-2 border-t-0 border-l-0 border-r-0 border-[#0051BA]'
                            }`}
                            onClick={() =>
                                navigate('/admins/products/categories')
                            }
                        >
                            <BiCategory
                                size={24}
                                className={`text-24 ${
                                    pathname === '/admins/products/categories'
                                        ? 'text-[#0051BA]'
                                        : 'text-[#4b5563]'
                                } ml-2`}
                            />
                            <p
                                className={`text-sm leading-6 pl-2 hidden md:block ${
                                    pathname === '/admins/products/categories'
                                        ? 'text-[#0051BA]'
                                        : 'text-[#4b5563]'
                                }`}
                            >
                                Category
                            </p>
                        </div>
                        <div
                            className={`flex justify-center items-center w-24 h-14 pt-3 ml-2 pr-2 cursor-pointer ${
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
