import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function StatusBar(props) {
    return (
        <>
            <div className="flex flex-wrap md:flex-nowrap gap-3 mt-3 cursor-pointer">
                <div className="font-semibold">Status</div>
                <div className={`border rounded- w-auto rounded-full px-3 
                                ${!props?.data?.statusId ? 'bg-gray-400 border-gray-600' : ''}
                `} onClick={props?.data?.reset}>
                    All
                </div>
                {props?.status?.data?.map((value, index) => {
                    return (
                        <div
                            key={index}
                            className={`border rounded- w-auto whitespace-nowrap rounded-full px-3 cursor-pointer ${
                                props?.data?.statusId === value?.id
                                    ? 'bg-gray-400 border-gray-600'
                                    : ''
                            }`}
                            onClick={() =>
                                props.data.handleStatusChange(value.id)
                            }
                        >
                            {value.label}
                        </div>
                    );
                })}
            </div>
        </>
    );
}
