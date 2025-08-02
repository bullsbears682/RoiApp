import { BusinessScenario } from '@/data/businessTypes';
import { Country, calculateTax } from '@/data/countries';

export interface ROIInputs {
  // Basic Business Metrics
  monthlyRevenue: number;
  grossMargin: number; // percentage
  marketingBudget: number;
  operatingExpenses: number;
  employeeCosts: number;
  
  // Customer Metrics
  cac?: number; // Customer Acquisition Cost
  averageOrderValue?: number;
  churnRate?: number; // monthly percentage
  
  // Time & Growth
  timeframe: 'monthly' | 'quarterly' | 'yearly';
  projectionMonths: number;
  growthRate: number; // monthly percentage
  
  // Country & Business Context
  country: string;
  businessType: string;
  scenario: string;
  
  // Investment & Goals
  initialInvestment?: number;
  targetROI?: number;
  
  // Additional Costs
  additionalCosts?: Record<string, number>;
}

export interface ROIResults {
  // Core Metrics
  roi: number; // percentage
  netProfit: number;
  grossProfit: number;
  totalRevenue: number;
  totalCosts: number;
  
  // Tax Calculations
  taxAmount: number;
  afterTaxProfit: number;
  effectiveTaxRate: number;
  
  // Customer Metrics
  customerLifetimeValue?: number;
  paybackPeriod?: number; // months
  customersNeeded?: number;
  
  // Cash Flow
  monthlyNetCashFlow: number;
  breakEvenMonth?: number;
  
  // Detailed Breakdown
  costBreakdown: {
    marketing: number;
    operations: number;
    employees: number;
    taxes: number;
    additional: number;
  };
  
  // Projections
  monthlyProjections: Array<{
    month: number;
    revenue: number;
    costs: number;
    netProfit: number;
    cumulativeROI: number;
  }>;
  
  // Benchmarks & Insights
  industryComparison: {
    revenueVsBenchmark: number; // percentage difference
    marginVsBenchmark: number;
    growthVsBenchmark: number;
  };
  
  // Risk Analysis
  riskFactors: Array<{
    factor: string;
    impact: 'low' | 'medium' | 'high';
    description: string;
  }>;
  
  // Recommendations
  recommendations: Array<{
    category: string;
    suggestion: string;
    potentialImpact: string;
  }>;
}

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export class ROICalculator {
  private inputs: ROIInputs;
  private country: Country;
  private scenario: BusinessScenario;

  constructor(inputs: ROIInputs, country: Country, scenario: BusinessScenario) {
    this.inputs = inputs;
    this.country = country;
    this.scenario = scenario;
  }

  // Validation Methods
  validateInputs(): ValidationError[] {
    const errors: ValidationError[] = [];

    // Required field validation
    if (this.inputs.monthlyRevenue <= 0) {
      errors.push({
        field: 'monthlyRevenue',
        message: 'Monthly revenue must be greater than 0',
        severity: 'error'
      });
    }

    if (this.inputs.grossMargin < 0 || this.inputs.grossMargin > 100) {
      errors.push({
        field: 'grossMargin',
        message: 'Gross margin must be between 0% and 100%',
        severity: 'error'
      });
    }

    if (this.inputs.marketingBudget < 0) {
      errors.push({
        field: 'marketingBudget',
        message: 'Marketing budget cannot be negative',
        severity: 'error'
      });
    }

    // Warning validations
    if (this.inputs.grossMargin < 20) {
      errors.push({
        field: 'grossMargin',
        message: 'Gross margin below 20% may indicate pricing or cost issues',
        severity: 'warning'
      });
    }

    if (this.inputs.cac && this.inputs.averageOrderValue && this.inputs.cac > this.inputs.averageOrderValue) {
      errors.push({
        field: 'cac',
        message: 'Customer acquisition cost exceeds average order value',
        severity: 'warning'
      });
    }

    if (this.inputs.churnRate && this.inputs.churnRate > 15) {
      errors.push({
        field: 'churnRate',
        message: 'High churn rate may impact long-term profitability',
        severity: 'warning'
      });
    }

    return errors;
  }

  // Core Calculation Methods
  calculate(): ROIResults {
    const validationErrors = this.validateInputs();
    if (validationErrors.some(e => e.severity === 'error')) {
      throw new Error('Validation errors must be resolved before calculation');
    }

    // Calculate base metrics
    const grossProfit = this.calculateGrossProfit();
    const totalCosts = this.calculateTotalCosts();
    const netProfitBeforeTax = grossProfit - totalCosts;
    const taxAmount = this.calculateTaxes(netProfitBeforeTax);
    const afterTaxProfit = netProfitBeforeTax - taxAmount;
    
    // Calculate ROI
    const initialInvestment = this.inputs.initialInvestment || this.estimateInitialInvestment();
    const roi = this.calculateROI(afterTaxProfit, initialInvestment);
    
    // Generate projections
    const monthlyProjections = this.generateProjections();
    
    // Calculate customer metrics
    const customerMetrics = this.calculateCustomerMetrics();
    
    // Generate insights and recommendations
    const industryComparison = this.compareToIndustryBenchmarks();
    const riskFactors = this.analyzeRiskFactors();
    const recommendations = this.generateRecommendations();

    return {
      roi,
      netProfit: afterTaxProfit,
      grossProfit,
      totalRevenue: this.inputs.monthlyRevenue,
      totalCosts,
      taxAmount,
      afterTaxProfit,
      effectiveTaxRate: (taxAmount / netProfitBeforeTax) * 100,
      customerLifetimeValue: customerMetrics.ltv,
      paybackPeriod: customerMetrics.paybackPeriod,
      customersNeeded: customerMetrics.customersNeeded,
      monthlyNetCashFlow: afterTaxProfit,
      breakEvenMonth: this.calculateBreakEvenMonth(),
      costBreakdown: {
        marketing: this.inputs.marketingBudget,
        operations: this.inputs.operatingExpenses,
        employees: this.inputs.employeeCosts || 0,
        taxes: taxAmount,
        additional: this.calculateAdditionalCosts()
      },
      monthlyProjections,
      industryComparison,
      riskFactors,
      recommendations
    };
  }

  private calculateGrossProfit(): number {
    return this.inputs.monthlyRevenue * (this.inputs.grossMargin / 100);
  }

  private calculateTotalCosts(): number {
    const baseCosts = this.inputs.marketingBudget + 
                     this.inputs.operatingExpenses + 
                     (this.inputs.employeeCosts || 0);
    
    const additionalCosts = this.calculateAdditionalCosts();
    const countryCosts = this.calculateCountrySpecificCosts();
    
    return baseCosts + additionalCosts + countryCosts;
  }

  private calculateAdditionalCosts(): number {
    if (!this.inputs.additionalCosts) return 0;
    return Object.values(this.inputs.additionalCosts).reduce((sum, cost) => sum + cost, 0);
  }

  private calculateCountrySpecificCosts(): number {
    const revenue = this.inputs.monthlyRevenue;
    const operatingCosts = this.country.averageOperatingCosts;
    
    // Estimate based on country-specific operating costs
    const estimatedRent = operatingCosts.rent * 100; // Assuming 100 sqm
    const estimatedUtilities = estimatedRent * (operatingCosts.utilities / 100);
    const estimatedInternet = operatingCosts.internet;
    const estimatedInsurance = revenue * (operatingCosts.insurance / 100);
    
    return estimatedRent + estimatedUtilities + estimatedInternet + estimatedInsurance;
  }

  private calculateTaxes(netProfitBeforeTax: number): number {
    if (netProfitBeforeTax <= 0) return 0;
    return calculateTax(netProfitBeforeTax, this.country.taxRates, 'corporate');
  }

  private calculateROI(netProfit: number, initialInvestment: number): number {
    if (initialInvestment === 0) return 0;
    return (netProfit / initialInvestment) * 100;
  }

  private estimateInitialInvestment(): number {
    // Estimate based on business type and country
    const baseInvestment = this.inputs.monthlyRevenue * 3; // 3 months of revenue
    const countryMultiplier = this.country.businessRegistrationCost / 100;
    return baseInvestment + countryMultiplier;
  }

  private calculateCustomerMetrics(): {
    ltv?: number;
    paybackPeriod?: number;
    customersNeeded?: number;
  } {
    const result: any = {};

    if (this.inputs.averageOrderValue && this.inputs.churnRate) {
      // Calculate Customer Lifetime Value
      const monthlyChurnRate = this.inputs.churnRate / 100;
      const averageLifetimeMonths = 1 / monthlyChurnRate;
      const grossMarginPerCustomer = this.inputs.averageOrderValue * (this.inputs.grossMargin / 100);
      result.ltv = grossMarginPerCustomer * averageLifetimeMonths;
    }

    if (this.inputs.cac && result.ltv) {
      // Calculate Payback Period
      const monthlyGrossMarginPerCustomer = (this.inputs.averageOrderValue || 0) * (this.inputs.grossMargin / 100);
      result.paybackPeriod = this.inputs.cac / monthlyGrossMarginPerCustomer;
    }

    if (this.inputs.averageOrderValue) {
      // Calculate customers needed to reach revenue target
      result.customersNeeded = Math.ceil(this.inputs.monthlyRevenue / this.inputs.averageOrderValue);
    }

    return result;
  }

  private generateProjections(): Array<{
    month: number;
    revenue: number;
    costs: number;
    netProfit: number;
    cumulativeROI: number;
  }> {
    const projections = [];
    const monthlyGrowthRate = this.inputs.growthRate / 100;
    let cumulativeProfit = 0;
    const initialInvestment = this.inputs.initialInvestment || this.estimateInitialInvestment();

    for (let month = 1; month <= this.inputs.projectionMonths; month++) {
      const growthMultiplier = Math.pow(1 + monthlyGrowthRate, month - 1);
      const monthlyRevenue = this.inputs.monthlyRevenue * growthMultiplier;
      const monthlyGrossProfit = monthlyRevenue * (this.inputs.grossMargin / 100);
      const monthlyCosts = this.calculateTotalCosts() * growthMultiplier;
      const monthlyNetProfitBeforeTax = monthlyGrossProfit - monthlyCosts;
      const monthlyTax = this.calculateTaxes(monthlyNetProfitBeforeTax);
      const monthlyNetProfit = monthlyNetProfitBeforeTax - monthlyTax;
      
      cumulativeProfit += monthlyNetProfit;
      const cumulativeROI = (cumulativeProfit / initialInvestment) * 100;

      projections.push({
        month,
        revenue: monthlyRevenue,
        costs: monthlyCosts + monthlyTax,
        netProfit: monthlyNetProfit,
        cumulativeROI
      });
    }

    return projections;
  }

  private calculateBreakEvenMonth(): number | undefined {
    const projections = this.generateProjections();
    const breakEvenMonth = projections.find(p => p.cumulativeROI >= 0);
    return breakEvenMonth?.month;
  }

  private compareToIndustryBenchmarks(): {
    revenueVsBenchmark: number;
    marginVsBenchmark: number;
    growthVsBenchmark: number;
  } {
    const benchmarks = this.scenario.assumptions.industryBenchmarks;
    const scenarioDefaults = this.scenario.defaultInputs;

    return {
      revenueVsBenchmark: ((this.inputs.monthlyRevenue - scenarioDefaults.monthlyRevenue) / scenarioDefaults.monthlyRevenue) * 100,
      marginVsBenchmark: ((this.inputs.grossMargin - scenarioDefaults.grossMargin) / scenarioDefaults.grossMargin) * 100,
      growthVsBenchmark: ((this.inputs.growthRate - this.scenario.assumptions.growthRate) / this.scenario.assumptions.growthRate) * 100
    };
  }

  private analyzeRiskFactors(): Array<{
    factor: string;
    impact: 'low' | 'medium' | 'high';
    description: string;
  }> {
    const risks = [];

    // Market risk
    if (this.inputs.growthRate > 25) {
      risks.push({
        factor: 'High Growth Rate',
        impact: 'medium' as const,
        description: 'Aggressive growth targets may be difficult to sustain and require significant investment.'
      });
    }

    // Customer concentration risk
    if (this.inputs.churnRate && this.inputs.churnRate > 10) {
      risks.push({
        factor: 'High Churn Rate',
        impact: 'high' as const,
        description: 'High customer churn indicates potential product-market fit or customer satisfaction issues.'
      });
    }

    // Financial risk
    if (this.inputs.grossMargin < 30) {
      risks.push({
        factor: 'Low Gross Margin',
        impact: 'medium' as const,
        description: 'Low margins provide little buffer for unexpected costs or market changes.'
      });
    }

    // Country-specific risks
    if (this.country.economicIndicators.inflationRate > 5) {
      risks.push({
        factor: 'High Inflation Environment',
        impact: 'medium' as const,
        description: 'High inflation may increase costs and affect customer purchasing power.'
      });
    }

    // Tax risk
    if (this.country.taxRates.corporateTax > 30) {
      risks.push({
        factor: 'High Tax Burden',
        impact: 'medium' as const,
        description: 'High corporate tax rates reduce after-tax profitability and cash flow.'
      });
    }

    return risks;
  }

  private generateRecommendations(): Array<{
    category: string;
    suggestion: string;
    potentialImpact: string;
  }> {
    const recommendations = [];

    // Revenue optimization
    if (this.inputs.grossMargin < this.scenario.defaultInputs.grossMargin) {
      recommendations.push({
        category: 'Pricing Strategy',
        suggestion: 'Consider increasing prices or reducing cost of goods sold to improve gross margin',
        potentialImpact: 'Could increase monthly profit by 15-25%'
      });
    }

    // Cost optimization
    if (this.inputs.marketingBudget > this.inputs.monthlyRevenue * 0.4) {
      recommendations.push({
        category: 'Marketing Efficiency',
        suggestion: 'Marketing spend is high relative to revenue. Focus on improving conversion rates and reducing CAC',
        potentialImpact: 'Could reduce costs by 20-30% while maintaining growth'
      });
    }

    // Customer retention
    if (this.inputs.churnRate && this.inputs.churnRate > 8) {
      recommendations.push({
        category: 'Customer Retention',
        suggestion: 'Implement customer success programs to reduce churn rate',
        potentialImpact: 'Reducing churn by 5% could increase LTV by 50%+'
      });
    }

    // Growth strategy
    if (this.inputs.growthRate < this.scenario.assumptions.growthRate) {
      recommendations.push({
        category: 'Growth Acceleration',
        suggestion: 'Consider increasing marketing investment or expanding to new channels',
        potentialImpact: 'Could accelerate revenue growth by 10-20%'
      });
    }

    // Tax optimization
    if (this.country.taxRates.corporateTax > 25) {
      recommendations.push({
        category: 'Tax Planning',
        suggestion: 'Explore tax-efficient business structures and deductions available in your country',
        potentialImpact: 'Could reduce effective tax rate by 5-10%'
      });
    }

    return recommendations;
  }
}

// Utility functions for ROI calculations
export function calculateLTV(averageOrderValue: number, grossMargin: number, churnRate: number): number {
  const monthlyChurnRate = churnRate / 100;
  const averageLifetimeMonths = 1 / monthlyChurnRate;
  const grossMarginPerCustomer = averageOrderValue * (grossMargin / 100);
  return grossMarginPerCustomer * averageLifetimeMonths;
}

export function calculatePaybackPeriod(cac: number, monthlyGrossMarginPerCustomer: number): number {
  return cac / monthlyGrossMarginPerCustomer;
}

export function formatROIResults(results: ROIResults, currency: string): Record<string, string> {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  const percentFormatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });

  return {
    roi: percentFormatter.format(results.roi / 100),
    netProfit: formatter.format(results.netProfit),
    grossProfit: formatter.format(results.grossProfit),
    totalRevenue: formatter.format(results.totalRevenue),
    totalCosts: formatter.format(results.totalCosts),
    taxAmount: formatter.format(results.taxAmount),
    afterTaxProfit: formatter.format(results.afterTaxProfit),
    effectiveTaxRate: percentFormatter.format(results.effectiveTaxRate / 100),
    customerLifetimeValue: results.customerLifetimeValue ? formatter.format(results.customerLifetimeValue) : 'N/A',
    paybackPeriod: results.paybackPeriod ? `${results.paybackPeriod.toFixed(1)} months` : 'N/A',
    monthlyNetCashFlow: formatter.format(results.monthlyNetCashFlow),
    breakEvenMonth: results.breakEvenMonth ? `Month ${results.breakEvenMonth}` : 'Not within projection period'
  };
}