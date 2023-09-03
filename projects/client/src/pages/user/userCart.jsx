import { useDispatch } from 'react-redux';
import CartTable from '../../components/user/cart/cartTable';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserCartAsync, setLoading } from '../../redux/features/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import ModalUnavailableItems from '../../components/user/cart/modalUnavailableItems';
import { Button } from 'flowbite-react';
import { Helmet } from 'react-helmet';
import SkeletonCart from '../../components/user/checkoutCart/skeletonCart';

export default function UserCart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userCart = useSelector((state) => state.cart.cart);
    const [unavailableProduct, setUnavailableProduct] = useState(false);
    const [modalUnavailable, setModalUnavailable] = useState(false);
    const loading = useSelector((state) => state.cart.loading);
    const [loadings, setLoadings] = useState(false)

    const handleCheckout = () => {
        if (unavailableProduct === true) {
            setModalUnavailable(true);
        } else {
            navigate('/cart/checkout');
        }
    };

    useEffect(() => {
        dispatch(getUserCartAsync());
        setTimeout(() => {
            setLoadings(true)
        }, 1000);
        return () => dispatch(setLoading(false))
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
                            <div className="flex items-center justify-center py-8">
                                <div>
                                    <div className="flex justify-center items-center font-semibold text-xl mb-6">
                                        <h1 className="font-semibold text-2xl">
                                            Cart is Empty
                                        </h1>
                                    </div>
                                    <div className="w-full flex justify-center items-center">
                                        <img
                                            src="/images/not-found-user.png"
                                            alt="not-found"
                                            className="min-w-[200px] max-w-[400px]"
                                        ></img>
                                    </div>
                                </div>
                            </div>
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
                            if (loading && loadings) {
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
                            } else {
                                return <SkeletonCart key={index} />;
                            }
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
