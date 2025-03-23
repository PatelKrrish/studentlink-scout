
import React from 'react';
import { useJobOffers } from '@/hooks/use-job-offers';
import { Card } from '@/components/ui/card';
import { Briefcase, FileText, UserRound, CheckCircle } from 'lucide-react';

const DashboardStats = () => {
  const { offers, loading } = useJobOffers();
  
  // Calculate statistics
  const activeJobs = offers.filter(offer => 
    offer.status === 'pending' || offer.status === 'accepted'
  ).length;
  
  const applications = offers.length;
  const interviews = offers.filter(offer => offer.status === 'accepted').length;
  const hired = Math.min(2, interviews); // Mock data - in a real app this would come from a separate API
  
  const stats = [
    { label: 'Active Jobs', value: loading ? '-' : activeJobs, icon: <Briefcase className="h-5 w-5 text-blue-500" /> },
    { label: 'Applications', value: loading ? '-' : applications, icon: <FileText className="h-5 w-5 text-green-500" /> },
    { label: 'Interviews', value: loading ? '-' : interviews, icon: <UserRound className="h-5 w-5 text-amber-500" /> },
    { label: 'Hired', value: loading ? '-' : hired, icon: <CheckCircle className="h-5 w-5 text-purple-500" /> }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
          <div className="p-2 rounded-full bg-muted mb-2">
            {stat.icon}
          </div>
          <span className="text-2xl font-bold">{stat.value}</span>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
