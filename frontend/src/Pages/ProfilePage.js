import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
 
function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  // Show loading state
  if (loading) {
    return (
<div className="container mx-auto max-w-md px-4 py-8 text-center">
<p>Loading profile...</p>
</div>
    );
  }
  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }
  // Render style section
  const renderStyleSection = () => {
    if (user && user.style_profile) {
      return (
<div className="border-t pt-4 mt-4">
<h3 className="text-lg font-semibold mb-2">Style Profile</h3>
<p>You have a style profile. View recommendations based on your preferences.</p>
<div className="mt-2 flex space-x-2">
<button 
              onClick={() => navigate('/style-results')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
>
              View Style Profile
</button>
<button 
              onClick={() => navigate('/shop')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
>
              See Recommendations
</button>
</div>
</div>
      );
    } else {
      return (
<div className="border-t pt-4 mt-4">
<h3 className="text-lg font-semibold mb-2">Style Profile</h3>
<p>You don't have a style profile yet. Create one to get personalized recommendations!</p>
<button 
            onClick={() => navigate('/style-questionnaire')}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
>
            Create Style Profile
</button>
</div>
      );
    }
  };
  return (
<div className="container mx-auto max-w-md px-4 py-8">
<h1 className="text-3xl font-bold text-center mb-6">Your Profile</h1>
<div className="bg-white shadow rounded-lg p-6">
<div className="flex items-center space-x-4 mb-4">
<div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl">
            {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
</div>
<div>
<h2 className="text-xl font-bold">{user.username}</h2>
<p className="text-gray-600">{user.email}</p>
</div>
</div>
<div className="border-t pt-4">
<h3 className="text-lg font-semibold mb-2">Account Details</h3>
<p className="text-gray-600">Member since: {new Date(user.created_at).toLocaleDateString()}</p>
</div>
        {renderStyleSection()}
<div className="mt-6">
<button 
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
>
            Log Out
</button>
</div>
</div>
</div>
  );
}
 
export default ProfilePage;