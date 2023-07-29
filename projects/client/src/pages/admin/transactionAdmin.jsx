import SideBarAdmin from "../../components/admin/adminPageSideBar";
import TransactionCard from "../../components/admin/transaction/transactionCard";

export default function TransactionAdmin() {
    return (
        <>
            <div className="sm:flex">
                <SideBarAdmin />
                <div>
                    <div className="font-bold text-2xl mt-2">
                        Transaction
                    </div>
                    <TransactionCard />
                </div>
            </div>
        </>
    )
}