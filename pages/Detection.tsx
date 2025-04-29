
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { Shield, AlertTriangle, Check } from 'lucide-react';
import RAGVisualization from '@/components/RAGVisualization';
import { detectDeadlockRAG, parseResourceAllocationGraph, suggestDeadlockResolution } from '@/utils/deadlockUtils';

const Detection: React.FC = () => {
  const { toast } = useToast();
  const [processCount, setProcessCount] = useState<number>(4);
  const [waitForInputs, setWaitForInputs] = useState<string[]>(Array(processCount).fill(''));
  const [results, setResults] = useState<{
    detected: boolean;
    cycle: number[] | null;
    resolution: { victimProcess: number; reason: string } | null;
  } | null>(null);

  const handleProcessCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value, 10);
    if (!isNaN(count) && count > 0) {
      setProcessCount(count);
      setWaitForInputs(prevInputs => {
        const newInputs = [...prevInputs];
        // Adjust array size
        if (count > prevInputs.length) {
          return [...prevInputs, ...Array(count - prevInputs.length).fill('')];
        } else {
          return prevInputs.slice(0, count);
        }
      });
    }
  };

  const handleInputChange = (index: number, value: string) => {
    setWaitForInputs(prevInputs => {
      const newInputs = [...prevInputs];
      newInputs[index] = value;
      return newInputs;
    });
  };

  const handleDetectDeadlock = () => {
    try {
      const graph = parseResourceAllocationGraph(waitForInputs);
      const cycle = detectDeadlockRAG(graph, processCount);
      
      let resolution = null;
      if (cycle) {
        resolution = suggestDeadlockResolution(cycle);
      }
      
      setResults({
        detected: !!cycle,
        cycle,
        resolution
      });
      
      toast({
        title: cycle ? "Deadlock Detected!" : "No Deadlock Found",
        description: cycle 
          ? `Found a deadlock cycle: ${cycle.join(' → ')}` 
          : "The system is deadlock-free based on the resource allocation graph.",
        variant: cycle ? "destructive" : "default",
      });
    } catch (error: any) {
      toast({
        title: "Error Analyzing Deadlock",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const resolveDeadlock = () => {
    if (!results?.cycle || !results.resolution) return;
    
    const victim = results.resolution.victimProcess;
    
    // Create new inputs with the victim's resources released
    const newInputs = [...waitForInputs];
    newInputs[victim] = '';
    setWaitForInputs(newInputs);
    
    // Re-analyze with the new graph
    const graph = parseResourceAllocationGraph(newInputs);
    const cycle = detectDeadlockRAG(graph, processCount);
    
    setResults({
      detected: !!cycle,
      cycle,
      resolution: cycle ? suggestDeadlockResolution(cycle) : null
    });
    
    toast({
      title: "Deadlock Resolution Applied",
      description: `Process P${victim} has been terminated. ${cycle ? "Deadlock still exists." : "Deadlock has been resolved!"}`,
      variant: cycle ? "destructive" : "default",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-2 items-center mb-8">
        <Shield className="h-12 w-12 text-cyber-cyan cyber-text-glow" />
        <h1 className="text-3xl font-bold text-center text-cyber-cyan">Deadlock Detection</h1>
        <p className="text-lg text-center text-cyber-text/80 max-w-2xl">
          Analyze your system for deadlocks using the Resource Allocation Graph
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-cyber-navy border-cyber-cyan/30">
          <CardHeader>
            <CardTitle className="text-cyber-text">System Configuration</CardTitle>
            <CardDescription className="text-cyber-text/70">
              Define the processes and their resource dependencies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="processCount" className="text-cyber-text">Number of Processes</Label>
                <Input 
                  id="processCount"
                  type="number"
                  min="2"
                  value={processCount}
                  onChange={handleProcessCountChange}
                  className="bg-cyber-navy/50 border-cyber-cyan/30 text-cyber-text"
                />
              </div>

              <div className="space-y-4 mt-4">
                <h3 className="text-sm font-medium text-cyber-text">Wait-For Graph</h3>
                <p className="text-xs text-cyber-text/70">
                  For each process, enter the IDs of processes it's waiting for (space-separated).
                  Leave blank if not waiting for any process.
                </p>

                {waitForInputs.map((input, index) => (
                  <div key={index} className="grid grid-cols-[80px_1fr] gap-3 items-center">
                    <span className="text-sm text-cyber-text">Process {index}:</span>
                    <Input
                      value={input}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      placeholder="e.g., 1 3 4"
                      className="bg-cyber-navy/50 border-cyber-cyan/30 text-cyber-text"
                    />
                  </div>
                ))}
              </div>

              <Button 
                onClick={handleDetectDeadlock} 
                className="w-full mt-4 bg-cyber-cyan hover:bg-cyber-cyan/80 text-black font-medium"
              >
                Detect Deadlock
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-cyber-navy border-cyber-cyan/30">
          <CardHeader>
            <CardTitle className="text-cyber-text">Analysis Results</CardTitle>
            <CardDescription className="text-cyber-text/70">
              Deadlock detection and resolution information
            </CardDescription>
          </CardHeader>
          <CardContent>
            {results ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 p-3 rounded-md bg-cyber-navy/50 border border-cyber-cyan/30">
                  {results.detected ? (
                    <AlertTriangle className="h-6 w-6 text-cyber-amber" />
                  ) : (
                    <Check className="h-6 w-6 text-cyber-green" />
                  )}
                  <div>
                    <h4 className={`font-medium ${results.detected ? 'text-cyber-amber' : 'text-cyber-green'}`}>
                      {results.detected ? 'Deadlock Detected' : 'No Deadlock Found'}
                    </h4>
                    <p className="text-sm text-cyber-text/70">
                      {results.detected
                        ? `Cycle detected: ${results.cycle?.join(' → ')}`
                        : 'The system is in a deadlock-free state.'}
                    </p>
                  </div>
                </div>

                {results.detected && results.resolution && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-md bg-cyber-navy/50 border border-cyber-cyan/30">
                      <h4 className="font-medium text-cyber-text">Suggested Resolution</h4>
                      <p className="text-sm text-cyber-text/70 mt-1">
                        {results.resolution.reason}
                      </p>
                      <Button 
                        onClick={resolveDeadlock} 
                        className="mt-3 bg-cyber-amber hover:bg-cyber-amber/80 text-black font-medium"
                      >
                        Terminate Process {results.resolution.victimProcess}
                      </Button>
                    </div>
                  </div>
                )}

                <RAGVisualization 
                  graph={parseResourceAllocationGraph(waitForInputs)}
                  cycle={results.cycle}
                  processCount={processCount}
                />
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-cyber-text/50">
                <p>Run detection to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Detection;
