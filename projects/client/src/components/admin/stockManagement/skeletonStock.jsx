export default function SkeletonStock({ params, dataLogin }) {
    return (
        <>
            <tr className="bg-white border-b animate-pulse" scope="row">
                <td className="py-4 border-r flex justify-center">
                    <div className="w-[80px] h-[80px] rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                </td>
                <td className="py-4 border-r">
                    <div className="flex justify-center items-center">
                        <div className="w-56 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                </td>
                <td className="py-4 border-r text-center">
                    <div className="flex justify-center items-center">
                        <div className="w-32 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                </td>
                {!params.warehouse && dataLogin?.role_id === 3 ? (
                    <></>
                ) : (
                    <td className="py-4 border-r text-center">
                        <div className="flex justify-center items-center">
                            <div className="w-12 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                        </div>
                    </td>
                )}
                {!params.warehouse && dataLogin?.role_id === 3 ? (
                    <td className="py-4 border-r text-center">
                        <div className="flex justify-center items-center">
                            <div className="w-12 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                        </div>
                    </td>
                ) : (
                    <td className="py-4 border-r text-center">
                        <div className="flex justify-center items-center">
                            <div className="w-12 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                        </div>
                    </td>
                )}
                {!params.warehouse && dataLogin?.role_id === 3 ? (
                    <></>
                ) : (
                    <td className="pl-3 py-4">
                        <div className="w-full flex items-center justify-center">
                            <div className="flex justify-center items-center mr-3 rounded-full">
                                <div className="w-6 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                            </div>
                            <div className="flex justify-center items-center mr-3 rounded">
                                <div className="w-6 h-6 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
                            </div>
                        </div>
                    </td>
                )}
            </tr>
        </>
    );
}
