import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userReadNotificationAsync } from '../../../redux/features/notificationSlice';

export default function NotificationCard(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <div className="border border-black w-2/3 h-max p-2 relative">
            <div className="font-bold border-b flex justify-between py-1">
                <div>{props?.data?.title}</div>
                <div>{props?.data?.createdAt}</div>
            </div>
            <div className="py-1">{props?.data?.message}</div>
            <div
                onClick={() => {
                    navigate(`/orders/${props?.data?.order_id}`);
                    dispatch(
                        userReadNotificationAsync({
                            notification_id: props?.data?.id,
                        }),
                    );
                }}
                className="absolute bottom-0 right-2 underline hover:cursor-pointer"
            >
                See Order
            </div>
            {props?.data?.is_read === false ? (
                <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-red-500"></div>
            ) : (
                ''
            )}
        </div>
    );
}
