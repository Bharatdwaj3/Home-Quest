// client/src/hooks/useDijkstra.js
import { useMemo } from "react";

export function useDijkstra(graph, startNode) {
  return useMemo(() => {
    if (!graph || !startNode) return { distances: {}, previous: {} };
    const distances = {};
    const previous = {};
    const visited = new Set();
    const nodes = Object.keys(graph);

    // Initialize
    for (const node of nodes) {
      distances[node] = Infinity;
      previous[node] = null;
    }
    distances[startNode] = 0;

    while (visited.size < nodes.length) {
      const unvisited = nodes.filter((n) => !visited.has(n));
      if (unvisited.length === 0) break;

      const current = unvisited.reduce((minNode, node) =>
        distances[node] < distances[minNode] ? node : minNode
      );

      if (distances[current] === Infinity) break;
      visited.add(current);

      for (const neighbor in graph[current]) {
        const weight = graph[current][neighbor];
        const alt = distances[current] + weight;
        if (alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = current;
        }
      }
    }
    return { distances, previous };
  }, [graph, startNode]);
}

export function reconstructPath(previous, target) {
  const path = [];
  let current = target;
  while (current) {
    path.unshift(current);
    current = previous[current];
  }
  return path;
}