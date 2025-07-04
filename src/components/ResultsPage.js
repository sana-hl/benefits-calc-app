import React from 'react';
import { calculateUC, calculateChildBenefit } from '../utils/calculations';
import { formatCurrency } from '../config/benefits';
import { benefitsConfig } from '../config/benefits';

const ResultsPage = ({ formData, setCurrentView, setCalculationStep, isLoggedIn }) => {
  const calculation = calculateUC(formData);
  const childBenefit = calculateChildBenefit(formData);
  const totalSavings = (parseFloat(formData.savings.totalSavings) || 0) + 
                      (parseFloat(formData.savings.propertyValue) || 0);

  // Check if savings affect entitlement
  const savingsAffectBenefits = totalSavings > benefitsConfig.savingsThresholdLower;
  const noEntitlementDueToSavings = totalSavings > benefitsConfig.savingsThresholdUpper;

  // Calculate other potential benefits
  const councilTaxReduction = formData.housing.councilTax ? parseFloat(formData.housing.councilTax) * 0.25 : 0;
  const freeSchoolMeals = (parseInt(formData.household.numChildren) || 0) > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-primary-50 via-red-primary-100 to-red-primary-200">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-red-primary-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-red-primary-900">MyBenefits Calculator</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-lg border border-red-primary-200 p-8">
          <h2 className="text-3xl font-bold text-red-primary-900 mb-8">Your Benefits Calculation</h2>
          
          {noEntitlementDueToSavings ? (
            <div className="bg-red-50 border border-red-300 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-red-800 mb-3">No Universal Credit Entitlement</h3>
              <p className="text-red-700">
                You may not be entitled to Universal Credit as your savings and capital exceed £{benefitsConfig.savingsThresholdUpper.toLocaleString()}.
              </p>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-300 rounded-lg p-8 mb-8">
              <h3 className="text-3xl font-bold text-green-800 mb-3">
                Estimated monthly Universal Credit: {formatCurrency(calculation.finalAmount)}
              </h3>
              <p className="text-green-700 text-lg">This is an estimate based on the information provided.</p>
            </div>
          )}

          {/* Child Benefit Section */}
          {childBenefit > 0 && (
            <div className="bg-green-50 border border-green-300 rounded-lg p-6 mb-8">
              <h3 className="text-2xl font-bold text-green-800 mb-3">
                Estimated monthly Child Benefit: {formatCurrency(childBenefit)}
              </h3>
              <p className="text-green-700">Additional support for your {parseInt(formData.household.numChildren) || 0} child{parseInt(formData.household.numChildren) > 1 ? 'ren' : ''}.</p>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-red-primary-900">Calculation Breakdown</h4>
              
              <div className="bg-red-primary-50 rounded-lg p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-red-primary-900">Standard allowance:</span>
                  <span className="font-semibold text-red-primary-900">{formatCurrency(calculation.standardAllowance)}</span>
                </div>
                
                {calculation.housingElement > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-red-primary-900">Housing element:</span>
                    <span className="font-semibold text-red-primary-900">{formatCurrency(calculation.housingElement)}</span>
                  </div>
                )}
                
                {calculation.childElement > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-red-primary-900">Child element:</span>
                    <span className="font-semibold text-red-primary-900">{formatCurrency(calculation.childElement)}</span>
                  </div>
                )}
                
                {calculation.disabilityElement > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-red-primary-900">Disability element:</span>
                    <span className="font-semibold text-red-primary-900">{formatCurrency(calculation.disabilityElement)}</span>
                  </div>
                )}
                
                {calculation.careElement > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-red-primary-900">Childcare element:</span>
                    <span className="font-semibold text-red-primary-900">{formatCurrency(calculation.careElement)}</span>
                  </div>
                )}
                
                <hr className="my-4 border-red-primary-300" />
                
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-red-primary-900">Total before deductions:</span>
                  <span className="font-bold text-red-primary-900">{formatCurrency(calculation.totalBeforeDeductions)}</span>
                </div>
                
                {calculation.totalEarnings > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-red-primary-800">Total earned income:</span>
                    <span className="font-semibold text-red-primary-800">{formatCurrency(calculation.totalEarnings)}</span>
                  </div>
                )}
                
                {calculation.taperDeduction > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-red-700">Income taper ({benefitsConfig.taperRate}%):</span>
                    <span className="font-semibold text-red-700">-{formatCurrency(calculation.taperDeduction)}</span>
                  </div>
                )}
                
                {savingsAffectBenefits && !noEntitlementDueToSavings && (
                  <div className="text-orange-700 text-sm">
                    <span>⚠️ Savings over £{benefitsConfig.savingsThresholdLower.toLocaleString()} may reduce entitlement</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-red-primary-900">Other Potential Benefits</h4>
              
              <div className="space-y-4">
                {councilTaxReduction > 0 && (
                  <div className="bg-red-primary-50 border border-red-primary-300 rounded-lg p-4">
                    <h5 className="font-semibold text-red-primary-900 mb-2">Council Tax Support</h5>
                    <p className="text-red-primary-800 text-sm">
                      You may be eligible for up to {formatCurrency(councilTaxReduction)} monthly reduction
                    </p>
                  </div>
                )}
                
                {freeSchoolMeals && (
                  <div className="bg-red-primary-50 border border-red-primary-300 rounded-lg p-4">
                    <h5 className="font-semibold text-red-primary-900 mb-2">Free School Meals</h5>
                    <p className="text-red-primary-800 text-sm">
                      Your children may be eligible for free school meals
                    </p>
                  </div>
                )}
                
                <div className="bg-red-primary-50 border border-red-primary-300 rounded-lg p-4">
                  <h5 className="font-semibold text-red-primary-900 mb-2">NHS Benefits</h5>
                  <p className="text-red-primary-800 text-sm">
                    Free prescriptions, dental care, and eye tests may be available
                  </p>
                </div>
                
                {formData.health.hasDisability === 'yes' && (
                  <div className="bg-red-primary-50 border border-red-primary-300 rounded-lg p-4">
                    <h5 className="font-semibold text-red-primary-900 mb-2">Additional Disability Benefits</h5>
                    <p className="text-red-primary-800 text-sm">
                      Consider applying for PIP, DLA, or Attendance Allowance
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-10 p-6 bg-yellow-50 border border-yellow-300 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-3">Important Disclaimers</h4>
            <ul className="text-sm text-yellow-700 space-y-2">
              <li>• This is an estimate only - actual entitlement may differ</li>
              <li>• Universal Credit rates change annually in April</li>
              <li>• Local Housing Allowance rates vary by area</li>
              <li>• Your circumstances must be assessed by DWP for official entitlement</li>
              <li>• Always check gov.uk for the most up-to-date information</li>
            </ul>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                setCurrentView('calculation');
                setCalculationStep(0);
              }}
              className="flex-1 px-6 py-3 text-sm font-medium text-red-primary-700 bg-white border border-red-primary-700 rounded-lg hover:bg-red-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-primary-600"
            >
              Recalculate
            </button>
            
            {isLoggedIn && (
              <button
                className="flex-1 px-6 py-3 text-sm font-medium text-white bg-red-primary-700 border border-transparent rounded-lg hover:bg-red-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-primary-600"
              >
                Save Calculation
              </button>
            )}
            
            <button
              onClick={() => setCurrentView(isLoggedIn ? 'dashboard' : 'landing')}
              className="flex-1 px-6 py-3 text-sm font-medium text-red-primary-800 bg-red-primary-100 border border-red-primary-400 rounded-lg hover:bg-red-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-primary-600"
            >
              {isLoggedIn ? 'Back to Dashboard' : 'Start Over'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-red-primary-200 p-8">
          <h4 className="text-xl font-semibold text-red-primary-900 mb-6">Next Steps</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-red-primary-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-red-primary-700 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h5 className="font-semibold text-red-primary-900">Apply online</h5>
                  <p className="text-red-primary-800 text-sm">Visit gov.uk/apply-universal-credit to start your application</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-red-primary-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-red-primary-700 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h5 className="font-semibold text-red-primary-900">Prepare documents</h5>
                  <p className="text-red-primary-800 text-sm">Gather ID, bank statements, tenancy agreement, and payslips</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-red-primary-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-red-primary-700 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h5 className="font-semibold text-red-primary-900">Job Centre appointment</h5>
                  <p className="text-red-primary-800 text-sm">You may need to attend an interview</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-red-primary-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-red-primary-700 font-semibold text-sm">4</span>
                </div>
                <div>
                  <h5 className="font-semibold text-red-primary-900">Report changes</h5>
                  <p className="text-red-primary-800 text-sm">Always update DWP when your circumstances change</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;