import { Link } from 'react-router-dom';

export default function UserSidebar() {
    return (
        <div className="flex flex-col gap-7 p-9 h-[500px] w-[200px] border justify-between rounded-xl shadow-md">
            <div className="flex flex-col gap-9">
                <Link to={'/users/profile'}>
                    <div className="border-b-4 p-2 hover:bg-sky-700 hover:text-yellow-200 hover:rounded-lg hover:shadow-xl hover:font-bold">
                        Profile
                    </div>
                </Link>
                <Link to={'/users/address'}>
                    <div className="border-b-4 p-2 hover:bg-sky-700 hover:text-yellow-200 hover:rounded-lg hover:shadow-xl hover:font-bold">
                        Address
                    </div>
                </Link>
                <Link to={'/users/transactions'}>
                    <div className="border-b-4 p-2 hover:bg-sky-700 hover:text-yellow-200 hover:rounded-lg hover:shadow-xl hover:font-bold">
                        Transactions
                    </div>
                </Link>
            </div>
            <div className="border-b-4 p-2 hover:bg-sky-700 hover:text-yellow-200 hover:rounded-lg hover:shadow-xl hover:font-bold">
                Logout
            </div>
        </div>
    );
}
