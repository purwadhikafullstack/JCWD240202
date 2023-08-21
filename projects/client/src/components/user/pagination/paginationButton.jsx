import Pagination from '@mui/material/Pagination';

export default function PaginationButton(props) {
    return (
        <>
            <Pagination
                count={props?.data?.totalPage ? props?.data?.totalPage : 0}
                page={props?.data?.page ? props?.data?.page : 0}
                variant="outlined"
                shape="rounded"
                onChange={props?.data?.pageChange}
            />
        </>
    );
}
