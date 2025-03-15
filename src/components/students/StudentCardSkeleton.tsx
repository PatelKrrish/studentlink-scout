
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

const StudentCardSkeleton = () => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-gray-200 animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2">
          <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
      </CardFooter>
    </Card>
  );
};

export default StudentCardSkeleton;
