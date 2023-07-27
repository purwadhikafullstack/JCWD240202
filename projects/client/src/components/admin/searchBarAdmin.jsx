// import { useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRef, useState } from 'react';

export default function SearchBarAdmin(props) {
    const _search = useRef();

    const handleSearch = () => {
        props?.data?.searchChange(_search.current.value);
    };

    return (
        <div className="flex gap-1 items-center sm:mb-0 mb-2">
            <div>
                <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered w-full max-w-[150px] h-9"
                    ref={_search}
                />
            </div>
            <div
                onClick={handleSearch}
                className="border p-2 rounded-lg bg-[#0051BA] text-yellow-300 hover:cursor-pointer"
            >
                <AiOutlineSearch size={18} />
            </div>
        </div>
    );
}
