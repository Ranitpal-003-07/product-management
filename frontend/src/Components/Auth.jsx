import { useState } from "react";
import "../Styles/Auth.css";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="bdy">
    <div className={`container ${isSignUp ? "active" : ""}`}>
      {/* Sign Up Form */}
      <div className="form-container sign-up">
        <form>
          <h1>Create Account</h1>
          <div className="social-icons">
            <a href="#" className="icon" onClick={(e) => e.preventDefault()}>
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className="icon" onClick={(e) => e.preventDefault()}>
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="icon" onClick={(e) => e.preventDefault()}>
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="icon" onClick={(e) => e.preventDefault()}>
              <i className="fab fa-linkedin-in"></i>
            </a>
        </div>

          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in">
        <form>
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          <span>or use your email password</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forget Your Password?</a>
          <button>Sign In</button>
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
