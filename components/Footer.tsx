
import React from 'react';
import { Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-cyber-cyan/30 mt-12 py-6 bg-cyber-navy">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Shield className="h-6 w-6 text-cyber-cyan" />
            <span className="text-lg font-semibold text-cyber-cyan">Deadlock Defender</span>
          </div>
          <p className="text-sm text-cyber-text/70">
            © {new Date().getFullYear()} Deadlock Defender. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
