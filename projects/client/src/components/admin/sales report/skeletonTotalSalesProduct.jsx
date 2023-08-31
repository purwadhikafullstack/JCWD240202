import { Table } from 'flowbite-react';

export default function SkeletonTotalSalesProduct() {
    return (
        <>
            <div className="shadow-lg flex-1 w-full h-inherit bg-white rounded-2xl p-4">
                <div className="sm:flex justify-between animate-pulse mb-3">
                    <div className="flex gap-2 items-center mb-3 sm:mb-0">
                        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                        <div className="w-52 h-6 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-44 h-8 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                    </div>
                </div>
                <div className="w-full h-[400px] bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            </div>
        </>
    );
}
