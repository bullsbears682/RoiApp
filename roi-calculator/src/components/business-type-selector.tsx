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
  SelectGroup
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
    if (!searchQuery.trim()) return businessTypes;
    
    const query = searchQuery.toLowerCase();
    return businessTypes.filter(
      (type) =>
        type.name.toLowerCase().includes(query) ||
        type.description.toLowerCase().includes(query) ||
        type.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const groupedBusinessTypes = useMemo(() => {
    const groups: Record<string, typeof businessTypes> = {};
    
    businessCategories.forEach(category => {
      groups[category] = [];
    });

    filteredBusinessTypes.forEach(type => {
      if (groups[type.category]) {
        groups[type.category].push(type);
      }
    });

    return groups;
  }, [filteredBusinessTypes]);

  const selectedBusinessType = getBusinessTypeById(value);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder="Select business type">
          {selectedBusinessType && (
            <div className="flex items-center gap-2">
              <span>{selectedBusinessType.icon}</span>
              <span>{selectedBusinessType.name}</span>
              <span className="text-xs text-muted-foreground">
                ({selectedBusinessType.scenarios.length} scenarios)
              </span>
            </div>
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
              <SelectGroup key={category}>
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
              </SelectGroup>
            );
          })
        ) : (
          <div className="py-6 text-center text-sm text-muted-foreground">
            No business types found matching "{searchQuery}"
          </div>
        )}
      </SelectContent>
    </Select>
  );
}