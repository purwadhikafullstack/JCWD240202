import { TextInput } from 'flowbite-react';
import {
    AiOutlineInstagram,
    AiFillTwitterSquare,
    AiOutlineLinkedin,
    AiOutlineYoutube,
    AiOutlineSearch,
} from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Footer(props) {
    const { pathname } = useLocation();
    const userLogin = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const paths = ['/login', '/register', '/admins/login'];

    const path = [
        '/admins/dashboard',
        '/admins/products',
        '/admins/products/categories',
        '/admins/products/colors',
        '/admins/stock-management',
        '/admins/mutation-management',
        '/admins/stock-history',
        '/admins/stock-log',
        '/admins/transactions',
        '/admins/sales-report',
        '/admins/sales-report',
    ];

    if (
        (path.includes(pathname) &&
            (props.dataLogin?.role_id === 2 ||
                props.dataLogin?.role_id === 3 ||
                props.dataLogin === null) &&
            userLogin) ||
        paths.includes(pathname)
    ) {
        return null;
    }

    if (
        (pathname === '/admins/user-management' ||
            pathname === '/admins/warehouse-management') &&
        (props.dataLogin?.role_id === 3 || props.dataLogin === null) &&
        userLogin
    ) {
        return null;
    }

    return (
        <>
            <div className="border-t bg-black w-full px-[30px] py-[30px] sm:px-[80px] sm:py-[40px] text-white">
                <div className="md:flex justify-between items-center">
                    <div className="w-24 mb-6 sm:mb-0">
                        <img src="/logo2.png" alt="footer logo" />
                    </div>
                    <div className="flex gap-9 mb-6 sm:mb-0">
                        <div>
                            <AiOutlineInstagram size={'40px'} />
                        </div>
                        <div>
                            <AiFillTwitterSquare size={'40px'} />
                        </div>
                        <div>
                            <AiOutlineLinkedin size={'40px'} />
                        </div>
                        <div>
                            <AiOutlineYoutube size={'40px'} />
                        </div>
                    </div>
                    <div>
                        <TextInput
                            rightIcon={AiOutlineSearch}
                            placeholder="Search Furniture"
                        ></TextInput>
                    </div>
                </div>
                <div className="flex justify-center pt-9 mb-6 sm:mb-0">
                    <div className="flex gap-16 sm:gap-48">
                        <div className="flex-col">
                            <div>Home</div>
                            <div>About</div>
                            <div>Media</div>
                        </div>
                        <div className="flex-col">
                            <div>Products</div>
                            <div>Jobs</div>
                            <div>Store</div>
                        </div>
                        <div className="flex-col">
                            <div>Legal</div>
                            <div>Careers</div>
                            <div>Awards</div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center sm:justify-start text-sm underline sm:mt-8">
                    Copyright IKEWA, All Rights Reserved
                </div>
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-6 sm:justify-between px-[30px] py-[30px] sm:px-[80px] sm:py-[40px] text-xs bg-gray-200">
                <div className="">
                    IKEWA Indonesia - Jl. BSD Green Office Park, GOP 9 - G Floor
                    BSD City, Sampora, Kec. Cisauk, Kabupaten Tangerang, Banten
                    15345
                </div>
                <div className="flex gap-4">
                    <div>Privacy Policy</div>
                    <div>Cookie Policy</div>
                    <div>Cookie Settings</div>
                    <div>Terms & Conditions</div>
                    <div>Responsible Disclosure Policy</div>
                </div>
            </div>
        </>
    );
}
