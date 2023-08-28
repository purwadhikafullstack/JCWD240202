import { Helmet } from 'react-helmet';
import UserSidebar from '../../components/user/sidebar/userSidebar';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getUserNotificationAsync } from '../../redux/features/notificationSlice';
import { useSelector } from 'react-redux';
import NotificationCard from '../../components/user/notifications/notificationCard';
import PaginationButton from '../../components/user/pagination/paginationButton';

export default function UserNotifications() {
    const dispatch = useDispatch();
    const notificationData = useSelector(
        (state) => state.notification.notifications,
    );
    const [page, setPage] = useState(1);
    const pageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        dispatch(getUserNotificationAsync({ page }));
    }, [page]);
    return (
        <>
            <Helmet>
                <title>IKEWA | Notifications</title>
                <meta name="description" content="transactions" />
            </Helmet>
            <div className="flex">
                <div className="flex-2 py-[80px] ml-[200px]">
                    <UserSidebar />
                </div>
                <div className="flex-1 p-[80px] flex flex-col items-center mr-[100px]">
                    <div className="w-full">
                        <div className="font-bold text-3xl">Notifications</div>
                    </div>
                    {notificationData?.data?.notifications?.rows.length ===
                    0 ? (
                        <div className='h-full flex items-center font-bold text-lg'>No Notifications</div>
                    ) : (
                        <div className=" p-9 flex flex-col gap-7 w-full">
                            {notificationData?.data?.notifications?.rows?.map(
                                (value, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <NotificationCard data={value} />
                                        </React.Fragment>
                                    );
                                },
                            )}
                        </div>
                    )}
                    <div>
                        <PaginationButton
                            data={{
                                totalPage: notificationData?.totalPage,
                                page,
                                pageChange,
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
