/* eslint-disable react-hooks/exhaustive-deps */
import { Toaster, toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reqResetPassword } from '../../redux/features/authSlice';
import { Navigate, useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [email, setEmail] = useState('');

    const userLogin = JSON.parse(localStorage.getItem("user"));


    //call data redux
    const msgError = useSelector((state) => state.auth.auth);
    const isReqReset = useSelector((state) => state.auth.isLogin);


    const onChange = (event) => {
        const { value } = event.target;
        setEmail(value);
    };

    const defaultValue = () => {
        if (isReqReset) {
            setEmail('')
            toast.custom((t) => (
                <div className="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5">
                    <div className="p-3 text-center text-white bg-[#0051BA] rounded-l-lg">
                        Request success! Check your email to reset your password!
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
        defaultValue()
    }, [isReqReset])

    if (userLogin) {
        return <Navigate to="/"/>
    }
    
    return (
        <>
            <Toaster />
            <div className="flex flex-col my-20 mx-10 md:mx-20">
                <div className="flex justify-center">
                    <div>
                        <div className="text-4xl text-center font-bold mb-10 ">
                        Forgot your password?
                        </div>
                        <div className="font-semibold text-center">
                        Enter your verified email. We will send a link to reset your password.
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-col border shadow-md p-2 mt-5 rounded w-full lg:w-[50%]">
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
                                <div className="text-[#fc8181] text-xs invisible peer-invalid:visible">
                                    Please enter a valid email!
                                </div>
                            )}
                        </form>
                        <button
                            onClick={()=> dispatch(reqResetPassword(email))}
                            type="submit"
                            className="bg-[#0051BA] hover:bg-gray-400 rounded-full text-white py-2 mt-2 text-sm p-3 disabled:cursor-not-allowed disabled:bg-[#0051BA]"
                            disabled={
                                !email ||
                                !email.includes('@') ||
                                !email.includes('.co')
                            }
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}