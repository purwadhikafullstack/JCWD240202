import { Link } from 'react-router-dom';

export default function BestSellerCard(props) {
    return (
        <>
            <div className="w-[200px] h-[350px] flex flex-col">
                <div className="flex-1 relative">
                    <img
                        src={props?.data?.value?.product_images[0]?.name.startsWith('PIMG') ? process.env.REACT_APP_API_IMAGE_URL + props?.data?.value?.product_images[0]?.name : props?.data?.value?.product_images[0]?.name}
                        alt="best seller products"
                    />
                </div>
                <div className="flex flex-col gap-2 flex-1 border bg-sky-700 text-yellow-300 flex flex-col">
                    <div className="font-bold flex-1 px-2 pt-2">
                        {props?.data?.value?.name}
                    </div>
                    <div className="flex-1 px-2">
                        Rp {props?.data?.value?.price.toLocaleString('id-ID')}
                    </div>
                    <Link to={`/products/${props?.data?.value?.id}`}>
                        <div className="border-t flex justify-center py-2 bg-yellow-300 text-sky-700 hover:cursor-pointer hover:bg-yellow-400">
                            Details
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
