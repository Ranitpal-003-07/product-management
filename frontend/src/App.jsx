import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"; 
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Products from "./Components/Products";
import Dashboard from "./Components/Dashboard";
import Footer from "./Components/Footer";
import Auth from "./Components/Auth";



function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
           <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
