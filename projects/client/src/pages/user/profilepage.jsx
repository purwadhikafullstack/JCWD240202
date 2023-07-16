/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileTabs from '../../components/user/tabs';
import { getDataLogin } from '../../redux/features/userSlice';
import { useDispatch } from 'react-redux';

export default function ProfilePage() {
    const [openModal, setOpenModal] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [input, setInput] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        birth_date: '',
    });
    const [updateProfilePic, setUpdateProfilePic] = useState('');

    const dispatch = useDispatch();

    const dataLogin = useSelector((state) => state.user.dataLogin);
    console.log('data user login', dataLogin);
    console.log('input', input);
    console.log(dataLogin?.profile_picture);
    console.log(process.env.REACT_APP_API_BASE_URL);
    console.log(
        process.env.REACT_APP_API_BASE_URL + '/' + dataLogin?.profile_picture,
    );

    useEffect(() => {
        dispatch(getDataLogin());
        setInput({
            first_name: dataLogin?.first_name,
            last_name: dataLogin?.last_name,
            email: dataLogin?.email,
            phone_number: dataLogin?.phone_number,
            birth_date: dataLogin?.birth_date,
        });
    }, [
        dataLogin?.first_name,
        dataLogin?.last_name,
        dataLogin?.email,
        dataLogin?.phone_number,
        dataLogin?.birth_date,
    ]);

    const onChange = (e) => {
        const { value, name } = e.target;
        setInput({ ...input, [name]: value });
    };

    return (
        <>
            <div className="mt-[5px] p-[20px]">
                <div className="w-full flex justify-center">
                    <div className="w-full md:w-[80%] flex justify-center">
                        <div className="py-[10px] px-[30px] border-2 border-gray-200 rounded-lg pb-[30px] shadow w-full">
                            <ProfileTabs />
                            <div className="md:flex md:justify-center items-center mt-6 md:ml-6">
                                <div className="w-full md:w-[400px]">
                                    <div className="p-[10px] border-2 border-gray-200 rounded-lg">
                                        <div className="flex justify-center">
                                            {dataLogin?.profile_picture ? (
                                                <img
                                                    src={
                                                        process.env
                                                            .REACT_APP_API_BASE_URL +
                                                        '/' +
                                                        dataLogin?.profile_picture
                                                    }
                                                    alt="profile_picture"
                                                    width={'250px'}
                                                />
                                            ) : (
                                                <img
                                                    src="https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png"
                                                    alt="profile_picture"
                                                    width={'250px'}
                                                />
                                            )}
                                        </div>
                                        <div className="mt-[10px] flex justify-center">
                                            <label class="bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white w-full py-2 mt-3 text-sm flex justify-center cursor-pointer">
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                />
                                                <p>Edit Photo</p>
                                            </label>
                                        </div>
                                        <div className="mt-4 text-[12px]">
                                            <p>
                                                Maximum file size 1000 Kilobytes
                                                (1 Megabytes). Allowed file
                                                extensions: .JPG .JPEG .PNG
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-full ml-0 md:ml-8 mt-6 md:relative">
                                    <div>
                                        <form>
                                            <label className="block mb-3 w-full md:w-[400px]">
                                                <span className="block text-sm font-medium text-slate-700 mb-1">
                                                    First Name
                                                </span>
                                                <input
                                                    className="border border-gray-400 w-full md:w-[400px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:cursor-not-allowed focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                                    name="first_name"
                                                    disabled={disabled}
                                                    value={input.first_name}
                                                    onChange={onChange}
                                                />
                                            </label>
                                            <label className="block mb-3 w-full md:w-[400px]">
                                                <span className="block text-sm font-medium text-slate-700 mb-1">
                                                    Last Name
                                                </span>
                                                <input
                                                    className="border border-gray-400 w-full md:w-[400px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:cursor-not-allowed focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                                    name="last_name"
                                                    disabled={disabled}
                                                    value={input.last_name}
                                                    onChange={onChange}
                                                />
                                            </label>
                                            <label className="block mb-3 w-full md:w-[400px]">
                                                <span className="block text-sm font-medium text-slate-700 mb-1">
                                                    Email
                                                </span>
                                                <input
                                                    className="border border-gray-400 w-full md:w-[400px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:cursor-not-allowed focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                                    name="email"
                                                    disabled="true"
                                                    value={input.email}
                                                    onChange={onChange}
                                                />
                                            </label>
                                            <label className="block mb-3 w-full md:w-[400px]">
                                                <span className="block text-sm font-medium text-slate-700 mb-1">
                                                    Phone Number
                                                </span>
                                                <input
                                                    className="border border-gray-400 w-full md:w-[400px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:cursor-not-allowed focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                                    name="phone_number"
                                                    disabled={disabled}
                                                    value={input.phone_number}
                                                    onChange={onChange}
                                                />
                                            </label>
                                            <label className="block mb-3 w-full md:w-[400px]">
                                                <span className="block text-sm font-medium text-slate-700 mb-1">
                                                    Birthdate
                                                </span>
                                                <input
                                                    className="border border-gray-400 w-full md:w-[400px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:cursor-not-allowed focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                                    name="birth_date"
                                                    type="date"
                                                    disabled={disabled}
                                                    value={input.birth_date}
                                                    onChange={onChange}
                                                />
                                            </label>
                                        </form>
                                        {disabled ? (
                                            <button
                                                className="bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white px-5 py-2 mt-2 text-sm"
                                                onClick={() =>
                                                    setDisabled(false)
                                                }
                                            >
                                                Edit
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    className="bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white px-5 py-2 mt-2 text-sm"
                                                    onClick={() =>
                                                        setOpenModal(true)
                                                    }
                                                >
                                                    Save
                                                </button>{' '}
                                                <button
                                                    className="bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white px-5 py-2 mt-2 text-sm"
                                                    onClick={() =>
                                                        setDisabled(true)
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}

                                        <Modal
                                            dismissible
                                            show={openModal}
                                            onClose={() =>
                                                setOpenModal(!openModal)
                                            }
                                        >
                                            <Modal.Header>
                                                Edit Profile
                                            </Modal.Header>
                                            <Modal.Body>
                                                Are you sure, you want to edit
                                                your profile ?
                                            </Modal.Body>
                                            <div className="flex gap-2 ml-5 mb-6">
                                                <button
                                                    className="bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white px-5 py-2 mt-2 text-sm w-[60px]"
                                                    onClick={() =>
                                                        setOpenModal(!openModal)
                                                    }
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="bg-rose-600 hover:bg-gray-400 rounded-lg text-white px-5 py-2 mt-2 text-sm"
                                                    onClick={() =>
                                                        setOpenModal(!openModal)
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
