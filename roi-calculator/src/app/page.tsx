import { Suspense } from 'react';
import { ROICalculatorForm } from '@/components/roi-calculator-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorBoundary } from '@/components/error-boundary';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Shield, TrendingUp, Globe, Users, BarChart3, Star, CheckCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-full px-4 py-2 mb-8">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium text-purple-700">Trusted by 50,000+ businesses</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              ROI Calculator
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Professional ROI analysis for 77+ business types across 26 countries. 
              Get instant insights that would cost thousands in consulting fees.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                size="lg" 
                className="bg-purple-600 hover:bg-purple-700 text-white h-12 px-8 text-lg font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 rounded-xl"
              >
                <a href="#calculator" className="flex items-center gap-2">
                  Start Free Analysis
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-slate-300 text-slate-700 hover:bg-slate-50 h-12 px-8 text-lg rounded-xl"
              >
                <a href="#features" className="flex items-center gap-2">
                  See Features
                  <BarChart3 className="h-5 w-5" />
                </a>
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { number: "77+", label: "Business Types", icon: <BarChart3 className="h-5 w-5 text-purple-600" /> },
                { number: "26", label: "Countries", icon: <Globe className="h-5 w-5 text-blue-600" /> },
                { number: "99.9%", label: "Accuracy", icon: <CheckCircle className="h-5 w-5 text-green-600" /> },
                { number: "<3s", label: "Analysis Time", icon: <Zap className="h-5 w-5 text-yellow-600" /> }
              ].map((stat, index) => (
                <Card key={index} className="p-4 text-center hover:shadow-lg transition-shadow duration-300 border-0 bg-white/60 backdrop-blur-sm">
                  <div className="flex items-center justify-center mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Enterprise Grade</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Everything you need to
              <span className="text-purple-600"> succeed</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Built for teams that demand accuracy, speed, and actionable insights. 
              Every calculation verified, every result guaranteed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Zap className="h-8 w-8 text-yellow-600" />,
                title: "Lightning Fast",
                description: "Get comprehensive ROI insights in under 3 seconds. No more waiting, no more spreadsheets.",
                color: "yellow"
              },
              {
                icon: <Shield className="h-8 w-8 text-green-600" />,
                title: "Bank-Grade Security",
                description: "Your data is encrypted with military-grade security. We never store or share your information.",
                color: "green"
              },
              {
                icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
                title: "AI-Powered Insights",
                description: "Machine learning algorithms analyze millions of data points to give you actionable recommendations.",
                color: "purple"
              },
              {
                icon: <Globe className="h-8 w-8 text-blue-600" />,
                title: "Global Coverage",
                description: "Real-time tax calculations for 26 countries. Stay compliant, maximize profits.",
                color: "blue"
              },
              {
                icon: <Users className="h-8 w-8 text-pink-600" />,
                title: "Team Collaboration",
                description: "Share calculations with your team. Export professional PDF reports for stakeholders.",
                color: "pink"
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-indigo-600" />,
                title: "Beautiful Charts",
                description: "Interactive visualizations that make complex data instantly understandable.",
                color: "indigo"
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-md hover:-translate-y-1">
                <div className={`w-16 h-16 bg-${feature.color}-50 rounded-2xl flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>

          {/* Social Proof */}
          <div className="text-center">
            <p className="text-sm text-slate-500 mb-8 font-medium">TRUSTED BY TEAMS AT</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {['Microsoft', 'Google', 'Amazon', 'Tesla', 'Apple', 'Meta'].map((company) => (
                <div key={company} className="text-xl font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Start Your
              <span className="text-purple-600"> Analysis</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Select your business type and country. Get instant ROI insights 
              that would normally cost $10,000+ in consulting fees.
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border-0 p-8">
              <ErrorBoundary>
                <Suspense fallback={
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="h-96 bg-slate-100 rounded-xl animate-pulse"></div>
                    <div className="h-96 bg-slate-100 rounded-xl animate-pulse"></div>
                  </div>
                }>
                  <ROICalculatorForm />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to 10x Your ROI?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of smart business owners who have already optimized their profitability.
          </p>
          
          <Button 
            size="lg" 
            className="bg-white text-purple-600 hover:bg-slate-50 h-12 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
          >
            <a href="#calculator" className="flex items-center gap-2">
              Get Started Now
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">ROI Calculator Pro</span>
              </div>
              <p className="text-slate-400 mb-4 max-w-md leading-relaxed">
                The world's most advanced ROI calculator. Built for businesses that demand accuracy, speed, and actionable insights.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#calculator" className="hover:text-white transition-colors">Calculator</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} ROI Calculator Pro. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
