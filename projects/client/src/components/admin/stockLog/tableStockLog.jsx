import SkeletonStockLog from './skeletonStockLog';

const moment = require('moment');

export default function TableStockLog({ data, loading }) {
    return (
        <>
            {data?.rows?.map((value, index) => {
                if(loading) {
                    return (
                        <tr
                            key={index}
                            scope="row"
                            className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                        >
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-r">
                                {moment(new Date(value.createdAt)).format(
                                    'DD MMM YYYY',
                                )}
                            </td>
                            <td className="px-6 py-4 border-r text-center">
                                {value?.product?.name}
                            </td>
                            <td className="px-6 py-4 border-r text-center">
                                {value?.user?.role?.name.replace(/\b\w/g, (char) =>
                                    char.toUpperCase(),
                                )}
                            </td>
                            <td className="px-6 py-4 border-r text-center">{value?.quantity}</td>
                            <td className="px-6 py-4 border-r text-center">
                                {value?.warehouse?.city}
                            </td>
                            <td className="px-6 py-4 border-r text-center">
                                {value?.type?.name}
                            </td>
                            <td className="px-6 py-4 border-r text-center">
                                {value?.information?.name}
                            </td>
                        </tr>
                    )
                } else {
                    return <SkeletonStockLog key={index}/>
                }
            })}
        </>
    );
}
