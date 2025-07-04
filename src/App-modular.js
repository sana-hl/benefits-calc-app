import React, { useState } from 'react';
import { User, Users, Coins, Building, Baby, Heart } from 'lucide-react';

// Import components
import LandingPage from './components/LandingPage';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import CalculationSteps from './components/CalculationSteps';
import ResultsPage from './components/ResultsPage';

const MyBenefitsCalculator = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [calculationStep, setCalculationStep] = useState(0);
  const [formData, setFormData] = useState({
    personal: {},
    household: {},
    income: {
      mainClient: {},
      partner: {}
    },
    housing: {},
    childcare: {},
    health: {},
    savings: {}
  });

  // Authentication functions
  const handleLogin = (username, password) => {
    if (username && password) {
      setIsLoggedIn(true);
      setUserData({ username });
      setCurrentView('dashboard');
    }
  };

  const handleRegister = (username, password, email) => {
    if (username && password && email) {
      setIsLoggedIn(true);
      setUserData({ username, email });
      setCurrentView('dashboard');
    }
  };

  const startFreeCalculation = () => {
    setCurrentView('calculation');
    setCalculationStep(0);
  };

  // Calculation steps configuration
  const calculationSteps = [
    { id: 'personal', title: 'Personal Details', icon: User },
    { id: 'household', title: 'Household', icon: Users },
    { id: 'income', title: 'Income', icon: Coins },
    { id: 'housing', title: 'Housing', icon: Building },
    { id: 'childcare', title: 'Childcare', icon: Baby },
    { id: 'health', title: 'Health & Disability', icon: Heart },
    { id: 'savings', title: 'Savings & Capital', icon: Coins }
  ];

  // Form data management functions
  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const updateIncomeData = (person, data) => {
    setFormData(prev => ({
      ...prev,
      income: {
        ...prev.income,
        [person]: { ...prev.income[person], ...data }
      }
    }));
  };

  // Navigation functions
  const nextStep = () => {
    if (calculationStep < calculationSteps.length - 1) {
      setCalculationStep(calculationStep + 1);
    } else {
      setCurrentView('results');
    }
  };

  const prevStep = () => {
    if (calculationStep > 0) {
      setCalculationStep(calculationStep - 1);
    }
  };

  // Main render logic
  switch (currentView) {
    case 'landing':
      return (
        <LandingPage
          setCurrentView={setCurrentView}
          startFreeCalculation={startFreeCalculation}
        />
      );

    case 'login':
      return (
        <AuthForm
          isLogin={true}
          handleLogin={handleLogin}
          handleRegister={handleRegister}
          setCurrentView={setCurrentView}
        />
      );

    case 'register':
      return (
        <AuthForm
          isLogin={false}
          handleLogin={handleLogin}
          handleRegister={handleRegister}
          setCurrentView={setCurrentView}
        />
      );

    case 'dashboard':
      return (
        <Dashboard
          userData={userData}
          setCurrentView={setCurrentView}
          setIsLoggedIn={setIsLoggedIn}
          setUserData={setUserData}
        />
      );

    case 'calculation':
      return (
        <CalculationSteps
          calculationStep={calculationStep}
          calculationSteps={calculationSteps}
          formData={formData}
          updateFormData={updateFormData}
          updateIncomeData={updateIncomeData}
          nextStep={nextStep}
          prevStep={prevStep}
          setCurrentView={setCurrentView}
          isLoggedIn={isLoggedIn}
        />
      );

    case 'results':
      return (
        <ResultsPage
          formData={formData}
          setCurrentView={setCurrentView}
          setCalculationStep={setCalculationStep}
          isLoggedIn={isLoggedIn}
        />
      );

    default:
      return (
        <LandingPage
          setCurrentView={setCurrentView}
          startFreeCalculation={startFreeCalculation}
        />
      );
  }
};

export default MyBenefitsCalculator;