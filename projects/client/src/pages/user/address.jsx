import { useEffect, useState } from 'react';
import ProfileTabs from '../../components/user/profile/tabs';
import { Modal } from 'flowbite-react';
import EditModal from '../../components/user/profile/modaleditaddress';
import NewAddress from '../../components/user/profile/addnewaddress';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import LoadingProgress from '../../components/general/loading';
import UserSidebar from '../../components/user/sidebar/userSidebar';

export default function Address() {
    const [addresses, setAddresses] = useState(null);
    const [showAddModal, setShowAddModal] = useState('');
    const [showEditModal, setShowEditModal] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEdit, setSelectedEdit] = useState({});
    const [disabled, setDisabled] = useState(false);

    const token = JSON.parse(localStorage?.getItem('user'));

    const getAddress = async () => {
        try {
            const dataAddress = await axios.get(
                process.env.REACT_APP_API_BASE_URL + '/addresses',
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );
            setAddresses(dataAddress?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            getAddress();
        }, 1000);
    }, [showAddModal, showEditModal]);

    const listAddress = () => {
        return (
            <div>
                {addresses?.length > 0 ? (
                    <>
                        {addresses.map((value, index) => {
                            return (
                                <div
                                    key={index}
                                    className={
                                        value.is_primary === true
                                            ? 'shadow-lg border-2 rounded-lg bg-blue-200 border-[#0051BA] my-2 p-3 md:flex'
                                            : 'shadow-lg border-2 rounded-lg bg-white border-[#0051BA] my-2 p-3 md:flex'
                                    }
                                >
                                    <div className="w-full">
                                        <p className="capitalize font-bold">
                                            {value.receiver_name}
                                        </p>
                                        <p>{value.receiver_number}</p>
                                        <p>{value.street}</p>
                                        <p>
                                            Kecamatan {value.subdistrict},{' '}
                                            {value.city}
                                        </p>
                                        <p>
                                            {value.province}, {value.postcode}
                                        </p>
                                        <div className="flex justify-start gap-5 items-center mt-5">
                                            <button
                                                className="text-[#0051BA] text-sm hover:underline focus:underline"
                                                onClick={() => {
                                                    setShowEditModal('show');
                                                    setSelectedEdit(value);
                                                }}
                                            >
                                                Edit Address
                                            </button>
                                            {value.is_primary === true ? (
                                                <div></div>
                                            ) : (
                                                <>
                                                    <div className="border-r border-black h-4"></div>
                                                    <button
                                                        className="text-[#0051BA] text-sm hover:underline focus:underline"
                                                        onClick={() =>
                                                            setShowDeleteModal(
                                                                true,
                                                            )
                                                        }
                                                    >
                                                        Delete Address
                                                    </button>
                                                </>
                                            )}

                                            <Modal
                                                dismissible
                                                show={showDeleteModal}
                                                onClose={() =>
                                                    setShowDeleteModal(false)
                                                }
                                            >
                                                <Modal.Header>
                                                    Delete Address
                                                </Modal.Header>
                                                <Modal.Body>
                                                    Are you sure you want to
                                                    delete this address ?
                                                </Modal.Body>
                                                <div className="flex justify-start gap-3 m-5">
                                                    <button
                                                        className="bg-[#0051BA] enabled:hover:bg-gray-400 rounded-lg text-white py-2 mt-2 text-sm p-3 disabled:cursor-not-allowed"
                                                        onClick={() =>
                                                            onDeleteAddress(
                                                                value.id,
                                                            )
                                                        }
                                                        disabled={disabled}
                                                    >
                                                        Delete Address
                                                    </button>
                                                    <button
                                                        className="bg-red-600 hover:bg-gray-400 rounded-lg text-white py-2 mt-2 text-sm p-3"
                                                        onClick={() =>
                                                            setShowDeleteModal(
                                                                false,
                                                            )
                                                        }
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </Modal>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() =>
                                                selectPrimary(value.id)
                                            }
                                            className={
                                                value.is_primary === false
                                                    ? 'text-white text-xs border p-3 rounded-lg bg-[#0051BA] hover:bg-gray-400 font-bold focus:ring-2 focus:ring-main-500 w-[150px] mt-5 md:mt-0 md:mr-3'
                                                    : 'hidden'
                                            }
                                        >
                                            Set as Primary
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                ) : addresses?.length === 0 ? (
                    <div className="flex items-center justify-center py-8">
                        <div>
                            <div className="flex justify-center items-center font-semibold text-xl mb-4">
                                <h1>
                                    Oops you don't have any address yet, please
                                    create new address
                                </h1>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <img
                                    src="/images/not-found-3.png"
                                    alt="not-found"
                                    className="min-w-[200px] max-w-[400px]"
                                ></img>
                            </div>
                        </div>
                    </div>
                ) : (
                    <LoadingProgress />
                )}
            </div>
        );
    };

    const selectPrimary = async (address_id) => {
        try {
            const updatePrimary = await axios.patch(
                process.env.REACT_APP_API_BASE_URL +
                    `/addresses/primary/${address_id}`,
                {},
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );

            if (updatePrimary.data.success) {
                getAddress();
                toast.success('Changes save!', {
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
            console.log(error);
        }
    };

    const onDeleteAddress = async (address_id) => {
        try {
            setDisabled(true);
            const deleteAddress = await axios.patch(
                process.env.REACT_APP_API_BASE_URL +
                    `/addresses/delete/${address_id}`,
                {},
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );

            if (deleteAddress.data.success) {
                setDisabled(false);
                setShowDeleteModal(false);
                toast.success('Address removed!', {
                    position: 'top-center',
                    duration: 2000,
                    style: {
                        border: '2px solid #000',
                        borderRadius: '10px',
                        background: '#0051BA',
                        color: 'white',
                    },
                });
                getAddress();
            }
        } catch (error) {
            setDisabled(false);
            console.log(error);
        }
    };

    return (
        <>
            <Toaster />
            <Helmet>
                <title>IKEWA | Address List</title>
                <meta name="description" content="address" />
            </Helmet>
            <div className="flex justify-center gap-4 py-[80px] max-lg:flex-col max-lg:w-full max-lg:items-center max-lg:px-9 lg:flex-row">
                <div className="lg:w-1/4 max-lg:pb-12 flex justify-center">
                    <UserSidebar />
                </div>
                <div className="w-full flex justify-start">
                    <div className='w-full'>
                        <div>
                            <div className="w-full">
                                <div className="w-full lg:w-[80%] flex justify-center">
                                    <div className="py-[10px] px-[30px] border-2 border-gray-200 rounded-lg pb-[30px] shadow w-full">
                                        <ProfileTabs />
                                        <div className="flex justify-center text-2xl mb-4 ">
                                            <h1 className="mt-4 font-bold">
                                                ADDRESS
                                            </h1>
                                        </div>
                                        <div className="flex justify-end w-full mb-4">
                                            <button
                                                onClick={() =>
                                                    setShowAddModal('show')
                                                }
                                                className="text-white text-xs border p-3 rounded-lg bg-[#0051BA] hover:bg-gray-400 font-bold focus:ring-2 focus:ring-main-500 w-[150px] mt-5 md:mt-0 md:mr-3"
                                            >
                                                + Add New Address
                                            </button>
                                        </div>
                                        {listAddress()}

                                        {/* Modal Edit Address */}
                                        {showEditModal === 'show' ? (
                                            <EditModal
                                                showModal={setShowEditModal}
                                                selected={selectedEdit}
                                            />
                                        ) : (
                                            ''
                                        )}

                                        {/* Modal Add New Address */}
                                        {showAddModal === 'show' ? (
                                            <NewAddress
                                                showModal={setShowAddModal}
                                            />
                                        ) : (
                                            ''
                                        )}
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
