export default function ProductDescription(props) {
    return (
        <>
            <div className="text-2xl font-bold">
                {props?.data?.proDetails?.data?.name}
            </div>
            <div>
                {props?.data?.proDetails?.data?.length} cm x{' '}
                {props?.data?.proDetails?.data?.width} cm x{' '}
                {props?.data?.proDetails?.data?.height} cm
            </div>
            <div className="pt-4 font-bold text-lg">
                Rp {(props?.data?.proDetails?.data?.price).toLocaleString('id')}
            </div>
            <div className="pt-4 text-md flex items-center gap-2">
                <div className="h-9 w-9 border bg-black"></div>
                <div>{props?.data?.proDetails?.data?.color?.name}</div>
            </div>
            <div className="pt-4 text-lg">
                {props?.data?.proDetails?.data?.description}
            </div>
        </>
    );
}
