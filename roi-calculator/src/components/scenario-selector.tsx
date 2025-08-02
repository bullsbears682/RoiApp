'use client';

import React, { useMemo } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getBusinessTypeById, getScenarioById } from '@/data/businessTypes';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/data/countries';

interface ScenarioSelectorProps {
  businessType: string;
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function ScenarioSelector({ businessType, value, onValueChange, className }: ScenarioSelectorProps) {
  const currentBusinessType = useMemo(() => getBusinessTypeById(businessType), [businessType]);
  const selectedScenario = useMemo(() => getScenarioById(businessType, value), [businessType, value]);
  
  const scenarios = currentBusinessType?.scenarios || [];

  if (!currentBusinessType) {
    return (
      <Select disabled>
        <SelectTrigger className={cn("w-full", className)}>
          <SelectValue placeholder="Select a business type first..." />
        </SelectTrigger>
      </Select>
    );
  }

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue>
          {selectedScenario ? (
            <div className="flex items-center justify-between w-full">
              <div>
                <span className="font-medium">{selectedScenario.name}</span>
                <span className="text-muted-foreground text-sm ml-2">
                  ${selectedScenario.defaultInputs.monthlyRevenue.toLocaleString()}/mo
                </span>
              </div>
            </div>
          ) : (
            "Select a scenario..."
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="max-h-[400px]">
        {scenarios.length === 0 ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            No scenarios available for this business type.
          </div>
        ) : (
          scenarios.map((scenario) => (
            <SelectItem key={scenario.id} value={scenario.id}>
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{scenario.name}</span>
                  <span className="text-sm text-primary font-medium">
                    ${scenario.defaultInputs.monthlyRevenue.toLocaleString()}/mo
                  </span>
                </div>
                <div className="text-xs text-muted-foreground line-clamp-2">
                  {scenario.description}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                  <span>Margin: {scenario.defaultInputs.grossMargin}%</span>
                  <span>Growth: {scenario.assumptions.growthRate}%</span>
                  {scenario.defaultInputs.churnRate && (
                    <span>Churn: {scenario.defaultInputs.churnRate}%</span>
                  )}
                </div>
                {/* Industry benchmarks preview */}
                {Object.keys(scenario.assumptions.industryBenchmarks).length > 0 && (
                  <div className="text-xs text-primary/70 mt-1">
                    Benchmarks: {Object.keys(scenario.assumptions.industryBenchmarks).slice(0, 2).join(', ')}
                    {Object.keys(scenario.assumptions.industryBenchmarks).length > 2 && '...'}
                  </div>
                )}
              </div>
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}