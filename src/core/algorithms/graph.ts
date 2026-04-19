import type { GraphFrame } from '../types'

/**
 * 图数据结构
 */
export interface GraphNode {
  id: string
  label: string
  x?: number
  y?: number
}

export interface GraphEdge {
  id: string
  from: string
  to: string
  weight: number
}

export interface Graph {
  nodes: GraphNode[]
  edges: GraphEdge[]
  directed: boolean
}

/**
 * Dijkstra 最短路径算法
 */
export function dijkstra(graph: Graph, startId: string): GraphFrame[] {
  const frames: GraphFrame[] = []
  const { nodes, edges } = graph
  
  // 初始化距离
  const dist: Map<string, number> = new Map()
  const prev: Map<string, string | null> = new Map()
  const visited: Set<string> = new Set()
  
  nodes.forEach(node => {
    dist.set(node.id, node.id === startId ? 0 : Infinity)
    prev.set(node.id, null)
  })
  
  frames.push({
    type: 'reset',
    description: `Dijkstra最短路径算法 - 起点: ${startId}。使用贪心策略，每次选择距离最小的未访问节点`,
    highlightLine: 5,
    data: { distances: Object.fromEntries(dist) }
  })
  
  frames.push({
    type: 'visit-node',
    nodeId: startId,
    distance: 0,
    highlightLine: 6,
    description: `步骤0: 初始化 - 起点${startId}距离设为0，其余所有节点距离初始化为∞（表示不可达）`,
    data: { distances: Object.fromEntries(dist) }
  })
  
  let step = 1
  while (visited.size < nodes.length) {
    // 找到未访问的最小距离节点
    let minDist = Infinity
    let minNode: string | null = null
    
    for (const [nodeId, d] of dist) {
      if (!visited.has(nodeId) && d < minDist) {
        minDist = d
        minNode = nodeId
      }
    }
    
    if (minNode === null || minDist === Infinity) break
    
    visited.add(minNode)
    
    frames.push({
      type: 'visit-node',
      nodeId: minNode,
      distance: minDist,
      highlightLine: 20,
      description: `步骤${step}: 从未访问节点中选择距离最小的节点${minNode}(dist=${minDist})，标记为已访问，开始松弛操作`,
      data: { distances: Object.fromEntries(dist), visited: Array.from(visited) }
    })
    step++
    
    // 更新邻居距离
    const neighbors = edges.filter(e => 
      e.from === minNode || (!graph.directed && e.to === minNode)
    )
    
    for (const edge of neighbors) {
      const neighborId = edge.from === minNode ? edge.to : edge.from
      
      if (visited.has(neighborId)) continue
      
      const newDist = minDist + edge.weight
      const oldDist = dist.get(neighborId)!
      
      frames.push({
        type: 'visit-edge',
        fromNode: minNode,
        toNode: neighborId,
        weight: edge.weight,
        highlightLine: 24,
        description: `步骤${step}: 检查从${minNode}到邻居${neighborId}的边，权重=${edge.weight}，尝试松弛操作`
      })
      
      if (newDist < oldDist) {
        dist.set(neighborId, newDist)
        prev.set(neighborId, minNode)
        
        frames.push({
          type: 'update-distance',
          nodeId: neighborId,
          distance: newDist,
          highlightLine: 31,
          description: `步骤${step}: 松弛成功！更新dist[${neighborId}] = dist[${minNode}] + weight = ${minDist} + ${edge.weight} = ${newDist} < ${oldDist === Infinity ? '∞' : oldDist}（经过${minNode}更短）`,
          data: { distances: Object.fromEntries(dist) }
        })
      } else {
        frames.push({
          type: 'highlight',
          nodeId: neighborId,
          highlightLine: 31,
          description: `步骤${step}: 松弛失败，dist[${neighborId}] = ${oldDist === Infinity ? '∞' : oldDist}保持不变，因为${newDist} >= ${oldDist}（经过${minNode}不会更短）`
        })
      }
    }
  }
  
  frames.push({
    type: 'reset',
    highlightLine: 37,
    description: `Dijkstra完成！最短距离: ${Array.from(dist).map(([k, v]) => `${k}:${v === Infinity ? '∞' : v}`).join(', ')}`,
    data: { distances: Object.fromEntries(dist), previous: Object.fromEntries(prev) }
  })
  
  return frames
}

/**
 * Prim 最小生成树算法
 */
export function prim(graph: Graph, startId: string): GraphFrame[] {
  const frames: GraphFrame[] = []
  const { nodes, edges } = graph
  
  const inMST: Set<string> = new Set()
  const mstEdges: GraphEdge[] = []
  let totalWeight = 0
  
  frames.push({
    type: 'reset',
    highlightLine: 1,
    description: `Prim最小生成树算法 - 起点: ${startId}。从一个节点开始，每次选择连接树内外的最小权重边`
  })
  
  inMST.add(startId)
  frames.push({
    type: 'visit-node',
    nodeId: startId,
    highlightLine: 2,
    description: `步骤1: 初始化 - 将起始节点${startId}加入最小生成树MST，当前树中有${inMST.size}个节点`,
    data: { inMST: Array.from(inMST) }
  })
  
  let step = 2
  while (inMST.size < nodes.length) {
    // 找到连接 MST 和非 MST 的最小边
    let minEdge: GraphEdge | null = null
    let minWeight = Infinity
    
    for (const edge of edges) {
      const fromInMST = inMST.has(edge.from)
      const toInMST = inMST.has(edge.to)
      
      // 一端在 MST 内，一端在 MST 外
      if ((fromInMST && !toInMST) || (!fromInMST && toInMST)) {
        if (edge.weight < minWeight) {
          minWeight = edge.weight
          minEdge = edge
        }
      }
    }
    
    if (!minEdge) break
    
    const newNode = inMST.has(minEdge.from) ? minEdge.to : minEdge.from
    
    frames.push({
      type: 'visit-edge',
      fromNode: minEdge.from,
      toNode: minEdge.to,
      weight: minEdge.weight,
      highlightLine: 14,
      description: `步骤${step}: 扫描所有连接树内外的边，找到最小权重边: ${minEdge.from}-${minEdge.to}(权重=${minEdge.weight})`
    })
    
    inMST.add(newNode)
    mstEdges.push(minEdge)
    totalWeight += minEdge.weight
    
    frames.push({
      type: 'select-edge',
      edgeId: minEdge.id,
      fromNode: minEdge.from,
      toNode: minEdge.to,
      weight: minEdge.weight,
      highlightLine: 21,
      description: `步骤${step}: 选择边${minEdge.from}-${minEdge.to}加入MST，将新节点${newNode}加入树，树中现有${inMST.size}个节点`,
      data: { inMST: Array.from(inMST), mstEdges: mstEdges.map(e => e.id) }
    })
    
    frames.push({
      type: 'highlight',
      highlightLine: 22,
      description: `步骤${step}: 已选择${mstEdges.length}条边，当前MST总权值 = ${totalWeight}`,
      data: { mstEdges: mstEdges.map(e => e.id), totalWeight }
    })
    step++
  }
  
  frames.push({
    type: 'reset',
    highlightLine: 25,
    description: `Prim算法完成！最小生成树权值: ${totalWeight}`,
    data: { mstEdges: mstEdges.map(e => e.id), totalWeight }
  })
  
  return frames
}

/**
 * Kruskal 最小生成树算法
 */
export function kruskal(graph: Graph): GraphFrame[] {
  const frames: GraphFrame[] = []
  const { nodes, edges } = graph
  
  // 并查集
  const parent: Map<string, string> = new Map()
  const rank: Map<string, number> = new Map()
  
  function find(x: string): string {
    if (parent.get(x) !== x) {
      parent.set(x, find(parent.get(x)!))
    }
    return parent.get(x)!
  }
  
  function union(x: string, y: string): boolean {
    const px = find(x)
    const py = find(y)
    
    if (px === py) return false
    
    const rx = rank.get(px)!
    const ry = rank.get(py)!
    
    if (rx < ry) {
      parent.set(px, py)
    } else if (rx > ry) {
      parent.set(py, px)
    } else {
      parent.set(py, px)
      rank.set(px, rx + 1)
    }
    
    return true
  }
  
  // 初始化并查集
  nodes.forEach(node => {
    parent.set(node.id, node.id)
    rank.set(node.id, 0)
  })
  
  frames.push({
    type: 'reset',
    highlightLine: 18,
    description: `Kruskal最小生成树算法 - 将所有边按权值排序，依次选择不形成环的最小边。使用并查集检测环`
  })
  
  frames.push({
    type: 'highlight',
    highlightLine: 3,
    description: `步骤1: 初始化并查集 - 每个节点自成一个集合，共${nodes.length}个独立集合`
  })
  
  // 按权值排序边
  const sortedEdges = [...edges].sort((a, b) => a.weight - b.weight)
  
  frames.push({
    type: 'highlight',
    highlightLine: 18,
    description: `步骤2: 边按权值从小到大排序: ${sortedEdges.map(e => `${e.from}-${e.to}(${e.weight})`).join(', ')}`
  })
  
  const mstEdges: GraphEdge[] = []
  let totalWeight = 0
  let step = 3
  
  for (const edge of sortedEdges) {
    const rootFrom = find(edge.from)
    const rootTo = find(edge.to)
    
    frames.push({
      type: 'visit-edge',
      fromNode: edge.from,
      toNode: edge.to,
      weight: edge.weight,
      highlightLine: 21,
      description: `步骤${step}: 检查边${edge.from}-${edge.to}(权重=${edge.weight})，使用并查集判断${edge.from}和${edge.to}是否在同一集合`
    })
    
    if (union(edge.from, edge.to)) {
      mstEdges.push(edge)
      totalWeight += edge.weight
      
      frames.push({
        type: 'select-edge',
        edgeId: edge.id,
        fromNode: edge.from,
        toNode: edge.to,
        weight: edge.weight,
        highlightLine: 22,
        description: `步骤${step}: ${edge.from}和${edge.to}不在同一集合，选择此边不会形成环！合并两个集合，已选${mstEdges.length}条边`
      })
      
      frames.push({
        type: 'highlight',
        highlightLine: 24,
        description: `步骤${step}: MST当前总权值 = ${totalWeight}，还需${nodes.length - 1 - mstEdges.length}条边`,
        data: { mstEdges: mstEdges.map(e => e.id), totalWeight }
      })
      step++
      
      if (mstEdges.length === nodes.length - 1) break
    } else {
      frames.push({
        type: 'highlight',
        highlightLine: 13,
        description: `步骤${step}: ${edge.from}和${edge.to}已在同一集合，选择此边会形成环，跳过！`,
        data: { mstEdges: mstEdges.map(e => e.id) }
      })
      step++
    }
    
    if (false) {
      frames.push({
        type: 'highlight',
        highlightLine: 13,
        description: `跳过边 ${edge.from} - ${edge.to}，会形成环`
      })
    }
  }
  
  frames.push({
    type: 'reset',
    highlightLine: 28,
    description: `Kruskal算法完成！最小生成树权值: ${totalWeight}`,
    data: { mstEdges: mstEdges.map(e => e.id), totalWeight }
  })
  
  return frames
}

/**
 * 深度优先搜索
 */
export function dfs(graph: Graph, startId: string): GraphFrame[] {
  const frames: GraphFrame[] = []
  const visited: Set<string> = new Set()
  const order: string[] = []
  
  frames.push({
    type: 'reset',
    highlightLine: 1,
    description: `深度优先搜索：从节点 ${startId} 开始`
  })
  
  function dfsVisit(nodeId: string) {
    visited.add(nodeId)
    order.push(nodeId)
    
    frames.push({
      type: 'visit-node',
      nodeId: nodeId,
      highlightLine: 6,
      description: `访问节点 ${nodeId}，遍历序列: [${order.join(', ')}]`
    })
    
    // 获取邻居
    const neighbors = graph.edges
      .filter(e => e.from === nodeId || (!graph.directed && e.to === nodeId))
      .map(e => e.from === nodeId ? e.to : e.from)
    
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        frames.push({
          type: 'visit-edge',
          fromNode: nodeId,
          toNode: neighbor,
          highlightLine: 13,
          description: `沿边 ${nodeId} → ${neighbor} 深入`
        })
        dfsVisit(neighbor)
      }
    }
  }
  
  dfsVisit(startId)
  
  frames.push({
    type: 'reset',
    highlightLine: 19,
    description: `DFS完成！遍历序列: [${order.join(', ')}]`
  })
  
  return frames
}

/**
 * 广度优先搜索
 */
export function bfs(graph: Graph, startId: string): GraphFrame[] {
  const frames: GraphFrame[] = []
  const visited: Set<string> = new Set()
  const order: string[] = []
  const queue: string[] = [startId]
  
  visited.add(startId)
  
  frames.push({
    type: 'reset',
    highlightLine: 6,
    description: `广度优先搜索：从节点 ${startId} 开始`
  })
  
  while (queue.length > 0) {
    const nodeId = queue.shift()!
    order.push(nodeId)
    
    frames.push({
      type: 'visit-node',
      nodeId: nodeId,
      highlightLine: 7,
      description: `访问节点 ${nodeId}，遍历序列: [${order.join(', ')}]`
    })
    
    // 获取邻居
    const neighbors = graph.edges
      .filter(e => e.from === nodeId || (!graph.directed && e.to === nodeId))
      .map(e => e.from === nodeId ? e.to : e.from)
    
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        queue.push(neighbor)
        
        frames.push({
          type: 'visit-edge',
          fromNode: nodeId,
          toNode: neighbor,
          highlightLine: 16,
          description: `发现邻居 ${neighbor}，加入队列`
        })
      }
    }
  }
  
  frames.push({
    type: 'reset',
    highlightLine: 22,
    description: `BFS完成！遍历序列: [${order.join(', ')}]`
  })
  
  return frames
}

// 算法信息
export const graphAlgorithms = {
  dijkstra: {
    name: 'Dijkstra算法',
    nameEn: 'Dijkstra\'s Algorithm',
    description: '求单源最短路径，适用于非负权图',
    timeComplexity: 'O(V² 或 E log V)',
    spaceComplexity: 'O(V)'
  },
  prim: {
    name: 'Prim算法',
    nameEn: 'Prim\'s Algorithm',
    description: '从一个顶点开始，逐步扩展最小生成树',
    timeComplexity: 'O(V² 或 E log V)',
    spaceComplexity: 'O(V)'
  },
  kruskal: {
    name: 'Kruskal算法',
    nameEn: 'Kruskal\'s Algorithm',
    description: '按边权值排序，依次选择不形成环的最小边',
    timeComplexity: 'O(E log E)',
    spaceComplexity: 'O(V)'
  },
  dfs: {
    name: '深度优先搜索',
    nameEn: 'Depth-First Search',
    description: '沿着一条路径深入到底，再回溯',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)'
  },
  bfs: {
    name: '广度优先搜索',
    nameEn: 'Breadth-First Search',
    description: '逐层访问所有节点',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)'
  }
}
