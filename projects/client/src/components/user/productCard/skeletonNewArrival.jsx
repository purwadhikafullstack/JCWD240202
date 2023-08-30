export default function SkeletonNewArrival() {
    return (
        <>
            <div className="mx-2 animate-pulse">
                <div className="rounded shadow-xl flex">
                    <div className="w-full flex-1">
                        <div className="w-full h-[400px] rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                    <div className="w-full text-center flex-1 py-9  px-4 relative flex flex-col gap-4">
                        <div className="w-full h-5 rounded-lg bg-gray-300 dark:bg-gray-700 mb-1"></div>
                        <div className="flex justify-center">
                            <div className="w-32 h-5 rounded-lg bg-gray-300 dark:bg-gray-700 mb-1"></div>
                        </div>
                        <div className="w-full h-5 rounded-lg bg-gray-300 dark:bg-gray-700 mb-1"></div>
                        <div className="w-full h-5 rounded-lg bg-gray-300 dark:bg-gray-700 mb-1"></div>
                        <div className="w-full h-5 rounded-lg bg-gray-300 dark:bg-gray-700 mb-1"></div>
                        <div className="w-full h-5 rounded-lg bg-gray-300 dark:bg-gray-700 mb-1"></div>
                        <div className="w-full h-5 rounded-lg bg-gray-300 dark:bg-gray-700 mb-1"></div>
                        <div className="absolute right-5 bottom-5 flex gap-4">
                            <div className="hover:cursor-pointer hover:border hover:rounded-full hover:p-4 hover:bg-yellow-200 hover:text-sky-700">
                                <div className="w-5 h-5 rounded-lg bg-gray-300 dark:bg-gray-700 mb-1"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
