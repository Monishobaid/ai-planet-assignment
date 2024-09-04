import React, { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import { challenges as defaultChallenges } from "../data/ChallengesData";
import { Challenge } from "../types";

const ExploreChallenges: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<{ status: string[]; level: string[] }>(
    {
      status: [],
      level: [],
    }
  );
  const [sortOrder, setSortOrder] = useState<string>("newest");
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    const storedChallenges = localStorage.getItem("challenges");
    let combinedChallenges = [];

    if (storedChallenges) {
      const parsedStoredChallenges = JSON.parse(storedChallenges);
      combinedChallenges = [...parsedStoredChallenges, ...defaultChallenges];
    } else {
      combinedChallenges = [...defaultChallenges];
    }
    combinedChallenges = combinedChallenges.filter(
      (challenge, index, self) =>
        index === self.findIndex((ch) => ch.id === challenge.id)
    );
    localStorage.setItem("challenges", JSON.stringify(combinedChallenges));
    setChallenges(combinedChallenges);
  }, [defaultChallenges]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const handleFilterChange = (type: "status" | "level", value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: prevFilters[type].includes(value)
        ? prevFilters[type].filter((v) => v !== value)
        : [...prevFilters[type], value],
    }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const filteredChallenges = challenges
    .filter((challenge) => {
      if (
        filters.status.length > 0 &&
        !filters.status.includes(challenge.status)
      ) {
        return false;
      }
      if (
        filters.level.length > 0 &&
        !filters.level.includes(challenge.level)
      ) {
        return false;
      }
      return searchTerm
        ? challenge.title.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return (
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
      } else {
        return (
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
      }
    });

  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold mb-8">Explore Challenges</h2>
      <div className="flex justify-between mb-6">
        <div className="relative flex-grow mr-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-white bg-opacity-10 py-2 pl-10 pr-4 rounded-md"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button
          className="bg-white bg-opacity-10 p-2 rounded-md"
          onClick={toggleFilter}
        >
          <Filter />
        </button>
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="ml-4 bg-white bg-opacity-10 p-2 rounded-md"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
      {filterOpen && (
        <div className="bg-white bg-opacity-10 p-4 rounded-md mb-6">
          <h3 className="font-semibold mb-2">Status</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                onChange={() => handleFilterChange("status", "Active")}
              />{" "}
              Active
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                onChange={() => handleFilterChange("status", "Upcoming")}
              />{" "}
              Upcoming
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                onChange={() => handleFilterChange("status", "Past")}
              />{" "}
              Past
            </label>
          </div>
          <h3 className="font-semibold mt-4 mb-2">Level</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                onChange={() => handleFilterChange("level", "Easy")}
              />{" "}
              Easy
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                onChange={() => handleFilterChange("level", "Medium")}
              />{" "}
              Medium
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                onChange={() => handleFilterChange("level", "Hard")}
              />{" "}
              Hard
            </label>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-white bg-opacity-10 rounded-lg overflow-hidden"
          >
            <img
              src={challenge.image}
              alt={challenge.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <span className="inline-block bg-yellow-400 text-[#0B2447] px-2 py-1 rounded-full text-sm font-semibold mb-2">
                {challenge.status}
              </span>
              <h3 className="text-lg font-semibold mb-2">{challenge.title}</h3>
              <p className="text-sm text-gray-300 mb-2">
                Level: {challenge.level}
              </p>
              <p className="text-sm text-gray-300">
                {challenge.status === "Upcoming" && challenge.startsIn
                  ? `Starts in: ${challenge.startsIn.days}d ${challenge.startsIn.hours}h ${challenge.startsIn.mins}m`
                  : challenge.status === "Active" && challenge.endsIn
                  ? `Ends in: ${challenge.endsIn.days}d ${challenge.endsIn.hours}h ${challenge.endsIn.mins}m`
                  : `Started on: ${new Date(
                      challenge.startDate
                    ).toDateString()}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreChallenges;
