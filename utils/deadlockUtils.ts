
// Detect cycles in the resource allocation graph (RAG)
export function detectDeadlockRAG(graph: Record<number, number[]>, n: number): number[] | null {
  const visited: boolean[] = Array(n).fill(false);
  const recursionStack: boolean[] = Array(n).fill(false);
  const path: number[] = [];

  const isCyclicUtil = (node: number): boolean => {
    visited[node] = true;
    recursionStack[node] = true;
    path.push(node);

    for (const neighbor of graph[node] || []) {
      if (!visited[neighbor]) {
        if (isCyclicUtil(neighbor)) {
          return true;
        }
      } else if (recursionStack[neighbor]) {
        path.push(neighbor);
        return true;
      }
    }

    path.pop();
    recursionStack[node] = false;
    return false;
  };

  for (let node = 0; node < n; node++) {
    if (!visited[node]) {
      if (isCyclicUtil(node)) {
        // Extract cycle
        const cycleStart = path[path.length - 1];
        const cycle: number[] = [];
        
        for (let i = path.length - 1; i >= 0; i--) {
          const p = path[i];
          cycle.push(p);
          if (p === cycleStart && cycle.length > 1) {
            break;
          }
        }
        
        return cycle.reverse();
      }
    }
  }
  
  return null;
}

// Check if the system is in a safe state using Banker's Algorithm
export function isSafeStateBanker(
  available: number[],
  maxNeed: number[][],
  allocation: number[][],
  n: number,
  m: number
): [boolean, number[]] {
  // Calculate need matrix
  const need: number[][] = [];
  for (let i = 0; i < n; i++) {
    need[i] = [];
    for (let j = 0; j < m; j++) {
      need[i][j] = maxNeed[i][j] - allocation[i][j];
    }
  }

  // Initialize work and finish arrays
  const work = [...available];
  const finish: boolean[] = Array(n).fill(false);
  const safeSequence: number[] = [];

  while (safeSequence.length < n) {
    let found = false;
    
    for (let i = 0; i < n; i++) {
      if (!finish[i]) {
        let canAllocate = true;
        
        for (let j = 0; j < m; j++) {
          if (need[i][j] > work[j]) {
            canAllocate = false;
            break;
          }
        }
        
        if (canAllocate) {
          for (let j = 0; j < m; j++) {
            work[j] += allocation[i][j];
          }
          
          safeSequence.push(i);
          finish[i] = true;
          found = true;
          break;
        }
      }
    }
    
    if (!found) {
      return [false, []];
    }
  }
  
  return [true, safeSequence];
}

// Function to suggest deadlock resolution
export function suggestDeadlockResolution(
  cycle: number[],
  allocation: number[][] | null = null
): { victimProcess: number; reason: string } {
  // If we have allocation information, we can make a more informed decision
  if (allocation) {
    // Find the process in the cycle with the least allocated resources
    let minResourceCount = Infinity;
    let minProcess = cycle[0];
    
    for (const processId of cycle) {
      const resourceCount = allocation[processId].reduce((sum, val) => sum + val, 0);
      
      if (resourceCount < minResourceCount) {
        minResourceCount = resourceCount;
        minProcess = processId;
      }
    }
    
    return {
      victimProcess: minProcess,
      reason: `Process ${minProcess} was selected for termination because it holds the fewest resources (${minResourceCount} total) among processes in the deadlock cycle.`
    };
  } else {
    // Simple selection - choose the second-to-last process in the cycle
    const victim = cycle.length > 2 ? cycle[cycle.length - 2] : cycle[0];
    
    return {
      victimProcess: victim,
      reason: `Process ${victim} was selected for termination to break the deadlock cycle with minimal disruption.`
    };
  }
}

// Parse input strings to the required data structure
export function parseResourceAllocationGraph(input: string[]): Record<number, number[]> {
  const graph: Record<number, number[]> = {};
  
  for (let i = 0; i < input.length; i++) {
    const line = input[i].trim();
    if (line) {
      graph[i] = line.split(/\s+/).map(Number);
    } else {
      graph[i] = [];
    }
  }
  
  return graph;
}

export function parseMatrix(input: string[], n: number, m: number): number[][] {
  const matrix: number[][] = [];
  
  for (let i = 0; i < n; i++) {
    const values = (input[i] || "").trim().split(/\s+/);
    
    if (values.length === 1 && values[0] === "") {
      matrix[i] = Array(m).fill(0);
    } else if (values.length !== m) {
      throw new Error(`Row ${i+1} has ${values.length} values, expected ${m}`);
    } else {
      matrix[i] = values.map(val => {
        const num = Number(val);
        if (isNaN(num)) {
          throw new Error(`Invalid number in row ${i+1}: '${val}'`);
        }
        return num;
      });
    }
  }
  
  return matrix;
}

export function parseVector(input: string): number[] {
  if (!input.trim()) {
    return [];
  }
  
  return input.trim().split(/\s+/).map(val => {
    const num = Number(val);
    if (isNaN(num)) {
      throw new Error(`Invalid number in vector: '${val}'`);
    }
    return num;
  });
}
