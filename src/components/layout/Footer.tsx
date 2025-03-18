
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-wrap justify-center md:justify-start space-x-4 mb-4 md:mb-0">
          <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
            Contact
          </Link>
          <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
            Privacy
          </Link>
          <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
            Terms
          </Link>
        </div>
        <div className="text-sm text-muted-foreground flex flex-col items-center md:items-end">
          <div>© {new Date().getFullYear()} TalentBridge. All rights reserved.</div>
          <div className="mt-1 font-medium">Powered by The MERN Technologies</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
