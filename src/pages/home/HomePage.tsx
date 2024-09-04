import React from 'react';
import Hero from '../../components/Hero';
import ParticipationReasons from '../../components/ParticipationReasons';
import ExploreChallenges from '../../components/ExploreChallenges';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <ParticipationReasons />
      <ExploreChallenges />
    </div>
  );
};

export default HomePage;