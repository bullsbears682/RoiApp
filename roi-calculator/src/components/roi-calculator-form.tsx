'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BusinessTypeSelector } from '@/components/business-type-selector';
import { CountrySelector } from '@/components/country-selector';
import { ScenarioSelector } from '@/components/scenario-selector';
import { ROIResults } from '@/components/roi-results';
import { businessTypes, getBusinessTypeById, getScenarioById } from '@/data/businessTypes';
import { countries, getCountryById } from '@/data/countries';
import { ROICalculator, ROIInputs, ROIResults as ROIResultsType } from '@/lib/roiCalculator';

const formSchema = z.object({
  country: z.string().min(1, 'Please select a country'),
  businessType: z.string().min(1, 'Please select a business type'),
  scenario: z.string().min(1, 'Please select a scenario'),
  monthlyRevenue: z.number().min(1, 'Monthly revenue must be greater than 0'),
  grossMargin: z.number().min(0).max(100, 'Gross margin must be between 0% and 100%'),
  marketingBudget: z.number().min(0, 'Marketing budget cannot be negative'),
  operatingExpenses: z.number().min(0, 'Operating expenses cannot be negative'),
  employeeCosts: z.number().min(0, 'Employee costs cannot be negative'),
  cac: z.number().optional(),
  averageOrderValue: z.number().optional(),
  churnRate: z.number().optional(),
  growthRate: z.number().min(0, 'Growth rate cannot be negative'),
  projectionMonths: z.number().min(1).max(60, 'Projection period must be between 1-60 months'),
  initialInvestment: z.number().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function ROICalculatorForm() {
  const [selectedCountry, setSelectedCountry] = useState<string>('us');
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>('startup-tech');
  const [selectedScenario, setSelectedScenario] = useState<string>('saas-mvp');
  const [results, setResults] = useState<ROIResultsType | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Array<{field: string, message: string, severity: 'error' | 'warning'}>>([]);

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
      country: 'us',
      businessType: 'startup-tech',
      scenario: 'saas-mvp',
      monthlyRevenue: 5000,
      grossMargin: 85,
      marketingBudget: 2000,
      operatingExpenses: 3000,
      employeeCosts: 8000,
      growthRate: 15,
      projectionMonths: 12,
    }
  });

  const watchedValues = watch();

  // Get current selections
  const currentCountry = useMemo(() => getCountryById(selectedCountry), [selectedCountry]);
  const currentBusinessType = useMemo(() => getBusinessTypeById(selectedBusinessType), [selectedBusinessType]);
  const currentScenario = useMemo(() => {
    if (!currentBusinessType) return null;
    return getScenarioById(selectedBusinessType, selectedScenario);
  }, [selectedBusinessType, selectedScenario, currentBusinessType]);

  // Update form when scenario changes
  useEffect(() => {
    if (currentScenario) {
      const defaults = currentScenario.defaultInputs;
      setValue('monthlyRevenue', defaults.monthlyRevenue);
      setValue('grossMargin', defaults.grossMargin);
      setValue('marketingBudget', defaults.marketingBudget);
      setValue('operatingExpenses', defaults.operatingExpenses);
      setValue('employeeCosts', defaults.employeeCosts || 0);
      setValue('cac', defaults.cac);
      setValue('averageOrderValue', defaults.averageOrderValue);
      setValue('churnRate', defaults.churnRate);
      setValue('growthRate', currentScenario.assumptions.growthRate);
    }
  }, [currentScenario, setValue]);

  // Real-time calculation
  useEffect(() => {
    if (currentCountry && currentScenario && watchedValues.monthlyRevenue > 0) {
      const inputs: ROIInputs = {
        monthlyRevenue: watchedValues.monthlyRevenue,
        grossMargin: watchedValues.grossMargin,
        marketingBudget: watchedValues.marketingBudget,
        operatingExpenses: watchedValues.operatingExpenses,
        employeeCosts: watchedValues.employeeCosts,
        cac: watchedValues.cac,
        averageOrderValue: watchedValues.averageOrderValue,
        churnRate: watchedValues.churnRate,
        timeframe: 'monthly',
        projectionMonths: watchedValues.projectionMonths,
        growthRate: watchedValues.growthRate,
        country: selectedCountry,
        businessType: selectedBusinessType,
        scenario: selectedScenario,
        initialInvestment: watchedValues.initialInvestment,
      };

      try {
        const calculator = new ROICalculator(inputs, currentCountry, currentScenario);
        const validationErrors = calculator.validateInputs();
        setValidationErrors(validationErrors);

        if (!validationErrors.some(e => e.severity === 'error')) {
          const calculationResults = calculator.calculate();
          setResults(calculationResults);
        } else {
          setResults(null);
        }
      } catch (error) {
        console.error('Calculation error:', error);
        setResults(null);
      }
    }
  }, [watchedValues, currentCountry, currentScenario, selectedCountry, selectedBusinessType, selectedScenario]);

  const onSubmit = async (data: FormData) => {
    setIsCalculating(true);
    // Simulate calculation time for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsCalculating(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Form */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Business Setup</CardTitle>
            <CardDescription>
              Select your country, business type, and scenario to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="country">Country</Label>
              <CountrySelector
                value={selectedCountry}
                onValueChange={(value) => {
                  setSelectedCountry(value);
                  setValue('country', value);
                }}
              />
            </div>

            <div>
              <Label htmlFor="businessType">Business Type</Label>
              <BusinessTypeSelector
                value={selectedBusinessType}
                onValueChange={(value) => {
                  setSelectedBusinessType(value);
                  setValue('businessType', value);
                  // Reset scenario when business type changes
                  const newBusinessType = getBusinessTypeById(value);
                  if (newBusinessType && newBusinessType.scenarios.length > 0) {
                    const firstScenario = newBusinessType.scenarios[0].id;
                    setSelectedScenario(firstScenario);
                    setValue('scenario', firstScenario);
                  }
                }}
              />
            </div>

            <div>
              <Label htmlFor="scenario">Scenario</Label>
              <ScenarioSelector
                businessType={selectedBusinessType}
                value={selectedScenario}
                onValueChange={(value) => {
                  setSelectedScenario(value);
                  setValue('scenario', value);
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Inputs</CardTitle>
            <CardDescription>
              Enter your business financial metrics. Values update automatically based on your selected scenario.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="monthlyRevenue">
                    Monthly Revenue ({currentCountry?.currencySymbol})
                  </Label>
                  <Input
                    id="monthlyRevenue"
                    type="number"
                    {...register('monthlyRevenue', { valueAsNumber: true })}
                    className={errors.monthlyRevenue ? 'border-destructive' : ''}
                  />
                  {errors.monthlyRevenue && (
                    <p className="text-sm text-destructive mt-1">{errors.monthlyRevenue.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="grossMargin">Gross Margin (%)</Label>
                  <Input
                    id="grossMargin"
                    type="number"
                    step="0.1"
                    {...register('grossMargin', { valueAsNumber: true })}
                    className={errors.grossMargin ? 'border-destructive' : ''}
                  />
                  {errors.grossMargin && (
                    <p className="text-sm text-destructive mt-1">{errors.grossMargin.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="marketingBudget">
                    Marketing Budget ({currentCountry?.currencySymbol})
                  </Label>
                  <Input
                    id="marketingBudget"
                    type="number"
                    {...register('marketingBudget', { valueAsNumber: true })}
                    className={errors.marketingBudget ? 'border-destructive' : ''}
                  />
                  {errors.marketingBudget && (
                    <p className="text-sm text-destructive mt-1">{errors.marketingBudget.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="operatingExpenses">
                    Operating Expenses ({currentCountry?.currencySymbol})
                  </Label>
                  <Input
                    id="operatingExpenses"
                    type="number"
                    {...register('operatingExpenses', { valueAsNumber: true })}
                    className={errors.operatingExpenses ? 'border-destructive' : ''}
                  />
                  {errors.operatingExpenses && (
                    <p className="text-sm text-destructive mt-1">{errors.operatingExpenses.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="employeeCosts">
                    Employee Costs ({currentCountry?.currencySymbol})
                  </Label>
                  <Input
                    id="employeeCosts"
                    type="number"
                    {...register('employeeCosts', { valueAsNumber: true })}
                    className={errors.employeeCosts ? 'border-destructive' : ''}
                  />
                  {errors.employeeCosts && (
                    <p className="text-sm text-destructive mt-1">{errors.employeeCosts.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="growthRate">Monthly Growth Rate (%)</Label>
                  <Input
                    id="growthRate"
                    type="number"
                    step="0.1"
                    {...register('growthRate', { valueAsNumber: true })}
                    className={errors.growthRate ? 'border-destructive' : ''}
                  />
                  {errors.growthRate && (
                    <p className="text-sm text-destructive mt-1">{errors.growthRate.message}</p>
                  )}
                </div>
              </div>

              {/* Optional Customer Metrics */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Customer Metrics (Optional)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="cac">
                      CAC ({currentCountry?.currencySymbol})
                    </Label>
                    <Input
                      id="cac"
                      type="number"
                      {...register('cac', { valueAsNumber: true })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="averageOrderValue">
                      Avg Order Value ({currentCountry?.currencySymbol})
                    </Label>
                    <Input
                      id="averageOrderValue"
                      type="number"
                      {...register('averageOrderValue', { valueAsNumber: true })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="churnRate">Monthly Churn Rate (%)</Label>
                    <Input
                      id="churnRate"
                      type="number"
                      step="0.1"
                      {...register('churnRate', { valueAsNumber: true })}
                    />
                  </div>
                </div>
              </div>

              {/* Projection Settings */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Projection Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="projectionMonths">Projection Period (Months)</Label>
                    <Input
                      id="projectionMonths"
                      type="number"
                      min="1"
                      max="60"
                      {...register('projectionMonths', { valueAsNumber: true })}
                      className={errors.projectionMonths ? 'border-destructive' : ''}
                    />
                    {errors.projectionMonths && (
                      <p className="text-sm text-destructive mt-1">{errors.projectionMonths.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="initialInvestment">
                      Initial Investment ({currentCountry?.currencySymbol}) (Optional)
                    </Label>
                    <Input
                      id="initialInvestment"
                      type="number"
                      {...register('initialInvestment', { valueAsNumber: true })}
                    />
                  </div>
                </div>
              </div>

              {/* Validation Errors */}
              {validationErrors.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Validation Messages</h4>
                  <div className="space-y-2">
                    {validationErrors.map((error, index) => (
                      <div
                        key={index}
                        className={`text-sm p-2 rounded ${
                          error.severity === 'error'
                            ? 'bg-destructive/10 text-destructive'
                            : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                        }`}
                      >
                        <strong>{error.field}:</strong> {error.message}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      <div>
        {results ? (
          <ROIResults 
            results={results} 
            currency={currentCountry?.currency || 'USD'}
            countryName={currentCountry?.name || 'United States'}
            businessType={currentBusinessType?.name || 'Business'}
            scenario={currentScenario?.name || 'Scenario'}
          />
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  Ready to Calculate ROI
                </h3>
                <p className="text-sm text-muted-foreground">
                  Enter your business details to see comprehensive ROI analysis
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}