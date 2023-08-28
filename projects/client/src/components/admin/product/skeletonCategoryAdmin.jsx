export default function SkeletonCategoryAdmin() {
    return (
        <>
            <tr
                scope="row"
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 animate-pulse"
            >
                <td className="flex justify-center items-center border-r">
                    <div className="w-full h-[160px] rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                </td>
                <td className="px-3 text-lg font-medium w-[200px] text-center text-gray-900 dark:text-white border-r">
                    <div className="flex justify-center items-center">
                        <div className="w-32 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                </td>
                <td className="px-6 w-[50px]">
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-center items-center rounded-full">
                            <div className="w-6 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                        </div>
                        <div className="flex justify-center items-center rounded-full">
                            <div className="w-6 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                        </div>
                    </div>
                </td>
            </tr>
        </>
    );
}
