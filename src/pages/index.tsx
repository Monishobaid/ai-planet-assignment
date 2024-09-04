import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import HomePage from './home/HomePage';
import CreateChallengePage from './Create';
import ChallengeUI from './Challenge/[id]';


const App = () => {
  return (
      <div className="bg-[#0B2447] min-h-screen text-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateChallengePage />} />
          <Route path="/challenge/:id" element={<ChallengeUI/>} />
        </Routes>
      </div>
  );
};

export default App;