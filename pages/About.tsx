
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Shield } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-2 items-center mb-8">
        <Shield className="h-12 w-12 text-cyber-cyan cyber-text-glow" />
        <h1 className="text-3xl font-bold text-center text-cyber-cyan">About Deadlocks</h1>
        <p className="text-lg text-center text-cyber-text/80 max-w-2xl">
          Understanding, detecting, and preventing deadlocks in computer systems
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-cyber-navy border-cyber-cyan/30">
          <CardHeader>
            <CardTitle className="text-cyber-text">What is a Deadlock?</CardTitle>
            <CardDescription className="text-cyber-text/70">
              Definition and key concepts
            </CardDescription>
          </CardHeader>
          <CardContent className="text-cyber-text/90">
            <p>
              A deadlock is a situation in which two or more competing actions are waiting for each other to finish, 
              and thus neither ever does. In an operating system, a deadlock occurs when a process or thread enters 
              a waiting state because a requested system resource is held by another waiting process, which in turn 
              is waiting for another resource held by another waiting process.
            </p>
            <div className="mt-4 p-3 bg-cyber-navy/50 border border-cyber-cyan/30 rounded-md">
              <h4 className="font-medium text-cyber-cyan">Four Necessary Conditions</h4>
              <ul className="list-disc list-inside mt-2 space-y-1 text-cyber-text/80">
                <li><span className="font-medium">Mutual Exclusion</span>: Resources cannot be shared simultaneously</li>
                <li><span className="font-medium">Hold and Wait</span>: Processes hold resources while waiting for others</li>
                <li><span className="font-medium">No Preemption</span>: Resources cannot be forcibly taken away</li>
                <li><span className="font-medium">Circular Wait</span>: A circular chain of processes waiting for resources</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-cyber-navy border-cyber-cyan/30">
          <CardHeader>
            <CardTitle className="text-cyber-text">Detection Techniques</CardTitle>
            <CardDescription className="text-cyber-text/70">
              How to identify deadlocks in systems
            </CardDescription>
          </CardHeader>
          <CardContent className="text-cyber-text/90">
            <p>
              Deadlock detection involves examining the state of the system to determine if a deadlock exists. 
              The most common approaches include:
            </p>
            <div className="mt-4 space-y-3">
              <div className="p-3 bg-cyber-navy/50 border border-cyber-cyan/30 rounded-md">
                <h4 className="font-medium text-cyber-cyan">Resource Allocation Graph</h4>
                <p className="mt-1 text-cyber-text/80">
                  A graphical representation where processes and resources are nodes, and edges represent 
                  allocation or request relationships. A cycle in this graph may indicate a deadlock.
                </p>
              </div>
              <div className="p-3 bg-cyber-navy/50 border border-cyber-cyan/30 rounded-md">
                <h4 className="font-medium text-cyber-cyan">Wait-For Graph</h4>
                <p className="mt-1 text-cyber-text/80">
                  A simplified version that shows only processes and their dependencies. 
                  A cycle in a wait-for graph confirms a deadlock.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-cyber-navy border-cyber-cyan/30">
          <CardHeader>
            <CardTitle className="text-cyber-text">Prevention Strategies</CardTitle>
            <CardDescription className="text-cyber-text/70">
              Avoiding deadlock situations
            </CardDescription>
          </CardHeader>
          <CardContent className="text-cyber-text/90">
            <p>
              Deadlock prevention involves structuring the system so that at least one of the necessary 
              conditions for deadlock cannot occur.
            </p>
            <div className="mt-4 space-y-3">
              <div className="p-3 bg-cyber-navy/50 border border-cyber-cyan/30 rounded-md">
                <h4 className="font-medium text-cyber-cyan">Banker's Algorithm</h4>
                <p className="mt-1 text-cyber-text/80">
                  A resource allocation and deadlock avoidance algorithm that tests for safety by 
                  simulating the allocation of resources to each process.
                </p>
              </div>
              <div className="p-3 bg-cyber-navy/50 border border-cyber-cyan/30 rounded-md">
                <h4 className="font-medium text-cyber-cyan">Resource Ordering</h4>
                <p className="mt-1 text-cyber-text/80">
                  Ensures that all processes request resources in the same order, preventing circular wait conditions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-cyber-navy border-cyber-cyan/30 mb-8">
        <CardHeader>
          <CardTitle className="text-cyber-text">Common Deadlock Scenarios</CardTitle>
          <CardDescription className="text-cyber-text/70">
            Real-world examples of deadlock situations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-cyber-cyan/30">
              <AccordionTrigger className="text-cyber-text">Database Transactions</AccordionTrigger>
              <AccordionContent className="text-cyber-text/80">
                <p>
                  In database systems, deadlocks can occur when multiple transactions lock tables or rows
                  and then try to access resources locked by other transactions. For example:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Transaction A locks resource 1, then requests resource 2</li>
                  <li>Transaction B locks resource 2, then requests resource 1</li>
                  <li>Neither can proceed, creating a deadlock situation</li>
                </ul>
                <p className="mt-2">
                  Database management systems typically use timeout mechanisms and deadlock detection 
                  algorithms to resolve these situations.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border-cyber-cyan/30">
              <AccordionTrigger className="text-cyber-text">Multithreaded Applications</AccordionTrigger>
              <AccordionContent className="text-cyber-text/80">
                <p>
                  In concurrent programming, threads can deadlock when they acquire locks in different orders:
                </p>
                <pre className="bg-cyber-purple/10 p-2 rounded mt-2 overflow-x-auto">
                  <code>{`
// Thread 1
lock(resourceA);
lock(resourceB);
// Use resources
unlock(resourceB);
unlock(resourceA);

// Thread 2
lock(resourceB);
lock(resourceA);
// Use resources
unlock(resourceA);
unlock(resourceB);
                  `}</code>
                </pre>
                <p className="mt-2">
                  If Thread 1 acquires resourceA and Thread 2 acquires resourceB simultaneously, 
                  they will deadlock when trying to acquire their second resources.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border-cyber-cyan/30">
              <AccordionTrigger className="text-cyber-text">Operating System Resources</AccordionTrigger>
              <AccordionContent className="text-cyber-text/80">
                <p>
                  Operating system deadlocks can occur with various system resources:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>
                    <strong>I/O Devices</strong>: Process A holds a printer while waiting for a scanner; 
                    Process B holds the scanner while waiting for the printer.
                  </li>
                  <li>
                    <strong>Memory Allocation</strong>: Processes request memory but can't release currently 
                    held memory until they get their new allocation.
                  </li>
                  <li>
                    <strong>File Locks</strong>: Multiple processes attempt to access locked files in 
                    different orders.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card className="bg-cyber-navy border-cyber-cyan/30">
        <CardHeader>
          <CardTitle className="text-cyber-text">References and Further Reading</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-cyber-text/80">
            <li>
              <a href="https://en.wikipedia.org/wiki/Deadlock" target="_blank" rel="noopener noreferrer" 
                className="text-cyber-cyan hover:underline">
                Deadlock - Wikipedia
              </a>
            </li>
            <li>
              <a href="https://en.wikipedia.org/wiki/Banker%27s_algorithm" target="_blank" rel="noopener noreferrer" 
                className="text-cyber-cyan hover:underline">
                Banker's Algorithm - Wikipedia
              </a>
            </li>
            <li>
              <a href="https://en.wikipedia.org/wiki/Resource_allocation_graph" target="_blank" rel="noopener noreferrer" 
                className="text-cyber-cyan hover:underline">
                Resource Allocation Graph - Wikipedia
              </a>
            </li>
            <li>
              <a href="https://lamport.azurewebsites.net/pubs/deadlock.pdf" target="_blank" rel="noopener noreferrer" 
                className="text-cyber-cyan hover:underline">
                Deadlock Prevention and Avoidance - Leslie Lamport
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
