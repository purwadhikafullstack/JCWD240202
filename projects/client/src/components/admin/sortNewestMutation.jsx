import { Dropdown, Label, Radio } from 'flowbite-react';

export default function SortNewestMutation(props) {
    const handleSort = (sort) => {
        props?.data?.sortChange(sort);
    };
    return (
        <div className="sm:mb-0 mb-2">
            <Dropdown
                label={
                    props?.data?.sort === 'newest'
                        ? 'Newest'
                        : props?.data?.sort === 'oldest'
                        ? 'Oldest'
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
                            value={'newest'}
                            onChange={() => handleSort('newest')}
                            checked={
                                props?.data?.sort === 'newest' ? true : false
                            }
                        />
                        <Label>Newest</Label>
                    </div>
                    <div className="flex gap-3 items-center mb-2">
                        <Radio
                            id="name"
                            name="sort"
                            value={'oldest'}
                            onChange={() => handleSort('oldest')}
                            checked={
                                props?.data?.sort === 'oldest' ? true : false
                            }
                        />
                        <Label>Oldest</Label>
                    </div>
                </div>
            </Dropdown>
        </div>
    );
}
