
import React, { useRef, useEffect } from 'react';

interface RAGVisualizationProps {
  graph: Record<number, number[]>;
  cycle: number[] | null;
  processCount: number;
}

const RAGVisualization: React.FC<RAGVisualizationProps> = ({ graph, cycle, processCount }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    
    // Node positions
    const nodePositions: [number, number][] = [];
    for (let i = 0; i < processCount; i++) {
      const angle = (i / processCount) * 2 * Math.PI;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      nodePositions.push([x, y]);
    }

    // Draw edges
    for (let source = 0; source < processCount; source++) {
      const neighbors = graph[source] || [];
      const [sourceX, sourceY] = nodePositions[source];
      
      for (const target of neighbors) {
        if (target >= 0 && target < processCount) {
          const [targetX, targetY] = nodePositions[target];
          
          // Calculate direction vector
          const dx = targetX - sourceX;
          const dy = targetY - sourceY;
          const length = Math.sqrt(dx * dx + dy * dy);
          
          // Normalize direction vector
          const ndx = dx / length;
          const ndy = dy / length;
          
          // Points for source and target (considering node radius)
          const nodeRadius = 20;
          const startX = sourceX + ndx * nodeRadius;
          const startY = sourceY + ndy * nodeRadius;
          const endX = targetX - ndx * nodeRadius;
          const endY = targetY - ndy * nodeRadius;
          
          // Check if this edge is part of a cycle
          let isInCycle = false;
          if (cycle) {
            for (let i = 0; i < cycle.length - 1; i++) {
              if (cycle[i] === source && cycle[i + 1] === target) {
                isInCycle = true;
                break;
              }
            }
          }
          
          // Draw edge
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          
          if (isInCycle) {
            ctx.strokeStyle = '#ffab00'; // Amber for cycle edges
            ctx.lineWidth = 3;
          } else {
            ctx.strokeStyle = '#00e5ff'; // Cyan for regular edges
            ctx.lineWidth = 2;
          }
          
          ctx.stroke();
          
          // Draw arrow
          const arrowSize = 10;
          const angle = Math.atan2(ndy, ndx);
          
          ctx.beginPath();
          ctx.moveTo(endX, endY);
          ctx.lineTo(
            endX - arrowSize * Math.cos(angle - Math.PI / 6),
            endY - arrowSize * Math.sin(angle - Math.PI / 6)
          );
          ctx.lineTo(
            endX - arrowSize * Math.cos(angle + Math.PI / 6),
            endY - arrowSize * Math.sin(angle + Math.PI / 6)
          );
          ctx.closePath();
          ctx.fillStyle = isInCycle ? '#ffab00' : '#00e5ff';
          ctx.fill();
        }
      }
    }

    // Draw nodes
    for (let i = 0; i < processCount; i++) {
      const [x, y] = nodePositions[i];
      
      // Check if this node is part of a cycle
      const isInCycle = cycle ? cycle.includes(i) : false;
      
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
      
      if (isInCycle) {
        ctx.fillStyle = '#3a1c71'; // Purple background for cycle nodes
        ctx.strokeStyle = '#ffab00'; // Amber border for cycle nodes
        ctx.lineWidth = 3;
      } else {
        ctx.fillStyle = '#1a2b4c'; // Blue background
        ctx.strokeStyle = '#00e5ff'; // Cyan border
        ctx.lineWidth = 2;
      }
      
      ctx.fill();
      ctx.stroke();
      
      // Draw node label
      ctx.font = '14px Arial';
      ctx.fillStyle = '#e0e0e0';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`P${i}`, x, y);
    }
  }, [graph, cycle, processCount]);

  return (
    <div className="mt-6 p-4 border rounded cyber-border">
      <canvas
        ref={canvasRef}
        width={500}
        height={400}
        className="bg-cyber-navy/50 w-full h-auto rounded"
      />
    </div>
  );
};

export default RAGVisualization;
