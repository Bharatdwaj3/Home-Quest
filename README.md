# PG Finder - Owner Dashboard

A comprehensive PG (Paying Guest) finder web application with a powerful owner dashboard for managing PG listings.

## Features

### Owner Dashboard
- **Dashboard Overview**: View statistics including total PGs, average rent, and total value
- **Add PG Listings**: Create new PG listings with comprehensive details
- **Edit PG Details**: Update existing PG information
- **Delete PG Listings**: Remove PG listings with confirmation
- **Search & Filter**: Advanced search and filtering capabilities
- **Image Management**: Upload and manage multiple images per PG
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### PG Listing Fields
- PG Name
- Monthly Rent (₹)
- Address/Location
- Room Types (Single, Double, Triple, etc.)
- Amenities (WiFi, AC, Parking, Laundry, etc.)
- Owner Name
- Owner Contact Number
- Multiple Images (up to 6 images)

### Search & Filter Options
- Search by PG name, address, or owner name
- Filter by price range (min/max)
- Filter by room type
- Real-time search results

## Technology Stack

### Frontend
- **React 19.1.1** - Modern React with hooks
- **Material-UI (MUI)** - Component library for beautiful UI
- **Bootstrap 5.3.8** - Additional styling framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Multer** - File upload middleware

## Project Structure

```
Pjt_PBL/
├── backend/
│   ├── models/
│   │   └── Pg.js              # PG data model
│   ├── routes/
│   │   └── Pgroutes.js        # API routes
│   ├── uploads/               # Image storage
│   ├── db.js                  # Database connection
│   ├── server.js              # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx     # Navigation component
│   │   │   ├── Pgform.jsx     # PG form component
│   │   │   ├── Pgcard.jsx     # Basic PG card
│   │   │   └── OwnerPgCard.jsx # Enhanced PG card for dashboard
│   │   ├── pages/
│   │   │   ├── Ownerdashboard.jsx    # Main owner dashboard
│   │   │   ├── Managepglisting.jsx   # PG management page
│   │   │   └── Pgdetails.jsx         # PG details page
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # App entry point
│   └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd Pjt_PBL/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up MongoDB connection in `db.js`:
   ```javascript
   mongoose.connect('mongodb://localhost:27017/pgfinder', {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   });
   ```

4. Start the server:
   ```bash
   npm start
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd Pjt_PBL/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   App will run on `http://localhost:5173`

## API Endpoints

### PG Management
- `GET /api/pgs` - Get all PGs
- `GET /api/pgs/:id` - Get single PG
- `POST /api/pgs` - Create new PG (with image upload)
- `PUT /api/pgs/:id` - Update PG (with image upload)
- `DELETE /api/pgs/:id` - Delete PG

### Image Upload
- Images are uploaded to `/uploads` directory
- Supports multiple image uploads (max 6 per PG)
- Images are served statically from `/uploads` endpoint

## Usage

### Adding a New PG
1. Click "Add New PG" button on the dashboard
2. Fill in all required fields:
   - PG Name
   - Monthly Rent
   - Owner Name
   - Owner Contact Number
   - Address
3. Add room types and amenities (comma-separated)
4. Upload images (up to 6 images)
5. Click "Create PG"

### Editing PG Details
1. Click "Edit" button on any PG card
2. Modify the required fields
3. Manage images (remove existing or add new ones)
4. Click "Save Changes"

### Searching and Filtering
1. Use the search bar to find PGs by name, address, or owner
2. Set price range filters for budget-based searches
3. Filter by room type for specific requirements
4. Clear filters using the chip delete buttons

## Features Highlights

### Dashboard Statistics
- **Total PGs**: Count of all PG listings
- **Average Rent**: Calculated average of all PG rents
- **Total Value**: Sum of all PG rents

### Image Management
- Upload multiple images per PG
- Preview images before upload
- Remove existing images
- Responsive image display

### Responsive Design
- Mobile-first approach
- Bootstrap grid system
- Material-UI components
- Gradient backgrounds and modern styling

### User Experience
- Real-time search
- Loading states
- Success/error notifications
- Confirmation dialogs
- Smooth animations and transitions

## Development

### Adding New Features
1. Backend: Add routes in `Pgroutes.js`
2. Frontend: Create components in `components/` directory
3. Update models if needed in `models/Pg.js`

### Styling
- Primary styling: Material-UI components
- Additional styling: Bootstrap classes
- Custom styles: Inline styles and sx props

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team.




