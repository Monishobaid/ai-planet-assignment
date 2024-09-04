import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-[#0B2447] py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            src="/api/placeholder/40/40"
            alt="DPhi logo"
            className="mr-2"
          />
          <span className="text-xl font-bold">DPhi</span>
        </Link>
        <nav>
          <Link
            to="/create"
            className="bg-white text-[#0B2447] px-4 py-2 rounded-md font-medium"
          >
            Create Challenge
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
