import NotFoundPage from '../../../pages/general/notFoundPage';

export default function AdminProtectedRoute(props) {
    const userLogin = JSON.parse(localStorage.getItem('user'));

    return (
        <>
            {(props.dataLogin?.role_id === 3) && <>{props.component}</>}
            {(props.dataLogin?.role_id === 1 || props.dataLogin?.role_id === 2 || !userLogin) && <NotFoundPage />}
        </>
    );
}
