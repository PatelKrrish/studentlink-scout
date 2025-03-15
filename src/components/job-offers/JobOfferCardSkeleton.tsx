
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

const JobOfferCardSkeleton = () => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mt-2"></div>
          </div>
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <div className="space-y-3 mt-6">
          <div className="flex items-center">
            <div className="h-4 w-4 mr-2 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          <div className="flex items-center">
            <div className="h-4 w-4 mr-2 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          <div className="flex items-center">
            <div className="h-4 w-4 mr-2 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
      </CardFooter>
    </Card>
  );
};

export default JobOfferCardSkeleton;
