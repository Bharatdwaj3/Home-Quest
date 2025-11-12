// UpdateProfileForm.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMail, FiUser, FiCalendar, FiImage, FiCheck, FiPhone } from "react-icons/fi";
import axios from "axios";

export default function UpdateProfileForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    name: "", age: "", gender: "male", family: "false", phone: "", image: null,
  });

  // --- JWT: Get userId & role directly from token ---
  const getUserData = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return {
        userId: payload.user?.id || payload.id,
        userRole: payload.user?.role || payload.role,
      };
    } catch {
      return null;
    }
  };

  const { userId, userRole } = getUserData() || {};
  const userEmail = JSON.parse(localStorage.getItem("user") || "{}").email || "";

  // --- Redirect if not logged in ---
  useEffect(() => {
    if (!userId || !userRole) {
      navigate("/login");
    }
  }, [userId, userRole, navigate]);

  // --- Load profile data ---
  useEffect(() => {
    if (!userId || !userRole) return;

    const load = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/${userRole}/${userId}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );

        setFormData({
          name: data.name || "",
          age: data.age || "",
          gender: data.gender === true ? "male" : data.gender === false ? "female" : data.gender || "male",
          family: data.family ? "true" : "false",
          phone: data.phone?.toString() || "",
          image: null,
        });
        setPreview(data.imageUrl || "");
      } catch (e) {
        setError(e.response?.data?.msg || "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [userId, userRole, navigate]);

  // --- Flash success message ---
// --- Redirect if not logged in ---
useEffect(() => {
  const isEmbedded = location.state?.embedded;
  if (!isEmbedded && (!userId || !userRole)) {
    navigate("/login");
  }
}, [userId, userRole, navigate, location.state]);

  // --- Handlers ---
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setSuccess(""); 
    setIsLoading(true);

    const body = new FormData();
    body.append("name", formData.name);
    body.append("age", formData.age);
    body.append("gender", formData.gender);
    body.append("family", formData.family === "true");
    if (userRole === "owner") body.append("phone", formData.phone);
    if (formData.image) body.append("image", formData.image);

    try {
      await axios.put(
        `http://localhost:4001/api/${userRole}/profile/${userId}`,
        body,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      navigate(userRole === "owner" ? "/owner-dashboard" : "/tenant-dashboard", {
        state: { message: "Profile updated successfully!" }
      });
    } catch (e) {
      setError(e.response?.data?.msg || "Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Render Form ---
  return (
    <div className="profile-form-container">
      {success && <p className="success-message"><FiCheck /> {success}</p>}
      {error && <p className="error-message">Error: {error}</p>}

      <form onSubmit={onSubmit} className="auth-form">
        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <div className="input-group">
            <FiMail className="input-icon" />
            <input type="email" value={userEmail} disabled className="bg-gray-100" />
          </div>
        </div>

        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <div className="input-group">
            <FiUser className="input-icon" />
            <input id="name" name="name" type="text" value={formData.name} onChange={onChange} required />
          </div>
        </div>

        {/* Age */}
        <div className="form-group">
          <label htmlFor="age">Age *</label>
          <div className="input-group">
            <FiCalendar className="input-icon" />
            <input id="age" name="age" type="text" value={formData.age} onChange={onChange} required />
          </div>
        </div>

        {/* Gender */}
        <div className="form-group">
          <label>Gender *</label>
          <div className="flex gap-4">
            {["male", "female"].map(g => (
              <label key={g} className="flex items-center">
                <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={onChange} className="mr-2" />
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Family */}
        <div className="form-group">
          <label>Family Member? *</label>
          <div className="flex gap-4">
            {["true", "false"].map(f => (
              <label key={f} className="flex items-center">
                <input type="radio" name="family" value={f} checked={formData.family === f} onChange={onChange} className="mr-2" />
                {f === "true" ? "Yes" : "No"}
              </label>
            ))}
          </div>
        </div>

        {/* Phone (owner only) */}
        {userRole === "owner" && (
          <div className="form-group">
            <label htmlFor="phone">Phone *</label>
            <div className="input-group">
              <FiPhone className="input-icon" />
              <input id="phone" name="phone" type="tel" value={formData.phone} onChange={onChange} required />
            </div>
          </div>
        )}

        {/* Image */}
        <div className="form-group">
          <label>Profile Image</label>
          <div className="input-group">
            <FiImage className="input-icon" />
            <input type="file" accept="image/*" onChange={onFileChange} className="file-input" />
          </div>
          {preview && (
            <div className="mt-3 flex justify-center">
              <img src={preview} alt="preview" className="w-32 h-32 object-cover rounded-full border-2 border-primary" />
            </div>
          )}
        </div>

        <button type="submit" className="auth-button w-full" disabled={isLoading}>
          {isLoading ? <div className="loader"></div> : "Save Changes"}
        </button>
      </form>
    </div>
  );
}