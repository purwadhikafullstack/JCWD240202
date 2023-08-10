import SideBarAdmin from '../../components/admin/adminPageSideBar';
import toast, { Toaster } from 'react-hot-toast';

export default function DashboardAdmin() {
    return (
        <>
            <Toaster />
            <div className="sm:flex">
                <SideBarAdmin />
                <div className="font-bold">DASHBOARD</div>
            </div>
        </>
    );
}
