/* eslint-disable react-hooks/exhaustive-deps */
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/features/authSlice';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export default function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(true);
    const [input, setInput] = useState({
        email: '',
        password: '',
    });

    const userLogin = JSON.parse(localStorage.getItem("user"));

    //call redux
    const isLogin = useSelector((state) => state.auth.isLogin);

    const onChange = (event) => {
        const { value, name } = event.target;
        setInput({ ...input, [name]: value });
    };

    const test = () => {
        if (isLogin) {
            setInput({
                email: '',
                password: '',
            });
        }
    };
    if (isLogin) {
        setTimeout(() => {
            navigate('/');
        }, 2000);
    }
    useEffect(() => {
        test();
    }, [isLogin]);

    if (userLogin) {
        return <Navigate to="/"/>
      } 

    return (
        <>
            <Toaster />
            <div className="flex flex-col md:flex-row m-20">
                <div className="flex-1 flex justify-center">
                    <div>
                        <div className="text-4xl font-bold mb-10 w-72">
                            Login personal account
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="border shadow-md p-2 mt-2 rounded w-[80%] flex flex-col ">
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
                        <div className="text-[11px] underline hover:no-underline text-slate-600 cursor-pointer mt-1">
                            forgot your password?
                        </div>
                        <button
                            onClick={() =>
                                dispatch(login(input.email, input.password))
                            }
                            type="submit"
                            className="mt-4 bg-[#0051BA] hover:bg-gray-400 rounded-full text-white py-2 mt-2 text-sm p-3"
                        >
                            Login
                        </button>
                        <Link
                            to="/register"
                            className="text-[#0258a3] text-center my-5 text-[15px] hover:text-black cursor-pointer"
                        >
                            Register a new account
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}