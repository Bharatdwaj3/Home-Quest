import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaSpinner } from 'react-icons/fa';
import '../../style/pg-manager.scss';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4001';

const PGManager = () => {
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPG, setEditingPG] = useState(null);
  const [preview, setPreview] = useState('');
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    h_no: '',
    landmark: '',
    type: '',
    city: '',
    area: '',
    'rooms.bedrooms': '',
    'rooms.washroom': '',
    image: null,
  });

  // Fetch PGs + filter by owner
  useEffect(() => {
    const fetchPGs = async () => {
      try {
        const token = localStorage.getItem('token');
        const payload = JSON.parse(atob(token.split('.')[1]));
        const ownerId = payload.user?.id || payload.id;

        const res = await axios.get(`${API_BASE}/api/pg`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const myPGs = res.data.filter((pg) => pg.userId?.toString() === ownerId);
        setPgs(myPGs);
        setLoading(false);
      } catch (err) {
        setError('Failed to load your PGs',err);
        setLoading(false);
      }
    };
    fetchPGs();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setForm({
      h_no: '',
      landmark: '',
      type: '',
      city: '',
      area: '',
      'rooms.bedrooms': '',
      'rooms.washroom': '',
      image: null,
    });
    setPreview('');
    setEditingPG(null);
    setShowForm(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setError('');

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('h_no', form.h_no);
    formData.append('landmark', form.landmark);
    formData.append('type', form.type);
    formData.append('city', form.city);
    formData.append('area', form.area);
    formData.append('rooms[bedrooms]', form['rooms.bedrooms']);
    formData.append('rooms[washroom]', form['rooms.washroom']);
    if (form.image) formData.append('image', form.image);

    try {
      let res;
      if (editingPG) {
        res = await axios.put(`${API_BASE}/api/pg/${editingPG._id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setPgs(pgs.map((pg) => (pg._id === editingPG._id ? res.data : pg)));
      } else {
        res = await axios.post(`${API_BASE}/api/pg`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setPgs([...pgs, res.data]);
      }
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = (pg) => {
    setEditingPG(pg);
    setForm({
      h_no: pg.h_no || '',
      landmark: pg.landmark || '',
      type: pg.type || '',
      city: pg.city || '',
      area: pg.area || '',
      'rooms.bedrooms': pg.rooms?.bedrooms || '',
      'rooms.washroom': pg.rooms?.washroom || '',
      image: null,
    });
    setPreview(pg.imageUrl || '');
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this PG? This cannot be undone.')) return;
    setActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE}/api/pg/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPgs(pgs.filter((pg) => pg._id !== id));
    } catch (err) {
      setError('Delete failed',err);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <FaSpinner className="spin" /> Loading your PGs...
      </div>
    );
  }

  return (
    <div className="pg-manager">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>My PGs ({pgs.length})</h3>
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm(true)}>
          <FaPlus /> Add PG
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-3">
        {pgs.length === 0 ? (
          <div className="col-12 text-center py-5 text-muted">
            No PGs yet. Click "Add PG" to create one.
          </div>
        ) : (
          pgs.map((pg) => (
            <div key={pg._id} className="col-md-6 col-lg-4">
              <div className="pg-card h-100">
                <img
                  src={pg.imageUrl || 'https://via.placeholder.com/300x200'}
                  alt={pg.h_no}
                  className="pg-img"
                />
                <div className="p-3">
                  <h5 className="mb-1">{pg.h_no}</h5>
                  <p className="text-muted small mb-1">{pg.landmark}, {pg.area}</p>
                  <p className="text-muted small mb-2">{pg.city} • {pg.type}</p>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleEdit(pg)}
                      disabled={actionLoading}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(pg._id)}
                      disabled={actionLoading}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="modal-backdrop">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5>{editingPG ? 'Edit PG' : 'Add New PG'}</h5>
                <button className="btn-close" onClick={resetForm}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label>House No.</label>
                      <input
                        type="text"
                        className="form-control"
                        value={form.h_no}
                        onChange={(e) => setForm({ ...form, h_no: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Landmark</label>
                      <input
                        type="text"
                        className="form-control"
                        value={form.landmark}
                        onChange={(e) => setForm({ ...form, landmark: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Type</label>
                      <select
                        className="form-control"
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                        required
                      >
                        <option value="">Select</option>
                        <option value="Boys">Boys</option>
                        <option value="Girls">Girls</option>
                        <option value="Family">Family</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label>City</label>
                      <input
                        type="text"
                        className="form-control"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Area</label>
                      <input
                        type="text"
                        className="form-control"
                        value={form.area}
                        onChange={(e) => setForm({ ...form, area: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Bedrooms</label>
                      <input
                        type="number"
                        className="form-control"
                        value={form['rooms.bedrooms']}
                        onChange={(e) => setForm({ ...form, 'rooms.bedrooms': e.target.value })}
                        min="0"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Washrooms</label>
                      <input
                        type="number"
                        className="form-control"
                        value={form['rooms.washroom']}
                        onChange={(e) => setForm({ ...form, 'rooms.washroom': e.target.value })}
                        min="0"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label>Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                      />
                      {preview && (
                        <img src={preview} alt="Preview" className="img-preview mt-2" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={resetForm}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={actionLoading}>
                    {actionLoading ? (
                      <>
                        <FaSpinner className="spin" /> Saving...
                      </>
                    ) : (
                      'Save PG'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PGManager;