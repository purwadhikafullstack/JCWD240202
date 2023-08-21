import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export default function PrintStockLog({ data }) {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Stock Log',
        onAfterPrint: () => 'Print Success',
    });

    return (
        <>
            <button
                onClick={handlePrint}
                className="border border-gray-200 rounded-lg text-xs px-4"
            >
                Print Data
            </button>
            <div>
                <div className="hidden">
                    <div ref={componentRef}>
                        <div className="mt-5 mb-3">
                            <p className="text-3xl text-center font-bold mt-5 mb-3 text-txt-500">
                                Product Stock Log
                            </p>
                        </div>
                        <div className="mx-5 my-5">
                            <div className="mt-5 mr-3 bg-white">
                                <table className="w-full text-sm text-left text-gray-500 mt-5">
                                    <thead className="text-sm sm:text-lg text-gray-600 uppercase border border-black">
                                        <tr className=" divide-black divide-x">
                                            <th
                                                scope="col"
                                                className="py-3 px-3 text-sm text-center"
                                            >
                                                Date
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-3 text-sm text-center"
                                            >
                                                Product Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-3 text-sm text-center"
                                            >
                                                User
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-3 text-sm text-center"
                                            >
                                                Quantity
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-3 text-sm text-center"
                                            >
                                                Warehouse
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-3 text-sm text-center"
                                            >
                                                Type
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-3 text-sm text-center"
                                            >
                                                Information
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.map((value, index) => {
                                            return (
                                                <tr
                                                    key={index}
                                                    scope="row"
                                                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                                                >
                                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border border-black text-xs">
                                                        {value?.date}
                                                    </td>
                                                    <td className="px-6 py-4 border text-center border-black text-xs">
                                                        {value?.product_name}
                                                    </td>
                                                    <td className="px-6 py-4 border text-center border-black text-xs">
                                                        {value?.user}
                                                    </td>
                                                    <td className="px-6 py-4 border text-center border-black text-xs">
                                                        {value?.quantity}
                                                    </td>
                                                    <td className="px-6 py-4 border text-center border-black text-xs">
                                                        {value?.warehouse}
                                                    </td>
                                                    <td className="px-6 py-4 border text-center border-black text-xs">
                                                        {value?.type}
                                                    </td>
                                                    <td className="px-6 py-4 border text-center border-black text-xs">
                                                        {value?.information}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
