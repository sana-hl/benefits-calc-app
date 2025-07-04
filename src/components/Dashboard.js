import React from 'react';
import { Calculator, Home } from 'lucide-react';

const Dashboard = ({ userData, setCurrentView, setIsLoggedIn, setUserData }) => {
  const handleSignOut = () => {
    setIsLoggedIn(false);
    setCurrentView('landing');
    setUserData({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-primary-50 via-red-primary-100 to-red-primary-200">
      <div className="bg-white shadow-sm border-b border-red-primary-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-red-primary-900">MyBenefits Calculator</h1>
            <div className="flex items-center space-x-4">
              <span className="text-red-primary-800">Welcome back, {userData.username}!</span>
              <button
                onClick={handleSignOut}
                className="text-red-primary-700 hover:text-red-primary-900 font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => setCurrentView('calculation')}
            className="bg-white rounded-xl p-8 shadow-sm border border-red-primary-200 hover:shadow-md transition-shadow text-left"
          >
            <Calculator className="h-12 w-12 text-red-primary-700 mb-4" />
            <h3 className="text-xl font-semibold text-red-primary-900 mb-2">New Calculation</h3>
            <p className="text-red-primary-800">Calculate your Universal Credit entitlement and discover other benefits</p>
          </button>
          
          <div className="bg-white rounded-xl p-8 shadow-sm border border-red-primary-200 opacity-75">
            <Home className="h-12 w-12 text-red-primary-500 mb-4" />
            <h3 className="text-xl font-semibold text-red-primary-600 mb-2">Saved Calculations</h3>
            <p className="text-red-primary-600">Coming soon - view your calculation history</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;