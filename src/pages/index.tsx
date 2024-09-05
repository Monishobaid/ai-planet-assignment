import { Route, Routes } from 'react-router-dom';
import HomePage from './home/HomePage';
import CreateChallengePage from './Create';
import ChallengeUI from './Challenge/[id]';

const App: React.FC = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateChallengePage />} />
        <Route path="/challenge/:id" element={<ChallengeUI />} />
      </Routes>
    </div>
  );
};

export default App;
