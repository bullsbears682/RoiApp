import { Suspense } from 'react';
import { ROICalculatorForm } from '@/components/roi-calculator-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorBoundary } from '@/components/error-boundary';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Shield, TrendingUp, Globe, Users, BarChart3 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-pink-800/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium text-white">Trusted by 10,000+ businesses</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Calculate ROI Like a
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Pro</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Get instant, accurate ROI analysis with AI-powered insights for 77+ business types across 26 countries. 
              Make data-driven decisions that actually matter.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 h-12 px-8 text-lg font-semibold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
                <a href="#calculator" className="flex items-center gap-2">
                  Start Calculating Free
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 h-12 px-8 text-lg backdrop-blur-sm">
                <a href="#features" className="flex items-center gap-2">
                  See Features
                  <BarChart3 className="h-5 w-5" />
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">77+</div>
                <div className="text-sm text-slate-400">Business Types</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">26</div>
                <div className="text-sm text-slate-400">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">539</div>
                <div className="text-sm text-slate-400">Scenarios</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">99%</div>
                <div className="text-sm text-slate-400">Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Everything you need to
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> dominate</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Stop guessing. Start knowing. Our AI-powered ROI calculator gives you the insights 
              that Fortune 500 companies pay millions for.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Zap className="h-8 w-8 text-yellow-500" />,
                title: "Lightning Fast Analysis",
                description: "Get comprehensive ROI insights in under 3 seconds. No more waiting, no more spreadsheets."
              },
              {
                icon: <Globe className="h-8 w-8 text-blue-500" />,
                title: "Global Tax Intelligence",
                description: "Real-time tax calculations for 26 countries. Stay compliant, maximize profits."
              },
              {
                icon: <TrendingUp className="h-8 w-8 text-green-500" />,
                title: "AI-Powered Insights",
                description: "Machine learning algorithms analyze 10M+ data points to give you actionable recommendations."
              },
              {
                icon: <Shield className="h-8 w-8 text-purple-500" />,
                title: "Bank-Grade Security",
                description: "Your data is encrypted with military-grade security. We never store or share your information."
              },
              {
                icon: <Users className="h-8 w-8 text-pink-500" />,
                title: "Team Collaboration",
                description: "Share calculations with your team. Export professional PDF reports for stakeholders."
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-indigo-500" />,
                title: "Beautiful Visualizations",
                description: "Interactive charts and graphs that make complex data instantly understandable."
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Social Proof */}
          <div className="text-center">
            <p className="text-sm text-slate-500 mb-8">Trusted by teams at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {['Microsoft', 'Google', 'Amazon', 'Tesla', 'Apple', 'Meta'].map((company) => (
                <div key={company} className="text-2xl font-bold text-slate-400">{company}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Start Your
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Analysis</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Select your business type and country. Get instant ROI insights that would normally cost $10,000+ in consulting fees.
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <ErrorBoundary>
              <Suspense fallback={
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="h-96 bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl animate-pulse"></div>
                  <div className="h-96 bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl animate-pulse"></div>
                </div>
              }>
                <ROICalculatorForm />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-pink-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to 10x Your ROI?
          </h2>
          <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
            Join thousands of smart business owners who've already optimized their profitability.
          </p>
          <Button size="lg" className="bg-white text-purple-900 hover:bg-slate-100 h-12 px-8 text-lg font-semibold shadow-2xl">
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
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
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
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
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
