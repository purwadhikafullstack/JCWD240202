export default function NotFoundPage() {
    return (
        <>
            <div className="w-full flex justify-center items-center bg-[#fcfcff] pt-12 mb-2">
                <div className="relative">
                    <div className="w-full flex justify-center items-center text-5xl absolute top-5 font-mono text-gray-500">
                        PAGE NOT FOUND
                    </div>
                    <div className="w-fit flex justify-center items-center">
                        <img
                            src="/images/404-Not-Found.gif"
                            alt="not-found"
                            className="max-w-[680px]"
                        ></img>
                    </div>
                </div>
            </div>
        </>
    );
}
