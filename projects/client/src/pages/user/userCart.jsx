import { useDispatch } from 'react-redux';
import CartTable from '../../components/user/cart/cartTable';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserCartAsync } from '../../redux/features/cartSlice';
import { Link } from 'react-router-dom';

export default function UserCart() {
    const dispatch = useDispatch();
    const userCart = useSelector((state) => state.cart.cart);

    useEffect(() => {
        dispatch(getUserCartAsync());
    }, []);
    return (
        <div className="px-[200px]">
            <div className=" py-[50px] font-bold text-3xl border-b">
                Your Shopping Cart
            </div>
            {userCart?.data === null ? (
                <div className="pt-9 flex justify-center font-bold">
                    Cart is Empty
                </div>
            ) : (
                <div>
                    {userCart?.data?.rows?.map((value, index) => {
                        return <CartTable key={index} data={{ value }} />;
                    })}
                </div>
            )}

            {userCart?.data === null ? (
                ''
            ) : (
                <Link to={'/cart/checkout'}>
                    <div className="flex justify-end pt-9">
                        <div className="border w-fit px-16 py-4 rounded-full text-lg bg-sky-700 text-yellow-300 font-bold hover:bg-sky-900 hover:cursor-pointer flex flex-col justify-center items-center">
                            <div>Checkout</div>
                        </div>
                    </div>
                </Link>
            )}
        </div>
    );
}
