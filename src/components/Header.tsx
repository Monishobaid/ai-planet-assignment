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
      </div>
    </header>
  );
};

export default Header;
