export default function SkeletonDashboard() {
    return (
        <div className="w-full h-28 p-4 bg-white rounded-2xl shadow-xl">
            <div className="flex w-full h-9 gap-4 items-center animate-pulse">
                <div className="w-9 h-9 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                <div className="font-bold text-xl w-1/3 h-9 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            </div>
            <div className="pt-4 w-full h-9 animate-pulse">
                <div className="font-bold text-2xl w-1/3 h-7 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            </div>
        </div>
    );
}
