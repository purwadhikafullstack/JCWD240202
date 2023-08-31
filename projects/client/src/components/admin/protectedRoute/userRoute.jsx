import NotFoundPage from '../../../pages/general/notFoundPage';

export default function UserRoute(props) {
    const { pathname } = window.location;
    const userLogin = JSON.parse(localStorage.getItem('user'));
    return (
        <>
            {props.dataLogin?.googleSignIn === true && pathname === '/users/change-password' ? <NotFoundPage /> : props.dataLogin?.role_id === 1 && props?.dataLogin?.is_verified === true ? <>{props.component}</> : <></>}
            {(props.dataLogin?.role_id === 2 || props.dataLogin?.role_id === 3 || !userLogin) && <NotFoundPage />}
        </>
    );
}
