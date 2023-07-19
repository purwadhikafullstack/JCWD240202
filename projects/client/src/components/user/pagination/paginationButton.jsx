import { useState } from 'react';
import { Pagination } from 'flowbite-react';

export default function PaginationButton(props) {
    const [currentPage, setCurrentPage] = useState(1);
    // const onPageChange = (page) => setCurrentPage(page);

    return (
        <Pagination
            currentPage={currentPage}
            onPageChange={(page) => {
                setCurrentPage(page);
            }}
            totalPages={props.data}
        />
    );
}
