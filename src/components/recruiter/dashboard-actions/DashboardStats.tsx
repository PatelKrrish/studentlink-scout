
import React from 'react';

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-muted rounded-lg p-4 text-center">
        <span className="text-2xl font-bold">0</span>
        <p className="text-xs text-muted-foreground">Active Jobs</p>
      </div>
      <div className="bg-muted rounded-lg p-4 text-center">
        <span className="text-2xl font-bold">0</span>
        <p className="text-xs text-muted-foreground">Applications</p>
      </div>
      <div className="bg-muted rounded-lg p-4 text-center">
        <span className="text-2xl font-bold">0</span>
        <p className="text-xs text-muted-foreground">Interviews</p>
      </div>
      <div className="bg-muted rounded-lg p-4 text-center">
        <span className="text-2xl font-bold">0</span>
        <p className="text-xs text-muted-foreground">Hired</p>
      </div>
    </div>
  );
};

export default DashboardStats;
