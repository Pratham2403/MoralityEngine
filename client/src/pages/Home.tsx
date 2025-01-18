import { Car, Anchor, Heart, Target } from 'lucide-react';
import ScenarioCard from '@/components/ScenarioCard';

const scenarios = [
  {
    id: 'car',
    title: 'Self-Driving Car Dilemma',
    description: 'Navigate complex road scenarios where autonomous vehicles must make split-second ethical decisions.',
    icon: Car
  },
  {
    id: 'boat',
    title: 'Overloaded Boat Scenario',
    description: 'Explore difficult choices in maritime rescue operations with limited resources.',
    icon: Anchor
  },
  {
    id: 'doctor',
    title: 'Organ Donation Dilemma',
    description: 'Analyze medical ethics in organ allocation and transplant decisions.',
    icon: Heart
  },
  {
    id: 'sniper',
    title: 'Tactical Response Scenario',
    description: 'Evaluate high-stakes decisions in law enforcement and counter-terrorism operations.',
    icon: Target
  }
];

export default function Home() {
  return (
    <div className="container py-12">
      <section className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Welcome to the Morality Engine
        </h1>
        <p className="text-xl text-muted-foreground">
          Explore ethical dilemmas in autonomous decision-making through interactive scenarios and customizable moral frameworks.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {scenarios.map((scenario) => (
          <ScenarioCard key={scenario.id} {...scenario} />
        ))}
      </section>
    </div>
  );
}