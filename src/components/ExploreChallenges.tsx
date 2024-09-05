import React, { useState } from "react";
import SearchBar from "./SearchBar";
import FilterButton from "./FilterButton";
import SortSelect from "./SortSelection";
import FilterPanel from "./FilterPanel";
import ChallengeCard from "./ChallengeCard";
import { useChallenge } from "../hooks/UseChallenge";

const ExploreChallenges: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<string>("newest");

  const { filters, setFilters, filteredChallenges } = useChallenge(
    searchTerm,
    sortOrder
  );

  const toggleFilter = () => setFilterOpen(!filterOpen);

  return (
    <div className="p-16">
      <h2 className="text-3xl font-bold mb-8">Explore Challenges</h2>
      <div className="flex justify-between mb-6">
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        <FilterButton onClick={toggleFilter} />
        <SortSelect value={sortOrder} onChange={setSortOrder} />
      </div>
      {filterOpen && (
        <FilterPanel filters={filters} onFilterChange={setFilters} />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
};

export default ExploreChallenges;
