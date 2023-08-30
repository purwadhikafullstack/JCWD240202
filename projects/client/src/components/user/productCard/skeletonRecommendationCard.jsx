export default function SkeletonRecommendationCard() {
    return (
        <>
            <div className="w-[300px] h-[450px] flex flex-col rounded shadow-2xl animate-pulse">
                <div className="flex-1 flex justify-center relative p-2">
                    <div className="w-full h-[300px] rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                </div>
                <div className="flex flex-col gap-2 flex-1 bg-white flex flex-col bg-gray-300 dark:bg-gray-700">
                    <div className="font-bold flex-1 px-2 pt-2 text-clip">
                        <div className="w-full h-5 rounded-lg bg-gray-300 dark:bg-gray-700 mb-1"></div>
                    </div>
                    <div className="flex-1 px-2">
                        <div className="w-full h-5 rounded-lg bg-gray-300 dark:bg-gray-700 mb-1"></div>
                    </div>
                    <div className="border-t flex justify-center py-2">
                        <div className="w-20 h-5 rounded-lg bg-gray-300 dark:bg-gray-700 mb-1"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
