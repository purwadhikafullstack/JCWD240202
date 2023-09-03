import { Dropdown } from 'flowbite-react';

export default function DropdownSort(props) {
    return (
        <>
            <div>
                <Dropdown
                    label={ props?.data?.sort ? props?.data?.sort : 'Sort' }
                    className="text-center"
                    color="light"
                    size="sm"
                >
                    <div className="flex flex-col">
                        <div
                            className="flex w-full justify-center items-center cursor-pointer hover:bg-gray-200 py-1"
                            onClick={()=> props?.data?.handleSort('Newest')}
                        >
                            Newest
                        </div>
                        <div
                            className="flex w-full justify-center items-center cursor-pointer hover:bg-gray-200 py-1"
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
