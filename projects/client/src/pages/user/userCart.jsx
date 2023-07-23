import { useDispatch } from 'react-redux';
import CartTable from '../../components/user/cart/cartTable';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserCartAsync } from '../../redux/features/cartSlice';
import { Toaster } from 'react-hot-toast';

export default function UserCart() {
    const dispatch = useDispatch();
    const userCart = useSelector((state) => state.cart.cart);

    useEffect(() => {
        dispatch(getUserCartAsync());
        console.log(userCart);
    }, []);
    return (
        <div className="px-[200px]">
            <div className=" py-[50px] font-bold text-3xl border-b">
                Your Shopping Cart
            </div>
            <div>
                {userCart?.data?.rows?.map((value, index) => {
                    return <CartTable key={index} data={{ value }} />;
                })}
            </div>
            <div className="flex justify-end pt-9">
                <div className="border w-fit px-16 py-4 rounded-full text-lg bg-sky-700 text-yellow-300 font-bold hover:bg-sky-900 hover:cursor-pointer flex flex-col justify-center items-center">
                    <div>Rp xxx xxx xxx</div>
                    <div>Checkout</div>
                </div>
            </div>
        </div>
    );
}
