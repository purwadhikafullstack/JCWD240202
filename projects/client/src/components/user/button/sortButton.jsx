import { Dropdown, Label, Radio } from 'flowbite-react';
import { useState } from 'react';

export default function SortButton(props) {
    const [name, setName] = useState('');

    const handleSort = (sort) => {
        props?.data?.sortChange(sort);
        setName(sort);
    };

    return (
        <Dropdown
            label={props.data?.sort === '' ? 'Sort' : props.data?.sort}
            className="px-5"
            color="light"
        >
            <div className="flex flex-col gap-2 mt-2">
                <div className="flex gap-3 items-center mb-2">
                    <Radio
                        id="all"
                        name="sort"
                        value={''}
                        onClick={() => handleSort('')}
                        defaultChecked={props.data?.sort === '' ? true : false}
                    />
                    <Label>Off</Label>
                </div>
                <div className="flex gap-3 items-center mb-2">
                    <Radio
                        id="price"
                        name="sort"
                        value={'price-asc'}
                        onClick={() => handleSort('price-asc')}
                        defaultChecked={
                            props.data?.sort === 'price-asc' ? true : false
                        }
                    />
                    <Label>Lowest Price</Label>
                </div>
                <div className="flex gap-3 items-center mb-2">
                    <Radio
                        id="price"
                        name="sort"
                        value={'price-desc'}
                        onClick={() => handleSort('price-desc')}
                        defaultChecked={
                            props.data?.sort === 'price-desc' ? true : false
                        }
                    />
                    <Label>Highest Price</Label>
                </div>
                <div className="flex gap-3 items-center mb-2">
                    <Radio
                        id="name"
                        name="sort"
                        value={'name-asc'}
                        onClick={() => handleSort('name-asc')}
                        defaultChecked={
                            props.data?.sort === 'name-asc' ? true : false
                        }
                    />
                    <Label>A-Z</Label>
                </div>
                <div className="flex gap-3 items-center mb-2">
                    <Radio
                        id="name"
                        name="sort"
                        value={'name-desc'}
                        onClick={() => handleSort('name-desc')}
                        defaultChecked={
                            props.data?.sort === 'name-desc' ? true : false
                        }
                    />
                    <Label>Z-A</Label>
                </div>
                <div className="flex gap-3 items-center mb-2">
                    <Radio
                        id="name"
                        name="sort"
                        value={'newest'}
                        onClick={() => handleSort('newest')}
                        defaultChecked={
                            props.data?.sort === 'newest' ? true : false
                        }
                    />
                    <Label>Newest</Label>
                </div>
                <div className="flex gap-3 items-center mb-2">
                    <Radio
                        id="name"
                        name="sort"
                        value={'oldest'}
                        onClick={() => handleSort('oldest')}
                        defaultChecked={
                            props.data?.sort === 'oldest' ? true : false
                        }
                    />
                    <Label>Oldest</Label>
                </div>
            </div>
        </Dropdown>
    );
}
