'use client';

import React, { useState, useMemo } from 'react';
import { Check, Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { countries, getCountryById } from '@/data/countries';
import { cn } from '@/lib/utils';

interface CountrySelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function CountrySelector({ value, onValueChange, className }: CountrySelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return countries.filter(c => c.active);
    
    return countries.filter(country => 
      country.active && (
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.currency.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  const selectedCountry = getCountryById(value);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue>
          {selectedCountry ? (
            <div className="flex items-center gap-2">
              <span className="text-lg">{selectedCountry.flag}</span>
              <span>{selectedCountry.name}</span>
              <span className="text-muted-foreground text-sm">
                ({selectedCountry.currency})
              </span>
            </div>
          ) : (
            "Select a country..."
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <div className="flex items-center border-b px-3 pb-2 mb-2">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder="Search countries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        {filteredCountries.length === 0 ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            No countries found.
          </div>
        ) : (
          filteredCountries.map((country) => (
            <SelectItem key={country.id} value={country.id}>
              <div className="flex items-center gap-2 w-full">
                <span className="text-lg">{country.flag}</span>
                <div className="flex-1">
                  <div className="font-medium">{country.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {country.currency} • Tax: {country.taxRates.corporateTax}%
                    {country.vatRate ? ` • VAT: ${country.vatRate}%` : ''}
                  </div>
                </div>
                {country.economicIndicators.businessEaseRank <= 10 && (
                  <div className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                    Top 10
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