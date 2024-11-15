import React, { useState, useEffect } from 'react';
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Button } from "./button";

interface FlexibleDateInputProps {
  label: string;
  value: string;
  onChange: (value: string | null) => void;
}

export const FlexibleDateInput: React.FC<FlexibleDateInputProps> = ({
  label,
  value,
  onChange,
}) => {
  // Parse the initial value if it exists
  const [day, month, year] = React.useMemo(() => {
    if (!value) return ['', 'January', '2024'];
    
    const parts = value.split(' ');
    if (parts.length === 2) {
      // If only month and year are present
      return ['', ...parts];
    } else if (parts.length === 3) {
      // If day, month, and year are all present
      return parts;
    }
    // Default values if parsing fails
    return ['', 'January', '2024'];
  }, [value]);

  // Days as strings (1, 2, 3, etc.)
  const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);

  // Months as full names
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Years as strings
  const years = Array.from({ length: 136 }, (_, i) => `${1900 + i}`);

  const handleChange = (type: 'day' | 'month' | 'year', newValue: string | undefined) => {
    let newDay = type === 'day' ? (newValue === 'clear' ? '' : newValue) : day;
    let newMonth = type === 'month' ? newValue : month;
    let newYear = type === 'year' ? newValue : year;

    // Always require month and year
    if (!newMonth || !newYear) return;

    const dateString = [newDay, newMonth, newYear]
      .filter(Boolean)
      .join(' ');
    onChange(dateString || null);
  };

  return (
    <div className="flex gap-2">
      <Select
        value={day || 'clear'}
        onValueChange={(value) => handleChange('day', value)}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Day" />
        </SelectTrigger>
        <SelectContent className="max-h-[200px] overflow-y-auto bg-white">
          <SelectItem value="clear">No Day</SelectItem>
          {days.map((d) => (
            <SelectItem key={d} value={d} className="hover:bg-gray-100">
              {d}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={month}
        onValueChange={(value) => handleChange('month', value)}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent className="max-h-[200px] overflow-y-auto bg-white">
          {months.map((m) => (
            <SelectItem key={m} value={m} className="hover:bg-gray-100">
              {m}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={year}
        onValueChange={(value) => handleChange('year', value)}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent className="max-h-[200px] overflow-y-auto bg-white">
          {years.map((y) => (
            <SelectItem key={y} value={y} className="hover:bg-gray-100">
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
