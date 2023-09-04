/* eslint-disable jsx-a11y/alt-text */
export default function CardDetail(props) {
    return (
        <>
            {!props?.func?.openMore ? (
                <div className="flex justify-between border rounded-md mt-2 mb-3">
                    <div className="flex-auto flex items-center w-64 p-1">
                        <img
                            src={props?.data[0]?.image.startsWith('PIMG') ? process.env.REACT_APP_API_IMAGE_URL + props?.data[0]?.image : props?.data[0]?.image}
                            className=" w-[100px] h-[100px] rounded-md"
                        />
                        <div className="ml-3">
                            <div className="font-semibold">
                                {props?.data[0]?.product_name}
                            </div>
                            <div className="text-xs text-slate-500">
                                {props?.data[0]?.quantity} x Rp.{' '}
                                {props?.data[0]?.price.toLocaleString('id')}
                            </div>
                        </div>
                    </div>
                    <div className="border-l flex-auto m-5 flex items-center justify-end">
                        <div className="flex flex-col items-end">
                            <div className="text-slate-500 text-sm">
                                Total Price{' '}
                            </div>
                            <div>
                                Rp.{' '}
                                {(
                                    props?.data[0]?.quantity *
                                    props?.data[0]?.price
                                ).toLocaleString('id')}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                props?.data?.map((value, index) => {
                    return (
                        <div key={index} className="flex justify-between border rounded-md mt-2 mb-3">
                            <div className="flex-auto flex items-center w-64 p-1">
                                <img
                                    src={value?.image.startsWith('PIMG') ? process.env.REACT_APP_API_IMAGE_URL + value?.image : value?.image}
                                    className=" w-[100px] h-[100px] rounded-md"
                                />
                                <div className="ml-3">
                                    <div className="font-semibold">
                                        {value?.product_name}
                                    </div>
                                    <div className="text-xs text-slate-500">
                                        {value?.quantity} x Rp.{' '}
                                        {value?.price.toLocaleString('id')}
                                    </div>
                                </div>
                            </div>
                            <div className="border-l flex-auto m-5 flex items-center justify-end">
                                <div className="flex flex-col items-end">
                                    <div className="text-slate-500 text-sm">
                                        Total Price{' '}
                                    </div>
                                    <div>
                                        Rp.{' '}
                                        {(
                                            value?.quantity * value?.price
                                        ).toLocaleString('id')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </>
    );
}
