import React, { useState } from "react";
import { Search, Filter } from "lucide-react";

interface Challenge {
  id: number;
  title: string;
  status: "Upcoming" | "Active" | "Past";
  image: string;
  startsIn?: { days: number; hours: number; mins: number };
  endsIn?: { days: number; hours: number; mins: number };
  startDate: Date;
  endDate: Date | null;
  level: "Easy" | "Medium" | "Hard";
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: "Data Science Bootcamp - Graded Datathon",
    status: "Upcoming",
    image: "/api/placeholder/300/200",
    startsIn: { days: 0, hours: 15, mins: 22 },
    startDate: new Date("2024-09-10T10:00:00"),
    endDate: null, // No end date for upcoming challenges
    level: "Medium",
  },
  {
    id: 2,
    title: "Data Sprint 72 - Butterfly Identification",
    status: "Upcoming",
    image: "/api/placeholder/300/200",
    startsIn: { days: 0, hours: 12, mins: 34 },
    startDate: new Date("2024-09-09T14:00:00"),
    endDate: null,
    level: "Hard",
  },
  {
    id: 3,
    title: "Data Sprint 71 - Weather Recognition",
    status: "Active",
    image: "/api/placeholder/300/200",
    endsIn: { days: 1, hours: 17, mins: 10 },
    startDate: new Date("2024-09-02T09:00:00"),
    endDate: new Date("2024-09-07T17:00:00"),
    level: "Easy",
  },
  // Add more challenge objects as needed
];

const ExploreChallenges: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<{ status: string[]; level: string[] }>({
    status: [],
    level: [],
  });
  const [sortOrder, setSortOrder] = useState<string>("newest");

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
      return challenge.title.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      } else {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
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
              {challenge.status === "Upcoming" ? (
                <p>
                  Starts in: {challenge.startsIn?.days}d{" "}
                  {challenge.startsIn?.hours}h {challenge.startsIn?.mins}m
                </p>
              ) : challenge.status === "Active" ? (
                <p>
                  Ends in: {challenge.endsIn?.days}d {challenge.endsIn?.hours}h{" "}
                  {challenge.endsIn?.mins}m
                </p>
              ) : (
                <p>
                  Started: {challenge.startDate.toLocaleDateString()}
                  <br />
                  Ended: {challenge.endDate?.toLocaleDateString()}
                </p>
              )}
              <button
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md w-full"
                onClick={() => navigateToChallengePage(challenge.id)}
              >
                Participate Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Function to navigate to the challenge detail page
const navigateToChallengePage = (id: number) => {
  window.location.href = `/challenge/${id}`; // or use a router if you have one
};

export default ExploreChallenges;
