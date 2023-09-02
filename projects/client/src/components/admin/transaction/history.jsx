import { useSelector } from 'react-redux';
import { TbPointFilled } from 'react-icons/tb';

export default function History() {
    const data = useSelector((state) => state.transaction.history);
    return (
        <>
            <div className="border rounded-md mb-3 p-2">
                {data.length >= 1
                    ? data?.map((value, index) => {
                        console.log(value)
                          return (
                              <div key={index} className="flex">
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
                                      <div className='flex relative z-0'>
                                          <div>
                                              <TbPointFilled 
                                                  className={`ml-1 mt-1 ${
                                                      value.is_active
                                                          ? 'text-black'
                                                          : 'text-[#8d96aa]'
                                                  }`}
                                              />
                                          </div>
                                          <div className="-z-10 border border-dashed border-[#8d96aa] absolute h-full left-[11px]"></div>
                                      </div>
                                      <div className="ml-2">
                                          <div className="font-semibold ">
                                              {value?.status?.label}
                                          </div>
                                          <div className="w-[150px] md:w-[300px] text-slate-500 text-sm">
                                              {value.status_id === 1
                                                  ? 'Order checked out and waiting customer payment'
                                                  : value.status_id === 2 && value.is_rejected === false
                                                  ? 'Customer has made a payment and waiting confirmation by admin'
                                                  : value.status_id === 3
                                                  ? 'Payment has been confirmed by admin and the order is being processed'
                                                  : value.status_id === 4
                                                  ? 'Order is being delivered to destination'
                                                  : value.status_id === 5
                                                  ? 'Order has been received by customer'
                                                  : value.status_id === 6
                                                  ? 'Order has been canceled'
                                                  : value.status_id === 2 && value.is_rejected === true
                                                  ? 'Customer has made a payment and order has been canceled by admin due to payment error. Customer must re-payment' : ''}
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
