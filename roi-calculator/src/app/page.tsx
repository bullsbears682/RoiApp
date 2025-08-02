import { Suspense } from 'react';
import { ROICalculatorForm } from '@/components/roi-calculator-form';
import { BusinessTypeSelector } from '@/components/business-type-selector';
import { CountrySelector } from '@/components/country-selector';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Calculate Your Business ROI
              <span className="text-primary"> with Precision</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get detailed ROI analysis with country-specific tax calculations, industry benchmarks, 
              and actionable insights for 35+ business types across 25+ countries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#calculator" 
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Start Calculating
              </a>
              <a 
                href="#scenarios" 
                className="inline-flex items-center justify-center px-8 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground font-medium rounded-lg transition-colors"
              >
                Browse Scenarios
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Everything You Need for Accurate ROI Analysis
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our calculator goes beyond basic ROI calculations to provide comprehensive business insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🌍</span>
                </div>
                <CardTitle className="text-xl">Global Tax Compliance</CardTitle>
                <CardDescription>
                  Accurate tax calculations for 25+ countries with real-time 2025 tax rates and regulations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🏢</span>
                </div>
                <CardTitle className="text-xl">35+ Business Types</CardTitle>
                <CardDescription>
                  From startups to enterprises, with 7 detailed scenarios each based on real market data.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <CardTitle className="text-xl">Interactive Charts</CardTitle>
                <CardDescription>
                  Visual projections, cost breakdowns, and industry comparisons with exportable reports.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <CardTitle className="text-xl">Real-time Validation</CardTitle>
                <CardDescription>
                  Smart validation with warnings and suggestions to optimize your business metrics.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <CardTitle className="text-xl">Actionable Insights</CardTitle>
                <CardDescription>
                  Get personalized recommendations to improve profitability and reduce risks.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <CardTitle className="text-xl">Mobile Responsive</CardTitle>
                <CardDescription>
                  Calculate ROI anywhere with our fully responsive design and offline capabilities.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              ROI Calculator
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select your business type and country to get started with accurate ROI calculations.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Suspense fallback={
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="loading-skeleton h-96"></div>
                <div className="loading-skeleton h-96"></div>
              </div>
            }>
              <ROICalculatorForm />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">R</span>
                </div>
                <span className="text-xl font-bold text-foreground">ROI Calculator Pro</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Professional business ROI analysis with global tax compliance and industry-specific insights.
              </p>
              <p className="text-sm text-muted-foreground">
                © 2025 ROI Calculator Pro. All rights reserved.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">ROI Calculator</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Business Scenarios</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Tax Calculations</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">PDF Reports</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
