import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "../Styles/Navbar.css";
import AuthContext from "../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="logo">Itemize-X</div>

      {/* Normal Navbar (Visible on larger screens) */}
      <div className="nav-links-container">
        <div className="nav-links">
          <NavLink to="/" className="nav-item">Home</NavLink>

          {/* Show different dashboards based on role */}
          {user && user.isAdmin ? (
            <NavLink to="/dashboard" className="nav-item">Dashboard</NavLink>
          ) : user ? (
            <NavLink to="/products" className="nav-item">Products</NavLink>
          ) : null}
        </div>

        <div className="auth-section">
          {user ? (
            <div className="profile-container" onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <FaUserCircle className="profile-icon" />
              {isProfileOpen && (
                <div className="profile-dropdown">
                  <NavLink to="/profile" className="dropdown-item">Profile</NavLink>
                  <button className="dropdown-item logout-btn" onClick={logout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/auth" className="login-btn">LogIn/SignUp</NavLink>
          )}
        </div>
      </div>

      {/* Hamburger Menu (Visible on smaller screens) */}
      <div className="hamburger-menu">
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          &#9776;
        </div>
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
          <NavLink to="/" className="nav-item" onClick={() => setIsOpen(false)}>Home</NavLink>

          {/* Show different dashboards based on role */}
          {user && user.isAdmin ? (
            <NavLink to="/dashboard" className="nav-item">Dashboard</NavLink>
          ) : user ? (
            <NavLink to="/products" className="nav-item">Products</NavLink>
          ) : null}
          <div className="auth-section">
            {user ? (
              <div className="profile-container" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                <FaUserCircle className="profile-icon" />
                {isProfileOpen && (
                  <div className="profile-dropdown">
                    <NavLink to="/profile" className="dropdown-item">Profile</NavLink>
                    <button className="dropdown-item logout-btn" onClick={() => { logout(); setIsOpen(false); }}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink to="/auth" className="login-btn" onClick={() => setIsOpen(false)}>LogIn/SignUp</NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
