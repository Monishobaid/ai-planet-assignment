import React from "react";
import { Challenge } from "../types";

interface EnhancedChallenge extends Challenge {
  status: 'Upcoming' | 'Active' | 'Past';
  timeRemaining: {
    days: number;
    hours: number;
    minutes: number;
  } | null;
}

interface ChallengeCardProps {
  challenge: EnhancedChallenge;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-yellow-400';
      case 'Active':
        return 'bg-green-400';
      case 'Past':
        return 'bg-gray-400';
      default:
        return 'bg-blue-400';
    }
  };

  const formatTimeRemaining = (time: { days: number; hours: number; minutes: number } | null) => {
    if (!time) return '';
    return `${time.days}d ${time.hours}h ${time.minutes}m`;
  };

  return (
    <div className="bg-white bg-opacity-10 rounded-lg overflow-hidden">
      <img
        src={challenge.image}
        alt={challenge.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <span className={`inline-block ${getStatusColor(challenge.status)} text-[#0B2447] px-2 py-1 rounded-full text-sm font-semibold mb-2`}>
          {challenge.status}
        </span>
        <h3 className="text-lg font-semibold mb-2">{challenge.title}</h3>
        <p className="text-sm text-gray-300 mb-2">Level: {challenge.level}</p>
        <p className="text-sm text-gray-300">
          {challenge.status === "Upcoming"
            ? `Starts in: ${formatTimeRemaining(challenge.timeRemaining)}`
            : challenge.status === "Active"
            ? `Ends in: ${formatTimeRemaining(challenge.timeRemaining)}`
            : `Started on: ${new Date(challenge.startDate).toDateString()}`}
        </p>
      </div>
    </div>
  );
};

export default ChallengeCard;