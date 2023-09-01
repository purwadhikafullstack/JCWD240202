import SideBarAdmin from '../../components/admin/adminPageSideBar';
import { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getDataLogin } from '../../redux/features/userSlice';
import { useSelector } from 'react-redux';
import SuperAdminView from '../../components/admin/dashboard/superAdminView';
import WhAdminView from '../../components/admin/dashboard/whAdminView';

export default function DashboardAdmin() {
    const dispatch = useDispatch();
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);
    const [warehouseId, setWarehouseId] = useState('');
    const loginData = useSelector((state) => state.user.dataLogin);

    useEffect(() => {
        dispatch(getDataLogin());
        setTimeout(() => {
            setLoading(true);
        }, 1000);
        clearTimeout(setLoading(false));
    }, []);

    return (
        <>
            <Toaster />
            <Helmet>
                <title>IKEWA | Dashboard</title>
                <meta name="description" content="dashboard" />
            </Helmet>
            <div className="sm:flex">
                <SideBarAdmin />
                <div className="bg-blue-200 py-8 w-full px-14">
                    <div className="font-bold text-3xl">
                        WELCOME,{' '}
                        {loginData?.role_id === 3
                            ? 'ADMIN'
                            : loginData?.role_id === 2
                            ? `ADMIN ${loginData?.warehouse?.city}`
                            : ''}
                    </div>
                    <SuperAdminView
                        state={{ loading, month, year, warehouseId }}
                    />
                </div>
            </div>
        </>
    );
}
