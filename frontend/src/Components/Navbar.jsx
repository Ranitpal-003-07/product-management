import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "../Styles/Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">Itemize-X</div>

      {/* Normal Navbar (Visible on larger screens) */}
      <div className="nav-links-container">
        <div className="nav-links">
          <NavLink to="/" className="nav-item">Home</NavLink>
          <NavLink to="/products" className="nav-item">Products</NavLink>
          <NavLink to="/dashboard" className="nav-item">DashBoard</NavLink>
        </div>

        <div className="auth-section">
          <div className="profile-container" onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <FaUserCircle className="profile-icon" />
            {isProfileOpen && (
              <div className="profile-dropdown">
                <NavLink to="/profile" className="dropdown-item">Profile</NavLink>
                <button className="dropdown-item logout-btn">Logout</button>
              </div>
            )}
          </div>
          <a href="/auth" className="login-btn">LogIn/SignUp</a>
        </div>
      </div>

      {/* Hamburger Menu (Visible on smaller screens) */}
      <div className="hamburger-menu">
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          &#9776;
        </div>
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
          <NavLink to="/" className="nav-item" onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/products" className="nav-item" onClick={() => setIsOpen(false)}>Products</NavLink>
          <NavLink to="/dashboard" className="nav-item" onClick={() => setIsOpen(false)}>DashBoard</NavLink>
          <div className="auth-section">
            <div className="profile-container" onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <FaUserCircle className="profile-icon" />
              {isProfileOpen && (
                <div className="profile-dropdown">
                  <NavLink to="/profile" className="dropdown-item">Profile</NavLink>
                  <button className="dropdown-item logout-btn">Logout</button>
                </div>
              )}
            </div>
            <a href="/auth" className="login-btn" onClick={() => setIsOpen(false)}>LogIn/SignUp</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
