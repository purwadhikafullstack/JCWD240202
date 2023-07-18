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
                    <div className="text-xl font-bold">Pengantaran</div>
                    <div>
                        Kami bantu antar belanjaan Anda ke rumah atau kantor.
                    </div>
                </div>
            </div>
            {/* perakitan */}
            <div className="border flex-1 p-9 bg-gray-200">
                <div className="text-center">
                    <div className="flex justify-center">
                        <BsTools size={25} />
                    </div>
                    <div className="text-xl font-bold">Perakitan</div>
                    <div>
                        Kami dapat merakit satu perabot hingga sistem lemari
                        pakaian PAX.
                    </div>
                </div>
            </div>
            {/* Lacak pesanan */}
            <div className="border flex-1 p-9 bg-gray-200">
                <div className="text-center">
                    <div className="flex justify-center">
                        <BsFillSendFill size={25} />
                    </div>
                    <div className="text-xl font-bold">Lacak Pesanan</div>
                    <div>
                        Periksa tanggal dan rincian pengantaran Anda di sini
                    </div>
                </div>
            </div>
        </div>
    );
}
