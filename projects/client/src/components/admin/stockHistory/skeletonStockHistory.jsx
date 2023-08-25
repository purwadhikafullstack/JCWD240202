export default function SkeletonStockHistory() {
    return (
        <>
            <tr scope="row" className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 animate-pulse">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-r">
                    <div className="flex justify-start items-center">
                        <div className="w-52 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                </td>
                <td className="px-6 py-4 border-r text-center">
                    <div className="flex justify-center items-center">
                        <div className="w-24 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                </td>
                <td className="px-6 py-4 border-r text-center">
                    <div className="flex justify-center items-center">
                        <div className="w-6 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                </td>
                <td className="px-6 py-4 border-r text-center">
                    <div className="flex justify-center items-center">
                        <div className="w-6 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                </td>
                <td className="px-6 py-4 border-r text-center">
                    <div className="flex justify-center items-center">
                        <div className="w-6 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                </td>
            </tr>
        </>
    );
}
