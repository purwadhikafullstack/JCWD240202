import { useSelector } from 'react-redux';
import { FaLocationDot } from 'react-icons/fa6';

export default function History() {
    const data = useSelector((state) => state.transaction.history);
    return (
        <>
            <div className="border rounded-md mb-3 p-2">
                {/* <div className="border-l border-dotted border-[#8d96aa] h-4/5 mt-3 left-[238px] absolute"></div> */}
                {data.length >= 1
                    ? data?.map((value, index) => {
                          return (
                              <div key={index} className="flex mt-1">
                                  <div className="w-[219px] text-slate-600">
                                      {[
                                          new Date(value?.createdAt)
                                              .toString()
                                              .split(
                                                  'GMT+0700 (Western Indonesia Time)',
                                              ),
                                      ]}
                                  </div>
                                  <div className="flex items">
                                      <div>
                                          <FaLocationDot
                                              className={`ml-1 mt-1 ${
                                                  value.is_active
                                                      ? 'text-black'
                                                      : 'text-[#8d96aa]'
                                              }`}
                                          />
                                      </div>
                                      <div className="ml-2">
                                          <div className="font-semibold ">
                                              {value?.status?.label}
                                          </div>
                                          <div className="w-[300px] text-slate-500 text-sm">
                                              {value.status_id === 1
                                                  ? 'Customer checkout the order'
                                                  : value.status_id === 2
                                                  ? 'Customer has made a payment '
                                                  : value.status_id === 3
                                                  ? 'Payment has been confirmed by admin and the order is being processed'
                                                  : value.status_id === 4
                                                  ? 'Order is being delivered to destination'
                                                  : value.status_id === 5
                                                  ? 'Order has been received by customer'
                                                  : value.status_id === 6
                                                  ? 'Order has been canceled'
                                                  : ''}
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          );
                      })
                    : null}
            </div>
        </>
    );
}
