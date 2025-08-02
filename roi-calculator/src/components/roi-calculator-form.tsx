'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BusinessTypeSelector } from '@/components/business-type-selector';
import { CountrySelector } from '@/components/country-selector';
import { ScenarioSelector } from '@/components/scenario-selector';
import { ROIResults } from '@/components/roi-results';
import { businessTypes, getBusinessTypeById, getScenarioById } from '@/data/businessTypes';
import { countries, getCountryById } from '@/data/countries';
import { ROICalculator, ROIInputs, ROIResults as ROIResultsType } from '@/lib/roiCalculator';
import { Loader2, AlertCircle, Building2, Globe, BarChart3, DollarSign, Sparkles, TrendingUp, Target, Zap } from 'lucide-react';

const formSchema = z.object({
  monthlyRevenue: z.number().min(1, 'Monthly revenue must be greater than 0'),
  grossMargin: z.number().min(0).max(100, 'Gross margin must be between 0 and 100'),
  marketingBudget: z.number().min(0, 'Marketing budget must be 0 or greater'),
  operatingExpenses: z.number().min(0, 'Operating expenses must be 0 or greater'),
  employeeCosts: z.number().min(0, 'Employee costs must be 0 or greater').optional(),
  cac: z.number().min(0, 'Customer acquisition cost must be 0 or greater').optional(),
  averageOrderValue: z.number().min(0, 'Average order value must be 0 or greater').optional(),
  churnRate: z.number().min(0).max(100, 'Churn rate must be between 0 and 100').optional(),
  timeframe: z.enum(['monthly', 'quarterly', 'yearly']),
});

type FormData = z.infer<typeof formSchema>;

export function ROICalculatorForm() {
  const [mounted, setMounted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('us');
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>('startup-tech');
  const [selectedScenario, setSelectedScenario] = useState<string>('saas-mvp');
  const [results, setResults] = useState<ROIResultsType | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Array<{field: string, message: string, severity: 'error' | 'warning'}>>([]);

  // Ensure component is mounted before rendering complex logic
  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlyRevenue: 5000,
      grossMargin: 85,
      marketingBudget: 2000,
      operatingExpenses: 3000,
      employeeCosts: 8000,
      timeframe: 'monthly'
    }
  });

  const watchedValues = watch();

  // Memoized data with fallbacks
  const currentCountry = useMemo(() => {
    try {
      return getCountryById(selectedCountry) || countries[0];
    } catch (error) {
      console.error('Error getting country:', error);
      return countries[0];
    }
  }, [selectedCountry]);

  const currentBusinessType = useMemo(() => {
    try {
      return getBusinessTypeById(selectedBusinessType) || businessTypes[0];
    } catch (error) {
      console.error('Error getting business type:', error);
      return businessTypes[0];
    }
  }, [selectedBusinessType]);

  const currentScenario = useMemo(() => {
    try {
      return getScenarioById(selectedBusinessType, selectedScenario) || 
             currentBusinessType?.scenarios[0];
    } catch (error) {
      console.error('Error getting scenario:', error);
      return currentBusinessType?.scenarios[0];
    }
  }, [selectedBusinessType, selectedScenario, currentBusinessType]);

  // Update form when scenario changes
  useEffect(() => {
    if (!currentScenario || !mounted) return;
    
    try {
      const { defaultInputs } = currentScenario;
      setValue('monthlyRevenue', defaultInputs.monthlyRevenue);
      setValue('grossMargin', defaultInputs.grossMargin);
      setValue('marketingBudget', defaultInputs.marketingBudget);
      setValue('operatingExpenses', defaultInputs.operatingExpenses);
      setValue('employeeCosts', defaultInputs.employeeCosts || 0);
      setValue('cac', defaultInputs.cac || 0);
      setValue('averageOrderValue', defaultInputs.averageOrderValue || 0);
      setValue('churnRate', defaultInputs.churnRate || 0);
    } catch (error) {
      console.error('Error updating form values:', error);
    }
  }, [currentScenario, setValue, mounted]);

  // Real-time calculation with error handling
  useEffect(() => {
    if (!watchedValues || !currentCountry || !currentScenario || !mounted) return;

    const calculateROI = async () => {
      try {
        setIsCalculating(true);
        setValidationErrors([]);

        const inputs: ROIInputs = {
          monthlyRevenue: Number(watchedValues.monthlyRevenue) || 0,
          grossMargin: Number(watchedValues.grossMargin) || 0,
          marketingBudget: Number(watchedValues.marketingBudget) || 0,
          operatingExpenses: Number(watchedValues.operatingExpenses) || 0,
          employeeCosts: Number(watchedValues.employeeCosts) || 0,
          cac: Number(watchedValues.cac) || undefined,
          averageOrderValue: Number(watchedValues.averageOrderValue) || undefined,
          churnRate: Number(watchedValues.churnRate) || undefined,
          timeframe: watchedValues.timeframe || 'monthly',
          projectionMonths: 12,
          growthRate: currentScenario.assumptions.growthRate,
          country: selectedCountry,
          businessType: selectedBusinessType,
          scenario: selectedScenario,
          initialInvestment: Number(watchedValues.marketingBudget) + Number(watchedValues.operatingExpenses),
        };

        const calculator = new ROICalculator(inputs, currentCountry, currentScenario);
        const validationErrors = calculator.validateInputs();
        
        if (validationErrors.length > 0) {
          setValidationErrors(validationErrors);
        }

        const calculationResults = calculator.calculate();
        setResults(calculationResults);
      } catch (error) {
        console.error('ROI calculation error:', error);
        setValidationErrors([{
          field: 'general',
          message: 'Error calculating ROI. Please check your inputs.',
          severity: 'error'
        }]);
      } finally {
        setIsCalculating(false);
      }
    };

    const timeoutId = setTimeout(calculateROI, 300);
    return () => clearTimeout(timeoutId);
  }, [watchedValues, currentCountry, currentScenario, selectedCountry, selectedBusinessType, selectedScenario, mounted]);

  const onSubmit = async (data: FormData) => {
    // Form submission is handled by real-time calculation
    console.log('Form submitted:', data);
  };

  // Show loading state until mounted
  if (!mounted) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 shadow-xl border border-white/50">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-xl border border-white/50">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
          </div>
        </div>
      </div>
    );
  }

  // Show error state if data is not available
  if (!currentCountry || !currentBusinessType || !currentScenario) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
          <div className="flex items-center justify-center py-12 text-red-600">
            <AlertCircle className="h-8 w-8 mr-3" />
            <span className="text-lg font-semibold">Unable to load calculator data. Please refresh the page.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* Business Setup Card */}
      <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-3xl shadow-2xl border border-white/50 overflow-hidden hover:shadow-3xl transition-all duration-500">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
              <Building2 className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-black">Business Setup</h3>
          </div>
          <p className="text-indigo-100 font-medium">Configure your business parameters for precise analysis</p>
        </div>
        
        <div className="p-8 space-y-8">
          <div className="space-y-3">
            <Label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-3">
              <Globe className="h-5 w-5 text-blue-600" />
              Country & Region
            </Label>
            <CountrySelector
              value={selectedCountry}
              onValueChange={setSelectedCountry}
              className="h-12 border-2 border-slate-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl text-base font-medium"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-3">
              <Building2 className="h-5 w-5 text-emerald-600" />
              Business Type
            </Label>
            <BusinessTypeSelector
              value={selectedBusinessType}
              onValueChange={(value) => {
                setSelectedBusinessType(value);
                const newBusinessType = getBusinessTypeById(value);
                if (newBusinessType?.scenarios[0]) {
                  setSelectedScenario(newBusinessType.scenarios[0].id);
                }
              }}
              className="h-12 border-2 border-slate-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl text-base font-medium"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-3">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              Business Scenario
            </Label>
            <ScenarioSelector
              businessType={selectedBusinessType}
              value={selectedScenario}
              onValueChange={setSelectedScenario}
              className="h-12 border-2 border-slate-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl text-base font-medium"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-3">
              <Target className="h-5 w-5 text-amber-600" />
              Analysis Period
            </Label>
            <Select value={watchedValues.timeframe} onValueChange={(value) => setValue('timeframe', value as any)}>
              <SelectTrigger className="h-12 border-2 border-slate-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl text-base font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly Analysis</SelectItem>
                <SelectItem value="quarterly">Quarterly Analysis</SelectItem>
                <SelectItem value="yearly">Yearly Analysis</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Financial Inputs Card */}
      <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-3xl shadow-2xl border border-white/50 overflow-hidden hover:shadow-3xl transition-all duration-500">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
              <DollarSign className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-black">Financial Data</h3>
          </div>
          <p className="text-emerald-100 font-medium">Enter your key financial metrics for ROI calculation</p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-sm font-bold text-slate-700">
                  Monthly Revenue ({currentCountry.currencySymbol})
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('monthlyRevenue', { valueAsNumber: true })}
                  className="h-12 border-2 border-slate-200 hover:border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl text-base font-semibold"
                  placeholder="50,000"
                />
                {errors.monthlyRevenue && (
                  <p className="text-sm text-red-600 flex items-center gap-2 font-medium">
                    <AlertCircle className="h-4 w-4" />
                    {errors.monthlyRevenue.message}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-bold text-slate-700">
                  Gross Margin (%)
                </Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  {...register('grossMargin', { valueAsNumber: true })}
                  className="h-12 border-2 border-slate-200 hover:border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl text-base font-semibold"
                  placeholder="75"
                />
                {errors.grossMargin && (
                  <p className="text-sm text-red-600 flex items-center gap-2 font-medium">
                    <AlertCircle className="h-4 w-4" />
                    {errors.grossMargin.message}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-bold text-slate-700">
                  Marketing Budget ({currentCountry.currencySymbol})
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('marketingBudget', { valueAsNumber: true })}
                  className="h-12 border-2 border-slate-200 hover:border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl text-base font-semibold"
                  placeholder="10,000"
                />
                {errors.marketingBudget && (
                  <p className="text-sm text-red-600 flex items-center gap-2 font-medium">
                    <AlertCircle className="h-4 w-4" />
                    {errors.marketingBudget.message}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-bold text-slate-700">
                  Operating Expenses ({currentCountry.currencySymbol})
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('operatingExpenses', { valueAsNumber: true })}
                  className="h-12 border-2 border-slate-200 hover:border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl text-base font-semibold"
                  placeholder="15,000"
                />
                {errors.operatingExpenses && (
                  <p className="text-sm text-red-600 flex items-center gap-2 font-medium">
                    <AlertCircle className="h-4 w-4" />
                    {errors.operatingExpenses.message}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-bold text-slate-700">
                  Employee Costs ({currentCountry.currencySymbol})
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('employeeCosts', { valueAsNumber: true })}
                  className="h-12 border-2 border-slate-200 hover:border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl text-base font-semibold"
                  placeholder="25,000"
                />
                {errors.employeeCosts && (
                  <p className="text-sm text-red-600 flex items-center gap-2 font-medium">
                    <AlertCircle className="h-4 w-4" />
                    {errors.employeeCosts.message}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-bold text-slate-700">
                  Customer Acquisition Cost ({currentCountry.currencySymbol})
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('cac', { valueAsNumber: true })}
                  className="h-12 border-2 border-slate-200 hover:border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl text-base font-semibold"
                  placeholder="150"
                />
                {errors.cac && (
                  <p className="text-sm text-red-600 flex items-center gap-2 font-medium">
                    <AlertCircle className="h-4 w-4" />
                    {errors.cac.message}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-bold text-slate-700">
                  Average Order Value ({currentCountry.currencySymbol})
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('averageOrderValue', { valueAsNumber: true })}
                  className="h-12 border-2 border-slate-200 hover:border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl text-base font-semibold"
                  placeholder="500"
                />
                {errors.averageOrderValue && (
                  <p className="text-sm text-red-600 flex items-center gap-2 font-medium">
                    <AlertCircle className="h-4 w-4" />
                    {errors.averageOrderValue.message}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-bold text-slate-700">
                  Churn Rate (%)
                </Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  {...register('churnRate', { valueAsNumber: true })}
                  className="h-12 border-2 border-slate-200 hover:border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl text-base font-semibold"
                  placeholder="5"
                />
                {errors.churnRate && (
                  <p className="text-sm text-red-600 flex items-center gap-2 font-medium">
                    <AlertCircle className="h-4 w-4" />
                    {errors.churnRate.message}
                  </p>
                )}
              </div>
            </div>

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <div className="space-y-3">
                {validationErrors.map((error, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-2xl border-2 ${
                      error.severity === 'error'
                        ? 'bg-red-50 border-red-200 text-red-800'
                        : 'bg-amber-50 border-amber-200 text-amber-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      <span className="font-bold">{error.field}</span>
                    </div>
                    <p className="mt-1 font-medium">{error.message}</p>
                  </div>
                ))}
              </div>
            )}

            {isCalculating && (
              <div className="flex items-center justify-center py-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200">
                <Loader2 className="h-6 w-6 animate-spin mr-3 text-indigo-600" />
                <span className="text-indigo-800 font-bold text-lg">Calculating your ROI...</span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Results Display */}
      <div className="xl:col-span-2">
        {results ? (
          <ROIResults
            results={results}
            currency={currentCountry.currency}
            countryName={currentCountry.name}
            businessType={currentBusinessType.name}
            scenario={currentScenario.name}
          />
        ) : (
          <div className="bg-gradient-to-br from-slate-50 via-white to-indigo-50 rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-700 to-indigo-700 p-8 text-white text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="h-7 w-7" />
                </div>
                <h3 className="text-3xl font-black">Your ROI Analysis</h3>
              </div>
              <p className="text-slate-200 font-medium text-lg">Professional insights will appear here once you enter your data</p>
            </div>
            
            <div className="p-12">
              <div className="text-center max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <Sparkles className="h-12 w-12 text-indigo-600" />
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-4">
                  Ready for AI-Powered Analysis
                </h4>
                <p className="text-slate-600 leading-relaxed text-lg font-medium">
                  Fill in your business details above to get comprehensive ROI insights, 
                  interactive charts, and actionable recommendations powered by machine learning.
                </p>
                
                {/* Feature highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Zap className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h5 className="font-bold text-slate-900 mb-2">Lightning Fast</h5>
                    <p className="text-sm text-slate-600 font-medium">Results in under 3 seconds</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <BarChart3 className="h-8 w-8 text-purple-600" />
                    </div>
                    <h5 className="font-bold text-slate-900 mb-2">Interactive Charts</h5>
                    <p className="text-sm text-slate-600 font-medium">Beautiful visualizations</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Target className="h-8 w-8 text-amber-600" />
                    </div>
                    <h5 className="font-bold text-slate-900 mb-2">Precise Insights</h5>
                    <p className="text-sm text-slate-600 font-medium">99.9% accuracy rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}