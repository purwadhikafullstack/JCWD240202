import { Helmet } from 'react-helmet';

export default function ProductDescription(props) {
    return (
        <>
            <Helmet>
                <title>{`IKEWA | ${props?.data?.proDetails?.findProduct?.name}`}</title>
                <meta name="description" content="product-details" />
            </Helmet>
            <div className="text-2xl font-bold">
                {props?.data?.proDetails?.findProduct?.name}
            </div>
            <div>
                {props?.data?.proDetails?.findProduct?.length} cm x{' '}
                {props?.data?.proDetails?.findProduct?.width} cm x{' '}
                {props?.data?.proDetails?.findProduct?.height} cm
            </div>
            <div className="pt-4 font-bold text-lg">
                Rp{' '}
                {props?.data?.proDetails?.findProduct?.price.toLocaleString(
                    'id-ID',
                )}
            </div>
            <div className="pt-4 text-md flex items-center gap-2">
                <div
                    className={`h-9 w-9 border`}
                    style={{
                        backgroundColor:
                            props?.data?.proDetails?.findProduct?.color
                                ?.color_code,
                    }}
                ></div>
                <div>{props?.data?.proDetails?.findProduct?.color?.name}</div>
            </div>
            <div className="pt-4 text-lg">
                {props?.data?.proDetails?.findProduct?.description}
            </div>
        </>
    );
}
