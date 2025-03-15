
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserCheck, Building, Briefcase, Shield } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { ROUTES } from '@/lib/constants';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { user } = useAuth();

  // Animation logic
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up', 'opacity-100');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10 z-[-1]" />
        <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-6 animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold !leading-tight">
              Connecting <span className="text-primary">Students</span> with <span className="text-primary">Opportunities</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              TalentBridge is an exclusive recruitment platform connecting verified students with trusted recruiters.
              Build your profile, discover opportunities, and launch your career.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              {!user ? (
                <>
                  <Link to={ROUTES.REGISTER}>
                    <Button size="lg">Get Started</Button>
                  </Link>
                  <Link to={ROUTES.LOGIN}>
                    <Button variant="outline" size="lg">Sign In</Button>
                  </Link>
                </>
              ) : (
                <Link to={user.role === 'student' ? ROUTES.STUDENT_PROFILE : ROUTES.RECRUITER_DASHBOARD}>
                  <Button size="lg">Go to Dashboard</Button>
                </Link>
              )}
            </div>
          </div>
          <div className="lg:w-1/2 animate-fade-in">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
              alt="Students working together" 
              className="rounded-2xl shadow-xl w-full object-cover aspect-video"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              TalentBridge offers a streamlined recruitment experience for both students and recruiters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <Card hover="lift" className="animate-on-scroll opacity-0">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <UserCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Create Your Profile</h3>
                <p className="text-muted-foreground">
                  Students build comprehensive profiles that showcase their skills, experience, and academic background.
                </p>
              </CardContent>
            </Card>

            <Card hover="lift" className="animate-on-scroll opacity-0">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Building className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Connect with Recruiters</h3>
                <p className="text-muted-foreground">
                  Verified recruiters can search for talent using natural language queries to find the perfect candidates.
                </p>
              </CardContent>
            </Card>

            <Card hover="lift" className="animate-on-scroll opacity-0">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Secure Opportunities</h3>
                <p className="text-muted-foreground">
                  Receive and respond to job offers directly on the platform, streamlining your job search process.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-muted rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2 space-y-6 animate-on-scroll opacity-0">
                <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <Shield className="h-4 w-4" />
                  <span>College-Verified Platform</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">A Trusted Connection</h2>
                <p className="text-muted-foreground">
                  TalentBridge ensures that only verified students and approved recruiters can use the platform. 
                  College administrators manually approve recruiters, ensuring a secure, trusted environment for 
                  students to connect with genuine opportunities.
                </p>
                <Link to={ROUTES.REGISTER}>
                  <Button>Join Today</Button>
                </Link>
              </div>
              <div className="md:w-1/2 animate-on-scroll opacity-0">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" 
                  alt="College campus" 
                  className="rounded-xl shadow-md w-full object-cover aspect-square md:aspect-video"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
