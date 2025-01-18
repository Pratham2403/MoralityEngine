import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import scenarios from "@/lib/scenarios.json";
import { Textarea } from "@/components/ui/textarea";
import { getValueCaseInsensitive } from "@/lib/helper.function";
import axiosInstance from "@/api/axiosInstance";
import Car from "@/sections/Car";
import Military from "@/sections/Military";
import Hospital from "@/sections/Hospital";
import Sea from "@/sections/Sea";

export default function Scenario() {
  const { id } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [parameters, setParameters] = useState({
    ut_pr: 33,
    dt_pr: 33,
    ve_pr: 34,
    env: "You are a sniper and a terrorist has held a victim hostage. If you shoot the terrorist, there is a 90% chance you will successfully neutralize the threat, but there is a 10% chance the hostage may be killed in the process. If you do not shoot, there is a chance the terrorist may shoot the hostage, but we do not have information on the probability of this happening.",
    A: "Not take the shot and risk the victim's life.",
    B: "Take the shot and try to kill the terrorist.",
  });

  const [modelData, setModelData] = useState({
    toSave: "",
    moralityScore: "",
    A: "",
    B: "",
    description: "",
  });

  const [totalPercentage, setTotalPercentage] = useState(100);

  useEffect(() => {
    const total = parameters.ut_pr + parameters.dt_pr + parameters.ve_pr;
    setTotalPercentage(total);
  }, [parameters]);

  const handleSliderChange = (
    value: number | string,
    parameter: keyof typeof parameters
  ) => {
    const numericValue = Number(value);

    if (isNaN(numericValue)) {
      return;
    }

    const currentTotal = Object.entries(parameters)
      .filter(([key]) => key !== parameter)
      .reduce((sum, [, val]) => sum + (Number(val) || 0), 0);

    const maxAllowed = Math.max(0, 100 - currentTotal);
    const newValue = Math.min(Math.max(0, numericValue), maxAllowed);

    setParameters((prev) => ({
      ...prev,
      [parameter]: newValue,
    }));
  };

  const scenario = scenarios[id as keyof typeof scenarios];

  const handleSimulate = async () => {
    if (totalPercentage !== 100) {
      toast({
        title: "Invalid Parameters",
        description: "The total of all parameters must equal 100%",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    toast({
      title: "Processing scenario...",
      description: "The Morality Engine is analyzing the ethical parameters.",
    });

    // Simulate API call
    const res = await axiosInstance.post("/moralise", {
      parameters,
    });

    if (res.data) {
      setModelData({
        toSave: getValueCaseInsensitive(res.data, "to_save"),
        moralityScore: getValueCaseInsensitive(res.data, "morality_score"),
        A: getValueCaseInsensitive(res.data, "A"),
        B: getValueCaseInsensitive(res.data, "B"),
        description: getValueCaseInsensitive(res.data, "description"),
      });
    }

    setLoading(false);
    toast({
      title: "Analysis complete",
      description: "The model has generated its ethical decision.",
    });
  };

  if (!scenario) {
    return <div className="container py-12">Scenario not found</div>;
  }

  const getProgressColor = () => {
    if (totalPercentage === 100) return "bg-green-500";
    if (totalPercentage > 100) return "bg-red-500";
    return "bg-blue-500";
  };

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {scenario.title}
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          {scenario.description}
        </p>

        <Tabs defaultValue="parameters" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="parameters">Parameters</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>
          <TabsContent value="parameters">
            <Card>
              <CardContent className="pt-6 space-y-8">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="env">
                    Environment
                  </label>
                  <Textarea
                    id="env"
                    value={parameters.env}
                    onChange={(e) =>
                      setParameters((prev) => ({
                        ...prev,
                        env: e.target.value,
                      }))
                    }
                    placeholder="Enter environment details..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="optionA">
                    Option A
                  </label>
                  <Textarea
                    id="optionA"
                    value={parameters.A}
                    onChange={(e) =>
                      setParameters((prev) => ({
                        ...prev,
                        A: e.target.value,
                      }))
                    }
                    placeholder="Enter Option A details..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="optionB">
                    Option B
                  </label>
                  <Textarea
                    id="optionB"
                    value={parameters.B}
                    onChange={(e) =>
                      setParameters((prev) => ({
                        ...prev,
                        B: e.target.value,
                      }))
                    }
                    placeholder="Enter Option B details..."
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">
                      Parameter Distribution
                    </label>
                    <span
                      className={`text-sm font-medium ${
                        totalPercentage === 100
                          ? "text-green-500"
                          : totalPercentage > 100
                          ? "text-red-500"
                          : "text-blue-500"
                      }`}
                    >
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
                    <span className="text-sm font-medium">
                      {parameters.ut_pr}%
                    </span>
                  </div>
                  <Slider
                    value={[parameters.ut_pr]}
                    onValueChange={([value]: [number]) =>
                      handleSliderChange(value, "ut_pr")
                    }
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
                    <span className="text-sm font-medium">
                      {parameters.dt_pr}%
                    </span>
                  </div>
                  <Slider
                    value={[parameters.dt_pr]}
                    onValueChange={([value]: [number]) =>
                      handleSliderChange(value, "dt_pr")
                    }
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
                    <span className="text-sm font-medium">
                      {parameters.ve_pr}%
                    </span>
                  </div>
                  <Slider
                    value={[parameters.ve_pr]}
                    onValueChange={([value]: [number]) =>
                      handleSliderChange(value, "ve_pr")
                    }
                    max={100}
                    step={1}
                  />
                </div>

                <Button
                  className="w-full"
                  onClick={handleSimulate}
                  disabled={loading || totalPercentage !== 100}
                >
                  {loading
                    ? "Processing..."
                    : totalPercentage !== 100
                    ? "Total must equal 100%"
                    : "Simulate Decision"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="results">
            <Card>
              <CardContent className="pt-6">
                <div className="aspect-video bg-muted rounded-lg mb-6">
                  {id === "car" && <Car type={1} />}
                  {id === "doctor" && <Hospital />}
                  {id === "sniper" && <Military />}
                  {id === "boat" && <Sea />}
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <h3>Decision Analysis</h3>
                  <p>
                    Based on the provided ethical parameters, the AI model will
                    generate a detailed analysis of the scenario and its
                    recommended course of action.
                  </p>
                  <h3>Ethical Reasoning</h3>
                  <p>
                    The model's decision-making process will be explained here,
                    including how different ethical frameworks were weighted and
                    applied to reach the final conclusion.
                  </p>
                </div>
                <div className="prose dark:prose-invert max-w-none mt-8">
                  <h3 className="text-xl font-bold">AI's Recommendation</h3>
                  <p>
                    <strong>To Save:</strong> {modelData.toSave}
                  </p>
                  <p>
                    <strong>Morality Score:</strong> {modelData.moralityScore}
                  </p>
                  <h4 className="text-lg font-semibold mt-4">Explanation</h4>
                  <p>{modelData.description}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
