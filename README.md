# Pharmacy Medicine Stock System

A full-stack Pharmacy Medicine Stock Management System developed for a midterm project.

The system allows pharmacy staff to manage medicine inventory through a web-based interface. Users can add, view, update, delete, search, and monitor medicine records.

## Technologies Used

### Frontend
- React
- Vite
- Axios
- Lucide React
- CSS

### Backend
- Node.js
- Express.js
- Mongoose
- CORS
- dotenv

### Database
- MongoDB
- MongoDB Compass

## Main Features

- Add new medicine records
- View all medicines
- Search medicines
- Edit medicine information
- Delete medicine records
- Display medicine quantity
- Display medicine expiry dates
- Display medicine prices
- Dashboard summary cards
- Form validation and error feedback
- Responsive pharmacy dashboard interface

## Medicine Data

Each medicine record contains:

- Medicine Name
- Brand
- Quantity
- Expiry Date
- Price

## Project Structure

```text
Pharmacy_Medicine_Stock/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── medicineController.js
│   ├── models/
│   │   └── Medicine.js
│   ├── routes/
│   │   └── medicineRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
