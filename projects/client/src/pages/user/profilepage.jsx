import { Modal } from 'flowbite-react';
import { useState } from 'react';
import ProfileTabs from '../../components/user/tabs';

export default function ProfilePage() {
    const [openModal, setOpenModal] = useState(false);

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
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png"
                                                alt="profile_picture"
                                                width={'250px'}
                                            />
                                        </div>
                                        <div className="mt-[10px] flex justify-center">
                                            <button class="bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white w-full py-2 mt-3 text-sm">
                                                Edit Photo
                                            </button>
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
                                        <div className="mb-4 font-bold text-2xl">
                                            <h1>PROFILE</h1>
                                        </div>
                                        <form>
                                            <label className="block mb-3 w-full md:w-[400px]">
                                                <span className="block text-sm font-medium text-slate-700 mb-1">
                                                    First Name
                                                </span>
                                                <input
                                                    className="border border-gray-400 w-full md:w-[400px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:cursor-not-allowed focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                                    name="first_name"
                                                />
                                            </label>
                                            <label className="block mb-3 w-full md:w-[400px]">
                                                <span className="block text-sm font-medium text-slate-700 mb-1">
                                                    Last Name
                                                </span>
                                                <input
                                                    className="border border-gray-400 w-full md:w-[400px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:cursor-not-allowed focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                                    name="last_name"
                                                />
                                            </label>
                                            {/* <label className="block mb-3 w-full md:w-[400px]">
                                                <span className="block text-sm font-medium text-slate-700 mb-1">
                                                    Email
                                                </span>
                                                <input
                                                    className="border border-gray-400 w-full md:w-[400px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:cursor-not-allowed focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                                    name="email"
                                                />
                                            </label> */}
                                            <label className="block mb-3 w-full md:w-[400px]">
                                                <span className="block text-sm font-medium text-slate-700 mb-1">
                                                    Phone Number
                                                </span>
                                                <input
                                                    className="border border-gray-400 w-full md:w-[400px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:cursor-not-allowed focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                                    name="phone_number"
                                                />
                                            </label>
                                        </form>
                                        <button
                                            className="bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white px-5 py-2 mt-2 text-sm"
                                            onClick={() =>
                                                setOpenModal(!openModal)
                                            }
                                        >
                                            Edit
                                        </button>
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
