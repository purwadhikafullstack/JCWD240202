import { Button, Modal, Select } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import ReviewLists from './reviewLists';
import SelectRating from './selectRating';
import PaginationButton from '../pagination/paginationButton';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getReviewsAsync } from '../../../redux/features/reviewSlice';

export default function ModalReviewLists(props) {
    const dispatch = useDispatch();
    const allReviewData = useSelector((state) => state.review.reviews);
    const [page, setPage] = useState(1);
    const [rating, setRating] = useState('');
    const [sort, setSort] = useState('');

    const pageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        dispatch(
            getReviewsAsync({
                product_id: props?.data?.product_id,
                rating,
                sort,
                page,
            }),
        );
    }, [page, rating, sort]);
    return (
        <>
            <Modal
                show={props?.state?.allReview}
                onClose={() => {
                    setPage(1);
                    props?.state?.setAllReview(false);
                }}
            >
                <Modal.Header>All Reviews</Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="flex justify-end gap-4 mb-2">
                            <div>
                                <SelectRating state={{ setRating, setPage }} />
                            </div>
                            <div>
                                <Select
                                    onChange={(e) => setSort(e.target.value)}
                                    className="font-bold"
                                >
                                    <option value={'newest'}>Newest</option>
                                    <option value={'oldest'}>Oldest</option>
                                    <option value={'highest'}>
                                        Highest Rating
                                    </option>
                                    <option value={'lowest'}>
                                        Lowest Rating
                                    </option>
                                </Select>
                            </div>
                        </div>
                        {allReviewData?.data?.rows?.map((value, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <ReviewLists data={{ value }} />
                                </React.Fragment>
                            );
                        })}
                    </div>
                    <div className="flex items-center justify-center">
                        <PaginationButton
                            data={{
                                totalPage: allReviewData?.totalPage,
                                page,
                                pageChange,
                            }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => {
                            setPage(1);
                            props?.state?.setAllReview(false);
                        }}
                        color={'light'}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
