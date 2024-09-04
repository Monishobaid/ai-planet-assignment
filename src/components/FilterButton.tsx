import React from "react";
import { Filter } from "lucide-react";

interface FilterButtonProps {
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onClick }) => {
  return (
    <button
      className="bg-white bg-opacity-10 p-2 rounded-md"
      onClick={onClick}
    >
      <Filter />
    </button>
  );
};

export default FilterButton;