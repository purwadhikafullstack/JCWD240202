import { AiOutlineSearch } from 'react-icons/ai';
import { useEffect, useRef } from 'react';

export default function SearchTransaction(props) {
    const _search = useRef();

    const handleSearch = () => {
        props?.data?.searchChange(_search.current.value);
    };

    useEffect(() => {
        _search.current.value = props.data?.search || '';
    }, [props.data?.search]);

    return (
        <div className="flex gap-1 items-center sm:mb-0 mb-2">
            <div>
                <input
                    type="text"
                    placeholder="Search invoice"
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