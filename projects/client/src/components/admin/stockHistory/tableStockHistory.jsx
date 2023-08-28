import SkeletonStockHistory from './skeletonStockHistory';

export default function TableStockHistory({ data, loading }) {
    return (
        <>
            {data?.getProduct?.rows.map((value, index) => {
                if (loading) {
                    return (
                        <tr
                            key={index}
                            scope="row"
                            className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                        >
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-r">
                                {value.name}
                            </td>
                            <td className="px-6 py-4 border-r text-center">
                                {value.category?.name}
                            </td>
                            <td className="px-6 py-4 border-r text-center">{data?.addition[index]}</td>
                            <td className="px-6 py-4 border-r text-center">{data?.reduction[index]}</td>
                            <td className="px-6 py-4 border-r text-center">{data?.final_stock[index]}</td>
                        </tr>
                    )
                } else {
                    return <SkeletonStockHistory key={index}/>
                }
            })}

        </>
    );
}
