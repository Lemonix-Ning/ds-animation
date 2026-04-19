/**
 * 算法伪代码
 * 每个算法对应一段伪代码，用于教学展示
 */

export interface PseudoCode {
  title: string
  code: string[]  // 每行代码
}

// 排序算法伪代码
export const sortingPseudoCode: Record<string, PseudoCode> = {
  bubble: {
    title: '冒泡排序',
    code: [
      'function bubbleSort(arr):',
      '  n = arr.length',
      '  for i = 0 to n-2:',
      '    for j = 0 to n-2-i:',
      '      if arr[j] > arr[j+1]:',
      '        swap(arr[j], arr[j+1])',
      '    // arr[n-1-i] 已就位',
      '  return arr'
    ]
  },
  selection: {
    title: '选择排序',
    code: [
      'function selectionSort(arr):',
      '  n = arr.length',
      '  for i = 0 to n-2:',
      '    minIdx = i',
      '    for j = i+1 to n-1:',
      '      if arr[j] < arr[minIdx]:',
      '        minIdx = j',
      '    if minIdx != i:',
      '      swap(arr[i], arr[minIdx])',
      '  return arr'
    ]
  },
  insertion: {
    title: '插入排序',
    code: [
      'function insertionSort(arr):',
      '  n = arr.length',
      '  for i = 1 to n-1:',
      '    key = arr[i]',
      '    j = i - 1',
      '    while j >= 0 and arr[j] > key:',
      '      arr[j+1] = arr[j]',
      '      j = j - 1',
      '    arr[j+1] = key',
      '  return arr'
    ]
  },
  quick: {
    title: '快速排序',
    code: [
      'function quickSort(arr, low, high):',
      '  if low < high:',
      '    pivot = partition(arr, low, high)',
      '    quickSort(arr, low, pivot-1)',
      '    quickSort(arr, pivot+1, high)',
      '',
      'function partition(arr, low, high):',
      '  pivot = arr[high]',
      '  i = low - 1',
      '  for j = low to high-1:',
      '    if arr[j] <= pivot:',
      '      i = i + 1',
      '      swap(arr[i], arr[j])',
      '  swap(arr[i+1], arr[high])',
      '  return i + 1'
    ]
  },
  heap: {
    title: '堆排序',
    code: [
      'function heapSort(arr):',
      '  n = arr.length',
      '  // 建立最大堆',
      '  for i = n/2-1 down to 0:',
      '    heapify(arr, n, i)',
      '  // 排序',
      '  for i = n-1 down to 1:',
      '    swap(arr[0], arr[i])',
      '    heapify(arr, i, 0)',
      '',
      'function heapify(arr, n, i):',
      '  largest = i',
      '  left = 2*i + 1',
      '  right = 2*i + 2',
      '  if left < n and arr[left] > arr[largest]:',
      '    largest = left',
      '  if right < n and arr[right] > arr[largest]:',
      '    largest = right',
      '  if largest != i:',
      '    swap(arr[i], arr[largest])',
      '    heapify(arr, n, largest)'
    ]
  },
  shell: {
    title: '希尔排序',
    code: [
      'function shellSort(arr):',
      '  n = arr.length',
      '  gap = n / 2',
      '  while gap > 0:',
      '    for i = gap to n-1:',
      '      temp = arr[i]',
      '      j = i',
      '      while j >= gap and arr[j-gap] > temp:',
      '        arr[j] = arr[j-gap]',
      '        j = j - gap',
      '      arr[j] = temp',
      '    gap = gap / 2',
      '  return arr'
    ]
  },
  merge: {
    title: '归并排序',
    code: [
      'function mergeSort(arr, left, right):',
      '  if left < right:',
      '    mid = (left + right) / 2',
      '    mergeSort(arr, left, mid)',
      '    mergeSort(arr, mid+1, right)',
      '    merge(arr, left, mid, right)',
      '',
      'function merge(arr, left, mid, right):',
      '  leftArr = arr[left..mid]',
      '  rightArr = arr[mid+1..right]',
      '  i = 0, j = 0, k = left',
      '  while i < leftArr.length and j < rightArr.length:',
      '    if leftArr[i] <= rightArr[j]:',
      '      arr[k] = leftArr[i++]',
      '    else:',
      '      arr[k] = rightArr[j++]',
      '    k++',
      '  // 复制剩余元素',
      '  while i < leftArr.length: arr[k++] = leftArr[i++]',
      '  while j < rightArr.length: arr[k++] = rightArr[j++]'
    ]
  }
}

// 字符串匹配伪代码
export const stringPseudoCode: Record<string, PseudoCode> = {
  kmp: {
    title: 'KMP算法',
    code: [
      'function KMP(text, pattern):',
      '  next = computeNext(pattern)',
      '  i = 0, j = 0',
      '  while i < text.length:',
      '    if text[i] == pattern[j]:',
      '      i++, j++',
      '      if j == pattern.length:',
      '        return i - j  // 匹配成功',
      '    else if j > 0:',
      '      j = next[j-1]  // 回退',
      '    else:',
      '      i++',
      '  return -1  // 未找到',
      '',
      'function computeNext(pattern):',
      '  next[0] = 0',
      '  j = 0',
      '  for i = 1 to pattern.length-1:',
      '    while j > 0 and pattern[i] != pattern[j]:',
      '      j = next[j-1]',
      '    if pattern[i] == pattern[j]:',
      '      j++',
      '    next[i] = j',
      '  return next'
    ]
  },
  bruteForce: {
    title: '朴素匹配',
    code: [
      'function bruteForce(text, pattern):',
      '  n = text.length',
      '  m = pattern.length',
      '  for i = 0 to n-m:',
      '    j = 0',
      '    while j < m and text[i+j] == pattern[j]:',
      '      j++',
      '    if j == m:',
      '      return i  // 匹配成功',
      '  return -1  // 未找到'
    ]
  }
}

// 树算法伪代码
export const treePseudoCode: Record<string, PseudoCode> = {
  preorder: {
    title: '前序遍历',
    code: [
      'function preorder(root):',
      '  if root == null:',
      '    return',
      '  visit(root)        // 访问根节点',
      '  preorder(root.left)   // 遍历左子树',
      '  preorder(root.right)  // 遍历右子树'
    ]
  },
  inorder: {
    title: '中序遍历',
    code: [
      'function inorder(root):',
      '  if root == null:',
      '    return',
      '  inorder(root.left)    // 遍历左子树',
      '  visit(root)        // 访问根节点',
      '  inorder(root.right)   // 遍历右子树'
    ]
  },
  postorder: {
    title: '后序遍历',
    code: [
      'function postorder(root):',
      '  if root == null:',
      '    return',
      '  postorder(root.left)  // 遍历左子树',
      '  postorder(root.right) // 遍历右子树',
      '  visit(root)        // 访问根节点'
    ]
  },
  levelorder: {
    title: '层序遍历',
    code: [
      'function levelOrder(root):',
      '  if root == null:',
      '    return',
      '  queue = [root]',
      '  while queue not empty:',
      '    node = queue.dequeue()',
      '    visit(node)',
      '    if node.left:',
      '      queue.enqueue(node.left)',
      '    if node.right:',
      '      queue.enqueue(node.right)'
    ]
  },
  bstInsert: {
    title: 'BST插入',
    code: [
      'function bstInsert(root, value):',
      '  if root == null:',
      '    return new Node(value)',
      '  if value < root.value:',
      '    root.left = bstInsert(root.left, value)',
      '  else if value > root.value:',
      '    root.right = bstInsert(root.right, value)',
      '  return root'
    ]
  },
  bstDelete: {
    title: 'BST删除',
    code: [
      'function bstDelete(root, value):',
      '  if root == null:',
      '    return null',
      '  if value < root.value:',
      '    root.left = bstDelete(root.left, value)',
      '  else if value > root.value:',
      '    root.right = bstDelete(root.right, value)',
      '  else:',
      '    // 情况1: 叶子节点',
      '    if root.left == null and root.right == null:',
      '      return null',
      '    // 情况2: 只有一个子节点',
      '    if root.left == null:',
      '      return root.right',
      '    if root.right == null:',
      '      return root.left',
      '    // 情况3: 两个子节点',
      '    minNode = findMin(root.right)',
      '    root.value = minNode.value',
      '    root.right = bstDelete(root.right, minNode.value)',
      '  return root'
    ]
  },
  huffman: {
    title: '哈夫曼树',
    code: [
      'function buildHuffman(weights):',
      '  // 创建叶子节点',
      '  forest = []',
      '  for each weight in weights:',
      '    forest.add(new Node(weight))',
      '  // 合并节点',
      '  while forest.length > 1:',
      '    sort(forest)  // 按权值排序',
      '    left = forest.removeMin()',
      '    right = forest.removeMin()',
      '    parent = new Node(left.weight + right.weight)',
      '    parent.left = left',
      '    parent.right = right',
      '    forest.add(parent)',
      '  return forest[0]  // 返回根节点'
    ]
  }
}

// 查找算法伪代码
export const searchPseudoCode: Record<string, PseudoCode> = {
  binary: {
    title: '二分查找',
    code: [
      'function binarySearch(arr, target):',
      '  left = 0',
      '  right = arr.length - 1',
      '  while left <= right:',
      '    mid = (left + right) / 2',
      '    if arr[mid] == target:',
      '      return mid  // 找到',
      '    else if arr[mid] < target:',
      '      left = mid + 1',
      '    else:',
      '      right = mid - 1',
      '  return -1  // 未找到'
    ]
  },
  bst: {
    title: 'BST查找',
    code: [
      'function bstSearch(root, target):',
      '  if root == null:',
      '    return null  // 未找到',
      '  if target == root.value:',
      '    return root  // 找到',
      '  else if target < root.value:',
      '    return bstSearch(root.left, target)',
      '  else:',
      '    return bstSearch(root.right, target)'
    ]
  },
  hash: {
    title: '哈希表查找',
    code: [
      'function hashSearch(table, key):',
      '  index = hash(key) % table.size',
      '  // 线性探测',
      '  while table[index] != null:',
      '    if table[index] == key:',
      '      return index  // 找到',
      '    index = (index + 1) % table.size',
      '  return -1  // 未找到',
      '',
      'function hashInsert(table, key):',
      '  index = hash(key) % table.size',
      '  while table[index] != null:',
      '    index = (index + 1) % table.size',
      '  table[index] = key'
    ]
  }
}

// 图算法伪代码
export const graphPseudoCode: Record<string, PseudoCode> = {
  dijkstra: {
    title: 'Dijkstra最短路径',
    code: [
      'function dijkstra(graph, start):',
      '  dist[start] = 0',
      '  for each vertex v:',
      '    if v != start: dist[v] = ∞',
      '  visited = {}',
      '  while visited.size < graph.size:',
      '    u = 未访问节点中dist最小的',
      '    visited.add(u)',
      '    for each neighbor v of u:',
      '      if v not in visited:',
      '        newDist = dist[u] + weight(u,v)',
      '        if newDist < dist[v]:',
      '          dist[v] = newDist  // 松弛操作',
      '  return dist'
    ]
  },
  prim: {
    title: 'Prim最小生成树',
    code: [
      'function prim(graph, start):',
      '  visited = {start}',
      '  mst = []',
      '  while visited.size < graph.size:',
      '    minEdge = null',
      '    for each v in visited:',
      '      for each neighbor u of v:',
      '        if u not in visited:',
      '          if minEdge == null or weight(v,u) < minEdge.weight:',
      '            minEdge = (v, u)',
      '    mst.add(minEdge)',
      '    visited.add(minEdge.to)',
      '  return mst'
    ]
  },
  kruskal: {
    title: 'Kruskal最小生成树',
    code: [
      'function kruskal(graph):',
      '  edges = graph.edges',
      '  sort(edges)  // 按权值排序',
      '  mst = []',
      '  parent = initUnionFind()',
      '  for each edge (u,v) in edges:',
      '    if find(u) != find(v):  // 不在同一集合',
      '      mst.add(edge)',
      '      union(u, v)  // 合并集合',
      '      if mst.size == graph.size - 1:',
      '        break',
      '  return mst'
    ]
  },
  dfs: {
    title: '深度优先搜索',
    code: [
      'function DFS(graph, start):',
      '  visited = {}',
      '  stack = [start]',
      '  while stack not empty:',
      '    node = stack.pop()',
      '    if node not in visited:',
      '      visit(node)',
      '      visited.add(node)',
      '      for each neighbor of node:',
      '        if neighbor not in visited:',
      '          stack.push(neighbor)'
    ]
  },
  bfs: {
    title: '广度优先搜索',
    code: [
      'function BFS(graph, start):',
      '  visited = {}',
      '  queue = [start]',
      '  while queue not empty:',
      '    node = queue.dequeue()',
      '    if node not in visited:',
      '      visit(node)',
      '      visited.add(node)',
      '      for each neighbor of node:',
      '        if neighbor not in visited:',
      '          queue.enqueue(neighbor)'
    ]
  }
}
