import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

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
    utilitarianism: 50,
    deontology: 50,
    virtueEthics: 50,
  });

  const scenario = scenarios[id as keyof typeof scenarios];

  const handleSimulate = async () => {
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
                <div className="space-y-4">
                  <label className="text-sm font-medium">
                    Utilitarianism
                    <span className="text-muted-foreground ml-2">
                      (Maximize overall well-being)
                    </span>
                  </label>
                  <Slider
                    value={[parameters.utilitarianism]}
                    onValueChange={([value]) =>
                      setParameters({ ...parameters, utilitarianism: value })
                    }
                    max={100}
                    step={1}
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-medium">
                    Deontological Ethics
                    <span className="text-muted-foreground ml-2">
                      (Follow moral rules)
                    </span>
                  </label>
                  <Slider
                    value={[parameters.deontology]}
                    onValueChange={([value]) =>
                      setParameters({ ...parameters, deontology: value })
                    }
                    max={100}
                    step={1}
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-medium">
                    Virtue Ethics
                    <span className="text-muted-foreground ml-2">
                      (Character-based decisions)
                    </span>
                  </label>
                  <Slider
                    value={[parameters.virtueEthics]}
                    onValueChange={([value]) =>
                      setParameters({ ...parameters, virtueEthics: value })
                    }
                    max={100}
                    step={1}
                  />
                </div>

                <Button 
                  className="w-full" 
                  onClick={handleSimulate}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Simulate Decision'}
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