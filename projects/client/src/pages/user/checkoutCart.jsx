import { Button } from 'flowbite-react';
import ModalChangeAddress from '../../components/user/checkoutCart/modalChangeAddress';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

export default function CheckoutCart() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <Toaster />
            <div className="flex justify-center">
                <div className="w-[1000px] px-9 border">
                    <div className="py-9 font-bold text-2xl">Checkout</div>
                    <div className="divide-y">
                        <div className="pb-2 font-bold ">Receiver Address</div>
                        <div className="py-2">
                            <div className="font-bold">Farraz Aryasa</div>
                            <div>+628106584426</div>
                            <div>the breeze, tangerang selatan, 16162 </div>
                        </div>
                        <div className="py-2">
                            <Button
                                onClick={() => setShowModal(true)}
                                color={'light'}
                            >
                                Change Address
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="border w-[300px]">Total Shopping Cart</div>
            </div>
            <ModalChangeAddress data={{ setShowModal, showModal }} />
        </>
    );
}
