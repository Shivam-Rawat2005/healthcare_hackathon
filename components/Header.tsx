
import React from 'react';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="border-b border-cyber-cyan/30 backdrop-blur-sm bg-cyber-navy/80 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-cyber-cyan cyber-text-glow" />
          <h1 className="text-2xl font-bold text-cyber-cyan cyber-text-glow">
            Deadlock Defender
          </h1>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-cyber-text hover:text-cyber-cyan transition-colors">Home</Link>
          <Link to="/detection" className="text-cyber-text hover:text-cyber-cyan transition-colors">Detection</Link>
          <Link to="/prevention" className="text-cyber-text hover:text-cyber-cyan transition-colors">Prevention</Link>
          <Link to="/about" className="text-cyber-text hover:text-cyber-cyan transition-colors">About</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
