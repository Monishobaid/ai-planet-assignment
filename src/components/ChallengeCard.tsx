import React from "react";
import { Challenge } from "../types";
import { Link } from "react-router-dom";

interface EnhancedChallenge extends Challenge {
  status: "Upcoming" | "Active" | "Past";
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
      case "Upcoming":
        return "bg-yellow-200 text-black";
      case "Active":
        return "bg-green-400 text-white";
      case "Past":
        return "bg-gray-400 text-white";
      default:
        return "bg-blue-400";
    }
  };

  const formatTimeRemaining = (
    time: { days: number; hours: number; minutes: number } | null
  ) => {
    if (!time) return "00 : 00 : 00";
    return `${time.days < 10 ? `0${time.days}` : time.days} : ${
      time.hours < 10 ? `0${time.hours}` : time.hours
    } : ${time.minutes < 10 ? `0${time.minutes}` : time.minutes}`;
  };

  return (
    <div className="max-w-sm bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 text-black">
      <img
        src={challenge.image}
        alt={challenge.title}
        className="w-full h-36 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-center mb-2">
          <span
            className={`inline-block ${getStatusColor(
              challenge.status
            )} px-3 py-1 rounded-full text-sm font-medium`}
          >
            {challenge.status}
          </span>
        </div>
        <h3 className="text-xl font-bold text-center mb-4">
          {challenge.title} {JSON.stringify(challenge.timeRemaining)}
        </h3>

        {challenge.status === "Upcoming" && challenge.timeRemaining && (
          <>
            <p className="text-center text-gray-600 text-sm mb-2">Starts in </p>
            <div className="flex justify-center items-center space-x-4 text-2xl font-semibold">
              <div className="flex flex-col items-center">
                <span>
                  {formatTimeRemaining(challenge.timeRemaining).split(" : ")[0]}
                </span>
                <span className="text-xs text-gray-500">Days</span>
              </div>
              <span>:</span>
              <div className="flex flex-col items-center">
                <span>
                  {formatTimeRemaining(challenge.timeRemaining).split(" : ")[1]}
                </span>
                <span className="text-xs text-gray-500">Hours</span>
              </div>
              <span>:</span>
              <div className="flex flex-col items-center">
                <span>
                  {formatTimeRemaining(challenge.timeRemaining).split(" : ")[2]}
                </span>
                <span className="text-xs text-gray-500">Mins</span>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-center mt-6">
          <Link
            to={`/challenge/${challenge.id}`}
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-green-600"
          >
            Participate Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
