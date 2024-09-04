import React from "react";

interface FilterPanelProps {
  filters: { status: string[]; level: string[] };
  onFilterChange: (filters: { status: string[]; level: string[] }) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  const handleFilterChange = (type: "status" | "level", value: string) => {
    const updatedFilters = {
      ...filters,
      [type]: filters[type].includes(value)
        ? filters[type].filter((v) => v !== value)
        : [...filters[type], value],
    };
    onFilterChange(updatedFilters);
  };

  return (
    <div className="bg-white bg-opacity-10 p-4 rounded-md mb-6">
      <h3 className="font-semibold mb-2">Status</h3>
      <div className="space-y-2">
        {["Active", "Upcoming", "Past"].map((status) => (
          <label key={status} className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={filters.status.includes(status)}
              onChange={() => handleFilterChange("status", status)}
            />
            {status}
          </label>
        ))}
      </div>
      <h3 className="font-semibold mt-4 mb-2">Level</h3>
      <div className="space-y-2">
        {["Easy", "Medium", "Hard"].map((level) => (
          <label key={level} className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={filters.level.includes(level)}
              onChange={() => handleFilterChange("level", level)}
            />
            {level}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;