import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaVenusMars, FaHome, FaEdit } from 'react-icons/fa';
import '../../style/owner-profile.scss';

import PgGridSearch from "../functions/pgGridSearch";
import PgManager from '../PG/PGManager';

const OwnerProfile = () => {
  const navigate = useNavigate();
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');  

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

        const res = await axios.get(`http://localhost:4001/api/owner/${myUserId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOwner(res.data);
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

  const username = owner.fullName?.toLowerCase().replace(/\s+/g, '_') || 'user';

  return (
    <div className="profile-container">
      <div className="container" style={{ maxWidth: '1000px' }}>

        <div className="d-flex align-items-end gap-4 mb-4">
          <img
            src={owner.imageUrl || 'https://via.placeholder.com/100'}
            alt={owner.fullName}
            className="avatar-img"
          />
          <div>
            <h1 className="username mb-0">@{username}</h1>
            <p className="fullname text-light mb-1">{owner.fullName}</p>
          </div>
        </div>

        <hr className="border-secondary" />

        <div className="tab-nav d-flex gap-4 mb-4">
          <button
            className={`tab-link ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
        </div>
        

        <div>
          {activeTab === 'overview' && (
            <div className="row g-3">
              <div className="col-6 col-md-3">
                <div className="stat-card">
                  <FaCalendarAlt className="icon text-primary" />
                  <div className="value">{owner.age || '-'}</div>
                  <div className="label">Age</div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-card">
                  <FaVenusMars className="icon text-success" />
                  <div className="value">{owner.gender === true ? 'Male' : owner.gender === false ? 'Female' : owner.gender || '-'}</div>
                  <div className="label">Gender</div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-card">
                  <FaHome className="icon text-warning" />
                  <div className="value">{owner.family ? 'Yes' : 'No'}</div>
                  <div className="label">Family</div>
                </div>
              </div>
            </div>
          )}

          <PgGridSearch />
          <PgManager/>
        </div>
        
      </div>
    </div>
  );
};

export default OwnerProfile;