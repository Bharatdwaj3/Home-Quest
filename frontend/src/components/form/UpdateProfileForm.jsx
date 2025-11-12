// src/components/form/UpdateProfileForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMail, FiUser, FiCalendar, FiImage, FiCheck, FiPhone } from "react-icons/fi";
import "../../style/auth.scss";

export default function UpdateProfileForm({ role = "tenant" }) {
  const navigate = useNavigate();
  const location = useLocation();

  // ---------- UI ----------
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState("");

  // ---------- Form ----------
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "male",     // default
    family: "false",
    phone: "",          // owner only
    image: null,
  });

  // ---------- Get ID from JWT ----------
  const getUserId = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user?.id || payload.id;
    } catch {
      return null;
    }
  };

  const userId = getUserId();
  const userEmail = JSON.parse(localStorage.getItem("user") || "{}").email || "";

  // ---------- Load Profile ----------
  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const load = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:4001/api/${role}/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const profile = await res.json();
        if (!res.ok) throw new Error(profile.msg || "Failed to load");

        setFormData({
          name: profile.name || "",
          age: profile.age || "",
          gender: profile.gender === true ? "male" : profile.gender === false ? "female" : profile.gender || "male",
          family: profile.family ? "true" : "false",
          phone: profile.phone?.toString() || "",
          image: null,
        });
        setPreview(profile.imageUrl || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [userId, role, navigate]);

  // ---------- Flash message ----------
  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message);
      navigate(".", { replace: true, state: {} });
    }
  }, [location, navigate]);

  // ---------- Handlers ----------
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // ---------- Submit ----------
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;

    setError("");
    setSuccess("");
    setIsLoading(true);

    const body = new FormData();
    body.append("name", formData.name);
    body.append("age", formData.age);
    body.append("gender", formData.gender);
    body.append("family", formData.family === "true");
    if (role === "owner") body.append("phone", formData.phone);
    if (formData.image) body.append("image", formData.image);

    try {
      const res = await fetch(`http://localhost:4001/api/${role}/profile/${userId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Update failed");

      const target = role === "owner" ? "/owner-dashboard" : "/tenant-dashboard";
      navigate(target, { state: { message: "Profile updated!" } });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------------------------------------------------------------
  if (!userId) return null;

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2 className="auth-title">Update {role === "owner" ? "Owner" : "Tenant"} Profile</h2>
        <p className="auth-subtitle">Edit your details</p>

        {success && (
          <p className="success-message">
            <FiCheck /> {success}
          </p>
        )}
        {error && <p className="error-message">Error: {error}</p>}

        <form onSubmit={onSubmit} className="auth-form">
          {/* Email (read-only) */}
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
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={onChange}
                required
              />
            </div>
          </div>

          {/* Age */}
          <div className="form-group">
            <label htmlFor="age">Age *</label>
            <div className="input-group">
              <FiCalendar className="input-icon" />
              <input
                id="age"
                name="age"
                type="text"
                value={formData.age}
                onChange={onChange}
                required
              />
            </div>
          </div>

          {/* Gender */}
          <div className="form-group">
            <label>Gender *</label>
            <div className="flex gap-4">
              {["male", "female"].map((g) => (
                <label key={g} className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={onChange}
                    className="mr-2"
                  />
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* Family */}
          <div className="form-group">
            <label>Family Member? *</label>
            <div className="flex gap-4">
              {["true", "false"].map((f) => (
                <label key={f} className="flex items-center">
                  <input
                    type="radio"
                    name="family"
                    value={f}
                    checked={formData.family === f}
                    onChange={onChange}
                    className="mr-2"
                  />
                  {f === "true" ? "Yes" : "No"}
                </label>
              ))}
            </div>
          </div>

          {/* Phone (owner only) */}
          {role === "owner" && (
            <div className="form-group">
              <label htmlFor="phone">Phone *</label>
              <div className="input-group">
                <FiPhone className="input-icon" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={onChange}
                  required
                />
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
                <img
                  src={preview}
                  alt="preview"
                  className="w-32 h-32 object-cover rounded-full border-2 border-primary"
                />
              </div>
            )}
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? <div className="loader"></div> : "Save Changes"}
          </button>
        </form>

        <p className="auth-footer">
          <a href={role === "owner" ? "/owner-dashboard" : "/tenant-dashboard"}>
            Back to Dashboard
          </a>
        </p>
      </div>
    </div>
  );
}