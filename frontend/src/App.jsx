import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ItemListPage from './pages/ItemListPage';
import ItemDetailPage from './pages/ItemDetailPage';
import ReportItemPage from './pages/ReportItemPage';
import NotificationsPage from './pages/NotificationsPage';
import MyItemsPage from './pages/MyItemsPage';
import MyClaimsPage from './pages/MyClaimsPage';
import ClaimsOnMyItemsPage from './pages/ClaimsOnMyItemsPage';
import EditItemPage from './pages/EditItemPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
import { Toaster } from 'react-hot-toast'; // Import Toaster

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} /> {/* Add Toaster here */}
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Public Item Routes */}
          <Route path="/items" element={<ItemListPage />} />
          <Route path="/items/:id" element={<ItemDetailPage />} />

          {/* Protected Routes */}
          <Route path="" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/report-item" element={<ReportItemPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/my-items" element={<MyItemsPage />} />
            <Route path="/my-claims" element={<MyClaimsPage />} />
            <Route path="/claims-on-my-items" element={<ClaimsOnMyItemsPage />} />
            <Route path="/items/:id/edit" element={<EditItemPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;