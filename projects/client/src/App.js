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
import CheckoutCart from './pages/user/checkoutCart';

function App() {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Navbar />
                            <Homepage />
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <>
                            <Navbar />
                            <ProductsCatalog />
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="/products/:id"
                    element={
                        <>
                            <Navbar />
                            <ProductDetails />
                            <Footer />
                        </>
                    }
                />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/login"
                    element={
                        <>
                            <Navbar />
                            <LoginPage />
                            <Footer />
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
                            <Navbar />
                            <ProfilePage />
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="/users/address"
                    element={
                        <>
                            <Navbar />
                            <Address />
                            <Footer />
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
                            <Navbar />
                            <ChangePasswordUser />
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <>
                            <Navbar />
                            <UserCart />
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="/cart/checkout"
                    element={
                        <>
                            <Navbar />
                            <CheckoutCart />
                            <Footer />
                        </>
                    }
                />

                {/* Admin */}
                <Route path="/admins/login" element={<AdminLoginPage />} />
                <Route path="/admins/dashboard" element={<DashboardAdmin />} />
            </Routes>
        </>
    );
}

export default App;
