import { useState, useEffect } from "react";
import { Challenge } from "../types";
import { challenges as defaultChallenges } from "../data/ChallengesData";

interface EnhancedChallenge extends Challenge {
  status: "Upcoming" | "Active" | "Past";
  timeRemaining: {
    days: number;
    hours: number;
    minutes: number;
  } | null;
}

/**
 * Custom hook for managing challenges.
 *
 * @param searchTerm - The search term for filtering challenges by title.
 * @param sortOrder - The sort order for the challenges (either "newest" or "oldest").
 * @returns An object containing the challenges, filters, setFilters, and filteredChallenges.
 */

export const useChallenge = (searchTerm: string, sortOrder: string) => {
  const [challenges, setChallenges] = useState<EnhancedChallenge[]>([]);
  const [filters, setFilters] = useState<{ status: string[]; level: string[] }>(
    {
      status: [],
      level: [],
    }
  );

    // This useEffect fetches challenge data from localStorage and combines it with default challenges.
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

    // Here, I enhance each challenge with its status (Upcoming, Active, Past) and calculate the time remaining.
    const enhancedChallenges = combinedChallenges.map((challenge) => {
      const now = new Date();
      const startDate = new Date(challenge.startDate);
      const endDate = challenge.endDate ? new Date(challenge.endDate) : null;

      let status: "Upcoming" | "Active" | "Past";
      let timeRemaining = null;
       // If the start date is in the future, the challenge is "Upcoming", and I calculate the time remaining.  
      if (startDate > now) {
        status = "Upcoming";
        const diff = startDate.getTime() - now.getTime();
        timeRemaining = {
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        };
        // If the current time is between the start and end date, the challenge is "Active".
      } else if (!endDate || endDate > now) {
        status = "Active";
        if (endDate) {
          const diff = endDate.getTime() - now.getTime();
          timeRemaining = {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor(
              (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            ),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          };
        }
      } else {
        // Else the challenge is "Past".
        status = "Past";
      }
      
      // I return the enhanced challenge with its status and time remaining.
      return { ...challenge, status, timeRemaining };
    });

    localStorage.setItem("challenges", JSON.stringify(enhancedChallenges));
    setChallenges(enhancedChallenges);
  }, []);

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
        ? challenge.title &&
            challenge.title.toLowerCase().includes(searchTerm.toLowerCase())
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

  return { challenges, filters, setFilters, filteredChallenges };
};
