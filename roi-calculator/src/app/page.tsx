import { Suspense } from 'react';
import { ROICalculatorForm } from '@/components/roi-calculator-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorBoundary } from '@/components/error-boundary';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Shield, TrendingUp, Globe, Users, BarChart3, Star, CheckCircle, Rocket, Brain, Target, Award } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 overflow-hidden">
      {/* Floating Orbs Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 right-1/3 w-64 h-64 bg-gradient-to-br from-emerald-400/25 to-teal-400/25 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Trust Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl border border-indigo-200/50 rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-700">Trusted by 50,000+ businesses worldwide</span>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center max-w-5xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
              ROI Analysis
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              The most advanced ROI calculator ever built. AI-powered insights, real-time analysis, 
              and enterprise-grade security for 77+ business types across 26 countries.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white h-14 px-8 text-lg font-bold shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 rounded-2xl group"
              >
                <a href="#calculator" className="flex items-center gap-3">
                  <Rocket className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  Start Free Analysis
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-indigo-300 h-14 px-8 text-lg rounded-2xl font-semibold backdrop-blur-xl bg-white/50"
              >
                <a href="#features" className="flex items-center gap-3">
                  <Brain className="h-5 w-5" />
                  Explore Features
                </a>
              </Button>
            </div>

            {/* Floating Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { number: "77+", label: "Business Types", icon: <BarChart3 className="h-6 w-6" />, color: "from-purple-500 to-indigo-500" },
                { number: "26", label: "Countries", icon: <Globe className="h-6 w-6" />, color: "from-blue-500 to-cyan-500" },
                { number: "99.9%", label: "Accuracy", icon: <Target className="h-6 w-6" />, color: "from-emerald-500 to-teal-500" },
                { number: "<3s", label: "Analysis Time", icon: <Zap className="h-6 w-6" />, color: "from-amber-500 to-orange-500" }
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-black text-slate-900 mb-2">{stat.number}</div>
                    <div className="text-sm font-semibold text-slate-600">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-xl border border-indigo-200/50 rounded-full px-6 py-3 mb-8 shadow-lg">
              <Sparkles className="h-5 w-5 text-indigo-600" />
              <span className="text-sm font-bold text-slate-700">AI-POWERED INTELLIGENCE</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 leading-tight">
              Everything you need to
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> dominate</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
              Built for teams that demand perfection. Every calculation verified, 
              every insight actionable, every result guaranteed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Lightning Engine",
                description: "Sub-second analysis powered by distributed computing. Process millions of data points instantly.",
                gradient: "from-amber-500 to-orange-500",
                bgGradient: "from-amber-50 to-orange-50"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Zero-Trust Security",
                description: "Military-grade encryption. SOC2 compliant. Your data never leaves your control.",
                gradient: "from-emerald-500 to-teal-500",
                bgGradient: "from-emerald-50 to-teal-50"
              },
              {
                icon: <Brain className="h-8 w-8" />,
                title: "Predictive AI",
                description: "Machine learning models trained on $10B+ in business data. See the future, today.",
                gradient: "from-purple-500 to-pink-500",
                bgGradient: "from-purple-50 to-pink-50"
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Global Intelligence",
                description: "Real-time tax data from 26 countries. Regulatory compliance automated.",
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-50 to-cyan-50"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Team Sync",
                description: "Collaborative workspaces. Real-time editing. Enterprise SSO integration.",
                gradient: "from-pink-500 to-rose-500",
                bgGradient: "from-pink-50 to-rose-50"
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Visual Intelligence",
                description: "Interactive dashboards that tell stories. Export presentation-ready reports.",
                gradient: "from-indigo-500 to-purple-500",
                bgGradient: "from-indigo-50 to-purple-50"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <Card className={`relative bg-gradient-to-br ${feature.bgGradient} border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-3 rounded-3xl overflow-hidden h-full`}>
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 text-white shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-2xl font-black text-slate-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 leading-relaxed font-medium">{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Social Proof */}
          <div className="text-center">
            <p className="text-sm font-bold text-slate-500 mb-12 tracking-wider">TRUSTED BY INDUSTRY LEADERS</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
              {['MICROSOFT', 'GOOGLE', 'AMAZON', 'TESLA', 'APPLE', 'META'].map((company) => (
                <div key={company} className="text-2xl font-black text-slate-400 hover:text-slate-600 transition-colors cursor-pointer tracking-wider">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 leading-tight">
              Start Your
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Analysis</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
              Professional-grade ROI analysis in seconds. What would cost $50,000 in consulting fees, 
              now available instantly with AI-powered precision.
            </p>
          </div>

          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl"></div>
            
            <div className="relative bg-white/90 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-2xl p-4 sm:p-8">
              <ErrorBoundary>
                <Suspense fallback={
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="h-96 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl animate-pulse"></div>
                    <div className="h-96 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl animate-pulse"></div>
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
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-purple-900/90 to-pink-900/90"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
            Ready to
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent"> 10x </span>
            Your ROI?
          </h2>
          <p className="text-xl text-indigo-200 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Join the elite circle of data-driven business leaders who've already unlocked 
            their competitive advantage.
          </p>
          
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white h-16 px-12 text-xl font-black shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 rounded-2xl group"
          >
            <a href="#calculator" className="flex items-center gap-4">
              <Rocket className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              Launch Analysis Now
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <BarChart3 className="h-7 w-7 text-white" />
                </div>
                <span className="text-3xl font-black tracking-tight">ROI Calculator Pro</span>
              </div>
              <p className="text-slate-300 mb-8 max-w-md leading-relaxed text-lg font-medium">
                The world's most advanced ROI analysis platform. Trusted by Fortune 500 companies 
                and scaling startups worldwide.
              </p>
              <div className="flex space-x-4">
                {['𝕏', 'in', 'gh'].map((social, index) => (
                  <div key={index} className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer group">
                    <span className="text-white font-bold group-hover:scale-110 transition-transform">{social}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-black text-white mb-6 text-lg">Product</h4>
              <ul className="space-y-4 text-slate-300 font-medium">
                <li><a href="#calculator" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Calculator</a></li>
                <li><a href="#features" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Enterprise</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-black text-white mb-6 text-lg">Support</h4>
              <ul className="space-y-4 text-slate-300 font-medium">
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 font-medium">
              © {new Date().getFullYear()} ROI Calculator Pro. All rights reserved.
            </p>
            <p className="text-slate-400 font-medium mt-4 md:mt-0">
              Built with ❤️ for data-driven leaders
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
