import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IoMdArrowBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
    getNewItemsAsync,
    modifyQuantityAsync,
} from '../../../redux/features/cartSlice';
import { Button } from 'flowbite-react';
import { productRecommenadationAsync } from '../../../redux/features/productSlice';
import SidebarRelatedProducts from './sidebarRelatedProducts';
import { useNavigate } from 'react-router-dom';

export default function AfterAddCart(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const newItems = useSelector((state) => state.cart.newItem);
    const related = useSelector((state) => state.product.recommendations);
    const id = newItems?.data[0]?.product?.id;

    useEffect(() => {
        if (props?.state?.addNewItem === true) {
            dispatch(getNewItemsAsync());
            if (id) {
                dispatch(productRecommenadationAsync(id));
            }
            document.body.classList.add('overflow-hidden');
        } else if (props?.state?.addNewItem === false) {
            document.body.classList.remove('overflow-hidden');
        }

        return () => document.body.classList.remove('overflow-hidden');
    }, [id, props?.state?.addNewItem]);
    return (
        <div
            className={`fixed top-[100px] right-0 h-screen lg:w-[750px] max-lg:w-full border bg-white ${
                props?.state?.addNewItem === true
                    ? 'translate-x-0'
                    : 'translate-x-full'
            } transition-transform ease-in-out duration-1000`}
        >
            <div className="bg-sky-700 text-yellow-300 h-[50px] p-9 font-bold text-xl flex items-center">
                <div
                    onClick={() => props?.state?.setAddNewItem(false)}
                    className="flex-2 flex items-center justify-center hover:cursor-pointer"
                >
                    <AiOutlineClose size={25} />
                </div>
                <div className="flex-1 flex justify-center">
                    You added a new item to cart
                </div>
            </div>
            <div className="px-9">
                <div className="flex border-y my-9 py-4 px-4 items-center gap-2">
                    <div>
                        <img
                            src={
                                newItems?.data[newItems?.data?.length - 1].image
                            }
                            alt="product_image"
                            className="w-36 h-36 max-sm:w-24 max-sm:h-24"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-bold">
                            {
                                newItems?.data[newItems?.data?.length - 1]
                                    .product_name
                            }
                        </div>
                        <div>
                            {
                                newItems?.data[newItems?.data.length - 1]
                                    .product?.category?.name
                            }
                        </div>
                        <div>
                            Rp{' '}
                            {newItems?.data[
                                newItems?.data?.length - 1
                            ].price.toLocaleString('ID-id')}
                        </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <div className="flex-1 flex items-center justify-center">
                            <div className="flex border gap-9 p-4 px-9 rounded-full items-center">
                                <div>
                                    {
                                        newItems?.data[
                                            newItems?.data?.length - 1
                                        ].quantity
                                    }{' '}
                                    items
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex max-sm:flex-col max-sm:gap-2">
                    <div className="flex-1 flex justify-start">
                        <Button
                            pill
                            color={'light'}
                            className="w-[200px] h-[60px] max-sm:w-full"
                            onClick={() => props?.state?.setAddNewItem(false)}
                        >
                            <div className="text-lg flex items-center gap-2">
                                <IoMdArrowBack size={25} />
                                Keep Shopping
                            </div>
                        </Button>
                    </div>
                    <div className="flex-1 flex justify-center max-sm:order-first max-sm:w-full">
                        <Button
                            pill
                            onClick={() => {
                                navigate('/cart');
                            }}
                            className="lg:w-[400px] sm:w-max max-sm:w-full h-[60px] bg-sky-700 text-yellow-300"
                        >
                            <div className="text-xl flex items-center gap-4">
                                <AiOutlineShoppingCart size={25} />
                                Checkout Cart{' '}
                            </div>
                        </Button>
                    </div>
                </div>
                <div className="lg:mt-7 sm:mt-4 max-lg:mt-4">
                    <div className="text-lg font-bold">Related Products</div>
                    <div className="lg:mt-9 max-lg:mt-2 flex gap-2 justify-evenly">
                        {related?.data?.map((value, index) => {
                            if (index < 3) {
                                return (
                                    <SidebarRelatedProducts
                                        key={index}
                                        data={{ value }}
                                    />
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
