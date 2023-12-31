import { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { MdPassword } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { BsHouseAddFill } from 'react-icons/bs';
import { TbPlayerEjectFilled } from 'react-icons/tb';
import EditDataAdmin from './editDataAdminModal';
import ChangePasswordAdmin from './changePassAdminModal';
import DeleteAdmin from './deleteAdminModal';
import AssignWarehouseAdmin from './assignWarehouseAdminModal';
import UnassignedWhAdmin from './unassignWarehouseAdmin';
import SkeletonAdminManagement from './skeletonAdminManagement';

export default function UserAdminTable({ data, params, page, loading }) {
    const [showEditAdminModal, setShowEditAdminModal] = useState(false);
    const [showChangePassAdminModal, setShowChangePassAdminModal] = useState(false);
    const [showDeleteAdminModal, setShowDeleteAdminModal] = useState(false);
    const [showAssignAdminModal, setShowAssignAdminModal] = useState(false);
    const [showUnassignAdminModal, setShowUnassignAdminModal] = useState(false);
    const [selectedEdit, setSelectedEdit] = useState({});

    return (
        <>
            {data?.map((value, index) => {
                    if(loading) {
                        return (
                            <tr
                                key={index}
                                scope="row"
                                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-r">
                                    {value.first_name} {value.last_name}
                                </td>
                                <td className="px-6 py-4 border-r text-center">
                                    {value.email}
                                </td>
                                <td className="px-6 py-4 border-r text-center">
                                    {value.phone_number}
                                </td>
                                <td className="px-6 py-4 border-r text-center font-bold">
                                    {value?.warehouse
                                        ? value?.warehouse?.city
                                        : 'Not Assigned'}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className='flex items-center justify-center gap-3'>
                                        <button
                                            className="font-medium text-blue-600"
                                            onClick={() => {
                                                setShowEditAdminModal(true);
                                                setSelectedEdit(value);
                                            }}
                                        >
                                            <AiFillEdit size={15} />
                                        </button>
                                        <button
                                            className="font-medium text-blue-600"
                                            onClick={() => {
                                                setShowChangePassAdminModal(true);
                                                setSelectedEdit(value);
                                            }}
                                        >
                                            <MdPassword size={15} />
                                        </button>
                                        {value?.warehouse ? (
                                            <button
                                                className="font-medium text-green-600"
                                                onClick={() => {
                                                    setShowUnassignAdminModal(true);
                                                    setSelectedEdit(value);
                                                }}
                                            >
                                                <TbPlayerEjectFilled size={15} />
                                            </button>
                                        ) : (
                                            <button
                                                className="font-medium text-green-600"
                                                onClick={() => {
                                                    setShowAssignAdminModal(true);
                                                    setSelectedEdit(value);
                                                }}
                                            >
                                                <BsHouseAddFill size={15} />
                                            </button>
                                        )}
            
                                        <button
                                            className="font-medium text-red-600"
                                            onClick={() => {
                                                setShowDeleteAdminModal(true);
                                                setSelectedEdit(value);
                                            }}
                                        >
                                            <AiFillDelete size={15} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    } else {
                       return <SkeletonAdminManagement key={index}/>
                    }      
            })}
            
            <tr>
                <td>
                    {/* Edit Data Admin */}
                    {showEditAdminModal === true ? (
                        <EditDataAdmin
                            showModal={setShowEditAdminModal}
                            selected={selectedEdit}
                            params={params}
                        />
                    ) : (
                        <></>
                    )}

                    {/* Change Password Admin */}
                    {showChangePassAdminModal === true ? (
                        <ChangePasswordAdmin
                            showModal={setShowChangePassAdminModal}
                            selected={selectedEdit}
                            params={params}
                        />
                    ) : (
                        <></>
                    )}

                    {/* Delete Admin */}
                    {showDeleteAdminModal === true ? (
                        <DeleteAdmin
                            showModal={setShowDeleteAdminModal}
                            selected={selectedEdit}
                            page={page}
                        />
                    ) : (
                        <></>
                    )}

                    {/* Assign Warehouse Admin */}
                    {showAssignAdminModal === true ? (
                        <AssignWarehouseAdmin
                            showModal={setShowAssignAdminModal}
                            selected={selectedEdit}
                            params={params}
                        />
                    ) : (
                        <></>
                    )}

                    {/* Unassign Warehouse Admin */}
                    {showUnassignAdminModal === true ? (
                        <UnassignedWhAdmin
                            showModal={setShowUnassignAdminModal}
                            selected={selectedEdit}
                            params={params}
                        />
                    ) : (
                        <></>
                    )}
                </td>
            </tr>
        </>
    );
}
