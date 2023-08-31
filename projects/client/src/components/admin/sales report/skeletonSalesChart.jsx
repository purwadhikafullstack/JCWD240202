export default function SkeletonSalesChart() {
    return (
        <>
            <div className="shadow-lg flex-1 w-full h-inherit bg-white rounded-2xl p-4 flex flex-col justify-between">
                <div className="flex-1 sm:flex justify-between animate-pulse mb-4">
                    <div className="flex gap-2 items-center">
                        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                        <div className="w-32 h-6 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="w-24 h-8 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                        <div className="w-24 h-8 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                    </div>
                </div>
                <div className="w-full h-[400px] overflow-x-auto animate-pulse bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            </div>
        </>
    );
}
