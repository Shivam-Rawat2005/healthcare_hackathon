
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, AlertTriangle, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.15),rgba(10,25,41,0)_50%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Shield className="h-20 w-20 text-cyber-cyan cyber-text-glow animate-pulse-glow" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 cyber-text-glow text-cyber-cyan">
              Deadlock Defender
            </h1>
            <p className="text-xl mb-8 text-cyber-text">
              Advanced tooling for detecting, analyzing, and resolving deadlocks in complex systems.
              Protect your software from resource conflicts and performance bottlenecks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                className="bg-cyber-cyan hover:bg-cyber-cyan/80 text-black px-8 py-6 text-lg cyber-glow"
              >
                <Link to="/detection">
                  Detect Deadlocks
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/10 px-8 py-6 text-lg"
              >
                <Link to="/prevention">
                  Prevent Deadlocks
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 bg-cyber-navy/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-cyber-cyan">
            Comprehensive Deadlock Management
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-cyber-navy cyber-border">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-10 w-10 text-cyber-amber mr-3" />
                  <h3 className="text-xl font-bold text-cyber-text">Detection</h3>
                </div>
                <p className="text-cyber-text/80 mb-4">
                  Identify potential deadlocks using resource allocation graph analysis. Visualize process 
                  relationships and resource dependencies to spot cyclic wait conditions.
                </p>
                <ul className="space-y-2 text-cyber-text/70 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber-green mr-2 shrink-0 mt-0.5" />
                    <span>Resource Allocation Graph Analysis</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber-green mr-2 shrink-0 mt-0.5" />
                    <span>Cycle Detection Algorithms</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber-green mr-2 shrink-0 mt-0.5" />
                    <span>Interactive Visualization</span>
                  </li>
                </ul>
                <Button 
                  asChild
                  variant="outline" 
                  className="w-full border-cyber-amber text-cyber-amber hover:bg-cyber-amber/10"
                >
                  <Link to="/detection">
                    Detect Deadlocks
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-cyber-navy cyber-border">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Shield className="h-10 w-10 text-cyber-cyan mr-3" />
                  <h3 className="text-xl font-bold text-cyber-text">Prevention</h3>
                </div>
                <p className="text-cyber-text/80 mb-4">
                  Prevent deadlocks before they occur with advanced resource allocation strategies 
                  like the Banker's Algorithm to ensure system safety at all times.
                </p>
                <ul className="space-y-2 text-cyber-text/70 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber-green mr-2 shrink-0 mt-0.5" />
                    <span>Banker's Algorithm Implementation</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber-green mr-2 shrink-0 mt-0.5" />
                    <span>Safe State Verification</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber-green mr-2 shrink-0 mt-0.5" />
                    <span>Resource Allocation Planning</span>
                  </li>
                </ul>
                <Button 
                  asChild
                  variant="outline" 
                  className="w-full border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/10"
                >
                  <Link to="/prevention">
                    Prevent Deadlocks
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-cyber-navy cyber-border">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Shield className="h-10 w-10 text-cyber-green mr-3" />
                  <h3 className="text-xl font-bold text-cyber-text">Education</h3>
                </div>
                <p className="text-cyber-text/80 mb-4">
                  Learn about deadlock concepts, detection methods, prevention strategies, 
                  and real-world scenarios with comprehensive educational resources.
                </p>
                <ul className="space-y-2 text-cyber-text/70 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber-green mr-2 shrink-0 mt-0.5" />
                    <span>Deadlock Fundamental Concepts</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber-green mr-2 shrink-0 mt-0.5" />
                    <span>Example Scenarios & Case Studies</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-cyber-green mr-2 shrink-0 mt-0.5" />
                    <span>Prevention Techniques</span>
                  </li>
                </ul>
                <Button 
                  asChild
                  variant="outline" 
                  className="w-full border-cyber-green text-cyber-green hover:bg-cyber-green/10"
                >
                  <Link to="/about">
                    Learn More
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-cyber-cyan">
              Ready to resolve deadlocks in your system?
            </h2>
            <p className="text-lg mb-8 text-cyber-text/80">
              Start using our deadlock detection and prevention tools today to ensure 
              optimal performance and reliability.
            </p>
            <Button 
              asChild
              className="bg-cyber-purple hover:bg-cyber-purple/80 text-white px-8 py-6 text-lg"
            >
              <Link to="/detection">
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
