// import { useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';

export default function SearchBarAdmin(props) {
    const [search, setSearch] = useState('');

    const handleSearch = () => {
        props?.data?.searchChange(search);
        setSearch('');
    };

    return (
        <div className="flex gap-1 items-center">
            <div>
                <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered w-full max-w-[150px] h-9"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
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
