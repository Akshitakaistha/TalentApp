import React from 'react';
import { FilterOption } from '../../types';

interface FilterBarProps {
  filters: {
    [key: string]: {
      label: string;
      options: FilterOption[];
      type: 'dropdown' | 'radio' | 'checkbox' | 'range';
    };
  };
  onFilterChange: (filterKey: string, value: string | string[]) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-gray-200 max-w-screen-xl mx-auto mb-8">
      <div className="flex flex-wrap gap-6 items-center justify-center">
        {Object.entries(filters).map(([key, filter]) => (
          <div key={key} className="flex flex-col min-w-[160px]">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              {filter.label}
            </label>

            {/* Dropdown */}
            {filter.type === 'dropdown' && (
              <select
                className="px-4 py-2 rounded-lg text-black border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                onChange={(e) => onFilterChange(key, e.target.value)}
                defaultValue=""
              >
                <option value="">{`All ${filter.label}`}</option>
                {filter.options.map((option) => (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}

            {/* Radio */}
            {filter.type === 'radio' && (
              <div className="flex flex-col space-y-1 mt-1">
                {filter.options.map((option) => (
                  <label key={option.id} className="inline-flex items-center text-sm text-gray-700">
                    <input
                      type="radio"
                      name={key}
                      value={option.value}
                      className="rounded border border-gray-300 text-cyan-600 focus:ring-cyan-500"
                      onChange={() => onFilterChange(key, option.value)}
                    />
                    <span className="ml-2">{option.label}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Checkbox */}
            {filter.type === 'checkbox' && (
              <div className="flex flex-col space-y-1 mt-1">
                {filter.options.map((option) => (
                  <label key={option.id} className="inline-flex items-center text-sm text-gray-700">
                    <input
                      type="checkbox"
                      value={option.value}
                      className="rounded border border-gray-300 text-cyan-600 focus:ring-cyan-500"
                      onChange={() => onFilterChange(key, option.value)}
                    />
                    <span className="ml-2">{option.label}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Range */}
            {filter.type === 'range' && (
              <div className="flex items-center space-x-2 mt-1">
                <input
                  type="range"
                  className="w-full h-2 rounded-full bg-cyan-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  min={0}
                  max={100}
                  onChange={(e) => onFilterChange(key, e.target.value)}
                />
                <span className="text-xs text-gray-500">Adjust</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
