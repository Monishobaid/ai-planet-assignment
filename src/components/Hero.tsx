import React from 'react';
import { Link } from 'react-router-dom';
import Rocket from '../assets/icons/PicsArt_04-14-04.42 1.svg';

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between bg-[#003145] py-8 px-4 lg:px-16">
      <div className="lg:max-w-2xl text-center lg:text-left">
        <h1 className="text-3xl lg:text-5xl font-bold mb-8 text-white">
          Accelerate Innovation with Global AI Challenges
        </h1>
        <p className="text-base lg:text-lg mb-8 text-white">
          AI Challenges at DPhi simulate real-world problems. It is a great place to put your AI/Data Science skills to the test on diverse datasets, allowing you to foster learning through competitions.
        </p>
        <Link
          to="/create"
          className="bg-white text-[#0B2447] px-6 py-3 rounded-md font-medium text-lg"
        >
          Create Challenge
        </Link>
      </div>
      <img
        src={Rocket}
        alt="Rocket illustration"
        className="w-full lg:w-1/3 mb-6 lg:mb-0"
      />
    </div>
  );
};

export default Hero;
