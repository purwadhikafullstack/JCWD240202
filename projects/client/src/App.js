import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/user/homepage';
import Navbar from './components/user/navbar/navbar';
import LoginPage from './pages/user/loginPage';
import ProfilePage from './pages/user/profilepage';
import Address from './pages/user/address';
import ResetPassword from './pages/user/resetpassword';

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<LoginPage />} />
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
