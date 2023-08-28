export default function SkeletonMutation({ dataLogin }) {
    return (
        <>
            <div className="w-full border border-gray-300 rounded-lg px-6 py-4 mb-3 animate-pulse">
                <div className="wrapper flex flex-col sm:flex-row">
                    <div className="left-container flex flex-1">
                        <div>
                            <div className="status-date flex flex-col lg:flex-row items-center gap-4 mb-6">
                                <div className="status">
                                    <div>
                                        <div className="w-52 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                                    </div>
                                </div>
                                <div className="date flex items-center gap-1 p-1 px-2">
                                    <div className="w-48 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="border border-gray-300 p-2 rounded-lg">
                                    <div className="w-[115px] h-[100px] rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                                </div>
                                <div className="product-detail">
                                    <div className="product-name text-sm font-bold mb-2">
                                        <div className="w-44 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                                    </div>
                                    <div className="category text-xs">
                                        <div className="w-32 h-4 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-container w-[300px] md:border-l-2 border-gray-300 sm:pl-8 mt-4 sm:mt-0">
                        <div className="mt-2">
                            {dataLogin?.role_id === 3 ? (
                                <div className="flex items-center gap-5 text-xs mb-10">
                                    <div className="request-from">
                                        <div className="w-20 h-4 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                                    </div>
                                    <div className="w-6 h-4 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                                    <div className="request-to">
                                        <div className="w-20 h-4 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-20 h-4 rounded-lg bg-gray-300 dark:bg-gray-700 mb-10"></div>
                            )}
                            <div className="total-quantity-request flex flex-col text-sm sm:text-md items-start gap-3 mb-10">
                                <div className="w-20 h-4 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                                <div className="w-20 h-4 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
