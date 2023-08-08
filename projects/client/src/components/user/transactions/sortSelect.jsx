import { Select } from 'flowbite-react';
import { ImSortAmountAsc } from 'react-icons/im';

export default function SortTransactionSelect(props) {
    return (
        <>
            <div>
                <ImSortAmountAsc size={25} />
            </div>
            <div>
                <Select
                    onChange={(e) =>
                        props?.state?.setSortTransaction(e.target.value)
                    }
                    className="w-[200px]"
                >
                    <option value={''}>Sort Transaction</option>
                    <option value={'newest'}>Newest</option>
                    <option value={'oldest'}>Oldest</option>
                </Select>
            </div>
        </>
    );
}
