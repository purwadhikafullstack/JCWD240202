/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileTabs from '../../components/user/profile/tabs';
import { getDataLogin } from '../../redux/features/userSlice';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import UserSidebar from '../../components/user/sidebar/userSidebar';

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
    const [imagePreview, setImagePreview] = useState('');
    const [disabledPhoto, setDisabledPhoto] = useState(false);

    const dispatch = useDispatch();
    const dataLogin = useSelector((state) => state.user.dataLogin);
    const token = JSON.parse(localStorage?.getItem('user'));

    useEffect(() => {
        dispatch(getDataLogin());
        setInput({
            first_name: dataLogin?.first_name,
            last_name: dataLogin?.last_name,
            email: dataLogin?.email,
            phone_number: dataLogin?.phone_number,
            birth_date: dataLogin?.birth_date?.split('T')[0],
        });
    }, [
        dataLogin?.first_name,
        dataLogin?.last_name,
        dataLogin?.phone_number,
        dataLogin?.birth_date,
    ]);

    const onChange = (e) => {
        const { value, name } = e.target;
        setInput({ ...input, [name]: value });
    };

    const onChangeProfilePic = (e) => {
        try {
            if (
                e.target.files[0]?.type.split('/')[1].toLowerCase() !== 'jpg' &&
                e.target.files[0]?.type.split('/')[1].toLowerCase() !==
                    'jpeg' &&
                e.target.files[0]?.type.split('/')[1].toLowerCase() !== 'png'
            ) {
                // setImagePreview(null);
                throw { message: 'Format file must jpg, jpeg, or png' };
            }

            if (e.target.files[0]?.size >= 1000000) {
                // setImagePreview(null);
                throw { message: 'File size max 1 Mb!' };
            }

            const reader = new FileReader();
            const selectedFile = e.target.files[0];

            if (selectedFile) {
                reader.readAsDataURL(selectedFile);
            }

            reader.onload = (readerEvent) => {
                setImagePreview(readerEvent.target.result);
            };

            return setUpdateProfilePic(e.target.files[0]);
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message, {
                    position: 'top-center',
                    duration: 2000,
                    style: {
                        border: '2px solid #000',
                        borderRadius: '10px',
                        background: '#DC2626',
                        color: 'white',
                    },
                });
            } else {
                toast.error(error.message, {
                    position: 'top-center',
                    duration: 2000,
                    style: {
                        border: '2px solid #000',
                        borderRadius: '10px',
                        background: '#DC2626',
                        color: 'white',
                    },
                });
            }
        }
    };

    const onEditProfile = async (req, res) => {
        try {
            setDisabledPhoto(true);
            if (
                input.first_name === '' ||
                input.last_name === '' ||
                input.phone_number === '' ||
                input.birth_date === ''
            ) {
                setOpenModal(false);
                throw { message: "Field can't be empty" };
            } else if (
                input.phone_number.match(/[a-zA-Z]/) ||
                input.phone_number.length < 12
            ) {
                setOpenModal(false);
                throw { message: 'Invalid phone number!' };
            } else {
                const editProfile = await axios.patch(
                    process.env.REACT_APP_API_BASE_URL + '/users/edit-profile',
                    {
                        first_name: input.first_name,
                        last_name: input.last_name,
                        phone_number: input.phone_number,
                        birth_date: input.birth_date,
                    },
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    },
                );
                if (editProfile.data.success) {
                    setDisabledPhoto(false);
                    dispatch(getDataLogin());
                    setOpenModal(false);
                    setDisabled(true);
                    toast.success('Edit profile success!', {
                        position: 'top-center',
                        duration: 2000,
                        style: {
                            border: '2px solid #000',
                            borderRadius: '10px',
                            background: '#0051BA',
                            color: 'white',
                        },
                    });
                }
            }
        } catch (error) {
            setDisabledPhoto(false);
            toast.error(error.message, {
                position: 'top-center',
                duration: 2000,
                style: {
                    border: '2px solid #000',
                    borderRadius: '10px',
                    background: '#DC2626',
                    color: 'white',
                },
            });
        }
    };

    const onEditProfilePicture = async (req, res) => {
        try {
            setDisabled(true);
            const updateProfilePicture = await axios.patch(
                process.env.REACT_APP_API_BASE_URL +
                    '/users/edit-profile-picture',
                {
                    images: updateProfilePic,
                },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                        'content-type': 'multipart/form-data',
                    },
                },
            );

            if (updateProfilePicture.data.success) {
                setDisabled(false);
                dispatch(getDataLogin());
                setImagePreview('');
                toast.success('Profile picture updated!', {
                    position: 'top-center',
                    duration: 2000,
                    style: {
                        border: '2px solid #000',
                        borderRadius: '10px',
                        background: '#0051BA',
                        color: 'white',
                    },
                });
            }
        } catch (error) {
            toast.error('Update profile picture failed!', {
                position: 'top-center',
                duration: 2000,
                style: {
                    border: '2px solid #000',
                    borderRadius: '10px',
                    background: '#DC2626',
                    color: 'white',
                },
            });
        }
    };

    return (
        <>
            <Toaster />
            <Helmet>
                <title>IKEWA | Profile</title>
                <meta name="description" content="profile" />
            </Helmet>
            <div className="flex justify-center gap-4 py-[80px] max-lg:flex-col max-lg:w-full max-lg:items-center max-lg:px-9 lg:flex-row">
                <div className="lg:w-1/4 flex justify-center max-lg:pb-12">
                    {' '}
                    <UserSidebar />
                </div>
                <div className="w-full flex justify-start">
                    <div className='w-full'>
                        <div className="mt-[5px]">
                            <div className="w-full">
                                <div className="w-full lg:w-[80%] flex justify-center">
                                    <div className="lg:w-full py-[10px] px-[30px] border-2 border-gray-200 rounded-lg pb-[30px] shadow">
                                        <ProfileTabs />
                                        <div className="lg:flex lg:justify-center lg:items-center mt-6 lg:ml-6">
                                            <div className="w-full md:w-[400px]">
                                                <div className="p-[10px] border-2 border-gray-200 rounded-lg">
                                                    <div className="flex justify-center">
                                                        {dataLogin?.profile_picture ||
                                                        imagePreview ? (
                                                            <img
                                                                src={
                                                                    imagePreview
                                                                        ? imagePreview
                                                                        : dataLogin?.profile_picture.startsWith(
                                                                              'PIMG',
                                                                          )
                                                                        ? process
                                                                              .env
                                                                              .REACT_APP_API_IMAGE_URL +
                                                                          dataLogin?.profile_picture
                                                                        : dataLogin?.profile_picture
                                                                }
                                                                alt="profile_picture"
                                                                // width={'250px'}
                                                                className="object-contain"
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
                                                        <div className="w-full">
                                                            <label className="bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white w-full py-2 mt-1 text-sm flex justify-center cursor-pointer">
                                                                <input
                                                                    type="file"
                                                                    className="hidden"
                                                                    onChange={
                                                                        onChangeProfilePic
                                                                    }
                                                                />
                                                                <p>
                                                                    Edit Photo
                                                                </p>
                                                            </label>
                                                            {imagePreview ? (
                                                                <div className="flex justify-center w-full gap-2">
                                                                    <button
                                                                        className="bg-[#0051BA] enabled:hover:bg-gray-400 rounded-lg text-white px-5 py-2 mt-2 text-sm w-full disabled:cursor-not-allowed disabled:bg-black"
                                                                        onClick={
                                                                            onEditProfilePicture
                                                                        }
                                                                        disabled={
                                                                            disabledPhoto
                                                                        }
                                                                    >
                                                                        Save
                                                                    </button>
                                                                    <button
                                                                        onClick={() =>
                                                                            setImagePreview(
                                                                                '',
                                                                            )
                                                                        }
                                                                        className="bg-red-600 hover:bg-gray-400 rounded-lg text-white px-5 py-2 mt-2 text-sm w-full"
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <></>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 text-[12px]">
                                                        <p>
                                                            Maximum file size
                                                            1000 Kilobytes (1
                                                            Megabytes). Allowed
                                                            file extensions:
                                                            .JPG .JPEG .PNG
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="lg:w-full ml-0 lg:ml-8 mt-6 md:relative">
                                                <div>
                                                    <form>
                                                        <label className="block mb-3 w-full md:w-[400px]">
                                                            <span className="block text-sm font-medium text-slate-700 mb-1">
                                                                First Name
                                                            </span>
                                                            <input
                                                                className="border border-gray-400 w-full md:w-[400px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:bg-gray-200 disabled:cursor-not-allowed focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                                                name="first_name"
                                                                disabled={
                                                                    disabled
                                                                }
                                                                value={
                                                                    input?.first_name
                                                                }
                                                                onChange={
                                                                    onChange
                                                                }
                                                            />
                                                        </label>
                                                        <label className="block mb-3 w-full md:w-[400px]">
                                                            <span className="block text-sm font-medium text-slate-700 mb-1">
                                                                Last Name
                                                            </span>
                                                            <input
                                                                className="border border-gray-400 w-full md:w-[400px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:bg-gray-200 disabled:cursor-not-allowed focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                                                name="last_name"
                                                                disabled={
                                                                    disabled
                                                                }
                                                                value={
                                                                    input?.last_name
                                                                }
                                                                onChange={
                                                                    onChange
                                                                }
                                                            />
                                                        </label>
                                                        <label className="block mb-3 w-full md:w-[400px]">
                                                            <span className="block text-sm font-medium text-slate-700 mb-1">
                                                                Email
                                                            </span>
                                                            <input
                                                                className="border border-gray-400 w-full md:w-[400px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:bg-gray-200 disabled:cursor-not-allowed focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                                                name="email"
                                                                disabled={
                                                                    disabled
                                                                }
                                                                value={
                                                                    input?.email
                                                                }
                                                                onChange={
                                                                    onChange
                                                                }
                                                            />
                                                        </label>
                                                        <label className="block mb-3 w-full md:w-[400px]">
                                                            <span className="block text-sm font-medium text-slate-700 mb-1">
                                                                Phone Number
                                                            </span>
                                                            <input
                                                                className="border border-gray-400 w-full md:w-[400px] rounded-md px-2 h-10 disabled:text-gray-700 disabled:bg-gray-200 disabled:cursor-not-allowed focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                                                name="phone_number"
                                                                disabled={
                                                                    disabled
                                                                }
                                                                value={
                                                                    input?.phone_number
                                                                }
                                                                onChange={(
                                                                    e,
                                                                ) => {
                                                                    setInput({
                                                                        ...input,
                                                                        phone_number:
                                                                            e.target.value.replace(
                                                                                /[^0-9]/g,
                                                                                '',
                                                                            ),
                                                                    });
                                                                }}
                                                                type="tel"
                                                                pattern="[0-9]{12}"
                                                                maxLength="12"
                                                            />
                                                        </label>
                                                        <label className="block mb-3 w-full md:w-[400px]">
                                                            <span className="block text-sm font-medium text-slate-700 mb-1">
                                                                Birthdate
                                                            </span>
                                                            <input
                                                                className="border border-gray-400 w-full md:w-[400px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:bg-gray-200 disabled:cursor-not-allowed focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                                                name="birth_date"
                                                                type="date"
                                                                disabled={
                                                                    disabled
                                                                }
                                                                value={
                                                                    input?.birth_date
                                                                }
                                                                onChange={
                                                                    onChange
                                                                }
                                                            />
                                                        </label>
                                                    </form>
                                                    {disabled ? (
                                                        <button
                                                            className="bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white px-5 py-2 mt-2 text-sm"
                                                            onClick={() =>
                                                                setDisabled(
                                                                    false,
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>
                                                    ) : (
                                                        <>
                                                            <button
                                                                className="bg-[#0051BA] mr-2 enabled:hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3 disabled:cursor-not-allowed"
                                                                onClick={() =>
                                                                    setOpenModal(
                                                                        true,
                                                                    )
                                                                }
                                                                disabled={
                                                                    !input.first_name ||
                                                                    !input.last_name ||
                                                                    !input.phone_number ||
                                                                    !input.birth_date
                                                                }
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                className="bg-red-600 hover:bg-gray-400 rounded-lg text-white px-5 py-2 mt-2 text-sm"
                                                                onClick={() => {
                                                                    setDisabled(
                                                                        true,
                                                                    );
                                                                    setInput({
                                                                        first_name:
                                                                            dataLogin?.first_name,
                                                                        last_name:
                                                                            dataLogin?.last_name,
                                                                        phone_number:
                                                                            dataLogin?.phone_number,
                                                                        birth_date:
                                                                            dataLogin?.birth_date.split(
                                                                                'T',
                                                                            )[0],
                                                                    });
                                                                }}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </>
                                                    )}

                                                    <Modal
                                                        dismissible
                                                        show={openModal}
                                                        onClose={() =>
                                                            setOpenModal(false)
                                                        }
                                                    >
                                                        <Modal.Header>
                                                            Edit Profile
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            Are you sure, you
                                                            want to edit your
                                                            profile ?
                                                        </Modal.Body>
                                                        <div className="flex gap-2 ml-5 mb-6">
                                                            <button
                                                                className="bg-[#0051BA] enabled:hover:bg-gray-400 rounded-lg text-white text-sm disabled:cursor-not-allowed disabled:bg-black rounded-lg py-2 mt-2 p-3"
                                                                onClick={
                                                                    onEditProfile
                                                                }
                                                                disabled={
                                                                    !input.first_name ||
                                                                    !input.last_name ||
                                                                    !input.phone_number ||
                                                                    !input.birth_date ||
                                                                    disabled
                                                                }
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                className="bg-red-600 hover:bg-gray-400 rounded-lg text-white px-5 py-2 mt-2 text-sm"
                                                                onClick={() => {
                                                                    setOpenModal(
                                                                        false,
                                                                    );
                                                                    setInput({
                                                                        first_name:
                                                                            dataLogin?.first_name,
                                                                        last_name:
                                                                            dataLogin?.last_name,
                                                                        phone_number:
                                                                            dataLogin?.phone_number,
                                                                        birth_date:
                                                                            dataLogin?.birth_date.split(
                                                                                'T',
                                                                            )[0],
                                                                    });
                                                                }}
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
                    </div>
                </div>
            </div>
        </>
    );
}
