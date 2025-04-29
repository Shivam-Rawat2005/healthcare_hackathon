
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { Shield, AlertTriangle, Check } from 'lucide-react';
import { isSafeStateBanker, parseMatrix, parseVector } from '@/utils/deadlockUtils';

const Prevention: React.FC = () => {
  const { toast } = useToast();
  const [processCount, setProcessCount] = useState<number>(4);
  const [resourceCount, setResourceCount] = useState<number>(3);
  
  const [availableResources, setAvailableResources] = useState<string>('3 3 2');
  const [maxNeeds, setMaxNeeds] = useState<string[]>(Array(processCount).fill(''));
  const [allocations, setAllocations] = useState<string[]>(Array(processCount).fill(''));
  
  const [results, setResults] = useState<{
    isSafe: boolean;
    safeSequence: number[] | null;
    needMatrix: number[][] | null;
  } | null>(null);

  const handleProcessCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value, 10);
    if (!isNaN(count) && count > 0) {
      setProcessCount(count);
      setMaxNeeds(prevInputs => {
        if (count > prevInputs.length) {
          return [...prevInputs, ...Array(count - prevInputs.length).fill('')];
        } else {
          return prevInputs.slice(0, count);
        }
      });
      setAllocations(prevInputs => {
        if (count > prevInputs.length) {
          return [...prevInputs, ...Array(count - prevInputs.length).fill('')];
        } else {
          return prevInputs.slice(0, count);
        }
      });
    }
  };

  const handleResourceCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value, 10);
    if (!isNaN(count) && count > 0) {
      setResourceCount(count);
    }
  };

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    setter(prevInputs => {
      const newInputs = [...prevInputs];
      newInputs[index] = value;
      return newInputs;
    });
  };

  const handleCheckSafety = () => {
    try {
      // Parse inputs
      const available = parseVector(availableResources);
      if (available.length !== resourceCount) {
        throw new Error(`Available resources should have ${resourceCount} values`);
      }

      const maxNeedMatrix = parseMatrix(maxNeeds, processCount, resourceCount);
      const allocationMatrix = parseMatrix(allocations, processCount, resourceCount);
      
      // Calculate need matrix for display
      const needMatrix: number[][] = [];
      for (let i = 0; i < processCount; i++) {
        needMatrix[i] = [];
        for (let j = 0; j < resourceCount; j++) {
          needMatrix[i][j] = maxNeedMatrix[i][j] - allocationMatrix[i][j];
          if (needMatrix[i][j] < 0) {
            throw new Error(`Invalid allocation: Process ${i} has more resources allocated than its maximum need`);
          }
        }
      }

      // Check if state is safe
      const [isSafe, safeSequence] = isSafeStateBanker(
        available, 
        maxNeedMatrix, 
        allocationMatrix, 
        processCount, 
        resourceCount
      );
      
      setResults({
        isSafe,
        safeSequence: isSafe ? safeSequence : null,
        needMatrix
      });
      
      toast({
        title: isSafe ? "Safe State Confirmed" : "Unsafe State Detected",
        description: isSafe 
          ? `System is in a safe state. Safe sequence: ${safeSequence.map(p => `P${p}`).join(' → ')}` 
          : "The system is in an unsafe state. Deadlocks may occur.",
        variant: isSafe ? "default" : "destructive",
      });
    } catch (error: any) {
      toast({
        title: "Error Analyzing System State",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-2 items-center mb-8">
        <Shield className="h-12 w-12 text-cyber-cyan cyber-text-glow" />
        <h1 className="text-3xl font-bold text-center text-cyber-cyan">Deadlock Prevention</h1>
        <p className="text-lg text-center text-cyber-text/80 max-w-2xl">
          Ensure system safety using Banker's Algorithm for resource allocation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-cyber-navy border-cyber-cyan/30">
          <CardHeader>
            <CardTitle className="text-cyber-text">Resource Configuration</CardTitle>
            <CardDescription className="text-cyber-text/70">
              Define the processes, resources, and allocation state
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="processCount" className="text-cyber-text">Number of Processes</Label>
                  <Input 
                    id="processCount"
                    type="number"
                    min="1"
                    value={processCount}
                    onChange={handleProcessCountChange}
                    className="bg-cyber-navy/50 border-cyber-cyan/30 text-cyber-text"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resourceCount" className="text-cyber-text">Resource Types</Label>
                  <Input 
                    id="resourceCount"
                    type="number"
                    min="1"
                    value={resourceCount}
                    onChange={handleResourceCountChange}
                    className="bg-cyber-navy/50 border-cyber-cyan/30 text-cyber-text"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availableResources" className="text-cyber-text">Available Resources</Label>
                <Input
                  id="availableResources"
                  value={availableResources}
                  onChange={(e) => setAvailableResources(e.target.value)}
                  placeholder={`e.g., ${Array(resourceCount).fill('3').join(' ')}`}
                  className="bg-cyber-navy/50 border-cyber-cyan/30 text-cyber-text"
                />
                <p className="text-xs text-cyber-text/70">
                  Enter {resourceCount} space-separated values for available resource instances
                </p>
              </div>

              <div className="space-y-4 mt-4">
                <h3 className="text-sm font-medium text-cyber-text">Maximum Need</h3>
                <p className="text-xs text-cyber-text/70">
                  For each process, enter the maximum number of resources it may need
                </p>

                {Array.from({ length: processCount }).map((_, index) => (
                  <div key={`max-${index}`} className="grid grid-cols-[80px_1fr] gap-3 items-center">
                    <span className="text-sm text-cyber-text">Process {index}:</span>
                    <Input
                      value={maxNeeds[index] || ''}
                      onChange={(e) => handleInputChange(setMaxNeeds, index, e.target.value)}
                      placeholder={`e.g., ${Array(resourceCount).fill('7').join(' ')}`}
                      className="bg-cyber-navy/50 border-cyber-cyan/30 text-cyber-text"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-4 mt-4">
                <h3 className="text-sm font-medium text-cyber-text">Current Allocation</h3>
                <p className="text-xs text-cyber-text/70">
                  For each process, enter the currently allocated resources
                </p>

                {Array.from({ length: processCount }).map((_, index) => (
                  <div key={`alloc-${index}`} className="grid grid-cols-[80px_1fr] gap-3 items-center">
                    <span className="text-sm text-cyber-text">Process {index}:</span>
                    <Input
                      value={allocations[index] || ''}
                      onChange={(e) => handleInputChange(setAllocations, index, e.target.value)}
                      placeholder={`e.g., ${Array(resourceCount).fill('0').join(' ')}`}
                      className="bg-cyber-navy/50 border-cyber-cyan/30 text-cyber-text"
                    />
                  </div>
                ))}
              </div>

              <Button 
                onClick={handleCheckSafety} 
                className="w-full mt-4 bg-cyber-cyan hover:bg-cyber-cyan/80 text-black font-medium"
              >
                Check System Safety
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-cyber-navy border-cyber-cyan/30">
          <CardHeader>
            <CardTitle className="text-cyber-text">Safety Analysis</CardTitle>
            <CardDescription className="text-cyber-text/70">
              Banker's Algorithm results and resource needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            {results ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-2 p-3 rounded-md bg-cyber-navy/50 border border-cyber-cyan/30">
                  {results.isSafe ? (
                    <Check className="h-6 w-6 text-cyber-green" />
                  ) : (
                    <AlertTriangle className="h-6 w-6 text-cyber-amber" />
                  )}
                  <div>
                    <h4 className={`font-medium ${results.isSafe ? 'text-cyber-green' : 'text-cyber-amber'}`}>
                      {results.isSafe ? 'Safe State' : 'Unsafe State'}
                    </h4>
                    <p className="text-sm text-cyber-text/70">
                      {results.isSafe
                        ? `Safe execution sequence: ${results.safeSequence?.map(p => `P${p}`).join(' → ')}`
                        : 'The system may deadlock with the current allocation.'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-cyber-text">Need Matrix (Max - Allocation)</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-cyber-cyan/30">
                      <thead>
                        <tr className="bg-cyber-purple/30">
                          <th className="p-2 text-left text-cyber-text">Process</th>
                          {Array.from({ length: resourceCount }).map((_, i) => (
                            <th key={i} className="p-2 text-left text-cyber-text">R{i}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {results.needMatrix?.map((row, i) => (
                          <tr key={i} className="border-t border-cyber-cyan/30 hover:bg-cyber-navy/70">
                            <td className="p-2 text-cyber-text font-medium">P{i}</td>
                            {row.map((value, j) => (
                              <td key={j} className="p-2 text-cyber-text">{value}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {!results.isSafe && (
                  <div className="p-3 rounded-md bg-cyber-navy/50 border border-cyber-cyan/30">
                    <h4 className="font-medium text-cyber-text">Deadlock Prevention Tips</h4>
                    <ul className="list-disc list-inside text-sm text-cyber-text/70 mt-2 space-y-1">
                      <li>Reduce the maximum resource claims of some processes</li>
                      <li>Increase the available resources in the system</li>
                      <li>Change the order of resource allocation requests</li>
                      <li>Release some allocated resources from processes</li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-cyber-text/50">
                <p>Run safety check to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Prevention;
