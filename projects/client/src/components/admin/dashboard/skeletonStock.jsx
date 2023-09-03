import { Table } from 'flowbite-react';

export default function SkeletonStock() {
    return (
        <div className="w-full h-inherit p-4 bg-white rounded-2xl shadow-xl h-full">
            <div className="flex gap-4 items-center animate-pulse">
                <div className="h-9 w-9 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                <div className="font-bold text-xl w-1/3 h-9 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            </div>
            <div className="pt-4 h-48 w-full bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        </div>
    );
}
