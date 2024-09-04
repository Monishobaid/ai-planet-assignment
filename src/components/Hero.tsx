import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="flex items-center justify-between py-16">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">Accelerate Innovation with Global AI Challenges</h1>
        <p className="text-lg mb-6">
          AI Challenges at DPhi simulate real-world problems. It is a great place to put your AI/Data Science skills to test on diverse datasets allowing you to foster learning through competitions.
        </p>
        <Link to="/create" className="bg-white text-[#0B2447] px-6 py-3 rounded-md font-medium text-lg">
          Create Challenge
        </Link>
      </div>
      <img src="/api/placeholder/300/300" alt="Rocket illustration" className="w-1/3" />
    </div>
  );
};

export default Hero;