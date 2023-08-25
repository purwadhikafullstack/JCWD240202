export default function SkeletonTotalSalesCategory({ data }) {
    return (
        <>
            <div className="shadow-lg w-full bg-white rounded-2xl p-4">
                <div className="flex gap-2 items-center animate-pulse">
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                    <div className="w-32 h-6 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                </div>
                <div className="pt-4 animate-pulse">
                    {data?.map((value, index) => {
                        return (
                            <div
                                key={index}
                                className="w-full h-6 bg-gray-300 dark:bg-gray-700 rounded-lg mb-2"
                            ></div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
