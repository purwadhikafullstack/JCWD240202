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
import CheckoutCart from './pages/user/checkoutCart';
import './App.css';
import { useLocation } from 'react-router-dom';

function App() {
    const { pathname } = useLocation();
    return (
        <>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Homepage />
                        </>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <>
                            <ProductsCatalog />
                        </>
                    }
                />
                <Route
                    path="/products/:id"
                    element={
                        <>
                            <ProductDetails />
                        </>
                    }
                />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/login"
                    element={
                        <>
                            <LoginPage />
                        </>
                    }
                />
                <Route
                    path="/verification/:token"
                    element={<VerificationPage />}
                />
                <Route
                    path="/users/profile"
                    element={
                        <>
                            <ProfilePage />
                        </>
                    }
                />
                <Route
                    path="/users/address"
                    element={
                        <>
                            <Address />
                        </>
                    }
                />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                    path="/reset-password/:token"
                    element={<ResetPassword />}
                />
                <Route
                    path="/users/change-password"
                    element={
                        <>
                            <ChangePasswordUser />
                        </>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <>
                            <UserCart />
                        </>
                    }
                />
                <Route
                    path="/cart/checkout"
                    element={
                        <>
                            <CheckoutCart />
                        </>
                    }
                />

                {/* Admin */}
                <Route path="/admins/login" element={<AdminLoginPage />} />
                <Route path="/admins/dashboard" element={<DashboardAdmin />} />
                <Route path="/admins/products" element={<ProductAdmin />} />
                <Route
                    path="/admins/products/categories"
                    element={<CategoryProductAdmin />}
                />
                <Route path="/admins/setting" element={<UserAdmin />} />
                <Route
                    path="/admins/warehouse/setting"
                    element={<WarehousePageAdmin />}
                />
            </Routes>

            <Footer />
        </>
    );
}

export default App;
