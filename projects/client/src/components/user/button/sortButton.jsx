import { Dropdown, Label, Radio } from 'flowbite-react';
import { useState } from 'react';

export default function SortButton(props) {
    const [name, setName] = useState('');

    const handleSort = (sort) => {
        props?.data?.sortChange(sort);
        setName(sort);
    };

    return (
        <Dropdown label="Sort" className="px-5" color="light">
            <div className="flex flex-col gap-2 mt-2">
                <div className="flex gap-3 items-center mb-2">
                    <Radio
                        id="all"
                        name="sort"
                        value={''}
                        onClick={() => handleSort('')}
                        checked={name === '' ? true : false}
                    />
                    <Label>Off</Label>
                </div>
                <div className="flex gap-3 items-center mb-2">
                    <Radio
                        id="price"
                        name="sort"
                        value={'price-asc'}
                        onClick={() => handleSort('price-asc')}
                        checked={name === 'price-asc' ? true : false}
                    />
                    <Label>Lowest Price</Label>
                </div>
                <div className="flex gap-3 items-center mb-2">
                    <Radio
                        id="price"
                        name="sort"
                        value={'price-desc'}
                        onClick={() => handleSort('price-desc')}
                        checked={name === 'price-desc' ? true : false}
                    />
                    <Label>Highest Price</Label>
                </div>
                <div className="flex gap-3 items-center mb-2">
                    <Radio
                        id="name"
                        name="sort"
                        value={'name-asc'}
                        onClick={() => handleSort('name-asc')}
                        checked={name === 'name-asc' ? true : false}
                    />
                    <Label>A-Z</Label>
                </div>
                <div className="flex gap-3 items-center mb-2">
                    <Radio
                        id="name"
                        name="sort"
                        value={'name-desc'}
                        onClick={() => handleSort('name-desc')}
                        checked={name === 'name-desc' ? true : false}
                    />
                    <Label>Z-A</Label>
                </div>
            </div>
        </Dropdown>
    );
}
