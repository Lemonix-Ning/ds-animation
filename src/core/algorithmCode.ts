/**
 * 算法真实代码
 * 用于可编辑的代码面板
 */

export interface AlgorithmCode {
  title: string
  code: string  // 简化的教学代码
  language: string
  fullCode?: string  // 完整的可执行代码（可选）
}

// 排序算法代码

export const linearAlgorithmCode: Record<string, AlgorithmCode> = {
  insert: {
    title: '顺序表插入',
    language: 'javascript',
    code: `function sequentialInsert(arr, index, value) {
  if (index < 0 || index > arr.length) return arr
  for (let i = arr.length - 1; i >= index; i--) {
    arr[i + 1] = arr[i]
  }
  arr[index] = value
  return arr
}`,
    fullCode: `function sequentialInsert(arr, index, value) {
  const frames = []
  const data = [...arr]

  frames.push({
    type: 'reset',
    index: -1,
    description: '开始插入: index=' + index + ', value=' + value,
    highlightLine: 0,
    data: { array: [...data] }
  })

  if (index < 0 || index > data.length) {
    frames.push({
      type: 'highlight',
      index: -1,
      description: '位置不合法',
      highlightLine: 1,
      data: { array: [...data], error: true }
    })
    return frames
  }

  for (let i = data.length - 1; i >= index; i--) {
    frames.push({
      type: 'highlight',
      index: i,
      description: '准备后移 arr[' + i + ']',
      highlightLine: 3,
      data: { array: [...data] }
    })

    frames.push({
      type: 'move',
      index: i,
      value: data[i],
      description: 'arr[' + (i + 1) + '] = arr[' + i + ']',
      highlightLine: 4,
      data: { array: [...data], moveFrom: i, moveTo: i + 1 }
    })
  }

  data.splice(index, 0, value)
  frames.push({
    type: 'insert',
    index: index,
    value: value,
    description: '在位置 ' + index + ' 插入 ' + value,
    highlightLine: 7,
    data: { array: [...data] }
  })

  frames.push({
    type: 'reset',
    index: -1,
    description: '插入完成',
    highlightLine: 8,
    data: { array: [...data] }
  })

  return frames
}`
  },
  delete: {
    title: '顺序表删除',
    language: 'javascript',
    code: `function sequentialDelete(arr, index) {
  if (index < 0 || index >= arr.length) return arr
  for (let i = index; i < arr.length - 1; i++) {
    arr[i] = arr[i + 1]
  }
  arr.length = arr.length - 1
  return arr
}`,
    fullCode: `function sequentialDelete(arr, index) {
  const frames = []
  const data = [...arr]

  frames.push({
    type: 'reset',
    index: -1,
    description: '开始删除位置 ' + index,
    highlightLine: 0,
    data: { array: [...data] }
  })

  if (index < 0 || index >= data.length) {
    frames.push({
      type: 'highlight',
      index: -1,
      description: '位置不合法',
      highlightLine: 1,
      data: { array: [...data], error: true }
    })
    return frames
  }

  frames.push({
    type: 'delete',
    index: index,
    value: data[index],
    description: '删除 arr[' + index + '] = ' + data[index],
    highlightLine: 3,
    data: { array: [...data], deleting: index }
  })

  for (let i = index; i < data.length - 1; i++) {
    frames.push({
      type: 'move',
      index: i,
      value: data[i + 1],
      description: 'arr[' + i + '] = arr[' + (i + 1) + ']',
      highlightLine: 5,
      data: { array: [...data], moveFrom: i + 1, moveTo: i }
    })
  }

  data.splice(index, 1)
  frames.push({
    type: 'reset',
    index: -1,
    description: '删除完成',
    highlightLine: 8,
    data: { array: [...data] }
  })

  return frames
}`
  },
  search: {
    title: '顺序表查找',
    language: 'javascript',
    code: `function sequentialSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i
  }
  return -1
}`,
    fullCode: `function sequentialSearch(arr, target) {
  const frames = []
  const data = [...arr]

  frames.push({
    type: 'reset',
    index: -1,
    description: '开始查找 ' + target,
    highlightLine: 0,
    data: { array: [...data], target: target }
  })

  for (let i = 0; i < data.length; i++) {
    frames.push({
      type: 'search',
      index: i,
      description: '比较 arr[' + i + '] = ' + data[i],
      highlightLine: 2,
      data: { array: [...data], comparing: i }
    })

    if (data[i] === target) {
      frames.push({
        type: 'highlight',
        index: i,
        description: '找到目标，位置 ' + i,
        highlightLine: 3,
        data: { array: [...data], found: i }
      })
      return frames
    }
  }

  frames.push({
    type: 'reset',
    index: -1,
    description: '未找到目标',
    highlightLine: 5,
    data: { array: [...data], notFound: true }
  })

  return frames
}`
  },
  reverse: {
    title: '链表逆置',
    language: 'javascript',
    code: `function linkedListReverse(head) {
  let prev = null
  let curr = head
  while (curr) {
    const next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }
  return prev
}`,
    fullCode: `function linkedListReverse(nodes) {
  const frames = []
  const data = nodes.map(n => ({ ...n }))

  frames.push({
    type: 'reset',
    index: -1,
    description: '开始链表逆置',
    highlightLine: 0,
    data: { nodes: data.map(n => ({ ...n })) }
  })

  frames.push({
    type: 'highlight',
    index: -1,
    description: '使用三指针 prev/curr/next',
    highlightLine: 2,
    data: { nodes: data.map(n => ({ ...n })) }
  })

  frames.push({
    type: 'move',
    index: -1,
    description: '逐节点反转 next 指针',
    highlightLine: 5,
    data: { nodes: data.map(n => ({ ...n })) }
  })

  frames.push({
    type: 'reset',
    index: -1,
    description: '逆置完成',
    highlightLine: 8,
    data: { nodes: data.map(n => ({ ...n })) }
  })

  return frames
}`
  },
  linkedInsert: {
    title: '链表插入',
    language: 'javascript',
    code: `function linkedListInsert(head, position, value) {
  if (position === 0) return { value, next: head }
  let curr = head
  for (let i = 0; i < position - 1 && curr; i++) {
    curr = curr.next
  }
  if (!curr) return head
  curr.next = { value, next: curr.next }
  return head
}`,
    fullCode: `function linkedListInsert(nodes, position, value) {
  const frames = []
  const data = nodes.map(n => ({ ...n }))

  frames.push({
    type: 'reset',
    index: -1,
    description: '开始链表插入 value=' + value + ', pos=' + position,
    highlightLine: 0,
    data: { nodes: data.map(n => ({ ...n })) }
  })

  frames.push({
    type: 'highlight',
    index: Math.max(0, position - 1),
    description: '定位前驱节点',
    highlightLine: 4,
    data: { nodes: data.map(n => ({ ...n })) }
  })

  frames.push({
    type: 'insert',
    index: position,
    value: value,
    description: '创建新节点并连接指针',
    highlightLine: 8,
    data: { nodes: data.map(n => ({ ...n })) }
  })

  frames.push({
    type: 'move',
    index: position,
    description: '先连新节点 next 再改前驱 next',
    highlightLine: 9,
    data: { nodes: data.map(n => ({ ...n })) }
  })

  frames.push({
    type: 'reset',
    index: -1,
    description: '插入完成',
    highlightLine: 10,
    data: { nodes: data.map(n => ({ ...n })) }
  })

  return frames
}`
  },
  linkedDelete: {
    title: '链表删除',
    language: 'javascript',
    code: `function linkedListDelete(head, position) {
  if (!head) return null
  if (position === 0) return head.next
  let curr = head
  for (let i = 0; i < position - 1 && curr; i++) {
    curr = curr.next
  }
  if (!curr || !curr.next) return head
  curr.next = curr.next.next
  return head
}`,
    fullCode: `function linkedListDelete(nodes, position) {
  const frames = []
  const data = nodes.map(n => ({ ...n }))

  frames.push({
    type: 'reset',
    index: -1,
    description: '开始删除位置 ' + position,
    highlightLine: 0,
    data: { nodes: data.map(n => ({ ...n })) }
  })

  frames.push({
    type: 'highlight',
    index: Math.max(0, position - 1),
    description: '定位前驱节点与待删节点',
    highlightLine: 4,
    data: { nodes: data.map(n => ({ ...n })) }
  })

  frames.push({
    type: 'delete',
    index: position,
    description: '让前驱 next 指向待删节点 next',
    highlightLine: 8,
    data: { nodes: data.map(n => ({ ...n })) }
  })

  frames.push({
    type: 'reset',
    index: -1,
    description: '删除完成',
    highlightLine: 9,
    data: { nodes: data.map(n => ({ ...n })) }
  })

  return frames
}`
  }
}

export const sortingAlgorithmCode: Record<string, AlgorithmCode> = {
  bubble: {
    title: '冒泡排序',
    language: 'javascript',
    code: `function bubbleSort(arr) {
  const data = [...arr]
  const n = data.length
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      
      // 比较相邻元素
      if (data[j] > data[j + 1]) {
        
        // 交换元素
        const temp = data[j]
        data[j] = data[j + 1]
        data[j + 1] = temp
      }
    }
    // 当前轮次结束，最大元素已就位
  }
  
  return data
}`,
    fullCode: `function bubbleSort(arr) {
  const frames = []
  const data = [...arr]
  const n = data.length
  
  let comparisons = 0
  let swaps = 0
  let arrayAccesses = 0
  
  frames.push({
    type: 'reset',
    indices: [],
    values: [...data],
    description: \`开始冒泡排序，数组长度: \${n}\`,
    stats: { comparisons, swaps, arrayAccesses }
  })
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      comparisons++
      arrayAccesses += 2
      frames.push({
        type: 'compare',
        indices: [j, j + 1],
        values: [...data],
        description: \`比较 arr[\${j}]=\${data[j]} 和 arr[\${j + 1}]=\${data[j + 1]}\`,
        stats: { comparisons, swaps, arrayAccesses }
      })
      
      if (data[j] > data[j + 1]) {
        swaps++
        arrayAccesses += 4
        const temp = data[j]
        data[j] = data[j + 1]
        data[j + 1] = temp
        frames.push({
          type: 'swap',
          indices: [j, j + 1],
          values: [...data],
          description: \`交换 arr[\${j}] 和 arr[\${j + 1}]\`,
          stats: { comparisons, swaps, arrayAccesses }
        })
      }
    }
    arrayAccesses++
    frames.push({
      type: 'sorted',
      indices: [n - 1 - i],
      values: [...data],
      description: \`第\${i + 1} 轮结束，arr[\${n - 1 - i}]=\${data[n - 1 - i]} 已就位\`,
      stats: { comparisons, swaps, arrayAccesses }
    })
  }
  
  frames.push({
    type: 'sorted',
    indices: [0],
    values: [...data],
    description: \`排序完成！总计：\${comparisons}次比较，\${swaps}次交换\`,
    stats: { comparisons, swaps, arrayAccesses }
  })
  
  return frames
}`
  },
  
  selection: {
    title: '选择排序',
    language: 'javascript',
    code: `function selectionSort(arr) {
  const data = [...arr]
  const n = data.length
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    
    // 寻找最小值
    for (let j = i + 1; j < n; j++) {
      if (data[j] < data[minIdx]) {
        minIdx = j
      }
    }
    
    // 交换到正确位置
    const temp = data[i]
    data[i] = data[minIdx]
    data[minIdx] = temp
    // 当前位置已就位
  }
  
  return data
}`,
    fullCode: `function selectionSort(arr) {
  const frames = []
  const data = [...arr]
  const n = data.length
  
  let comparisons = 0
  let swaps = 0
  let arrayAccesses = 0
  
  frames.push({
    type: 'reset',
    indices: [],
    values: [...data],
    description: \`开始选择排序，数组长度: \${n}\`,
    highlightLine: 0,
    stats: { comparisons, swaps, arrayAccesses }
  })
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    arrayAccesses++
    
    frames.push({
      type: 'highlight',
      indices: [i],
      values: [...data],
      description: \`第\${i + 1} 轮：从位置\${i} 开始寻找最小值\`,
      highlightLine: 2,
      stats: { comparisons, swaps, arrayAccesses }
    })
    
    for (let j = i + 1; j < n; j++) {
      comparisons++
      arrayAccesses += 2
      frames.push({
        type: 'compare',
        indices: [minIdx, j],
        values: [...data],
        description: \`比较当前最小值 arr[\${minIdx}]=\${data[minIdx]} 和 arr[\${j}]=\${data[j]}\`,
        highlightLine: 5,
        stats: { comparisons, swaps, arrayAccesses }
      })
      
      if (data[j] < data[minIdx]) {
        minIdx = j
        frames.push({
          type: 'highlight',
          indices: [minIdx],
          values: [...data],
          description: \`更新最小值位置为 \${minIdx}，值为 \${data[minIdx]}\`,
          highlightLine: 6,
          stats: { comparisons, swaps, arrayAccesses }
        })
      }
    }
    
    if (minIdx !== i) {
      swaps++
      arrayAccesses += 4
      const temp = data[i]
      data[i] = data[minIdx]
      data[minIdx] = temp
      frames.push({
        type: 'swap',
        indices: [i, minIdx],
        values: [...data],
        description: \`交换 arr[\${i}] 和 arr[\${minIdx}]\`,
        highlightLine: 8,
        stats: { comparisons, swaps, arrayAccesses }
      })
    }
    
    frames.push({
      type: 'sorted',
      indices: [i],
      values: [...data],
      description: \`arr[\${i}]=\${data[i]} 已就位\`,
      highlightLine: 9,
      stats: { comparisons, swaps, arrayAccesses }
    })
  }
  
  frames.push({
    type: 'sorted',
    indices: [n - 1],
    values: [...data],
    description: \`排序完成！总计：\${comparisons}次比较，\${swaps}次交换\`,
    highlightLine: 9,
    stats: { comparisons, swaps, arrayAccesses }
  })
  
  return frames
}`
  },
  
  insertion: {
    title: '插入排序',
    language: 'javascript',
    code: `function insertionSort(arr) {
  const data = [...arr]
  const n = data.length
  
  for (let i = 1; i < n; i++) {
    const key = data[i]
    let j = i - 1
    
    // 比较并后移元素
    while (j >= 0 && data[j] > key) {
      data[j + 1] = data[j]
      j--
    }
    
    // 插入到正确位置
    data[j + 1] = key
    // 前 i+1 个元素已有序
  }
  
  return data
}`,
    fullCode: `function insertionSort(arr) {
  const frames = []
  const data = [...arr]
  const n = data.length
  
  let comparisons = 0
  let swaps = 0
  let arrayAccesses = 0
  
  frames.push({
    type: 'reset',
    indices: [],
    values: [...data],
    description: \`开始插入排序，数组长度: \${n}\`,
    highlightLine: 0,
    stats: { comparisons, swaps, arrayAccesses }
  })
  
  arrayAccesses++
  frames.push({
    type: 'sorted',
    indices: [0],
    values: [...data],
    description: \`arr[0]=\${data[0]} 作为初始有序区\`,
    highlightLine: 1,
    stats: { comparisons, swaps, arrayAccesses }
  })
  
  for (let i = 1; i < n; i++) {
    const key = data[i]
    let j = i - 1
    arrayAccesses++
    
    frames.push({
      type: 'highlight',
      indices: [i],
      values: [...data],
      description: \`取出 arr[\${i}]=\${key} 准备插入有序区\`,
      highlightLine: 3,
      stats: { comparisons, swaps, arrayAccesses }
    })
    
    while (j >= 0 && data[j] > key) {
      comparisons++
      arrayAccesses += 2
      frames.push({
        type: 'compare',
        indices: [j, j + 1],
        values: [...data],
        description: \`比较 arr[\${j}]=\${data[j]} > \${key}，需要后移\`,
        highlightLine: 5,
        stats: { comparisons, swaps, arrayAccesses }
      })
      
      swaps++
      arrayAccesses += 2
      data[j + 1] = data[j]
      frames.push({
        type: 'set',
        indices: [j + 1],
        values: [...data],
        description: \`arr[\${j + 1}] = arr[\${j}] = \${data[j]}\`,
        highlightLine: 6,
        stats: { comparisons, swaps, arrayAccesses }
      })
      j--
    }
    
    if (j >= 0) {
      comparisons++
      arrayAccesses++
    }
    
    arrayAccesses++
    data[j + 1] = key
    frames.push({
      type: 'set',
      indices: [j + 1],
      values: [...data],
      description: \`将\${key} 插入到位置\${j + 1}\`,
      highlightLine: 8,
      stats: { comparisons, swaps, arrayAccesses }
    })
    
    const sortedIndices = []
    for (let k = 0; k <= i; k++) sortedIndices.push(k)
    frames.push({
      type: 'sorted',
      indices: sortedIndices,
      values: [...data],
      description: \`前\${i + 1} 个元素已有序\`,
      highlightLine: 9,
      stats: { comparisons, swaps, arrayAccesses }
    })
  }
  
  const allIndices = []
  for (let i = 0; i < n; i++) allIndices.push(i)
  frames.push({
    type: 'sorted',
    indices: allIndices,
    values: [...data],
    description: \`排序完成！总计：\${comparisons}次比较，\${swaps}次移动\`,
    highlightLine: 9,
    stats: { comparisons, swaps, arrayAccesses }
  })
  
  return frames
}`
  },
  
  quick: {
    title: '快速排序',
    language: 'javascript',
    code: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high)
    quickSort(arr, low, pi - 1)
    quickSort(arr, pi + 1, high)
  }
  return arr
}

function partition(arr, low, high) {
  const pivot = arr[high]
  let i = low - 1
  
  // 比较并分区
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
  }
  
  // 基准归位
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
  return i + 1
}`,
    fullCode: `function quickSort(arr) {
  const frames = []
  const data = [...arr]
  
  let comparisons = 0
  let swaps = 0
  let arrayAccesses = 0
  
  frames.push({
    type: 'reset',
    indices: [],
    values: [...data],
    description: \`开始快速排序，数组长度: \${data.length}\`,
    highlightLine: 0,
    stats: { comparisons, swaps, arrayAccesses }
  })
  
  const sortedIndices = new Set()
  
  function partition(low, high) {
    const pivot = data[high]
    arrayAccesses++
    
    frames.push({
      type: 'pivot',
      indices: [high],
      values: [...data],
      description: \`选择 arr[\${high}]=\${pivot} 作为基准\`,
      highlightLine: 7,
      stats: { comparisons, swaps, arrayAccesses }
    })
    
    let i = low - 1
    
    for (let j = low; j < high; j++) {
      comparisons++
      arrayAccesses += 2
      frames.push({
        type: 'compare',
        indices: [j, high],
        values: [...data],
        description: \`比较 arr[\${j}]=\${data[j]} 和基准\${pivot}\`,
        highlightLine: 10,
        stats: { comparisons, swaps, arrayAccesses }
      })
      
      if (data[j] <= pivot) {
        i++
        if (i !== j) {
          swaps++
          arrayAccesses += 4
          const temp = data[j]
          data[j] = data[i]
          data[i] = temp
          frames.push({
            type: 'swap',
            indices: [i, j],
            values: [...data],
            description: \`arr[\${j}]=\${data[j]} <= \${pivot}，交换 arr[\${i}] 和 arr[\${j}]\`,
            highlightLine: 12,
            stats: { comparisons, swaps, arrayAccesses }
          })
        }
      }
    }
    
    swaps++
    arrayAccesses += 4
    const temp = data[high]
    data[high] = data[i + 1]
    data[i + 1] = temp
    frames.push({
      type: 'swap',
      indices: [i + 1, high],
      values: [...data],
      description: \`将基准\${pivot} 放到正确位置 \${i + 1}\`,
      highlightLine: 13,
      stats: { comparisons, swaps, arrayAccesses }
    })
    
    sortedIndices.add(i + 1)
    frames.push({
      type: 'sorted',
      indices: [i + 1],
      values: [...data],
      description: \`arr[\${i + 1}]=\${data[i + 1]} 已就位\`,
      highlightLine: 14,
      stats: { comparisons, swaps, arrayAccesses }
    })
    
    return i + 1
  }
  
  function quickSortRecursive(low, high) {
    if (low < high) {
      const rangeIndices = []
      for (let i = low; i <= high; i++) rangeIndices.push(i)
      frames.push({
        type: 'partition',
        indices: rangeIndices,
        values: [...data],
        description: \`处理子数组[\${low}..\${high}]\`,
        highlightLine: 1,
        stats: { comparisons, swaps, arrayAccesses }
      })
      
      const pi = partition(low, high)
      quickSortRecursive(low, pi - 1)
      quickSortRecursive(pi + 1, high)
    } else if (low === high) {
      sortedIndices.add(low)
      arrayAccesses++
      frames.push({
        type: 'sorted',
        indices: [low],
        values: [...data],
        description: \`arr[\${low}]=\${data[low]} 已就位（单元素子数组）\`,
        highlightLine: 2,
        stats: { comparisons, swaps, arrayAccesses }
      })
    }
  }
  
  quickSortRecursive(0, data.length - 1)
  
  const allIndices = []
  for (let i = 0; i < data.length; i++) allIndices.push(i)
  frames.push({
    type: 'sorted',
    indices: allIndices,
    values: [...data],
    description: \`排序完成！总计：\${comparisons}次比较，\${swaps}次交换\`,
    highlightLine: 14,
    stats: { comparisons, swaps, arrayAccesses }
  })
  
  return frames
}`
  },
  
  heap: {
    title: '堆排序',
    language: 'javascript',
    code: `function heapSort(arr) {
  const data = [...arr]
  const n = data.length
  
  // 建立最大堆
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(data, n, i)
  }
  
  // 排序
  for (let i = n - 1; i > 0; i--) {
    [data[0], data[i]] = [data[i], data[0]]
    heapify(data, i, 0)
  }
  
  return data
}

function heapify(arr, size, i) {
  let largest = i
  const left = 2 * i + 1
  const right = 2 * i + 2
  
  // 比较左右子节点
  if (left < size && arr[left] > arr[largest]) largest = left
  if (right < size && arr[right] > arr[largest]) largest = right
  
  // 交换并递归
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]]
    heapify(arr, size, largest)
  }
}`,
    fullCode: `function heapSort(arr) {
  const frames = []
  const data = [...arr]
  const n = data.length
  
  let comparisons = 0
  let swaps = 0
  let arrayAccesses = 0
  
  frames.push({
    type: 'reset',
    indices: [],
    values: [...data],
    description: \`开始堆排序，数组长度: \${n}\`,
    highlightLine: 0,
    stats: { comparisons, swaps, arrayAccesses }
  })
  
  function heapify(size, i) {
    let largest = i
    const left = 2 * i + 1
    const right = 2 * i + 2
    
    if (left < size) {
      comparisons++
      arrayAccesses += 2
      frames.push({
        type: 'compare',
        indices: [largest, left],
        values: [...data],
        description: \`比较节点 arr[\${largest}]=\${data[largest]} 和左子节点 arr[\${left}]=\${data[left]}\`,
        highlightLine: 13,
        stats: { comparisons, swaps, arrayAccesses }
      })
      if (data[left] > data[largest]) {
        largest = left
      }
    }
    
    if (right < size) {
      comparisons++
      arrayAccesses += 2
      frames.push({
        type: 'compare',
        indices: [largest, right],
        values: [...data],
        description: \`比较节点 arr[\${largest}]=\${data[largest]} 和右子节点 arr[\${right}]=\${data[right]}\`,
        highlightLine: 15,
        stats: { comparisons, swaps, arrayAccesses }
      })
      if (data[right] > data[largest]) {
        largest = right
      }
    }
    
    if (largest !== i) {
      swaps++
      arrayAccesses += 4
      const temp = data[i]
      data[i] = data[largest]
      data[largest] = temp
      frames.push({
        type: 'swap',
        indices: [i, largest],
        values: [...data],
        description: \`交换 arr[\${i}] 和 arr[\${largest}]\`,
        highlightLine: 18,
        stats: { comparisons, swaps, arrayAccesses }
      })
      heapify(size, largest)
    }
  }
  
  frames.push({
    type: 'highlight',
    indices: [],
    values: [...data],
    description: '开始建立最大堆',
    highlightLine: 3,
    stats: { comparisons, swaps, arrayAccesses }
  })
  
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i)
  }
  
  frames.push({
    type: 'highlight',
    indices: [],
    values: [...data],
    description: '最大堆建立完成，开始排序,
    highlightLine: 6,
    stats: { comparisons, swaps, arrayAccesses }
  })
  
  for (let i = n - 1; i > 0; i--) {
    swaps++
    arrayAccesses += 4
    const temp = data[i]
    data[i] = data[0]
    data[0] = temp
    frames.push({
      type: 'swap',
      indices: [0, i],
      values: [...data],
      description: \`将堆顶\${data[i]} 与 arr[\${i}] 交换\`,
      highlightLine: 7,
      stats: { comparisons, swaps, arrayAccesses }
    })
    
    frames.push({
      type: 'sorted',
      indices: [i],
      values: [...data],
      description: \`arr[\${i}]=\${data[i]} 已就位\`,
      highlightLine: 7,
      stats: { comparisons, swaps, arrayAccesses }
    })
    
    heapify(i, 0)
  }
  
  frames.push({
    type: 'sorted',
    indices: [0],
    values: [...data],
    description: \`排序完成！总计：\${comparisons}次比较，\${swaps}次交换\`,
    highlightLine: 19,
    stats: { comparisons, swaps, arrayAccesses }
  })
  
  return frames
}`
  },
  
  shell: {
    title: '希尔排序',
    language: 'javascript',
    code: `function shellSort(arr) {
  const data = [...arr]
  const n = data.length
  
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = data[i]
      let j = i
      
      // 比较并后移
      while (j >= gap && data[j - gap] > temp) {
        data[j] = data[j - gap]
        j -= gap
      }
      
      // 插入到正确位置
      data[j] = temp
    }
  }
  
  return data
}`,
    fullCode: `function shellSort(arr) {
  const frames = []
  const data = [...arr]
  const n = data.length
  
  let comparisons = 0
  let swaps = 0
  let arrayAccesses = 0
  
  frames.push({
    type: 'reset',
    indices: [],
    values: [...data],
    description: \`开始希尔排序，数组长度: \${n}\`,
    highlightLine: 0,
    stats: { comparisons, swaps, arrayAccesses }
  })
  
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    frames.push({
      type: 'highlight',
      indices: [],
      values: [...data],
      description: \`当前增量 gap = \${gap}\`,
      highlightLine: 2,
      stats: { comparisons, swaps, arrayAccesses }
    })
    
    for (let i = gap; i < n; i++) {
      const temp = data[i]
      let j = i
      arrayAccesses++
      
      frames.push({
        type: 'highlight',
        indices: [i],
        values: [...data],
        description: \`取出 arr[\${i}]=\${temp}\`,
        highlightLine: 4,
        stats: { comparisons, swaps, arrayAccesses }
      })
      
      while (j >= gap && data[j - gap] > temp) {
        comparisons++
        arrayAccesses += 2
        frames.push({
          type: 'compare',
          indices: [j - gap, j],
          values: [...data],
          description: \`比较 arr[\${j - gap}]=\${data[j - gap]} > \${temp}\`,
          highlightLine: 6,
          stats: { comparisons, swaps, arrayAccesses }
        })
        
        swaps++
        arrayAccesses += 2
        data[j] = data[j - gap]
        frames.push({
          type: 'set',
          indices: [j],
          values: [...data],
          description: \`arr[\${j}] = arr[\${j - gap}] = \${data[j]}\`,
          highlightLine: 7,
          stats: { comparisons, swaps, arrayAccesses }
        })
        j -= gap
      }
      
      if (j >= gap) {
        comparisons++
        arrayAccesses++
      }
      
      arrayAccesses++
      data[j] = temp
      frames.push({
        type: 'set',
        indices: [j],
        values: [...data],
        description: \`将\${temp} 插入到位置\${j}\`,
        highlightLine: 9,
        stats: { comparisons, swaps, arrayAccesses }
      })
    }
  }
  
  const allIndices = []
  for (let i = 0; i < n; i++) allIndices.push(i)
  frames.push({
    type: 'sorted',
    indices: allIndices,
    values: [...data],
    description: \`排序完成！总计：\${comparisons}次比较，\${swaps}次移动\`,
    highlightLine: 11,
    stats: { comparisons, swaps, arrayAccesses }
  })
  
  return frames
}`
  },
  
  merge: {
    title: '归并排序',
    language: 'javascript',
    code: `function mergeSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2)
    mergeSort(arr, left, mid)
    mergeSort(arr, mid + 1, right)
    merge(arr, left, mid, right)
  }
  return arr
}

function merge(arr, left, mid, right) {
  const L = arr.slice(left, mid + 1)
  const R = arr.slice(mid + 1, right + 1)
  let i = 0, j = 0, k = left
  
  // 比较并合并
  while (i < L.length && j < R.length) {
    arr[k++] = L[i] <= R[j] ? L[i++] : R[j++]
  }
  
  // 复制剩余元素
  while (i < L.length) arr[k++] = L[i++]
  while (j < R.length) arr[k++] = R[j++]
}`,
    fullCode: `function mergeSort(arr) {
  const frames = []
  const data = [...arr]
  
  let comparisons = 0
  let swaps = 0
  let arrayAccesses = 0
  
  frames.push({
    type: 'reset',
    indices: [],
    values: [...data],
    description: \`开始归并排序，数组长度: \${data.length}\`,
    highlightLine: 0,
    stats: { comparisons, swaps, arrayAccesses }
  })
  
  function merge(left, mid, right) {
    const leftArr = data.slice(left, mid + 1)
    const rightArr = data.slice(mid + 1, right + 1)
    arrayAccesses += (right - left + 1)
    
    const rangeIndices = []
    for (let i = left; i <= right; i++) rangeIndices.push(i)
    frames.push({
      type: 'partition',
      indices: rangeIndices,
      values: [...data],
      description: \`合并 [\${left}..\${mid}] 和 [\${mid + 1}..\${right}]\`,
      highlightLine: 7,
      stats: { comparisons, swaps, arrayAccesses }
    })
    
    let i = 0, j = 0, k = left
    
    while (i < leftArr.length && j < rightArr.length) {
      comparisons++
      arrayAccesses += 2
      frames.push({
        type: 'compare',
        indices: [left + i, mid + 1 + j],
        values: [...data],
        description: \`比较 \${leftArr[i]} 和 \${rightArr[j]}\`,
        highlightLine: 11,
        stats: { comparisons, swaps, arrayAccesses }
      })
      
      swaps++
      arrayAccesses++
      if (leftArr[i] <= rightArr[j]) {
        data[k] = leftArr[i]
        i++
      } else {
        data[k] = rightArr[j]
        j++
      }
      
      frames.push({
        type: 'merge',
        indices: [k],
        values: [...data],
        description: \`放入 \${data[k]} 到位置\${k}\`,
        highlightLine: 12,
        stats: { comparisons, swaps, arrayAccesses }
      })
      k++
    }
    
    while (i < leftArr.length) {
      swaps++
      arrayAccesses += 2
      data[k] = leftArr[i]
      frames.push({
        type: 'merge',
        indices: [k],
        values: [...data],
        description: \`放入剩余元素 \${data[k]} 到位置\${k}\`,
        highlightLine: 17,
        stats: { comparisons, swaps, arrayAccesses }
      })
      i++
      k++
    }
    
    while (j < rightArr.length) {
      swaps++
      arrayAccesses += 2
      data[k] = rightArr[j]
      frames.push({
        type: 'merge',
        indices: [k],
        values: [...data],
        description: \`放入剩余元素 \${data[k]} 到位置\${k}\`,
        highlightLine: 18,
        stats: { comparisons, swaps, arrayAccesses }
      })
      j++
      k++
    }
  }
  
  function mergeSortRecursive(left, right) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2)
      
      const rangeIndices = []
      for (let i = left; i <= right; i++) rangeIndices.push(i)
      frames.push({
        type: 'partition',
        indices: rangeIndices,
        values: [...data],
        description: \`分割 [\${left}..\${right}] 为 [\${left}..\${mid}] 和 [\${mid + 1}..\${right}]\`,
        highlightLine: 1,
        stats: { comparisons, swaps, arrayAccesses }
      })
      
      mergeSortRecursive(left, mid)
      mergeSortRecursive(mid + 1, right)
      merge(left, mid, right)
    }
  }
  
  mergeSortRecursive(0, data.length - 1)
  
  const allIndices = []
  for (let i = 0; i < data.length; i++) allIndices.push(i)
  frames.push({
    type: 'sorted',
    indices: allIndices,
    values: [...data],
    description: \`排序完成！总计：\${comparisons}次比较，\${swaps}次赋值\`,
    highlightLine: 18,
    stats: { comparisons, swaps, arrayAccesses }
  })
  
  return frames
}`
  }
}


// 查找算法代码

export const searchAlgorithmCode: Record<string, AlgorithmCode> = {
  sequential: {
    title: '顺序查找',
    language: 'javascript',
    code: `function sequentialSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i
    }
  }
  return -1
}`,
    fullCode: `function sequentialSearch(arr, target) {
  const frames = []

  frames.push({
    type: 'reset',
    description: \`在数组中顺序查找 \${target}\`,
    data: { array: arr, target },
    highlightLine: 0
  })

  for (let i = 0; i < arr.length; i++) {
    frames.push({
      type: 'compare',
      index: i,
      key: arr[i],
      description: \`比较 arr[\${i}] = \${arr[i]} 与目标 \${target}\`,
      data: { mid: i },
      highlightLine: 2
    })

    if (arr[i] === target) {
      frames.push({
        type: 'found',
        index: i,
        key: target,
        description: \`找到目标，位置 \${i}\`,
        data: { mid: i },
        highlightLine: 3
      })
      return frames
    }
  }

  frames.push({
    type: 'not-found',
    key: target,
    description: \`未找到 \${target}\`,
    highlightLine: 7
  })

  return frames
}`
  },
  binary: {
    title: '二分查找',
    language: 'javascript',
    code: `function binarySearch(arr, target) {
  let left = 0
  let right = arr.length - 1
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] === target) {
      return mid
    } else if (arr[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return -1
}`,
    fullCode: `function binarySearch(arr, target) {
  const frames = []

  frames.push({
    type: 'reset',
    description: \`在有序数组中二分查找 \${target}\`,
    data: { array: arr, target }
  })

  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    frames.push({
      type: 'highlight',
      index: mid,
      description: \`查找范围 [\${left}, \${right}]，中间位置 mid = \${mid}\`,
      data: { left, right, mid }
    })

    frames.push({
      type: 'compare',
      index: mid,
      key: arr[mid],
      description: \`比较 arr[\${mid}] = \${arr[mid]} 与目标 \${target}\`
    })

    if (arr[mid] === target) {
      frames.push({
        type: 'found',
        index: mid,
        key: target,
        description: \`找到目标，arr[\${mid}] = \${target}\`
      })
      return frames
    } else if (arr[mid] < target) {
      frames.push({
        type: 'update',
        description: \`\${arr[mid]} < \${target}，在右半部分查找\`,
        data: { left, right, mid }
      })
      left = mid + 1
    } else {
      frames.push({
        type: 'update',
        description: \`\${arr[mid]} > \${target}，在左半部分查找\`,
        data: { left, right, mid }
      })
      right = mid - 1
    }
  }

  frames.push({
    type: 'not-found',
    key: target,
    description: \`未找到 \${target}\`
  })

  return frames
}`
  },
  interpolation: {
    title: '插值查找',
    language: 'javascript',
    code: `function interpolationSearch(arr, target) {
  let left = 0
  let right = arr.length - 1
  while (left <= right && target >= arr[left] && target <= arr[right]) {
    if (left === right) {
      return arr[left] === target ? left : -1
    }
    const pos = left + Math.floor(((target - arr[left]) * (right - left)) / (arr[right] - arr[left]))
    if (arr[pos] === target) return pos
    if (arr[pos] < target) left = pos + 1
    else right = pos - 1
  }
  return -1
}`,
    fullCode: `function interpolationSearch(arr, target) {
  const frames = []

  frames.push({
    type: 'reset',
    description: \`在有序数组中插值查找 \${target}\`,
    data: { array: arr, target }
  })

  let left = 0
  let right = arr.length - 1

  while (left <= right && target >= arr[left] && target <= arr[right]) {
    if (left === right) {
      frames.push({
        type: 'compare',
        index: left,
        key: arr[left],
        description: \`只剩一个元素，比较 arr[\${left}] = \${arr[left]}\`
      })
      if (arr[left] === target) {
        frames.push({
          type: 'found',
          index: left,
          key: target,
          description: \`找到目标，arr[\${left}] = \${target}\`
        })
      } else {
        frames.push({
          type: 'not-found',
          key: target,
          description: \`未找到 \${target}\`
        })
      }
      return frames
    }

    const denominator = arr[right] - arr[left]
    if (denominator === 0) break
    const pos = left + Math.floor(((target - arr[left]) * (right - left)) / denominator)

    frames.push({
      type: 'highlight',
      index: pos,
      description: \`估算位置 pos = \${pos}，范围 [\${left}, \${right}]\`,
      data: { left, right, mid: pos }
    })

    frames.push({
      type: 'compare',
      index: pos,
      key: arr[pos],
      description: \`比较 arr[\${pos}] = \${arr[pos]} 与目标 \${target}\`
    })

    if (arr[pos] === target) {
      frames.push({
        type: 'found',
        index: pos,
        key: target,
        description: \`找到目标，arr[\${pos}] = \${target}\`
      })
      return frames
    } else if (arr[pos] < target) {
      left = pos + 1
      frames.push({
        type: 'update',
        description: \`\${arr[pos]} < \${target}，向右侧缩小范围\`,
        data: { left, right, mid: pos }
      })
    } else {
      right = pos - 1
      frames.push({
        type: 'update',
        description: \`\${arr[pos]} > \${target}，向左侧缩小范围\`,
        data: { left, right, mid: pos }
      })
    }
  }

  frames.push({
    type: 'not-found',
    key: target,
    description: \`未找到 \${target}\`
  })

  return frames
}`
  },
  jump: {
    title: '跳跃查找',
    language: 'javascript',
    code: `function jumpSearch(arr, target) {
  const n = arr.length
  const step = Math.floor(Math.sqrt(n))
  let prev = 0
  let curr = step
  while (arr[Math.min(curr, n) - 1] < target) {
    prev = curr
    curr += step
    if (prev >= n) return -1
  }
  for (let i = prev; i < Math.min(curr, n); i++) {
    if (arr[i] === target) return i
  }
  return -1
}`,
    fullCode: `function jumpSearch(arr, target) {
  const frames = []

  frames.push({
    type: 'reset',
    description: \`在有序数组中跳跃查找 \${target}\`,
    data: { array: arr, target }
  })

  const n = arr.length
  const step = Math.floor(Math.sqrt(n))
  let prev = 0
  let curr = step

  while ((arr[Math.min(curr, n) - 1] ?? Number.POSITIVE_INFINITY) < target) {
    const blockEnd = Math.min(curr, n) - 1
    frames.push({
      type: 'highlight',
      index: blockEnd,
      description: \`跳到块尾 index=\${blockEnd}，比较 \${arr[blockEnd]} 与 \${target}\`,
      data: { left: prev, right: blockEnd, mid: blockEnd }
    })

    prev = curr
    curr += step

    if (prev >= n) {
      frames.push({
        type: 'not-found',
        key: target,
        description: \`未找到 \${target}\`
      })
      return frames
    }
  }

  const left = prev
  const right = Math.min(curr, n) - 1
  frames.push({
    type: 'update',
    description: \`目标可能在块 [\${left}, \${right}]，开始线性扫描\`,
    data: { left, right, mid: left }
  })

  for (let i = left; i <= right; i++) {
    frames.push({
      type: 'compare',
      index: i,
      key: arr[i],
      description: \`线性比较 arr[\${i}] = \${arr[i]} 与目标 \${target}\`,
      data: { left, right, mid: i }
    })

    if (arr[i] === target) {
      frames.push({
        type: 'found',
        index: i,
        key: target,
        description: \`找到目标，arr[\${i}] = \${target}\`
      })
      return frames
    }
  }

  frames.push({
    type: 'not-found',
    key: target,
    description: \`未找到 \${target}\`
  })

  return frames
}`
  },
  bst: {
    title: 'BST查找',
    language: 'javascript',
    code: `function bstSearch(root, target) {
  let current = root
  while (current !== null) {
    if (target === current.value) {
      return current
    } else if (target < current.value) {
      current = current.left
    } else {
      current = current.right
    }
  }
  return null
}`,
    fullCode: `function bstSearch(root, target) {
  const frames = []

  frames.push({
    type: 'reset',
    nodeId: '',
    description: \`在 BST 中查找 \${target}\`
  })

  let current = root

  while (current !== null) {
    frames.push({
      type: 'visit',
      nodeId: current.id,
      value: current.value,
      description: \`访问节点 \${current.value}\`
    })

    if (target === current.value) {
      frames.push({
        type: 'found',
        nodeId: current.id,
        description: \`找到目标，\${target} = \${current.value}\`
      })
      return frames
    } else if (target < current.value) {
      frames.push({
        type: 'visit',
        nodeId: current.id,
        description: \`\${target} < \${current.value}，向左子树查找\`
      })
      current = current.left
    } else {
      frames.push({
        type: 'visit',
        nodeId: current.id,
        description: \`\${target} > \${current.value}，向右子树查找\`
      })
      current = current.right
    }
  }

  frames.push({
    type: 'not-found',
    nodeId: '',
    description: \`未找到 \${target}\`
  })

  return frames
}`
  },
  hash: {
    title: '哈希查找',
    language: 'javascript',
    code: `function hashSearch(table, size, target) {
  const start = target % size
  let index = start
  while (table[index] !== null) {
    if (table[index] === target) {
      return index
    }
    index = (index + 1) % size
    if (index === start) break
  }
  return -1
}

function hashInsert(table, size, value) {
  let index = value % size
  while (table[index] !== null) {
    index = (index + 1) % size
  }
  table[index] = value
  return index
}`,
    fullCode: `function hashSearch(ht, target) {
  const frames = []
  const table = ht.table

  frames.push({
    type: 'reset',
    description: \`在哈希表中查找 \${target}\`,
    data: { table: [...table] }
  })

  const hash = target % ht.size

  frames.push({
    type: 'highlight',
    index: hash,
    description: \`计算哈希值: \${target} % \${ht.size} = \${hash}\`
  })

  let index = hash
  let probeCount = 0

  while (table[index] !== null && probeCount < ht.size) {
    frames.push({
      type: 'compare',
      index,
      key: table[index],
      description: \`比较位置 \${index}: \${table[index]} 与 \${target}\`
    })

    if (table[index] === target) {
      frames.push({
        type: 'found',
        index,
        key: target,
        description: \`找到目标，位置 \${index}\`
      })
      return frames
    }

    index = (index + 1) % ht.size
    probeCount++

    if (table[index] !== null) {
      frames.push({
        type: 'probe',
        index,
        description: \`线性探测：检查位置 \${index}\`
      })
    }
  }

  frames.push({
    type: 'not-found',
    key: target,
    description: \`未找到 \${target}\`
  })

  return frames
}`
  }
}


// 栈与队列算法代码
export const stackQueueAlgorithmCode: Record<string, AlgorithmCode> = {
  stackPush: {
    title: '栈入栈 Push',
    language: 'javascript',
    code: `function stackPush(stack, value) {
  stack.push(value)
  return stack
}`,
    fullCode: `function stackPush(stack, value) {
  const frames = []
  const data = stack.slice()

  frames.push({
    type: 'reset',
    description: '准备将元素 ' + value + ' 入栈',
    highlightLine: 0,
    data: { stack: data.slice() }
  })

  frames.push({
    type: 'highlight',
    description: '栈顶位置: ' + data.length,
    highlightLine: 1,
    data: { stack: data.slice(), topIndex: data.length }
  })

  data.push(value)
  frames.push({
    type: 'push',
    value: value,
    description: '元素 ' + value + ' 入栈成功',
    highlightLine: 2,
    data: { stack: data.slice(), pushed: value }
  })

  return frames
}`
  },
  stackPop: {
    title: '栈出栈 Pop',
    language: 'javascript',
    code: `function stackPop(stack) {
  if (stack.length === 0) return null
  return stack.pop()
}`,
    fullCode: `function stackPop(stack) {
  const frames = []
  const data = stack.slice()

  frames.push({
    type: 'reset',
    description: '准备出栈操作',
    highlightLine: 0,
    data: { stack: data.slice() }
  })

  if (data.length === 0) {
    frames.push({
      type: 'highlight',
      description: '栈为空，无法出栈',
      highlightLine: 1,
      data: { stack: data.slice(), error: true }
    })
    return frames
  }

  frames.push({
    type: 'peek',
    value: data[data.length - 1],
    description: '栈顶元素: ' + data[data.length - 1],
    highlightLine: 2,
    data: { stack: data.slice(), topIndex: data.length - 1 }
  })

  const popped = data.pop()
  frames.push({
    type: 'pop',
    value: popped,
    description: '元素 ' + popped + ' 出栈成功',
    highlightLine: 3,
    data: { stack: data.slice(), popped: popped }
  })

  return frames
}`
  },
  stackPeek: {
    title: '栈查看栈顶',
    language: 'javascript',
    code: `function stackPeek(stack) {
  if (stack.length === 0) return null
  return stack[stack.length - 1]
}`,
    fullCode: `function stackPeek(stack) {
  const frames = []
  const data = stack.slice()

  frames.push({
    type: 'reset',
    description: '查看栈顶元素',
    highlightLine: 0,
    data: { stack: data.slice() }
  })

  if (data.length === 0) {
    frames.push({
      type: 'highlight',
      description: '栈为空',
      highlightLine: 1,
      data: { stack: data.slice(), error: true }
    })
    return frames
  }

  frames.push({
    type: 'peek',
    value: data[data.length - 1],
    description: '栈顶元素: ' + data[data.length - 1],
    highlightLine: 2,
    data: { stack: data.slice(), topIndex: data.length - 1 }
  })

  return frames
}`
  },
  queueEnqueue: {
    title: '队列入队 Enqueue',
    language: 'javascript',
    code: `function queueEnqueue(queue, value) {
  queue.push(value)
  return queue
}`,
    fullCode: `function queueEnqueue(queue, value) {
  const frames = []
  const data = queue.slice()

  frames.push({
    type: 'reset',
    description: '准备将元素 ' + value + ' 入队',
    highlightLine: 0,
    data: { queue: data.slice() }
  })

  frames.push({
    type: 'highlight',
    position: 'rear',
    description: '队尾位置: ' + data.length,
    highlightLine: 1,
    data: { queue: data.slice(), rearIndex: data.length }
  })

  data.push(value)
  frames.push({
    type: 'enqueue',
    value: value,
    position: 'rear',
    description: '元素 ' + value + ' 入队成功',
    highlightLine: 2,
    data: { queue: data.slice(), enqueued: value }
  })

  return frames
}`
  },
  queueDequeue: {
    title: '队列出队 Dequeue',
    language: 'javascript',
    code: `function queueDequeue(queue) {
  if (queue.length === 0) return null
  return queue.shift()
}`,
    fullCode: `function queueDequeue(queue) {
  const frames = []
  const data = queue.slice()

  frames.push({
    type: 'reset',
    description: '准备出队操作',
    highlightLine: 0,
    data: { queue: data.slice() }
  })

  if (data.length === 0) {
    frames.push({
      type: 'highlight',
      description: '队列为空，无法出队',
      highlightLine: 1,
      data: { queue: data.slice(), error: true }
    })
    return frames
  }

  frames.push({
    type: 'peek',
    value: data[0],
    position: 'front',
    description: '队首元素: ' + data[0],
    highlightLine: 2,
    data: { queue: data.slice(), frontIndex: 0 }
  })

  const dequeued = data.shift()
  frames.push({
    type: 'dequeue',
    value: dequeued,
    position: 'front',
    description: '元素 ' + dequeued + ' 出队成功',
    highlightLine: 3,
    data: { queue: data.slice(), dequeued: dequeued }
  })

  return frames
}`
  },
  queuePeek: {
    title: '队列查看队首',
    language: 'javascript',
    code: `function queuePeek(queue) {
  if (queue.length === 0) return null
  return queue[0]
}`,
    fullCode: `function queuePeek(queue) {
  const frames = []
  const data = queue.slice()

  frames.push({
    type: 'reset',
    description: '查看队首元素',
    highlightLine: 0,
    data: { queue: data.slice() }
  })

  if (data.length === 0) {
    frames.push({
      type: 'highlight',
      description: '队列为空',
      highlightLine: 1,
      data: { queue: data.slice(), error: true }
    })
    return frames
  }

  frames.push({
    type: 'peek',
    value: data[0],
    position: 'front',
    description: '队首元素: ' + data[0],
    highlightLine: 2,
    data: { queue: data.slice(), frontIndex: 0 }
  })

  return frames
}`
  }
}


// 字符串算法代码
export const stringAlgorithmCode: Record<string, AlgorithmCode> = {
  kmp: {
    title: 'KMP 字符串匹配',
    language: 'javascript',
    code: `function kmpSearch(text, pattern) {
  if (!pattern) return 0

  const next = buildNext(pattern)
  let i = 0
  let j = 0

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++
      j++
      if (j === pattern.length) {
        return i - j
      }
    } else if (j > 0) {
      j = next[j - 1]
    } else {
      i++
    }
  }

  return -1
}

function buildNext(pattern) {
  const next = new Array(pattern.length).fill(0)
  let len = 0

  for (let i = 1; i < pattern.length;) {
    if (pattern[i] === pattern[len]) {
      len++
      next[i] = len
      i++
    } else if (len > 0) {
      len = next[len - 1]
    } else {
      next[i] = 0
      i++
    }
  }

  return next
}`,
    fullCode: `function kmpSearch(text, pattern) {
  const frames = []
  const n = text.length
  const m = pattern.length

  frames.push({
    type: 'next-calc',
    textIndex: -1,
    patternIndex: -1,
    description: '主串: "' + text + '", 模式串: "' + pattern + '"',
    highlightLine: 0
  })

  if (m === 0) {
    frames.push({
      type: 'complete',
      textIndex: 0,
      patternIndex: 0,
      description: '模式串为空，匹配位置: 0',
      highlightLine: 4
    })
    return frames
  }

  const next = new Array(m).fill(0)
  let len = 0
  for (let i = 1; i < m;) {
    frames.push({
      type: 'compare',
      textIndex: -1,
      patternIndex: i,
      nextArray: [...next],
      description: '计算next: 比较 pattern[' + i + '] 与 pattern[' + len + ']',
      highlightLine: 10
    })

    if (pattern[i] === pattern[len]) {
      len++
      next[i] = len
      frames.push({
        type: 'match',
        textIndex: -1,
        patternIndex: i,
        nextArray: [...next],
        description: 'next[' + i + '] = ' + len,
        highlightLine: 16
      })
      i++
    } else if (len > 0) {
      len = next[len - 1]
      frames.push({
        type: 'mismatch',
        textIndex: -1,
        patternIndex: i,
        nextArray: [...next],
        description: '失配，len 回退',
        highlightLine: 20
      })
    } else {
      next[i] = 0
      i++
    }
  }

  let i = 0
  let j = 0
  while (i < n) {
    frames.push({
      type: 'compare',
      textIndex: i,
      patternIndex: j,
      nextArray: [...next],
      description: '比较 text[' + i + '] 与 pattern[' + j + ']',
      highlightLine: 31
    })

    if (text[i] === pattern[j]) {
      frames.push({
        type: 'match',
        textIndex: i,
        patternIndex: j,
        nextArray: [...next],
        description: '字符匹配',
        highlightLine: 33
      })
      i++
      j++

      if (j === m) {
        frames.push({
          type: 'complete',
          textIndex: i - m,
          patternIndex: j,
          nextArray: [...next],
          description: '找到匹配，起始位置: ' + (i - m),
          highlightLine: 37
        })
        return frames
      }
    } else if (j > 0) {
      j = next[j - 1]
      frames.push({
        type: 'shift',
        textIndex: i,
        patternIndex: j,
        nextArray: [...next],
        description: '失配，模式串按 next 右移',
        highlightLine: 41
      })
    } else {
      frames.push({
        type: 'mismatch',
        textIndex: i,
        patternIndex: j,
        nextArray: [...next],
        description: '失配且 j=0，i 前进',
        highlightLine: 43
      })
      i++
    }
  }

  frames.push({
    type: 'complete',
    textIndex: -1,
    patternIndex: -1,
    nextArray: [...next],
    description: '未找到匹配',
    highlightLine: 48
  })

  return frames
}`
  },
  bruteForce: {
    title: '朴素字符串匹配',
    language: 'javascript',
    code: `function bruteForceSearch(text, pattern) {
  if (!pattern) return 0

  for (let i = 0; i <= text.length - pattern.length; i++) {
    let j = 0

    while (j < pattern.length && text[i + j] === pattern[j]) {
      j++
    }

    if (j === pattern.length) {
      return i
    }
  }

  return -1
}`,
    fullCode: `function bruteForceSearch(text, pattern) {
  const frames = []
  const n = text.length
  const m = pattern.length

  frames.push({
    type: 'next-calc',
    textIndex: -1,
    patternIndex: -1,
    description: '朴素匹配：主串 "' + text + '", 模式串 "' + pattern + '"',
    highlightLine: 0
  })

  if (m === 0) {
    frames.push({
      type: 'complete',
      textIndex: 0,
      patternIndex: 0,
      description: '模式串为空，匹配位置: 0',
      highlightLine: 5
    })
    return frames
  }

  for (let i = 0; i <= n - m; i++) {
    let j = 0
    frames.push({
      type: 'shift',
      textIndex: i,
      patternIndex: 0,
      description: '模式串移动到起点 ' + i,
      highlightLine: 9
    })

    while (j < m && text[i + j] === pattern[j]) {
      frames.push({
        type: 'compare',
        textIndex: i + j,
        patternIndex: j,
        description: '比较 text[' + (i + j) + '] 与 pattern[' + j + ']',
        highlightLine: 12
      })
      frames.push({
        type: 'match',
        textIndex: i + j,
        patternIndex: j,
        description: '字符匹配',
        highlightLine: 14
      })
      j++
    }

    if (j === m) {
      frames.push({
        type: 'complete',
        textIndex: i,
        patternIndex: j,
        description: '找到匹配，起始位置: ' + i,
        highlightLine: 18
      })
      return frames
    }

    if (j < m && i + j < n) {
      frames.push({
        type: 'mismatch',
        textIndex: i + j,
        patternIndex: j,
        description: '失配，模式串右移一位',
        highlightLine: 22
      })
    }
  }

  frames.push({
    type: 'complete',
    textIndex: -1,
    patternIndex: -1,
    description: '未找到匹配',
    highlightLine: 27
  })

  return frames
}`
  }
}



// 树算法代码
export const treeAlgorithmCode: Record<string, AlgorithmCode> = {
  preorder: {
    title: '前序遍历',
    language: 'javascript',
    code: `function preorder(root) {
  const result = []
  function dfs(node) {
    if (!node) return
    result.push(node.value)
    dfs(node.left)
    dfs(node.right)
  }
  dfs(root)
  return result
}`,
    fullCode: `function preorder(root) {
  const frames = []
  const visited = []

  frames.push({
    type: 'reset',
    nodeId: '',
    description: '开始前序遍历（根 -> 左 -> 右）',
    highlightLine: 0
  })

  function dfs(node) {
    if (!node) return

    frames.push({
      type: 'visit',
      nodeId: node.id,
      value: node.value,
      description: '访问节点 ' + node.value,
      highlightLine: 4
    })
    visited.push(String(node.value))

    frames.push({
      type: 'highlight',
      nodeId: node.id,
      description: '遍历序列: [' + visited.join(', ') + ']',
      highlightLine: 5
    })

    if (node.left) {
      frames.push({
        type: 'highlight',
        nodeId: node.id,
        description: '进入左子树',
        highlightLine: 6
      })
      dfs(node.left)
    }

    if (node.right) {
      frames.push({
        type: 'highlight',
        nodeId: node.id,
        description: '进入右子树',
        highlightLine: 7
      })
      dfs(node.right)
    }
  }

  dfs(root)

  frames.push({
    type: 'reset',
    nodeId: '',
    description: '前序遍历完成: [' + visited.join(', ') + ']',
    highlightLine: 10
  })

  return frames
}`
  },
  inorder: {
    title: '中序遍历',
    language: 'javascript',
    code: `function inorder(root) {
  const result = []
  function dfs(node) {
    if (!node) return
    dfs(node.left)
    result.push(node.value)
    dfs(node.right)
  }
  dfs(root)
  return result
}`,
    fullCode: `function inorder(root) {
  const frames = []
  const visited = []

  frames.push({
    type: 'reset',
    nodeId: '',
    description: '开始中序遍历（左 -> 根 -> 右）',
    highlightLine: 0
  })

  function dfs(node) {
    if (!node) return

    if (node.left) {
      frames.push({
        type: 'highlight',
        nodeId: node.id,
        description: '先进入左子树',
        highlightLine: 4
      })
      dfs(node.left)
    }

    frames.push({
      type: 'visit',
      nodeId: node.id,
      value: node.value,
      description: '访问节点 ' + node.value,
      highlightLine: 6
    })
    visited.push(String(node.value))

    frames.push({
      type: 'highlight',
      nodeId: node.id,
      description: '遍历序列: [' + visited.join(', ') + ']',
      highlightLine: 7
    })

    if (node.right) {
      frames.push({
        type: 'highlight',
        nodeId: node.id,
        description: '再进入右子树',
        highlightLine: 8
      })
      dfs(node.right)
    }
  }

  dfs(root)

  frames.push({
    type: 'reset',
    nodeId: '',
    description: '中序遍历完成: [' + visited.join(', ') + ']',
    highlightLine: 11
  })

  return frames
}`
  },
  postorder: {
    title: '后序遍历',
    language: 'javascript',
    code: `function postorder(root) {
  const result = []
  function dfs(node) {
    if (!node) return
    dfs(node.left)
    dfs(node.right)
    result.push(node.value)
  }
  dfs(root)
  return result
}`,
    fullCode: `function postorder(root) {
  const frames = []
  const visited = []

  frames.push({
    type: 'reset',
    nodeId: '',
    description: '开始后序遍历（左 -> 右 -> 根）',
    highlightLine: 0
  })

  function dfs(node) {
    if (!node) return

    if (node.left) {
      frames.push({
        type: 'highlight',
        nodeId: node.id,
        description: '进入左子树',
        highlightLine: 4
      })
      dfs(node.left)
    }

    if (node.right) {
      frames.push({
        type: 'highlight',
        nodeId: node.id,
        description: '进入右子树',
        highlightLine: 5
      })
      dfs(node.right)
    }

    frames.push({
      type: 'visit',
      nodeId: node.id,
      value: node.value,
      description: '回到根并访问节点 ' + node.value,
      highlightLine: 7
    })
    visited.push(String(node.value))

    frames.push({
      type: 'highlight',
      nodeId: node.id,
      description: '遍历序列: [' + visited.join(', ') + ']',
      highlightLine: 8
    })
  }

  dfs(root)

  frames.push({
    type: 'reset',
    nodeId: '',
    description: '后序遍历完成: [' + visited.join(', ') + ']',
    highlightLine: 11
  })

  return frames
}`
  },
  levelorder: {
    title: '层序遍历',
    language: 'javascript',
    code: `function levelOrder(root) {
  if (!root) return []
  const result = []
  const queue = [root]
  while (queue.length) {
    const node = queue.shift()
    result.push(node.value)
    if (node.left) queue.push(node.left)
    if (node.right) queue.push(node.right)
  }
  return result
}`,
    fullCode: `function levelOrder(root) {
  const frames = []
  const visited = []

  frames.push({
    type: 'reset',
    nodeId: '',
    description: '开始层序遍历（按层从左到右）',
    highlightLine: 0
  })

  if (!root) {
    frames.push({
      type: 'reset',
      nodeId: '',
      description: '空树，无需遍历',
      highlightLine: 1
    })
    return frames
  }

  const queue = [root]
  let level = 0

  while (queue.length > 0) {
    const levelSize = queue.length
    const levelValues = []
    frames.push({
      type: 'highlight',
      nodeId: '',
      description: '开始第 ' + (level + 1) + ' 层，节点数: ' + levelSize,
      highlightLine: 6
    })

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()
      frames.push({
        type: 'visit',
        nodeId: node.id,
        value: node.value,
        description: '访问节点 ' + node.value,
        highlightLine: 10
      })

      visited.push(String(node.value))
      levelValues.push(String(node.value))

      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }

    frames.push({
      type: 'highlight',
      nodeId: '',
      description: '第 ' + (level + 1) + ' 层结果: [' + levelValues.join(', ') + ']',
      highlightLine: 15
    })
    level++
  }

  frames.push({
    type: 'reset',
    nodeId: '',
    description: '层序遍历完成: [' + visited.join(', ') + ']',
    highlightLine: 19
  })

  return frames
}`
  },
  avl: {
    title: 'AVL 树插入与旋转',
    language: 'javascript',
    code: `function avlInsert(values) {
  class Node {
    constructor(value) {
      this.value = value
      this.left = null
      this.right = null
      this.height = 1
    }
  }

  const h = (n) => (n ? n.height : 0)
  const update = (n) => (n.height = Math.max(h(n.left), h(n.right)) + 1)
  const bf = (n) => h(n.left) - h(n.right)

  const rotateRight = (y) => {
    const x = y.left
    const t2 = x.right
    x.right = y
    y.left = t2
    update(y)
    update(x)
    return x
  }

  const rotateLeft = (x) => {
    const y = x.right
    const t2 = y.left
    y.left = x
    x.right = t2
    update(x)
    update(y)
    return y
  }

  function insert(node, value) {
    if (!node) return new Node(value)
    if (value < node.value) node.left = insert(node.left, value)
    else if (value > node.value) node.right = insert(node.right, value)
    else return node

    update(node)
    const balance = bf(node)

    if (balance > 1 && value < node.left.value) return rotateRight(node)
    if (balance < -1 && value > node.right.value) return rotateLeft(node)
    if (balance > 1 && value > node.left.value) {
      node.left = rotateLeft(node.left)
      return rotateRight(node)
    }
    if (balance < -1 && value < node.right.value) {
      node.right = rotateRight(node.right)
      return rotateLeft(node)
    }
    return node
  }

  let root = null
  for (const v of values) root = insert(root, v)
  return root
}`,
    fullCode: `function avlInsert(values) {
  const frames = []

  function Node(value) {
    this.id = 'node-' + value
    this.value = value
    this.left = null
    this.right = null
    this.height = 1
  }

  const h = (n) => (n ? n.height : 0)
  const update = (n) => {
    n.height = Math.max(h(n.left), h(n.right)) + 1
  }
  const bf = (n) => h(n.left) - h(n.right)

  function clone(node) {
    if (!node) return null
    return {
      id: node.id,
      value: node.value,
      height: node.height,
      left: clone(node.left),
      right: clone(node.right)
    }
  }

  function collect(node) {
    if (!node) return []
    return [node].concat(collect(node.left), collect(node.right))
  }

  function snapshot(type, description, nodeId, selected) {
    frames.push({
      type,
      nodeId: nodeId || '',
      description,
      highlightLine: 0,
      data: {
        root: clone(root),
        nodes: collect(root),
        selected: selected || []
      }
    })
  }

  function rotateRight(y) {
    const x = y.left
    const t2 = x.right
    x.right = y
    y.left = t2
    update(y)
    update(x)
    return x
  }

  function rotateLeft(x) {
    const y = x.right
    const t2 = y.left
    y.left = x
    x.right = t2
    update(x)
    update(y)
    return y
  }

  function insert(node, value) {
    if (!node) {
      const newNode = new Node(value)
      snapshot('insert', '插入节点 ' + value, newNode.id, [newNode.id])
      return newNode
    }

    snapshot('visit', '比较 ' + value + ' 与 ' + node.value, node.id, [node.id])

    if (value < node.value) node.left = insert(node.left, value)
    else if (value > node.value) node.right = insert(node.right, value)
    else {
      snapshot('highlight', '节点已存在，跳过 ' + value, node.id, [node.id])
      return node
    }

    update(node)
    const balance = bf(node)

    if (balance > 1 && value < node.left.value) {
      snapshot('highlight', 'LL 失衡：右旋 ' + node.value, node.id, [node.id, node.left.id])
      return rotateRight(node)
    }

    if (balance < -1 && value > node.right.value) {
      snapshot('highlight', 'RR 失衡：左旋 ' + node.value, node.id, [node.id, node.right.id])
      return rotateLeft(node)
    }

    if (balance > 1 && value > node.left.value) {
      snapshot('highlight', 'LR 失衡：先左旋 ' + node.left.value + ' 再右旋 ' + node.value, node.id, [node.id, node.left.id])
      node.left = rotateLeft(node.left)
      return rotateRight(node)
    }

    if (balance < -1 && value < node.right.value) {
      snapshot('highlight', 'RL 失衡：先右旋 ' + node.right.value + ' 再左旋 ' + node.value, node.id, [node.id, node.right.id])
      node.right = rotateRight(node.right)
      return rotateLeft(node)
    }

    return node
  }

  let root = null
  snapshot('reset', '开始 AVL 构建', '', [])
  for (const v of values) {
    root = insert(root, v)
    snapshot('highlight', '插入 ' + v + ' 后保持平衡', root ? root.id : '', [])
  }
  snapshot('reset', 'AVL 构建完成', root ? root.id : '', [])
  return frames
}`
  },
  bstInsert: {
    title: 'BST 插入',
    language: 'javascript',
    code: `function bstInsert(root, value) {
  if (!root) return { value, left: null, right: null }
  let current = root
  while (true) {
    if (value < current.value) {
      if (!current.left) {
        current.left = { value, left: null, right: null }
        break
      }
      current = current.left
    } else if (value > current.value) {
      if (!current.right) {
        current.right = { value, left: null, right: null }
        break
      }
      current = current.right
    } else {
      break
    }
  }
  return root
}`,
    fullCode: `function bstInsert(root, value) {
  const frames = []

  function collectNodes(node) {
    if (!node) return []
    const result = [node]
    if (node.left) result.push.apply(result, collectNodes(node.left))
    if (node.right) result.push.apply(result, collectNodes(node.right))
    return result
  }

  frames.push({
    type: 'reset',
    nodeId: '',
    description: '开始 BST 插入: ' + value,
    highlightLine: 0
  })

  if (!root) {
    const newRoot = { id: 'node-' + value, value: value, left: null, right: null }
    frames.push({
      type: 'insert',
      nodeId: newRoot.id,
      value: value,
      description: '树为空，创建根节点 ' + value,
      highlightLine: 10,
      data: { nodes: [newRoot], newNode: newRoot.id }
    })
    frames.push({
      type: 'reset',
      nodeId: newRoot.id,
      description: '插入完成',
      highlightLine: 11,
      data: { nodes: [newRoot] }
    })
    return frames
  }

  let current = root
  let parent = null
  let isLeft = false

  while (current) {
    parent = current
    frames.push({
      type: 'visit',
      nodeId: current.id,
      description: '比较: ' + value + ' 与 ' + current.value,
      highlightLine: 16,
      data: { nodes: collectNodes(root), current: current.id }
    })

    if (value < current.value) {
      frames.push({
        type: 'highlight',
        nodeId: current.id,
        description: value + ' < ' + current.value + '，转向左子树',
        highlightLine: 17,
        data: { nodes: collectNodes(root), current: current.id }
      })
      if (!current.left) {
        isLeft = true
        break
      }
      current = current.left
    } else if (value > current.value) {
      frames.push({
        type: 'highlight',
        nodeId: current.id,
        description: value + ' > ' + current.value + '，转向右子树',
        highlightLine: 21,
        data: { nodes: collectNodes(root), current: current.id }
      })
      if (!current.right) {
        isLeft = false
        break
      }
      current = current.right
    } else {
      frames.push({
        type: 'highlight',
        nodeId: current.id,
        description: '节点已存在，插入终止',
        highlightLine: 27,
        data: { nodes: collectNodes(root), current: current.id }
      })
      return frames
    }
  }

  const newNode = { id: 'node-' + value, value: value, left: null, right: null }
  if (isLeft) {
    parent.left = newNode
    frames.push({
      type: 'insert',
      nodeId: newNode.id,
      parentId: parent.id,
      value: value,
      position: 'left',
      description: '作为 ' + parent.value + ' 的左孩子插入',
      highlightLine: 34,
      data: { nodes: collectNodes(root), newNode: newNode.id, parent: parent.id }
    })
  } else {
    parent.right = newNode
    frames.push({
      type: 'insert',
      nodeId: newNode.id,
      parentId: parent.id,
      value: value,
      position: 'right',
      description: '作为 ' + parent.value + ' 的右孩子插入',
      highlightLine: 41,
      data: { nodes: collectNodes(root), newNode: newNode.id, parent: parent.id }
    })
  }

  frames.push({
    type: 'reset',
    nodeId: newNode.id,
    description: 'BST 插入完成',
    highlightLine: 45,
    data: { nodes: collectNodes(root) }
  })

  return frames
}`
  },
  bstDelete: {
    title: 'BST 删除',
    language: 'javascript',
    code: `function bstDelete(root, key) {
  function findMin(node) {
    while (node.left) node = node.left
    return node
  }
  function del(node, value) {
    if (!node) return null
    if (value < node.value) node.left = del(node.left, value)
    else if (value > node.value) node.right = del(node.right, value)
    else {
      if (!node.left) return node.right
      if (!node.right) return node.left
      const min = findMin(node.right)
      node.value = min.value
      node.right = del(node.right, min.value)
    }
    return node
  }
  return del(root, key)
}`,
    fullCode: `function bstDelete(root, value) {
  const frames = []

  function collectNodes(node) {
    if (!node) return []
    const result = [node]
    if (node.left) result.push.apply(result, collectNodes(node.left))
    if (node.right) result.push.apply(result, collectNodes(node.right))
    return result
  }

  function findMin(node) {
    while (node.left) node = node.left
    return node
  }

  frames.push({
    type: 'reset',
    nodeId: '',
    description: '开始 BST 删除: ' + value,
    highlightLine: 0
  })

  if (!root) {
    frames.push({
      type: 'reset',
      nodeId: '',
      description: '树为空，无法删除',
      highlightLine: 1
    })
    return frames
  }

  let current = root
  let parent = null
  let isLeft = false

  while (current && current.value !== value) {
    parent = current
    frames.push({
      type: 'visit',
      nodeId: current.id,
      description: '查找节点: ' + value + ' vs ' + current.value,
      highlightLine: 19,
      data: { nodes: collectNodes(root), current: current.id }
    })

    if (value < current.value) {
      isLeft = true
      current = current.left
    } else {
      isLeft = false
      current = current.right
    }
  }

  if (!current) {
    frames.push({
      type: 'reset',
      nodeId: '',
      description: '未找到目标节点，删除结束',
      highlightLine: 30
    })
    return frames
  }

  frames.push({
    type: 'highlight',
    nodeId: current.id,
    description: '找到目标节点 ' + value,
    highlightLine: 31,
    data: { nodes: collectNodes(root), current: current.id }
  })

  if (!current.left && !current.right) {
    frames.push({
      type: 'delete',
      nodeId: current.id,
      description: '叶子节点，直接删除',
      highlightLine: 34,
      data: { nodes: collectNodes(root), deleting: current.id }
    })
  } else if (!current.left || !current.right) {
    frames.push({
      type: 'delete',
      nodeId: current.id,
      description: '单子树节点，用子节点替换',
      highlightLine: 40,
      data: { nodes: collectNodes(root), deleting: current.id }
    })
  } else {
    const successor = findMin(current.right)
    frames.push({
      type: 'highlight',
      nodeId: successor.id,
      description: '双子树节点，使用后继 ' + successor.value + ' 替换',
      highlightLine: 46,
      data: { nodes: collectNodes(root), current: successor.id }
    })
  }

  frames.push({
    type: 'reset',
    nodeId: current.id,
    description: 'BST 删除动画完成（结构更新由页面逻辑完成）',
    highlightLine: 52,
    data: { nodes: collectNodes(root) }
  })

  return frames
}`
  },
  huffman: {
    title: '哈夫曼树',
    language: 'javascript',
    code: `function buildHuffman(weights) {
  let nodes = weights.map(item => ({
    char: item.char,
    weight: item.weight,
    left: null,
    right: null
  }))
  while (nodes.length > 1) {
    nodes.sort((a, b) => a.weight - b.weight)
    const left = nodes.shift()
    const right = nodes.shift()
    nodes.push({
      char: '',
      weight: left.weight + right.weight,
      left,
      right
    })
  }
  return nodes[0] || null
}`,
    fullCode: `function buildHuffman(weights) {
  const frames = []
  if (!Array.isArray(weights) || weights.length === 0) return frames

  let idSeed = 0
  let nodes = weights.map(function(item) {
    return {
      id: 'node-' + idSeed++,
      value: item.char,
      char: item.char,
      weight: item.weight,
      left: null,
      right: null
    }
  })

  function serialize(node) {
    return {
      id: node.id,
      value: node.value,
      char: node.char,
      weight: node.weight,
      left: node.left ? node.left.id : null,
      right: node.right ? node.right.id : null
    }
  }

  function collectAll(nodeList) {
    const map = new Map()
    function dfs(node) {
      if (!node || map.has(node.id)) return
      map.set(node.id, serialize(node))
      dfs(node.left)
      dfs(node.right)
    }
    nodeList.forEach(dfs)
    return Array.from(map.values())
  }

  frames.push({
    type: 'reset',
    nodeId: '',
    description: '开始构建哈夫曼树',
    highlightLine: 0
  })

  frames.push({
    type: 'create-node',
    nodeId: '',
    description: '创建初始叶子节点',
    highlightLine: 2,
    data: { nodes: collectAll(nodes) }
  })

  let step = 1
  while (nodes.length > 1) {
    nodes.sort(function(a, b) { return a.weight - b.weight })
    frames.push({
      type: 'highlight',
      nodeId: '',
      description: '第 ' + step + ' 轮：按权值升序排序',
      highlightLine: 8,
      data: { nodes: collectAll(nodes) }
    })

    const left = nodes.shift()
    const right = nodes.shift()
    frames.push({
      type: 'highlight',
      nodeId: left.id,
      description: '选择最小两个节点: ' + left.weight + ' 和 ' + right.weight,
      highlightLine: 9,
      data: { selected: [left.id, right.id], nodes: collectAll([left, right].concat(nodes)) }
    })

    const parent = {
      id: 'node-' + idSeed++,
      value: left.weight + right.weight,
      char: '',
      weight: left.weight + right.weight,
      left: left,
      right: right
    }
    frames.push({
      type: 'merge',
      nodeId: parent.id,
      description: '合并为父节点，权值=' + parent.weight,
      highlightLine: 13,
      data: { parent: serialize(parent), leftId: left.id, rightId: right.id, nodes: collectAll([parent].concat(nodes)) }
    })

    nodes.push(parent)
    frames.push({
      type: 'connect',
      nodeId: parent.id,
      description: '连接子树（左边编码0，右边编码1）',
      highlightLine: 20,
      data: { nodes: collectAll(nodes) }
    })
    step++
  }

  frames.push({
    type: 'reset',
    nodeId: nodes[0].id,
    description: '哈夫曼树构建完成',
    highlightLine: 24,
    data: { root: nodes[0], nodes: collectAll(nodes) }
  })

  return frames
}`
  }
}

// 图算法代码
export const graphAlgorithmCode: Record<string, AlgorithmCode> = {
  dijkstra: {
    title: 'Dijkstra 最短路径',
    language: 'javascript',
    code: `function dijkstra(graph, start) {
  const dist = new Map()
  const visited = new Set()

  for (const node of graph.nodes) {
    dist.set(node.id, node.id === start ? 0 : Infinity)
  }

  while (visited.size < graph.nodes.length) {
    let minNode = null
    let minDist = Infinity

    for (const [id, d] of dist) {
      if (!visited.has(id) && d < minDist) {
        minDist = d
        minNode = id
      }
    }

    if (minNode === null) break
    visited.add(minNode)

    for (const edge of graph.edges) {
      const isNeighbor = edge.from === minNode || edge.to === minNode
      if (!isNeighbor) continue

      const neighbor = edge.from === minNode ? edge.to : edge.from
      if (visited.has(neighbor)) continue

      const newDist = minDist + edge.weight
      if (newDist < dist.get(neighbor)) {
        dist.set(neighbor, newDist)
      }
    }
  }

  return dist
}`,
    fullCode: `function dijkstra(graph, startId) {
  const frames = []
  const dist = new Map()
  const visited = new Set()

  graph.nodes.forEach(node => {
    dist.set(node.id, node.id === startId ? 0 : Infinity)
  })

  frames.push({
    type: 'reset',
    description: '初始化距离表',
    highlightLine: 0,
    data: { distances: Object.fromEntries(dist) }
  })

  while (visited.size < graph.nodes.length) {
    let minNode = null
    let minDist = Infinity

    for (const [id, d] of dist) {
      if (!visited.has(id) && d < minDist) {
        minNode = id
        minDist = d
      }
    }

    if (minNode === null || minDist === Infinity) break
    visited.add(minNode)

    frames.push({
      type: 'visit-node',
      nodeId: minNode,
      distance: minDist,
      highlightLine: 13,
      description: '选中当前最短节点 ' + minNode,
      data: { distances: Object.fromEntries(dist), visited: Array.from(visited) }
    })

    for (const edge of graph.edges) {
      const isNeighbor = edge.from === minNode || edge.to === minNode
      if (!isNeighbor) continue

      const neighborId = edge.from === minNode ? edge.to : edge.from
      if (visited.has(neighborId)) continue

      frames.push({
        type: 'visit-edge',
        fromNode: minNode,
        toNode: neighborId,
        weight: edge.weight,
        highlightLine: 24,
        description: '检查边 ' + minNode + ' -> ' + neighborId
      })

      const newDist = minDist + edge.weight
      const oldDist = dist.get(neighborId)
      if (newDist < oldDist) {
        dist.set(neighborId, newDist)
        frames.push({
          type: 'update-distance',
          nodeId: neighborId,
          distance: newDist,
          highlightLine: 31,
          description: '更新最短距离: ' + neighborId + ' = ' + newDist,
          data: { distances: Object.fromEntries(dist) }
        })
      } else {
        frames.push({
          type: 'highlight',
          nodeId: neighborId,
          highlightLine: 35,
          description: '无需更新 ' + neighborId + '，当前路径不是更优'
        })
      }
    }
  }

  frames.push({
    type: 'reset',
    description: 'Dijkstra 完成',
    highlightLine: 39,
    data: { distances: Object.fromEntries(dist) }
  })

  return frames
}`
  },
  prim: {
    title: 'Prim 最小生成树',
    language: 'javascript',
    code: `function prim(graph, start) {
  const inMST = new Set([start])
  const mstEdges = []

  while (inMST.size < graph.nodes.length) {
    let bestEdge = null

    for (const edge of graph.edges) {
      const fromIn = inMST.has(edge.from)
      const toIn = inMST.has(edge.to)

      // 一端在树内，一端在树外
      if ((fromIn && !toIn) || (!fromIn && toIn)) {
        if (!bestEdge || edge.weight < bestEdge.weight) {
          bestEdge = edge
        }
      }
    }

    if (!bestEdge) break
    mstEdges.push(bestEdge)
    inMST.add(inMST.has(bestEdge.from) ? bestEdge.to : bestEdge.from)
  }

  return mstEdges
}`,
    fullCode: `function prim(graph, startId) {
  const frames = []
  const inMST = new Set([startId])
  const mstEdges = []
  let totalWeight = 0

  frames.push({
    type: 'reset',
    description: '初始化 Prim',
    highlightLine: 0,
    data: { mstEdges: [], totalWeight }
  })

  frames.push({
    type: 'visit-node',
    nodeId: startId,
    highlightLine: 2,
    description: '将起点加入生成树'
  })

  while (inMST.size < graph.nodes.length) {
    let bestEdge = null

    for (const edge of graph.edges) {
      const fromIn = inMST.has(edge.from)
      const toIn = inMST.has(edge.to)
      if ((fromIn && !toIn) || (!fromIn && toIn)) {
        if (!bestEdge || edge.weight < bestEdge.weight) {
          bestEdge = edge
        }
      }
    }

    if (!bestEdge) break
    frames.push({
      type: 'visit-edge',
      fromNode: bestEdge.from,
      toNode: bestEdge.to,
      weight: bestEdge.weight,
      highlightLine: 16,
      description: '找到当前最小跨集合边'
    })

    const newNode = inMST.has(bestEdge.from) ? bestEdge.to : bestEdge.from
    inMST.add(newNode)
    mstEdges.push(bestEdge.id)
    totalWeight += bestEdge.weight

    frames.push({
      type: 'select-edge',
      edgeId: bestEdge.id,
      fromNode: bestEdge.from,
      toNode: bestEdge.to,
      weight: bestEdge.weight,
      highlightLine: 23,
      description: '将边加入最小生成树',
      data: { mstEdges: mstEdges.slice(), totalWeight }
    })

    frames.push({
      type: 'highlight',
      highlightLine: 28,
      description: 'MST 当前总权值: ' + totalWeight,
      data: { mstEdges: mstEdges.slice(), totalWeight }
    })
  }

  frames.push({
    type: 'reset',
    highlightLine: 31,
    description: 'Prim 完成',
    data: { mstEdges, totalWeight }
  })

  return frames
}`
  },
  kruskal: {
    title: 'Kruskal 最小生成树',
    language: 'javascript',
    code: `function kruskal(graph) {
  const parent = new Map()
  for (const node of graph.nodes) parent.set(node.id, node.id)

  function find(x) {
    if (parent.get(x) !== x) parent.set(x, find(parent.get(x)))
    return parent.get(x)
  }

  function union(a, b) {
    const pa = find(a)
    const pb = find(b)
    if (pa === pb) return false
    parent.set(pa, pb)
    return true
  }

  const edges = [...graph.edges].sort((a, b) => a.weight - b.weight)
  const mst = []

  for (const edge of edges) {
    if (union(edge.from, edge.to)) {
      mst.push(edge)
      if (mst.length === graph.nodes.length - 1) break
    }
  }

  return mst
}`,
    fullCode: `function kruskal(graph) {
  const frames = []
  const parent = new Map()
  const rank = new Map()

  graph.nodes.forEach(node => {
    parent.set(node.id, node.id)
    rank.set(node.id, 0)
  })

  function find(x) {
    if (parent.get(x) !== x) parent.set(x, find(parent.get(x)))
    return parent.get(x)
  }

  function union(a, b) {
    const pa = find(a)
    const pb = find(b)
    if (pa === pb) return false

    const ra = rank.get(pa)
    const rb = rank.get(pb)
    if (ra < rb) parent.set(pa, pb)
    else if (ra > rb) parent.set(pb, pa)
    else {
      parent.set(pb, pa)
      rank.set(pa, ra + 1)
    }
    return true
  }

  const sorted = [...graph.edges].sort((a, b) => a.weight - b.weight)
  const mstEdges = []
  let totalWeight = 0

  frames.push({
    type: 'reset',
    description: '按边权排序完成',
    highlightLine: 24
  })

  for (const edge of sorted) {
    frames.push({
      type: 'visit-edge',
      fromNode: edge.from,
      toNode: edge.to,
      weight: edge.weight,
      highlightLine: 26,
      description: '检查边 ' + edge.from + '-' + edge.to
    })

    if (union(edge.from, edge.to)) {
      mstEdges.push(edge.id)
      totalWeight += edge.weight
      frames.push({
        type: 'select-edge',
        edgeId: edge.id,
        fromNode: edge.from,
        toNode: edge.to,
        weight: edge.weight,
        highlightLine: 28,
        description: '不成环，加入 MST',
        data: { mstEdges: mstEdges.slice(), totalWeight }
      })
    } else {
      frames.push({
        type: 'highlight',
        highlightLine: 34,
        description: '会形成环，跳过该边'
      })
    }

    if (mstEdges.length === graph.nodes.length - 1) break
  }

  frames.push({
    type: 'reset',
    description: 'Kruskal 完成',
    highlightLine: 38,
    data: { mstEdges, totalWeight }
  })

  return frames
}`
  },
  dfs: {
    title: '深度优先搜索',
    language: 'javascript',
    code: `function dfs(graph, start) {
  const visited = new Set()
  const order = []

  function visit(nodeId) {
    visited.add(nodeId)
    order.push(nodeId)

    const neighbors = graph.edges
      .filter(e => e.from === nodeId || e.to === nodeId)
      .map(e => (e.from === nodeId ? e.to : e.from))

    for (const next of neighbors) {
      if (!visited.has(next)) visit(next)
    }
  }

  visit(start)
  return order
}`,
    fullCode: `function dfs(graph, startId) {
  const frames = []
  const visited = new Set()

  function visit(nodeId) {
    visited.add(nodeId)
    frames.push({
      type: 'visit-node',
      nodeId,
      highlightLine: 6,
      description: '访问节点 ' + nodeId
    })

    const neighbors = graph.edges
      .filter(e => e.from === nodeId || e.to === nodeId)
      .map(e => (e.from === nodeId ? e.to : e.from))

    for (const next of neighbors) {
      if (!visited.has(next)) {
        frames.push({
          type: 'visit-edge',
          fromNode: nodeId,
          toNode: next,
          highlightLine: 13,
          description: '沿边深入到 ' + next
        })
        visit(next)
      } else {
        frames.push({
          type: 'highlight',
          nodeId: next,
          highlightLine: 14,
          description: next + ' 已访问，回溯'
        })
      }
    }
  }

  frames.push({ type: 'reset', description: 'DFS 开始', highlightLine: 0 })
  visit(startId)
  frames.push({ type: 'reset', description: 'DFS 完成', highlightLine: 18 })
  return frames
}`
  },
  bfs: {
    title: '广度优先搜索',
    language: 'javascript',
    code: `function bfs(graph, start) {
  const visited = new Set([start])
  const queue = [start]
  const order = []

  while (queue.length) {
    const nodeId = queue.shift()
    order.push(nodeId)

    const neighbors = graph.edges
      .filter(e => e.from === nodeId || e.to === nodeId)
      .map(e => (e.from === nodeId ? e.to : e.from))

    for (const next of neighbors) {
      if (!visited.has(next)) {
        visited.add(next)
        queue.push(next)
      }
    }
  }

  return order
}`,
    fullCode: `function bfs(graph, startId) {
  const frames = []
  const visited = new Set([startId])
  const queue = [startId]

  frames.push({ type: 'reset', description: 'BFS 开始', highlightLine: 0 })

  while (queue.length > 0) {
    const nodeId = queue.shift()
    frames.push({
      type: 'visit-node',
      nodeId,
      highlightLine: 9,
      description: '出队并访问 ' + nodeId
    })

    const neighbors = graph.edges
      .filter(e => e.from === nodeId || e.to === nodeId)
      .map(e => (e.from === nodeId ? e.to : e.from))

    for (const next of neighbors) {
      if (!visited.has(next)) {
        visited.add(next)
        queue.push(next)
        frames.push({
          type: 'visit-edge',
          fromNode: nodeId,
          toNode: next,
          highlightLine: 17,
          description: '发现新节点并入队 ' + next
        })
      } else {
        frames.push({
          type: 'highlight',
          nodeId: next,
          highlightLine: 18,
          description: next + ' 已访问，跳过'
        })
      }
    }
  }

  frames.push({ type: 'reset', description: 'BFS 完成', highlightLine: 22 })
  return frames
}`
  }
}
