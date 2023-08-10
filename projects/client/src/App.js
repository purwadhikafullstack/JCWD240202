import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/user/homepage';
import Navbar from './components/user/navbar/navbar';
import LoginPage from './pages/user/loginPage';
import VerificationPage from './pages/user/verificationPage';
import ForgotPassword from './pages/user/forgotPassword';
import ResetPassword from './pages/user/resetPassword';
import RegisterPage from './pages/user/registerPage';
import ProfilePage from './pages/user/profilepage';
import Address from './pages/user/address';
import ChangePasswordUser from './pages/user/changepassword';
import Footer from './components/user/footer/footer';
import ProductsCatalog from './pages/user/productsCatalog';
import ProductDetails from './pages/user/productDetails';
import UserCart from './pages/user/userCart';
import AdminLoginPage from './pages/admin/loginAdmin';
import DashboardAdmin from './pages/admin/dashboardAdmin';
import ProductAdmin from './pages/admin/productAdmin';
import CategoryProductAdmin from './pages/admin/categoryProductAdmin';
import UserAdmin from './pages/admin/userAdmin';
import WarehousePageAdmin from './pages/admin/warehousePageAdmin';
import TransactionAdmin from './pages/admin/transactionAdmin';
import CheckoutCart from './pages/user/checkoutCart';
import './App.css';
import { useLocation } from 'react-router-dom';
import ProductStockPage from './pages/admin/productStockPage';
import OrderDetailsPage from './pages/user/orderDetailsPage';
import UserTransactions from './pages/user/userTransactions';
import MutationPage from './pages/admin/mutationPage';
import AdminSalesReport from './pages/admin/adminSalesReport';
import StockHistoryProduct from './pages/admin/stockHistoryPage';
import StockLogPage from './pages/admin/logStockPage';

function App() {
    const { pathname } = useLocation();
    return (
        <>
            <Navbar />
            <Routes>
                {/* User */}
                <Route path="/" element={<Homepage />} />
                <Route path="/products" element={<ProductsCatalog />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/verification/:token"
                    element={<VerificationPage />}
                />
                <Route path="/users/profile" element={<ProfilePage />} />
                <Route path="/users/address" element={<Address />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                    path="/reset-password/:token"
                    element={<ResetPassword />}
                />
                <Route
                    path="/users/change-password"
                    element={<ChangePasswordUser />}
                />
                <Route path="/cart" element={<UserCart />} />
                <Route path="/cart/checkout" element={<CheckoutCart />} />
                <Route
                    path="/orders/:order_id"
                    element={<OrderDetailsPage />}
                />
                <Route
                    path="/users/transactions"
                    element={<UserTransactions />}
                />

                {/* Admin */}
                <Route path="/admins/login" element={<AdminLoginPage />} />
                <Route path="/admins/dashboard" element={<DashboardAdmin />} />
                <Route path="/admins/products" element={<ProductAdmin />} />
                <Route
                    path="/admins/products/categories"
                    element={<CategoryProductAdmin />}
                />
                <Route path="/admins/user-management" element={<UserAdmin />} />
                <Route
                    path="/admins/warehouse-management"
                    element={<WarehousePageAdmin />}
                />
                <Route
                    path="/admins/transactions"
                    element={<TransactionAdmin />}
                />
                <Route
                    path="/admins/stock-management"
                    element={<ProductStockPage />}
                />
                <Route
                    path="/admins/mutation-management"
                    element={<MutationPage />}
                />
                <Route
                    path="/admins/sales-report"
                    element={<AdminSalesReport />}
                />
                <Route
                    path="/admins/stock-history"
                    element={<StockHistoryProduct />}
                />
                <Route path="/admins/stock-log" element={<StockLogPage />} />
            </Routes>

            <Footer />
        </>
    );
}

export default App;
