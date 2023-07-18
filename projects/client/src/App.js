import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/user/homepage';
import Navbar from './components/user/navbar/navbar';
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
            </Routes>
        </>
    );
}

export default App;
