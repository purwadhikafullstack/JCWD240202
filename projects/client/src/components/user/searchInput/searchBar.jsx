import { useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

export default function SearchBar(props) {
    const _search = useRef();
    const handleSearch = () => {
        const search = _search.current.value;
        props?.data?.searchChange(search);
    };

    return (
        <div className="flex gap-2 items-center">
            <div>
                <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered w-full max-w-xs h-[45px]"
                    ref={_search}
                />
            </div>
            <div
                onClick={handleSearch}
                className="border p-2 rounded-lg bg-sky-700 text-yellow-300 hover:cursor-pointer"
            >
                <AiOutlineSearch size={25} />
            </div>
        </div>
    );
}
