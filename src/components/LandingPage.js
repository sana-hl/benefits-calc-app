import React from 'react';
import { Calculator, Users, Lock } from 'lucide-react';

const LandingPage = ({ setCurrentView, startFreeCalculation }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-primary-50 via-red-primary-100 to-red-primary-200">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-red-primary-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-red-primary-900">MyBenefits Calculator</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentView('login')}
                className="text-red-primary-700 hover:text-red-primary-900 font-medium"
              >
                Sign In
              </button>
              <button
                onClick={() => setCurrentView('register')}
                className="bg-red-primary-700 text-white px-4 py-2 rounded-lg hover:bg-red-primary-800 font-medium"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-red-primary-900 mb-6">
            Check what benefits you could get
          </h2>
          <p className="text-xl text-red-primary-800 mb-8 max-w-2xl mx-auto">
            Find out what financial support you could get.
          </p>
          
          <button
            onClick={startFreeCalculation}
            className="bg-red-primary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-primary-800 transition-colors shadow-lg"
          >
            Start Benefits Check
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-red-primary-200">
            <div className="w-12 h-12 bg-red-primary-100 rounded-lg flex items-center justify-center mb-4">
              <Calculator className="h-6 w-6 text-red-primary-700" />
            </div>
            <h3 className="text-lg font-semibold text-red-primary-900 mb-2">Universal Credit</h3>
            <p className="text-red-primary-800">Calculate your Universal Credit entitlement with our comprehensive calculator</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-red-primary-200">
            <div className="w-12 h-12 bg-red-primary-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-red-primary-700" />
            </div>
            <h3 className="text-lg font-semibold text-red-primary-900 mb-2">All Benefits</h3>
            <p className="text-red-primary-800">Discover other benefits you may be entitled to including Council Tax Support</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-red-primary-200">
            <div className="w-12 h-12 bg-red-primary-100 rounded-lg flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-red-primary-700" />
            </div>
            <h3 className="text-lg font-semibold text-red-primary-900 mb-2">Secure & Private</h3>
            <p className="text-red-primary-800">Your data is secure and never shared. GDPR compliant and confidential</p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-12 pt-8 border-t border-red-primary-300">
          <p className="text-red-primary-700 font-medium mb-2">Trusted by thousands</p>
          <p className="text-sm text-red-primary-600">✓ GDPR compliant • ✓ UK government guidelines • ✓ No personal data stored</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;