import { Routes, Route, useLocation } from 'react-router-dom';
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
import ProductStockPage from './pages/admin/productStockPage';
import OrderDetailsPage from './pages/user/orderDetailsPage';
import UserTransactions from './pages/user/userTransactions';
import MutationPage from './pages/admin/mutationPage';
import AdminSalesReport from './pages/admin/adminSalesReport';
import StockHistoryProduct from './pages/admin/stockHistoryPage';
import StockLogPage from './pages/admin/logStockPage';
import ColorProductAdmin from './pages/admin/colorProductAdmin';
import Wishlist from './pages/user/wishlist';
import NotFoundPage from './pages/general/notFoundPage';
import AdminRoute from './components/admin/protectedRoute/adminRoute';
import AdminProtectedRoute from './components/admin/protectedRoute/adminProtectedPage';
import UserRoute from './components/admin/protectedRoute/userRoute';
import NotLoginRoute from './components/admin/protectedRoute/notLoginRoute';
import { useEffect } from 'react';
import { getDataLogin } from './redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const userLogin = JSON.parse(localStorage.getItem('user'));
    const dataLogin = useSelector((state) => state.user.dataLogin);

    useEffect(() => {
        if (userLogin) {
            dispatch(getDataLogin());
        }
    }, [pathname, userLogin]);

    return (
        <>
            <Navbar dataLogin={dataLogin?.role_id} />
            <Routes>
                {/* User */}
                <Route path="/login" element={<LoginPage />} />

                {/* User Not Login */}
                <Route
                    path="/"
                    element={
                        <NotLoginRoute
                            component={<Homepage />}
                            dataLogin={dataLogin}
                        />
                    }
                />
                <Route
                    path="/products"
                    element={
                        <NotLoginRoute
                            component={<ProductsCatalog />}
                            dataLogin={dataLogin}
                        />
                    }
                />
                <Route
                    path="/products/:id"
                    element={
                        <NotLoginRoute
                            component={<ProductDetails />}
                            dataLogin={dataLogin}
                        />
                    }
                />
                <Route
                    path="/register"
                    element={
                        <NotLoginRoute
                            component={<RegisterPage />}
                            dataLogin={dataLogin}
                        />
                    }
                />
                <Route
                    path="/reset-password/:token"
                    element={
                        <NotLoginRoute
                            component={<ResetPassword />}
                            dataLogin={dataLogin}
                        />
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        <NotLoginRoute
                            component={<ForgotPassword />}
                            dataLogin={dataLogin}
                        />
                    }
                />
                <Route
                    path="/verification/:token"
                    element={
                        <NotLoginRoute
                            component={<VerificationPage />}
                            dataLogin={dataLogin}
                        />
                    }
                />

                {/* User Login */}
                <Route
                    path="/users/profile"
                    element={
                        <UserRoute
                            component={<ProfilePage />}
                            dataLogin={dataLogin}
                        />
                    }
                />
                <Route
                    path="/users/address"
                    element={
                        <UserRoute
                            component={<Address />}
                            dataLogin={dataLogin}
                        />
                    }
                />
                <Route
                    path="/users/change-password"
                    element={
                        <UserRoute
                            component={<ChangePasswordUser />}
                            dataLogin={dataLogin}
                        />
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <UserRoute
                            component={<UserCart />}
                            dataLogin={dataLogin}
                        />
                    }
                />
                <Route
                    path="/cart/checkout"
                    element={
                        <UserRoute
                            component={<CheckoutCart />}
                            dataLogin={dataLogin}
                        />
                    }
                />
                <Route
                    path="/orders/:order_id"
                    element={
                        <UserRoute
                            component={<OrderDetailsPage />}
                            dataLogin={dataLogin}
                        />
                    }
                />
                <Route
                    path="/users/transactions"
                    element={
                        <UserRoute
                            component={<UserTransactions />}
                            dataLogin={dataLogin}
                        />
                    }
                />
                <Route path="/users/wishlists" element={<Wishlist />} />

                {/* Admin */}
                <Route path="/admins/login" element={<AdminLoginPage />} />

                <Route
                    path="/admins/dashboard"
                    element={
                        <AdminRoute
                            component={<DashboardAdmin />}
                            dataLogin={dataLogin}
                        />
                    }
                />
                <Route
                    path="/admins/products"
                    element={
                        <AdminRoute
                            component={<ProductAdmin />}
                            dataLogin={dataLogin}
                        />
                    }
                />
                <Route
                    path="/admins/products/categories"
                    element={
                        <AdminRoute
                            component={<CategoryProductAdmin />}
                            dataLogin={dataLogin}
                        />
                    }
                />
                <Route
                    path="/admins/user-management"
                    element={
                        <AdminProtectedRoute
                            component={<UserAdmin />}
                            dataLogin={dataLogin}
                        />
                    }
                />
                <Route
                    path="/admins/products/colors"
                    element={<ColorProductAdmin />}
                />
                <Route
                    path="/admins/warehouse-management"
                    element={
                        <AdminProtectedRoute
                            component={<WarehousePageAdmin />}
                            dataLogin={dataLogin}
                        />
                    }
                />
                <Route
                    path="/admins/transactions"
                    element={
                        <AdminRoute
                            component={<TransactionAdmin />}
                            dataLogin={dataLogin}
                        />
                    }
                />
                <Route
                    path="/admins/stock-management"
                    element={
                        <AdminRoute
                            component={<ProductStockPage />}
                            dataLogin={dataLogin}
                        />
                    }
                />
                <Route
                    path="/admins/mutation-management"
                    element={
                        <AdminRoute
                            component={<MutationPage />}
                            dataLogin={dataLogin}
                        />
                    }
                />
                <Route
                    path="/admins/sales-report"
                    element={
                        <AdminRoute
                            component={<AdminSalesReport />}
                            dataLogin={dataLogin}
                        />
                    }
                />
                <Route
                    path="/admins/stock-history"
                    element={
                        <AdminRoute
                            component={<StockHistoryProduct />}
                            dataLogin={dataLogin}
                        />
                    }
                />
                <Route
                    path="/admins/stock-log"
                    element={
                        <AdminRoute
                            component={<StockLogPage />}
                            dataLogin={dataLogin}
                        />
                    }
                />
                <Route path="/*" element={<NotFoundPage />} />
            </Routes>

            <Footer dataLogin={dataLogin?.role_id} />
        </>
    );
}

export default App;
