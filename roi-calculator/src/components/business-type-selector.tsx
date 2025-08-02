'use client';

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectSeparator,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { businessTypes, businessCategories, getBusinessTypeById } from '@/data/businessTypes';
import { cn } from '@/lib/utils';

interface BusinessTypeSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function BusinessTypeSelector({ value, onValueChange, className }: BusinessTypeSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBusinessTypes = useMemo(() => {
    if (!searchQuery) return businessTypes;
    
    return businessTypes.filter(businessType => 
      businessType.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      businessType.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      businessType.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const groupedBusinessTypes = useMemo(() => {
    const grouped: Record<string, typeof businessTypes> = {};
    businessCategories.forEach(category => {
      grouped[category] = filteredBusinessTypes.filter(bt => bt.category === category);
    });
    return grouped;
  }, [filteredBusinessTypes]);

  const selectedBusinessType = getBusinessTypeById(value);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue>
          {selectedBusinessType ? (
            <div className="flex items-center gap-2">
              <span className="text-lg">{selectedBusinessType.icon}</span>
              <div>
                <span className="font-medium">{selectedBusinessType.name}</span>
                <span className="text-muted-foreground text-sm ml-2">
                  ({selectedBusinessType.scenarios.length} scenarios)
                </span>
              </div>
            </div>
          ) : (
            "Select a business type..."
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="max-h-[400px]">
        <div className="flex items-center border-b px-3 pb-2 mb-2">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder="Search business types..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        
        {Object.keys(groupedBusinessTypes).some(category => groupedBusinessTypes[category].length > 0) ? (
          Object.entries(groupedBusinessTypes).map(([category, types]) => {
            if (types.length === 0) return null;
            
            return (
              <div key={category}>
                <SelectLabel>{category}</SelectLabel>
                {types.map((businessType) => (
                  <SelectItem key={businessType.id} value={businessType.id}>
                    <div className="flex items-start gap-3 w-full">
                      <span className="text-lg mt-0.5">{businessType.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{businessType.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-2">
                          {businessType.description}
                        </div>
                        <div className="text-xs text-primary mt-1">
                          {businessType.scenarios.length} scenarios available
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
                <SelectSeparator />
              </div>
            );
          })
        ) : (
          <div className="py-6 text-center text-sm text-muted-foreground">
            No business types found.
          </div>
        )}
      </SelectContent>
    </Select>
  );
}