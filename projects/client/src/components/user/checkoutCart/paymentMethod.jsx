export default function PaymentMethod() {
    return (
        <div>
            <div className="font-bold text-lg pb-4">Payment Method</div>
            <div className="border w-full h-max flex max-md:flex-col max-md:gap-4 md:flex-row justify-evenly divide-x p-4">
                <div className="flex-1 flex items-center justify-center md:p-4">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/BANK_BRI_logo_%28vertical%29.svg/1200px-BANK_BRI_logo_%28vertical%29.svg.png"
                        alt="bca_image"
                        className="h-[200px] w-[300px] "
                    />
                </div>
                <div className="flex-1 flex flex-col justify-center pl-9 bg-sky-700 text-yellow-200 max-md:py-9">
                    <div className="flex justify-evenly">
                        <div className="flex-1 font-bold">Bank</div>
                        <div className="flex-1">
                            Bank Rakyat Indonesia (BRI)
                        </div>
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
