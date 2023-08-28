export default function SkeletonColorAdmin() {
    return (
        <>
            <tr
                scope="row"
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 animate-pulse"
            >
                <td>
                    <div className="my-1 text-slate-500">
                        <div className="w-full h-24 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                </td>
                <td className="px-3 font-medium w-[200px] text-center text-gray-900 dark:text-white border-x">
                    <div className="flex justify-center items-center">
                        <div className="w-20 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                </td>
                <td className="px-3 font-medium w-[200px] text-center text-gray-900 dark:text-white border-r">
                    <div className="flex justify-center items-center">
                        <div className="w-20 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                </td>
                <td className="text-center w-[50px]">
                    <div className="flex justify-center items-center rounded-full">
                        <div className="w-6 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                </td>
            </tr>
        </>
    );
}
