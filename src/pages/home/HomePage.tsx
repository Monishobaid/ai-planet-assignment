import React, { useEffect } from 'react';
import Hero from '../../components/Hero';
import ParticipationReasons from '../../components/ParticipationReasons';
import ExploreChallenges from '../../components/ExploreChallenges';

const HomePage = () => {

  return (
    <div className="">
      <Hero />
      <ParticipationReasons />
      <ExploreChallenges />
    </div>
  );
};

export default HomePage;