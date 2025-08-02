'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, DollarSign, Target, AlertTriangle, CheckCircle, Download, Mail, BarChart3, PieChart, LineChart } from 'lucide-react';
import { ROIResults as ROIResultsType, formatROIResults } from '@/lib/roiCalculator';
import { formatCurrency } from '@/data/countries';
import { cn } from '@/lib/utils';
import { exportToPDF } from '@/lib/pdf-export';
// import { useAuth } from '@/contexts/auth-context';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart as RechartsBarChart, Bar } from 'recharts';

interface ROIResultsProps {
  results: ROIResultsType;
  currency: string;
  countryName: string;
  businessType: string;
  scenario: string;
}

const COLORS = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  accent: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  muted: '#6b7280'
};

export function ROIResults({ results, currency, countryName, businessType, scenario }: ROIResultsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'projections' | 'breakdown' | 'insights'>('overview');
  const [isExporting, setIsExporting] = useState(false);
  // const { user } = useAuth(); // Temporarily disabled
  
  const formattedResults = formatROIResults(results, currency);
  
  const projectionChartData = results.monthlyProjections.map(p => ({
    month: `Month ${p.month}`,
    revenue: p.revenue,
    costs: p.costs,
    netProfit: p.netProfit,
    cumulativeROI: p.cumulativeROI
  }));

  const costBreakdownData = [
    { name: 'Marketing', value: results.costBreakdown.marketing, color: COLORS.primary },
    { name: 'Operating', value: results.costBreakdown.operations, color: COLORS.secondary },
    { name: 'Employees', value: results.costBreakdown.employees, color: COLORS.accent },
    { name: 'Taxes', value: results.costBreakdown.taxes, color: COLORS.warning }
  ].filter(item => item.value > 0);

  const getRiskColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getROIColor = (roi: number) => {
    if (roi > 20) return 'text-green-600';
    if (roi > 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await exportToPDF({
        results,
        currency,
        countryName,
        businessType,
        scenario,
        userEmail: undefined, // user?.email, // Temporarily disabled
      });
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleEmailResults = async () => {
    // For now, we'll just trigger the PDF export
    // In a real implementation, you'd send this to an email API
    await handleExportPDF();
    alert('PDF has been downloaded. You can now email it manually.');
  };

  return (
    <div className="space-y-6">
      {/* Header with Export/Email buttons */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-2xl font-bold">ROI Calculation Results</CardTitle>
            <CardDescription>
              Detailed analysis for {businessType} ({scenario}) in {countryName}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleEmailResults}
              disabled={isExporting}
            >
              <Mail className="h-4 w-4 mr-2" />
              Email Results
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExportPDF}
              disabled={isExporting}
            >
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? 'Exporting...' : 'Export PDF'}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getROIColor(results.roi)}`}>
              {results.roi.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Return on Investment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(results.netProfit, currency)}
            </div>
            <p className="text-xs text-muted-foreground">
              After all expenses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Break-even</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {results.breakEvenMonth ? `${results.breakEvenMonth} months` : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              Time to profitability
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer LTV</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {results.customerLifetimeValue ? formatCurrency(results.customerLifetimeValue, currency) : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              Lifetime value
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'projections', label: 'Projections', icon: LineChart },
            { id: 'breakdown', label: 'Cost Breakdown', icon: PieChart },
            { id: 'insights', label: 'Insights', icon: TrendingUp },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Financial Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
              <CardDescription>Key financial metrics for your business</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Revenue</span>
                <span className="font-semibold">{formatCurrency(results.totalRevenue, currency)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Gross Profit</span>
                <span className="font-semibold">{formatCurrency(results.grossProfit, currency)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Costs</span>
                <span className="font-semibold">{formatCurrency(results.totalCosts, currency)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Taxes</span>
                <span className="font-semibold">{formatCurrency(results.taxAmount, currency)}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Net Profit</span>
                  <span className="text-lg font-bold">{formatCurrency(results.netProfit, currency)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Metrics */}
          {(results.customerLifetimeValue || results.paybackPeriod || results.customersNeeded) && (
            <Card>
              <CardHeader>
                <CardTitle>Customer Metrics</CardTitle>
                <CardDescription>Customer acquisition and retention insights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {results.customerLifetimeValue && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Customer LTV</span>
                    <span className="font-semibold">{formatCurrency(results.customerLifetimeValue, currency)}</span>
                  </div>
                )}
                {results.paybackPeriod && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Payback Period</span>
                    <span className="font-semibold">{results.paybackPeriod.toFixed(1)} months</span>
                  </div>
                )}
                {results.customersNeeded && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Customers Needed</span>
                    <span className="font-semibold">{results.customersNeeded}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab === 'projections' && (
        <Card>
          <CardHeader>
            <CardTitle>12-Month Financial Projections</CardTitle>
            <CardDescription>Revenue, costs, and profitability over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={projectionChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => formatCurrency(Number(value), currency)} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke={COLORS.primary} 
                    strokeWidth={2}
                    name="Revenue"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="costs" 
                    stroke={COLORS.danger} 
                    strokeWidth={2}
                    name="Costs"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="netProfit" 
                    stroke={COLORS.accent} 
                    strokeWidth={2}
                    name="Net Profit"
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'breakdown' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Cost Breakdown</CardTitle>
              <CardDescription>Distribution of your business expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={costBreakdownData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {costBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => formatCurrency(Number(value), currency)} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost Details</CardTitle>
              <CardDescription>Detailed breakdown of expenses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {costBreakdownData.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <span className="font-semibold">{formatCurrency(item.value, currency)}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="space-y-6">
          {/* Industry Comparison */}
          {results.industryComparison && (
            <Card>
              <CardHeader>
                <CardTitle>Industry Comparison</CardTitle>
                <CardDescription>How your metrics compare to industry benchmarks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Revenue vs Benchmark</span>
                  <span className={`font-semibold ${results.industryComparison.revenueVsBenchmark > 1 ? 'text-green-600' : 'text-red-600'}`}>
                    {(results.industryComparison.revenueVsBenchmark * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Margin vs Benchmark</span>
                  <span className={`font-semibold ${results.industryComparison.marginVsBenchmark > 1 ? 'text-green-600' : 'text-red-600'}`}>
                    {(results.industryComparison.marginVsBenchmark * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Growth vs Benchmark</span>
                  <span className={`font-semibold ${results.industryComparison.growthVsBenchmark > 1 ? 'text-green-600' : 'text-red-600'}`}>
                    {(results.industryComparison.growthVsBenchmark * 100).toFixed(1)}%
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Risk Factors */}
          {results.riskFactors.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Risk Factors</CardTitle>
                <CardDescription>Potential risks and challenges to consider</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {results.riskFactors.map((risk, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${getRiskColor(risk.impact)}`}>
                    <div className="flex items-center space-x-2 mb-1">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="font-medium">{risk.factor}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-white/50">
                        {risk.impact.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm opacity-80">{risk.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          {results.recommendations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>Actionable insights to improve your ROI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {results.recommendations.map((rec, index) => (
                  <div key={index} className="p-4 rounded-lg border border-green-200 bg-green-50">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800">{rec.category}</span>
                    </div>
                    <p className="text-sm text-green-700 mb-2">{rec.suggestion}</p>
                    <p className="text-xs text-green-600 font-medium">
                      Potential Impact: {rec.potentialImpact}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}