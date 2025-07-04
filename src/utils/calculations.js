import { benefitsConfig } from '../config/benefits';

// Calculate Universal Credit entitlement
export const calculateUC = (formData) => {
  let standardAllowance = 0;
  let housingElement = 0;
  let childElement = 0;
  let disabilityElement = 0;
  let careElement = 0;

  // Standard allowance based on age and relationship status
  const age = parseInt(formData.personal.age) || 0;
  const hasPartner = formData.household.hasPartner === 'yes';
  
  if (hasPartner) {
    standardAllowance = age >= 25 ? benefitsConfig.standardAllowanceCoupleOneOrBoth25Over : benefitsConfig.standardAllowanceCoupleBothUnder25;
  } else {
    standardAllowance = age >= 25 ? benefitsConfig.standardAllowanceSingle25Over : benefitsConfig.standardAllowanceSingleUnder25;
  }

  // Housing element
  const monthlyRent = parseFloat(formData.housing.monthlyRent) || 0;
  const localHousingAllowance = parseFloat(formData.housing.lha) || monthlyRent;
  housingElement = Math.min(monthlyRent, localHousingAllowance);

  // Child element
  const numChildren = parseInt(formData.household.numChildren) || 0;
  if (numChildren > 0) {
    childElement = benefitsConfig.childElementFirstChildBornAfter2017; // First child
    if (numChildren > 1) {
      childElement += (numChildren - 1) * benefitsConfig.childElementSubsequentChildren; // Additional children
    }
  }

  // Disability elements
  if (formData.health.hasDisability === 'yes') {
    if (formData.health.limitedCapability === 'work') {
      disabilityElement += benefitsConfig.limitedCapabilityWork;
    } else if (formData.health.limitedCapability === 'workActivity') {
      disabilityElement += benefitsConfig.limitedCapabilityWorkRelatedActivity;
    }
  }

  // Childcare element
  const childcareCosts = parseFloat(formData.childcare.monthlyCosts) || 0;
  if (childcareCosts > 0) {
    const maxChildcare = numChildren === 1 ? benefitsConfig.childcareCostsMaxOneChild : benefitsConfig.childcareCostsMaxTwoPlusChildren;
    careElement = Math.min(childcareCosts * (benefitsConfig.childcareElementPercentage / 100), maxChildcare);
  }

  // Total before deductions
  const totalBeforeDeductions = standardAllowance + housingElement + childElement + disabilityElement + careElement;

  // Calculate total earnings
  const mainClientEarnings = parseFloat(formData.income.mainClient.monthlyEarnings) || 0;
  const partnerEarnings = hasPartner ? (parseFloat(formData.income.partner.monthlyEarnings) || 0) : 0;
  const totalEarnings = mainClientEarnings + partnerEarnings;

  // Work allowance and taper
  let workAllowance = 0;
  
  if (numChildren > 0 || housingElement > 0) {
    workAllowance = housingElement > 0 ? benefitsConfig.workAllowanceLowerWithHousing : benefitsConfig.workAllowanceHigherNoHousing;
  }

  const excessEarnings = Math.max(0, totalEarnings - workAllowance);
  const taperDeduction = excessEarnings * (benefitsConfig.taperRate / 100);

  const finalAmount = Math.max(0, totalBeforeDeductions - taperDeduction);

  return {
    standardAllowance,
    housingElement,
    childElement,
    disabilityElement,
    careElement,
    workAllowance,
    taperDeduction,
    totalBeforeDeductions,
    totalEarnings,
    finalAmount
  };
};

// Calculate Child Benefit entitlement
export const calculateChildBenefit = (formData) => {
  const numChildren = parseInt(formData.household.numChildren) || 0;
  if (numChildren === 0) return 0;

  let childBenefit = benefitsConfig.childBenefitFirstChildMonthly; // First child
  if (numChildren > 1) {
    childBenefit += (numChildren - 1) * benefitsConfig.childBenefitAdditionalChildrenMonthly; // Additional children
  }

  // Check for high income charge
  const totalAnnualIncome = ((parseFloat(formData.income.mainClient.monthlyEarnings) || 0) + 
                            (parseFloat(formData.income.partner.monthlyEarnings) || 0)) * 12;

  if (totalAnnualIncome >= benefitsConfig.childBenefitHighIncomeThresholdEnd) {
    return 0; // Fully clawed back
  } else if (totalAnnualIncome >= benefitsConfig.childBenefitHighIncomeThresholdStart) {
    // Partial claw-back calculation
    const annualChildBenefit = childBenefit * 12;
    const excessIncome = totalAnnualIncome - benefitsConfig.childBenefitHighIncomeThresholdStart;
    const clawbackRate = excessIncome / (benefitsConfig.childBenefitHighIncomeThresholdEnd - benefitsConfig.childBenefitHighIncomeThresholdStart);
    const clawback = annualChildBenefit * clawbackRate;
    return Math.max(0, (annualChildBenefit - clawback) / 12);
  }

  return childBenefit;
};