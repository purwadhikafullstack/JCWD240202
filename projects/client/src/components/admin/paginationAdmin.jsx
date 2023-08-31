import Pagination from '@mui/material/Pagination';

export default function PaginationAdmin(props) {
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
