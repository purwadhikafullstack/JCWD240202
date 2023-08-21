import {
    Button,
    Dropdown,
    Modal,
    Rating,
    Select,
    Textarea,
    Tooltip,
} from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { SlArrowRight, SlArrowDown } from 'react-icons/sl';
import { BsTrash } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import {
    createReviewAsync,
    deleteReviewAsync,
    getUserReviewAsync,
} from '../../../redux/features/reviewSlice';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import ModalDeleteReview from './modalDeleteReview';

export default function ModalCreateReview(props) {
    const dispatch = useDispatch();
    const [productId, setProductId] = useState(0);
    const [rating, setRating] = useState(0);
    const _comment = useRef();
    const reviewData = useSelector((state) => state.review.userReviews);
    const [deleteModal, setDeleteModal] = useState(false);

    const closeProduct = () => {
        setProductId(0);
        setRating(0);
    };

    const openProduct = (id) => {
        setProductId(id);
        setRating(0);
    };

    const submitReview = () => {
        if (rating === 0 || _comment.current.value === '') {
            toast.error('Rating and Comment Field Cannot be Empty');
        } else {
            dispatch(
                createReviewAsync({
                    product_id: productId,
                    comment: _comment.current.value,
                    rating,
                    order_id: props?.data?.order_id,
                }),
            );
            setProductId(0);
            setRating(0);
            _comment.current.value = '';
        }
    };

    let star = [];
    if (reviewData?.data?.rating) {
        for (let i = 0; i < 5; i++) {
            if (i < reviewData?.data?.rating) {
                star.push(true);
            } else {
                star.push(false);
            }
        }
    }

    const deleteReview = () => {
        dispatch(deleteReviewAsync({ review_id: reviewData?.data?.id }));
        setProductId(0);
    };

    useEffect(() => {
        if (props?.data?.order_id !== 0) {
            dispatch(
                getUserReviewAsync({
                    order_id: props?.data?.order_id,
                    product_id: productId,
                }),
            );
        }
    }, [productId]);

    return (
        <Modal
            show={props?.state?.modalReview}
            onClose={() => {
                props?.state?.setModalReview(false);
                props?.state?.setOrderId(0);
                setProductId(0);
                setRating(0);
            }}
        >
            <Modal.Header>
                <div>Review Products</div>
            </Modal.Header>
            <Modal.Body>
                <div className="font-bold">Choose One : </div>
                {props?.data?.products?.map((value, index) => {
                    return reviewData?.data ? (
                        <React.Fragment key={index}>
                            <div className="border-y py-2 my-2">
                                <div
                                    onClick={() => {
                                        value?.product_id === productId
                                            ? closeProduct()
                                            : openProduct(value.product_id);
                                    }}
                                    className="hover:cursor-pointer flex items-center justify-between"
                                >
                                    <div>{value.product_name}</div>
                                    <div>
                                        {value.product_id === productId ? (
                                            <SlArrowDown />
                                        ) : (
                                            <SlArrowRight />
                                        )}
                                    </div>
                                </div>
                                {value.product_id === productId ? (
                                    <>
                                        <div className="pt-4 flex gap-4">
                                            {' '}
                                            <div className="h-48 w-48 flex items-center">
                                                <img
                                                    src={value.image}
                                                    alt="product_image"
                                                />
                                            </div>
                                            <div className="w-full flex flex-col gap-4 relative">
                                                <div>
                                                    <Rating size={'md'}>
                                                        {star.map(
                                                            (value, index) => {
                                                                return value ===
                                                                    true ? (
                                                                    <Rating.Star
                                                                        key={
                                                                            index
                                                                        }
                                                                    />
                                                                ) : (
                                                                    <Rating.Star
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="text-gray-200"
                                                                    />
                                                                );
                                                            },
                                                        )}
                                                    </Rating>
                                                </div>
                                                <div className="">
                                                    {reviewData?.data?.comment}
                                                </div>
                                                <div
                                                    onClick={() =>
                                                        setDeleteModal(true)
                                                    }
                                                    className="absolute bottom-0 right-5 hover:cursor-pointer hover:p-2 hover:bg-sky-700 hover:text-yellow-300 hover:rounded-full"
                                                >
                                                    <Tooltip content="Delete Review">
                                                        <BsTrash size={25} />
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </div>
                                        <ModalDeleteReview
                                            state={{
                                                deleteModal,
                                                setDeleteModal,
                                            }}
                                            func={{ deleteReview }}
                                        />
                                    </>
                                ) : (
                                    ''
                                )}
                            </div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment key={index}>
                            <div className="border-y py-2 my-2">
                                <div
                                    onClick={() => {
                                        value.product_id === productId
                                            ? closeProduct()
                                            : openProduct(value.product_id);
                                    }}
                                    className="hover:cursor-pointer flex items-center justify-between"
                                >
                                    <div>{value.product_name}</div>
                                    <div>
                                        {value.product_id === productId ? (
                                            <SlArrowDown />
                                        ) : (
                                            <SlArrowRight />
                                        )}
                                    </div>
                                </div>
                                {value.product_id === productId ? (
                                    <>
                                        <div className="pt-4 flex gap-4">
                                            {' '}
                                            <div className="h-48 w-48 flex items-center">
                                                <img
                                                    src={value.image}
                                                    alt="product_image"
                                                />
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                <div>
                                                    {' '}
                                                    <Rating
                                                        size={'md'}
                                                        className="hover:cursor-pointer"
                                                    >
                                                        {[1, 2, 3, 4, 5].map(
                                                            (value, index) => {
                                                                return (
                                                                    <React.Fragment
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {value <=
                                                                        rating ? (
                                                                            <Rating.Star
                                                                                onClick={() =>
                                                                                    setRating(
                                                                                        index +
                                                                                            1,
                                                                                    )
                                                                                }
                                                                            />
                                                                        ) : (
                                                                            <Rating.Star
                                                                                onClick={() =>
                                                                                    setRating(
                                                                                        index +
                                                                                            1,
                                                                                    )
                                                                                }
                                                                                className="text-gray-300"
                                                                            />
                                                                        )}
                                                                    </React.Fragment>
                                                                );
                                                            },
                                                        )}
                                                    </Rating>
                                                </div>
                                                <div className="w-full">
                                                    <Textarea
                                                        ref={_comment}
                                                        placeholder="Write Your Review Here"
                                                        className="h-[100px]"
                                                    ></Textarea>
                                                </div>
                                                <div>
                                                    <Button
                                                        onClick={submitReview}
                                                        className="bg-sky-700 text-yellow-200"
                                                    >
                                                        Submit
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    ''
                                )}
                            </div>
                        </React.Fragment>
                    );
                })}
            </Modal.Body>
            <Modal.Footer>
                <div
                    className="flex gap-4
                 justify-start items-center w-full"
                >
                    <Button
                        onClick={() => {
                            props?.state?.setModalReview(false);
                            props?.state?.setOrderId(0);
                            setProductId(0);
                            setRating(0);
                        }}
                        color={'light'}
                    >
                        Done
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
