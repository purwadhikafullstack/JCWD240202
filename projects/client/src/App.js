import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/user/homepage';
import Navbar from './components/user/navbar/navbar';
import RegisterPage from './pages/user/registerPage';
import LoginPage from './pages/user/loginPage';
import VerificationPage from './pages/user/verificationPage';

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/verification" element={<VerificationPage />} />
            </Routes>
        </>
    );
}

export default App;
