
import React from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ResumeUploadCard = () => {
  return (
    <Card className="md:col-span-3 animate-fade-in">
      <CardHeader>
        <CardTitle>Resume & Documents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-6 border-2 border-dashed border-muted rounded-lg text-center space-y-2">
          <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
          <p className="text-muted-foreground">Drag and drop your resume, or click to browse</p>
          <Button variant="outline" size="sm">Browse Files</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeUploadCard;
