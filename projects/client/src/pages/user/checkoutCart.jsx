import { Button, Select } from 'flowbite-react';
import ModalChangeAddress from '../../components/user/checkoutCart/modalChangeAddress';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getChosenAddressAsync } from '../../redux/features/addressSlice';
import ChosenAddress from '../../components/user/checkoutCart/chosenAddress';
import { getUserCartAsync } from '../../redux/features/cartSlice';
import CartLists from '../../components/user/checkoutCart/cartLists';
import OrderSummary from '../../components/user/checkoutCart/orderSummary';
import {
    getShippingListAsync,
    setShipping,
} from '../../redux/features/shippingSlice';

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

    const handleIkewaCourier = (e) => {
        if (e.target.value === '') {
            setCourier('');
            setShippingFee(0);
        } else {
            setCourier('ikewa');
            const fee = closestWH.data.distanceInKm * 6800;
            setShippingFee(fee);
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
        }
    }, [courier]);
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
                        {userChosenAddress === null ? (
                            <div className="py-7">
                                Please choose or add receiver address
                            </div>
                        ) : (
                            <ChosenAddress
                                data={{ chosenAddress: userChosenAddress }}
                            />
                        )}

                        <div className="py-2">
                            <Button
                                onClick={() => setShowModal(true)}
                                color={'light'}
                            >
                                Change Address
                            </Button>
                        </div>
                    </div>
                    {/* kurir */}
                    <div className="py-9">
                        <div className="pb-2 font-bold text-lg">
                            Delivery Method
                        </div>
                        {userCart.totalWeight <= 30 ? (
                            <Select
                                onChange={(e) => setCourier(e.target.value)}
                            >
                                <option value={''}>Choose Courier</option>
                                <option value={'jne'}>JNE</option>
                                <option value={'pos'}>Pos Indonesia</option>
                                <option value={'tiki'}>TIKI</option>
                            </Select>
                        ) : (
                            <Select
                                onChange={(e) => {
                                    handleIkewaCourier(e);
                                }}
                            >
                                <option value={''}>Choose Courier</option>
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
                                              e.target.value.split(',')[1],
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
                        ) : (
                            ''
                        )}
                    </div>
                    {/* cart items */}
                    <div>
                        <div className="pt-9 font-bold text-lg pb-4">
                            Your Items
                        </div>
                        {userCart?.data?.rows?.map((value, index) => {
                            return (
                                <div className="border-y">
                                    <CartLists data={{ value }} />
                                </div>
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
