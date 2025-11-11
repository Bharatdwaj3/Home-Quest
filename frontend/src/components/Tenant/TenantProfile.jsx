// src/components/TenantProfile.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaVenusMars, FaHome } from 'react-icons/fa';
import '../../style/tenant-profile.scss';

import LocationSearch from '../functions/LocationSearch';   // <-- separate file
import PgSearchGrid from '../functions/pgGridSearch';             // <-- separate file


const TenantProfile = () => {
  const navigate = useNavigate();

  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // <-- new state for PG search results

  /* -------------------------------------------------
     Load tenant profile (unchanged)
  ------------------------------------------------- */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const getMyProfile = async () => {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const myUserId = payload.user?.id || payload.id;

        const res = await axios.get(`http://localhost:4001/api/tenant/${myUserId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTenant(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile');
        setLoading(false);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    getMyProfile();
  }, [navigate]);

  /* -------------------------------------------------
     Loading / error UI
  ------------------------------------------------- */
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );
  }

  const username = tenant.fullName?.toLowerCase().replace(/\s+/g, '_') || 'user';

  /* -------------------------------------------------
     Main render
  ------------------------------------------------- */
  return (
    <div className="profile-container">
      <div className="container" style={{ maxWidth: '1000px' }}>

        {/* Header */}
        <div className="d-flex align-items-end gap-4 mb-4">
          <img
            src={tenant.imageUrl || 'https://via.placeholder.com/100'}
            alt={tenant.fullName}
            className="avatar-img"
          />
          <div>
            <h1 className="username mb-0">@{username}</h1>
            <p className="fullname text-light mb-1">{tenant.fullName}</p>
          </div>
        </div>

        <hr className="border-secondary" />

        {/* Tabs */}
        <div className="tab-nav d-flex gap-4 mb-4">
          {['overview', 'my rooms'].map((tab) => (
            <button
              key={tab}
              className={`tab-link ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {/* ---------- OVERVIEW ---------- */}
          {activeTab === 'overview' && (
            <>
              {/* Stats */}
              <div className="row g-3 mb-4">
                <div className="col-6 col-md-3">
                  <div className="stat-card">
                    <FaCalendarAlt className="icon text-primary" />
                    <div className="value">{tenant.age || '-'}</div>
                    <div className="label">Age</div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="stat-card">
                    <FaVenusMars className="icon text-success" />
                    <div className="value">{tenant.gender || '-'}</div>
                    <div className="label">Gender</div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="stat-card">
                    <FaHome className="icon text-warning" />
                    <div className="value">{tenant.family ? 'Yes' : 'No'}</div>
                    <div className="label">Family</div>
                  </div>
                </div>
              </div>

              {/* ---- Location Search ---- */}
              <PgSearchGrid />
            </>
          )}

          {/* ---------- MY ROOMS ---------- */}
          
        </div>
      </div>
    </div>
  );
};

export default TenantProfile;