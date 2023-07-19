export default function SortButton() {
    return (
        <select className="select select-bordered w-full max-w-xs">
            <option selected>Sort</option>
            <option>Name : A - Z</option>
            <option>Name : Z - A</option>
            <option>Price : High - Low</option>
            <option>Price : Low - High</option>
        </select>
    );
}
