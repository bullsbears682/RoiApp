import { Suspense } from 'react';
import { ROICalculatorForm } from '@/components/roi-calculator-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorBoundary } from '@/components/error-boundary';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Shield, TrendingUp, Globe, Users, BarChart3, Star, Layers, Cpu, Rocket } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-900/50"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto text-center">
            {/* Floating Badge */}
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mb-8 hover:bg-white/10 transition-all duration-500 group">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <Sparkles className="h-4 w-4 text-yellow-400 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm font-medium text-white/90">Used by 50,000+ businesses worldwide</span>
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight tracking-tight">
              ROI Analysis
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent animate-gradient-x">
                Reimagined
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              The most advanced ROI calculator ever built. AI-powered insights, real-time analysis, 
              and enterprise-grade security. Used by Fortune 500 companies.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 h-14 px-12 text-lg font-bold shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 rounded-2xl group"
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
                className="border-white/20 text-white hover:bg-white/5 h-14 px-12 text-lg backdrop-blur-xl bg-white/5 rounded-2xl font-semibold group"
              >
                <a href="#features" className="flex items-center gap-3">
                  <Layers className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Explore Features
                </a>
              </Button>
            </div>

            {/* Floating Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { number: "77+", label: "Business Types", icon: <BarChart3 className="h-5 w-5" /> },
                { number: "26", label: "Countries", icon: <Globe className="h-5 w-5" /> },
                { number: "99.9%", label: "Uptime", icon: <Shield className="h-5 w-5" /> },
                { number: "<3s", label: "Analysis Time", icon: <Zap className="h-5 w-5" /> }
              ].map((stat, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 group">
                  <div className="flex items-center justify-center mb-3 text-purple-400 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-black text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 mb-6">
              <Cpu className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-white/80">Powered by AI</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Enterprise
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Grade</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
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
                gradient: "from-yellow-400 to-orange-500"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Zero-Trust Security",
                description: "Military-grade encryption. SOC2 compliant. Your data never leaves your control.",
                gradient: "from-green-400 to-emerald-500"
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Predictive AI",
                description: "Machine learning models trained on $10B+ in business data. See the future, today.",
                gradient: "from-purple-400 to-pink-500"
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Global Intelligence",
                description: "Real-time tax data from 26 countries. Regulatory compliance automated.",
                gradient: "from-blue-400 to-cyan-500"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Team Sync",
                description: "Collaborative workspaces. Real-time editing. Enterprise SSO integration.",
                gradient: "from-pink-400 to-rose-500"
              },
              {
                icon: <BarChart3 className="h-8 w-8" />,
                title: "Visual Intelligence",
                description: "Interactive dashboards that tell stories. Export presentation-ready reports.",
                gradient: "from-indigo-400 to-purple-500"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl" 
                     style={{background: `linear-gradient(135deg, var(--tw-gradient-stops))`}} />
                
                <Card className="relative bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 group-hover:-translate-y-2 rounded-3xl overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 text-white shadow-2xl`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed font-light">{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Trust Section */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-8 font-medium">TRUSTED BY INDUSTRY LEADERS</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
              {['MICROSOFT', 'GOOGLE', 'AMAZON', 'TESLA', 'APPLE', 'META'].map((company) => (
                <div key={company} className="text-2xl font-black text-white tracking-wider hover:opacity-80 transition-opacity cursor-pointer">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Start Your
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Analysis</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
              Professional-grade ROI analysis in seconds. What would cost $50,000 in consulting fees, 
              now available instantly.
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <ErrorBoundary>
                <Suspense fallback={
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="h-96 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl animate-pulse backdrop-blur-xl"></div>
                    <div className="h-96 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl animate-pulse backdrop-blur-xl"></div>
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
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">
            Ready to
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> 10x </span>
            Your ROI?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto font-light">
            Join the elite circle of data-driven business leaders who've already unlocked 
            their competitive advantage.
          </p>
          
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 h-16 px-16 text-xl font-bold shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 rounded-2xl group"
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
      <footer className="relative border-t border-white/10 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <BarChart3 className="h-7 w-7 text-white" />
                </div>
                <span className="text-3xl font-black text-white tracking-tight">ROI Calculator Pro</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed font-light">
                The world&apos;s most advanced ROI analysis platform. Trusted by Fortune 500 companies 
                and scaling startups worldwide.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer">
                  <span className="text-white font-bold">𝕏</span>
                </div>
                <div className="w-10 h-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer">
                  <span className="text-white font-bold">in</span>
                </div>
                <div className="w-10 h-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer">
                  <span className="text-white font-bold">gh</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 text-lg">Product</h4>
              <ul className="space-y-3 text-gray-400 font-light">
                <li><a href="#calculator" className="hover:text-white transition-colors">Calculator</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 text-lg">Support</h4>
              <ul className="space-y-3 text-gray-400 font-light">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm font-light">
              © {new Date().getFullYear()} ROI Calculator Pro. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm font-light mt-4 md:mt-0">
              Built with ❤️ for data-driven leaders
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
