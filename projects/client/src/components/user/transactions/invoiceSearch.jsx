import { useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

export default function InvoiceSearch(props) {
    const _search = useRef();
    return (
        <div className="flex gap-2 items-center">
            <div>
                <input
                    type="text"
                    placeholder="Search Invoice"
                    className="input input-bordered w-full max-w-xs h-[45px]"
                    ref={_search}
                />
            </div>
            <div
                onClick={() => {
                    props?.state?.setSearch(_search.current.value);
                    props?.state?.setPage(1);
                }}
                className="border p-2 rounded-lg bg-sky-700 text-yellow-300 hover:cursor-pointer"
            >
                <AiOutlineSearch size={25} />
            </div>
        </div>
    );
}
