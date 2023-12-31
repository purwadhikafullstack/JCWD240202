import { useDispatch } from 'react-redux';
import { MdDeleteForever } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import {  productDetailsAsync } from "../../../redux/features/productSlice";
import SkeletonProductAdmin from './skeletonProductAdmin';

export default function ComListProduct(props) {
    const dispatch = useDispatch()
    return (
        <>
            {props.product?.data?.rows?.map((value, index) => {
                if(props.loading) {
                    return (
                        <tr
                            key={index}
                            scope="row"
                            className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                        >
                            <td className="flex justify-center items-center w-[150px]">
                                <img
                                    alt="img"
                                    className="object-contain w-[150px] h-[100px]"
                                    src={value.product_images[0].name.startsWith('PIMG') ? process.env.REACT_APP_API_IMAGE_URL + value.product_images[0].name : value.product_images[0].name}
                                />
                            </td>
                            <td className="px-3 font-medium w-[250px] text-gray-900 dark:text-white border-x">
                                {value.name}
                            </td>
                            <td className="px-3 border-r w-[150px] text-ellipsis overflow-hidden">
                                {value.description.substring(0, 30)} ....
                            </td>
                            <td className="px-3 border-r w-[150px] text-center">
                                {value.category.name}
                            </td>
                            <td className="px-3 border-r w-[150px] text-center">
                                Rp. {value.price.toLocaleString('id')} ,-
                            </td>
                            <td className="px-3 border-r truncate w-[150px] text-xs">
                                <div className="flex flex-col">
                                    <div className="flex">
                                        Length: {value.length} cm
                                    </div>
                                    <div className="flex">
                                        Width: {value.width} cm
                                    </div>
                                    <div className="flex">
                                        Heigth: {value.height} cm
                                    </div>
                                    <div className="flex">
                                        Weigth: {value.weight} grams
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 w-[50px]">
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => {
                                            props.funcShow(true);
                                            props.funcData(value);
                                            dispatch(productDetailsAsync(value.id))
                                        }}
                                        className="flex justify-center text-[20px] pl-1 text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        <FaRegEdit />
                                    </button>
                                    <button onClick={() => { props.modalDelete(true);  props.funcData(value)}} className="flex justify-center text-[25px] text-red-500 dark:text-blue-500 hover:underline">
                                        <MdDeleteForever />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )
                } else {
                    return <SkeletonProductAdmin key={index}/>
                }
            })}
        </>
    );
}
