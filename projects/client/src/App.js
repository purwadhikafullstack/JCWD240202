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

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Homepage />
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <>
                            <ProductsCatalog />
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="/products/:id"
                    element={
                        <>
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
                            <LoginPage />
                            <Footer />
                        </>
                    }
                />
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
            </Routes>
        </>
    );
}

export default App;
