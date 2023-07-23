import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../../redux/features/adminAuthSlice';
import { useNavigate, Navigate } from 'react-router-dom';

export default function AdminLoginPage() {
    const [showPassword, setShowPassword] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [input, setInput] = useState({
        email: '',
        password: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = JSON.parse(localStorage.getItem('user'));
    const loginAdmin = useSelector((state) => state.adminAuth.isLoginAdmin);
    console.log('loginadmin', loginAdmin);

    const onChange = (event) => {
        const { value, name } = event.target;
        setInput({ ...input, [name]: value });
    };

    useEffect(() => {
        if (loginAdmin === true) {
            setInput({
                email: '',
                password: '',
            });
            setDisabled(false);
            setShowPassword(true);
            navigate('/admins/dashboard');
        }
    }, [loginAdmin]);

    if (userLogin) {
        return <Navigate to="/admins/dashboard" />;
    }
    return (
        <>
            <div className="flex flex-col md:flex-row my-20 mx-10 md:mx-20">
                {/* Login Admin Account */}
                <div className="flex-1 flex justify-center">
                    <div>
                        <div className="text-4xl text-center md:text-left font-bold mb-10 w-72">
                            Login Admin Account
                        </div>
                    </div>
                </div>
                {/* Form Login */}
                <div className="flex-1">
                    <div className="border shadow-md p-4 rounded-lg lg:w-[80%] flex flex-col">
                        <div>
                            <label className="flex">
                                <div className="text-slate-700 mb-2">Email</div>
                                <div className="text-[#fc8181] ml-1">*</div>
                            </label>
                            <input
                                value={input.email}
                                onChange={onChange}
                                name="email"
                                id="email"
                                type="email"
                                placeholder="email@example.com"
                                className='"bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-blue-600 block w-full rounded-md sm:text-sm focus:ring-1"'
                            />
                            <label className="flex mt-2">
                                <div className="text-slate-700 mb-2">
                                    Password
                                </div>
                                <div className="text-[#fc8181] ml-1">*</div>
                            </label>
                            <div className="flex items-center z-0 relative">
                                <input
                                    value={input.password}
                                    onChange={onChange}
                                    name="password"
                                    id="password"
                                    type={showPassword ? 'password' : 'text'}
                                    placeholder="**********************"
                                    className="bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-blue-600 block w-full rounded-md sm:text-sm focus:ring-1"
                                />
                                {showPassword ? (
                                    <button
                                        type="button"
                                        className="absolute right-2 text-slate-600 cursor-pointer z-10 bg-white pl-2 h-[35px]"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        <AiFillEye fontSize="15px" />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="absolute right-2 text-slate-600 cursor-pointer z-10 bg-white pl-2 h-[35px]"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        <AiFillEyeInvisible fontSize="15px" />
                                    </button>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="mt-4 bg-[#0051BA] hover:bg-gray-400 rounded-full text-white py-2 mt-2 text-sm p-3 disabled:cursor-not-allowed disabled:bg-[#0051BA] w-full"
                                disabled={
                                    !input.email ||
                                    !input.password ||
                                    !input.email.includes('@') ||
                                    !input.email.includes('.co') ||
                                    disabled
                                }
                                onClick={() => {
                                    setDisabled(true);
                                    setTimeout(() => {
                                        dispatch(
                                            adminLogin(
                                                input.email,
                                                input.password,
                                            ),
                                        );
                                        setDisabled(false);
                                    }, 800);
                                }}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
