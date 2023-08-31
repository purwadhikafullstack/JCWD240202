import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { reduceQuantity } from '../../../redux/features/stockSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function ReduceQuantityModal({ showModal, selected, params }) {
    const dispatch = useDispatch();
    const setDisabledButton = useSelector(
        (state) => state.stock.disabledButton,
    );
    const setModal = useSelector((state) => state.stock.modal);

    const [reduceQty, setReduceQty] = useState(0);
    const [confirm, setConfirm] = useState(false);

    useEffect(() => {
        if (setModal === true) {
            showModal(false);
            setConfirm(false);
        }
    }, [setModal]);

    return (
        <>
            <div className="bg-black bg-opacity-50 fixed inset-0 z-50">
                {/* <!-- Main modal --> */}
                <div className="fixed flex items-center justify-center z-999 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-[350px] max-w-2xl max-h-full">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Reduce Quantity of {selected?.name} (
                                    {
                                        selected?.product_stocks[0]?.warehouse
                                            ?.city
                                    }{' '}
                                    Warehouse)
                                </h3>
                                <button
                                    onClick={() => showModal(false)}
                                    className="text-gray-500"
                                >
                                    <AiOutlineClose size={16} />
                                </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <div className="p-6 space-y-6 w-full flex justify-center">
                                <form>
                                    <div className="block mb-2">
                                        <span className="block text-sm font-medium text-slate-700 mb-1">
                                            Quantity
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </span>
                                        <div className="flex items-center relative">
                                            <input
                                                type="number"
                                                min={0}
                                                placeholder={0}
                                                className="border border-gray-400 rounded-md px-2 h-10 w-[65px] focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1 text-black flex justify-center"
                                                value={reduceQty}
                                                onChange={(e) => {
                                                    setReduceQty(
                                                        e.target.value,
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            {/* <!-- Modal footer --> */}
                            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button
                                    className="bg-[#0051BA] enabled:hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3 disabled:cursor-not-allowed"
                                    disabled={!reduceQty}
                                    onClick={() => {
                                        setConfirm(true);
                                    }}
                                >
                                    Confirm
                                </button>
                                <button
                                    className="bg-red-600 hover:bg-gray-400 rounded-lg text-white text-sm text-white py-2 text-sm p-3"
                                    onClick={() => showModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`${
                    confirm ? 'block' : 'hidden'
                } bg-black bg-opacity-50 fixed inset-0 z-50 block`}
            >
                {/* <!-- Main modal --> */}
                <div className="fixed flex items-center justify-center z-999 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-[350px] max-w-2xl max-h-full">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Update Quantity
                                </h3>
                                <button
                                    onClick={() => setConfirm(false)}
                                    className="text-gray-500"
                                >
                                    <AiOutlineClose size={16} />
                                </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <div className="p-6 space-y-6 w-full flex justify-center py-16">
                                <form>
                                    <div className="block mb-2 text-[16px]">
                                        Are you sure you want to update{' '}
                                        {selected?.name} quantity ?
                                    </div>
                                    <div>
                                        (
                                        {
                                            selected?.product_stocks[0]
                                                ?.warehouse?.city
                                        }{' '}
                                        Warehouse)
                                    </div>
                                </form>
                            </div>
                            {/* <!-- Modal footer --> */}
                            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button
                                    className="bg-[#0051BA] enabled:hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3 disabled:cursor-not-allowed"
                                    disabled={setDisabledButton}
                                    onClick={() => {
                                        dispatch(
                                            reduceQuantity(
                                                selected?.product_stocks[0]?.id,
                                                reduceQty,
                                                params,
                                                selected?.product_stocks[0]?.stock
                                            ),
                                        );
                                    }}
                                >
                                    Confirm
                                </button>
                                <button
                                    className="bg-red-600 hover:bg-gray-400 rounded-lg text-white text-sm text-white py-2 text-sm p-3"
                                    onClick={() => setConfirm(false)}
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
