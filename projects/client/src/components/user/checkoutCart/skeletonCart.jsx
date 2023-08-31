export default function SkeletonCart() {
    return (
        <>
            <div className="h-[205px] mt-4 pb-4 flex relative animate-pulse">
                <div className="flex-2">
                    <div className="bg-gray-300 dark:bg-gray-700 w-[200px] h-[200px] rounded-lg"></div>
                </div>
                <div className=" flex-1 px-9 py-2 relative flex flex-col gap-2">
                    <div className="bg-gray-300 dark:bg-gray-700 w-36 h-7 rounded-lg"></div>
                    <div className="bg-gray-300 dark:bg-gray-700 w-28 h-6 rounded-lg"></div>
                    <div className="bg-gray-300 dark:bg-gray-700 w-28 h-6 rounded-lg"></div>
                    <div className="absolute bottom-0">
                        <div className="bg-gray-300 dark:bg-gray-700 w-28 h-4 rounded-lg mb-1"></div>
                        <div className="bg-gray-300 dark:bg-gray-700 w-28 h-4 rounded-lg"></div>
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <div className="rounded-full items-center bg-gray-300 dark:bg-gray-700 w-32 h-14"></div>
                </div>
                <div className="flex-2 w-[200px] flex items-center justify-center text-xl font-bold">
                    <div className="bg-gray-300 dark:bg-gray-700 w-32 h-8 rounded-lg"></div>
                </div>
                <div className="absolute bottom-2 right-0 hover:border hover:p-2 hover:rounded-full hover:bg-sky-700 hover:text-yellow-200 hover:cursor-pointer">
                    <div className="bg-gray-300 dark:bg-gray-700 w-6 h-6 rounded-lg"></div>
                </div>
            </div>
        </>
    );
}
