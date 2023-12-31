import { BsTrash } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import {
    modifyQuantityAsync,
    userDeleteProductCartAsync,
} from '../../../redux/features/cartSlice';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import ModalDeleteCart from './modalDeleteCart';

export default function CartTable(props) {
    const dispatch = useDispatch();
    const [modalDelete, setModalDelete] = useState(false);

    const deleteProductFromCart = () => {
        dispatch(
            userDeleteProductCartAsync({
                id: props.data.value.product.id,
            }),
        );
    };

    return (
        <>
            {props.data.value.product.total_stock === 0
                ? props.data?.setUnavailableProduct(true)
                : ''}
            <div className="lg:h-[205px] mt-4 pb-4 flex border-b relative">
                <Toaster />
                <div className="flex-2 max-md:hidden">
                    <img
                        src={
                            props.data.value.image.startsWith('PIMG')
                                ? process.env.REACT_APP_API_IMAGE_URL +
                                  props.data.value.image
                                : props.data.value.image
                        }
                        alt="..."
                        className="h-[200px] w-[200px]"
                    />
                </div>
                <div className=" flex-1 md:px-9 py-2 relative flex flex-col gap-2">
                    <div className="font-bold sm:text-xl max-sm:text-lg">
                        {props.data.value.product_name}
                    </div>
                    <div>{props.data.value.product.category.name}</div>
                    <div className="font-bold">
                        Rp {props.data.value.price.toLocaleString('ID-id')}
                    </div>
                    <div className="absolute bottom-0 max-md:hidden">
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
                {props?.data?.value?.product?.total_stock === 0 ? (
                    ''
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="flex border gap-9 p-4 rounded-full items-center">
                            <div
                                onClick={() => {
                                    props?.data?.value?.quantity === 1
                                        ? setModalDelete(true)
                                        : dispatch(
                                              modifyQuantityAsync({
                                                  id: props.data.value.product
                                                      .id,
                                                  quantity: -1,
                                              }),
                                          );
                                }}
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
                )}

                {props?.data?.value?.product?.total_stock === 0 ? (
                    <>
                        <div className="md:flex-2 w-[200px] flex flex-col items-center justify-center text-xl font-bold">
                            <div className=" line-through">
                                Rp{' '}
                                {(
                                    props.data.value.price *
                                    props.data.value.quantity
                                ).toLocaleString('ID-id')}
                            </div>
                            <div className="text-red-700">Out Of Stock!</div>
                        </div>
                        <div className="absolute bottom-2 right-0 flex gap-4 items-center">
                            <div className="underline hover:cursor-pointer">
                                move to wishlist
                            </div>
                            <div
                                onClick={() => setModalDelete(true)}
                                className="hover:border hover:p-2 hover:rounded-full hover:bg-sky-700 hover:text-yellow-200 hover:cursor-pointer"
                            >
                                <BsTrash size={20} />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex-1 w-[200px] flex items-center justify-center sm:text-xl max-sm:text-md font-bold">
                            Rp{' '}
                            {(
                                props.data.value.price *
                                props.data.value.quantity
                            ).toLocaleString('ID-id')}
                        </div>
                        <div
                            onClick={() => setModalDelete(true)}
                            className="absolute bottom-2 right-0 hover:border hover:p-2 hover:rounded-full hover:bg-sky-700 hover:text-yellow-200 hover:cursor-pointer"
                        >
                            <BsTrash size={20} />
                        </div>
                    </>
                )}
            </div>
            <ModalDeleteCart
                data={{
                    show: modalDelete,
                    setModalDelete,
                    deleteProductFromCart,
                }}
            />
        </>
    );
}
