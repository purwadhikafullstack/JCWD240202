import { useState } from 'react';
import { FcCalendar, FcAdvance } from 'react-icons/fc';
import ConfirmMutation from './confirmMutationModal';
import RejectMutation from './rejectMutationModal';
import SkeletonMutation from './skeletonMutation';

export default function MutationCard({ data, dataLogin, params, loading }) {
    const [selected, setSelected] = useState({});
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);

    return (
        <>
            {data?.data?.rows.map((value, index) => {
                if (loading) {
                    return (
                        <div key={index} className="w-full border border-gray-300 rounded-lg px-6 py-4 mb-3">
                            <div className="wrapper flex flex-col sm:flex-row">
                                <div className="left-container flex flex-1">
                                    <div>
                                        <div className="status-date flex flex-col lg:flex-row items-center gap-4 mb-6">
                                            <div className="status">
                                                <div>{value.is_approved === false && value.is_rejected === false ? (
                                                        <div className="bg-[#F5CBA7] w-[200px] border-2 border-[#F5B041] rounded-full p-1 px-2 text-sm font-semibold flex justify-center items-center">
                                                            Waiting For
                                                            Confirmation
                                                        </div>
                                                    ) : value.is_approved ===
                                                      true ? (
                                                        <div className="bg-[#A9DFBF] w-[200px] border-2 border-[#7DCEA0] rounded-full p-1 px-2 text-sm font-semibold flex justify-center items-center">
                                                            Confirmed
                                                        </div>
                                                    ) : value.is_rejected ===
                                                      true ? (
                                                        <div className="bg-[#F1948A] w-[200px] border-2 border-[#FC4A4A] rounded-full p-1 px-2 text-sm font-semibold flex justify-center items-center">
                                                            Rejected
                                                        </div>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="date flex items-center gap-1 p-1 px-2">
                                                <FcCalendar size={15} />
                                                <span className="text-sm">
                                                    {new Date(value.createdAt)
                                                        .toString()
                                                        .split(
                                                            'GMT+0700 (Western Indonesia Time)',
                                                        )}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-5">
                                            <div className="image max-w-[130px] border border-gray-300 p-2 rounded-lg">
                                                <img
                                                    src={value?.product?.product_images[0]?.name.startsWith('PIMG') ? process.env.REACT_APP_API_IMAGE_URL + value?.product?.product_images[0]?.name : value?.product?.product_images[0]?.name}
                                                    alt="product_image"
                                                />
                                            </div>
                                            <div className="product-detail">
                                                <div className="product-name text-sm font-bold mb-2">
                                                    {value?.product?.name}
                                                </div>
                                                <div className="category text-xs">
                                                    Category:{' '}{value?.product?.category?.name}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="right-container w-[300px] md:border-l-2 border-gray-300 sm:pl-8 mt-4 sm:mt-0">
                                    <div className="mt-2">
                                        {dataLogin?.warehouse?.id === value?.mutation_details[0]?.warehouse_destination_id ? (
                                            <div className="request-from text-sm sm:text-md mb-10">
                                                Request from : <br></br>
                                                <span className="font-bold">
                                                    {value?.origin?.city}
                                                </span>
                                                {value?.origin?.is_deleted === true ? (
                                                    <>
                                                        <br></br>
                                                        <span className="text-red-600">
                                                            (Deleted Warehouse)
                                                        </span>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        ) : dataLogin?.warehouse?.id === value?.origin?.id ? (
                                            <div className="request-to text-sm sm:text-md mb-10">
                                                Request to : <br></br>
                                                <span className="font-bold">
                                                    {value?.mutation_details[0]?.destination?.city}
                                                </span>
                                                {value?.mutation_details[0]?.destination?.is_deleted === true ? (
                                                    <>
                                                        <br></br>
                                                        <span className="text-red-600">
                                                            (Deleted Warehouse)
                                                        </span>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        ) : dataLogin?.role_id === 3 ? (
                                            <div className="flex items-center gap-5 text-xs mb-10">
                                                <div className="request-from">
                                                    Request from : <br></br>
                                                    <span className="font-bold">
                                                        {value?.origin?.city}
                                                    </span>
                                                    {value?.origin?.is_deleted === true ? (
                                                        <>
                                                            <br></br>
                                                            <span className="text-red-600">
                                                                (Deleted
                                                                Warehouse)
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                                <FcAdvance />
                                                <div className="request-to">
                                                    Request to : <br></br>
                                                    <span className="font-bold">
                                                        {value?.mutation_details[0]?.destination?.city}
                                                    </span>
                                                    {value?.mutation_details[0]?.destination?.is_deleted === true ? (
                                                        <>
                                                            <br></br>
                                                            <span className="text-red-600">
                                                                (Deleted
                                                                Warehouse)
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <></>
                                        )}

                                        <div className="total-quantity-request flex flex-col text-sm sm:text-md items-start gap-3 mb-10">
                                            <div>Total Quantity:</div>
                                            <div className="font-bold">{value?.mutation_details[0]?.quantity}{' '}Pcs</div>
                                        </div>
                                    </div>
                                    {(value.is_approved === true && value.is_rejected === false) || (value.is_rejected === true && value.is_approved === false) || dataLogin?.warehouse?.id === value?.origin?.id || dataLogin?.role_id === 3 ? (
                                        <></>
                                    ) : (
                                        <div className="flex justify-start sm:justify-center gap-3 mb-2">
                                            <button
                                                className="confirm w-20 bg-[#0051BA] enabled:hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3 disabled:cursor-not-allowed"
                                                onClick={() => {setShowConfirmModal(true); setSelected(value)}}
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                onClick={() => {setShowRejectModal(true); setSelected(value)}}
                                                className="reject w-20 bg-red-600 hover:bg-gray-400 rounded-lg text-white text-sm text-white py-2 text-sm p-3"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <SkeletonMutation key={index} dataLogin={dataLogin} />
                    );
                }
            })}

            {/* Confirm Modal */}
            {showConfirmModal === true ? (
                <ConfirmMutation showModal={setShowConfirmModal} selected={selected} params={params}/>
            ) : (
                <></>
            )}

            {/* Reject Modal */}
            {showRejectModal === true ? (
                <RejectMutation showModal={setShowRejectModal} selected={selected} params={params}/>
            ) : (
                <></>
            )}
        </>
    );
}
