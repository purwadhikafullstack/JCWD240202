import { TextInput } from 'flowbite-react';
import {
    AiOutlineInstagram,
    AiFillTwitterSquare,
    AiOutlineLinkedin,
    AiOutlineYoutube,
    AiOutlineSearch,
} from 'react-icons/ai';
import { useLocation } from 'react-router-dom';

export default function Footer() {
    const { pathname } = useLocation();

    const path = [
        '/login',
        '/admins/login',
        '/admins/dashboard',
        '/admins/products',
        '/admins/products/categories',
        '/admins/user-management',
        '/admins/warehouse-management',
        '/admins/stock-management',
        '/admins/mutation-management',
    ];

    if (path.includes(pathname)) {
        return null;
    }
    return (
        <div className="h-[300px] border-t bg-black px-[100px] py-[50px] text-white ">
            <div className="flex justify-between items-center">
                <div className="w-24 ">
                    <img
                        src="https://preview.redd.it/uhiuxnz5ber21.jpg?auto=webp&s=76182965b43ea456c3525a050ba0f16f12b44c98"
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
