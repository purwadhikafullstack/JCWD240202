import { Button, Dropdown, Select } from 'flowbite-react';
import ModalChangeAddress from '../../components/user/checkoutCart/modalChangeAddress';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getChosenAddressAsync } from '../../redux/features/addressSlice';
import ChosenAddress from '../../components/user/checkoutCart/chosenAddress';
import {
    getUserCartAsync,
    userDeleteProductCartAsync,
} from '../../redux/features/cartSlice';
import CartLists from '../../components/user/checkoutCart/cartLists';
import OrderSummary from '../../components/user/checkoutCart/orderSummary';
import {
    getShippingListAsync,
    setShipping,
} from '../../redux/features/shippingSlice';
import {
    createNewOrderAsync,
    setIsOrderSuccess,
    setOrderId,
} from '../../redux/features/checkoutSlice';
import { useNavigate } from 'react-router-dom';
import PaymentMethod from '../../components/user/checkoutCart/paymentMethod';

export default function CheckoutCart() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const userChosenAddress = useSelector(
        (state) => state.address.chosenAddress,
    );
    const userCart = useSelector((state) => state.cart.cart);
    const closestWH = useSelector((state) => state.shipping.closestWarehouse);
    const shippingCourier = useSelector((state) => state.shipping.shipping);
    const [courier, setCourier] = useState('');
    const [shippingFee, setShippingFee] = useState(0);
    const [shippingMethod, setShippingMethod] = useState('');
    const orderSuccess = useSelector((state) => state.checkout.isOrderSuccess);
    const getOrderId = useSelector((state) => state.checkout.orderId);
    const navigate = useNavigate();

    const handleIkewaCourier = (e) => {
        if (e.target.value === '') {
            setShippingFee(0);
        } else {
            setShippingMethod(e.target.value);
            const fee = (closestWH.data.distanceInKm * 5000).toFixed(2);
            setShippingFee(fee);
        }
    };

    const unavailableItemsOnCart = (data) => {
        dispatch(
            userDeleteProductCartAsync({
                id: data?.id,
            }),
        );
        dispatch(getChosenAddressAsync());
        dispatch(getUserCartAsync());
    };

    const createOrder = () => {
        try {
            if (userCart.data === null) {
                toast.error('No items in cart');
            } else if (userChosenAddress?.data === null) {
                toast.error('Please choose or add receiver address');
            } else if (courier === '' || shippingMethod === '') {
                toast.error('Please choose preffered delivery method');
            } else {
                let userAddress = `${userChosenAddress.data.street}, ${userChosenAddress.data.subdistrict}, ${userChosenAddress.data.city}, ${userChosenAddress.data.province} ${userChosenAddress.data.postcode}`;

                const newOrder = dispatch(
                    createNewOrderAsync({
                        cart_id: userCart?.data?.rows[0]?.cart?.id,
                        shipping_address: userAddress,
                        courier: courier,
                        shipping_method: shippingMethod,
                        shipping_fee: Number(shippingFee),
                        total_weight: userCart?.totalWeight,
                        total_cart_price: Number(userCart?.totalPrice),
                        total:
                            Number(userCart?.totalPrice) + Number(shippingFee),
                        warehouse_id: closestWH?.data?.warehouseData?.id,
                        receiver_name: userChosenAddress?.data?.receiver_name,
                        receiver_number:
                            userChosenAddress?.data?.receiver_number,
                    }),
                );
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        dispatch(getChosenAddressAsync());
        dispatch(getUserCartAsync());
        if (courier === 'jne' || courier === 'tiki' || courier === 'pos') {
            const getShippingPrice = dispatch(
                getShippingListAsync({
                    origin_id: closestWH.data.warehouseData.city_id,
                    destination_id: userChosenAddress.data.city_id,
                    weight: userCart.totalWeight,
                    courier: courier,
                }),
            );
        }
        if (courier === '') {
            dispatch(setShipping(null));
            setShippingFee(0);
            setShippingMethod('');
        }

        if (orderSuccess === true) {
            navigate(`/orders/${getOrderId?.data?.id}`);
            dispatch(setIsOrderSuccess(false));
            dispatch(setOrderId(''));
        }
    }, [courier, getOrderId]);

    return (
        <>
            <Toaster />
            <div className="flex justify-center gap-2">
                <div className="w-[1000px] px-9">
                    <div className="py-9 font-bold text-2xl">Checkout</div>
                    <div className="divide-y">
                        <div className="pb-2 font-bold text-lg">
                            Receiver Address
                        </div>
                        {userChosenAddress?.data === null ? (
                            <>
                                <div className="py-7">
                                    Please choose or add receiver address
                                </div>
                                <div className="py-2">
                                    <Button
                                        onClick={() => setShowModal(true)}
                                        color={'light'}
                                    >
                                        Add Address
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <ChosenAddress
                                    data={{ chosenAddress: userChosenAddress }}
                                />
                                <div className="py-2">
                                    <Button
                                        onClick={() => setShowModal(true)}
                                        color={'light'}
                                    >
                                        Change Address
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                    {/* kurir */}
                    {userChosenAddress !== null ? (
                        <>
                            <div className="py-9">
                                <div className="pb-2 font-bold text-lg">
                                    Delivery Method
                                </div>
                                {userCart.totalWeight / 1000 <= 30 ? (
                                    <Select
                                        onChange={(e) =>
                                            setCourier(e.target.value)
                                        }
                                    >
                                        <option value={''}>
                                            Choose Courier
                                        </option>
                                        <option value={'jne'}>JNE</option>
                                        <option value={'pos'}>
                                            Pos Indonesia
                                        </option>
                                        <option value={'tiki'}>TIKI</option>
                                    </Select>
                                ) : (
                                    <Select
                                        onChange={(e) => {
                                            setCourier(e.target.value);
                                        }}
                                    >
                                        <option value={''}>
                                            Choose Courier
                                        </option>
                                        <option value={'ikewa'}>
                                            Ikewa Courier Service
                                        </option>
                                    </Select>
                                )}
                            </div>
                            <div>
                                {shippingCourier ? (
                                    <Select
                                        onChange={(e) => {
                                            e.target.value === ''
                                                ? setShippingFee(0)
                                                : setShippingFee(
                                                      e.target.value.split(
                                                          ',',
                                                      )[1],
                                                  );
                                            setShippingMethod(
                                                e.target.value.split(',')[0],
                                            );
                                        }}
                                    >
                                        <option value={''}>
                                            Choose Delivery Method
                                        </option>
                                        {shippingCourier?.data?.rajaongkir?.results[0]?.costs.map(
                                            (value, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={`${value.service},${value.cost[0].value}`}
                                                    >
                                                        {value.service} - Rp{' '}
                                                        {value.cost[0].value.toLocaleString(
                                                            'ID-id',
                                                        )}{' '}
                                                        (
                                                        {value.cost[0].etd.replace(
                                                            'HARI',
                                                            '',
                                                        )}{' '}
                                                        Days)
                                                    </option>
                                                );
                                            },
                                        )}
                                    </Select>
                                ) : courier === 'ikewa' ? (
                                    <Select
                                        onChange={(e) => {
                                            handleIkewaCourier(e);
                                        }}
                                    >
                                        <option value={''}>
                                            Choose Delivery Method
                                        </option>
                                        <option value={'Reguler'}>
                                            Reguler Delivery (7-10 business
                                            days)
                                        </option>
                                    </Select>
                                ) : (
                                    ''
                                )}
                            </div>
                        </>
                    ) : (
                        ''
                    )}
                    {/* Payment Method */}
                    <PaymentMethod />
                    {/* cart items */}
                    <div>
                        <div className="pt-9 font-bold text-lg pb-4">
                            Your Items
                        </div>
                        {userCart?.data?.rows?.map((value, index) => {
                            return (
                                <>
                                    {value?.product?.total_stock !== 0 ? (
                                        <div className="border-y">
                                            <CartLists data={{ value }} />
                                        </div>
                                    ) : (
                                        unavailableItemsOnCart({
                                            id: value?.product?.id,
                                        })
                                    )}
                                </>
                            );
                        })}
                    </div>
                </div>
                {/* right total box */}
                <OrderSummary
                    data={{
                        closestWH,
                        weight: userCart.totalWeight,
                        price: userCart.totalPrice,
                        shippingFee: shippingFee,
                        courier: courier,
                        shippingMethod: shippingMethod,
                        createOrder,
                    }}
                />
            </div>
            <ModalChangeAddress
                data={{
                    setShowModal,
                    showModal,
                    chosenAddress: userChosenAddress,
                }}
            />
        </>
    );
}
