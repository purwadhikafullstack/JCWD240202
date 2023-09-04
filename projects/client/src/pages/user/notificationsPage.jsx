import { Helmet } from 'react-helmet';
import UserSidebar from '../../components/user/sidebar/userSidebar';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getUserNotificationAsync } from '../../redux/features/notificationSlice';
import { useSelector } from 'react-redux';
import NotificationCard from '../../components/user/notifications/notificationCard';
import PaginationButton from '../../components/user/pagination/paginationButton';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

export default function UserNotifications() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
                    <div className="lg:w-3/4 max-lg:w-full">
                        {' '}
                        <div className="w-full">
                            <div className="font-bold text-3xl">
                                Notifications
                            </div>
                        </div>
                        {notificationData?.data?.notifications?.rows.length ===
                        0 ? (
                            <>
                                <div className="h-full flex justify-center items-center font-bold text-lg">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="flex items-center justify-center py-8">
                                            <div>
                                                <div className="flex justify-center items-center font-semibold text-xl mb-6">
                                                    <h1 className="font-semibold text-2xl">
                                                        No Notification
                                                    </h1>
                                                </div>
                                                <div className="w-full flex justify-center items-center">
                                                    <img
                                                        src="/images/not-found-user.png"
                                                        alt="not-found"
                                                        className="min-w-[200px] max-w-[400px]"
                                                    ></img>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <Button
                                                onClick={() =>
                                                    navigate('/products')
                                                }
                                                color={'light'}
                                            >
                                                Browse Products Here
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
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
                                <div className="md:w-3/4 max-md:w-full flex justify-center">
                                    <PaginationButton
                                        data={{
                                            totalPage:
                                                notificationData?.totalPage,
                                            page,
                                            pageChange,
                                        }}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
