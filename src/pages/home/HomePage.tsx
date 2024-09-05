import { FC } from 'react';
import Hero from '../../components/Hero';
import ParticipationReasons from '../../components/ParticipationReasons';
import ExploreChallenges from '../../components/ExploreChallenges';

const HomePage: FC = () => {
  return (
    <div>
      <Hero />
      <ParticipationReasons />
      <ExploreChallenges />
    </div>
  );
};

export default HomePage;
