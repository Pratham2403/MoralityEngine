import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Scenario from '@/pages/Scenario';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="morality-engine-theme">
      <Router>
        <div className="min-h-screen flex flex-col w-screen">
          <Navbar />
          <main className="flex-grow w-screen place-items-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/scenario/:id" element={<Scenario />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;