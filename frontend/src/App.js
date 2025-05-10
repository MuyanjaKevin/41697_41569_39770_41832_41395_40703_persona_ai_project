import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';

import Footer from './components/Footer';

import HomePage from './Pages/HomePage';

import RegisterPage from './Pages/RegisterPage';

import LoginPage from './Pages/LoginPage';

import ProfilePage from './Pages/ProfilePage';

import ProtectedRoute from './components/ProtectedRoute';

import ShopPage from './Pages/ShopPage';

import StyleQuestionnaire from './components/StyleQuestionnaire';

import StyleResultsPage from './Pages/StyleResultsPage';
import ProductDetailPage from './Pages/ProductDetailPage';
 
function App() {

  return (
<Router>
<AuthProvider>
<div className="min-h-screen flex flex-col">
<Navbar />
<main className="flex-grow">
<Routes>
<Route path="/" element={<HomePage />} />
<Route path="/register" element={<RegisterPage />} />
<Route path="/login" element={<LoginPage />} />

              {/* Protected routes */}
<Route element={<ProtectedRoute />}>
<Route path="/profile" element={<ProfilePage />} />

                {/* New routes for style profile feature */}
<Route path="/style-questionnaire" element={<StyleQuestionnaire />} />
<Route path="/style-results" element={<StyleResultsPage />} />
<Route path="/shop" element={<ShopPage />} />
<Route path="/product/:productId" element={<ProductDetailPage />} />

                {/* Add more protected routes here */}
</Route>
</Routes>
</main>
<Footer />
</div>
</AuthProvider>
</Router>

  );

}
 
export default App;
 