import React from 'react';

const AuthForm = ({ isLogin = true, handleLogin, handleRegister, setCurrentView }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-primary-50 via-red-primary-100 to-red-primary-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-red-primary-200">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-red-primary-900 mb-2">MyBenefits Calculator</h1>
            <h2 className="text-xl font-semibold text-red-primary-800">
              {isLogin ? 'Sign In' : 'Create Account'}
            </h2>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const username = formData.get('username');
            const password = formData.get('password');
            const email = formData.get('email');
            
            if (isLogin) {
              handleLogin(username, password);
            } else {
              handleRegister(username, password, email);
            }
          }} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-red-primary-900 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-red-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary-600 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-red-primary-900 mb-2">Username</label>
              <input
                type="text"
                name="username"
                required
                className="w-full px-4 py-3 border border-red-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary-600 focus:border-transparent"
                placeholder="Enter your username"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-red-primary-900 mb-2">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-3 border border-red-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary-600 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-primary-700 text-white py-3 rounded-lg font-semibold hover:bg-red-primary-800 transition-colors"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentView(isLogin ? 'register' : 'login')}
              className="text-red-primary-700 hover:text-red-primary-900 font-medium"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => setCurrentView('landing')}
              className="text-red-primary-600 hover:text-red-primary-800 text-sm"
            >
              ← Back to main page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;