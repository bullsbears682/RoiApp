export interface TaxRates {
  corporateTax: number;
  personalIncomeTax: {
    min: number;
    max: number;
    brackets?: Array<{ min: number; max: number; rate: number }>;
  };
  capitalGainsTax: number;
  dividendTax: number;
  payrollTax?: number;
  socialSecurityTax?: number;
  unemploymentTax?: number;
}

export interface Country {
  id: string;
  name: string;
  code: string; // ISO 3166-1 alpha-2
  currency: string;
  currencySymbol: string;
  flag: string;
  taxRates: TaxRates;
  vatRate?: number;
  fiscalYearEnd: string; // MM-DD format
  businessRegistrationCost: number;
  minimumWage?: number; // per hour in local currency
  averageOperatingCosts: {
    rent: number; // per sqm per month
    utilities: number; // percentage of rent
    internet: number; // monthly cost
    insurance: number; // percentage of revenue
  };
  economicIndicators: {
    inflationRate: number;
    gdpGrowthRate: number;
    unemploymentRate: number;
    businessEaseRank: number; // World Bank ranking
  };
  active: boolean;
}

export const countries: Country[] = [
  {
    id: 'us',
    name: 'United States',
    code: 'US',
    currency: 'USD',
    currencySymbol: '$',
    flag: '🇺🇸',
    taxRates: {
      corporateTax: 21,
      personalIncomeTax: { min: 10, max: 37 },
      capitalGainsTax: 20,
      dividendTax: 20,
      payrollTax: 15.3,
      socialSecurityTax: 12.4,
      unemploymentTax: 6
    },
    vatRate: 0, // No federal VAT, state sales tax varies
    fiscalYearEnd: '12-31',
    businessRegistrationCost: 500,
    minimumWage: 7.25,
    averageOperatingCosts: {
      rent: 35,
      utilities: 15,
      internet: 80,
      insurance: 2.5
    },
    economicIndicators: {
      inflationRate: 3.2,
      gdpGrowthRate: 2.1,
      unemploymentRate: 3.8,
      businessEaseRank: 6
    },
    active: true
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    code: 'GB',
    currency: 'GBP',
    currencySymbol: '£',
    flag: '🇬🇧',
    taxRates: {
      corporateTax: 25,
      personalIncomeTax: { min: 20, max: 45 },
      capitalGainsTax: 20,
      dividendTax: 33.75,
      payrollTax: 13.25
    },
    vatRate: 20,
    fiscalYearEnd: '04-05',
    businessRegistrationCost: 12,
    minimumWage: 11.44,
    averageOperatingCosts: {
      rent: 45,
      utilities: 18,
      internet: 35,
      insurance: 3.2
    },
    economicIndicators: {
      inflationRate: 4.1,
      gdpGrowthRate: 1.3,
      unemploymentRate: 4.2,
      businessEaseRank: 8
    },
    active: true
  },
  {
    id: 'ca',
    name: 'Canada',
    code: 'CA',
    currency: 'CAD',
    currencySymbol: 'C$',
    flag: '🇨🇦',
    taxRates: {
      corporateTax: 26.7, // Combined federal and average provincial
      personalIncomeTax: { min: 15, max: 53.5 },
      capitalGainsTax: 26.75,
      dividendTax: 39.34,
      payrollTax: 7.37
    },
    vatRate: 13, // HST average
    fiscalYearEnd: '12-31',
    businessRegistrationCost: 200,
    minimumWage: 16.65,
    averageOperatingCosts: {
      rent: 28,
      utilities: 12,
      internet: 65,
      insurance: 2.8
    },
    economicIndicators: {
      inflationRate: 2.9,
      gdpGrowthRate: 1.8,
      unemploymentRate: 5.1,
      businessEaseRank: 23
    },
    active: true
  },
  {
    id: 'de',
    name: 'Germany',
    code: 'DE',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇩🇪',
    taxRates: {
      corporateTax: 29.9, // Including trade tax
      personalIncomeTax: { min: 14, max: 45 },
      capitalGainsTax: 26.375,
      dividendTax: 26.375,
      payrollTax: 39.95 // Including social contributions
    },
    vatRate: 19,
    fiscalYearEnd: '12-31',
    businessRegistrationCost: 150,
    minimumWage: 12.41,
    averageOperatingCosts: {
      rent: 12,
      utilities: 20,
      internet: 45,
      insurance: 3.5
    },
    economicIndicators: {
      inflationRate: 2.4,
      gdpGrowthRate: 0.8,
      unemploymentRate: 5.6,
      businessEaseRank: 22
    },
    active: true
  },
  {
    id: 'fr',
    name: 'France',
    code: 'FR',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇫🇷',
    taxRates: {
      corporateTax: 25,
      personalIncomeTax: { min: 11, max: 45 },
      capitalGainsTax: 30,
      dividendTax: 30,
      payrollTax: 45.5 // Including social charges
    },
    vatRate: 20,
    fiscalYearEnd: '12-31',
    businessRegistrationCost: 37,
    minimumWage: 11.65,
    averageOperatingCosts: {
      rent: 18,
      utilities: 16,
      internet: 30,
      insurance: 4.2
    },
    economicIndicators: {
      inflationRate: 3.1,
      gdpGrowthRate: 1.2,
      unemploymentRate: 7.3,
      businessEaseRank: 32
    },
    active: true
  },
  {
    id: 'au',
    name: 'Australia',
    code: 'AU',
    currency: 'AUD',
    currencySymbol: 'A$',
    flag: '🇦🇺',
    taxRates: {
      corporateTax: 25, // For businesses under $50M turnover
      personalIncomeTax: { min: 16, max: 45 },
      capitalGainsTax: 23.5,
      dividendTax: 0, // Franking credits system
      payrollTax: 11.5
    },
    vatRate: 10, // GST
    fiscalYearEnd: '06-30',
    businessRegistrationCost: 44,
    minimumWage: 23.23,
    averageOperatingCosts: {
      rent: 25,
      utilities: 18,
      internet: 70,
      insurance: 2.9
    },
    economicIndicators: {
      inflationRate: 3.8,
      gdpGrowthRate: 2.2,
      unemploymentRate: 3.9,
      businessEaseRank: 14
    },
    active: true
  },
  {
    id: 'jp',
    name: 'Japan',
    code: 'JP',
    currency: 'JPY',
    currencySymbol: '¥',
    flag: '🇯🇵',
    taxRates: {
      corporateTax: 29.74, // Including local taxes
      personalIncomeTax: { min: 5, max: 55 },
      capitalGainsTax: 20.315,
      dividendTax: 20.315,
      payrollTax: 30.3
    },
    vatRate: 10,
    fiscalYearEnd: '03-31',
    businessRegistrationCost: 242000, // In JPY
    minimumWage: 930,
    averageOperatingCosts: {
      rent: 55,
      utilities: 22,
      internet: 4000,
      insurance: 3.8
    },
    economicIndicators: {
      inflationRate: 2.6,
      gdpGrowthRate: 1.1,
      unemploymentRate: 2.6,
      businessEaseRank: 29
    },
    active: true
  },
  {
    id: 'sg',
    name: 'Singapore',
    code: 'SG',
    currency: 'SGD',
    currencySymbol: 'S$',
    flag: '🇸🇬',
    taxRates: {
      corporateTax: 17,
      personalIncomeTax: { min: 0, max: 24 },
      capitalGainsTax: 0,
      dividendTax: 0,
      payrollTax: 37 // Including CPF
    },
    vatRate: 9, // GST
    fiscalYearEnd: '12-31',
    businessRegistrationCost: 300,
    minimumWage: 0, // No minimum wage
    averageOperatingCosts: {
      rent: 45,
      utilities: 12,
      internet: 50,
      insurance: 2.1
    },
    economicIndicators: {
      inflationRate: 3.3,
      gdpGrowthRate: 3.1,
      unemploymentRate: 2.1,
      businessEaseRank: 2
    },
    active: true
  },
  {
    id: 'nl',
    name: 'Netherlands',
    code: 'NL',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇳🇱',
    taxRates: {
      corporateTax: 25.8,
      personalIncomeTax: { min: 36.97, max: 49.5 },
      capitalGainsTax: 31,
      dividendTax: 26.9,
      payrollTax: 48.85
    },
    vatRate: 21,
    fiscalYearEnd: '12-31',
    businessRegistrationCost: 50,
    minimumWage: 12.83,
    averageOperatingCosts: {
      rent: 15,
      utilities: 18,
      internet: 40,
      insurance: 3.1
    },
    economicIndicators: {
      inflationRate: 2.7,
      gdpGrowthRate: 1.5,
      unemploymentRate: 3.5,
      businessEaseRank: 42
    },
    active: true
  },
  {
    id: 'ch',
    name: 'Switzerland',
    code: 'CH',
    currency: 'CHF',
    currencySymbol: 'CHF',
    flag: '🇨🇭',
    taxRates: {
      corporateTax: 14.9, // Average across cantons
      personalIncomeTax: { min: 0, max: 40 },
      capitalGainsTax: 0,
      dividendTax: 35,
      payrollTax: 12.9
    },
    vatRate: 8.1,
    fiscalYearEnd: '12-31',
    businessRegistrationCost: 600,
    minimumWage: 0, // Varies by canton
    averageOperatingCosts: {
      rent: 22,
      utilities: 15,
      internet: 50,
      insurance: 2.8
    },
    economicIndicators: {
      inflationRate: 1.4,
      gdpGrowthRate: 1.8,
      unemploymentRate: 2.3,
      businessEaseRank: 36
    },
    active: true
  },
  {
    id: 'se',
    name: 'Sweden',
    code: 'SE',
    currency: 'SEK',
    currencySymbol: 'kr',
    flag: '🇸🇪',
    taxRates: {
      corporateTax: 20.6,
      personalIncomeTax: { min: 32, max: 57 },
      capitalGainsTax: 30,
      dividendTax: 30,
      payrollTax: 31.42
    },
    vatRate: 25,
    fiscalYearEnd: '12-31',
    businessRegistrationCost: 1000,
    minimumWage: 0, // Set by collective agreements
    averageOperatingCosts: {
      rent: 12,
      utilities: 20,
      internet: 300,
      insurance: 3.4
    },
    economicIndicators: {
      inflationRate: 2.1,
      gdpGrowthRate: 1.9,
      unemploymentRate: 7.8,
      businessEaseRank: 10
    },
    active: true
  },
  {
    id: 'dk',
    name: 'Denmark',
    code: 'DK',
    currency: 'DKK',
    currencySymbol: 'kr',
    flag: '🇩🇰',
    taxRates: {
      corporateTax: 22,
      personalIncomeTax: { min: 37, max: 56 },
      capitalGainsTax: 42,
      dividendTax: 42,
      payrollTax: 8
    },
    vatRate: 25,
    fiscalYearEnd: '12-31',
    businessRegistrationCost: 670,
    minimumWage: 0, // Set by collective agreements
    averageOperatingCosts: {
      rent: 15,
      utilities: 18,
      internet: 300,
      insurance: 3.2
    },
    economicIndicators: {
      inflationRate: 2.4,
      gdpGrowthRate: 2.3,
      unemploymentRate: 5.1,
      businessEaseRank: 4
    },
    active: true
  },
  {
    id: 'no',
    name: 'Norway',
    code: 'NO',
    currency: 'NOK',
    currencySymbol: 'kr',
    flag: '🇳🇴',
    taxRates: {
      corporateTax: 22,
      personalIncomeTax: { min: 22, max: 47.4 },
      capitalGainsTax: 22,
      dividendTax: 35.2,
      payrollTax: 14.1
    },
    vatRate: 25,
    fiscalYearEnd: '12-31',
    businessRegistrationCost: 1070,
    minimumWage: 0, // Set by collective agreements
    averageOperatingCosts: {
      rent: 18,
      utilities: 22,
      internet: 500,
      insurance: 2.9
    },
    economicIndicators: {
      inflationRate: 3.1,
      gdpGrowthRate: 2.8,
      unemploymentRate: 3.2,
      businessEaseRank: 9
    },
    active: true
  },
  {
    id: 'fi',
    name: 'Finland',
    code: 'FI',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇫🇮',
    taxRates: {
      corporateTax: 20,
      personalIncomeTax: { min: 6.5, max: 51.5 },
      capitalGainsTax: 34,
      dividendTax: 34,
      payrollTax: 24.4
    },
    vatRate: 24,
    fiscalYearEnd: '12-31',
    businessRegistrationCost: 380,
    minimumWage: 0, // Set by collective agreements
    averageOperatingCosts: {
      rent: 11,
      utilities: 25,
      internet: 25,
      insurance: 3.1
    },
    economicIndicators: {
      inflationRate: 2.8,
      gdpGrowthRate: 1.4,
      unemploymentRate: 7.2,
      businessEaseRank: 20
    },
    active: true
  },
  {
    id: 'es',
    name: 'Spain',
    code: 'ES',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇪🇸',
    taxRates: {
      corporateTax: 25,
      personalIncomeTax: { min: 19, max: 47 },
      capitalGainsTax: 23,
      dividendTax: 23,
      payrollTax: 36.25
    },
    vatRate: 21,
    fiscalYearEnd: '12-31',
    businessRegistrationCost: 40,
    minimumWage: 8.45,
    averageOperatingCosts: {
      rent: 9,
      utilities: 18,
      internet: 35,
      insurance: 3.8
    },
    economicIndicators: {
      inflationRate: 3.5,
      gdpGrowthRate: 2.4,
      unemploymentRate: 12.8,
      businessEaseRank: 30
    },
    active: true
  },
  {
    id: 'it',
    name: 'Italy',
    code: 'IT',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇮🇹',
    taxRates: {
      corporateTax: 27.9, // Including IRAP
      personalIncomeTax: { min: 23, max: 47.2 },
      capitalGainsTax: 26,
      dividendTax: 26,
      payrollTax: 47.8
    },
    vatRate: 22,
    fiscalYearEnd: '12-31',
    businessRegistrationCost: 200,
    minimumWage: 0, // Set by collective agreements
    averageOperatingCosts: {
      rent: 12,
      utilities: 20,
      internet: 30,
      insurance: 4.1
    },
    economicIndicators: {
      inflationRate: 2.9,
      gdpGrowthRate: 0.9,
      unemploymentRate: 8.1,
      businessEaseRank: 58
    },
    active: true
  },
  {
    id: 'be',
    name: 'Belgium',
    code: 'BE',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇧🇪',
    taxRates: {
      corporateTax: 25,
      personalIncomeTax: { min: 25, max: 50 },
      capitalGainsTax: 0,
      dividendTax: 30,
      payrollTax: 47
    },
    vatRate: 21,
    fiscalYearEnd: '12-31',
    businessRegistrationCost: 90,
    minimumWage: 12.76,
    averageOperatingCosts: {
      rent: 14,
      utilities: 19,
      internet: 40,
      insurance: 3.6
    },
    economicIndicators: {
      inflationRate: 2.3,
      gdpGrowthRate: 1.6,
      unemploymentRate: 5.8,
      businessEaseRank: 45
    },
    active: true
  },
  {
    id: 'at',
    name: 'Austria',
    code: 'AT',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇦🇹',
    taxRates: {
      corporateTax: 25,
      personalIncomeTax: { min: 20, max: 55 },
      capitalGainsTax: 27.5,
      dividendTax: 27.5,
      payrollTax: 40
    },
    vatRate: 20,
    fiscalYearEnd: '12-31',
    businessRegistrationCost: 280,
    minimumWage: 12.82,
    averageOperatingCosts: {
      rent: 11,
      utilities: 21,
      internet: 35,
      insurance: 3.4
    },
    economicIndicators: {
      inflationRate: 2.7,
      gdpGrowthRate: 1.3,
      unemploymentRate: 4.9,
      businessEaseRank: 26
    },
    active: true
  },
  {
    id: 'ie',
    name: 'Ireland',
    code: 'IE',
    currency: 'EUR',
    currencySymbol: '€',
    flag: '🇮🇪',
    taxRates: {
      corporateTax: 12.5,
      personalIncomeTax: { min: 20, max: 40 },
      capitalGainsTax: 33,
      dividendTax: 51,
      payrollTax: 14.75
    },
    vatRate: 23,
    fiscalYearEnd: '12-31',
    businessRegistrationCost: 20,
    minimumWage: 12.70,
    averageOperatingCosts: {
      rent: 20,
      utilities: 16,
      internet: 45,
      insurance: 2.8
    },
    economicIndicators: {
      inflationRate: 2.2,
      gdpGrowthRate: 8.9,
      unemploymentRate: 4.1,
      businessEaseRank: 24
    },
    active: true
  },
  {
    id: 'nz',
    name: 'New Zealand',
    code: 'NZ',
    currency: 'NZD',
    currencySymbol: 'NZ$',
    flag: '🇳🇿',
    taxRates: {
      corporateTax: 28,
      personalIncomeTax: { min: 10.5, max: 39 },
      capitalGainsTax: 0,
      dividendTax: 0, // Imputation system
      payrollTax: 0
    },
    vatRate: 15, // GST
    fiscalYearEnd: '03-31',
    businessRegistrationCost: 117,
    minimumWage: 23.15,
    averageOperatingCosts: {
      rent: 18,
      utilities: 20,
      internet: 80,
      insurance: 3.2
    },
    economicIndicators: {
      inflationRate: 3.9,
      gdpGrowthRate: 2.1,
      unemploymentRate: 3.4,
      businessEaseRank: 1
    },
    active: true
  },
  {
    id: 'kr',
    name: 'South Korea',
    code: 'KR',
    currency: 'KRW',
    currencySymbol: '₩',
    flag: '🇰🇷',
    taxRates: {
      corporateTax: 27.5,
      personalIncomeTax: { min: 6, max: 45 },
      capitalGainsTax: 22,
      dividendTax: 25,
      payrollTax: 18.78
    },
    vatRate: 10,
    fiscalYearEnd: '12-31',
    businessRegistrationCost: 15000,
    minimumWage: 9860,
    averageOperatingCosts: {
      rent: 28000,
      utilities: 18,
      internet: 30000,
      insurance: 3.1
    },
    economicIndicators: {
      inflationRate: 2.8,
      gdpGrowthRate: 2.6,
      unemploymentRate: 2.7,
      businessEaseRank: 5
    },
    active: true
  },
  {
    id: 'mx',
    name: 'Mexico',
    code: 'MX',
    currency: 'MXN',
    currencySymbol: '$',
    flag: '🇲🇽',
    taxRates: {
      corporateTax: 30,
      personalIncomeTax: { min: 1.92, max: 35 },
      capitalGainsTax: 10,
      dividendTax: 10,
      payrollTax: 25
    },
    vatRate: 16, // IVA
    fiscalYearEnd: '12-31',
    businessRegistrationCost: 1500,
    minimumWage: 248.93,
    averageOperatingCosts: {
      rent: 150,
      utilities: 12,
      internet: 600,
      insurance: 2.8
    },
    economicIndicators: {
      inflationRate: 4.2,
      gdpGrowthRate: 2.3,
      unemploymentRate: 2.8,
      businessEaseRank: 60
    },
    active: true
  },
  {
    id: 'br',
    name: 'Brazil',
    code: 'BR',
    currency: 'BRL',
    currencySymbol: 'R$',
    flag: '🇧🇷',
    taxRates: {
      corporateTax: 34,
      personalIncomeTax: { min: 0, max: 27.5 },
      capitalGainsTax: 15,
      dividendTax: 0,
      payrollTax: 28.8
    },
    vatRate: 17, // Average across states
    fiscalYearEnd: '12-31',
    businessRegistrationCost: 800,
    minimumWage: 1412,
    averageOperatingCosts: {
      rent: 25,
      utilities: 15,
      internet: 80,
      insurance: 4.2
    },
    economicIndicators: {
      inflationRate: 4.8,
      gdpGrowthRate: 1.4,
      unemploymentRate: 8.9,
      businessEaseRank: 124
    },
    active: true
  },
  {
    id: 'ar',
    name: 'Argentina',
    code: 'AR',
    currency: 'ARS',
    currencySymbol: '$',
    flag: '🇦🇷',
    taxRates: {
      corporateTax: 35,
      personalIncomeTax: { min: 5, max: 35 },
      capitalGainsTax: 15,
      dividendTax: 7,
      payrollTax: 27
    },
    vatRate: 21, // IVA
    fiscalYearEnd: '12-31',
    businessRegistrationCost: 5000,
    minimumWage: 234315,
    averageOperatingCosts: {
      rent: 800,
      utilities: 18,
      internet: 3500,
      insurance: 3.8
    },
    economicIndicators: {
      inflationRate: 78.5,
      gdpGrowthRate: -1.6,
      unemploymentRate: 6.2,
      businessEaseRank: 126
    },
    active: true
  },
  {
    id: 'in',
    name: 'India',
    code: 'IN',
    currency: 'INR',
    currencySymbol: '₹',
    flag: '🇮🇳',
    taxRates: {
      corporateTax: 30,
      personalIncomeTax: { min: 5, max: 30 },
      capitalGainsTax: 20,
      dividendTax: 10,
      payrollTax: 24
    },
    vatRate: 18, // GST
    fiscalYearEnd: '03-31',
    businessRegistrationCost: 1000,
    minimumWage: 178,
    averageOperatingCosts: {
      rent: 500,
      utilities: 15,
      internet: 800,
      insurance: 2.1
    },
    economicIndicators: {
      inflationRate: 5.4,
      gdpGrowthRate: 6.8,
      unemploymentRate: 3.2,
      businessEaseRank: 63
    },
    active: true
  },
  {
    id: 'cn',
    name: 'China',
    code: 'CN',
    currency: 'CNY',
    currencySymbol: '¥',
    flag: '🇨🇳',
    taxRates: {
      corporateTax: 25,
      personalIncomeTax: { min: 3, max: 45 },
      capitalGainsTax: 20,
      dividendTax: 10,
      payrollTax: 37
    },
    vatRate: 13,
    fiscalYearEnd: '12-31',
    businessRegistrationCost: 0,
    minimumWage: 25,
    averageOperatingCosts: {
      rent: 45,
      utilities: 12,
      internet: 200,
      insurance: 2.5
    },
    economicIndicators: {
      inflationRate: 2.1,
      gdpGrowthRate: 5.2,
      unemploymentRate: 5.1,
      businessEaseRank: 46
    },
    active: true
  }
];

export const currencyFormats: Record<string, Intl.NumberFormatOptions> = {
  USD: { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 },
  EUR: { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 },
  GBP: { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 },
  CAD: { style: 'currency', currency: 'CAD', minimumFractionDigits: 0, maximumFractionDigits: 0 },
  AUD: { style: 'currency', currency: 'AUD', minimumFractionDigits: 0, maximumFractionDigits: 0 },
  JPY: { style: 'currency', currency: 'JPY', minimumFractionDigits: 0, maximumFractionDigits: 0 },
  CHF: { style: 'currency', currency: 'CHF', minimumFractionDigits: 0, maximumFractionDigits: 0 },
  SEK: { style: 'currency', currency: 'SEK', minimumFractionDigits: 0, maximumFractionDigits: 0 },
  NOK: { style: 'currency', currency: 'NOK', minimumFractionDigits: 0, maximumFractionDigits: 0 },
  DKK: { style: 'currency', currency: 'DKK', minimumFractionDigits: 0, maximumFractionDigits: 0 },
  SGD: { style: 'currency', currency: 'SGD', minimumFractionDigits: 0, maximumFractionDigits: 0 },
  KRW: { style: 'currency', currency: 'KRW', minimumFractionDigits: 0, maximumFractionDigits: 0 },
  CNY: { style: 'currency', currency: 'CNY', minimumFractionDigits: 0, maximumFractionDigits: 0 },
  INR: { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 },
  BRL: { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 },
  MXN: { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 0 },
  ARS: { style: 'currency', currency: 'ARS', minimumFractionDigits: 0, maximumFractionDigits: 0 },
  NZD: { style: 'currency', currency: 'NZD', minimumFractionDigits: 0, maximumFractionDigits: 0 }
};

export function getCountryById(id: string): Country | undefined {
  return countries.find(country => country.id === id);
}

export function getCountryByCode(code: string): Country | undefined {
  return countries.find(country => country.code === code);
}

export function formatCurrency(amount: number, currency: string, locale?: string): string {
  const format = currencyFormats[currency] || { style: 'currency', currency };
  return new Intl.NumberFormat(locale || 'en-US', format).format(amount);
}

export function calculateTax(income: number, taxRates: TaxRates, type: 'corporate' | 'personal' = 'corporate'): number {
  if (type === 'corporate') {
    return income * (taxRates.corporateTax / 100);
  }
  
  // Simplified personal tax calculation using max rate
  return income * (taxRates.personalIncomeTax.max / 100);
}

export function getActiveCountries(): Country[] {
  return countries.filter(country => country.active);
}

export function searchCountries(query: string): Country[] {
  const lowercaseQuery = query.toLowerCase();
  return countries.filter(country => 
    country.active && (
      country.name.toLowerCase().includes(lowercaseQuery) ||
      country.code.toLowerCase().includes(lowercaseQuery) ||
      country.currency.toLowerCase().includes(lowercaseQuery)
    )
  );
}