export default function SkeletonProductCard() {
    return (
        <div className="w-[400px] h-[550px] border flex flex-col p-2 relative shadow-lg mt-9 animate-pulse">
            <div className="absolute left-3 top-3 hover:cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
            </div>
            <div>
                <div className="flex justify-center">
                    <div className="w-[300px] h-[300px] rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                </div>
                <div className="font-bold text-xl pt-4">
                    <div className="w-56 h-8 rounded-lg bg-gray-300 dark:bg-gray-700 mb-2"></div>
                </div>
                    <div className="w-40 h-6 rounded-lg bg-gray-300 dark:bg-gray-700 mb-2"></div>
                <div></div>
                    <div className="w-full h-24 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                <div></div>
            </div>

            <div className="absolute bottom-4 right-3 text-red-700 font-bold hover:cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
            </div>
        </div>
    );
}
