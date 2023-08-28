export default function SkeletonTransactionAdmin() {
    return (
        <>
            <div className="border p-2 rounded-lg shadow-lg mt-3 animate-pulse">
                <div className="flex justify- border-b py-2">
                    <div className="w-72">
                        <div className="flex justify-start items-center">
                            <div className="w-56 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center items-center">
                        <div className="flex justify-start items-center">
                            <div className="w-56 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                        </div>
                    </div>
                    <div className="flex-1 flex justify-end items-center">
                        <div className="flex justify-end items-center">
                            <div className="w-56 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                        </div>
                    </div>
                </div>
                <div className="flex mt-3 px-1">
                    <div className="flex-auto w-64 flex">
                        <div className="">
                            <div className="w-[120px] h-[120px] rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                        </div>
                        <div className="m-3">
                            <div className="flex justify-center items-center mb-2">
                                <div className="w-48 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                            </div>
                            <div className="my-1 text-slate-500 mb-2">
                                <div className="w-32 h-4 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                            </div>
                            <div className="my-1 text-slate-500">
                                <div className="w-32 h-4 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-auto w-10 mx-5 pl-3">
                        <div>
                            <div className="flex justify-start items-center">
                                <div className="w-full h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                            </div>   
                            <div className="border-l flex  flex-col gap-3 pl-2 mt-5">
                                <div className="flex justify-center items-center">
                                    <div className="w-24 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                                </div>  
                                <div className="flex justify-center items-center">
                                    <div className="w-40 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex mt-3">
                    <div className="flex-1 flex gap-5">
                        <div className="flex items-center cursor-pointer">
                            <div className="flex justify-center items-center">
                                <div className="w-32 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                            </div> 
                        </div>
                        <div className="flex items-center cursor-pointer">
                            <div className="flex justify-center items-center">
                                <div className="w-32 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                            </div> 
                        </div>
                    </div>
                        <div className="flex-1 flex justify-end gap-5 mr-5">
                            <div className="flex justify-center items-center">
                                <div className="w-20 h-8 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                            </div> 
                            <div className="flex justify-center items-center">
                                <div className="w-20 h-8 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                            </div> 
                        </div>
                </div>
            </div>
        </>
    );
}
