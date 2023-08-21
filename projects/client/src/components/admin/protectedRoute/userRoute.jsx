import NotFoundPage from '../../../pages/general/notFoundPage';

export default function UserRoute(props) {
    const userLogin = JSON.parse(localStorage.getItem('user'));
    return (
        <>
            {(props.dataLogin?.role_id === 1 && props?.dataLogin?.is_verified === true) && <>{props.component}</>}
            {(props.dataLogin?.role_id === 2 || props.dataLogin?.role_id === 3 || !userLogin) && <NotFoundPage />}
        </>
    );
}
