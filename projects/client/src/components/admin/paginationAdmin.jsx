import Pagination from '@mui/material/Pagination';

export default function PaginationAdmin(props) {
    return (
        <>
            <Pagination
                count={props?.data?.totalPage}
                page={props?.data?.page}
                variant="outlined"
                shape="rounded"
                onChange={props?.data?.pageChange}
            />
        </>
    );
}
