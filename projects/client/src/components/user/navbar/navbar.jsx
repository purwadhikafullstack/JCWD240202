/* eslint-disable react-hooks/exhaustive-deps */
import { MdOutlineAccountCircle } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

export default function Navbar() {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const userLogin = JSON.parse(localStorage.getItem('user'));

    const logout = () => {
        try {
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
            setOpenModal(false);
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {

    }, [userLogin]);

    return (
        <>
            <Toaster />
            <div className="flex justify-between items-center border-b py-6 px-12 bg-white">
                {/* left side => logo */}
                <div className="w-24">
                    <img
                        src="https://preview.redd.it/uhiuxnz5ber21.jpg?auto=webp&s=76182965b43ea456c3525a050ba0f16f12b44c98"
                        alt="company_logo"
                    />
                </div>
                {/* middle => pages */}
                <div className="hidden md:block md:flex gap-9 items-center text-xl">
                    <Link to={'/'}>
                        <div>Home</div>
                    </Link>
                    <div>Offers</div>
                    <Link to={'/products'}>
                        <div>Products</div>
                    </Link>
                    <div>Categories</div>
                    <div>About</div>
                </div>
                {/* right sided => account, cart, wishlist */}
                <div className="flex gap-9 items-center z-10">
                    {userLogin ? (
                        <div className="dropdown">
                            <label
                                tabIndex={0}
                                className="btn bg-white border-none"
                            >
                                <MdOutlineAccountCircle size={25} />
                            </label>
                            <ul
                                tabIndex={0}
                                className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <Link to="/users/profile">Profile</Link>
                                </li>
                                <li>
                                    <button onClick={() => setOpenModal(true)}>
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link to={'/login'}>
                            <div className="btn bg-white border-none">
                                <MdOutlineAccountCircle size={25} />
                            </div>
                        </Link>
                    )}

                    <div>
                        <AiOutlineHeart size={25} />
                    </div>
                    <div>
                        <AiOutlineShoppingCart size={25} />
                    </div>
                </div>
                <Modal
                    dismissible
                    className=""
                    show={openModal}
                    onClose={() => setOpenModal(false)}
                >
                    <Modal.Body>
                        <div className="text-xl">
                            Are you sure want to log out?
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            className="bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3"
                            onClick={logout}
                        >
                            Confirm
                        </button>
                        <button
                            className="bg-red-600 hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3"
                            onClick={() => setOpenModal(false)}
                        >
                            Cancel
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}
