/* eslint-disable react-hooks/exhaustive-deps */
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, loginGoogleAsync } from '../../redux/features/authSlice';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc'
import { Helmet } from 'react-helmet';

export default function LoginPage() {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(true);
    const [input, setInput] = useState({
        email: '',
        password: '',
    });

    const userLogin = JSON.parse(localStorage.getItem('user'));

    //call redux
    const isLogin = useSelector((state) => state.auth.isLogin);

    const onChange = (event) => {
        const { value, name } = event.target;
        setInput({ ...input, [name]: value });
    };

    const defaultValue = () => {
        if (isLogin) {
            setInput({
                email: '',
                password: '',
            });
        }
    };

    useEffect(() => {
        if (isLogin) {
            defaultValue();
        }
    }, [isLogin]);

    if (userLogin) {
        if (!isLogin) {
            return <Navigate to="/" />;
        } else {
            if (window.history.length <= 2) {
                return <Navigate to="/" />;
            } else {
                window.history.back() 
            }
        }
    }

    return (
        <>
            {/* <Toaster /> */}
            <Helmet>
                <title>IKEWA | Login</title>
                <meta name="description" content="login" />
            </Helmet>
            <div className="flex flex-col md:flex-row mt-7 mx-10 md:mx-20">
                <div className="flex-1 flex justify-center">
                    <div>
                        <div className="text-4xl text-center font-bold mb-10 w-72">
                            Login personal account
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="border shadow-md p-2 mt-2 rounded lg:w-[80%] flex flex-col ">
                        <form>
                            <label htmlFor="email" className="flex">
                                <div className="text-slate-700 mb-2">Email</div>
                                <div className="text-[#fc8181] ml-1">*</div>
                            </label>
                            <input
                                value={input.email}
                                onChange={onChange}
                                name="email"
                                id="email"
                                type="email"
                                placeholder="ikea@example.com"
                                className="bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-blue-600 block w-full rounded-md sm:text-sm focus:ring-1"
                            />
                            <label htmlFor="password" className="flex mt-2">
                                <div className="text-slate-700 mb-2">
                                    Password
                                </div>
                                <div className="text-[#fc8181] ml-1">*</div>
                            </label>
                            <div className="flex items-center z-0">
                                <input
                                    value={input.password}
                                    onChange={onChange}
                                    name="password"
                                    id="password"
                                    type={showPassword ? 'password' : 'text'}
                                    placeholder="********"
                                    className="bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-blue-600 block w-full rounded-md sm:text-sm focus:ring-1"
                                />
                                {showPassword ? (
                                    <button
                                        type="button"
                                        className="ml-[-25px] text-slate-600 cursor-pointer z-10"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        <AiFillEye fontSize="15px" />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="ml-[-25px] text-slate-600 cursor-pointer z-10"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        <AiFillEyeInvisible fontSize="15px" />
                                    </button>
                                )}
                            </div>
                        </form>
                        <Link
                            to="/forgot-password"
                            className="text-[11px] underline hover:no-underline text-slate-600 cursor-pointer mt-1 w-fit"
                        >
                            forgot your password?
                        </Link>
                        <button
                            onClick={() =>
                                dispatch(login(input.email, input.password))
                            }
                            type="submit"
                            className="mt-4 bg-[#0051BA] hover:bg-gray-400 rounded-full text-white py-2 mt-2 text-sm p-3 disabled:cursor-not-allowed disabled:bg-[#0051BA]"
                            disabled={
                                !input.email ||
                                !input.password ||
                                !input.email.includes('@') ||
                                !input.email.includes('.co')
                            }
                        >
                            Login
                        </button>
                        <div className='flex flex-col items-center'>
                            <div className='text-xs my-2 text-slate-500'>OR</div>
                            <div onClick={()=>dispatch(loginGoogleAsync())} className='flex flex-row items-center border rounded-full p-2 cursor-pointer hover:bg-[#d7d9db]'>
                                <FcGoogle size={24} className=''/>
                                {/* <div className='text-xs ml-2'>Google</div> */}
                            </div>
                        </div>
                        <div className='flex justify-center'>
                        <Link
                            to="/register"
                            className="text-[#0258a3] text-center my-3 text-[13px] hover:text-black cursor-pointer"
                        >
                            Don't have an account? Register here
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center items-center fixed bottom-0">
                <img
                    src="/images/banner-ikewa-login.png"
                    alt="banner"
                    className="max-h-[250px] object-fill w-full"
                />
            </div>
        </>
    );
}
