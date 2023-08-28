export default function SkeletonProductAdmin() {
    return (
        <>
            <tr scope="row" className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 animate-pulse">
                <td className="flex justify-center items-center w-[150px] py-2">
                    <div className="w-[80px] h-[80px] rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                </td>
                <td className="px-3 font-medium w-[250px] text-gray-900 dark:text-white border-x">
                    <div className="flex justify-start items-center">
                        <div className="w-32 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                </td>
                <td className="px-3 border-r w-[150px] text-ellipsis overflow-hidden">
                    <div className="flex justify-start items-center">
                        <div className="w-full h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                </td>
                <td className="px-3 border-r w-[150px] text-center">
                    <div className="flex justify-start items-center">
                        <div className="w-full h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                </td>
                <td className="px-3 border-r w-[150px] text-center">
                    <div className="flex justify-start items-center">
                        <div className="w-full h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                </td>
                <td className="px-3 border-r truncate w-[150px] text-xs">
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-start items-center">
                            <div className="w-full h-3 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                        </div>
                        <div className="flex justify-start items-center">
                            <div className="w-full h-3 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                        </div>
                        <div className="flex justify-start items-center">
                            <div className="w-full h-3 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                        </div>
                        <div className="flex justify-start items-center">
                            <div className="w-full h-3 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                        </div>
                    </div>
                </td>
                <td className="px-6 w-[50px]">
                    <div className="flex flex-col items-center gap-2">
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
