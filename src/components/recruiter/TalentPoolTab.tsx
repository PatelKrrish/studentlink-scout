
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';

const TalentPoolTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const filteredStudents = searchTerm.trim() === '' ? [] : [];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Student Talent Pool</CardTitle>
          <CardDescription>Find qualified candidates for your positions</CardDescription>
        </div>
        <Button asChild>
          <Link to={ROUTES.SEARCH_STUDENTS}>Browse All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search students by name or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredStudents.length > 0 ? (
            filteredStudents.map(student => (
              <div key={student.id}></div>
            ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <p className="text-muted-foreground">Connect with talented engineers in the student pool.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => navigate(ROUTES.SEARCH_STUDENTS)}
              >
                Browse Student Profiles
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TalentPoolTab;
