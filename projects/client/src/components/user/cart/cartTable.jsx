import { BsTrash } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import {
    modifyQuantityAsync,
    userDeleteProductCartAsync,
} from '../../../redux/features/cartSlice';
import { Toaster } from 'react-hot-toast';
export default function CartTable(props) {
    const dispatch = useDispatch();

    return (
        <div className="h-[205px] mt-4 pb-4 flex border-b relative">
            <Toaster />
            <div className="flex-2">
                <img
                    src={props.data.value.image}
                    alt="..."
                    className="h-[200px] w-[200px]"
                />
            </div>
            <div className=" flex-1 px-9 py-2 relative flex flex-col gap-2">
                <div className="font-bold text-xl">
                    {props.data.value.product_name}
                </div>
                <div>{props.data.value.product.category.name}</div>
                <div className="font-bold">
                    Rp {props.data.value.price.toLocaleString('ID-id')}
                </div>
                <div className="absolute bottom-0">
                    <div className="text-sm">
                        Weight : {props.data.value.product.weight / 1000} kg
                    </div>
                    <div className="text-sm">
                        Total Weight:{' '}
                        {(
                            (props.data.value.product.weight / 1000) *
                            props.data.value.quantity
                        ).toFixed(2)}{' '}
                        kg
                    </div>
                </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
                <div className="flex border gap-9 p-4 rounded-full items-center">
                    <div
                        onClick={() =>
                            dispatch(
                                modifyQuantityAsync({
                                    id: props.data.value.product.id,
                                    quantity: -1,
                                }),
                            )
                        }
                        className="text-xl hover:cursor-pointer"
                    >
                        -
                    </div>
                    <div>{props.data.value.quantity}</div>
                    <div
                        onClick={() =>
                            dispatch(
                                modifyQuantityAsync({
                                    id: props.data.value.product.id,
                                    quantity: +1,
                                }),
                            )
                        }
                        className="text-xl hover:cursor-pointer"
                    >
                        +
                    </div>
                </div>
            </div>
            <div className="flex-2 w-[200px] flex items-center justify-center text-xl font-bold">
                Rp{' '}
                {(
                    props.data.value.price * props.data.value.quantity
                ).toLocaleString('ID-id')}
            </div>
            <div
                onClick={() =>
                    dispatch(
                        userDeleteProductCartAsync({
                            id: props.data.value.product.id,
                        }),
                    )
                }
                className="absolute bottom-2 right-0 hover:border hover:p-2 hover:rounded-full hover:bg-sky-700 hover:text-yellow-200 hover:cursor-pointer"
            >
                <BsTrash size={20} />
            </div>
        </div>
    );
}