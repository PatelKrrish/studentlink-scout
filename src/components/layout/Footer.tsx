
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-secondary text-secondary-foreground py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">TalentBridge</h3>
            <p className="text-sm text-secondary-foreground/70">
              Connecting students with the right opportunities.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <p className="text-sm text-secondary-foreground/70">
              Email: support@talentbridge.edu
            </p>
            <p className="text-sm text-secondary-foreground/70">
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-secondary-foreground/70">
            &copy; {new Date().getFullYear()} TalentBridge. All rights reserved.
          </p>
          <p className="text-sm text-secondary-foreground/70 mt-2">
            Powered by The MERN Technologies
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
