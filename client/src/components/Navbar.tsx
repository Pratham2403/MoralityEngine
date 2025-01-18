import { ModeToggle } from '@/components/mode-toggle.tsx';
import { Brain } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full place-items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center space-x-2">
          <Brain className="h-6 w-6" />
          <span className="text-xl font-bold">Morality Engine</span>
        </a>
        <ModeToggle />
      </div>
    </header>
  );
}