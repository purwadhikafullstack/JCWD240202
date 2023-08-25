export default function NotFoundPage() {
    return (
        <>
            <div className="w-full flex justify-center items-center bg-[#fcfcff] px-4 sm:px-0 pt-12 mb-2">
                <div className="relative">
                    <div className="w-full flex justify-center items-center text-3xl sm:text-5xl absolute top-0 sm:top-5 font-mono text-gray-500">
                        PAGE NOT FOUND
                    </div>
                    <div className="w-fit flex justify-center items-center">
                        <img
                            src="/images/404-Not-Found.gif"
                            alt="not-found"
                            className="sm:w-[680px]"
                        ></img>
                    </div>
                </div>
            </div>
        </>
    );
}
