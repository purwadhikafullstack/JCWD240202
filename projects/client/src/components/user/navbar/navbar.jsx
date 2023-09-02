/* eslint-disable react-hooks/exhaustive-deps */
import { MdOutlineAccountCircle } from 'react-icons/md';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUserCartAsync } from '../../../redux/features/cartSlice';
import { getUserWishlists } from '../../../redux/features/wishlistSlice';
import Notification from './notification';
import { getUserNotificationAsync } from '../../../redux/features/notificationSlice';
import WishlistIcon from './wishlistIcon';

export default function Navbar(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const userLogin = JSON.parse(localStorage.getItem('user'));
    const userCartCount = useSelector((state) => state.cart.cart);
    const wishlistCount = useSelector((state) => state.wishlist.wishlists);

    const [showBurger, setShowBurger] = useState(false);
    const notificationData = useSelector(
        (state) => state.notification.notifications,
    );
    const [notification, setNotification] = useState(false);

    useEffect(() => {
        if (userLogin) {
            dispatch(getUserCartAsync());
            dispatch(getUserWishlists());
            dispatch(getUserNotificationAsync({ page: 1 }));
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
                    className={`md:hidden ${
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
                    className={`w-16 sm:w-24 max-sm:hidden ${
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
                    ></button>
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
                    <div>About</div>
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
                                className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-44 divide-y"
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
                        <div className="flex gap-4 items-center">
                            <Notification
                                state={{ notification, setNotification }}
                                data={{ notification: notificationData?.data }}
                            />
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
                                <WishlistIcon data={{ wishlistCount }} />
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
                            ></button>
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
                                <div className="flex items-center w-12 h-12 relative">
                                    <AiOutlineShoppingCart size={25} />
                                    {userCartCount?.data?.count > 0 ? (
                                        <div className="border rounded-full flex items-center justify-center bg-red-700 text-white absolute top-0 right-1 w-6 h-6">
                                            {userCartCount?.data?.count}
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </button>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
            <div
                className={`absolute top-100 bg-white left-0 w-full md:w-auto pt-6 pl-12 duration-400 ease-in text-3xl flex flex-col gap-4 md:hidden ${
                    showBurger ? 'block h-screen w-screen z-[998]' : 'hidden'
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
                <div>About</div>
            </div>
        </div>
    );
}
