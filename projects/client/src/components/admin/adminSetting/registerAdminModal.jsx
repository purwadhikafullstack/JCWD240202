import { useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible, AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { adminRegister } from '../../../redux/features/adminAuthSlice';
import { Toaster } from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRef } from 'react';

export default function RegisterAdmin({ showModal, params }) {
    const setDisabledButton = useSelector(
        (state) => state.adminAuth.disabledButton,
    );
    const setModal = useSelector((state) => state.adminAuth.modal);
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const dispatch = useDispatch();

    // input
    const [inputFirstName, setInputFirstName] = useState('');
    const [inputLastName, setInputLastName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPhoneNumber, setInputPhoneNumber] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputConfirmPassword, setInputConfirmPassword] = useState('');

    const reRef = useRef(null)
    const [isVerifiedRecaptcha, setIsVerifiedRecaptcha] = useState(false)
    const [tokenRecaptcha, setTokenRecaptcha] = useState('')
    const onHandleRecaptcha = (value) => {
        setIsVerifiedRecaptcha(true)
        setTokenRecaptcha(value)
    }

    const resetRecaptcha = () => {
        reRef.current.reset()
        setIsVerifiedRecaptcha(false)
        setTokenRecaptcha('')
    }

    useEffect(() => {
        if (setModal === true) {
            setShowPassword(true);
            setShowConfirmPassword(true);
            showModal(false);
        }
    }, [setModal]);

    return (
        <>
            <Toaster />
            <div className="bg-black bg-opacity-50 fixed inset-0 z-50">
                {/* <!-- Main modal --> */}
                <div className="fixed flex items-center justify-center z-999 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-full max-w-2xl max-h-full">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Register Warehouse Admin
                                </h3>
                                <button
                                    onClick={() => showModal(false)}
                                    className="text-gray-500"
                                >
                                    <AiOutlineClose size={16} />
                                </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <div className="p-6 space-y-6">
                                <form>
                                    <div className="block mb-3">
                                        <span className="block text-sm font-medium text-slate-700 mb-1">
                                            First Name{' '}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </span>
                                        <input
                                            type="text"
                                            className="border border-gray-400 w-[300px] rounded-md px-2 h-10 w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                            placeholder="First Name"
                                            value={inputFirstName}
                                            onChange={(e) =>
                                                setInputFirstName(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="block mb-3">
                                        <span className="block text-sm font-medium text-slate-700 mb-1">
                                            Last Name{' '}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </span>
                                        <input
                                            type="text"
                                            className="border border-gray-400 w-[300px] rounded-md px-2 h-10 w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                            placeholder="Last Name"
                                            value={inputLastName}
                                            onChange={(e) =>
                                                setInputLastName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="block mb-3">
                                        <span className="block text-sm font-medium text-slate-700 mb-1">
                                            Email{' '}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </span>
                                        <input
                                            type="email"
                                            className="border border-gray-400 w-[300px] rounded-md px-2 h-10 w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                            placeholder="Email"
                                            value={inputEmail}
                                            onChange={(e) =>
                                                setInputEmail(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="block mb-3">
                                        <span className="block text-sm font-medium text-slate-700 mb-1">
                                            Phone Number{' '}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </span>
                                        <input
                                            type="tel"
                                            maxLength="12"
                                            className="border border-gray-400 w-[300px] rounded-md px-2 h-10 w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                            placeholder="Phone Number"
                                            value={inputPhoneNumber}
                                            onChange={(e) =>
                                                setInputPhoneNumber(
                                                    e.target.value.replace(
                                                        /[^0-9]/g,
                                                        '',
                                                    ),
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="block mb-3">
                                        <span className="block text-sm font-medium text-slate-700 mb-1">
                                            Password{' '}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </span>
                                        <div className="flex items-center relative">
                                            <input
                                                type={
                                                    showPassword
                                                        ? 'password'
                                                        : 'text'
                                                }
                                                className="border border-gray-400 w-[300px] rounded-md px-2 h-10 w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                                placeholder="Password"
                                                value={inputPassword}
                                                onChange={(e) =>
                                                    setInputPassword(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            {showPassword ? (
                                                <AiFillEye
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword,
                                                        )
                                                    }
                                                    className="text-2xl absolute right-2 cursor-pointer bg-white pl-2"
                                                />
                                            ) : (
                                                <AiFillEyeInvisible
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword,
                                                        )
                                                    }
                                                    className="text-2xl absolute right-2 cursor-pointer bg-white pl-2"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="block mb-2">
                                        <span className="block text-sm font-medium text-slate-700 mb-1">
                                            Confirm Password{' '}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </span>
                                        <div className="flex items-center relative">
                                            <input
                                                type={
                                                    showConfirmPassword
                                                        ? 'password'
                                                        : 'text'
                                                }
                                                className="border border-gray-400 w-[300px] rounded-md px-2 h-10 w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                                placeholder="Confirm Password"
                                                value={inputConfirmPassword}
                                                onChange={(e) =>
                                                    setInputConfirmPassword(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            {showConfirmPassword ? (
                                                <AiFillEye
                                                    onClick={() =>
                                                        setShowConfirmPassword(
                                                            !showConfirmPassword,
                                                        )
                                                    }
                                                    className="text-2xl absolute right-2 cursor-pointer bg-white pl-2"
                                                />
                                            ) : (
                                                <AiFillEyeInvisible
                                                    onClick={() =>
                                                        setShowConfirmPassword(
                                                            !showConfirmPassword,
                                                        )
                                                    }
                                                    className="text-2xl absolute right-2 cursor-pointer bg-white pl-2"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </form>
                                <div className={`${!inputFirstName || !inputLastName || !inputEmail || !inputPhoneNumber || !inputPassword || !inputConfirmPassword || setDisabledButton ? "hidden" : ""}`}>
                                    <ReCAPTCHA
                                        sitekey={
                                            process.env.REACT_APP_API_RECAPTCHA_SITE_KEY
                                        }
                                        onChange={onHandleRecaptcha}
                                        ref={reRef}
                                    />
                                </div>
                            </div>
                            {/* <!-- Modal footer --> */}
                            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button
                                    className="bg-[#0051BA] enabled:hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3 disabled:cursor-not-allowed"
                                    disabled={
                                        !inputFirstName ||
                                        !inputLastName ||
                                        !inputEmail ||
                                        !inputPhoneNumber ||
                                        !inputPassword ||
                                        !inputConfirmPassword ||
                                        setDisabledButton ||
                                        !isVerifiedRecaptcha
                                    }
                                    onClick={() => {
                                        dispatch(
                                            adminRegister(
                                                inputFirstName,
                                                inputLastName,
                                                inputEmail,
                                                inputPhoneNumber,
                                                inputPassword,
                                                inputConfirmPassword,
                                                params,
                                                tokenRecaptcha
                                            ),
                                        );
                                        resetRecaptcha()
                                    }}
                                >
                                    Confirm
                                </button>
                                <button
                                    className="bg-red-600 hover:bg-gray-400 rounded-lg text-white text-sm text-white py-2 text-sm p-3"
                                    onClick={() => {
                                        showModal(false);
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
