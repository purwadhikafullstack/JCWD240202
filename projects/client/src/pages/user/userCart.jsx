import { useDispatch } from 'react-redux';
import CartTable from '../../components/user/cart/cartTable';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserCartAsync } from '../../redux/features/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import ModalUnavailableItems from '../../components/user/cart/modalUnavailableItems';
import { Button } from 'flowbite-react';
import { Helmet } from 'react-helmet';

export default function UserCart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userCart = useSelector((state) => state.cart.cart);
    const [unavailableProduct, setUnavailableProduct] = useState(false);
    const [modalUnavailable, setModalUnavailable] = useState(false);

    const handleCheckout = () => {
        if (unavailableProduct === true) {
            setModalUnavailable(true);
        } else {
            navigate('/cart/checkout');
        }
    };

    useEffect(() => {
        dispatch(getUserCartAsync());
    }, []);
    return (
        <>
            <Helmet>
                <title>IKEWA | Cart</title>
                <meta name="description" content="cart" />
            </Helmet>
            <div className="lg:px-[200px] max-lg:px-2 mb-24">
                <div className=" py-[50px] font-bold text-3xl border-b">
                    Your Shopping Cart
                </div>
                {userCart?.data === null ? (
                    <div className="py-28 flex justify-center font-bold">
                        <div className="flex flex-col items-center gap-4">
                            <div>Cart is Empty</div>
                            <Button
                                onClick={() => navigate('/products')}
                                color={'light'}
                            >
                                Browse Products Here
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        {userCart?.data?.rows?.map((value, index) => {
                            return (
                                <div key={index}>
                                    <CartTable
                                        data={{
                                            value,
                                            setUnavailableProduct,
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}

                {userCart?.data === null ? (
                    ''
                ) : (
                    <div className="flex justify-end pt-9">
                        <Button
                            onClick={handleCheckout}
                            pill
                            className="px-4 py-2 bg-sky-700 text-yellow-200"
                            size="xl"
                        >
                            Checkout
                        </Button>
                    </div>
                )}
            </div>
            <ModalUnavailableItems
                data={{ setModalUnavailable, modalUnavailable }}
            />
        </>
    );
}
