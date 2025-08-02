export interface BusinessScenario {
  id: string;
  name: string;
  description: string;
  defaultInputs: {
    monthlyRevenue: number;
    grossMargin: number;
    marketingBudget: number;
    cac?: number;
    averageOrderValue?: number;
    churnRate?: number;
    operatingExpenses: number;
    employeeCosts?: number;
    additionalMetrics?: Record<string, number>;
  };
  assumptions: {
    growthRate: number;
    seasonality?: Record<string, number>;
    industryBenchmarks: Record<string, number>;
  };
}

export interface BusinessType {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  scenarios: BusinessScenario[];
}

export const businessTypes: BusinessType[] = [
  {
    id: 'startup-tech',
    name: 'Tech Startup',
    description: 'Early-stage technology companies focusing on digital products',
    icon: '🚀',
    category: 'Startup',
    scenarios: [
      {
        id: 'saas-mvp',
        name: 'SaaS MVP',
        description: 'Minimum viable product with basic subscription model',
        defaultInputs: {
          monthlyRevenue: 5000,
          grossMargin: 85,
          marketingBudget: 2000,
          cac: 150,
          averageOrderValue: 49,
          churnRate: 8,
          operatingExpenses: 3000,
          employeeCosts: 8000
        },
        assumptions: {
          growthRate: 15,
          industryBenchmarks: { ltv: 600, paybackPeriod: 12 }
        }
      },
      {
        id: 'mobile-app',
        name: 'Mobile App Freemium',
        description: 'Free app with premium features and in-app purchases',
        defaultInputs: {
          monthlyRevenue: 8000,
          grossMargin: 90,
          marketingBudget: 4000,
          cac: 25,
          averageOrderValue: 12,
          churnRate: 15,
          operatingExpenses: 2500,
          employeeCosts: 12000
        },
        assumptions: {
          growthRate: 25,
          industryBenchmarks: { conversionRate: 3.5, arpu: 2.5 }
        }
      },
      {
        id: 'marketplace',
        name: 'Two-Sided Marketplace',
        description: 'Platform connecting buyers and sellers with commission model',
        defaultInputs: {
          monthlyRevenue: 15000,
          grossMargin: 75,
          marketingBudget: 8000,
          cac: 80,
          averageOrderValue: 200,
          operatingExpenses: 5000,
          employeeCosts: 15000
        },
        assumptions: {
          growthRate: 20,
          industryBenchmarks: { commissionRate: 7.5, supplierAcquisition: 120 }
        }
      },
      {
        id: 'ai-tool',
        name: 'AI-Powered Tool',
        description: 'Artificial intelligence software with API or subscription access',
        defaultInputs: {
          monthlyRevenue: 12000,
          grossMargin: 88,
          marketingBudget: 5000,
          cac: 200,
          averageOrderValue: 99,
          churnRate: 5,
          operatingExpenses: 4000,
          employeeCosts: 18000
        },
        assumptions: {
          growthRate: 30,
          industryBenchmarks: { apiCalls: 100000, computeCost: 0.02 }
        }
      },
      {
        id: 'fintech',
        name: 'FinTech Solution',
        description: 'Financial technology platform with transaction-based revenue',
        defaultInputs: {
          monthlyRevenue: 25000,
          grossMargin: 65,
          marketingBudget: 10000,
          cac: 300,
          averageOrderValue: 500,
          operatingExpenses: 8000,
          employeeCosts: 25000
        },
        assumptions: {
          growthRate: 18,
          industryBenchmarks: { transactionFee: 2.9, complianceCost: 5000 }
        }
      },
      {
        id: 'edtech',
        name: 'EdTech Platform',
        description: 'Educational technology with course or subscription model',
        defaultInputs: {
          monthlyRevenue: 18000,
          grossMargin: 80,
          marketingBudget: 7000,
          cac: 120,
          averageOrderValue: 299,
          churnRate: 10,
          operatingExpenses: 6000,
          employeeCosts: 20000
        },
        assumptions: {
          growthRate: 22,
          seasonality: { jan: 1.3, feb: 1.2, mar: 1.1, sep: 1.4, oct: 1.2 },
          industryBenchmarks: { completionRate: 65, referralRate: 12 }
        }
      },
      {
        id: 'healthtech',
        name: 'HealthTech App',
        description: 'Digital health solution with subscription or per-use pricing',
        defaultInputs: {
          monthlyRevenue: 22000,
          grossMargin: 75,
          marketingBudget: 9000,
          cac: 180,
          averageOrderValue: 79,
          churnRate: 7,
          operatingExpenses: 7000,
          employeeCosts: 22000
        },
        assumptions: {
          growthRate: 16,
          industryBenchmarks: { regulatoryCost: 8000, dataPrivacy: 3000 }
        }
      }
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Online retail businesses selling physical or digital products',
    icon: '🛒',
    category: 'Retail',
    scenarios: [
      {
        id: 'dropshipping',
        name: 'Dropshipping Store',
        description: 'Online store without inventory, products shipped directly from suppliers',
        defaultInputs: {
          monthlyRevenue: 30000,
          grossMargin: 25,
          marketingBudget: 12000,
          cac: 35,
          averageOrderValue: 85,
          operatingExpenses: 3000,
          employeeCosts: 5000
        },
        assumptions: {
          growthRate: 12,
          seasonality: { nov: 1.8, dec: 2.2, jan: 0.7, feb: 0.8 },
          industryBenchmarks: { returnRate: 8, shippingTime: 14 }
        }
      },
      {
        id: 'private-label',
        name: 'Private Label Brand',
        description: 'Own brand products manufactured by third parties',
        defaultInputs: {
          monthlyRevenue: 75000,
          grossMargin: 45,
          marketingBudget: 25000,
          cac: 45,
          averageOrderValue: 120,
          operatingExpenses: 15000,
          employeeCosts: 12000
        },
        assumptions: {
          growthRate: 15,
          industryBenchmarks: { inventoryTurnover: 6, brandRecognition: 15 }
        }
      },
      {
        id: 'subscription-box',
        name: 'Subscription Box',
        description: 'Recurring delivery of curated products',
        defaultInputs: {
          monthlyRevenue: 45000,
          grossMargin: 55,
          marketingBudget: 18000,
          cac: 85,
          averageOrderValue: 35,
          churnRate: 12,
          operatingExpenses: 8000,
          employeeCosts: 8000
        },
        assumptions: {
          growthRate: 18,
          industryBenchmarks: { ltv: 280, packagingCost: 3.5 }
        }
      },
      {
        id: 'marketplace-seller',
        name: 'Amazon/Marketplace Seller',
        description: 'Third-party seller on established marketplaces',
        defaultInputs: {
          monthlyRevenue: 55000,
          grossMargin: 35,
          marketingBudget: 15000,
          cac: 28,
          averageOrderValue: 65,
          operatingExpenses: 8000,
          employeeCosts: 6000
        },
        assumptions: {
          growthRate: 10,
          industryBenchmarks: { marketplaceFee: 15, advertisingCost: 8 }
        }
      },
      {
        id: 'digital-products',
        name: 'Digital Products',
        description: 'Selling downloadable products, courses, or software',
        defaultInputs: {
          monthlyRevenue: 28000,
          grossMargin: 92,
          marketingBudget: 10000,
          cac: 65,
          averageOrderValue: 147,
          operatingExpenses: 4000,
          employeeCosts: 8000
        },
        assumptions: {
          growthRate: 20,
          industryBenchmarks: { conversionRate: 3.2, refundRate: 5 }
        }
      },
      {
        id: 'fashion-retail',
        name: 'Fashion Retail',
        description: 'Online clothing and accessories store',
        defaultInputs: {
          monthlyRevenue: 65000,
          grossMargin: 58,
          marketingBudget: 22000,
          cac: 42,
          averageOrderValue: 95,
          operatingExpenses: 12000,
          employeeCosts: 10000
        },
        assumptions: {
          growthRate: 14,
          seasonality: { mar: 1.2, apr: 1.1, nov: 1.6, dec: 1.9 },
          industryBenchmarks: { returnRate: 25, seasonalInventory: 30 }
        }
      },
      {
        id: 'electronics',
        name: 'Electronics Store',
        description: 'Consumer electronics and gadgets retailer',
        defaultInputs: {
          monthlyRevenue: 85000,
          grossMargin: 22,
          marketingBudget: 18000,
          cac: 55,
          averageOrderValue: 285,
          operatingExpenses: 15000,
          employeeCosts: 12000
        },
        assumptions: {
          growthRate: 8,
          industryBenchmarks: { warrantyRate: 15, techSupportCost: 8 }
        }
      }
    ]
  },
  {
    id: 'saas',
    name: 'SaaS Business',
    description: 'Software as a Service companies with recurring revenue models',
    icon: '💻',
    category: 'Software',
    scenarios: [
      {
        id: 'b2b-enterprise',
        name: 'B2B Enterprise SaaS',
        description: 'High-value software for large organizations',
        defaultInputs: {
          monthlyRevenue: 150000,
          grossMargin: 85,
          marketingBudget: 45000,
          cac: 2500,
          averageOrderValue: 15000,
          churnRate: 2,
          operatingExpenses: 25000,
          employeeCosts: 80000
        },
        assumptions: {
          growthRate: 12,
          industryBenchmarks: { ltv: 180000, salesCycle: 6 }
        }
      },
      {
        id: 'smb-saas',
        name: 'SMB SaaS Tool',
        description: 'Business software for small to medium businesses',
        defaultInputs: {
          monthlyRevenue: 45000,
          grossMargin: 88,
          marketingBudget: 15000,
          cac: 180,
          averageOrderValue: 89,
          churnRate: 6,
          operatingExpenses: 8000,
          employeeCosts: 25000
        },
        assumptions: {
          growthRate: 18,
          industryBenchmarks: { ltv: 1480, paybackPeriod: 10 }
        }
      },
      {
        id: 'productivity-tool',
        name: 'Productivity Tool',
        description: 'Individual or team productivity software',
        defaultInputs: {
          monthlyRevenue: 25000,
          grossMargin: 92,
          marketingBudget: 8000,
          cac: 45,
          averageOrderValue: 19,
          churnRate: 8,
          operatingExpenses: 5000,
          employeeCosts: 15000
        },
        assumptions: {
          growthRate: 25,
          industryBenchmarks: { viralCoefficient: 0.3, freemiumConversion: 4 }
        }
      },
      {
        id: 'vertical-saas',
        name: 'Vertical SaaS',
        description: 'Industry-specific software solution',
        defaultInputs: {
          monthlyRevenue: 85000,
          grossMargin: 82,
          marketingBudget: 28000,
          cac: 850,
          averageOrderValue: 450,
          churnRate: 4,
          operatingExpenses: 15000,
          employeeCosts: 45000
        },
        assumptions: {
          growthRate: 15,
          industryBenchmarks: { marketPenetration: 8, customizationCost: 12 }
        }
      },
      {
        id: 'api-service',
        name: 'API-First Service',
        description: 'Developer-focused API with usage-based pricing',
        defaultInputs: {
          monthlyRevenue: 35000,
          grossMargin: 90,
          marketingBudget: 12000,
          cac: 120,
          averageOrderValue: 250,
          churnRate: 5,
          operatingExpenses: 8000,
          employeeCosts: 22000
        },
        assumptions: {
          growthRate: 22,
          industryBenchmarks: { apiCalls: 5000000, uptime: 99.9 }
        }
      },
      {
        id: 'crm-software',
        name: 'CRM Software',
        description: 'Customer relationship management platform',
        defaultInputs: {
          monthlyRevenue: 95000,
          grossMargin: 86,
          marketingBudget: 32000,
          cac: 380,
          averageOrderValue: 125,
          churnRate: 5,
          operatingExpenses: 18000,
          employeeCosts: 55000
        },
        assumptions: {
          growthRate: 16,
          industryBenchmarks: { integrations: 150, dataStorage: 500 }
        }
      },
      {
        id: 'analytics-platform',
        name: 'Analytics Platform',
        description: 'Data analytics and business intelligence tool',
        defaultInputs: {
          monthlyRevenue: 75000,
          grossMargin: 88,
          marketingBudget: 25000,
          cac: 450,
          averageOrderValue: 299,
          churnRate: 4,
          operatingExpenses: 15000,
          employeeCosts: 45000
        },
        assumptions: {
          growthRate: 14,
          industryBenchmarks: { dataProcessing: 10000000, reportGeneration: 50000 }
        }
      }
    ]
  },
  {
    id: 'agency',
    name: 'Agency & Consulting',
    description: 'Service-based businesses providing expertise and solutions',
    icon: '🤝',
    category: 'Services',
    scenarios: [
      {
        id: 'digital-marketing',
        name: 'Digital Marketing Agency',
        description: 'Full-service digital marketing and advertising',
        defaultInputs: {
          monthlyRevenue: 85000,
          grossMargin: 65,
          marketingBudget: 8000,
          cac: 450,
          averageOrderValue: 5500,
          operatingExpenses: 15000,
          employeeCosts: 45000
        },
        assumptions: {
          growthRate: 12,
          industryBenchmarks: { clientRetention: 85, projectMargin: 35 }
        }
      },
      {
        id: 'web-development',
        name: 'Web Development Agency',
        description: 'Custom website and web application development',
        defaultInputs: {
          monthlyRevenue: 65000,
          grossMargin: 70,
          marketingBudget: 5000,
          cac: 380,
          averageOrderValue: 8500,
          operatingExpenses: 12000,
          employeeCosts: 35000
        },
        assumptions: {
          growthRate: 15,
          industryBenchmarks: { projectDuration: 8, revisionRounds: 3 }
        }
      },
      {
        id: 'management-consulting',
        name: 'Management Consulting',
        description: 'Strategic business consulting and advisory services',
        defaultInputs: {
          monthlyRevenue: 125000,
          grossMargin: 75,
          marketingBudget: 12000,
          cac: 2200,
          averageOrderValue: 25000,
          operatingExpenses: 20000,
          employeeCosts: 75000
        },
        assumptions: {
          growthRate: 8,
          industryBenchmarks: { utilizationRate: 75, hourlyRate: 250 }
        }
      },
      {
        id: 'creative-agency',
        name: 'Creative Agency',
        description: 'Brand design, advertising, and creative services',
        defaultInputs: {
          monthlyRevenue: 75000,
          grossMargin: 68,
          marketingBudget: 8000,
          cac: 520,
          averageOrderValue: 6800,
          operatingExpenses: 18000,
          employeeCosts: 40000
        },
        assumptions: {
          growthRate: 10,
          industryBenchmarks: { portfolioPieces: 250, awardSubmissions: 12 }
        }
      },
      {
        id: 'seo-agency',
        name: 'SEO Agency',
        description: 'Search engine optimization and content marketing',
        defaultInputs: {
          monthlyRevenue: 45000,
          grossMargin: 78,
          marketingBudget: 6000,
          cac: 280,
          averageOrderValue: 2800,
          operatingExpenses: 8000,
          employeeCosts: 25000
        },
        assumptions: {
          growthRate: 18,
          industryBenchmarks: { keywordRankings: 500, organicTraffic: 150 }
        }
      },
      {
        id: 'pr-agency',
        name: 'PR Agency',
        description: 'Public relations and communications services',
        defaultInputs: {
          monthlyRevenue: 55000,
          grossMargin: 72,
          marketingBudget: 7000,
          cac: 650,
          averageOrderValue: 4500,
          operatingExpenses: 12000,
          employeeCosts: 32000
        },
        assumptions: {
          growthRate: 9,
          industryBenchmarks: { mediaContacts: 800, pressReleases: 24 }
        }
      },
      {
        id: 'accounting-firm',
        name: 'Accounting Firm',
        description: 'Financial accounting and tax preparation services',
        defaultInputs: {
          monthlyRevenue: 95000,
          grossMargin: 68,
          marketingBudget: 8000,
          cac: 420,
          averageOrderValue: 3200,
          operatingExpenses: 18000,
          employeeCosts: 55000
        },
        assumptions: {
          growthRate: 6,
          seasonality: { jan: 1.8, feb: 2.1, mar: 2.3, apr: 1.9 },
          industryBenchmarks: { clientRetention: 92, complianceRate: 99.8 }
        }
      }
    ]
  },
  {
    id: 'freelancer',
    name: 'Freelancer',
    description: 'Independent professionals offering specialized services',
    icon: '👤',
    category: 'Individual',
    scenarios: [
      {
        id: 'graphic-designer',
        name: 'Graphic Designer',
        description: 'Visual design and branding services',
        defaultInputs: {
          monthlyRevenue: 8500,
          grossMargin: 85,
          marketingBudget: 800,
          cac: 150,
          averageOrderValue: 850,
          operatingExpenses: 1200,
          employeeCosts: 0
        },
        assumptions: {
          growthRate: 15,
          industryBenchmarks: { hourlyRate: 65, projectsPerMonth: 10 }
        }
      },
      {
        id: 'web-developer',
        name: 'Web Developer',
        description: 'Website and application development',
        defaultInputs: {
          monthlyRevenue: 12000,
          grossMargin: 88,
          marketingBudget: 1000,
          cac: 200,
          averageOrderValue: 2400,
          operatingExpenses: 800,
          employeeCosts: 0
        },
        assumptions: {
          growthRate: 18,
          industryBenchmarks: { hourlyRate: 85, projectsPerMonth: 5 }
        }
      },
      {
        id: 'copywriter',
        name: 'Copywriter',
        description: 'Content writing and marketing copy services',
        defaultInputs: {
          monthlyRevenue: 7500,
          grossMargin: 90,
          marketingBudget: 600,
          cac: 120,
          averageOrderValue: 650,
          operatingExpenses: 500,
          employeeCosts: 0
        },
        assumptions: {
          growthRate: 20,
          industryBenchmarks: { wordsPerHour: 500, hourlyRate: 55 }
        }
      },
      {
        id: 'consultant',
        name: 'Business Consultant',
        description: 'Strategic business advice and consulting',
        defaultInputs: {
          monthlyRevenue: 15000,
          grossMargin: 82,
          marketingBudget: 1500,
          cac: 450,
          averageOrderValue: 3500,
          operatingExpenses: 2000,
          employeeCosts: 0
        },
        assumptions: {
          growthRate: 12,
          industryBenchmarks: { hourlyRate: 150, utilizationRate: 70 }
        }
      },
      {
        id: 'photographer',
        name: 'Photographer',
        description: 'Professional photography services',
        defaultInputs: {
          monthlyRevenue: 9500,
          grossMargin: 75,
          marketingBudget: 1200,
          cac: 180,
          averageOrderValue: 950,
          operatingExpenses: 2500,
          employeeCosts: 0
        },
        assumptions: {
          growthRate: 10,
          seasonality: { may: 1.4, jun: 1.6, jul: 1.3, sep: 1.5, oct: 1.4 },
          industryBenchmarks: { shootsPerMonth: 10, editingHours: 40 }
        }
      },
      {
        id: 'video-editor',
        name: 'Video Editor',
        description: 'Video editing and post-production services',
        defaultInputs: {
          monthlyRevenue: 8800,
          grossMargin: 80,
          marketingBudget: 900,
          cac: 160,
          averageOrderValue: 1200,
          operatingExpenses: 1800,
          employeeCosts: 0
        },
        assumptions: {
          growthRate: 22,
          industryBenchmarks: { hoursPerProject: 15, projectsPerMonth: 7 }
        }
      },
      {
        id: 'translator',
        name: 'Translator',
        description: 'Language translation and localization services',
        defaultInputs: {
          monthlyRevenue: 6500,
          grossMargin: 92,
          marketingBudget: 400,
          cac: 100,
          averageOrderValue: 450,
          operatingExpenses: 600,
          employeeCosts: 0
        },
        assumptions: {
          growthRate: 14,
          industryBenchmarks: { wordsPerHour: 300, perWordRate: 0.12 }
        }
      }
    ]
  },
  {
    id: 'restaurant',
    name: 'Restaurant & Food',
    description: 'Food service businesses and culinary ventures',
    icon: '🍽️',
    category: 'Food & Beverage',
    scenarios: [
      {
        id: 'quick-service',
        name: 'Quick Service Restaurant',
        description: 'Fast food or quick casual dining establishment',
        defaultInputs: {
          monthlyRevenue: 45000,
          grossMargin: 65,
          marketingBudget: 3500,
          cac: 8,
          averageOrderValue: 12,
          operatingExpenses: 18000,
          employeeCosts: 15000
        },
        assumptions: {
          growthRate: 8,
          seasonality: { jun: 1.2, jul: 1.3, aug: 1.2, dec: 1.1 },
          industryBenchmarks: { tablesTurns: 4, laborCostPercent: 30 }
        }
      },
      {
        id: 'fine-dining',
        name: 'Fine Dining Restaurant',
        description: 'Upscale restaurant with premium service and cuisine',
        defaultInputs: {
          monthlyRevenue: 85000,
          grossMargin: 58,
          marketingBudget: 6000,
          cac: 25,
          averageOrderValue: 85,
          operatingExpenses: 35000,
          employeeCosts: 28000
        },
        assumptions: {
          growthRate: 5,
          industryBenchmarks: { reservationRate: 75, wineMarkup: 300 }
        }
      },
      {
        id: 'food-truck',
        name: 'Food Truck',
        description: 'Mobile food service with lower overhead costs',
        defaultInputs: {
          monthlyRevenue: 18000,
          grossMargin: 70,
          marketingBudget: 1200,
          cac: 5,
          averageOrderValue: 9,
          operatingExpenses: 5000,
          employeeCosts: 4000
        },
        assumptions: {
          growthRate: 15,
          industryBenchmarks: { locationsPerWeek: 5, permitCosts: 800 }
        }
      },
      {
        id: 'catering',
        name: 'Catering Service',
        description: 'Event-based food service and catering',
        defaultInputs: {
          monthlyRevenue: 35000,
          grossMargin: 62,
          marketingBudget: 3000,
          cac: 180,
          averageOrderValue: 1200,
          operatingExpenses: 8000,
          employeeCosts: 12000
        },
        assumptions: {
          growthRate: 12,
          seasonality: { may: 1.4, jun: 1.8, jul: 1.3, sep: 1.5, oct: 1.6, nov: 1.2, dec: 1.4 },
          industryBenchmarks: { eventsPerMonth: 25, staffPerEvent: 3 }
        }
      },
      {
        id: 'coffee-shop',
        name: 'Coffee Shop',
        description: 'Specialty coffee and light food service',
        defaultInputs: {
          monthlyRevenue: 28000,
          grossMargin: 68,
          marketingBudget: 2000,
          cac: 6,
          averageOrderValue: 7.5,
          operatingExpenses: 12000,
          employeeCosts: 8000
        },
        assumptions: {
          growthRate: 10,
          industryBenchmarks: { customersPerDay: 150, peakHours: 4 }
        }
      },
      {
        id: 'meal-prep',
        name: 'Meal Prep Service',
        description: 'Prepared meal delivery for health-conscious consumers',
        defaultInputs: {
          monthlyRevenue: 25000,
          grossMargin: 55,
          marketingBudget: 4500,
          cac: 45,
          averageOrderValue: 65,
          churnRate: 15,
          operatingExpenses: 8000,
          employeeCosts: 6000
        },
        assumptions: {
          growthRate: 18,
          industryBenchmarks: { deliveryRadius: 25, mealsPerWeek: 400 }
        }
      },
      {
        id: 'bakery',
        name: 'Artisan Bakery',
        description: 'Specialty baked goods and custom orders',
        defaultInputs: {
          monthlyRevenue: 22000,
          grossMargin: 72,
          marketingBudget: 1800,
          cac: 12,
          averageOrderValue: 15,
          operatingExpenses: 8000,
          employeeCosts: 7000
        },
        assumptions: {
          growthRate: 8,
          seasonality: { feb: 1.3, mar: 1.1, nov: 1.2, dec: 1.6 },
          industryBenchmarks: { dailyProduction: 200, wastageRate: 8 }
        }
      }
    ]
  },
  // Adding more business types to reach 35+
  {
    id: 'healthcare',
    name: 'Healthcare Services',
    description: 'Medical and wellness service providers',
    icon: '🏥',
    category: 'Healthcare',
    scenarios: [
      {
        id: 'private-practice',
        name: 'Private Medical Practice',
        description: 'Independent medical practice with multiple physicians',
        defaultInputs: {
          monthlyRevenue: 125000,
          grossMargin: 68,
          marketingBudget: 8000,
          cac: 180,
          averageOrderValue: 285,
          operatingExpenses: 45000,
          employeeCosts: 65000
        },
        assumptions: {
          growthRate: 6,
          industryBenchmarks: { patientRetention: 88, appointmentsPerDay: 35 }
        }
      },
      {
        id: 'dental-clinic',
        name: 'Dental Clinic',
        description: 'General and specialized dental services',
        defaultInputs: {
          monthlyRevenue: 85000,
          grossMargin: 72,
          marketingBudget: 6000,
          cac: 120,
          averageOrderValue: 220,
          operatingExpenses: 28000,
          employeeCosts: 42000
        },
        assumptions: {
          growthRate: 8,
          industryBenchmarks: { appointmentsPerDay: 25, cleaningFrequency: 6 }
        }
      },
      {
        id: 'physical-therapy',
        name: 'Physical Therapy Clinic',
        description: 'Rehabilitation and physical therapy services',
        defaultInputs: {
          monthlyRevenue: 55000,
          grossMargin: 75,
          marketingBudget: 4000,
          cac: 95,
          averageOrderValue: 125,
          operatingExpenses: 18000,
          employeeCosts: 28000
        },
        assumptions: {
          growthRate: 10,
          industryBenchmarks: { sessionsPerPatient: 12, recoveryRate: 85 }
        }
      },
      {
        id: 'telehealth',
        name: 'Telehealth Platform',
        description: 'Remote healthcare consultation services',
        defaultInputs: {
          monthlyRevenue: 35000,
          grossMargin: 82,
          marketingBudget: 8000,
          cac: 65,
          averageOrderValue: 89,
          churnRate: 12,
          operatingExpenses: 8000,
          employeeCosts: 18000
        },
        assumptions: {
          growthRate: 25,
          industryBenchmarks: { consultationsPerDay: 45, satisfactionScore: 4.6 }
        }
      },
      {
        id: 'wellness-center',
        name: 'Wellness Center',
        description: 'Holistic health and wellness services',
        defaultInputs: {
          monthlyRevenue: 42000,
          grossMargin: 78,
          marketingBudget: 5000,
          cac: 85,
          averageOrderValue: 165,
          operatingExpenses: 15000,
          employeeCosts: 22000
        },
        assumptions: {
          growthRate: 12,
          industryBenchmarks: { memberRetention: 78, classesPerWeek: 35 }
        }
      },
      {
        id: 'mental-health',
        name: 'Mental Health Practice',
        description: 'Psychology and counseling services',
        defaultInputs: {
          monthlyRevenue: 38000,
          grossMargin: 85,
          marketingBudget: 3500,
          cac: 150,
          averageOrderValue: 135,
          operatingExpenses: 8000,
          employeeCosts: 22000
        },
        assumptions: {
          growthRate: 15,
          industryBenchmarks: { sessionsPerWeek: 40, treatmentSuccess: 82 }
        }
      },
      {
        id: 'veterinary',
        name: 'Veterinary Clinic',
        description: 'Animal healthcare and veterinary services',
        defaultInputs: {
          monthlyRevenue: 68000,
          grossMargin: 65,
          marketingBudget: 5500,
          cac: 95,
          averageOrderValue: 185,
          operatingExpenses: 22000,
          employeeCosts: 32000
        },
        assumptions: {
          growthRate: 9,
          industryBenchmarks: { patientsPerDay: 28, emergencyRate: 15 }
        }
      }
    ]
  },
  {
    id: 'education',
    name: 'Education & Training',
    description: 'Educational institutions and training providers',
    icon: '🎓',
    category: 'Education',
    scenarios: [
      {
        id: 'online-course',
        name: 'Online Course Platform',
        description: 'Digital learning platform with course subscriptions',
        defaultInputs: {
          monthlyRevenue: 45000,
          grossMargin: 88,
          marketingBudget: 12000,
          cac: 85,
          averageOrderValue: 297,
          churnRate: 18,
          operatingExpenses: 8000,
          employeeCosts: 25000
        },
        assumptions: {
          growthRate: 22,
          seasonality: { jan: 1.4, sep: 1.3, oct: 1.2 },
          industryBenchmarks: { completionRate: 68, certificateRate: 45 }
        }
      },
      {
        id: 'tutoring-service',
        name: 'Private Tutoring Service',
        description: 'One-on-one and group tutoring services',
        defaultInputs: {
          monthlyRevenue: 28000,
          grossMargin: 82,
          marketingBudget: 3500,
          cac: 125,
          averageOrderValue: 480,
          operatingExpenses: 6000,
          employeeCosts: 18000
        },
        assumptions: {
          growthRate: 15,
          seasonality: { sep: 1.5, oct: 1.3, jan: 1.2, may: 0.7, jun: 0.6, jul: 0.5, aug: 0.8 },
          industryBenchmarks: { gradeImprovement: 85, studentRetention: 78 }
        }
      },
      {
        id: 'language-school',
        name: 'Language School',
        description: 'Foreign language instruction and certification',
        defaultInputs: {
          monthlyRevenue: 35000,
          grossMargin: 75,
          marketingBudget: 5000,
          cac: 180,
          averageOrderValue: 850,
          churnRate: 15,
          operatingExpenses: 12000,
          employeeCosts: 20000
        },
        assumptions: {
          growthRate: 12,
          industryBenchmarks: { fluencyRate: 72, classSize: 8 }
        }
      },
      {
        id: 'coding-bootcamp',
        name: 'Coding Bootcamp',
        description: 'Intensive programming and tech skills training',
        defaultInputs: {
          monthlyRevenue: 85000,
          grossMargin: 78,
          marketingBudget: 18000,
          cac: 450,
          averageOrderValue: 12500,
          operatingExpenses: 22000,
          employeeCosts: 45000
        },
        assumptions: {
          growthRate: 18,
          industryBenchmarks: { jobPlacementRate: 82, salaryIncrease: 65 }
        }
      },
      {
        id: 'daycare-center',
        name: 'Daycare Center',
        description: 'Childcare and early childhood education',
        defaultInputs: {
          monthlyRevenue: 55000,
          grossMargin: 68,
          marketingBudget: 3000,
          cac: 250,
          averageOrderValue: 1200,
          operatingExpenses: 25000,
          employeeCosts: 28000
        },
        assumptions: {
          growthRate: 8,
          industryBenchmarks: { childToStaffRatio: 4, waitingList: 25 }
        }
      },
      {
        id: 'music-school',
        name: 'Music School',
        description: 'Music lessons and performance training',
        defaultInputs: {
          monthlyRevenue: 32000,
          grossMargin: 82,
          marketingBudget: 3500,
          cac: 165,
          averageOrderValue: 320,
          operatingExpenses: 12000,
          employeeCosts: 18000
        },
        assumptions: {
          growthRate: 10,
          seasonality: { sep: 1.3, oct: 1.2, dec: 0.8, jan: 1.1 },
          industryBenchmarks: { recitalParticipation: 75, studentRetention: 68 }
        }
      },
      {
        id: 'driving-school',
        name: 'Driving School',
        description: 'Driver education and training services',
        defaultInputs: {
          monthlyRevenue: 25000,
          grossMargin: 72,
          marketingBudget: 2500,
          cac: 85,
          averageOrderValue: 650,
          operatingExpenses: 8000,
          employeeCosts: 12000
        },
        assumptions: {
          growthRate: 6,
          seasonality: { mar: 1.2, apr: 1.3, may: 1.4, jun: 1.5, jul: 1.3 },
          industryBenchmarks: { passRate: 78, lessonsPerStudent: 12 }
        }
      }
    ]
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    description: 'Production and manufacturing businesses',
    icon: '🏭',
    category: 'Manufacturing',
    scenarios: [
      {
        id: 'custom-manufacturing',
        name: 'Custom Manufacturing',
        description: 'Made-to-order manufacturing services',
        defaultInputs: {
          monthlyRevenue: 185000,
          grossMargin: 35,
          marketingBudget: 12000,
          cac: 850,
          averageOrderValue: 8500,
          operatingExpenses: 55000,
          employeeCosts: 85000
        },
        assumptions: {
          growthRate: 8,
          industryBenchmarks: { leadTime: 21, qualityRate: 98.5 }
        }
      },
      {
        id: 'food-manufacturing',
        name: 'Food Manufacturing',
        description: 'Food processing and packaging operations',
        defaultInputs: {
          monthlyRevenue: 225000,
          grossMargin: 28,
          marketingBudget: 15000,
          cac: 420,
          averageOrderValue: 2800,
          operatingExpenses: 85000,
          employeeCosts: 95000
        },
        assumptions: {
          growthRate: 6,
          industryBenchmarks: { shelfLife: 180, complianceScore: 99.2 }
        }
      },
      {
        id: 'textile-manufacturing',
        name: 'Textile Manufacturing',
        description: 'Fabric and garment production',
        defaultInputs: {
          monthlyRevenue: 165000,
          grossMargin: 32,
          marketingBudget: 8000,
          cac: 380,
          averageOrderValue: 1850,
          operatingExpenses: 65000,
          employeeCosts: 75000
        },
        assumptions: {
          growthRate: 7,
          seasonality: { aug: 1.3, sep: 1.4, oct: 1.2, feb: 1.1 },
          industryBenchmarks: { productionEfficiency: 85, wasteReduction: 12 }
        }
      },
      {
        id: 'electronics-manufacturing',
        name: 'Electronics Manufacturing',
        description: 'Electronic components and device assembly',
        defaultInputs: {
          monthlyRevenue: 285000,
          grossMargin: 25,
          marketingBudget: 18000,
          cac: 950,
          averageOrderValue: 12500,
          operatingExpenses: 95000,
          employeeCosts: 125000
        },
        assumptions: {
          growthRate: 10,
          industryBenchmarks: { defectRate: 0.5, cycleTime: 14 }
        }
      },
      {
        id: 'packaging-manufacturing',
        name: 'Packaging Manufacturing',
        description: 'Custom packaging and container production',
        defaultInputs: {
          monthlyRevenue: 145000,
          grossMargin: 38,
          marketingBudget: 8500,
          cac: 520,
          averageOrderValue: 3200,
          operatingExpenses: 45000,
          employeeCosts: 65000
        },
        assumptions: {
          growthRate: 9,
          industryBenchmarks: { sustainabilityScore: 78, customizationRate: 65 }
        }
      },
      {
        id: 'automotive-parts',
        name: 'Automotive Parts Manufacturing',
        description: 'Vehicle components and parts production',
        defaultInputs: {
          monthlyRevenue: 385000,
          grossMargin: 22,
          marketingBudget: 22000,
          cac: 1250,
          averageOrderValue: 18500,
          operatingExpenses: 125000,
          employeeCosts: 185000
        },
        assumptions: {
          growthRate: 5,
          industryBenchmarks: { certificationLevel: 95, supplierRating: 4.7 }
        }
      },
      {
        id: 'furniture-manufacturing',
        name: 'Furniture Manufacturing',
        description: 'Custom and mass-produced furniture',
        defaultInputs: {
          monthlyRevenue: 125000,
          grossMargin: 42,
          marketingBudget: 8000,
          cac: 285,
          averageOrderValue: 2850,
          operatingExpenses: 35000,
          employeeCosts: 55000
        },
        assumptions: {
          growthRate: 8,
          seasonality: { mar: 1.2, apr: 1.3, may: 1.2, oct: 1.1, nov: 1.2 },
          industryBenchmarks: { craftQuality: 92, deliveryTime: 28 }
        }
      }
    ]
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    description: 'Property development, management, and services',
    icon: '🏠',
    category: 'Real Estate',
    scenarios: [
      {
        id: 'property-management',
        name: 'Property Management',
        description: 'Residential and commercial property management services',
        defaultInputs: {
          monthlyRevenue: 85000,
          grossMargin: 78,
          marketingBudget: 6000,
          cac: 320,
          averageOrderValue: 2200,
          operatingExpenses: 18000,
          employeeCosts: 42000
        },
        assumptions: {
          growthRate: 10,
          industryBenchmarks: { occupancyRate: 94, tenantRetention: 82 }
        }
      },
      {
        id: 'real-estate-agency',
        name: 'Real Estate Agency',
        description: 'Residential and commercial real estate sales',
        defaultInputs: {
          monthlyRevenue: 125000,
          grossMargin: 85,
          marketingBudget: 15000,
          cac: 850,
          averageOrderValue: 18500,
          operatingExpenses: 25000,
          employeeCosts: 75000
        },
        assumptions: {
          growthRate: 6,
          seasonality: { mar: 1.3, apr: 1.4, may: 1.5, jun: 1.3, jul: 1.2, aug: 1.1, sep: 1.2 },
          industryBenchmarks: { closingRate: 68, daysOnMarket: 45 }
        }
      },
      {
        id: 'property-development',
        name: 'Property Development',
        description: 'Real estate development and construction projects',
        defaultInputs: {
          monthlyRevenue: 485000,
          grossMargin: 25,
          marketingBudget: 35000,
          cac: 2850,
          averageOrderValue: 185000,
          operatingExpenses: 125000,
          employeeCosts: 185000
        },
        assumptions: {
          growthRate: 4,
          industryBenchmarks: { projectCompletion: 88, profitMargin: 18 }
        }
      },
      {
        id: 'commercial-leasing',
        name: 'Commercial Leasing',
        description: 'Commercial property leasing and brokerage',
        defaultInputs: {
          monthlyRevenue: 95000,
          grossMargin: 82,
          marketingBudget: 8500,
          cac: 650,
          averageOrderValue: 8500,
          operatingExpenses: 22000,
          employeeCosts: 55000
        },
        assumptions: {
          growthRate: 8,
          industryBenchmarks: { leaseRenewal: 75, vacancyRate: 8 }
        }
      },
      {
        id: 'property-inspection',
        name: 'Property Inspection Services',
        description: 'Home and commercial property inspection',
        defaultInputs: {
          monthlyRevenue: 32000,
          grossMargin: 88,
          marketingBudget: 3500,
          cac: 125,
          averageOrderValue: 485,
          operatingExpenses: 8000,
          employeeCosts: 18000
        },
        assumptions: {
          growthRate: 12,
          seasonality: { mar: 1.3, apr: 1.4, may: 1.5, jun: 1.3, jul: 1.2, aug: 1.1, sep: 1.2 },
          industryBenchmarks: { inspectionsPerDay: 4, reportTurnaround: 24 }
        }
      },
      {
        id: 'property-flipping',
        name: 'Property Flipping',
        description: 'Buy, renovate, and resell residential properties',
        defaultInputs: {
          monthlyRevenue: 185000,
          grossMargin: 35,
          marketingBudget: 12000,
          cac: 850,
          averageOrderValue: 85000,
          operatingExpenses: 45000,
          employeeCosts: 65000
        },
        assumptions: {
          growthRate: 15,
          industryBenchmarks: { renovationTime: 90, saleSpeed: 60 }
        }
      },
      {
        id: 'vacation-rental',
        name: 'Vacation Rental Management',
        description: 'Short-term rental property management',
        defaultInputs: {
          monthlyRevenue: 45000,
          grossMargin: 72,
          marketingBudget: 6500,
          cac: 85,
          averageOrderValue: 385,
          operatingExpenses: 12000,
          employeeCosts: 18000
        },
        assumptions: {
          growthRate: 18,
          seasonality: { jun: 1.8, jul: 2.1, aug: 1.9, dec: 1.3, jan: 0.7, feb: 0.8 },
          industryBenchmarks: { occupancyRate: 75, guestRating: 4.6 }
        }
      }
    ]
  },
  // Continue adding more business types...
  {
    id: 'fitness',
    name: 'Fitness & Wellness',
    description: 'Fitness centers, gyms, and wellness businesses',
    icon: '💪',
    category: 'Healthcare',
    scenarios: [
      {
        id: 'gym-membership',
        name: 'Fitness Gym',
        description: 'Traditional gym with membership model',
        defaultInputs: {
          monthlyRevenue: 65000,
          grossMargin: 75,
          marketingBudget: 8000,
          cac: 85,
          averageOrderValue: 89,
          churnRate: 18,
          operatingExpenses: 25000,
          employeeCosts: 28000
        },
        assumptions: {
          growthRate: 10,
          seasonality: { jan: 1.8, feb: 1.4, mar: 1.2, jun: 0.9, jul: 0.8, aug: 0.9 },
          industryBenchmarks: { memberRetention: 78, utilizationRate: 65 }
        }
      },
      {
        id: 'personal-training',
        name: 'Personal Training Studio',
        description: 'One-on-one and small group fitness training',
        defaultInputs: {
          monthlyRevenue: 28000,
          grossMargin: 82,
          marketingBudget: 3500,
          cac: 125,
          averageOrderValue: 320,
          operatingExpenses: 8000,
          employeeCosts: 15000
        },
        assumptions: {
          growthRate: 15,
          industryBenchmarks: { clientRetention: 85, sessionsPerWeek: 48 }
        }
      },
      {
        id: 'yoga-studio',
        name: 'Yoga Studio',
        description: 'Yoga classes and wellness programs',
        defaultInputs: {
          monthlyRevenue: 22000,
          grossMargin: 78,
          marketingBudget: 2500,
          cac: 65,
          averageOrderValue: 125,
          churnRate: 22,
          operatingExpenses: 8000,
          employeeCosts: 12000
        },
        assumptions: {
          growthRate: 12,
          industryBenchmarks: { classCapacity: 20, memberSatisfaction: 4.5 }
        }
      },
      {
        id: 'crossfit-box',
        name: 'CrossFit Box',
        description: 'CrossFit training facility and community',
        defaultInputs: {
          monthlyRevenue: 35000,
          grossMargin: 72,
          marketingBudget: 4000,
          cac: 95,
          averageOrderValue: 185,
          churnRate: 15,
          operatingExpenses: 12000,
          employeeCosts: 18000
        },
        assumptions: {
          growthRate: 14,
          industryBenchmarks: { memberCommitment: 88, competitionRate: 25 }
        }
      },
      {
        id: 'pilates-studio',
        name: 'Pilates Studio',
        description: 'Pilates classes and rehabilitation services',
        defaultInputs: {
          monthlyRevenue: 25000,
          grossMargin: 80,
          marketingBudget: 2800,
          cac: 75,
          averageOrderValue: 145,
          churnRate: 18,
          operatingExpenses: 7000,
          employeeCosts: 14000
        },
        assumptions: {
          growthRate: 11,
          industryBenchmarks: { injuryPrevention: 92, flexibilityImprovement: 78 }
        }
      },
      {
        id: 'martial-arts',
        name: 'Martial Arts School',
        description: 'Martial arts training and self-defense classes',
        defaultInputs: {
          monthlyRevenue: 32000,
          grossMargin: 75,
          marketingBudget: 3500,
          cac: 125,
          averageOrderValue: 165,
          churnRate: 20,
          operatingExpenses: 10000,
          employeeCosts: 16000
        },
        assumptions: {
          growthRate: 9,
          industryBenchmarks: { beltProgression: 85, tournamentParticipation: 35 }
        }
      },
      {
        id: 'dance-studio',
        name: 'Dance Studio',
        description: 'Dance classes and performance training',
        defaultInputs: {
          monthlyRevenue: 28000,
          grossMargin: 78,
          marketingBudget: 3200,
          cac: 85,
          averageOrderValue: 135,
          churnRate: 25,
          operatingExpenses: 9000,
          employeeCosts: 15000
        },
        assumptions: {
          growthRate: 8,
          seasonality: { sep: 1.4, oct: 1.2, dec: 1.3, may: 0.8, jun: 0.7, jul: 0.6 },
          industryBenchmarks: { recitalParticipation: 80, skillProgression: 75 }
        }
      }
    ]
  }
];

export const businessCategories = [
  'Startup',
  'Software',
  'Retail',
  'Services', 
  'Individual',
  'Food & Beverage',
  'Healthcare',
  'Education',
  'Manufacturing',
  'Real Estate'
];

export function getBusinessTypeById(id: string): BusinessType | undefined {
  return businessTypes.find(type => type.id === id);
}

export function getScenarioById(businessTypeId: string, scenarioId: string): BusinessScenario | undefined {
  const businessType = getBusinessTypeById(businessTypeId);
  return businessType?.scenarios.find(scenario => scenario.id === scenarioId);
}