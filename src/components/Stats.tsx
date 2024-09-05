import React from "react";
import AIIcon from "../assets/icons/Group 1000002515.svg";
import DataIcon from "../assets/icons/Group 1000002516.svg";
import ChallengesIcon from "../assets/icons/Group 1000002518.svg";

const stats = [
  {
    icon: AIIcon,
    number: "100K+",
    label: "AI model submissions",
  },
  {
    icon: DataIcon,
    number: "50K+",
    label: "Data Scientists",
  },
  {
    icon: ChallengesIcon,
    number: "100+",
    label: "AI Challenges hosted",
  },
];

const StatisticsSection: React.FC = () => {
  return (
    <div className="bg-[#002A3B] py-10 flex justify-center">
      <div className="flex flex-col md:flex-row items-center justify-center text-white gap-12">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center">
            <img src={stat.icon} alt={stat.label} className="w-12 h-12 mr-4" />
            <div className="text-left">
              <h3 className="text-2xl font-bold">{stat.number}</h3>
              <p className="text-sm">{stat.label}</p>
            </div>
            {index < stats.length - 1 && (
              <div className="mx-6 hidden md:block border-l-2 border-white h-12" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsSection;
