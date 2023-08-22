import { TextInput } from 'flowbite-react';
import {
    AiOutlineInstagram,
    AiFillTwitterSquare,
    AiOutlineLinkedin,
    AiOutlineYoutube,
    AiOutlineSearch,
} from 'react-icons/ai';
import { useLocation } from 'react-router-dom';

export default function Footer(props) {
    const { pathname } = useLocation();
    const userLogin = JSON.parse(localStorage.getItem('user'));

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
        '/admins/sales-report'
    ];

    if (
        (path.includes(pathname) && ((props.dataLogin === 2 || props.dataLogin === 3 || props.dataLogin === undefined) && userLogin)) || paths.includes(pathname)
    ) {
        return null;
    } 
    
    if((pathname === '/admins/user-management' || pathname === '/admins/warehouse-management') && ((props.dataLogin === 3 || props.dataLogin === undefined) && userLogin)) {
        return null
    }

    return (
        <div className="h-[300px] border-t bg-black px-[100px] py-[50px] text-white">
            <div className="flex justify-between items-center">
                <div className="w-24 ">
                    <img
                        src="/logo2.png"
                        alt="footer logo"
                    />
                </div>
                <div className="flex gap-9">
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
            <div className="flex justify-center pt-9">
                <div className="flex gap-48">
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
            <div className="text-sm underline">
                Copyright lorem ipsum, All Rights Reserved
            </div>
        </div>
    );
}
