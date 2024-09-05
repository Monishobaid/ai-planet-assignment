import { FC } from "react";
import Hero from "../../components/Hero";
import ParticipationReasons from "../../components/ParticipationReasons";
import ExploreChallenges from "../../components/ExploreChallenges";
import Stats from "../../components/Stats";

const HomePage: FC = () => {
  return (
    <div>
      <Hero />
      <Stats />
      <ParticipationReasons />
      <ExploreChallenges />
    </div>
  );
};

export default HomePage;
