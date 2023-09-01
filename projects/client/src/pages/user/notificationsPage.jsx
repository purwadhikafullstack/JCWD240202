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
            <div className="flex justify-center gap-4 py-[80px] max-lg:flex-col max-lg:w-full max-lg:items-center max-lg:px-9 lg:flex-row">
                <div className="md:w-1/4 flex justify-center">
                    <UserSidebar />
                </div>
                <div className="w-full flex justify-start">
                    <div className='lg:w-3/4 max-lg:w-full'>
                        {' '}
                        <div className="w-full">
                            <div className="font-bold text-3xl">
                                Notifications
                            </div>
                        </div>
                        {notificationData?.data?.notifications?.rows.length ===
                        0 ? (
                            <div className="h-full flex items-center font-bold text-lg">
                                No Notifications
                            </div>
                        ) : (
                            <div className=" p-9 flex flex-col gap-7 w-full">
                                {notificationData?.data?.notifications?.rows?.map(
                                    (value, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <NotificationCard
                                                    data={value}
                                                />
                                            </React.Fragment>
                                        );
                                    },
                                )}
                            </div>
                        )}
                        <div className='md:w-3/4 max-md:w-full flex justify-center'>
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
            </div>
        </>
    );
}
