import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/icons/main_logo_with_darktext_dphi 1.svg';

const Header: React.FC = () => {
  return (
    <header className="bg-white py-4">
      <div className="px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            src={Logo}
            alt="DPhi logo"
            className="mr-2"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
