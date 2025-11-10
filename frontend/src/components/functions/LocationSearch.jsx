// src/components/PG/LocationSearch.jsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Chip,
  Alert,
  CircularProgress,
  Slider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001/api";

const LocationSearch = ({ onSearchResults }) => {
  const [searchAddress, setSearchAddress] = useState('');
  const [radius, setRadius] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async () => {
    if (!searchAddress.trim()) {
      setError('Please enter a location to search');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`${API_BASE}/pgs/search/location`, {
        params: { address: searchAddress, radius }
      });

      const { searchLocation, results, count } = response.data;
      setSearchResults({ searchLocation, results, count });
      onSearchResults(results);

      if (count === 0) {
        setError(`No PGs found within ${radius} km of "${searchAddress}"`);
      }
    } catch (err) {
      console.error('Location search error:', err);
      setError(err.response?.data?.error || 'Failed to search location');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchAddress('');
    setSearchResults(null);
    setError('');
    onSearchResults([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom display="flex" alignItems="center">
        <LocationOnIcon sx={{ mr: 1 }} />
        Find PGs Near You
      </Typography>

      <Box display="flex" gap={2} alignItems="center" mb={2}>
        <TextField
          fullWidth
          size="small"
          placeholder="e.g., Connaught Place, Delhi"
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={loading}
          sx={{ minWidth: 100 }}
        >
          {loading ? <CircularProgress size={20} /> : 'Search'}
        </Button>
      </Box>

      <Box mb={2}>
        <Typography variant="subtitle2" gutterBottom>
          Radius: {radius} km
        </Typography>
        <Slider
          value={radius}
          onChange={(e, v) => setRadius(v)}
          min={1}
          max={50}
          step={1}
          marks={[
            { value: 1, label: '1km' },
            { value: 10, label: '10km' },
            { value: 25, label: '25km' },
            { value: 50, label: '50km' },
          ]}
          valueLabelDisplay="auto"
        />
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {searchResults && (
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle1" color="primary">
              {searchResults.count} PG{searchResults.count !== 1 ? 's' : ''} near "{searchResults.searchLocation.address}"
            </Typography>
            <Button size="small" onClick={handleClear}>Clear</Button>
          </Box>

          {searchResults.results.length > 0 && (
            <Box display="flex" flexWrap="wrap" gap={1}>
              {searchResults.results.slice(0, 5).map((pg) => (
                <Chip
                  key={pg._id}
                  label={`${pg.name} (${pg.distance.toFixed(1)}km)`}
                  variant="outlined"
                  color="primary"
                  clickable
                  onClick={() => window.open(`/rooms/${pg._id}`, '_blank')}
                />
              ))}
              {searchResults.results.length > 5 && (
                <Chip label={`+${searchResults.results.length - 5} more`} variant="outlined" />
              )}
            </Box>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default LocationSearch;