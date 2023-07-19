import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/user/homepage';
import Navbar from './components/user/navbar/navbar';
// import RegisterPage from './pages/user/registerPage';
import LoginPage from './pages/user/loginPage';
// import VerificationPage from './pages/user/verificationPage';
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
            </Routes>
        </>
    );
}

export default App;
