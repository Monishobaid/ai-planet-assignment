import React from 'react';

const reasons = [
  {
    icon: "📊",
    title: "Prove your skills",
    description: "Gain substantial experience by solving real-world problems and pit against others to come up with innovative solutions."
  },
  {
    icon: "👥",
    title: "Learn from community",
    description: "One can look and analyze the solutions submitted by the other Data Scientists in the community and learn from them."
  },
  {
    icon: "🏆",
    title: "Challenge yourself",
    description: "There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder."
  },
  {
    icon: "🌟",
    title: "Earn recognition",
    description: "You will stand out from the crowd if you do well in AI challenges, it not only helps you shine in the community but also earns rewards."
  }
];

const ParticipationReasons = () => {
  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Why Participate in AI Challenges?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reasons.map((reason, index) => (
          <div key={index} className="bg-white bg-opacity-10 p-6 rounded-lg">
            <div className="text-4xl mb-4">{reason.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
            <p className="text-gray-300">{reason.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipationReasons;