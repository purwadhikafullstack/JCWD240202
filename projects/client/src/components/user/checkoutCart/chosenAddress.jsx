export default function ChosenAddress(props) {
    return (
        <>
            <div className="py-2">
                <div className="font-bold">
                    {props?.data?.chosenAddress?.data?.receiver_name}
                </div>
                <div>{props?.data?.chosenAddress?.data?.receiver_number}</div>
                <div className="w-[500px] flex wrap">
                    {props?.data?.chosenAddress?.data?.street},{' '}
                    {props?.data?.chosenAddress?.data?.subdistrict},{' '}
                    {props?.data?.chosenAddress?.data?.city},{' '}
                    {props?.data?.chosenAddress?.data?.province},{' '}
                    {props?.data?.chosenAddress?.data?.postcode}
                </div>
            </div>
        </>
    );
}
