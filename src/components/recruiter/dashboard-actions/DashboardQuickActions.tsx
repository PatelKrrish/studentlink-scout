
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ROUTES } from '@/lib/constants';
import JobPostButton from './JobPostButton';
import DashboardStats from './DashboardStats';

const DashboardQuickActions = () => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Recruiter Dashboard</CardTitle>
        <CardDescription>Manage your recruitment activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Button asChild className="h-24 flex flex-col justify-center">
            <Link to={ROUTES.SEARCH_STUDENTS}>
              <span className="text-lg">Browse Students</span>
              <span className="text-xs opacity-80">Find and connect with students</span>
            </Link>
          </Button>
          <JobPostButton />
        </div>
        
        <DashboardStats />
      </CardContent>
    </Card>
  );
};

export default DashboardQuickActions;
