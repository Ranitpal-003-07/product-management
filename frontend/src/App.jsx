import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./Context/AuthContext";
import "./App.css"; 
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Products from "./Components/Products";
import Dashboard from "./Components/Dashboard";
import Footer from "./Components/Footer";
import Auth from "./Components/Auth";
import Profile from "./Components/Profile";

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>; // Prevent flickering on refresh

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />

            {/* Protected Routes: Redirect to /auth if not logged in */}
            <Route path="/products" element={user ? <Products /> : <Navigate to="/auth" />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/auth" />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/auth" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
