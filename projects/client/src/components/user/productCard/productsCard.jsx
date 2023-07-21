import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
export default function ProductsCard(props) {
    return (
        <Link to={`/products/${props?.data?.id}`}>
            <div className="w-[400px] h-[550px] border flex flex-col p-2 relative shadow-lg mt-9">
                <div className="flex justify-center">
                    {console.log('', props)}
                    <img
                        src={props?.data?.product_images[0]?.name}
                        alt="..."
                        className="h-[300px]"
                    />
                </div>
                <div className="font-bold text-xl pt-4">{props.data.name}</div>
                <div>Rp {props?.data?.price.toLocaleString('id')}</div>
                <div>{props?.data?.description}</div>
                <div className="absolute bottom-5 right-5">
                    <AiOutlineShoppingCart size={25} />
                </div>
            </div>
        </Link>
    );
}
