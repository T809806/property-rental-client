import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AddProperty from "./pages/AddProperty";

import PrivateRoute from "./components/PrivateRoute";

import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import OwnerDashboard from "./pages/OwnerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ErrorPage from "./pages/ErrorPage";


const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0b1220] text-white">

      {/* NAVBAR */}
      <Navbar />

      {/* CONTENT */}
      <main className="flex-1">
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/property/:id" element={<PrivateRoute><PropertyDetails /></PrivateRoute>} />
          <Route path="/add-property" element={<PrivateRoute><AddProperty /></PrivateRoute>} />
          <Route path="/owner-dashboard" element={<PrivateRoute><OwnerDashboard /></PrivateRoute>} />
          <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />

          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />

          <Route path="*" element={<ErrorPage />} />

        </Routes>
      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default App;