import { Dropdown, Label, Radio } from 'flowbite-react';

export default function DropdownSort(props) {
    return (
        <>
            <div>
                <Dropdown
                    label={ props?.data?.sort ? props?.data?.sort : 'Sort' }
                    className="px-5 text-center"
                    color="light"
                    size="sm"
                >
                    <div className="flex flex-col gap-2 mt-2">
                        <div
                            className="flex w-full gap-3 items-center mb-4 cursor-pointer"
                            onClick={()=> props?.data?.handleSort('Newest')}
                        >
                            Newest
                        </div>
                        <div
                            className="flex w-full gap-3 items-center mb-4 cursor-pointer"
                            onClick={()=> props?.data?.handleSort('Oldest')}
                        >
                            Oldest
                        </div>
                    </div>
                </Dropdown>
            </div>
        </>
    );
}
