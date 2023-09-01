export default function SkeletonProfile() {
    return (
        <>
            <div className="lg:flex lg:justify-center lg:items-center mt-6 lg:ml-6 animate-pulse">
                <div className="w-full md:w-[400px]">
                    <div className="p-[10px] border-2 border-gray-200 rounded-lg">
                        <div className="flex justify-center max-h-[250px]">
                            <div className="w-full h-[250px] bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                        </div>
                        <div className="mt-[10px] flex justify-center">
                            <div className="w-full">
                                <div className=" ounded-lg w-full py-2 mt-1 flex justify-center cursor-pointer">
                                    <div className="w-full h-10 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="w-full h-3 bg-gray-300 dark:bg-gray-700 rounded-lg mb-1"></div>
                            <div className="w-full h-3 bg-gray-300 dark:bg-gray-700 rounded-lg mb-1"></div>
                            <div className="w-full h-3 bg-gray-300 dark:bg-gray-700 rounded-lg mb-1"></div>
                            <div className="w-full h-3 bg-gray-300 dark:bg-gray-700 rounded-lg mb-1"></div>
                        </div>
                    </div>
                </div>
                <div className="lg:w-full ml-0 lg:ml-8 mt-6 md:relative">
                    <div>
                        <div>
                            <div className="mb-3 w-full md:w-[400px]">
                                <div className="mb-1 bg-gray-300 dark:bg-gray-700 rounded-lg w-20 h-5"></div>
                                <div className="w-full md:w-[400px] rounded-lg px-2 h-10 bg-gray-300 dark:bg-gray-700"></div>
                            </div>
                            <div className="mb-3 w-full md:w-[400px]">
                                <div className="mb-1 bg-gray-300 dark:bg-gray-700 rounded-lg w-20 h-5"></div>
                                <div className="w-full md:w-[400px] rounded-lg px-2 h-10 bg-gray-300 dark:bg-gray-700"></div>
                            </div>
                            <div className="mb-3 w-full md:w-[400px]">
                                <div className="mb-1 bg-gray-300 dark:bg-gray-700 rounded-lg w-20 h-5"></div>
                                <div className="w-full md:w-[400px] rounded-lg px-2 h-10 bg-gray-300 dark:bg-gray-700"></div>
                            </div>
                            <div className="mb-3 w-full md:w-[400px]">
                                <div className="mb-1 bg-gray-300 dark:bg-gray-700 rounded-lg w-20 h-5"></div>
                                <div className="w-full md:w-[400px] rounded-lg px-2 h-10 bg-gray-300 dark:bg-gray-700"></div>
                            </div>
                            <div className="mb-3 w-full md:w-[400px]">
                                <div className="mb-1 bg-gray-300 dark:bg-gray-700 rounded-lg w-20 h-5"></div>
                                <div className="w-full md:w-[400px] rounded-lg px-2 h-10 bg-gray-300 dark:bg-gray-700"></div>
                            </div>
                        </div>
                        <div className="mb-1 bg-gray-300 dark:bg-gray-700 rounded-lg w-20 h-8"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
