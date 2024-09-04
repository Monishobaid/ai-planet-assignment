import React from "react";

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const SortSelect: React.FC<SortSelectProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="ml-4 bg-white bg-opacity-10 p-2 rounded-md"
    >
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
    </select>
  );
};

export default SortSelect;