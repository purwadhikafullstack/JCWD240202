import { Dropdown, Label, Radio } from 'flowbite-react';
import { useState } from 'react';

export default function SortAdmin(props) {
    const handleSort = (sort) => {
        props?.data?.sortChange(sort);
    };
    return (
        <>
            <Dropdown
                label={
                    props?.data?.sort === 'name-asc'
                        ? 'A-Z'
                        : props?.data?.sort === 'name-desc'
                        ? 'Z-A'
                        : 'Sort'
                }
                className="px-5 text-center"
                color="light"
                size="sm"
            >
                <div className="flex flex-col gap-2 mt-2">
                    <div className="flex gap-3 items-center mb-2">
                        <Radio
                            id="name"
                            name="sort"
                            value={'name-asc'}
                            onChange={() => handleSort('name-asc')}
                            checked={
                                props?.data?.sort === 'name-asc' ? true : false
                            }
                        />
                        <Label>A-Z</Label>
                    </div>
                    <div className="flex gap-3 items-center mb-2">
                        <Radio
                            id="name"
                            name="sort"
                            value={'name-desc'}
                            onChange={() => handleSort('name-desc')}
                            checked={
                                props?.data?.sort === 'name-desc' ? true : false
                            }
                        />
                        <Label>Z-A</Label>
                    </div>
                </div>
            </Dropdown>
        </>
    );
}
