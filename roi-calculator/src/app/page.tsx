import { Suspense } from 'react';
import { ROICalculatorForm } from '@/components/roi-calculator-form';
import { BusinessTypeSelector } from '@/components/business-type-selector';
import { CountrySelector } from '@/components/country-selector';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorBoundary } from '@/components/error-boundary';

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
              <a href="#calculator" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2">
                Get Started
              </a>
              <a href="#features" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-6 py-2">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Powerful Features</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our ROI calculator is packed with features to give you the most accurate and actionable insights.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Multi-Scenario Analysis</CardTitle>
                <CardDescription>Explore 7 detailed mini-scenarios for each business type.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-5xl mb-4">📈</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle>Country-Specific Taxes</CardTitle>
                <CardDescription>Accurate tax calculations for 25+ countries.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-5xl mb-4">🌍</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle>Interactive Visuals</CardTitle>
                <CardDescription>Understand your data with dynamic charts and graphs.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-5xl mb-4">📊</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle>Detailed Reports</CardTitle>
                <CardDescription>Generate comprehensive PDF reports of your ROI analysis.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-5xl mb-4">📄</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle>User Accounts</CardTitle>
                <CardDescription>Save and manage your calculations securely.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-5xl mb-4">👤</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CardTitle>Admin Dashboard</CardTitle>
                <CardDescription>Monitor usage and manage users with ease.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-5xl mb-4">⚙️</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="calculator" className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">ROI Calculator</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select your business type and country to get started with accurate ROI calculations.
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <ErrorBoundary>
              <Suspense fallback={
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="loading-skeleton h-96"></div>
                  <div className="loading-skeleton h-96"></div>
                </div>
              }>
                <ROICalculatorForm />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-400 mb-4">
            &copy; {new Date().getFullYear()} ROI Calculator Pro. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
