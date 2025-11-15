import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaVenusMars, FaHome, FaEdit } from "react-icons/fa";
import "../../style/tenant-profile.scss";
import PgSearchGrid from "../functions/pgGridSearch";

const TenantProfile = () => {
  const navigate = useNavigate();
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const load = async () => {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const myUserId = payload.user?.id || payload.id;

        const { data } = await axios.get(
          `http://localhost:4001/api/tenant/${myUserId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setTenant(data);
        setLoading(false);
      } catch (e) {
        setError("Failed to load profile");
        setLoading(false);
        if (e.response?.status === 401) {
          navigate("/login");
        }
      }
    };
    load();
  }, [navigate]);

  
  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );

  const username =
    tenant.fullName?.toLowerCase().replace(/\s+/g, "_") || "user";

  
  return (
    <div className="profile-container">
      <div className="profile-card">

        <div className="profile-header">
          <img
            src={tenant.imageUrl || "https://via.placeholder.com/110"}
            alt={tenant.fullName}
            className="avatar-img"
          />
          <div className="user-info">
            <h1 className="username">@{username}</h1>
            <p className="fullname">{tenant.fullName}</p>
          </div>
        </div>

        <hr className="border-secondary" />


        <div className="tab-nav">
          <button
            className={`tab-link ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
        </div>
        <div className="tab-content">
          {activeTab === "overview" && (
            <>
              <div className="stat-grid">
                <div className="stat-card">
                  <FaCalendarAlt className="icon text-primary" />
                  <div className="value">{tenant.age || "-"}</div>
                  <div className="label">Age</div>
                </div>
                <div className="stat-card">
                  <FaVenusMars className="icon text-success" />
                  <div className="value">
                    {tenant.gender?.charAt(0).toUpperCase() +
                      tenant.gender?.slice(1) || "-"}
                  </div>
                  <div className="label">Gender</div>
                </div>
                <div className="stat-card">
                  <FaHome className="icon text-warning" />
                  <div className="value">{tenant.family ? "Yes" : "No"}</div>
                  <div className="label">Family</div>
                </div>
              </div>

              <PgSearchGrid />
            </>
          )}

         
        </div>
      </div>
    </div>
  );
};

export default TenantProfile;