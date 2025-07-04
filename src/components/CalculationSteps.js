import React from 'react';
import { User, Users, Coins, Building, Baby, Heart, ArrowRight } from 'lucide-react';

const CalculationSteps = ({
  calculationStep,
  calculationSteps,
  formData,
  updateFormData,
  updateIncomeData,
  nextStep,
  prevStep,
  setCurrentView,
  isLoggedIn
}) => {
  const step = calculationSteps[calculationStep];
  const StepIcon = step.icon;

  const renderStepContent = () => {
    switch (step.id) {
      case 'personal':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-red-primary-900 mb-2">Age</label>
              <input
                type="number"
                value={formData.personal.age || ''}
                onChange={(e) => updateFormData('personal', { age: e.target.value })}
                className="w-full px-4 py-3 border border-red-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary-600"
                placeholder="Enter your age"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-red-primary-900 mb-2">Location</label>
              <select
                value={formData.personal.location || ''}
                onChange={(e) => updateFormData('personal', { location: e.target.value })}
                className="w-full px-4 py-3 border border-red-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary-600"
              >
                <option value="">Select your location</option>
                <option value="england">England</option>
                <option value="scotland">Scotland</option>
                <option value="wales">Wales</option>
                <option value="northern-ireland">Northern Ireland</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-red-primary-900 mb-2">Nationality/Status</label>
              <select
                value={formData.personal.status || ''}
                onChange={(e) => updateFormData('personal', { status: e.target.value })}
                className="w-full px-4 py-3 border border-red-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary-600"
              >
                <option value="">Select your status</option>
                <option value="uk-citizen">UK Citizen</option>
                <option value="eu-settled">EU Settled Status</option>
                <option value="eu-pre-settled">EU Pre-settled Status</option>
                <option value="refugee">Refugee Status</option>
                <option value="other">Other (please specify)</option>
              </select>
              
              {formData.personal.status === 'other' && (
                <div className="mt-3">
                  <input
                    type="text"
                    value={formData.personal.otherStatus || ''}
                    onChange={(e) => updateFormData('personal', { otherStatus: e.target.value })}
                    className="w-full px-4 py-3 border border-red-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary-600"
                    placeholder="Please specify your status"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 'household':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-red-primary-900 mb-3">Do you have a partner?</label>
              <div className="space-y-3">
                <label className="flex items-center bg-red-primary-50 p-3 rounded-lg border border-red-primary-300 cursor-pointer hover:bg-red-primary-100">
                  <input
                    type="radio"
                    name="hasPartner"
                    value="yes"
                    checked={formData.household.hasPartner === 'yes'}
                    onChange={(e) => updateFormData('household', { hasPartner: e.target.value })}
                    className="mr-3 text-red-primary-700"
                  />
                  <span className="text-red-primary-900">Yes, we live together</span>
                </label>
                <label className="flex items-center bg-red-primary-50 p-3 rounded-lg border border-red-primary-300 cursor-pointer hover:bg-red-primary-100">
                  <input
                    type="radio"
                    name="hasPartner"
                    value="no"
                    checked={formData.household.hasPartner === 'no'}
                    onChange={(e) => updateFormData('household', { hasPartner: e.target.value })}
                    className="mr-3 text-red-primary-700"
                  />
                  <span className="text-red-primary-900">No, I'm single</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-red-primary-900 mb-2">Number of children</label>
              <input
                type="number"
                min="0"
                max="10"
                value={formData.household.numChildren || ''}
                onChange={(e) => {
                  const numChildren = parseInt(e.target.value) || 0;
                  updateFormData('household', { numChildren: e.target.value });
                  // Initialize child ages array
                  const childAges = Array(numChildren).fill('');
                  updateFormData('household', { childAges });
                }}
                className="w-full px-4 py-3 border border-red-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary-600"
                placeholder="0"
              />
            </div>

            {/* Child Ages */}
            {parseInt(formData.household.numChildren) > 0 && (
              <div>
                <label className="block text-sm font-medium text-red-primary-900 mb-3">Ages of children</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Array.from({ length: parseInt(formData.household.numChildren) }, (_, index) => (
                    <div key={index}>
                      <label className="block text-xs text-red-primary-800 mb-1">Child {index + 1} age</label>
                      <input
                        type="number"
                        min="0"
                        max="18"
                        value={formData.household.childAges?.[index] || ''}
                        onChange={(e) => {
                          const newChildAges = [...(formData.household.childAges || [])];
                          newChildAges[index] = e.target.value;
                          updateFormData('household', { childAges: newChildAges });
                        }}
                        className="w-full px-3 py-2 border border-red-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary-600 text-sm"
                        placeholder="Age"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-red-primary-900 mb-2">Number of other dependents</label>
              <input
                type="number"
                min="0"
                value={formData.household.numDependents || ''}
                onChange={(e) => updateFormData('household', { numDependents: e.target.value })}
                className="w-full px-4 py-3 border border-red-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary-600"
                placeholder="0"
              />
            </div>
          </div>
        );

      case 'income':
        const hasPartner = formData.household.hasPartner === 'yes';
        return (
          <div className="space-y-8">
            {/* Main Client Income */}
            <div>
              <h3 className="text-lg font-semibold text-red-primary-900 mb-4">Your Income</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-red-primary-900 mb-2">Monthly earnings (after tax)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.income.mainClient.monthlyEarnings || ''}
                    onChange={(e) => updateIncomeData('mainClient', { monthlyEarnings: e.target.value })}
                    className="w-full px-4 py-3 border border-red-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary-600"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-red-primary-900 mb-2">Self-employment income (monthly)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.income.mainClient.selfEmployment || ''}
                    onChange={(e) => updateIncomeData('mainClient', { selfEmployment: e.target.value })}
                    className="w-full px-4 py-3 border border-red-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary-600"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-red-primary-900 mb-2">Other benefits (monthly)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.income.mainClient.otherBenefits || ''}
                    onChange={(e) => updateIncomeData('mainClient', { otherBenefits: e.target.value })}
                    className="w-full px-4 py-3 border border-red-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary-600"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-red-primary-900 mb-2">Pension income (monthly)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.income.mainClient.pension || ''}
                    onChange={(e) => updateIncomeData('mainClient', { pension: e.target.value })}
                    className="w-full px-4 py-3 border border-red-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary-600"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Partner Income */}
            {hasPartner && (
              <div className="border-t border-red-primary-300 pt-6">
                <h3 className="text-lg font-semibold text-red-primary-900 mb-4">Partner's Income</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-red-primary-900 mb-2">Monthly earnings (after tax)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.income.partner.monthlyEarnings || ''}
                      onChange={(e) => updateIncomeData('partner', { monthlyEarnings: e.target.value })}
                      className="w-full px-4 py-3 border border-red-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary-600"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-red-primary-900 mb-2">Self-employment income (monthly)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.income.partner.selfEmployment || ''}
                      onChange={(e) => updateIncomeData('partner', { selfEmployment: e.target.value })}
                      className="w-full px-4 py-3 border border-red-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary-600"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-red-primary-900 mb-2">Other benefits (monthly)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.income.partner.otherBenefits || ''}
                      onChange={(e) => updateIncomeData('partner', { otherBenefits: e.target.value })}
                      className="w-full px-4 py-3 border border-red-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary-600"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-red-primary-900 mb-2">Pension income (monthly)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.income.partner.pension || ''}
                      onChange={(e) => updateIncomeData('partner', { pension: e.target.value })}
                      className="w-full px-4 py-3 border border-red-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary-600"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'housing':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-red-primary-900 mb-2">Housing situation</label>
              <select
                value={formData.housing.type || ''}
                onChange={(e) => updateFormData('housing', { type: e.target.value })}
                className="w-full px-4 py-3 border border-red-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary-600"
              >
                <option value="">Select housing type</option>
                <option value="rent-private">Private rental</option>
                <option value="rent-social">Social housing</option>
                <option value="mortgage">Mortgage/Own home</option>
                <option value="living-with-family">Living with family/friends</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-red-primary-900 mb-2">Monthly rent/mortgage payment</label>
              <input
                type="number"
                step="0.01"
                value={formData.housing.monthlyRent || ''}
                onChange={(e) => updateFormData('housing', { monthlyRent: e.target.value })}
                className="w-full px-4 py-3 border border-red-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary-600"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-red-primary-900 mb-2">Local Housing Allowance rate (if known)</label>
              <input
                type="number"
                step="0.01"
                value={formData.housing.lha || ''}
                onChange={(e) => updateFormData('housing', { lha: e.target.value })}
                className="w-full px-4 py-3 border border-red-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary-600"
                placeholder="Leave blank if unknown"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-red-primary-900 mb-2">Monthly Council Tax</label>
              <input
                type="number"
                step="0.01"
                value={formData.housing.councilTax || ''}
                onChange={(e) => updateFormData('housing', { councilTax: e.target.value })}
                className="w-full px-4 py-3 border border-red-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary-600"
                placeholder="0.00"
              />
            </div>
          </div>
        );

      case 'childcare':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-red-primary-900 mb-2">Monthly childcare costs</label>
              <input
                type="number"
                step="0.01"
                value={formData.childcare.monthlyCosts || ''}
                onChange={(e) => updateFormData('childcare', { monthlyCosts: e.target.value })}
                className="w-full px-4 py-3 border border-red-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary-600"
                placeholder="0.00"
              />
              <p className="text-sm text-red-primary-700 mt-2">Include nursery, childminder, after-school care, and holiday care costs</p>
            </div>
          </div>
        );

      case 'health':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-red-primary-900 mb-3">Do you have any health conditions or disabilities?</label>
              <div className="space-y-3">
                <label className="flex items-center bg-red-primary-50 p-3 rounded-lg border border-red-primary-300 cursor-pointer hover:bg-red-primary-100">
                  <input
                    type="radio"
                    name="hasDisability"
                    value="yes"
                    checked={formData.health.hasDisability === 'yes'}
                    onChange={(e) => updateFormData('health', { hasDisability: e.target.value })}
                    className="mr-3 text-red-primary-700"
                  />
                  <span className="text-red-primary-900">Yes</span>
                </label>
                <label className="flex items-center bg-red-primary-50 p-3 rounded-lg border border-red-primary-300 cursor-pointer hover:bg-red-primary-100">
                  <input
                    type="radio"
                    name="hasDisability"
                    value="no"
                    checked={formData.health.hasDisability === 'no'}
                    onChange={(e) => updateFormData('health', { hasDisability: e.target.value })}
                    className="mr-3 text-red-primary-700"
                  />
                  <span className="text-red-primary-900">No</span>
                </label>
              </div>
            </div>

            {formData.health.hasDisability === 'yes' && (
              <div>
                <label className="block text-sm font-medium text-red-primary-900 mb-3">Limited capability for:</label>
                <div className="space-y-3">
                  <label className="flex items-center bg-red-primary-50 p-3 rounded-lg border border-red-primary-300 cursor-pointer hover:bg-red-primary-100">
                    <input
                      type="radio"
                      name="limitedCapability"
                      value="work"
                      checked={formData.health.limitedCapability === 'work'}
                      onChange={(e) => updateFormData('health', { limitedCapability: e.target.value })}
                      className="mr-3 text-red-primary-700"
                    />
                    <span className="text-red-primary-900">Work (LCW)</span>
                  </label>
                  <label className="flex items-center bg-red-primary-50 p-3 rounded-lg border border-red-primary-300 cursor-pointer hover:bg-red-primary-100">
                    <input
                      type="radio"
                      name="limitedCapability"
                      value="workActivity"
                      checked={formData.health.limitedCapability === 'workActivity'}
                      onChange={(e) => updateFormData('health', { limitedCapability: e.target.value })}
                      className="mr-3 text-red-primary-700"
                    />
                    <span className="text-red-primary-900">Work-related activity (LCWRA)</span>
                  </label>
                  <label className="flex items-center bg-red-primary-50 p-3 rounded-lg border border-red-primary-300 cursor-pointer hover:bg-red-primary-100">
                    <input
                      type="radio"
                      name="limitedCapability"
                      value="none"
                      checked={formData.health.limitedCapability === 'none'}
                      onChange={(e) => updateFormData('health', { limitedCapability: e.target.value })}
                      className="mr-3 text-red-primary-700"
                    />
                    <span className="text-red-primary-900">Neither</span>
                  </label>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-red-primary-900 mb-3">Do you receive any disability benefits?</label>
              <div className="space-y-3">
                <label className="flex items-center bg-red-primary-50 p-3 rounded-lg border border-red-primary-300 cursor-pointer hover:bg-red-primary-100">
                  <input
                    type="checkbox"
                    checked={formData.health.pip || false}
                    onChange={(e) => updateFormData('health', { pip: e.target.checked })}
                    className="mr-3 text-red-primary-700"
                  />
                  <span className="text-red-primary-900">Personal Independence Payment (PIP)</span>
                </label>
                <label className="flex items-center bg-red-primary-50 p-3 rounded-lg border border-red-primary-300 cursor-pointer hover:bg-red-primary-100">
                  <input
                    type="checkbox"
                    checked={formData.health.dla || false}
                    onChange={(e) => updateFormData('health', { dla: e.target.checked })}
                    className="mr-3 text-red-primary-700"
                  />
                  <span className="text-red-primary-900">Disability Living Allowance (DLA)</span>
                </label>
                <label className="flex items-center bg-red-primary-50 p-3 rounded-lg border border-red-primary-300 cursor-pointer hover:bg-red-primary-100">
                  <input
                    type="checkbox"
                    checked={formData.health.esa || false}
                    onChange={(e) => updateFormData('health', { esa: e.target.checked })}
                    className="mr-3 text-red-primary-700"
                  />
                  <span className="text-red-primary-900">Employment and Support Allowance (ESA)</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 'savings':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-red-primary-900 mb-2">Total savings and capital</label>
              <input
                type="number"
                step="0.01"
                value={formData.savings.totalSavings || ''}
                onChange={(e) => updateFormData('savings', { totalSavings: e.target.value })}
                className="w-full px-4 py-3 border border-red-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary-600"
                placeholder="0.00"
              />
              <p className="text-sm text-red-primary-700 mt-2">Include bank accounts, ISAs, premium bonds, stocks, shares</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-red-primary-900 mb-2">Property value (excluding main home)</label>
              <input
                type="number"
                step="0.01"
                value={formData.savings.propertyValue || ''}
                onChange={(e) => updateFormData('savings', { propertyValue: e.target.value })}
                className="w-full px-4 py-3 border border-red-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-primary-600"
                placeholder="0.00"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-primary-50 via-red-primary-100 to-red-primary-200">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-red-primary-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-red-primary-900">MyBenefits Calculator</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg border border-red-primary-200">
          <div className="p-8">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-red-primary-900">Benefits Calculator</h2>
                <span className="text-sm text-red-primary-700 bg-red-primary-100 px-3 py-1 rounded-full">
                  Step {calculationStep + 1} of {calculationSteps.length}
                </span>
              </div>
              
              <div className="w-full bg-red-primary-200 rounded-full h-3">
                <div 
                  className="bg-red-primary-700 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${((calculationStep + 1) / calculationSteps.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-primary-100 rounded-lg flex items-center justify-center mr-4">
                  <StepIcon className="h-6 w-6 text-red-primary-700" />
                </div>
                <h3 className="text-xl font-semibold text-red-primary-900">{step.title}</h3>
              </div>
              
              {renderStepContent()}
            </div>

            <div className="flex justify-between pt-6 border-t border-red-primary-200">
              <button
                onClick={prevStep}
                disabled={calculationStep === 0}
                className="px-6 py-3 text-sm font-medium text-red-primary-700 bg-white border border-red-primary-400 rounded-lg shadow-sm hover:bg-red-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <button
                onClick={nextStep}
                className="px-6 py-3 text-sm font-medium text-white bg-red-primary-700 border border-transparent rounded-lg shadow-sm hover:bg-red-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-primary-600 flex items-center"
              >
                {calculationStep === calculationSteps.length - 1 ? 'Calculate Results' : 'Next Step'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setCurrentView(isLoggedIn ? 'dashboard' : 'landing')}
                className="text-sm text-red-primary-600 hover:text-red-primary-800"
              >
                ← Back to {isLoggedIn ? 'dashboard' : 'main page'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculationSteps;