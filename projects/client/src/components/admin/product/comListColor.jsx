import { MdDeleteForever } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

export default function ComListColor(props) {
    const color = useSelector((state) => state.homepage.color);
    return (
        <>
            {color?.data?.map((value, index) => {
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
                        {/* <div className="flex flex-col gap-2">
                            <button
                                // onClick={() => {
                                //     props.funcShow(true);
                                //     props.funcData(value);
                                // //     dispatch(productDetailsAsync(value.id));
                                // }}
                                className="flex justify-center text-[22px] pl-1 text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                <FaRegEdit />
                            </button>
                            </div> */}
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
            })}
        </>
    );
}
