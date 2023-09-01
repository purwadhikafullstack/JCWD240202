export default function CurrentStatus(props) {
    return (
        <>
            {props?.data?.status?.map((value, index) => {
                return value.is_active === true ? (
                    <div
                        className={`border px-4 py-1 rounded-full max-md:order-last ${
                            value?.status_id === 1
                                ? 'bg-[#F9E79F] text-[#D6A500] border-[#F8C471]'
                                : ''
                        } ${
                            value?.status_id === 2
                                ? 'bg-[#F5CBA7] text-[#E67E22] border-[#F5B041]'
                                : ''
                        } ${
                            value?.status_id === 3
                                ? 'bg-[#D2B4DE] text-[#8E44AD] border-[#AF7AC5]'
                                : ''
                        } ${
                            value.status_id === 4
                                ? 'bg-[#AED6F1] text-[#2471A3] border-[#7FB3D5]'
                                : ''
                        } ${
                            value?.status_id === 5
                                ? 'bg-[#A9DFBF] text-[#28B463] border-[#7DCEA0]'
                                : ''
                        } ${
                            value?.status_id === 6
                                ? 'bg-[#F1948A] text-[#EE0303] border-[#FC4A4A]'
                                : ''
                        }`}
                        key={index}
                    >
                        {value.status.name}
                    </div>
                ) : (
                    ''
                );
            })}
        </>
    );
}
