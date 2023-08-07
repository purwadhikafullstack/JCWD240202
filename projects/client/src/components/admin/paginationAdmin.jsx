import Pagination from '@mui/material/Pagination';
// import { useEffect } from 'react';

export default function PaginationAdmin(props) {
    // useEffect(() => {
    //     if (props?.data?.page > props?.data?.totalPage) {
    //         props?.data?.setPage(1);
    //     }
    // }, [props?.data?.page, props?.data?.totalPage]);

    return (
        <>
            <Pagination
                count={props?.data?.totalPage || 0}
                page={props?.data?.page ? props?.data?.page : 1}
                variant="outlined"
                shape="rounded"
                onChange={props?.data?.pageChange}
            />
        </>
    );
}
