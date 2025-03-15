
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ROUTES } from '@/lib/constants';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center text-center space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                Connect Students with Top Recruiters
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                Our exclusive platform brings together verified students and trusted recruiters for meaningful career opportunities.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {!user ? (
                  <>
                    <Button size="lg" asChild>
                      <Link to={ROUTES.REGISTER}>Get Started</Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link to={ROUTES.LOGIN}>Sign In</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="lg" asChild>
                      <Link to={user.role === 'student' ? ROUTES.STUDENT_PROFILE : ROUTES.RECRUITER_DASHBOARD}>
                        Go to Dashboard
                      </Link>
                    </Button>
                    {user.role === 'recruiter' && (
                      <Button variant="outline" size="lg" asChild>
                        <Link to={ROUTES.SEARCH_STUDENTS}>
                          Browse Students
                        </Link>
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Platform Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">For Students</h3>
                  <p className="text-muted-foreground">Create verified profiles, showcase your skills, and connect with top recruiters looking for fresh talent.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">For Recruiters</h3>
                  <p className="text-muted-foreground">Access a pool of pre-verified students, search by specific criteria, and connect directly with promising candidates.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">Secure & Verified</h3>
                  <p className="text-muted-foreground">All profiles are verified through institutional emails, ensuring legitimacy and trust within our platform.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* New Phase 2 Feature Highlight */}
        <section className="py-16 bg-muted">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">New in Phase 2</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We've added enhanced search and filtering capabilities to help recruiters find the perfect candidates for their positions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Advanced Student Search</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Filter by department, work status, and more</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>View detailed student profiles with skills and certifications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Connect directly with promising candidates</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Paginated results for easier browsing</span>
                  </li>
                </ul>
                
                {user?.role === 'recruiter' ? (
                  <Button asChild className="mt-4">
                    <Link to={ROUTES.SEARCH_STUDENTS}>Try It Now</Link>
                  </Button>
                ) : (
                  <Button asChild className="mt-4">
                    <Link to={ROUTES.REGISTER}>Sign Up as Recruiter</Link>
                  </Button>
                )}
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-lg">
                <div className="aspect-video rounded-md overflow-hidden bg-muted flex items-center justify-center">
                  <div className="text-center p-4">
                    <h4 className="text-xl font-semibold mb-2">Student Search Interface</h4>
                    <p className="text-muted-foreground mb-4">Find the right talent for your company with our powerful search tools.</p>
                    <div className="flex justify-center">
                      <Button asChild>
                        <Link to={ROUTES.SEARCH_STUDENTS}>Browse Students</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
