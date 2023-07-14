import { MdOutlineAccountCircle } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div className="flex justify-between items-center border-b py-6 px-12">
            {/* left side => logo */}
            <div className="w-24">
                <img
                    src="https://preview.redd.it/uhiuxnz5ber21.jpg?auto=webp&s=76182965b43ea456c3525a050ba0f16f12b44c98"
                    alt="company_logo"
                />
            </div>
            {/* middle => pages */}
            <div className="hidden md:block md:flex gap-9 items-center text-xl">
                <Link to={'/'}>
                    <div>Home</div>
                </Link>
                <div>Offers</div>
                <div>Products</div>
                <div>Categories</div>
                <div>About</div>
            </div>
            {/* right sided => account, cart, wishlist */}
            <div className="flex gap-9">
                <div>
                    <MdOutlineAccountCircle size={25} />
                </div>
                <div>
                    <AiOutlineHeart size={25} />
                </div>
                <div>
                    <AiOutlineShoppingCart size={25} />
                </div>
            </div>
        </div>
    );
}
