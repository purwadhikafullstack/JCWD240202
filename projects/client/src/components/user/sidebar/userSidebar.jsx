import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { FaRegAddressBook } from 'react-icons/fa';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { AiOutlineHeart, AiOutlineBell } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { Toaster, toast } from 'react-hot-toast';
import { useState } from 'react';
import ModalLogout from './modalLogout';

export default function UserSidebar() {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);

    const logout = () => {
        try {
            localStorage.removeItem('user');
            localStorage.removeItem('_grecaptcha');
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
            setOpenModal(false);
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Toaster />
            <div className="flex max-lg:flex-row lg:flex-col lg:gap-7 max-lg:divide-x px-4 py-2 lg:h-[600px] lg:w-[200px] border justify-between rounded-xl shadow-lg bg-sky-700 text-yellow-300">
                <div className="flex max-lg:flex-row max-lg:items-center max-lg:justify-evenly max-lg:divide-x max-lg:w-full lg:flex-col lg:gap-2">
                    <div
                        onClick={() => navigate('/users/profile')}
                        className="border-b-2 p-2 hover:bg-yellow-300 hover:text-sky-700 hover:rounded-lg hover:shadow-xl hover:font-bold hover:cursor-pointer flex lg:flex-row max-lg:flex-col max-lg:justify-center items-center gap-1"
                    >
                        <div>
                            <MdOutlineAccountCircle size={20} />
                        </div>
                        <div className="max-lg:text-xs">Profile</div>
                    </div>
                    <div
                        onClick={() => navigate('/users/address')}
                        className="border-b-2 p-2 hover:bg-yellow-300 hover:text-sky-700 hover:rounded-lg hover:shadow-xl hover:font-bold hover:cursor-pointer flex lg:flex-row max-lg:flex-col max-lg:justify-center items-center gap-1"
                    >
                        <div>
                            <FaRegAddressBook size={20} />
                        </div>
                        <div className="max-lg:text-xs">Address</div>
                    </div>
                    <div
                        onClick={() => navigate('/users/transactions')}
                        className="border-b-2 p-2 hover:bg-yellow-300 hover:text-sky-700 hover:rounded-lg hover:shadow-xl hover:font-bold hover:cursor-pointer flex lg:flex-row max-lg:flex-col max-lg:justify-center items-center gap-1"
                    >
                        <div>
                            <FaRegMoneyBillAlt size={20} />
                        </div>
                        <div className="max-lg:text-xs">Transactions</div>
                    </div>
                    <div
                        onClick={() => navigate('/users/wishlists')}
                        className="border-b-2 p-2 hover:bg-yellow-300 hover:text-sky-700 hover:rounded-lg hover:shadow-xl hover:font-bold hover:cursor-pointer flex lg:flex-row max-lg:flex-col max-lg:justify-center items-center gap-1"
                    >
                        <div>
                            <AiOutlineHeart size={20} />
                        </div>
                        <div className="max-lg:text-xs">Wishlists</div>
                    </div>
                    <div
                        onClick={() => navigate('/users/notifications')}
                        className="border-b-2 p-2 hover:bg-yellow-300 hover:text-sky-700 hover:rounded-lg hover:shadow-xl hover:font-bold hover:cursor-pointer flex lg:flex-row max-lg:flex-col max-lg:justify-center items-center gap-1"
                    >
                        <div className="flex justify-center">
                            <AiOutlineBell size={20} />
                        </div>
                        <div className="max-lg:text-xs">Notifications</div>
                    </div>
                </div>
                <div
                    onClick={() => setOpenModal(true)}
                    className="border-b-2 p-2 hover:bg-yellow-300 hover:text-sky-700 hover:rounded-lg hover:shadow-xl hover:font-bold hover:cursor-pointer flex lg:flex-row max-lg:flex-col max-lg:justify-center items-center gap-1"
                >
                    <div>
                        <BiLogOut size={20} />
                    </div>
                    <div className="max-lg:text-xs">Logout</div>
                </div>
            </div>
            <ModalLogout data={{ setOpenModal, openModal, logout }} />
        </>
    );
}
