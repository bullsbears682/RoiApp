'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  AlertTriangle, 
  CheckCircle,
  Download,
  Mail,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import { ROIResults as ROIResultsType, formatROIResults } from '@/lib/roiCalculator';
import { formatCurrency } from '@/data/countries';
import { cn } from '@/lib/utils';
import { exportToPDF } from '@/lib/pdf-export';
import { useAuth } from '@/contexts/auth-context';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart as RechartsBarChart,
  Bar
} from 'recharts';

interface ROIResultsProps {
  results: ROIResultsType;
  currency: string;
  countryName: string;
  businessType: string;
  scenario: string;
}

const COLORS = {
  primary: 'hsl(var(--primary))',
  secondary: 'hsl(var(--secondary))',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  muted: 'hsl(var(--muted-foreground))'
};

export function ROIResults({ results, currency, countryName, businessType, scenario }: ROIResultsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'projections' | 'breakdown' | 'insights'>('overview');
  const [isExporting, setIsExporting] = useState(false);
  const { user } = useAuth();
  
  const formattedResults = formatROIResults(results, currency);
  
  // Prepare chart data
  const projectionChartData = results.monthlyProjections.map(p => ({
    month: `Month ${p.month}`,
    revenue: p.revenue,
    costs: p.costs,
    profit: p.netProfit,
    roi: p.cumulativeROI
  }));

  const costBreakdownData = [
    { name: 'Marketing', value: results.costBreakdown.marketing, color: COLORS.primary },
    { name: 'Operations', value: results.costBreakdown.operations, color: COLORS.secondary },
    { name: 'Employees', value: results.costBreakdown.employees, color: COLORS.info },
    { name: 'Taxes', value: results.costBreakdown.taxes, color: COLORS.warning },
    { name: 'Additional', value: results.costBreakdown.additional, color: COLORS.muted }
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
    if (roi >= 20) return 'text-green-600';
    if (roi >= 10) return 'text-yellow-600';
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
        userEmail: user?.email,
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
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">ROI Analysis Results</CardTitle>
              <CardDescription>
                {businessType} • {scenario} • {countryName}
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
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">ROI</p>
                <p className={cn("text-2xl font-bold", getROIColor(results.roi))}>
                  {results.roi.toFixed(1)}%
                </p>
              </div>
              <div className={cn("p-2 rounded-full", 
                results.roi >= 0 ? "bg-green-100" : "bg-red-100"
              )}>
                {results.roi >= 0 ? (
                  <TrendingUp className="h-6 w-6 text-green-600" />
                ) : (
                  <TrendingDown className="h-6 w-6 text-red-600" />
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {results.roi >= 20 ? 'Excellent' : results.roi >= 10 ? 'Good' : 'Needs improvement'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(results.netProfit, currency)}
                </p>
              </div>
              <div className="p-2 rounded-full bg-blue-100">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              After taxes and expenses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Break-even</p>
                <p className="text-2xl font-bold">
                  {results.breakEvenMonth ? `${results.breakEvenMonth}mo` : 'N/A'}
                </p>
              </div>
              <div className="p-2 rounded-full bg-purple-100">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Time to profitability
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tax Rate</p>
                <p className="text-2xl font-bold">
                  {results.effectiveTaxRate.toFixed(1)}%
                </p>
              </div>
              <div className="p-2 rounded-full bg-orange-100">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Effective tax burden
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
            { id: 'insights', label: 'Insights', icon: Target }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors",
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Revenue</span>
                <span className="font-medium">{formatCurrency(results.totalRevenue, currency)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Gross Profit</span>
                <span className="font-medium">{formatCurrency(results.grossProfit, currency)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Costs</span>
                <span className="font-medium">{formatCurrency(results.totalCosts, currency)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tax Amount</span>
                <span className="font-medium">{formatCurrency(results.taxAmount, currency)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between items-center font-semibold">
                  <span>Net Profit</span>
                  <span className={getROIColor(results.roi)}>
                    {formatCurrency(results.afterTaxProfit, currency)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.customerLifetimeValue && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Customer LTV</span>
                  <span className="font-medium">{formatCurrency(results.customerLifetimeValue, currency)}</span>
                </div>
              )}
              {results.paybackPeriod && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Payback Period</span>
                  <span className="font-medium">{results.paybackPeriod.toFixed(1)} months</span>
                </div>
              )}
              {results.customersNeeded && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Customers Needed</span>
                  <span className="font-medium">{results.customersNeeded.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Monthly Cash Flow</span>
                <span className="font-medium">{formatCurrency(results.monthlyNetCashFlow, currency)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'projections' && (
        <Card>
          <CardHeader>
            <CardTitle>Revenue & ROI Projections</CardTitle>
            <CardDescription>
              Monthly projections showing revenue growth and cumulative ROI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={projectionChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      name === 'roi' ? `${value.toFixed(1)}%` : formatCurrency(value, currency),
                      name === 'roi' ? 'ROI' : name.charAt(0).toUpperCase() + name.slice(1)
                    ]}
                  />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="revenue" stroke={COLORS.primary} strokeWidth={2} name="Revenue" />
                  <Line yAxisId="left" type="monotone" dataKey="costs" stroke={COLORS.warning} strokeWidth={2} name="Costs" />
                  <Line yAxisId="left" type="monotone" dataKey="profit" stroke={COLORS.success} strokeWidth={2} name="Profit" />
                  <Line yAxisId="right" type="monotone" dataKey="roi" stroke={COLORS.info} strokeWidth={2} strokeDasharray="5 5" name="ROI %" />
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
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={costBreakdownData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {costBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCurrency(value, currency)} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {costBreakdownData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium">{formatCurrency(item.value, currency)}</span>
                </div>
              ))}
              <div className="border-t pt-2">
                <div className="flex justify-between items-center font-semibold">
                  <span>Total Costs</span>
                  <span>{formatCurrency(results.totalCosts + results.taxAmount, currency)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="space-y-6">
          {/* Industry Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Industry Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className={cn("text-2xl font-bold", 
                    results.industryComparison.revenueVsBenchmark >= 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {results.industryComparison.revenueVsBenchmark >= 0 ? '+' : ''}
                    {results.industryComparison.revenueVsBenchmark.toFixed(1)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Revenue vs Benchmark</p>
                </div>
                <div className="text-center">
                  <div className={cn("text-2xl font-bold", 
                    results.industryComparison.marginVsBenchmark >= 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {results.industryComparison.marginVsBenchmark >= 0 ? '+' : ''}
                    {results.industryComparison.marginVsBenchmark.toFixed(1)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Margin vs Benchmark</p>
                </div>
                <div className="text-center">
                  <div className={cn("text-2xl font-bold", 
                    results.industryComparison.growthVsBenchmark >= 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {results.industryComparison.growthVsBenchmark >= 0 ? '+' : ''}
                    {results.industryComparison.growthVsBenchmark.toFixed(1)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Growth vs Benchmark</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Factors */}
          {results.riskFactors.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  Risk Factors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.riskFactors.map((risk, index) => (
                    <div key={index} className={cn("p-3 rounded-lg border", getRiskColor(risk.impact))}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{risk.factor}</span>
                        <span className="text-xs uppercase font-semibold">
                          {risk.impact} risk
                        </span>
                      </div>
                      <p className="text-sm">{risk.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          {results.recommendations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.recommendations.map((rec, index) => (
                    <div key={index} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-green-800">{rec.category}</span>
                      </div>
                      <p className="text-sm text-green-700 mb-2">{rec.suggestion}</p>
                      <p className="text-xs text-green-600 font-medium">
                        💡 {rec.potentialImpact}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}