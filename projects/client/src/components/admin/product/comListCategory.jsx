import { useSelector } from 'react-redux';
import { MdDeleteForever } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import SkeletonCategoryAdmin from './skeletonCategoryAdmin';

export default function ComListCategory(props) {
    const categories = useSelector((state) => state.homepage.category);

    return (
        <>
            {categories?.data?.map((value, index) => {
                if(props.loading) {
                    return (
                        <tr
                            key={index}
                            scope="row"
                            className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                        >
                            <td className="flex justify-center items-center border-r">
                                <img
                                    alt="img"
                                    className="object-contain"
                                    src={
                                        value.image.startsWith('PIMG')
                                            ? process.env
                                                  .REACT_APP_API_IMAGE_URL +
                                              value.image
                                            : value.image
                                    }
                                />
                            </td>
                            <td className="px-3 text-lg font-medium w-[200px] text-center text-gray-900 dark:text-white border-r">
                                {value.name}
                            </td>
                            <td className="px-6 w-[50px]">
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => {
                                            props.funcShow(true);
                                            props.funcData(value);
                                        }}
                                        className="flex justify-center text-[22px] pl-1 text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        <FaRegEdit />
                                    </button>
                                    <button
                                        onClick={() => {
                                            props.modalDelete(true);
                                            props.funcData(value);
                                        }}
                                        className="flex justify-center text-[25px] text-red-500 dark:text-blue-500 hover:underline"
                                    >
                                        <MdDeleteForever />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    );
                } else {
                    return <SkeletonCategoryAdmin key={index}/>
                }
            })}
        </>
    );
}
