import { MdDeleteForever } from 'react-icons/md';
import { useSelector } from 'react-redux';
import SkeletonColorAdmin from './skeletonColorAdmin';

export default function ComListColor(props) {
    const color = useSelector((state) => state.homepage.color);
    return (
        <>
            {color?.data?.map((value, index) => {
                if(props.loading) {
                    return (
                        <tr
                            key={index}
                            scope="row"
                            className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                        >
                            <td style={{backgroundColor: `${value.color_code}`}} className={`flex justify-center items-center w-[100px] h-[100px]`}>
                            </td>
                            <td className="px-3 text-lg font-medium w-[200px] text-center text-gray-900 dark:text-white border-x">
                                {value.name}
                            </td>
                            <td className="px-3 text-lg font-medium w-[200px] text-center text-gray-900 dark:text-white border-r">
                                {value.color_code}
                            </td>
                            <td className="text-center w-[50px]">
                                <button
                                    onClick={() => {
                                        props.modalDelete(true);
                                        props.funcData(value);
                                    }}
                                    className="text-[25px] text-red-500"
                                >
                                    <MdDeleteForever />
                                </button>
                        </td>
                        </tr>
                    );
                } else {
                    return <SkeletonColorAdmin key={index}/>
                }
            })}
        </>
    );
}
