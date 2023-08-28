import { Link } from 'react-router-dom';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { FaRegAddressBook } from 'react-icons/fa';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { AiOutlineHeart, AiOutlineBell } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';

export default function UserSidebar() {
    return (
        <div className="flex flex-col gap-7 px-4 py-2 h-[600px] w-[200px] border justify-between rounded-xl shadow-md bg-sky-700 text-yellow-300">
            <div className="flex flex-col gap-2">
                <Link to={'/users/profile'}>
                    <div className="border-b-2 p-2 hover:bg-yellow-300 hover:text-sky-700 hover:rounded-lg hover:shadow-xl hover:font-bold flex items-center gap-1">
                        <MdOutlineAccountCircle size={20} />
                        Profile
                    </div>
                </Link>
                <Link to={'/users/address'}>
                    <div className="border-b-2 p-2 hover:bg-yellow-300 hover:text-sky-700 hover:rounded-lg hover:shadow-xl hover:font-bold flex items-center gap-1">
                        <FaRegAddressBook size={20} />
                        Address
                    </div>
                </Link>
                <Link to={'/users/transactions'}>
                    <div className="border-b-2 p-2 hover:bg-yellow-300 hover:text-sky-700 hover:rounded-lg hover:shadow-xl hover:font-bold flex items-center gap-1">
                        <FaRegMoneyBillAlt size={20} />
                        Transactions
                    </div>
                </Link>
                <Link to={'/users/wishlists'}>
                    <div className="border-b-2 p-2 hover:bg-yellow-300 hover:text-sky-700 hover:rounded-lg hover:shadow-xl hover:font-bold flex items-center gap-1">
                        <AiOutlineHeart size={20} />
                        Wishlists
                    </div>
                </Link>
                <Link to={'/users/notifications'}>
                    <div className="border-b-2 p-2 hover:bg-yellow-300 hover:text-sky-700 hover:rounded-lg hover:shadow-xl hover:font-bold flex items-center gap-1">
                        <AiOutlineBell />
                        Notifications
                    </div>
                </Link>
            </div>
            <div className="border-b-2 p-2 hover:bg-yellow-300 hover:text-sky-700 hover:rounded-lg hover:shadow-xl hover:font-bold hover:cursor-pointer flex items-center gap-1">
                <BiLogOut size={20} />
                Logout
            </div>
        </div>
    );
}
