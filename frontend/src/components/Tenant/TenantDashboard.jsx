// src/components/TenantDashboard.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaRupeeSign, FaChartBar } from 'react-icons/fa';
import '../../style/tenant-profile.scss';

const TenantDashboard = () => {
  const navigate = useNavigate();

  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pgs, setPgs] = useState([]);
  const [search, setSearch] = useState('');
  const [filterPriceRange, setFilterPriceRange] = useState({ min: '', max: '' });
  const [filterRoomType, setFilterRoomType] = useState('');
  const [stats, setStats] = useState({ total: 0, avgPrice: 0, totalValue: 0 });
  const [mapView, setMapView] = useState(false);

  // Get authentication token
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // 1. PG Listings Display - Fetch PGs with authentication
  const fetchPGs = async () => {
    const token = getAuthToken();
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const res = await axios.get('http://localhost:4001/api/pg', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPgs(res.data);
      calculateStats(res.data);
    } catch (err) {
      console.error('Failed to load PGs:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setError('Failed to load PG listings');
      }
    }
  };

  // 4. Statistics Overview
  const calculateStats = (pgData) => {
    const total = pgData.length;
    const avgPrice =
      total > 0
        ? Math.round(pgData.reduce((sum, pg) => sum + pg.price, 0) / total)
        : 0;
    const totalValue = pgData.reduce((sum, pg) => sum + pg.price, 0);
    setStats({ total, avgPrice, totalValue });
  };

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      navigate('/login');
      return;
    }

    const loadDashboardData = async () => {
      try {
        // Get tenant profile first
        const payload = JSON.parse(atob(token.split('.')[1]));
        const myUserId = payload.user?.id || payload.id;

        const profileRes = await axios.get(`http://localhost:4001/api/tenant/${myUserId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTenant(profileRes.data);
        
        // Then fetch PGs with same authentication
        await fetchPGs();
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    loadDashboardData();
  }, [navigate,]);

  // 2. Search & Filter System
  const filteredPGs = pgs.filter((pg) => {
    const matchesSearch =
      pg.name?.toLowerCase().includes(search.toLowerCase()) ||
      pg.address?.toLowerCase().includes(search.toLowerCase()) ||
      pg.ownerName?.toLowerCase().includes(search.toLowerCase());

    const matchesPrice =
      (!filterPriceRange.min || pg.price >= parseInt(filterPriceRange.min)) &&
      (!filterPriceRange.max || pg.price <= parseInt(filterPriceRange.max));

    const matchesRoomType =
      !filterRoomType ||
      (pg.roomTypes &&
        pg.roomTypes.some((type) =>
          type.toLowerCase().includes(filterRoomType.toLowerCase())
        ));

    return matchesSearch && matchesPrice && matchesRoomType;
  });

  // 5. View Toggle
  const toggleMapView = () => {
    setMapView(!mapView);
  };

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

  const username = tenant?.fullName?.toLowerCase().replace(/\s+/g, '_') || 'user';

  return (
    <div className="profile-container">
      <div className="container" style={{ maxWidth: '1200px' }}>

        {/* Header */}
        <div className="d-flex align-items-end gap-4 mb-4">
          <img
            src={tenant?.imageUrl || 'https://via.placeholder.com/100'}
            alt={tenant?.fullName}
            className="avatar-img"
          />
          <div>
            <h1 className="username mb-0">@{username}</h1>
            <p className="fullname text-light mb-1">Tenant Dashboard - Find your perfect PG</p>
          </div>
        </div>

        <hr className="border-secondary" />

        {/* 4. Statistics Overview */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-4">
            <div className="stat-card">
              <FaHome className="icon text-primary" />
              <div className="value">{stats.total}</div>
              <div className="label">Available PGs</div>
            </div>
          </div>
          <div className="col-6 col-md-4">
            <div className="stat-card">
              <FaRupeeSign className="icon text-success" />
              <div className="value">₹{stats.avgPrice}</div>
              <div className="label">Average Rent</div>
            </div>
          </div>
          <div className="col-6 col-md-4">
            <div className="stat-card">
              <FaChartBar className="icon text-warning" />
              <div className="value">₹{stats.totalValue.toLocaleString()}</div>
              <div className="label">Total Value</div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="search-filter-section mb-4 p-3 bg-dark rounded">
          <div className="row g-3 align-items-center">
            
            {/* 2. Search & Filter System */}
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search PGs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Min Price"
                value={filterPriceRange.min}
                onChange={(e) => setFilterPriceRange({...filterPriceRange, min: e.target.value})}
              />
            </div>

            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Max Price"
                value={filterPriceRange.max}
                onChange={(e) => setFilterPriceRange({...filterPriceRange, max: e.target.value})}
              />
            </div>

            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                placeholder="Room Type"
                value={filterRoomType}
                onChange={(e) => setFilterRoomType(e.target.value)}
              />
            </div>

            {/* 5. View Toggle */}
            <div className="col-md-2">
              <button
                className={`btn ${mapView ? 'btn-success' : 'btn-outline-success'} w-100`}
                onClick={toggleMapView}
              >
                {mapView ? (
                  <>
                    <i className="fas fa-list me-2"></i>
                    List View
                  </>
                ) : (
                  <>
                    <i className="fas fa-map me-2"></i>
                    Map View
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 1. PG Listings Display */}
        <div className="pg-listings">
          {!mapView ? (
            <>
              {filteredPGs.length === 0 ? (
                <div className="empty-state text-center p-5">
                  <h5 className="text-light">
                    {pgs.length === 0
                      ? "No PGs available at the moment"
                      : "No PGs match your search criteria"}
                  </h5>
                </div>
              ) : (
                <div className="row g-4">
                  {filteredPGs.map((pg) => (
                    <div className="col-12 col-md-6 col-lg-4" key={pg._id}>
                      <div className="pg-card bg-dark rounded p-3 h-100">
                        <h6 className="text-light mb-2">{pg.name}</h6>
                        <p className="text-muted small mb-2">{pg.address}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-warning fw-bold">₹{pg.price}</span>
                          <span className="text-info small">{pg.ownerName}</span>
                        </div>
                        {pg.roomTypes && (
                          <div className="mt-2">
                            {pg.roomTypes.map((type, index) => (
                              <span key={index} className="badge bg-secondary me-1">
                                {type}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="map-view-placeholder bg-dark rounded p-5 text-center">
              <h5 className="text-light">Map View</h5>
              <p className="text-muted">Map integration would go here</p>
              <p className="text-info">Showing {filteredPGs.length} PGs</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;