// Benefits configuration based on 2025-26 rates from GOV.UK
// In a real implementation, this would be loaded from the CSV file

export const benefitsConfig = {
  // Universal Credit Standard Allowances (monthly)
  standardAllowanceSingleUnder25: 316.98,
  standardAllowanceSingle25Over: 400.14,
  standardAllowanceCoupleBothUnder25: 497.55,
  standardAllowanceCoupleOneOrBoth25Over: 628.10,
  
  // Child Elements (monthly)
  childElementFirstChildBornBefore2017: 339.00,
  childElementFirstChildBornAfter2017: 292.81,
  childElementSubsequentChildren: 292.81,
  
  // Disability Elements (monthly)
  disabledChildAdditionLowerRate: 158.76,
  disabledChildAdditionHigherRate: 495.87,
  limitedCapabilityWork: 158.76,
  limitedCapabilityWorkRelatedActivity: 423.27,
  
  // Carer Element (monthly)
  carerElement: 201.68,
  
  // Childcare Elements (monthly)
  childcareCostsMaxOneChild: 1031.88,
  childcareCostsMaxTwoPlusChildren: 1768.94,
  childcareElementPercentage: 85,
  
  // Work Allowances (monthly)
  workAllowanceHigherNoHousing: 684.00,
  workAllowanceLowerWithHousing: 411.00,
  
  // Taper and Savings
  taperRate: 55,
  savingsThresholdLower: 6000.00,
  savingsThresholdUpper: 16000.00,
  savingsTariffIncome: 4.35,
  
  // Child Benefit (monthly)
  childBenefitFirstChildMonthly: 112.88,
  childBenefitAdditionalChildrenMonthly: 74.75,
  childBenefitHighIncomeThresholdStart: 60000.00,
  childBenefitHighIncomeThresholdEnd: 80000.00
};

// Format currency with comma separator
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2
  }).format(amount);
};