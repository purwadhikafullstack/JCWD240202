export default function SkeletonProductDescription() {
    return (
        <div className="animate-pulse">
            <div className="text-2xl font-bold mb-2">
                <div className="w-56 h-8 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
            </div>
            <div className='mb-2'>
                <div className="w-52 h-4 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
            </div>
            <div className="pt-4 font-bold text-lg mb-2">
                <div className="w-48 h-5 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
            </div>
            <div className="pt-4 text-md flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                <div className="w-16 h-5 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
            </div>
            <div className="pt-4 text-lg">
                <div className="w-full h-5 rounded-lg bg-gray-300 dark:bg-gray-700 mb-1"></div>
                <div className="w-full h-5 rounded-lg bg-gray-300 dark:bg-gray-700 mb-1"></div>
                <div className="w-full h-5 rounded-lg bg-gray-300 dark:bg-gray-700 mb-1"></div>
                <div className="w-full h-5 rounded-lg bg-gray-300 dark:bg-gray-700 mb-1"></div>
            </div>
        </div>
    );
}
