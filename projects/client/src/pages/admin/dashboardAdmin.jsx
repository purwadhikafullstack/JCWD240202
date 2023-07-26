import SideBarAdmin from '../../components/admin/adminPageSideBar';

export default function DashboardAdmin() {
    return (
        <>
            <div className="sm:flex">
                <SideBarAdmin />
                <div className="font-bold">DASHBOARD</div>
            </div>
        </>
    );
}
