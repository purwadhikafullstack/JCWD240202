/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-throw-literal */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    getOrderDetailsAsync,
    postUserPaymentProofAsync,
    userCancelOrderAsync,
} from '../../redux/features/orderSlice';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from 'flowbite-react';
import ModalImagePreview from '../../components/user/orderDetails/modalImagePreview';
import ModalRemoveImage from '../../components/user/orderDetails/modalRemoveImage';
import OrderStatus from '../../components/user/orderDetails/orderStatus';
import ShippingDetails from '../../components/user/orderDetails/shippingDetails';
import ReceiverAddress from '../../components/user/orderDetails/receiverAddress';
import ModalImageProof from '../../components/user/orderDetails/modalImageProof';
import ModalSubmitProof from '../../components/user/orderDetails/modalSubmitProof';
import ShoppingItemLists from '../../components/user/orderDetails/itemsLists';
import PaymentMethod from '../../components/user/checkoutCart/paymentMethod';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import ModalCancelOrder from '../../components/user/transactions/modalCancelOrder';
import { Helmet } from 'react-helmet';
import ModalPayment from '../../components/user/orderDetails/modalPayment';

export default function OrderDetailsPage() {
    const dispatch = useDispatch();
    const { order_id } = useParams();
    const userOrderDetails = useSelector((state) => state.order.orderDetails);
    const [imagePreview, setImagePreview] = useState([]);
    const [imageProof, setImageProof] = useState([]);
    const [modalImage, setModalImage] = useState(false);
    const [modalRemoveImage, setModalRemoveImage] = useState(false);
    const [imageProofView, setImageProofView] = useState('');
    const [modalImageProof, setModalImageProof] = useState(false);
    const [modalSubmitProof, setModalSubmitProof] = useState(false);
    const [showHistoryStatus, setShowHistoryStatus] = useState(false);
    const [cancelOrder, setCancelOrder] = useState(false);
    const [modalPayment, setModalPayment] = useState(false)

    const handleImagePreview = (e) => {
        try {
            const selectedFIles = [];
            const targetFiles = [...e.target.files];

            targetFiles.map((value) => {
                if (
                    value.type.split('/')[1].toLowerCase() !== 'jpg' &&
                    value.type.split('/')[1].toLowerCase() !== 'jpeg' &&
                    value.type.split('/')[1].toLowerCase() !== 'png'
                ) {
                    throw { message: 'Format file must jpg, jpeg, or png' };
                }
            });

            targetFiles.map((value) => {
                if (value.size > 100000000)
                    throw {
                        message: `Image is Too Large`,
                    };
            });

            targetFiles.map((file) => {
                return selectedFIles.push(URL.createObjectURL(file));
            });

            setImageProof(targetFiles);
            setImagePreview(selectedFIles);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const uploadProof = (data) => {
        dispatch(
            postUserPaymentProofAsync({
                order_id: data?.order_id,
                images: data?.images,
            }),
        );
    };

    const handleCancelOrder = () => {
        dispatch(
            userCancelOrderAsync({ order_id: userOrderDetails?.data?.id }),
        );
        dispatch(getOrderDetailsAsync({ order_id: order_id }));
        setCancelOrder(false);
    };

    useEffect(() => {
        dispatch(getOrderDetailsAsync({ order_id: order_id }));
    }, []);
    return (
        <>
            <Toaster />
            <Helmet>
                <title>IKEWA | Transaction Details</title>
                <meta name="description" content="transaction-details" />
            </Helmet>
            <div className="flex justify-center max-md:px-4">
                <div className="xl:w-1/2">
                    <div className="lg:px-[100px] py-[50px]">
                        <div className="pb-[30px] flex items-center justify-start">
                            <Link to={'/users/transactions'}>
                                <div className="flex items-center">
                                    <div>
                                        <IoIosArrowBack />
                                    </div>
                                    <div>All Transaction</div>
                                </div>
                            </Link>
                        </div>
                        <div className="font-bold text-2xl flex justify-between">
                            <div>Transaction Details</div>
                            {userOrderDetails?.data?.order_statuses[
                                userOrderDetails?.data?.order_statuses.length -
                                    1
                            ]?.status_id === 1 ? (
                                <div>
                                    <Button
                                        onClick={() => setCancelOrder(true)}
                                        color={'light'}
                                    >
                                        Cancel Order
                                    </Button>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                        {/* Order status */}
                        <div className="border px-4 mt-9 pb-4">
                            <OrderStatus
                                data={{ userOrderDetails }}
                                state={{
                                    showHistoryStatus,
                                    setShowHistoryStatus,
                                }}
                            />
                        </div>
                        {/* image proof upload */}
                        {userOrderDetails?.data?.order_statuses[
                            userOrderDetails?.data?.order_statuses.length - 1
                        ]?.status_id === 1 ? (
                            <div className="border px-4 mt-9">
                                <div className="text-lg border-b py-4 font-bold flex items-center justify-between">
                                    <div>Payment Proof</div>
                                    <Button onClick={() => setModalPayment(true)} className="bg-yellow-300 text-sky-700 hover:text-yellow-300">
                                        How to pay?
                                    </Button>
                                </div>
                                <div className="flex justify-evenly items-center h-[200px]">
                                    <div className="flex-1">
                                        <div className="flex-1 flex justify-center">
                                            <label className="border p-2 rounded-xl bg-sky-700 text-yellow-300 hover:bg-sky-900 hover:cursor-pointer">
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    onChange={
                                                        handleImagePreview
                                                    }
                                                ></input>
                                                <div>
                                                    Upload Payment Receipt
                                                </div>
                                            </label>
                                        </div>
                                        <div className="text-xs w-full">
                                            * Maximum size 1MB. Allowed file
                                            extensions: .JPG .JPEG .PNG
                                        </div>
                                    </div>
                                    <div className="flex-1 flex justify-center items-center border-l h-full">
                                        <div className="max-sm:h-1/2 sm:h-3/4 w-1/2">
                                            {imagePreview.length > 0 ? (
                                                <>
                                                    <img
                                                        onClick={() =>
                                                            setModalImage(true)
                                                        }
                                                        src={imagePreview[0]}
                                                        alt="image_preview"
                                                        className="h-full w-full hover:cursor-pointer"
                                                    />
                                                    <div
                                                        onClick={() =>
                                                            setModalRemoveImage(
                                                                true,
                                                            )
                                                        }
                                                        className="underline hover:cursor-pointer"
                                                    >
                                                        Remove Image
                                                    </div>
                                                </>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {imagePreview.length > 0 ? (
                                    <div className="w-full flex justify-center py-4 border-t">
                                        <Button
                                            onClick={() =>
                                                setModalSubmitProof(true)
                                            }
                                            className="px-9 bg-sky-700 text-yellow-200 "
                                        >
                                            <div className="text-xl">
                                                Submit
                                            </div>
                                        </Button>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                        ) : userOrderDetails?.data?.order_statuses[
                              userOrderDetails?.data?.order_statuses.length - 1
                          ]?.status_id === 6 ? (
                            ''
                        ) : (
                            <>
                                <div className="border px-4 mt-9">
                                    <div className="text-lg border-b py-4 font-bold flex items-center">
                                        Payment Proof
                                    </div>
                                    <div className="flex-wrap py-4 flex items-center justify-center w-full h-[300px]">
                                        {userOrderDetails?.data
                                            ?.payment_proof ? (
                                            <img
                                                onClick={() => {
                                                    setImageProofView(
                                                        `http://localhost:8000/${userOrderDetails?.data?.payment_proof}`,
                                                    );
                                                    setModalImageProof(true);
                                                }}
                                                src={`http://localhost:8000/${userOrderDetails?.data?.payment_proof}`}
                                                alt="image_proof"
                                                className="w-full h-[250px] hover:cursor-pointer"
                                            />
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                        {/* Receiver Address */}
                        <div className="border px-4 mt-9">
                            <ReceiverAddress data={{ userOrderDetails }} />
                        </div>
                        {/* Shipping Details */}
                        <div className="border px-4 mt-4 pb-4">
                            <ShippingDetails data={{ userOrderDetails }} />
                        </div>
                        <div className="border px-4 mt-4 pb-4">
                            <div className="text-lg border-b py-4 font-bold flex items-center">
                                Shopping Items
                            </div>
                            <div className="py-2">
                                <div className="flex border-b">
                                    <div className="flex-1 pr-4 font-bold flex justify-center">
                                        Product Name
                                    </div>
                                    <div className="flex-2 w-[200px] font-bold flex justify-center">
                                        Price
                                    </div>
                                    <div className="flex-2 w-[100px] font-bold flex justify-center">
                                        Quantity
                                    </div>
                                </div>
                                <ShoppingItemLists
                                    data={{
                                        userOrderDetails:
                                            userOrderDetails?.data?.cart
                                                ?.cart_products,
                                    }}
                                />
                                <div className="flex w-full justify-end pt-4">
                                    <div className="w-1/2">
                                        <div className="flex justify-between">
                                            <div>Subtotal</div>
                                            <div>
                                                Rp{' '}
                                                {userOrderDetails?.data?.total_cart_price.toLocaleString(
                                                    'ID-id',
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>Shipping Fee</div>
                                            <div>
                                                Rp{' '}
                                                {userOrderDetails?.data?.shipping_fee.toLocaleString(
                                                    'ID-id',
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex justify-between mt-2 pt-2 border-t font-bold">
                                            <div>Total</div>
                                            <div
                                                className={`${
                                                    userOrderDetails?.data
                                                        ?.order_statuses[
                                                        userOrderDetails?.data
                                                            ?.order_statuses
                                                            .length - 1
                                                    ]?.status_id === 6
                                                        ? 'line-through'
                                                        : ''
                                                }`}
                                            >
                                                Rp{' '}
                                                {userOrderDetails?.data?.total.toLocaleString(
                                                    'ID-id',
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalImagePreview
                data={{ imagePreview }}
                state={{ modalImage, setModalImage }}
            />
            <ModalRemoveImage
                state={{
                    modalRemoveImage,
                    setModalRemoveImage,
                    setImagePreview,
                    setImageProof,
                }}
            />
            <ModalImageProof
                data={{ imageProofView }}
                state={{ modalImageProof, setModalImageProof }}
            />
            <ModalSubmitProof
                data={{ images: imageProof[0], order_id: order_id }}
                func={{ uploadProof }}
                state={{ setModalSubmitProof, modalSubmitProof }}
            />
            <ModalCancelOrder
                func={{ handleCancelOrder }}
                state={{ setCancelOrder, cancelOrder }}
            />
            <ModalPayment state={{modalPayment, setModalPayment}}/>
        </>
    );
}
