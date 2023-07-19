/* eslint-disable react-hooks/exhaustive-deps */
import { Toaster, toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/features/authSlice';
import { Navigate, useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isAgree, setIsAgree] = useState(false);

    const userLogin = JSON.parse(localStorage.getItem('user'));

    //call data redux
    const msgError = useSelector((state) => state.auth.auth);
    const isRegister = useSelector((state) => state.auth.isLogin);

    const onChange = (event) => {
        const { value } = event.target;
        setEmail(value);
    };

    const defaultValue = () => {
        if (isRegister) {
            setEmail('');
            setIsAgree(false);
            toast.custom((t) => (
                <div className="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5">
                    <div className="p-3 text-center text-white bg-[#0051BA] rounded-l-lg">
                        Register success! Check your email to verification!
                    </div>
                    <div className="flex border-l border-gray-200">
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                        >
                            Close
                        </button>
                    </div>
                </div>
            ));
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
    };

    useEffect(() => {
        defaultValue('');
    }, [isRegister]);

    if (userLogin) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <Toaster />
            <div className="flex flex-col md:flex-row my-20 mx-10 md:mx-20">
                <div className="flex-1 flex justify-center text-center md:text-start">
                    <div>
                        <div className="text-4xl font-bold mb-10 w-72">
                            Create personal account
                        </div>
                        <div className="font-semibold">
                            Join to IKEA Family Account
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex justify-center md:justify-start">
                    <div className="border shadow-md p-2 mt-10 rounded w-full lg:w-[80%] md:mt-2 flex flex-col ">
                        <form>
                            <label htmlFor="email" className="flex">
                                <div className="text-slate-700 mb-2">Email</div>
                                <div className="text-[#fc8181] ml-1">*</div>
                            </label>
                            <input
                                value={email}
                                onChange={onChange}
                                name="email"
                                id="email"
                                type="email"
                                placeholder="ikea@example.com"
                                className="bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-blue-600 block w-full rounded-md sm:text-sm focus:ring-1 invalid:text-red-500 invalid:border-red-500 invalid:ring-red-500 invalid:focus:border-red-500 invalid:focus:ring-red-500 peer"
                            />
                            {msgError ? (
                                <div className="text-[#fc8181] mt-1 text-xs">
                                    {msgError}
                                </div>
                            ) : (
                                <div className="text-[#fc8181] mt-1 text-xs invisible peer-invalid:visible">
                                    Please enter a valid email!
                                </div>
                            )}
                        </form>
                        <div className="text-xs m-1 mx-2 font-light">
                            We're committed to protecting and respecting your
                            privacy. Your personal data will be used to support
                            your shopping experience and for other purposes
                            described in our privacy policy.
                        </div>
                        <div className="my-2 ml-2">
                            <span className="text-xs font-Public w-auto">
                                <input
                                    className="focus:ring-0 mb-1 mr-2"
                                    required="true"
                                    type="checkbox"
                                    name="isAgree"
                                    id="isAgree"
                                    value="2"
                                    onClick={(e) =>
                                        setIsAgree(e.target.checked)
                                    }
                                    checked={isAgree? true : false}
                                />
                                <span>I have read and agree the</span>
                                <span className="text-[#f8c729] ml-1 font-bold">
                                    Terms & Conditions
                                </span>
                                <span className=""> and </span>
                                <span className="text-[#f8c729] font-bold">
                                    Privacy Policy
                                    <span className="text-[#fc8181] text-[14px] ml-1">
                                        *
                                    </span>
                                </span>
                            </span>
                        </div>
                        <button
                            onClick={() => dispatch(register(email))}
                            type="submit"
                            className="bg-[#0051BA] hover:bg-gray-400 rounded-full text-white py-2 mt-2 text-sm p-3 disabled:cursor-not-allowed disabled:bg-[#0051BA]"
                            disabled={
                                !email ||
                                !email.includes('@') ||
                                !email.includes('.co') ||
                                !isAgree
                            }
                        >
                            Create account
                        </button>
                        <Link
                            to="/login"
                            className="text-[#0258a3] text-center my-5 text-[13px] hover:text-black cursor-pointer"
                        >
                            Have an account? login here
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
