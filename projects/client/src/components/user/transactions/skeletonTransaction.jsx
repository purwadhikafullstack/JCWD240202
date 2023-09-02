export default function SkeletonTransactionCard() {
    return (
        <>
            <div className="border w-full h-full shadow-xl rounded-2xl px-2">
                <div className="flex justify-between gap-9 items-center py-2 px-7 py-2 animate-pulse">
                    <div className="flex gap-9 items-center">
                        <div className="bg-gray-300 dark:bg-gray-700 h-8 w-40 rounded-lg"></div>
                        <div className="bg-gray-300 dark:bg-gray-700 h-10 w-72 rounded-lg"></div>
                        <div className="bg-gray-300 dark:bg-gray-700 h-10 w-36 rounded-lg"></div>
                    </div>
                </div>
                <div className="flex justify-between px-7 py-4 animate-pulse">
                    <div className="pt-4 flex gap-9">
                        <div className=" h-[200px] w-[200px]">
                            <div className="bg-gray-300 dark:bg-gray-700 h-[200px] w-[200px] rounded-lg"></div>
                        </div>
                        <div className="pt-4 ">
                            <div className="bg-gray-300 dark:bg-gray-700 h-8 w-56 rounded-lg mb-2"></div>
                            <div className="flex gap-2">
                                <div className="bg-gray-300 dark:bg-gray-700 h-6 w-52 rounded-lg mb-2"></div>
                            </div>
                            <div className="bg-gray-300 dark:bg-gray-700 h-6 w-48 rounded-lg"></div>
                        </div>
                    </div>
                    <div className="px-9 flex flex-col justify-center gap-2">
                        <div className="bg-gray-300 dark:bg-gray-700 h-6 w-28 rounded-lg mb-1"></div>
                        <div className="bg-gray-300 dark:bg-gray-700 h-6 w-28 rounded-lg "></div>
                    </div>
                </div>
                <div className="flex justify-between items-center px-7 py-2 animate-pulse">
                    <div className="text-sky-700 font-bold flex gap-9 py-2">
                        <div className="bg-gray-300 dark:bg-gray-700 h-10 w-40 rounded-lg"></div>
                        <div className="bg-gray-300 dark:bg-gray-700 h-10 w-40 rounded-lg"></div>
                    </div>
                    <div className="bg-gray-300 dark:bg-gray-700 h-10 w-40 rounded-lg"></div>
                </div>
            </div>
        </>
    );
}
