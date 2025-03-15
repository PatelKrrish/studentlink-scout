
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, X, LogIn, UserPlus } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const getLinkClassName = (path: string) => {
    const baseClass = 'px-4 py-2 rounded-lg transition-all duration-300';
    return location.pathname === path
      ? `${baseClass} bg-primary/10 text-primary font-medium`
      : `${baseClass} hover:bg-secondary text-foreground/80 hover:text-foreground`;
  };

  const renderAuthLinks = () => {
    if (user) {
      let profileLink = '';
      let profileText = '';

      if (user.role === 'student') {
        profileLink = ROUTES.STUDENT_PROFILE;
        profileText = 'Profile';
      } else if (user.role === 'recruiter') {
        profileLink = ROUTES.RECRUITER_DASHBOARD;
        profileText = 'Dashboard';
      } else if (user.role === 'admin') {
        profileLink = ROUTES.ADMIN_PANEL;
        profileText = 'Admin Panel';
      }

      return (
        <>
          <Link to={profileLink} className={getLinkClassName(profileLink)}>
            <User className="w-4 h-4 mr-2" />
            {profileText}
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="ml-2"
          >
            Logout
          </Button>
        </>
      );
    }

    return (
      <>
        <Link to={ROUTES.LOGIN} className={getLinkClassName(ROUTES.LOGIN)}>
          <LogIn className="w-4 h-4 mr-2" />
          Login
        </Link>
        <Link to={ROUTES.REGISTER} className={getLinkClassName(ROUTES.REGISTER)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Register
        </Link>
      </>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center">
            <span className="text-xl font-bold text-primary">TalentBridge</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to={ROUTES.HOME} className={getLinkClassName(ROUTES.HOME)}>
              Home
            </Link>
            {renderAuthLinks()}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-secondary transition-all"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-background border-t border-border overflow-hidden transition-all duration-300 ease-spring ${
          isMenuOpen ? 'max-h-64' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-2 flex flex-col space-y-1">
          <Link to={ROUTES.HOME} className={getLinkClassName(ROUTES.HOME)}>
            Home
          </Link>
          {renderAuthLinks()}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
