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
import { Loader2, AlertCircle } from 'lucide-react';

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show error state if data is not available
  if (!currentCountry || !currentBusinessType || !currentScenario) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Error Loading Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8 text-red-600">
              <AlertCircle className="h-8 w-8 mr-2" />
              <span>Unable to load calculator data. Please refresh the page.</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Business Setup Card */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50 hover:shadow-2xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-lg">🎯</span>
            </div>
            Business Setup
          </CardTitle>
          <CardDescription className="text-purple-100">
            Select your business type and location for accurate calculations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-3">
            <Label htmlFor="country" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span className="text-blue-500">🌍</span>
              Country
            </Label>
            <CountrySelector
              value={selectedCountry}
              onValueChange={setSelectedCountry}
              className="border-2 border-slate-200 hover:border-purple-300 focus:border-purple-500 transition-colors"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="businessType" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span className="text-green-500">🏢</span>
              Business Type
            </Label>
            <BusinessTypeSelector
              value={selectedBusinessType}
              onValueChange={(value) => {
                setSelectedBusinessType(value);
                // Reset scenario to first available when business type changes
                const newBusinessType = getBusinessTypeById(value);
                if (newBusinessType?.scenarios[0]) {
                  setSelectedScenario(newBusinessType.scenarios[0].id);
                }
              }}
              className="border-2 border-slate-200 hover:border-purple-300 focus:border-purple-500 transition-colors"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="scenario" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span className="text-purple-500">📊</span>
              Scenario
            </Label>
            <ScenarioSelector
              businessType={selectedBusinessType}
              value={selectedScenario}
              onValueChange={setSelectedScenario}
              className="border-2 border-slate-200 hover:border-purple-300 focus:border-purple-500 transition-colors"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="timeframe" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span className="text-orange-500">⏱️</span>
              Time Frame
            </Label>
            <Select value={watchedValues.timeframe} onValueChange={(value) => setValue('timeframe', value as any)}>
              <SelectTrigger className="border-2 border-slate-200 hover:border-purple-300 focus:border-purple-500 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly Analysis</SelectItem>
                <SelectItem value="quarterly">Quarterly Analysis</SelectItem>
                <SelectItem value="yearly">Yearly Analysis</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Financial Inputs Card */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50 hover:shadow-2xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-lg">💰</span>
            </div>
            Financial Inputs
          </CardTitle>
          <CardDescription className="text-green-100">
            Enter your business financial data for precise ROI analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="monthlyRevenue" className="text-sm font-semibold text-slate-700">
                  Monthly Revenue ({currentCountry.currencySymbol})
                </Label>
                <Input
                  id="monthlyRevenue"
                  type="number"
                  step="0.01"
                  {...register('monthlyRevenue', { valueAsNumber: true })}
                  className="border-2 border-slate-200 hover:border-green-300 focus:border-green-500 transition-colors h-12 text-lg font-semibold"
                  placeholder="50,000"
                />
                {errors.monthlyRevenue && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <span className="text-red-500">⚠️</span>
                    {errors.monthlyRevenue.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="grossMargin" className="text-sm font-semibold text-slate-700">
                  Gross Margin (%)
                </Label>
                <Input
                  id="grossMargin"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  {...register('grossMargin', { valueAsNumber: true })}
                  className="border-2 border-slate-200 hover:border-green-300 focus:border-green-500 transition-colors h-12 text-lg font-semibold"
                  placeholder="75"
                />
                {errors.grossMargin && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <span className="text-red-500">⚠️</span>
                    {errors.grossMargin.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="marketingBudget" className="text-sm font-semibold text-slate-700">
                  Marketing Budget ({currentCountry.currencySymbol})
                </Label>
                <Input
                  id="marketingBudget"
                  type="number"
                  step="0.01"
                  {...register('marketingBudget', { valueAsNumber: true })}
                  className="border-2 border-slate-200 hover:border-green-300 focus:border-green-500 transition-colors h-12 text-lg font-semibold"
                  placeholder="10,000"
                />
                {errors.marketingBudget && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <span className="text-red-500">⚠️</span>
                    {errors.marketingBudget.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="operatingExpenses" className="text-sm font-semibold text-slate-700">
                  Operating Expenses ({currentCountry.currencySymbol})
                </Label>
                <Input
                  id="operatingExpenses"
                  type="number"
                  step="0.01"
                  {...register('operatingExpenses', { valueAsNumber: true })}
                  className="border-2 border-slate-200 hover:border-green-300 focus:border-green-500 transition-colors h-12 text-lg font-semibold"
                  placeholder="15,000"
                />
                {errors.operatingExpenses && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <span className="text-red-500">⚠️</span>
                    {errors.operatingExpenses.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="employeeCosts" className="text-sm font-semibold text-slate-700">
                  Employee Costs ({currentCountry.currencySymbol})
                </Label>
                <Input
                  id="employeeCosts"
                  type="number"
                  step="0.01"
                  {...register('employeeCosts', { valueAsNumber: true })}
                  className="border-2 border-slate-200 hover:border-green-300 focus:border-green-500 transition-colors h-12 text-lg font-semibold"
                  placeholder="25,000"
                />
                {errors.employeeCosts && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <span className="text-red-500">⚠️</span>
                    {errors.employeeCosts.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cac" className="text-sm font-semibold text-slate-700">
                  Customer Acquisition Cost ({currentCountry.currencySymbol})
                </Label>
                <Input
                  id="cac"
                  type="number"
                  step="0.01"
                  {...register('cac', { valueAsNumber: true })}
                  className="border-2 border-slate-200 hover:border-green-300 focus:border-green-500 transition-colors h-12 text-lg font-semibold"
                  placeholder="150"
                />
                {errors.cac && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <span className="text-red-500">⚠️</span>
                    {errors.cac.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="averageOrderValue" className="text-sm font-semibold text-slate-700">
                  Average Order Value ({currentCountry.currencySymbol})
                </Label>
                <Input
                  id="averageOrderValue"
                  type="number"
                  step="0.01"
                  {...register('averageOrderValue', { valueAsNumber: true })}
                  className="border-2 border-slate-200 hover:border-green-300 focus:border-green-500 transition-colors h-12 text-lg font-semibold"
                  placeholder="500"
                />
                {errors.averageOrderValue && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <span className="text-red-500">⚠️</span>
                    {errors.averageOrderValue.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="churnRate" className="text-sm font-semibold text-slate-700">
                  Churn Rate (%)
                </Label>
                <Input
                  id="churnRate"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  {...register('churnRate', { valueAsNumber: true })}
                  className="border-2 border-slate-200 hover:border-green-300 focus:border-green-500 transition-colors h-12 text-lg font-semibold"
                  placeholder="5"
                />
                {errors.churnRate && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <span className="text-red-500">⚠️</span>
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
                    className={`p-4 rounded-xl border-2 ${
                      error.severity === 'error'
                        ? 'bg-red-50 border-red-200 text-red-800'
                        : 'bg-yellow-50 border-yellow-200 text-yellow-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      <span className="text-sm font-semibold">{error.field}</span>
                    </div>
                    <p className="text-sm mt-1">{error.message}</p>
                  </div>
                ))}
              </div>
            )}

            {isCalculating && (
              <div className="flex items-center justify-center py-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                <Loader2 className="h-6 w-6 animate-spin mr-3 text-purple-600" />
                <span className="text-lg font-semibold text-purple-800">Calculating your ROI...</span>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Results Display */}
      <div className="lg:col-span-2">
        {results ? (
          <ROIResults
            results={results}
            currency={currentCountry.currency}
            countryName={currentCountry.name}
            businessType={currentBusinessType.name}
            scenario={currentScenario.name}
          />
        ) : (
          <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-50 to-white">
            <CardHeader className="bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-t-lg text-center">
              <CardTitle className="text-2xl font-bold">🚀 Your ROI Results</CardTitle>
              <CardDescription className="text-slate-200">
                Professional analysis will appear here once you enter your data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-16 text-slate-500">
                <div className="text-center max-w-md">
                  <div className="text-6xl mb-6">📊</div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">
                    Ready for Professional Analysis
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Fill in your business details above to get comprehensive ROI insights, 
                    interactive charts, and actionable recommendations worth $10,000+ in consulting fees.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}