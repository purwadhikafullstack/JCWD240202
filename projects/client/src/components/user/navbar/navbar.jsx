/* eslint-disable react-hooks/exhaustive-deps */
import { MdOutlineAccountCircle } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUserCartAsync } from '../../../redux/features/cartSlice';
import { getUserWishlists } from '../../../redux/features/wishlistSlice';

export default function Navbar(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const userLogin = JSON.parse(localStorage.getItem('user'));
    const userCartCount = useSelector((state) => state.cart.cart);
    const wishlistCount = useSelector((state) => state.wishlist.wishlists);

    const [showBurger, setShowBurger] = useState(false);

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
            }, 1000);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (userLogin) {
            dispatch(getUserCartAsync());
            dispatch(getUserWishlists());
        }
        if (showBurger === true) {
            document.body.classList.add('overflow-hidden');
        } else if (showBurger === false) {
            document.body.classList.remove('overflow-hidden');
        }
    }, [userLogin, showBurger]);

    const { pathname } = useLocation();

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
    ];

    if (
        (path.includes(pathname) &&
            (props.dataLogin?.role_id === 2 ||
                props.dataLogin?.role_id === 3 ||
                props.dataLogin === null) &&
            userLogin) ||
        pathname === '/admins/login'
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
        <div className="">
            <Toaster />
            <div className="flex justify-between items-center border-b py-6 px-12 bg-white h-[100px]">
                {/* left side => logo */}
                <button
                    className={`sm:hidden ${
                        props.dataLogin?.role_id === 2 ||
                        props.dataLogin?.role_id === 3
                            ? 'cursor-not-allowed'
                            : ''
                    }`}
                    onClick={() => setShowBurger(!showBurger)}
                    disabled={
                        props.dataLogin?.role_id === 2 ||
                        props.dataLogin?.role_id === 3
                    }
                >
                    {showBurger ? (
                        <GrClose size={25} />
                    ) : (
                        <GiHamburgerMenu size={25} />
                    )}
                </button>
                <button
                    className={`w-16 sm:w-24 ${
                        props.dataLogin?.role_id === 2 ||
                        props.dataLogin?.role_id === 3
                            ? 'cursor-not-allowed'
                            : ''
                    }`}
                    onClick={() => navigate('/')}
                    disabled={
                        props.dataLogin?.role_id === 2 ||
                        props.dataLogin?.role_id === 3
                    }
                >
                    <img src="/logo2.png" alt="company_logo" />
                </button>
                {/* middle => pages */}
                <div className="hidden md:block md:flex gap-9 items-center text-xl">
                    <button
                        className={
                            props.dataLogin?.role_id === 2 ||
                            props.dataLogin?.role_id === 3
                                ? 'cursor-not-allowed'
                                : ''
                        }
                        onClick={() => navigate('/')}
                        disabled={
                            props.dataLogin?.role_id === 2 ||
                            props.dataLogin?.role_id === 3
                        }
                    >
                        <div>Home</div>
                    </button>
                    <div>Offers</div>
                    <button
                        className={
                            props.dataLogin?.role_id === 2 ||
                            props.dataLogin?.role_id === 3
                                ? 'cursor-not-allowed'
                                : ''
                        }
                        onClick={() => navigate('/products')}
                        disabled={
                            props.dataLogin?.role_id === 2 ||
                            props.dataLogin?.role_id === 3
                        }
                    >
                        <div>Products</div>
                    </button>
                    <div>Categories</div>
                    <button
                        className={
                            props.dataLogin?.role_id === 2 ||
                            props.dataLogin?.role_id === 3
                                ? 'cursor-not-allowed'
                                : ''
                        }
                        onClick={() => navigate('/about')}
                        disabled={
                            props.dataLogin?.role_id === 2 ||
                            props.dataLogin?.role_id === 3
                        }
                    >
                        <div>About</div>
                    </button>
                </div>
                {/* right side => account, cart, wishlist */}
                <div className="flex items-center z-[999]">
                    {userLogin && props.dataLogin?.role_id === 1 ? (
                        <div className="dropdown mr-2">
                            <label
                                tabIndex={0}
                                className="btn bg-white border-none"
                            >
                                <Avatar
                                    img={
                                        props.dataLogin?.profile_picture &&
                                        props.dataLogin?.profile_picture.startsWith(
                                            'PIMG',
                                        )
                                            ? process.env
                                                  .REACT_APP_API_IMAGE_URL +
                                              props.dataLogin?.profile_picture
                                            : props.dataLogin?.profile_picture
                                            ? props.dataLogin?.profile_picture
                                            : 'https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png'
                                    }
                                    rounded
                                    className="object-fill"
                                />
                            </label>
                            <ul
                                tabIndex={0}
                                className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-44"
                            >
                                <li>
                                    <Link
                                        to="/users/profile"
                                        onClick={() => setShowBurger(false)}
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/users/transactions"
                                        onClick={() => setShowBurger(false)}
                                    >
                                        Transactions
                                    </Link>
                                </li>
                                <li className="border-t">
                                    <button
                                        onClick={() => {
                                            setOpenModal(true);
                                            setShowBurger(false);
                                        }}
                                    >
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : props.dataLogin?.role_id === 2 ||
                      props.dataLogin?.role_id === 3 ? (
                        <Link to={'/admins/dashboard'}>
                            <div className="btn bg-white border-none mr-2">
                                <MdOutlineAccountCircle size={25} />
                            </div>
                        </Link>
                    ) : (
                        <Link to={'/login'}>
                            <div className="btn bg-white border-none mr-2">
                                <MdOutlineAccountCircle size={25} />
                            </div>
                        </Link>
                    )}

                    {userLogin ? (
                        <>
                            <button
                                onClick={() => navigate('/users/wishlists')}
                                className={
                                    props.dataLogin?.role_id === 2 ||
                                    props.dataLogin?.role_id === 3
                                        ? 'cursor-not-allowed'
                                        : ''
                                }
                                disabled={
                                    props.dataLogin?.role_id === 2 ||
                                    props.dataLogin?.role_id === 3
                                }
                            >
                                <div className="flex items-center mr-6">
                                    <AiOutlineHeart size={25} />

                                    {wishlistCount?.data?.wishlists.length >
                                    0 ? (
                                        <div className="border rounded-full flex items-center justify-center bg-sky-700 text-yellow-200 w-7 h-7">
                                            {wishlistCount?.totalProducts}
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </button>
                            <button
                                onClick={() => navigate('/cart')}
                                className={
                                    props.dataLogin?.role_id === 2 ||
                                    props.dataLogin?.role_id === 3
                                        ? 'cursor-not-allowed'
                                        : ''
                                }
                                disabled={
                                    props.dataLogin?.role_id === 2 ||
                                    props.dataLogin?.role_id === 3
                                }
                            >
                                <div className="flex items-center">
                                    <AiOutlineShoppingCart size={25} />
                                    {userCartCount?.data?.count > 0 ? (
                                        <div className="border rounded-full flex items-center justify-center bg-sky-700 text-yellow-200 w-7 h-7">
                                            {userCartCount?.data?.count}
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </button>
                        </>
                    ) : (
                        ''
                    )}
                </div>
                <Modal
                    dismissible
                    className="z-[999]"
                    show={openModal}
                    onClose={() => setOpenModal(false)}
                >
                    <Modal.Body>
                        <div className="text-lg flex justify-center items-center">
                            Are you sure want to log out?
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="flex justify-center gap-9 w-full">
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
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
            <div
                className={`absolute top-100 bg-white left-0 w-full md:w-auto pt-6 pl-12 duration-400 ease-in text-3xl flex flex-col gap-4 sm:hidden ${
                    showBurger ? 'block h-screen z-[998]' : 'hidden'
                }`}
            >
                <button className="text-left">
                    <div
                        onClick={() => {
                            setShowBurger(!showBurger);
                            navigate('/');
                        }}
                    >
                        Home
                    </div>
                </button>
                <div>Offers</div>
                <button className="text-left">
                    <div
                        onClick={() => {
                            setShowBurger(!showBurger);
                            navigate('/products');
                        }}
                    >
                        Products
                    </div>
                </button>
                <div>Categories</div>
                <button className="text-left">
                    <div
                        onClick={() => {
                            setShowBurger(!showBurger);
                            navigate('/about');
                        }}
                    >
                        About
                    </div>
                </button>
            </div>
        </div>
    );
}
