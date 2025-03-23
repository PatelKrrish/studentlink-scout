
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to={ROUTES.HOME} className="mr-6 flex items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold tracking-tight">
              100x<span className="text-primary">Engineers</span>
            </span>
          </div>
        </Link>
        
        <nav className="hidden md:flex flex-1 items-center gap-6 text-sm">
          <Link
            to={ROUTES.HOME}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === ROUTES.HOME ? "text-foreground font-medium" : "text-foreground/60"
            )}
          >
            Home
          </Link>
          
          {user && (
            <>
              <Link
                to={user.role === 'recruiter' ? ROUTES.RECRUITER_DASHBOARD : ROUTES.DASHBOARD}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname.includes('dashboard') ? "text-foreground font-medium" : "text-foreground/60"
                )}
              >
                Dashboard
              </Link>
              {user.role === 'recruiter' && (
                <Link
                  to={ROUTES.SEARCH_STUDENTS}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === ROUTES.SEARCH_STUDENTS ? "text-foreground font-medium" : "text-foreground/60"
                  )}
                >
                  Find Talent
                </Link>
              )}
              {user.role === 'student' && (
                <Link
                  to={ROUTES.JOB_OFFERS}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === ROUTES.JOB_OFFERS ? "text-foreground font-medium" : "text-foreground/60"
                  )}
                >
                  Job Offers
                </Link>
              )}
            </>
          )}
        </nav>
        
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button variant="outline" size="sm" onClick={() => logout()}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link to={ROUTES.LOGIN}>Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to={ROUTES.REGISTER}>Register</Link>
              </Button>
            </>
          )}

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-2/3 md:w-1/2">
              <SheetHeader className="space-y-2">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Navigate through the application.
                </SheetDescription>
              </SheetHeader>
              <nav className="grid gap-4 text-sm mt-8">
                <Link
                  to={ROUTES.HOME}
                  className={cn(
                    "flex items-center gap-2 transition-colors hover:text-foreground/80",
                    pathname === ROUTES.HOME ? "text-foreground font-medium" : "text-foreground/60"
                  )}
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
                {user && (
                  <>
                    <Link
                      to={user.role === 'recruiter' ? ROUTES.RECRUITER_DASHBOARD : ROUTES.DASHBOARD}
                      className={cn(
                        "flex items-center gap-2 transition-colors hover:text-foreground/80",
                        pathname.includes('dashboard') ? "text-foreground font-medium" : "text-foreground/60"
                      )}
                      onClick={closeMobileMenu}
                    >
                      Dashboard
                    </Link>
                    {user.role === 'recruiter' && (
                      <Link
                        to={ROUTES.SEARCH_STUDENTS}
                        className={cn(
                          "flex items-center gap-2 transition-colors hover:text-foreground/80",
                          pathname === ROUTES.SEARCH_STUDENTS ? "text-foreground font-medium" : "text-foreground/60"
                        )}
                        onClick={closeMobileMenu}
                      >
                        Find Talent
                      </Link>
                    )}
                    {user.role === 'student' && (
                      <Link
                        to={ROUTES.JOB_OFFERS}
                        className={cn(
                          "flex items-center gap-2 transition-colors hover:text-foreground/80",
                          pathname === ROUTES.JOB_OFFERS ? "text-foreground font-medium" : "text-foreground/60"
                        )}
                        onClick={closeMobileMenu}
                      >
                        Job Offers
                      </Link>
                    )}
                  </>
                )}
              </nav>
              <div className="mt-8">
                {user ? (
                  <Button variant="outline" size="sm" className="w-full" onClick={() => logout()}>
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" size="sm" className="w-full mb-2" asChild onClick={closeMobileMenu}>
                      <Link to={ROUTES.LOGIN}>Login</Link>
                    </Button>
                    <Button size="sm" className="w-full" asChild onClick={closeMobileMenu}>
                      <Link to={ROUTES.REGISTER}>Register</Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
