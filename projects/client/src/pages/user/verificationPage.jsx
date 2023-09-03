/* eslint-disable react-hooks/exhaustive-deps */
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Navigate, useLocation } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { expiredLink, verification } from '../../redux/features/authSlice';
import { Helmet } from 'react-helmet';

export default function VerificationPage() {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPass, setShowConfirmPass] = useState(true);
    const [input, setInput] = useState({
        password: '',
        confirmPassword: '',
    });
    const token = params.token;
    const userLogin = JSON.parse(localStorage.getItem('user'));

    //call redux
    const isVerif = useSelector((state) => state.auth.isVerif);
    const msgError = useSelector((state) => state.auth.auth);
    const isDenied = useSelector((state) => state.auth.isDenied);
    const onChange = (event) => {
        const { value, name } = event.target;
        setInput({ ...input, [name]: value });
    };

    const mediumPassword = input.password.match('^(?=.*[a-z]).{5,}$');
    const strongPassword = input.password.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$',);

    const defaultValue = () => {
        if (isVerif) {
            setInput({
                password: '',
                confirmPassword: '',
            });
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
    };
    useEffect(() => {
        defaultValue();
        if (!isVerif) {
            dispatch(expiredLink(token))
        }
    }, [isVerif]);

    
    if (userLogin) {
        return <Navigate to="/" />;
    } else if (isDenied) {
        return <Navigate to="/*" />;
    }

    return (
        <>
            <Toaster />
            <Helmet>
                <title>IKEWA | Verification</title>
                <meta name="description" content="verification" />
            </Helmet>
            <div className="flex flex-col md:flex-row my-20 mx-10 md:mx-20">
                <div className="flex-1 flex justify-center">
                    <div>
                        <div className="text-4xl text-center md:text-start font-bold mb-10 w-80">
                            Verification personal account
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="border shadow-md p-2 mt-2 rounded lg:w-[80%] flex flex-col ">
                        <form>
                            <label htmlFor="email" className="flex">
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
                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
                                    className="bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-blue-600 block w-full rounded-md sm:text-sm focus:ring-1 invalid:text-red-500 invalid:border-red-500 invalid:ring-red-500 invalid:focus:border-red-500 invalid:focus:ring-red-500 peer"
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
                            {input.password ? (
                                strongPassword?.length === 1 ? (
                                    <>
                                        <div className="w-full flex mt-2 gap-1">
                                            <div className="border border-[#fd5c65] w-[50px]"></div>
                                            <div className="border border-[#ffad00] w-[50px]"></div>
                                            <div className="border border-[#27df81] w-[50px]"></div>
                                        </div>
                                        <div className="text-[11px] text-[#27df81]">
                                            strong password
                                        </div>
                                    </>
                                ) : mediumPassword ? (
                                    <>
                                        <div className="w-full flex mt-2 gap-1">
                                            <div className="border border-[#fd5c65] w-[50px]"></div>
                                            <div className="border border-[#ffad00] w-[50px]"></div>
                                        </div>
                                        <div className="text-[11px] text-[#ffad00]">
                                            password must contain 1 uppercase letter, 1 number & 8 characters
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="border border-[#fd5c65] mt-2 w-[50px]"></div>
                                        <div className="text-[11px] text-[#fd5c65]">
                                            password too short
                                        </div>
                                    </>
                                )
                            ) : null}

                            <label htmlFor="password" className="flex mt-2">
                                <div className="text-slate-700 mb-2">
                                    Confirmation Password
                                </div>
                                <div className="text-[#fc8181] ml-1">*</div>
                            </label>
                            <div className="flex items-center z-0">
                                <input
                                    value={input.confirmPassword}
                                    onChange={onChange}
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    type={showConfirmPass ? 'password' : 'text'}
                                    placeholder="********"
                                    className="bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-blue-600 block w-full rounded-md sm:text-sm focus:ring-1"
                                />
                                {showConfirmPass ? (
                                    <button
                                        type="button"
                                        className="ml-[-25px] text-slate-600 cursor-pointer z-10"
                                        onClick={() =>
                                            setShowConfirmPass(!showConfirmPass)
                                        }
                                    >
                                        <AiFillEye fontSize="15px" />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="ml-[-25px] text-slate-600 cursor-pointer z-10"
                                        onClick={() =>
                                            setShowConfirmPass(!showConfirmPass)
                                        }
                                    >
                                        <AiFillEyeInvisible fontSize="15px" />
                                    </button>
                                )}
                            </div>
                        </form>
                        {msgError ? (
                            <div className="text-[11px] text-[#fc8181] mt-2">
                                {msgError}
                            </div>
                        ) : (
                            <div className="text-[11px] text-slate-600 mt-2">
                                * Use strong password
                            </div>
                        )}
                        <button
                            onClick={() =>
                                dispatch(
                                    verification(
                                        input.password,
                                        input.confirmPassword,
                                        token,
                                    ),
                                )
                            }
                            type="submit"
                            className="mt-4 bg-[#0051BA] hover:bg-gray-400 rounded-full text-white py-2 mt-2 text-sm p-3 disabled:cursor-not-allowed disabled:bg-[#0051BA]"
                            disabled={
                                !input.password ||
                                !input.confirmPassword ||
                                !strongPassword
                            }
                        >
                            Confirm
                        </button>
                        {/* <Link
                            to="/register"
                            className="text-[#0258a3] text-center my-5 text-[15px] hover:text-black cursor-pointer"
                        >
                            Register a new account
                        </Link> */}
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center items-center">
                <img
                    src="/images/banner-ikewa.png"
                    alt="not-found"
                    className="min-w-[200px]"
                />
            </div>
        </>
    );
}
