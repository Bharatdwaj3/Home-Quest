import React, { useState, useEffect, useCallback } from "react";
import {
  Box, Button, Container, Dialog, DialogActions,
  DialogContent, DialogTitle, Stack, IconButton,
  TextField, Alert, Checkbox, CircularProgress,
  Typography
} from "@mui/material";
import { Add as AddIcon, Close as CloseIcon } from "@mui/icons-material";

const initialForm = {
  h_no: "", 
  landmark: "", 
  type: "", 
  city: "", 
  area: "",
  rooms: { bedrooms: 1, washroom: 1 },
  latitude: 30.2689, 
  longitude: 77.9931,
  avaliable: true, 
  image: null, 
  preview: ""
};

export default function PGManager({ onSave }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const getToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    return () => {
      if (form.preview) URL.revokeObjectURL(form.preview);
    };
  }, [form.preview]);

  const handleInput = useCallback((e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === "checkbox") {
      setForm(prev => ({ ...prev, [name]: checked }));
    } else if (type === "file" && files && files[0]) {
      const file = files[0];
      setForm(prev => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file)
      }));
    } else if (name.startsWith("rooms.")) {
      const roomKey = name.split(".")[1];
      setForm(prev => ({
        ...prev,
        rooms: { ...prev.rooms, [roomKey]: Number(value) }
      }));
    } else if (name === "latitude" || name === "longitude") {
      // Handle coordinates - convert to number
      setForm(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  }, []);

  const reset = () => {
    setForm(initialForm);
    setError("");
    setOpen(false);
  };

  const createPG = async () => {
    const token = getToken();
    if (!token) {
      setError("Please log in first");
      return;
    }

    // Validation
    const required = ["h_no", "landmark", "type", "city", "area"];
    for (const field of required) {
      if (!form[field]?.trim()) {
        setError(`${field.replace('_', ' ')} is required`);
        return;
      }
    }

    // Validate coordinates
    if (isNaN(form.latitude) || isNaN(form.longitude)) {
      setError("Latitude and Longitude must be valid numbers");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      
      // Append all fields exactly as backend expects
      formData.append("h_no", form.h_no.trim());
      formData.append("landmark", form.landmark.trim());
      formData.append("type", form.type.trim());
      formData.append("city", form.city.trim());
      formData.append("area", form.area.trim());
      formData.append("rooms", JSON.stringify({
        bedrooms: parseInt(form.rooms.bedrooms),
        washroom: parseInt(form.rooms.washroom)
      }));
      formData.append("latitude", form.latitude.toString());
      formData.append("longitude", form.longitude.toString());
      formData.append("avaliable", form.avaliable.toString()); // Matches backend schema
      
      if (form.image) {
        formData.append("image", form.image);
      }

      console.log("Sending PG data to backend:", {
        h_no: form.h_no,
        landmark: form.landmark,
        type: form.type,
        city: form.city,
        area: form.area,
        rooms: form.rooms,
        latitude: form.latitude,
        longitude: form.longitude,
        avaliable: form.avaliable,
        hasImage: !!form.image
      });

      const response = await fetch("http://localhost:4001/api/pg", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
          // Don't set Content-Type for FormData - let browser set it
        },
        body: formData
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error("Backend error response:", data);
        throw new Error(data.message || `Server error: ${response.status}`);
      }

      console.log("✅ PG created successfully:", data);
      
      reset();
      alert("PG added successfully!");

      if (onSave) onSave();

    } catch (err) {
      console.error("❌ Error creating PG:", err);
      setError(err.message || "Failed to create PG. Please check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{ 
            bgcolor: "primary.main",
            '&:hover': {
              bgcolor: "primary.dark"
            }
          }}
        >
          Add New PG
        </Button>
      </Box>

      <Dialog open={open} onClose={reset} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          bgcolor: 'background.paper'
        }}>
          Add New PG
          <IconButton onClick={reset} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ bgcolor: 'background.default' }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Stack spacing={2} sx={{ mt: 1 }}>
            {/* Basic Information */}
            <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>
              Basic Information
            </Typography>
            
            {["h_no", "landmark", "type", "city", "area"].map(field => (
              <TextField
                key={field}
                label={field.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                name={field}
                value={form[field]}
                onChange={handleInput}
                fullWidth
                required
                variant="outlined"
                size="small"
              />
            ))}

            {/* Room Details */}
            <Typography variant="h6" sx={{ color: 'primary.main', mb: 1, mt: 2 }}>
              Room Details
            </Typography>
            
            <TextField 
              label="Bedrooms" 
              name="rooms.bedrooms" 
              type="number" 
              value={form.rooms.bedrooms} 
              onChange={handleInput} 
              fullWidth 
              required 
              variant="outlined"
              size="small"
              inputProps={{ min: 1 }}
            />
            
            <TextField 
              label="Washrooms" 
              name="rooms.washroom" 
              type="number" 
              value={form.rooms.washroom} 
              onChange={handleInput} 
              fullWidth 
              required 
              variant="outlined"
              size="small"
              inputProps={{ min: 1 }}
            />

            {/* Coordinates */}
            <Typography variant="h6" sx={{ color: 'primary.main', mb: 1, mt: 2 }}>
              Location Coordinates
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField 
                label="Latitude" 
                name="latitude" 
                type="number" 
                inputProps={{ 
                  step: "0.0001",
                  min: "-90",
                  max: "90"
                }} 
                value={form.latitude} 
                onChange={handleInput} 
                fullWidth 
                variant="outlined"
                size="small"
                helperText="e.g., 30.2689"
              />
              
              <TextField 
                label="Longitude" 
                name="longitude" 
                type="number" 
                inputProps={{ 
                  step: "0.0001",
                  min: "-180", 
                  max: "180"
                }} 
                value={form.longitude} 
                onChange={handleInput} 
                fullWidth 
                variant="outlined"
                size="small"
                helperText="e.g., 77.9931"
              />
            </Box>

            {/* Availability & Image */}
            <Typography variant="h6" sx={{ color: 'primary.main', mb: 1, mt: 2 }}>
              Additional Details
            </Typography>

            <Stack direction="row" alignItems="center">
              <Checkbox 
                checked={form.avaliable} 
                onChange={handleInput} 
                name="avaliable"
                color="primary"
              />
              <span>Available for booking</span>
            </Stack>

            <Button variant="outlined" component="label" fullWidth size="small">
              {form.preview ? "Change Image" : "Upload PG Image"}
              <input type="file" hidden accept="image/*" onChange={handleInput} />
            </Button>

            {form.preview && (
              <Box sx={{ position: "relative", mt: 1, textAlign: "center" }}>
                <img 
                  src={form.preview} 
                  alt="preview" 
                  style={{ 
                    maxHeight: 150, 
                    maxWidth: '100%',
                    borderRadius: 8,
                    border: '1px solid #ddd'
                  }} 
                />
                <IconButton
                  size="small"
                  sx={{ 
                    position: "absolute", 
                    top: 4, 
                    right: 4, 
                    bgcolor: 'background.paper',
                    '&:hover': { bgcolor: 'grey.100' }
                  }}
                  onClick={() => setForm(p => ({ ...p, image: null, preview: "" }))}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Stack>
        </DialogContent>

        <DialogActions sx={{ bgcolor: 'background.paper' }}>
          <Button onClick={reset} disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={createPG} 
            variant="contained" 
            disabled={loading} 
            startIcon={loading ? <CircularProgress size={16} /> : null}
            color="primary"
          >
            {loading ? "Creating…" : "Create PG"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}