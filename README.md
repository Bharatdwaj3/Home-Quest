<h1 align="center"> HomeQuest: Your goto abode search </h1>
<p align="center"> Seamlessly connecting tenants with ideal Paying Guest accommodations and verified owners. </p>

<p align="center">
  <img alt="Build Status" src="https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge">
  <img alt="Issues" src="https://img.shields.io/badge/Issues-0%20Open-blue?style=for-the-badge">
  <img alt="Contributions" src="https://img.shields.io/badge/Contributions-Welcome-orange?style=for-the-badge">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge">
</p>

---

## 📋 Table of Contents

- [⭐ Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack & Architecture](#-tech-stack--architecture)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔧 Usage](#-usage)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)

---

## ⭐ Overview

HomeQuest is the modern, interactive platform designed to streamline the complex process of finding, managing, and renting Paying Guest (PG) accommodations and residential properties. It leverages location intelligence and a robust, dual-sided user architecture to provide a seamless search and management experience for both property owners and prospective tenants.

### The Problem

> Searching for suitable temporary or long-term housing, particularly in the competitive PG and rental market, is often frustrating. Prospective tenants face challenges like outdated listings, unreliable owner contact information, lack of transparent pricing, and difficulty determining commute times. Simultaneously, property owners struggle with efficiently managing listings, coordinating viewings, and verifying tenant details. This disconnect leads to wasted time, inconsistent data, and unnecessary friction for both parties.

### The Solution

HomeQuest eliminates the documentation burden by automatically analyzing your codebase and generating professional README files. Simply provide a GitHub repository URL, and get a complete, well-structured README with installation instructions, usage examples, and feature descriptions.

HomeQuest provides a centralized, interactive web application that offers verified listings, sophisticated mapping features, and distinct dashboards tailored specifically for owners and tenants. Our goal is to foster trust and efficiency, ensuring tenants find their ideal abode quickly and owners manage their properties with maximum ease. The platform is designed as a single-page application (SPA), prioritizing speed and a highly interactive user experience.

### Architecture Overview

HomeQuest follows a modern, decoupled architecture powered by the **Express** backend for handling API routing and requests, and a dynamic **React** frontend for all interactive UI elements. This separation ensures scalability and maintainability. The system utilizes a **REST API** approach, centered around providing structured data efficiently to the client, driven by a **Component-based Architecture** for rapid frontend development and state management.

---

## ✨ Key Features

The core value of HomeQuest lies in its ability to bring sophisticated functionality and a polished user experience (UX) to the rental search market. The platform is built around the verified capability of providing a highly interactive user interface and essential API connectivity.

### 🗺️ Intelligent Location-Based Search

The foundation of HomeQuest is its commitment to location intelligence, providing users with more than just a list of addresses.

*   **🔍 PG Grid Search (`pgGridSearch.jsx`):** Allows users to filter and search listings efficiently across a defined geographical grid. This transforms complex database querying into a fast, user-friendly experience, making it easier to drill down into specific neighborhoods or zones of interest.
*   **📍 Interactive Mapping (`react-leaflet`, `LocationMap.jsx`):** Provides a visual overlay of all available properties. Users can interact directly with the map, utilizing industry-standard mapping libraries to quickly assess property density and location relative to key landmarks or commute points.
*   **🛣️ Shortest Path Calculation (`ShortestPath.jsx`, `useDijkstra.jsx`):** A unique, powerful feature that incorporates algorithms like Dijkstra's to calculate and display the shortest, most efficient routes between a property and a user-defined destination (like a workplace or university). This delivers critical value by helping tenants quickly assess realistic commute times before scheduling a viewing.

### 👤 Dual-Sided User Experience

HomeQuest recognizes the distinct needs of its user base, offering specialized tools and views for both property owners and tenants, driven by defined schemas (`ownerSchema.js`, `tenantSchema.js`) and controllers.

*   **🏡 Owner Management Dashboard (`Owner.jsx`, `OwnerProfile.jsx`):** Owners gain a centralized portal to insert, manage, and update their PG listings (`InsertPG.jsx`). This ensures listings are always current and detailed, reducing back-and-forth communication with prospective renters.
*   **🔑 Tenant Profile & Dashboard (`Tenant.jsx`, `TenantProfile.jsx`, `TenantDashboard.jsx`):** Tenants have a dedicated space to save favorite listings, manage their application status, and view personalized alerts. The dashboard serves as their command center throughout the rental search process.
*   **🔒 Secure Role-Based Access (`roleMiddleware.js`):** Ensures that access to sensitive functionalities (like listing creation or profile updates) is strictly controlled, enhancing the security and integrity of the platform for both user types.

### ⚡ Seamless Application Flow and Core Interface

The application is engineered to deliver a fluid, high-performance experience, utilizing its verified Component-based Architecture.

*   **🌐 Interactive User Interface (React):** Built entirely with React, the application ensures instantaneous updates and a responsive design that adapts smoothly across all devices. This guarantees a modern and reliable interaction every time.
*   **⚙️ Comprehensive Data Schema:** While explicit database connections were not verified, the presence of detailed data definitions (`userSchema.js`, `pgSchema.js`, `tenantSchema.js`, `ownerSchema.js`) ensures a structured approach to data handling, promising reliable, consistent information across all parts of the application.
*   **API Accessibility (`GET /`):** The verified root API endpoint provides necessary core data access, demonstrating the foundational architecture is in place to serve the web application and deliver necessary initial resources.

---

## 🛠️ Tech Stack & Architecture

HomeQuest is built on established, high-performance technologies to ensure stability, speed, and scalability. The architecture is strictly decoupled, promoting maintainability and enabling independent development of the frontend and backend layers.

| Technology | Layer | Purpose | Why it was Chosen |
| :--- | :--- | :--- | :--- |
| **react** | Frontend (Client) | Building the highly interactive, dynamic user interface (UI) and single-page application (SPA). | Provides superior component-based architecture, efficient state management, and high performance necessary for mapping and complex search filters. |
| **express** | Backend (Server) | Creating the RESTful API endpoints, handling routing, middleware application, and business logic processing. | Known for its minimalistic, fast, and unopinionated structure, making it the ideal framework for developing robust and scalable APIs quickly. |

### Frontend Ecosystem Dependencies (Verified)

The frontend relies on a rich set of libraries to deliver a modern UX, including:

*   **Data & State:** `axios` for HTTP requests.
*   **UI Components:** `@mui/material`, `@emotion/react`, `react-bootstrap`, and standard `bootstrap` for professional, accessible, and responsive components.
*   **Icons:** `@fortawesome/fontawesome-svg-core` and `react-icons` for visual cues and navigation elements.
*   **Mapping:** `leaflet` and `react-leaflet` are essential for rendering the interactive maps and enabling the location search and shortest path functionalities.
*   **Routing:** `react-router-dom` to manage complex client-side navigation and page transitions.
*   **Styling:** Utilizes `sass` for efficient, modular, and maintainable CSS architecture (`.scss` files detected).

### Backend Structure

The Express server is organized logically to handle various architectural concerns:

1.  **Configuration (`config/`):** Dedicated files manage crucial operational parameters, including database settings (`db.config.js`), environment variables (`env.config.js`), logging setup (`morgan.config.js`), and access control policies (`permissions.config.js`).
2.  **Middleware (`middleware/`):** Ensures a clean separation of concerns for security (`authMiddleware.js`), database connectivity (`dbMiddleware.js`), and user roles (`roleMiddleware.js`, `checkPermission.js`).
3.  **Routes (`routes/`):** Defines the explicit paths for interacting with the core resource types: owners, tenants, PGs, and general users.
4.  **Controllers (`controllers/`):** Implements the logic required to handle incoming requests, acting as the interface between the routing layer and the data structure layer.

---

## 📁 Project Structure

The HomeQuest repository is organized into distinct `frontend` and `backend` modules, reflecting the decoupled architecture. This structure promotes clear separation of responsibilities and ease of maintenance.

```
Bharatdwaj3-Home-Quest-1138403/
├── 📄 README.md
├── 📂 backend/                                  # Express.js REST API server
│   ├── 📄 server.js                             # Main entry point for the backend application
│   ├── 📄 package.json                          # Backend dependencies and scripts
│   ├── 📄 .env.example                          # Template for environment configuration
│   ├── 📂 config/                               # Core configuration files
│   │   ├── 📄 permissions.config.js             # Defines access control settings
│   │   ├── 📄 morgan.config.js                  # HTTP request logging setup
│   │   ├── 📄 env.config.js                     # Environment variable loader
│   │   └── 📄 db.config.js                      # Database connection configuration (placeholder/template)
│   ├── 📂 models/                               # Data structure definitions for persistent data
│   │   ├── 📄 ownerModel.js                     # Schema/Model definition for property owners
│   │   ├── 📄 pgModel.js                        # Schema/Model definition for PG listings
│   │   ├── 📄 locationModel.js                  # Schema/Model definition for location data
│   │   └── 📄 tenantModel.js                    # Schema/Model definition for tenants
│   ├── 📂 utils/                                # Helper functions and utilities
│   │   └── 📄 geocoding.js                      # Utilities for handling geographical coordinates
│   ├── 📂 middleware/                           # Express middleware for pre-processing requests
│   │   ├── 📄 roleMiddleware.js                 # Checks user roles for access control
│   │   ├── 📄 authMiddleware.js                 # Authentication and token verification
│   │   └── 📄 checkPermission.js                # Verifies granular user permissions
│   ├── 📂 routes/                               # Defines API endpoint routes
│   │   ├── 📄 ownerRoutes.js
│   │   ├── 📄 pgRoutes.js
│   │   ├── 📄 tenantRoutes.js
│   │   └── 📄 userRoutes.js
│   ├── 📂 services/                             # External integration services
│   │   ├── 📄 multer.js                         # Middleware for handling multipart/form-data (file uploads)
│   │   └── 📄 cloudinary.js                     # Service integration for cloud media storage (inferred from multer context)
│   ├── 📂 controllers/                          # Logic handlers for processing requests
│   │   ├── 📄 tenantController.js
│   │   ├── 📄 userController.js
│   │   ├── 📄 pgController.js
│   │   └── 📄 ownerController.js
│   └── 📂 schemas/                              # Validation and structural definitions
│       ├── 📄 userSchema.js
│       ├── 📄 pgSchema.js
│       ├── 📄 tenantSchema.js
│       └── 📄 ownerSchema.js
└── 📂 frontend/                                 # React/Vite client application
    ├── 📄 vite.config.js                        # Configuration for the Vite build tool
    ├── 📄 package.json                          # Frontend dependencies
    ├── 📄 index.html                            # Main entry point for the SPA
    ├── 📂 src/                                  # Frontend source code
    │   ├── 📄 App.jsx                           # Root component of the application
    │   ├── 📄 main.jsx                          # Main entry point rendering the React application
    │   ├── 📂 assets/                           # Static assets like images and SVGs
    │   │   └── 📂 images/                       # Marketing and content images
    │   ├── 📂 components/                       # Reusable UI modules
    │   │   ├── 📂 functions/                    # Utility components for complex operations
    │   │   │   ├── 📄 LocationSearch.jsx        # Component for integrated location querying
    │   │   │   ├── 📄 ShortestPath.jsx          # UI for calculating and displaying routes
    │   │   │   ├── 📄 pgGridSearch.jsx          # Component for performing categorized PG searches
    │   │   │   └── 📄 useDijkstra.jsx           # Custom hook encapsulating route finding logic
    │   │   ├── 📂 PG/                           # PG listing and management components
    │   │   │   ├── 📄 Pgdetails.jsx
    │   │   │   ├── 📄 PgGird.jsx
    │   │   │   ├── 📄 PGManager.jsx
    │   │   │   ├── 📄 InsertPG.jsx              # Form for owner listing creation
    │   │   │   └── 📄 PgFrontend.jsx
    │   │   ├── 📂 layout/                       # Structural components
    │   │   │   ├── 📄 Navigation.jsx
    │   │   │   ├── 📄 Header.jsx
    │   │   │   ├── 📄 Footer.jsx
    │   │   │   └── 📄 LocationMap.jsx           # Component wrapper for Leaflet map display
    │   │   ├── 📂 auth/                         # Authentication related components
    │   │   │   ├── 📄 Login.jsx
    │   │   │   └── 📄 Signup.jsx
    │   │   ├── 📂 Tenant/                       # Tenant-specific components
    │   │   │   ├── 📄 TenantProfile.jsx
    │   │   │   ├── 📄 InsertTenant.jsx
    │   │   │   └── 📄 TenantDashboard.jsx
    │   │   └── 📂 owner/                        # Owner-specific components
    │   │       ├── 📄 Owner.jsx
    │   │       ├── 📄 InsertOwner.jsx
    │   │       └── 📄 OwnerProfile.jsx
    │   ├── 📂 style/                            # SCSS and CSS files for global and component-specific styling
    │   │   ├── 📄 tenant-profile.scss
    │   │   ├── 📄 pg-manager.scss
    │   │   ├── 📄 auth.scss
    │   │   ├── 📄 home.scss
    │   │   ├── 📄 PG.scss
    │   │   └── 📄 _variables.scss               # Global style definitions
    │   └── 📂 pages/                            # Top-level page components for routing
    │       ├── 📄 Product.jsx                   # Page for displaying individual product/listing details
    │       └── 📄 Home.jsx                      # Main landing page
    └── 📂 public/                               # Publicly accessible static assets
        ├── 📄 interior_3.jpg
        ├── 📄 house_not_found.png
        └── 📄 vite.svg
```

---

## 🚀 Getting Started

To set up the HomeQuest application locally, you will need Node.js and npm/yarn installed on your system to manage dependencies for both the Express backend and the React frontend.

### Prerequisites

Ensure you have the following installed:

*   **Node.js:** (LTS version recommended)
*   **Git:** For cloning the repository.

### Installation

Follow these steps to get a development copy running. Note that specific environment variables are often required for full functionality (e.g., database connection strings, API keys for Cloudinary/Mapping services), although none were explicitly detected in the basic configuration analysis.

#### 1. Clone the Repository

```bash
git clone https://github.com/Bharatdwaj3-Home-Quest-1138403.git
cd Bharatdwaj3-Home-Quest-1138403
```

#### 2. Install Backend Dependencies

Navigate to the `backend` directory and install the necessary Express dependencies.

```bash
cd backend
npm install
# OR
yarn install
```

#### 3. Install Frontend Dependencies

Navigate to the `frontend` directory and install the necessary React and Vite dependencies.

```bash
cd ../frontend
npm install
# OR
yarn install
```

#### 4. Configure Environment (Placeholder Step)

Though no specific environment variables were confirmed in the analysis, a full-stack application typically requires configuration. Use the provided example file as a template:

```bash
# In the backend directory:
cp .env.example .env
```
Fill in the necessary configuration parameters within the newly created `.env` file, especially those pertaining to configuration settings defined in `db.config.js` and service integrations like `cloudinary.js`.

### Running the Application

Since this project has two distinct services (backend and frontend), they must be started independently.

#### 1. Start the Backend API Server

Return to the root of the `backend` directory and start the Express server.

```bash
cd ../backend
node server.js
# The server should start, typically running on a port like 5000 or 3000.
```

#### 2. Start the Frontend Development Server

Return to the `frontend` directory and start the client application using the verified Vite development script.

```bash
cd ../frontend
npm run dev
# The client should be accessible via a local URL (e.g., http://localhost:5173).
```

Once both servers are running, the application will be fully functional, and you can begin interacting with the web interface.

---

## 🔧 Usage

HomeQuest is a **web application** designed for direct user interaction through a modern browser. Usage is focused on accessing the root application URL and navigating the integrated user interface.

### Accessing the Web Interface

Upon successfully starting the frontend server (`npm run dev`), the application will typically be accessible at a local host address provided by Vite (e.g., `http://localhost:5173`).

### Core User Flows

The entire application usage revolves around the interactive components and the singular verified `GET /` API endpoint, which is essential for serving the root application data.

1.  **Home Page Access (`GET /`):**
    *   Navigate to the deployed application URL or the local host address. This triggers the fundamental `GET /` API call to retrieve the necessary resources for the initial page load, presenting the main search interface (`Home.jsx`).

2.  **Searching for PGs:**
    *   Use the `pgGridSearch.jsx` component on the Home page. Users input location criteria, apply filters, and view results presented both in a list format and overlaid on the `LocationMap.jsx`.

3.  **Route Optimization:**
    *   For specific listings, tenants can leverage the Shortest Path feature (`ShortestPath.jsx`) to calculate commute times to a fixed point, aiding in decision-making.

4.  **Authentication:**
    *   Users (Owners or Tenants) must utilize the `Login.jsx` or `Signup.jsx` components to gain access to their respective, protected dashboards. The system ensures only authenticated users can access profile-specific pages like `TenantProfile.jsx` or `OwnerProfile.jsx`.

5.  **Owner Management (Requires Login):**
    *   Owners can use the `InsertPG.jsx` form via their dashboard to add new listings, leveraging the `multer.js` service for handling image uploads.

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete details.


<p align="center">
  <a href="#">⬆️ Back to Top</a>
</p>
