export default function PaymentMethod() {
    return (
        <div>
            <div className="pt-9 font-bold text-lg pb-4">Payment Method</div>
            <div className="border w-full h-[250px] flex justify-evenly divide-x">
                <div className="flex-1 flex items-center justify-center">
                    <img
                        src="https://storage.googleapis.com/narasi-production.appspot.com/production/medium/1676270436983/beragam-jenis-tabungan-bca-yang-harus-kamu-ketahui-medium.jpeg"
                        alt="bca_image"
                        className="h-[200px] w-[300px] "
                    />
                </div>
                <div className="flex-1 flex flex-col justify-center pl-9 bg-sky-700 text-yellow-200">
                    <div className="flex justify-evenly">
                        <div className="flex-1 font-bold">Bank</div>
                        <div className="flex-1">Bank Central Asia (BCA)</div>
                    </div>
                    <div className="flex justify-evenly">
                        <div className="flex-1 font-bold">Account Name</div>
                        <div className="flex-1">Ikewa Shop</div>
                    </div>
                    <div className="flex justify-evenly">
                        <div className="flex-1 font-bold">Account Number</div>
                        <div className="flex-1">9876543210</div>
                    </div>
                </div>
            </div>
        </div>
    );
}