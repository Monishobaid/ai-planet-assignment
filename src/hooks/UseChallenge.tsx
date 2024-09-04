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

export const useChallenge = (searchTerm: string, sortOrder: string) => {
  const [challenges, setChallenges] = useState<EnhancedChallenge[]>([]);
  const [filters, setFilters] = useState<{ status: string[]; level: string[] }>(
    {
      status: [],
      level: [],
    }
  );

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

    const enhancedChallenges = combinedChallenges.map((challenge) => {
      const now = new Date();
      const startDate = new Date(challenge.startDate);
      const endDate = challenge.endDate ? new Date(challenge.endDate) : null;

      let status: "Upcoming" | "Active" | "Past";
      let timeRemaining = null;

      if (startDate > now) {
        status = "Upcoming";
        const diff = startDate.getTime() - now.getTime();
        timeRemaining = {
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        };
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
        status = "Past";
      }

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
