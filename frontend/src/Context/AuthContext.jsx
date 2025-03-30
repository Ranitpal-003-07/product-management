import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if the user is authenticated on page load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:5000/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setUser(res.data);
      } catch (err) {
        console.error("User not authenticated", err);
        setUser(null);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
  
      console.log("Login Response:", res.data);
  
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
      } else {
        console.error("No token received from backend");
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };
  

  // Signup function
  const signup = async (name, email, password) => {
    try {
      await axios.post("http://localhost:5000/api/auth/signup", { name, email, password }, { withCredentials: true });
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("token");  // Remove token on logout
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
