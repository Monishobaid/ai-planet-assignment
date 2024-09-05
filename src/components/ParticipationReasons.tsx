import React from "react";
import {reasons} from "../data/ChallengesData";

const ParticipationReasons: React.FC = () => {
  return (
    <div className="bg-white width-full py-10 mt-4">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Why Participate in{" "}
        <span className="text-green-600">AI Challenges?</span>
      </h2>
      <div className="grid grid-cols-1 mt-16 md:grid-cols-2 gap-24 px-6 md:px-12 lg:px-24">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="bg-[#F8F9FD] shadow-lg p-6 rounded-lg transition-transform transform hover:scale-105"
          >
            <img
              src={reason.icon}
              alt={reason.title}
              className="mb-4 w-12 h-12 text-green-600"
            />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              {reason.title}
            </h3>
            <p className="text-gray-600">{reason.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipationReasons;
