import { BsTruck, BsTools, BsFillSendFill } from 'react-icons/bs';

export default function ServicesBox() {
    return (
        <div className="flex gap-9 mx-24">
            {/* pengantaran */}
            <div className="border flex-1 p-9 bg-gray-200 flex justify-center">
                <div className="text-center">
                    <div className="flex justify-center">
                        <BsTruck size={25} />
                    </div>
                    <div className="text-xl font-bold">Delivery</div>
                    <div>We delivered directly to your home or office.</div>
                </div>
            </div>
            {/* perakitan */}
            <div className="border flex-1 p-9 bg-gray-200">
                <div className="text-center">
                    <div className="flex justify-center">
                        <BsTools size={25} />
                    </div>
                    <div className="text-xl font-bold">Assembly</div>
                    <div>
                        We can help you assemble your new items on location.
                    </div>
                </div>
            </div>
            {/* Lacak pesanan */}
            <div className="border flex-1 p-9 bg-gray-200">
                <div className="text-center">
                    <div className="flex justify-center">
                        <BsFillSendFill size={25} />
                    </div>
                    <div className="text-xl font-bold">Order Tracking</div>
                    <div>You can check your order progress directly.</div>
                </div>
            </div>
        </div>
    );
}
