import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import HomePage from './home/HomePage';
import CreateChallengePage from './Create';

const App = () => {
  return (
      <div className="bg-[#0B2447] min-h-screen text-white">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateChallengePage />} />
        </Routes>
      </div>
  );
};

export default App;