import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/user/homepage";
import Navbar from "./components/user/navbar/navbar";


function App() {
  
  return (
    <>
    <Navbar />
    
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
    </>
  );
}

export default App;
