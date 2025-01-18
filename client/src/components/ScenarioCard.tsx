import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ScenarioCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function ScenarioCard({ id, title, description, icon: Icon }: ScenarioCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="group-hover:text-primary transition-colors">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          className="w-full"
          onClick={() => navigate(`/scenario/${id}`)}
        >
          Explore Scenario
        </Button>
      </CardContent>
    </Card>
  );
}