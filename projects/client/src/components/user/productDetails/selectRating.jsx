import { Dropdown, Rating, Select } from 'flowbite-react';
import { useState } from 'react';

export default function SelectRating(props) {
    const [filter, setFilter] = useState('');
    return (
        <Dropdown
            label={`${filter ? filter : 'Filter Rating'}`}
            color={'light'}
        >
            <Dropdown.Item
                onClick={() => {
                    props?.state?.setRating('');
                    props?.state?.setPage(1);
                    setFilter(null);
                }}
            >
                ALL REVIEWS
            </Dropdown.Item>
            <Dropdown.Item
                onClick={() => {
                    props?.state?.setRating(1);
                    props?.state?.setPage(1);
                    setFilter('Rating : 1');
                }}
            >
                <Rating>
                    <Rating.Star />
                </Rating>
            </Dropdown.Item>
            <Dropdown.Item
                onClick={() => {
                    props?.state?.setRating(2);
                    props?.state?.setPage(1);
                    setFilter('Rating : 2');
                }}
            >
                <Rating>
                    <Rating.Star />
                    <Rating.Star />
                </Rating>
            </Dropdown.Item>
            <Dropdown.Item
                onClick={() => {
                    props?.state?.setRating(3);
                    props?.state?.setPage(1);
                    setFilter('Rating : 3');
                }}
            >
                <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                </Rating>
            </Dropdown.Item>
            <Dropdown.Item
                onClick={() => {
                    props?.state?.setRating(4);
                    props?.state?.setPage(1);
                    setFilter('Rating : 4');
                }}
            >
                <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                </Rating>
            </Dropdown.Item>
            <Dropdown.Item
                onClick={() => {
                    props?.state?.setRating(5);
                    props?.state?.setPage(1);
                    setFilter('Rating : 5');
                }}
            >
                <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                </Rating>
            </Dropdown.Item>
        </Dropdown>
    );
}
