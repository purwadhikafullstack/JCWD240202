import { Button } from 'flowbite-react';
import ModalChangeAddress from '../../components/user/checkoutCart/modalChangeAddress';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getChosenAddressAsync } from '../../redux/features/addressSlice';
import ChosenAddress from '../../components/user/checkoutCart/chosenAddress';
import { getUserCartAsync } from '../../redux/features/cartSlice';
import CartLists from '../../components/user/checkoutCart/cartLists';

export default function CheckoutCart() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const userChosenAddress = useSelector(
        (state) => state.address.chosenAddress,
    );
    const userCart = useSelector((state) => state.cart.cart);

    useEffect(() => {
        dispatch(getChosenAddressAsync());
        dispatch(getUserCartAsync());
    }, []);
    return (
        <>
            {console.log('user cart => ', userCart)}
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
                    <div className="py-9 font-bold text-lg">
                        Delivery Method
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
                <div className="border h-[100px] w-[300px] mt-9">
                    Total Shopping Cart
                </div>
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
