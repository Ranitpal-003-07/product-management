import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import "../Styles/Auth.css";


const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { login, signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: ""});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signup(formData.name, formData.email, formData.password);
        await login(formData.email, formData.password); // Automatically login after signup
      } else {
        await login(formData.email, formData.password);
      }
      navigate("/products");
    } catch (error) {
      console.error("Authentication failed", error);
    }
  };
  

  return (
    <div className="bdy">
      <div className={`container ${isSignUp ? "active" : ""}`}>
        
        {/* Sign Up Form */}
        <div className="form-container sign-up">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <span>or use your email for registration</span>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in">
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <span>or use your email password</span>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Sign In</button>
          </form>
        </div>

        {/* Toggle Section */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all site features</p>
              <button className="hidden" onClick={() => setIsSignUp(false)}>Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all site features</p>
              <button className="hidden" onClick={() => setIsSignUp(true)}>Sign Up</button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Auth;
