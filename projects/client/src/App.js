import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/user/homepage';
import Navbar from './components/user/navbar/navbar';
import LoginPage from './pages/user/loginPage';
// import VerificationPage from './pages/user/verificationPage';
// import RegisterPage from './pages/user/registerPage';
import ProfilePage from './pages/user/profilepage';
import Address from './pages/user/address';
import ResetPassword from './pages/user/resetpassword';
import Footer from './components/user/footer/footer';
import ProductsCatalog from './pages/user/productsCatalog';

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
                {/* <Route path="/register" element={<RegisterPage />} /> */}
                <Route
                    path="/login"
                    element={
                        <>
                            <LoginPage />
                            <Footer />
                        </>
                    }
                />
                {/* <Route path="/verification" element={<VerificationPage />} /> */}
                <Route path="/users/profile" element={<ProfilePage />} />
                <Route path="/users/address" element={<Address />} />
                <Route
                    path="/users/change-password"
                    element={<ResetPassword />}
                />
            </Routes>
        </>
    );
}

export default App;
