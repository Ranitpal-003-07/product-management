import { useState, useContext } from "react";
import AuthContext from "../Context/AuthContext";
import axios from "axios";
import "../Styles/Profile.css";

const Profile = () => {
  const useAuth = () => useContext(AuthContext)
  const { user, setUser } = useAuth(); // Get user from AuthContext
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  // Handle Save (Update User)
  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:5000/api/auth/update-profile",
        updatedUser,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setUser(res.data.user); // Update context with new user data
      localStorage.setItem("user", JSON.stringify(res.data.user)); // Persist changes
      setIsEditing(false);
    } catch (err) {
      console.error("Profile update failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container1">
      <div className="profile-card1">
        <img
          src={user?.profilePic || "https://via.placeholder.com/150"}
          alt="Profile"
          className="profile-pic1"
        />

        {isEditing ? (
          <div className="edit-form1">
            <input
              type="text"
              name="name"
              value={updatedUser.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleChange}
            />
            <button className="save-btn1" onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "💾 Save"}
            </button>
            <button className="cancel-btn1" onClick={() => setIsEditing(false)}>❌ Cancel</button>
          </div>
        ) : (
          <div className="profile-details1">
            <h2>{user?.name || "Guest"}</h2>
            <p>Email: {user?.email || "Not Available"}</p>
            <p>Joined: {user?.createdAt || "N/A"}</p>
            <button className="edit-btn1" onClick={() => setIsEditing(true)}>✏️ Edit Profile</button>
            <button className="password-btn1">🔑 Change Password</button>
            <button className="logout-btn1">🚪 Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
