import React from 'react';

function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <section className="text-center my-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to PersonaShop</h1>
        <p className="text-xl mb-8">Discover products tailored to your unique style</p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Create Your Style Profile
        </button>
      </section>
      
      <section className="my-12">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border p-4 rounded-lg">
            <h3 className="text-xl font-medium mb-2">1. Create Your Profile</h3>
            <p>Answer a few questions about your style preferences</p>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="text-xl font-medium mb-2">2. Get Recommendations</h3>
            <p>Our AI analyzes your preferences to find perfect matches</p>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="text-xl font-medium mb-2">3. Shop with Confidence</h3>
            <p>Enjoy a personalized shopping experience</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;