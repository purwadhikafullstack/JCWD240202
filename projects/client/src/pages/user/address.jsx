import { useEffect, useState } from 'react';
import ProfileTabs from '../../components/user/tabs';
import { Modal } from 'flowbite-react';
import EditModal from '../../components/user/modaleditaddress';
import NewAddress from '../../components/user/addnewaddress';
import axios from 'axios';

export default function Address() {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState('');
    const [showAddModal, setShowAddModal] = useState('');
    const [addresses, setAddresses] = useState([]);

    const getAddress = async () => {
        try {
            const dataAddress = await axios(
                process.env.REACT_APP_API_BASE_URL + '/addresses',
            );
            setAddresses(dataAddress?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };
    console.log(addresses);

    useEffect(() => {
        getAddress();
    }, []);

    const listAddress = () => {
        return (
            <div>
                {addresses.map((value, index) => {
                    return (
                        <div
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
                                    Kecamatan {value.subdistrict}, {value.city}
                                </p>
                                <p>
                                    {value.province}, {value.postcode}
                                </p>
                                <div className="flex justify-start gap-5 items-center mt-5">
                                    <button
                                        className="text-blue-700 text-white text-sm hover:underline focus:underline"
                                        onClick={() => setShowEditModal('show')}
                                    >
                                        Edit Address
                                    </button>
                                    {value.is_primary === true ? (
                                        <div></div>
                                    ) : (
                                        <>
                                            <div className="border-r border-black h-4"></div>
                                            <button
                                                className="text-blue-700 text-white text-sm hover:underline focus:underline"
                                                onClick={() =>
                                                    setShowDeleteModal(
                                                        !showDeleteModal,
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
                                            setShowDeleteModal(!showDeleteModal)
                                        }
                                    >
                                        <Modal.Header>
                                            Delete Address
                                        </Modal.Header>
                                        <Modal.Body>
                                            Are you sure you want to delete this
                                            address ?
                                        </Modal.Body>
                                        <div className="flex justify-start gap-3 m-5">
                                            <button className="bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white py-2 mt-2 text-sm p-3">
                                                Delete Address
                                            </button>
                                            <button
                                                className="bg-rose-600 hover:bg-gray-400 rounded-lg text-white py-2 mt-2 text-sm p-3"
                                                onClick={() =>
                                                    setShowDeleteModal(
                                                        !showDeleteModal,
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
            </div>
        );
    };

    return (
        <>
            <div className="mt-[5px] p-[20px]">
                <div className="w-full flex justify-center">
                    <div className="w-full md:w-[80%] flex justify-center">
                        <div className="py-[10px] px-[30px] border-2 border-gray-200 rounded-lg pb-[30px] shadow w-full">
                            <ProfileTabs />
                            <div className="flex justify-center text-xl mb-4">
                                <h1 className="mt-4 font-bold">ADDRESS</h1>
                            </div>
                            <div className="flex justify-end w-full mb-4">
                                <button
                                    onClick={() => setShowAddModal('show')}
                                    className="text-white text-xs border p-3 rounded-lg bg-[#0051BA] hover:bg-gray-400 font-bold focus:ring-2 focus:ring-main-500 w-[150px] mt-5 md:mt-0 md:mr-3"
                                >
                                    + Add New Address
                                </button>
                            </div>
                            {listAddress()}

                            {/* Modal Edit Address */}
                            {showEditModal === 'show' ? (
                                <EditModal showModal={setShowEditModal} />
                            ) : (
                                ''
                            )}

                            {/* Modal Add New Address */}
                            {showAddModal === 'show' ? (
                                <NewAddress showModal={setShowAddModal} />
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
