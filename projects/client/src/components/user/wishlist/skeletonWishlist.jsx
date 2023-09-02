export default function SkeletonWishList() {
    return (
        <>
            <div className="border w-full rounded-xl h-[250px] p-4 mb-4 animate-pulse">
                <div className="h-full w-full flex items-center gap-4 relative">
                    <div className="flex-1 h-full w-full flex items-center gap-9">
                        <div className="bg-gray-300 dark:bg-gray-700 h-[200px] w-[150px] rounded-lg"></div>
                        <div className="h-full py-4 flex flex-col gap-1 relative">
                            <div className="font-bold">
                                <div className="w-24 h-5 rounded-lg bg-gray-300 dark:bg-gray-700 mb-1"></div>
                            </div>
                            <div>
                                <div className="w-24 h-5 rounded-lg bg-gray-300 dark:bg-gray-700 mb-1"></div>
                            </div>
                            <div className="flex gap-1">
                                <div className="w-24 h-5 rounded-lg bg-gray-300 dark:bg-gray-700 mb-1"></div>
                            </div>
                            <div className="absolute bottom-0 left-0">
                                <div className="w-12 h-5 rounded-lg bg-gray-300 dark:bg-gray-700 mb-1"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full h-full flex items-center justify-center">
                        <div className="w-36 h-9 rounded-lg bg-gray-300 dark:bg-gray-700 mb-1"></div>
                    </div>
                    <div className="absolute bottom-0 right-0 underline text-sm hover:cursor-pointer">
                        <div className="w-10 h-5 rounded-lg bg-gray-300 dark:bg-gray-700 mb-1"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
