import SideBarAdmin from '../../components/admin/adminPageSideBar';
import { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function DashboardAdmin() {
    return (
        <>
            <Toaster />
            <Helmet>
                <title>IKEWA | Dashboard</title>
                <meta name="description" content="dashboard" />
            </Helmet>
            <div className="sm:flex">
                <SideBarAdmin />
                <div className="font-bold">DASHBOARD</div>
            </div>
        </>
    );
}
