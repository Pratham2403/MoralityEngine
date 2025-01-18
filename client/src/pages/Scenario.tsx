import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

const scenarios = {
  car: {
    title: 'Self-Driving Car Dilemma',
    description: 'An autonomous vehicle must make a split-second decision between two harmful outcomes.',
  },
  boat: {
    title: 'Overloaded Boat Scenario',
    description: 'A rescue boat must decide which group of people to save first.',
  },
  doctor: {
    title: 'Organ Donation Dilemma',
    description: 'Deciding how to allocate limited organ donations among multiple patients.',
  },
  sniper: {
    title: 'Tactical Response Scenario',
    description: 'Evaluating the use of force in a hostage situation.',
  },
};

export default function Scenario() {
  const { id } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [parameters, setParameters] = useState({
    utilitarianism: 33,
    deontology: 33,
    virtueEthics: 34,
  });

  const [totalPercentage, setTotalPercentage] = useState(100);

  useEffect(() => {
    const total = parameters.utilitarianism + parameters.deontology + parameters.virtueEthics;
    setTotalPercentage(total);
  }, [parameters]);

  const handleSliderChange = (value: number, parameter: keyof typeof parameters) => {
    const currentTotal = Object.entries(parameters)
      .filter(([key]) => key !== parameter)
      .reduce((sum, [, value]) => sum + value, 0);

    // Ensure the new value doesn't exceed 100 when added to other values
    const maxAllowed = 100 - currentTotal;
    const newValue = Math.min(value, maxAllowed);

    setParameters(prev => ({
      ...prev,
      [parameter]: newValue,
    }));
  };

  const scenario = scenarios[id as keyof typeof scenarios];

  const handleSimulate = async () => {
    if (totalPercentage !== 100) {
      toast({
        title: 'Invalid Parameters',
        description: 'The total of all parameters must equal 100%',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    toast({
      title: 'Processing scenario...',
      description: 'The AI model is analyzing the ethical parameters.',
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setLoading(false);
    toast({
      title: 'Analysis complete',
      description: 'The model has generated its ethical decision.',
    });
  };

  if (!scenario) {
    return <div className="container py-12">Scenario not found</div>;
  }

  const getProgressColor = () => {
    if (totalPercentage === 100) return 'bg-green-500';
    if (totalPercentage > 100) return 'bg-red-500';
    return 'bg-blue-500';
  };

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{scenario.title}</h1>
        <p className="text-xl text-muted-foreground mb-8">{scenario.description}</p>

        <Tabs defaultValue="parameters" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="parameters">Parameters</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>

          <TabsContent value="parameters">
            <Card>
              <CardContent className="pt-6 space-y-8">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Parameter Distribution</label>
                    <span className={`text-sm font-medium ${
                      totalPercentage === 100 
                        ? 'text-green-500' 
                        : totalPercentage > 100 
                          ? 'text-red-500' 
                          : 'text-blue-500'
                    }`}>
                      Total: {totalPercentage}%
                    </span>
                  </div>
                  <Progress 
                    value={totalPercentage} 
                    className={getProgressColor()}
                    max={100}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">
                      Utilitarianism
                      <span className="text-muted-foreground ml-2">
                        (Maximize overall well-being)
                      </span>
                    </label>
                    <span className="text-sm font-medium">{parameters.utilitarianism}%</span>
                  </div>
                  <Slider
                    value={[parameters.utilitarianism]}
                    onValueChange={([value]) => handleSliderChange(value, 'utilitarianism')}
                    max={100}
                    step={1}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">
                      Deontological Ethics
                      <span className="text-muted-foreground ml-2">
                        (Follow moral rules)
                      </span>
                    </label>
                    <span className="text-sm font-medium">{parameters.deontology}%</span>
                  </div>
                  <Slider
                    value={[parameters.deontology]}
                    onValueChange={([value]) => handleSliderChange(value, 'deontology')}
                    max={100}
                    step={1}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">
                      Virtue Ethics
                      <span className="text-muted-foreground ml-2">
                        (Character-based decisions)
                      </span>
                    </label>
                    <span className="text-sm font-medium">{parameters.virtueEthics}%</span>
                  </div>
                  <Slider
                    value={[parameters.virtueEthics]}
                    onValueChange={([value]) => handleSliderChange(value, 'virtueEthics')}
                    max={100}
                    step={1}
                  />
                </div>

                <Button 
                  className="w-full" 
                  onClick={handleSimulate}
                  disabled={loading || totalPercentage !== 100}
                >
                  {loading ? 'Processing...' : totalPercentage !== 100 ? 'Total must equal 100%' : 'Simulate Decision'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results">
            <Card>
              <CardContent className="pt-6">
                <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center text-muted-foreground">
                  3D Model Visualization Area
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <h3>Decision Analysis</h3>
                  <p>
                    Based on the provided ethical parameters, the AI model will generate
                    a detailed analysis of the scenario and its recommended course of
                    action.
                  </p>
                  <h3>Ethical Reasoning</h3>
                  <p>
                    The model's decision-making process will be explained here,
                    including how different ethical frameworks were weighted and
                    applied to reach the final conclusion.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}