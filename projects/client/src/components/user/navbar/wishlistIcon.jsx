import { AiOutlineHeart, AiOutlineBell } from 'react-icons/ai';

export default function WishlistIcon(props) {
    return (
        <div className="flex items-center relative w-12 h-12">
            <AiOutlineHeart size={25} />

            {props?.data?.wishlistCount?.data?.wishlists.length > 0 ? (
                <div className="border rounded-full bg-red-700 text-white w-6 h-6 flex items-center justify-center absolute top-0 right-2">
                    {props?.data?.wishlistCount?.totalProducts}
                </div>
            ) : (
                ''
            )}
        </div>
    );
}
