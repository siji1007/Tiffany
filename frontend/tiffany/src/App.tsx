import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from './components/login';

// pages
import Dashboard from './pages/dashboard';
import Inventory from './pages/inventory';
import Products from './pages/products';
import Reports from './pages/reports';
import Sales from './pages/sales';

// layout
import LandingPage from './components/landingpage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Protected/Main Layout Routes */}
        <Route path="/admin" element={<LandingPage />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="sales" element={<Sales />} />
          <Route path="reports" element={<Reports />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
