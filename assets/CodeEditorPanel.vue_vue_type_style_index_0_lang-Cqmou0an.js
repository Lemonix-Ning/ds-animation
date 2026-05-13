import{r as P,A as Z,d as Xe,B as Ie,c as Se,a as ie,G as me,e as q,f as re,w as W,u as pe,Q as Ct,R as Sr,S as Er,U as jr,V as Ir,t as Oe,W as Ar,b as lt,o as Q,_ as Mt,X as Tr,i as Le,F as kr,g as Cr,n as Mr,C as qr,Y as Rr,Z as Dr,$ as $r,H as Or,a0 as Br,O as Pr}from"./index-CMhED8bi.js";const Fr={insert:{title:"顺序表插入",language:"javascript",code:`function sequentialInsert(arr, index, value) {
  if (index < 0 || index > arr.length) return arr
  for (let i = arr.length - 1; i >= index; i--) {
    arr[i + 1] = arr[i]
  }
  arr[index] = value
  return arr
}`,fullCode:`function sequentialInsert(arr, index, value) {
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
}`},delete:{title:"顺序表删除",language:"javascript",code:`function sequentialDelete(arr, index) {
  if (index < 0 || index >= arr.length) return arr
  for (let i = index; i < arr.length - 1; i++) {
    arr[i] = arr[i + 1]
  }
  arr.length = arr.length - 1
  return arr
}`,fullCode:`function sequentialDelete(arr, index) {
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
}`},search:{title:"顺序表查找",language:"javascript",code:`function sequentialSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i
  }
  return -1
}`,fullCode:`function sequentialSearch(arr, target) {
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
}`},reverse:{title:"链表逆置",language:"javascript",code:`function linkedListReverse(head) {
  let prev = null
  let curr = head
  while (curr) {
    const next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }
  return prev
}`,fullCode:`function linkedListReverse(nodes) {
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
}`},linkedInsert:{title:"链表插入",language:"javascript",code:`function linkedListInsert(head, position, value) {
  if (position === 0) return { value, next: head }
  let curr = head
  for (let i = 0; i < position - 1 && curr; i++) {
    curr = curr.next
  }
  if (!curr) return head
  curr.next = { value, next: curr.next }
  return head
}`,fullCode:`function linkedListInsert(nodes, position, value) {
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
}`},linkedDelete:{title:"链表删除",language:"javascript",code:`function linkedListDelete(head, position) {
  if (!head) return null
  if (position === 0) return head.next
  let curr = head
  for (let i = 0; i < position - 1 && curr; i++) {
    curr = curr.next
  }
  if (!curr || !curr.next) return head
  curr.next = curr.next.next
  return head
}`,fullCode:`function linkedListDelete(nodes, position) {
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
}`}},Ur={bubble:{title:"冒泡排序",language:"javascript",code:`function bubbleSort(arr) {
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
}`,fullCode:`function bubbleSort(arr) {
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
}`},selection:{title:"选择排序",language:"javascript",code:`function selectionSort(arr) {
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
}`,fullCode:`function selectionSort(arr) {
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
}`},insertion:{title:"插入排序",language:"javascript",code:`function insertionSort(arr) {
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
}`,fullCode:`function insertionSort(arr) {
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
}`},quick:{title:"快速排序",language:"javascript",code:`function quickSort(arr, low = 0, high = arr.length - 1) {
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
}`,fullCode:`function quickSort(arr) {
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
}`},heap:{title:"堆排序",language:"javascript",code:`function heapSort(arr) {
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
}`,fullCode:`function heapSort(arr) {
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
}`},shell:{title:"希尔排序",language:"javascript",code:`function shellSort(arr) {
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
}`,fullCode:`function shellSort(arr) {
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
}`},merge:{title:"归并排序",language:"javascript",code:`function mergeSort(arr, left = 0, right = arr.length - 1) {
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
}`,fullCode:`function mergeSort(arr) {
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
}`}},zr={sequential:{title:"顺序查找",language:"javascript",code:`function sequentialSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i
    }
  }
  return -1
}`,fullCode:`function sequentialSearch(arr, target) {
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
}`},binary:{title:"二分查找",language:"javascript",code:`function binarySearch(arr, target) {
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
}`,fullCode:`function binarySearch(arr, target) {
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
}`},interpolation:{title:"插值查找",language:"javascript",code:`function interpolationSearch(arr, target) {
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
}`,fullCode:`function interpolationSearch(arr, target) {
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
}`},jump:{title:"跳跃查找",language:"javascript",code:`function jumpSearch(arr, target) {
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
}`,fullCode:`function jumpSearch(arr, target) {
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
}`},bst:{title:"BST查找",language:"javascript",code:`function bstSearch(root, target) {
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
}`,fullCode:`function bstSearch(root, target) {
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
}`},hash:{title:"哈希查找",language:"javascript",code:`function hashSearch(table, size, target) {
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
}`,fullCode:`function hashSearch(ht, target) {
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
}`}},Hr={stackPush:{title:"栈入栈 Push",language:"javascript",code:`function stackPush(stack, value) {
  stack.push(value)
  return stack
}`,fullCode:`function stackPush(stack, value) {
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
}`},stackPop:{title:"栈出栈 Pop",language:"javascript",code:`function stackPop(stack) {
  if (stack.length === 0) return null
  return stack.pop()
}`,fullCode:`function stackPop(stack) {
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
}`},stackPeek:{title:"栈查看栈顶",language:"javascript",code:`function stackPeek(stack) {
  if (stack.length === 0) return null
  return stack[stack.length - 1]
}`,fullCode:`function stackPeek(stack) {
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
}`},queueEnqueue:{title:"队列入队 Enqueue",language:"javascript",code:`function queueEnqueue(queue, value) {
  queue.push(value)
  return queue
}`,fullCode:`function queueEnqueue(queue, value) {
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
}`},queueDequeue:{title:"队列出队 Dequeue",language:"javascript",code:`function queueDequeue(queue) {
  if (queue.length === 0) return null
  return queue.shift()
}`,fullCode:`function queueDequeue(queue) {
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
}`},queuePeek:{title:"队列查看队首",language:"javascript",code:`function queuePeek(queue) {
  if (queue.length === 0) return null
  return queue[0]
}`,fullCode:`function queuePeek(queue) {
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
}`}},Gr={kmp:{title:"KMP 字符串匹配",language:"javascript",code:`function kmpSearch(text, pattern) {
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
}`,fullCode:`function kmpSearch(text, pattern) {
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
}`},bruteForce:{title:"朴素字符串匹配",language:"javascript",code:`function bruteForceSearch(text, pattern) {
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
}`,fullCode:`function bruteForceSearch(text, pattern) {
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
}`}},Wr={preorder:{title:"前序遍历",language:"javascript",code:`function preorder(root) {
  const result = []
  function dfs(node) {
    if (!node) return
    result.push(node.value)
    dfs(node.left)
    dfs(node.right)
  }
  dfs(root)
  return result
}`,fullCode:`function preorder(root) {
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
}`},inorder:{title:"中序遍历",language:"javascript",code:`function inorder(root) {
  const result = []
  function dfs(node) {
    if (!node) return
    dfs(node.left)
    result.push(node.value)
    dfs(node.right)
  }
  dfs(root)
  return result
}`,fullCode:`function inorder(root) {
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
}`},postorder:{title:"后序遍历",language:"javascript",code:`function postorder(root) {
  const result = []
  function dfs(node) {
    if (!node) return
    dfs(node.left)
    dfs(node.right)
    result.push(node.value)
  }
  dfs(root)
  return result
}`,fullCode:`function postorder(root) {
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
}`},levelorder:{title:"层序遍历",language:"javascript",code:`function levelOrder(root) {
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
}`,fullCode:`function levelOrder(root) {
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
}`},avl:{title:"AVL 树插入与旋转",language:"javascript",code:`function avlInsert(values) {
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
}`,fullCode:`function avlInsert(values) {
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
}`},bstInsert:{title:"BST 插入",language:"javascript",code:`function bstInsert(root, value) {
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
}`,fullCode:`function bstInsert(root, value) {
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
}`},bstDelete:{title:"BST 删除",language:"javascript",code:`function bstDelete(root, key) {
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
}`,fullCode:`function bstDelete(root, value) {
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
}`},huffman:{title:"哈夫曼树",language:"javascript",code:`function buildHuffman(weights) {
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
}`,fullCode:`function buildHuffman(weights) {
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
}`}},Vr={dijkstra:{title:"Dijkstra 最短路径",language:"javascript",code:`function dijkstra(graph, start) {
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
}`,fullCode:`function dijkstra(graph, startId) {
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
}`},prim:{title:"Prim 最小生成树",language:"javascript",code:`function prim(graph, start) {
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
}`,fullCode:`function prim(graph, startId) {
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
}`},kruskal:{title:"Kruskal 最小生成树",language:"javascript",code:`function kruskal(graph) {
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
}`,fullCode:`function kruskal(graph) {
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
}`},dfs:{title:"深度优先搜索",language:"javascript",code:`function dfs(graph, start) {
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
}`,fullCode:`function dfs(graph, startId) {
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
}`},bfs:{title:"广度优先搜索",language:"javascript",code:`function bfs(graph, start) {
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
}`,fullCode:`function bfs(graph, startId) {
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
}`}};class Kr{frames=P([]);currentIndex=P(-1);status=P("idle");timer=null;config=P({speed:500,autoPlay:!1});onFrameChange=null;constructor(r){r&&(this.config.value={...this.config.value,...r})}load(r){this.stop(),this.frames.value=r,this.currentIndex.value=-1,this.status.value="idle"}play(){this.frames.value.length!==0&&(this.currentIndex.value>=this.frames.value.length-1&&(this.currentIndex.value=-1),this.status.value="playing",this.scheduleNext())}pause(){this.clearTimer(),this.status.value="paused"}stop(){this.clearTimer(),this.currentIndex.value=-1,this.status.value="idle",this.notifyFrameChange()}stepForward(){this.currentIndex.value<this.frames.value.length-1&&(this.currentIndex.value++,this.notifyFrameChange(),this.currentIndex.value>=this.frames.value.length-1&&(this.status.value="finished"))}stepBackward(){this.currentIndex.value>0?(this.currentIndex.value--,this.notifyFrameChange(),this.status.value="paused"):this.currentIndex.value===0&&(this.currentIndex.value=-1,this.notifyFrameChange(),this.status.value="idle")}goTo(r){r>=-1&&r<this.frames.value.length&&(this.pause(),this.currentIndex.value=r,this.notifyFrameChange(),r>=this.frames.value.length-1?this.status.value="finished":r<0?this.status.value="idle":this.status.value="paused")}setSpeed(r){this.config.value.speed=r,this.status.value==="playing"&&(this.clearTimer(),this.scheduleNext())}setOnFrameChange(r){this.onFrameChange=r}getCurrentFrame(){return this.currentIndex.value>=0&&this.currentIndex.value<this.frames.value.length?this.frames.value[this.currentIndex.value]:null}getFrames(){return this.frames.value}getState(){return{frames:this.frames,currentIndex:this.currentIndex,status:this.status,config:this.config,currentFrame:Z(()=>this.getCurrentFrame()),progress:Z(()=>this.frames.value.length===0?0:(this.currentIndex.value+1)/this.frames.value.length*100),totalFrames:Z(()=>this.frames.value.length),isPlaying:Z(()=>this.status.value==="playing"),isPaused:Z(()=>this.status.value==="paused"),isFinished:Z(()=>this.status.value==="finished"),isIdle:Z(()=>this.status.value==="idle")}}scheduleNext(){this.timer=window.setTimeout(()=>{this.status.value==="playing"&&(this.currentIndex.value++,this.notifyFrameChange(),this.currentIndex.value>=this.frames.value.length-1?this.status.value="finished":this.scheduleNext())},this.config.value.speed)}clearTimer(){this.timer!==null&&(clearTimeout(this.timer),this.timer=null)}notifyFrameChange(){this.onFrameChange&&this.onFrameChange(this.getCurrentFrame(),this.currentIndex.value)}}function Ki(t){const r=new Kr(t),i=r.getState();return{player:r,...i,load:a=>r.load(a),play:()=>r.play(),pause:()=>r.pause(),stop:()=>r.stop(),stepForward:()=>r.stepForward(),stepBackward:()=>r.stepBackward(),goTo:a=>r.goTo(a),setSpeed:a=>r.setSpeed(a),setOnFrameChange:a=>r.setOnFrameChange(a)}}const Jr={class:"control-bar"},Qr={class:"control-buttons"},Zr={class:"progress-bar"},Xr={class:"progress-label"},Yr={class:"speed-control"},ei={key:0,class:"step-description"},ti=Xe({__name:"ControlBar",props:{currentIndex:{},totalFrames:{},isPlaying:{type:Boolean},currentFrame:{},speed:{},allowPlayWhenEmpty:{type:Boolean}},emits:["play","pause","reset","stepForward","stepBackward","goTo","speedChange"],setup(t,{emit:r}){const i=t,a=Z(()=>i.allowPlayWhenEmpty===!0),c=r,m=P(i.currentIndex),x=P(i.speed),L=Z(()=>i.totalFrames===0?"-- / --":`${Math.max(i.currentIndex+1,0)} / ${i.totalFrames}`);Ie(()=>i.currentIndex,f=>{m.value=f}),Ie(()=>i.speed,f=>{x.value=f});const S=f=>{c("goTo",f)},y=f=>{c("speedChange",f)};return(f,d)=>{const j=re("el-button"),T=re("el-tooltip"),_=re("el-button-group"),k=re("el-slider"),U=re("el-icon"),M=re("el-option"),K=re("el-select"),ne=re("el-tag");return Q(),Se("div",Jr,[ie("div",Qr,[q(_,null,{default:W(()=>[q(T,{content:"重置",placement:"top"},{default:W(()=>[q(j,{icon:pe(Ct),onClick:d[0]||(d[0]=R=>c("reset"))},null,8,["icon"])]),_:1}),q(T,{content:"后退一步",placement:"top"},{default:W(()=>[q(j,{icon:pe(Sr),onClick:d[1]||(d[1]=R=>c("stepBackward")),disabled:t.currentIndex<0},null,8,["icon","disabled"])]),_:1}),q(T,{content:t.isPlaying?"暂停":"播放",placement:"top"},{default:W(()=>[q(j,{icon:t.isPlaying?pe(Er):pe(jr),type:"primary",onClick:d[2]||(d[2]=R=>t.isPlaying?c("pause"):c("play")),disabled:t.totalFrames===0&&!a.value},null,8,["icon","disabled"])]),_:1},8,["content"]),q(T,{content:"前进一步",placement:"top"},{default:W(()=>[q(j,{icon:pe(Ir),onClick:d[3]||(d[3]=R=>c("stepForward")),disabled:t.currentIndex>=t.totalFrames-1},null,8,["icon","disabled"])]),_:1})]),_:1})]),ie("div",Zr,[ie("span",Xr,Oe(L.value),1),q(k,{modelValue:m.value,"onUpdate:modelValue":d[4]||(d[4]=R=>m.value=R),max:Math.max(t.totalFrames-1,0),min:-1,"show-tooltip":!1,onChange:S,disabled:t.totalFrames===0},null,8,["modelValue","max","disabled"])]),ie("div",Yr,[q(U,null,{default:W(()=>[q(pe(Ar))]),_:1}),d[6]||(d[6]=ie("span",null,"速度:",-1)),q(K,{modelValue:x.value,"onUpdate:modelValue":d[5]||(d[5]=R=>x.value=R),style:{width:"100px"},onChange:y},{default:W(()=>[q(M,{label:"0.25x",value:2e3}),q(M,{label:"0.5x",value:1e3}),q(M,{label:"1x",value:500}),q(M,{label:"2x",value:250}),q(M,{label:"4x",value:125})]),_:1},8,["modelValue"])]),t.currentFrame?(Q(),Se("div",ei,[q(ne,{type:"info"},{default:W(()=>[lt(Oe(t.currentFrame.description),1)]),_:1})])):me("",!0)])}}}),Ji=Mt(ti,[["__scopeId","data-v-41bbb270"]]);var st,jt;function ri(){if(jt)return st;jt=1;function t(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(n=>{const o=e[n],w=typeof o;(w==="object"||w==="function")&&!Object.isFrozen(o)&&t(o)}),e}class r{constructor(n){n.data===void 0&&(n.data={}),this.data=n.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function i(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function a(e,...n){const o=Object.create(null);for(const w in e)o[w]=e[w];return n.forEach(function(w){for(const O in w)o[O]=w[O]}),o}const c="</span>",m=e=>!!e.scope,x=(e,{prefix:n})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const o=e.split(".");return[`${n}${o.shift()}`,...o.map((w,O)=>`${w}${"_".repeat(O+1)}`)].join(" ")}return`${n}${e}`};class L{constructor(n,o){this.buffer="",this.classPrefix=o.classPrefix,n.walk(this)}addText(n){this.buffer+=i(n)}openNode(n){if(!m(n))return;const o=x(n.scope,{prefix:this.classPrefix});this.span(o)}closeNode(n){m(n)&&(this.buffer+=c)}value(){return this.buffer}span(n){this.buffer+=`<span class="${n}">`}}const S=(e={})=>{const n={children:[]};return Object.assign(n,e),n};class y{constructor(){this.rootNode=S(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(n){this.top.children.push(n)}openNode(n){const o=S({scope:n});this.add(o),this.stack.push(o)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(n){return this.constructor._walk(n,this.rootNode)}static _walk(n,o){return typeof o=="string"?n.addText(o):o.children&&(n.openNode(o),o.children.forEach(w=>this._walk(n,w)),n.closeNode(o)),n}static _collapse(n){typeof n!="string"&&n.children&&(n.children.every(o=>typeof o=="string")?n.children=[n.children.join("")]:n.children.forEach(o=>{y._collapse(o)}))}}class f extends y{constructor(n){super(),this.options=n}addText(n){n!==""&&this.add(n)}startScope(n){this.openNode(n)}endScope(){this.closeNode()}__addSublanguage(n,o){const w=n.root;o&&(w.scope=`language:${o}`),this.add(w)}toHTML(){return new L(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function d(e){return e?typeof e=="string"?e:e.source:null}function j(e){return k("(?=",e,")")}function T(e){return k("(?:",e,")*")}function _(e){return k("(?:",e,")?")}function k(...e){return e.map(o=>d(o)).join("")}function U(e){const n=e[e.length-1];return typeof n=="object"&&n.constructor===Object?(e.splice(e.length-1,1),n):{}}function M(...e){return"("+(U(e).capture?"":"?:")+e.map(w=>d(w)).join("|")+")"}function K(e){return new RegExp(e.toString()+"|").exec("").length-1}function ne(e,n){const o=e&&e.exec(n);return o&&o.index===0}const R=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function ae(e,{joinWith:n}){let o=0;return e.map(w=>{o+=1;const O=o;let B=d(w),p="";for(;B.length>0;){const u=R.exec(B);if(!u){p+=B;break}p+=B.substring(0,u.index),B=B.substring(u.index+u[0].length),u[0][0]==="\\"&&u[1]?p+="\\"+String(Number(u[1])+O):(p+=u[0],u[0]==="("&&o++)}return p}).map(w=>`(${w})`).join(n)}const X=/\b\B/,ve="[a-zA-Z]\\w*",se="[a-zA-Z_]\\w*",Ae="\\b\\d+(\\.\\d+)?",Te="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Y="\\b(0b[01]+)",be="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Be=(e={})=>{const n=/^#![ ]*\//;return e.binary&&(e.begin=k(n,/.*\b/,e.binary,/\b.*/)),a({scope:"meta",begin:n,end:/$/,relevance:0,"on:begin":(o,w)=>{o.index!==0&&w.ignoreMatch()}},e)},ge={begin:"\\\\[\\s\\S]",relevance:0},Pe={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[ge]},ke={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[ge]},Ce={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},z=function(e,n,o={}){const w=a({scope:"comment",begin:e,end:n,contains:[]},o);w.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const O=M("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return w.contains.push({begin:k(/[ ]+/,"(",O,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),w},de=z("//","$"),he=z("/\\*","\\*/"),ye=z("#","$"),v={scope:"number",begin:Ae,relevance:0},A={scope:"number",begin:Te,relevance:0},_e={scope:"number",begin:Y,relevance:0},ee={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[ge,{begin:/\[/,end:/\]/,relevance:0,contains:[ge]}]},we={scope:"title",begin:ve,relevance:0},oe={scope:"title",begin:se,relevance:0},Fe={begin:"\\.\\s*"+se,relevance:0};var Me=Object.freeze({__proto__:null,APOS_STRING_MODE:Pe,BACKSLASH_ESCAPE:ge,BINARY_NUMBER_MODE:_e,BINARY_NUMBER_RE:Y,COMMENT:z,C_BLOCK_COMMENT_MODE:he,C_LINE_COMMENT_MODE:de,C_NUMBER_MODE:A,C_NUMBER_RE:Te,END_SAME_AS_BEGIN:function(e){return Object.assign(e,{"on:begin":(n,o)=>{o.data._beginMatch=n[1]},"on:end":(n,o)=>{o.data._beginMatch!==n[1]&&o.ignoreMatch()}})},HASH_COMMENT_MODE:ye,IDENT_RE:ve,MATCH_NOTHING_RE:X,METHOD_GUARD:Fe,NUMBER_MODE:v,NUMBER_RE:Ae,PHRASAL_WORDS_MODE:Ce,QUOTE_STRING_MODE:ke,REGEXP_MODE:ee,RE_STARTERS_RE:be,SHEBANG:Be,TITLE_MODE:we,UNDERSCORE_IDENT_RE:se,UNDERSCORE_TITLE_MODE:oe});function ct(e,n){e.input[e.index-1]==="."&&n.ignoreMatch()}function Ut(e,n){e.className!==void 0&&(e.scope=e.className,delete e.className)}function zt(e,n){n&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=ct,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function Ht(e,n){Array.isArray(e.illegal)&&(e.illegal=M(...e.illegal))}function Gt(e,n){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function Wt(e,n){e.relevance===void 0&&(e.relevance=1)}const Vt=(e,n)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const o=Object.assign({},e);Object.keys(e).forEach(w=>{delete e[w]}),e.keywords=o.keywords,e.begin=k(o.beforeMatch,j(o.begin)),e.starts={relevance:0,contains:[Object.assign(o,{endsParent:!0})]},e.relevance=0,delete o.beforeMatch},Kt=["of","and","for","in","not","or","if","then","parent","list","value"],Jt="keyword";function ut(e,n,o=Jt){const w=Object.create(null);return typeof e=="string"?O(o,e.split(" ")):Array.isArray(e)?O(o,e):Object.keys(e).forEach(function(B){Object.assign(w,ut(e[B],n,B))}),w;function O(B,p){n&&(p=p.map(u=>u.toLowerCase())),p.forEach(function(u){const b=u.split("|");w[b[0]]=[B,Qt(b[0],b[1])]})}}function Qt(e,n){return n?Number(n):Zt(e)?0:1}function Zt(e){return Kt.includes(e.toLowerCase())}const pt={},Ee=e=>{console.error(e)},gt=(e,...n)=>{console.log(`WARN: ${e}`,...n)},qe=(e,n)=>{pt[`${e}/${n}`]||(console.log(`Deprecated as of ${e}. ${n}`),pt[`${e}/${n}`]=!0)},He=new Error;function ht(e,n,{key:o}){let w=0;const O=e[o],B={},p={};for(let u=1;u<=n.length;u++)p[u+w]=O[u],B[u+w]=!0,w+=K(n[u-1]);e[o]=p,e[o]._emit=B,e[o]._multi=!0}function Xt(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw Ee("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),He;if(typeof e.beginScope!="object"||e.beginScope===null)throw Ee("beginScope must be object"),He;ht(e,e.begin,{key:"beginScope"}),e.begin=ae(e.begin,{joinWith:""})}}function Yt(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw Ee("skip, excludeEnd, returnEnd not compatible with endScope: {}"),He;if(typeof e.endScope!="object"||e.endScope===null)throw Ee("endScope must be object"),He;ht(e,e.end,{key:"endScope"}),e.end=ae(e.end,{joinWith:""})}}function er(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function tr(e){er(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),Xt(e),Yt(e)}function rr(e){function n(p,u){return new RegExp(d(p),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(u?"g":""))}class o{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(u,b){b.position=this.position++,this.matchIndexes[this.matchAt]=b,this.regexes.push([b,u]),this.matchAt+=K(u)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const u=this.regexes.map(b=>b[1]);this.matcherRe=n(ae(u,{joinWith:"|"}),!0),this.lastIndex=0}exec(u){this.matcherRe.lastIndex=this.lastIndex;const b=this.matcherRe.exec(u);if(!b)return null;const G=b.findIndex((Ue,et)=>et>0&&Ue!==void 0),F=this.matchIndexes[G];return b.splice(0,G),Object.assign(b,F)}}class w{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(u){if(this.multiRegexes[u])return this.multiRegexes[u];const b=new o;return this.rules.slice(u).forEach(([G,F])=>b.addRule(G,F)),b.compile(),this.multiRegexes[u]=b,b}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(u,b){this.rules.push([u,b]),b.type==="begin"&&this.count++}exec(u){const b=this.getMatcher(this.regexIndex);b.lastIndex=this.lastIndex;let G=b.exec(u);if(this.resumingScanAtSamePosition()&&!(G&&G.index===this.lastIndex)){const F=this.getMatcher(0);F.lastIndex=this.lastIndex+1,G=F.exec(u)}return G&&(this.regexIndex+=G.position+1,this.regexIndex===this.count&&this.considerAll()),G}}function O(p){const u=new w;return p.contains.forEach(b=>u.addRule(b.begin,{rule:b,type:"begin"})),p.terminatorEnd&&u.addRule(p.terminatorEnd,{type:"end"}),p.illegal&&u.addRule(p.illegal,{type:"illegal"}),u}function B(p,u){const b=p;if(p.isCompiled)return b;[Ut,Gt,tr,Vt].forEach(F=>F(p,u)),e.compilerExtensions.forEach(F=>F(p,u)),p.__beforeBegin=null,[zt,Ht,Wt].forEach(F=>F(p,u)),p.isCompiled=!0;let G=null;return typeof p.keywords=="object"&&p.keywords.$pattern&&(p.keywords=Object.assign({},p.keywords),G=p.keywords.$pattern,delete p.keywords.$pattern),G=G||/\w+/,p.keywords&&(p.keywords=ut(p.keywords,e.case_insensitive)),b.keywordPatternRe=n(G,!0),u&&(p.begin||(p.begin=/\B|\b/),b.beginRe=n(b.begin),!p.end&&!p.endsWithParent&&(p.end=/\B|\b/),p.end&&(b.endRe=n(b.end)),b.terminatorEnd=d(b.end)||"",p.endsWithParent&&u.terminatorEnd&&(b.terminatorEnd+=(p.end?"|":"")+u.terminatorEnd)),p.illegal&&(b.illegalRe=n(p.illegal)),p.contains||(p.contains=[]),p.contains=[].concat(...p.contains.map(function(F){return ir(F==="self"?p:F)})),p.contains.forEach(function(F){B(F,b)}),p.starts&&B(p.starts,u),b.matcher=O(b),b}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=a(e.classNameAliases||{}),B(e)}function ft(e){return e?e.endsWithParent||ft(e.starts):!1}function ir(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(n){return a(e,{variants:null},n)})),e.cachedVariants?e.cachedVariants:ft(e)?a(e,{starts:e.starts?a(e.starts):null}):Object.isFrozen(e)?a(e):e}var nr="11.11.1";class ar extends Error{constructor(n,o){super(n),this.name="HTMLInjectionError",this.html=o}}const Ye=i,mt=a,vt=Symbol("nomatch"),sr=7,bt=function(e){const n=Object.create(null),o=Object.create(null),w=[];let O=!0;const B="Could not find the language '{}', did you forget to load/include a language module?",p={disableAutodetect:!0,name:"Plain text",contains:[]};let u={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:f};function b(s){return u.noHighlightRe.test(s)}function G(s){let h=s.className+" ";h+=s.parentNode?s.parentNode.className:"";const I=u.languageDetectRe.exec(h);if(I){const D=Ne(I[1]);return D||(gt(B.replace("{}",I[1])),gt("Falling back to no-highlight mode for this block.",s)),D?I[1]:"no-highlight"}return h.split(/\s+/).find(D=>b(D)||Ne(D))}function F(s,h,I){let D="",H="";typeof h=="object"?(D=s,I=h.ignoreIllegals,H=h.language):(qe("10.7.0","highlight(lang, code, ...args) has been deprecated."),qe("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),H=s,D=h),I===void 0&&(I=!0);const le={code:D,language:H};We("before:highlight",le);const xe=le.result?le.result:Ue(le.language,le.code,I);return xe.code=le.code,We("after:highlight",xe),xe}function Ue(s,h,I,D){const H=Object.create(null);function le(l,g){return l.keywords[g]}function xe(){if(!N.keywords){V.addText($);return}let l=0;N.keywordPatternRe.lastIndex=0;let g=N.keywordPatternRe.exec($),E="";for(;g;){E+=$.substring(l,g.index);const C=ue.case_insensitive?g[0].toLowerCase():g[0],J=le(N,C);if(J){const[fe,xr]=J;if(V.addText(E),E="",H[C]=(H[C]||0)+1,H[C]<=sr&&(Je+=xr),fe.startsWith("_"))E+=g[0];else{const Lr=ue.classNameAliases[fe]||fe;ce(g[0],Lr)}}else E+=g[0];l=N.keywordPatternRe.lastIndex,g=N.keywordPatternRe.exec($)}E+=$.substring(l),V.addText(E)}function Ve(){if($==="")return;let l=null;if(typeof N.subLanguage=="string"){if(!n[N.subLanguage]){V.addText($);return}l=Ue(N.subLanguage,$,!0,Et[N.subLanguage]),Et[N.subLanguage]=l._top}else l=tt($,N.subLanguage.length?N.subLanguage:null);N.relevance>0&&(Je+=l.relevance),V.__addSublanguage(l._emitter,l.language)}function te(){N.subLanguage!=null?Ve():xe(),$=""}function ce(l,g){l!==""&&(V.startScope(g),V.addText(l),V.endScope())}function Nt(l,g){let E=1;const C=g.length-1;for(;E<=C;){if(!l._emit[E]){E++;continue}const J=ue.classNameAliases[l[E]]||l[E],fe=g[E];J?ce(fe,J):($=fe,xe(),$=""),E++}}function xt(l,g){return l.scope&&typeof l.scope=="string"&&V.openNode(ue.classNameAliases[l.scope]||l.scope),l.beginScope&&(l.beginScope._wrap?(ce($,ue.classNameAliases[l.beginScope._wrap]||l.beginScope._wrap),$=""):l.beginScope._multi&&(Nt(l.beginScope,g),$="")),N=Object.create(l,{parent:{value:N}}),N}function Lt(l,g,E){let C=ne(l.endRe,E);if(C){if(l["on:end"]){const J=new r(l);l["on:end"](g,J),J.isMatchIgnored&&(C=!1)}if(C){for(;l.endsParent&&l.parent;)l=l.parent;return l}}if(l.endsWithParent)return Lt(l.parent,g,E)}function br(l){return N.matcher.regexIndex===0?($+=l[0],1):(at=!0,0)}function yr(l){const g=l[0],E=l.rule,C=new r(E),J=[E.__beforeBegin,E["on:begin"]];for(const fe of J)if(fe&&(fe(l,C),C.isMatchIgnored))return br(g);return E.skip?$+=g:(E.excludeBegin&&($+=g),te(),!E.returnBegin&&!E.excludeBegin&&($=g)),xt(E,l),E.returnBegin?0:g.length}function _r(l){const g=l[0],E=h.substring(l.index),C=Lt(N,l,E);if(!C)return vt;const J=N;N.endScope&&N.endScope._wrap?(te(),ce(g,N.endScope._wrap)):N.endScope&&N.endScope._multi?(te(),Nt(N.endScope,l)):J.skip?$+=g:(J.returnEnd||J.excludeEnd||($+=g),te(),J.excludeEnd&&($=g));do N.scope&&V.closeNode(),!N.skip&&!N.subLanguage&&(Je+=N.relevance),N=N.parent;while(N!==C.parent);return C.starts&&xt(C.starts,l),J.returnEnd?0:g.length}function wr(){const l=[];for(let g=N;g!==ue;g=g.parent)g.scope&&l.unshift(g.scope);l.forEach(g=>V.openNode(g))}let Ke={};function St(l,g){const E=g&&g[0];if($+=l,E==null)return te(),0;if(Ke.type==="begin"&&g.type==="end"&&Ke.index===g.index&&E===""){if($+=h.slice(g.index,g.index+1),!O){const C=new Error(`0 width match regex (${s})`);throw C.languageName=s,C.badRule=Ke.rule,C}return 1}if(Ke=g,g.type==="begin")return yr(g);if(g.type==="illegal"&&!I){const C=new Error('Illegal lexeme "'+E+'" for mode "'+(N.scope||"<unnamed>")+'"');throw C.mode=N,C}else if(g.type==="end"){const C=_r(g);if(C!==vt)return C}if(g.type==="illegal"&&E==="")return $+=`
`,1;if(nt>1e5&&nt>g.index*3)throw new Error("potential infinite loop, way more iterations than matches");return $+=E,E.length}const ue=Ne(s);if(!ue)throw Ee(B.replace("{}",s)),new Error('Unknown language: "'+s+'"');const Nr=rr(ue);let it="",N=D||Nr;const Et={},V=new u.__emitter(u);wr();let $="",Je=0,je=0,nt=0,at=!1;try{if(ue.__emitTokens)ue.__emitTokens(h,V);else{for(N.matcher.considerAll();;){nt++,at?at=!1:N.matcher.considerAll(),N.matcher.lastIndex=je;const l=N.matcher.exec(h);if(!l)break;const g=h.substring(je,l.index),E=St(g,l);je=l.index+E}St(h.substring(je))}return V.finalize(),it=V.toHTML(),{language:s,value:it,relevance:Je,illegal:!1,_emitter:V,_top:N}}catch(l){if(l.message&&l.message.includes("Illegal"))return{language:s,value:Ye(h),illegal:!0,relevance:0,_illegalBy:{message:l.message,index:je,context:h.slice(je-100,je+100),mode:l.mode,resultSoFar:it},_emitter:V};if(O)return{language:s,value:Ye(h),illegal:!1,relevance:0,errorRaised:l,_emitter:V,_top:N};throw l}}function et(s){const h={value:Ye(s),illegal:!1,relevance:0,_top:p,_emitter:new u.__emitter(u)};return h._emitter.addText(s),h}function tt(s,h){h=h||u.languages||Object.keys(n);const I=et(s),D=h.filter(Ne).filter(wt).map(te=>Ue(te,s,!1));D.unshift(I);const H=D.sort((te,ce)=>{if(te.relevance!==ce.relevance)return ce.relevance-te.relevance;if(te.language&&ce.language){if(Ne(te.language).supersetOf===ce.language)return 1;if(Ne(ce.language).supersetOf===te.language)return-1}return 0}),[le,xe]=H,Ve=le;return Ve.secondBest=xe,Ve}function or(s,h,I){const D=h&&o[h]||I;s.classList.add("hljs"),s.classList.add(`language-${D}`)}function rt(s){let h=null;const I=G(s);if(b(I))return;if(We("before:highlightElement",{el:s,language:I}),s.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",s);return}if(s.children.length>0&&(u.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(s)),u.throwUnescapedHTML))throw new ar("One of your code blocks includes unescaped HTML.",s.innerHTML);h=s;const D=h.textContent,H=I?F(D,{language:I,ignoreIllegals:!0}):tt(D);s.innerHTML=H.value,s.dataset.highlighted="yes",or(s,I,H.language),s.result={language:H.language,re:H.relevance,relevance:H.relevance},H.secondBest&&(s.secondBest={language:H.secondBest.language,relevance:H.secondBest.relevance}),We("after:highlightElement",{el:s,result:H,text:D})}function lr(s){u=mt(u,s)}const dr=()=>{Ge(),qe("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function cr(){Ge(),qe("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let yt=!1;function Ge(){function s(){Ge()}if(document.readyState==="loading"){yt||window.addEventListener("DOMContentLoaded",s,!1),yt=!0;return}document.querySelectorAll(u.cssSelector).forEach(rt)}function ur(s,h){let I=null;try{I=h(e)}catch(D){if(Ee("Language definition for '{}' could not be registered.".replace("{}",s)),O)Ee(D);else throw D;I=p}I.name||(I.name=s),n[s]=I,I.rawDefinition=h.bind(null,e),I.aliases&&_t(I.aliases,{languageName:s})}function pr(s){delete n[s];for(const h of Object.keys(o))o[h]===s&&delete o[h]}function gr(){return Object.keys(n)}function Ne(s){return s=(s||"").toLowerCase(),n[s]||n[o[s]]}function _t(s,{languageName:h}){typeof s=="string"&&(s=[s]),s.forEach(I=>{o[I.toLowerCase()]=h})}function wt(s){const h=Ne(s);return h&&!h.disableAutodetect}function hr(s){s["before:highlightBlock"]&&!s["before:highlightElement"]&&(s["before:highlightElement"]=h=>{s["before:highlightBlock"](Object.assign({block:h.el},h))}),s["after:highlightBlock"]&&!s["after:highlightElement"]&&(s["after:highlightElement"]=h=>{s["after:highlightBlock"](Object.assign({block:h.el},h))})}function fr(s){hr(s),w.push(s)}function mr(s){const h=w.indexOf(s);h!==-1&&w.splice(h,1)}function We(s,h){const I=s;w.forEach(function(D){D[I]&&D[I](h)})}function vr(s){return qe("10.7.0","highlightBlock will be removed entirely in v12.0"),qe("10.7.0","Please use highlightElement now."),rt(s)}Object.assign(e,{highlight:F,highlightAuto:tt,highlightAll:Ge,highlightElement:rt,highlightBlock:vr,configure:lr,initHighlighting:dr,initHighlightingOnLoad:cr,registerLanguage:ur,unregisterLanguage:pr,listLanguages:gr,getLanguage:Ne,registerAliases:_t,autoDetection:wt,inherit:mt,addPlugin:fr,removePlugin:mr}),e.debugMode=function(){O=!1},e.safeMode=function(){O=!0},e.versionString=nr,e.regex={concat:k,lookahead:j,either:M,optional:_,anyNumberOfTimes:T};for(const s in Me)typeof Me[s]=="object"&&t(Me[s]);return Object.assign(e,Me),e},Re=bt({});return Re.newInstance=()=>bt({}),st=Re,Re.HighlightJS=Re,Re.default=Re,st}var ii=ri();const De=Tr(ii),It="[A-Za-z$_][0-9A-Za-z$_]*",ni=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],ai=["true","false","null","undefined","NaN","Infinity"],qt=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Rt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Dt=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],si=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],oi=[].concat(Dt,qt,Rt);function li(t){const r=t.regex,i=(z,{after:de})=>{const he="</"+z[0].slice(1);return z.input.indexOf(he,de)!==-1},a=It,c={begin:"<>",end:"</>"},m=/<[A-Za-z0-9\\._:-]+\s*\/>/,x={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(z,de)=>{const he=z[0].length+z.index,ye=z.input[he];if(ye==="<"||ye===","){de.ignoreMatch();return}ye===">"&&(i(z,{after:he})||de.ignoreMatch());let v;const A=z.input.substring(he);if(v=A.match(/^\s*=/)){de.ignoreMatch();return}if((v=A.match(/^\s+extends\s+/))&&v.index===0){de.ignoreMatch();return}}},L={$pattern:It,keyword:ni,literal:ai,built_in:oi,"variable.language":si},S="[0-9](_?[0-9])*",y=`\\.(${S})`,f="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${f})((${y})|\\.)?|(${y}))[eE][+-]?(${S})\\b`},{begin:`\\b(${f})\\b((${y})\\b|\\.)?|(${y})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},j={className:"subst",begin:"\\$\\{",end:"\\}",keywords:L,contains:[]},T={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,j],subLanguage:"xml"}},_={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,j],subLanguage:"css"}},k={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,j],subLanguage:"graphql"}},U={className:"string",begin:"`",end:"`",contains:[t.BACKSLASH_ESCAPE,j]},K={className:"comment",variants:[t.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:a+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),t.C_BLOCK_COMMENT_MODE,t.C_LINE_COMMENT_MODE]},ne=[t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,T,_,k,U,{match:/\$\d+/},d];j.contains=ne.concat({begin:/\{/,end:/\}/,keywords:L,contains:["self"].concat(ne)});const R=[].concat(K,j.contains),ae=R.concat([{begin:/(\s*)\(/,end:/\)/,keywords:L,contains:["self"].concat(R)}]),X={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:L,contains:ae},ve={variants:[{match:[/class/,/\s+/,a,/\s+/,/extends/,/\s+/,r.concat(a,"(",r.concat(/\./,a),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,a],scope:{1:"keyword",3:"title.class"}}]},se={relevance:0,match:r.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...qt,...Rt]}},Ae={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},Te={variants:[{match:[/function/,/\s+/,a,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[X],illegal:/%/},Y={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function be(z){return r.concat("(?!",z.join("|"),")")}const Be={match:r.concat(/\b/,be([...Dt,"super","import"].map(z=>`${z}\\s*\\(`)),a,r.lookahead(/\s*\(/)),className:"title.function",relevance:0},ge={begin:r.concat(/\./,r.lookahead(r.concat(a,/(?![0-9A-Za-z$_(])/))),end:a,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},Pe={match:[/get|set/,/\s+/,a,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},X]},ke="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+t.UNDERSCORE_IDENT_RE+")\\s*=>",Ce={match:[/const|var|let/,/\s+/,a,/\s*/,/=\s*/,/(async\s*)?/,r.lookahead(ke)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[X]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:L,exports:{PARAMS_CONTAINS:ae,CLASS_REFERENCE:se},illegal:/#(?![$_A-z])/,contains:[t.SHEBANG({label:"shebang",binary:"node",relevance:5}),Ae,t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,T,_,k,U,K,{match:/\$\d+/},d,se,{scope:"attr",match:a+r.lookahead(":"),relevance:0},Ce,{begin:"("+t.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[K,t.REGEXP_MODE,{className:"function",begin:ke,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:t.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:L,contains:ae}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:c.begin,end:c.end},{match:m},{begin:x.begin,"on:begin":x.isTrulyOpeningTag,end:x.end}],subLanguage:"xml",contains:[{begin:x.begin,end:x.end,skip:!0,contains:["self"]}]}]},Te,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+t.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[X,t.inherit(t.TITLE_MODE,{begin:a,className:"title.function"})]},{match:/\.\.\./,relevance:0},ge,{match:"\\$"+a,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[X]},Be,Y,ve,Pe,{match:/\$[(.]/}]}}function di(t){const r=t.regex,i=t.COMMENT("//","$",{contains:[{begin:/\\\n/}]}),a="decltype\\(auto\\)",c="[a-zA-Z_]\\w*::",x="(?!struct)("+a+"|"+r.optional(c)+"[a-zA-Z_]\\w*"+r.optional("<[^<>]+>")+")",L={className:"type",begin:"\\b[a-z\\d_]*_t\\b"},y={className:"string",variants:[{begin:'(u8?|U|L)?"',end:'"',illegal:"\\n",contains:[t.BACKSLASH_ESCAPE]},{begin:"(u8?|U|L)?'("+"\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)"+"|.)",end:"'",illegal:"."},t.END_SAME_AS_BEGIN({begin:/(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,end:/\)([^()\\ ]{0,16})"/})]},f={className:"number",variants:[{begin:"[+-]?(?:(?:[0-9](?:'?[0-9])*\\.(?:[0-9](?:'?[0-9])*)?|\\.[0-9](?:'?[0-9])*)(?:[Ee][+-]?[0-9](?:'?[0-9])*)?|[0-9](?:'?[0-9])*[Ee][+-]?[0-9](?:'?[0-9])*|0[Xx](?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*(?:\\.(?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)?)?|\\.[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)[Pp][+-]?[0-9](?:'?[0-9])*)(?:[Ff](?:16|32|64|128)?|(BF|bf)16|[Ll]|)"},{begin:"[+-]?\\b(?:0[Bb][01](?:'?[01])*|0[Xx][0-9A-Fa-f](?:'?[0-9A-Fa-f])*|0(?:'?[0-7])*|[1-9](?:'?[0-9])*)(?:[Uu](?:LL?|ll?)|[Uu][Zz]?|(?:LL?|ll?)[Uu]?|[Zz][Uu]|)"}],relevance:0},d={className:"meta",begin:/#\s*[a-z]+\b/,end:/$/,keywords:{keyword:"if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"},contains:[{begin:/\\\n/,relevance:0},t.inherit(y,{className:"string"}),{className:"string",begin:/<.*?>/},i,t.C_BLOCK_COMMENT_MODE]},j={className:"title",begin:r.optional(c)+t.IDENT_RE,relevance:0},T=r.optional(c)+t.IDENT_RE+"\\s*\\(",_=["alignas","alignof","and","and_eq","asm","atomic_cancel","atomic_commit","atomic_noexcept","auto","bitand","bitor","break","case","catch","class","co_await","co_return","co_yield","compl","concept","const_cast|10","consteval","constexpr","constinit","continue","decltype","default","delete","do","dynamic_cast|10","else","enum","explicit","export","extern","false","final","for","friend","goto","if","import","inline","module","mutable","namespace","new","noexcept","not","not_eq","nullptr","operator","or","or_eq","override","private","protected","public","reflexpr","register","reinterpret_cast|10","requires","return","sizeof","static_assert","static_cast|10","struct","switch","synchronized","template","this","thread_local","throw","transaction_safe","transaction_safe_dynamic","true","try","typedef","typeid","typename","union","using","virtual","volatile","while","xor","xor_eq"],k=["bool","char","char16_t","char32_t","char8_t","double","float","int","long","short","void","wchar_t","unsigned","signed","const","static"],U=["any","auto_ptr","barrier","binary_semaphore","bitset","complex","condition_variable","condition_variable_any","counting_semaphore","deque","false_type","flat_map","flat_set","future","imaginary","initializer_list","istringstream","jthread","latch","lock_guard","multimap","multiset","mutex","optional","ostringstream","packaged_task","pair","promise","priority_queue","queue","recursive_mutex","recursive_timed_mutex","scoped_lock","set","shared_future","shared_lock","shared_mutex","shared_timed_mutex","shared_ptr","stack","string_view","stringstream","timed_mutex","thread","true_type","tuple","unique_lock","unique_ptr","unordered_map","unordered_multimap","unordered_multiset","unordered_set","variant","vector","weak_ptr","wstring","wstring_view"],M=["abort","abs","acos","apply","as_const","asin","atan","atan2","calloc","ceil","cerr","cin","clog","cos","cosh","cout","declval","endl","exchange","exit","exp","fabs","floor","fmod","forward","fprintf","fputs","free","frexp","fscanf","future","invoke","isalnum","isalpha","iscntrl","isdigit","isgraph","islower","isprint","ispunct","isspace","isupper","isxdigit","labs","launder","ldexp","log","log10","make_pair","make_shared","make_shared_for_overwrite","make_tuple","make_unique","malloc","memchr","memcmp","memcpy","memset","modf","move","pow","printf","putchar","puts","realloc","scanf","sin","sinh","snprintf","sprintf","sqrt","sscanf","std","stderr","stdin","stdout","strcat","strchr","strcmp","strcpy","strcspn","strlen","strncat","strncmp","strncpy","strpbrk","strrchr","strspn","strstr","swap","tan","tanh","terminate","to_underlying","tolower","toupper","vfprintf","visit","vprintf","vsprintf"],R={type:k,keyword:_,literal:["NULL","false","nullopt","nullptr","true"],built_in:["_Pragma"],_type_hints:U},ae={className:"function.dispatch",relevance:0,keywords:{_hint:M},begin:r.concat(/\b/,/(?!decltype)/,/(?!if)/,/(?!for)/,/(?!switch)/,/(?!while)/,t.IDENT_RE,r.lookahead(/(<[^<>]+>|)\s*\(/))},X=[ae,d,L,i,t.C_BLOCK_COMMENT_MODE,f,y],ve={variants:[{begin:/=/,end:/;/},{begin:/\(/,end:/\)/},{beginKeywords:"new throw return else",end:/;/}],keywords:R,contains:X.concat([{begin:/\(/,end:/\)/,keywords:R,contains:X.concat(["self"]),relevance:0}]),relevance:0},se={className:"function",begin:"("+x+"[\\*&\\s]+)+"+T,returnBegin:!0,end:/[{;=]/,excludeEnd:!0,keywords:R,illegal:/[^\w\s\*&:<>.]/,contains:[{begin:a,keywords:R,relevance:0},{begin:T,returnBegin:!0,contains:[j],relevance:0},{begin:/::/,relevance:0},{begin:/:/,endsWithParent:!0,contains:[y,f]},{relevance:0,match:/,/},{className:"params",begin:/\(/,end:/\)/,keywords:R,relevance:0,contains:[i,t.C_BLOCK_COMMENT_MODE,y,f,L,{begin:/\(/,end:/\)/,keywords:R,relevance:0,contains:["self",i,t.C_BLOCK_COMMENT_MODE,y,f,L]}]},L,i,t.C_BLOCK_COMMENT_MODE,d]};return{name:"C++",aliases:["cc","c++","h++","hpp","hh","hxx","cxx"],keywords:R,illegal:"</",classNameAliases:{"function.dispatch":"built_in"},contains:[].concat(ve,se,ae,X,[d,{begin:"\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function|flat_map|flat_set)\\s*<(?!<)",end:">",keywords:R,contains:["self",L]},{begin:t.IDENT_RE+"::",keywords:R},{match:[/\b(?:enum(?:\s+(?:class|struct))?|class|struct|union)/,/\s+/,/\w+/],className:{1:"keyword",3:"title.class"}}])}}var $e="[0-9](_*[0-9])*",Qe=`\\.(${$e})`,Ze="[0-9a-fA-F](_*[0-9a-fA-F])*",At={className:"number",variants:[{begin:`(\\b(${$e})((${Qe})|\\.)?|(${Qe}))[eE][+-]?(${$e})[fFdD]?\\b`},{begin:`\\b(${$e})((${Qe})[fFdD]?\\b|\\.([fFdD]\\b)?)`},{begin:`(${Qe})[fFdD]?\\b`},{begin:`\\b(${$e})[fFdD]\\b`},{begin:`\\b0[xX]((${Ze})\\.?|(${Ze})?\\.(${Ze}))[pP][+-]?(${$e})[fFdD]?\\b`},{begin:"\\b(0|[1-9](_*[0-9])*)[lL]?\\b"},{begin:`\\b0[xX](${Ze})[lL]?\\b`},{begin:"\\b0(_*[0-7])*[lL]?\\b"},{begin:"\\b0[bB][01](_*[01])*[lL]?\\b"}],relevance:0};function $t(t,r,i){return i===-1?"":t.replace(r,a=>$t(t,r,i-1))}function ci(t){const r=t.regex,i="[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*",a=i+$t("(?:<"+i+"~~~(?:\\s*,\\s*"+i+"~~~)*>)?",/~~~/g,2),S={keyword:["synchronized","abstract","private","var","static","if","const ","for","while","strictfp","finally","protected","import","native","final","void","enum","else","break","transient","catch","instanceof","volatile","case","assert","package","default","public","try","switch","continue","throws","protected","public","private","module","requires","exports","do","sealed","yield","permits","goto","when"],literal:["false","true","null"],type:["char","boolean","long","float","int","byte","short","double"],built_in:["super","this"]},y={className:"meta",begin:"@"+i,contains:[{begin:/\(/,end:/\)/,contains:["self"]}]},f={className:"params",begin:/\(/,end:/\)/,keywords:S,relevance:0,contains:[t.C_BLOCK_COMMENT_MODE],endsParent:!0};return{name:"Java",aliases:["jsp"],keywords:S,illegal:/<\/|#/,contains:[t.COMMENT("/\\*\\*","\\*/",{relevance:0,contains:[{begin:/\w+@/,relevance:0},{className:"doctag",begin:"@[A-Za-z]+"}]}),{begin:/import java\.[a-z]+\./,keywords:"import",relevance:2},t.C_LINE_COMMENT_MODE,t.C_BLOCK_COMMENT_MODE,{begin:/"""/,end:/"""/,className:"string",contains:[t.BACKSLASH_ESCAPE]},t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,{match:[/\b(?:class|interface|enum|extends|implements|new)/,/\s+/,i],className:{1:"keyword",3:"title.class"}},{match:/non-sealed/,scope:"keyword"},{begin:[r.concat(/(?!else)/,i),/\s+/,i,/\s+/,/=(?!=)/],className:{1:"type",3:"variable",5:"operator"}},{begin:[/record/,/\s+/,i],className:{1:"keyword",3:"title.class"},contains:[f,t.C_LINE_COMMENT_MODE,t.C_BLOCK_COMMENT_MODE]},{beginKeywords:"new throw return else",relevance:0},{begin:["(?:"+a+"\\s+)",t.UNDERSCORE_IDENT_RE,/\s*(?=\()/],className:{2:"title.function"},keywords:S,contains:[{className:"params",begin:/\(/,end:/\)/,keywords:S,relevance:0,contains:[y,t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,At,t.C_BLOCK_COMMENT_MODE]},t.C_LINE_COMMENT_MODE,t.C_BLOCK_COMMENT_MODE]},At,y]}}function ui(t){const r=t.regex,i=new RegExp("[\\p{XID_Start}_]\\p{XID_Continue}*","u"),a=["and","as","assert","async","await","break","case","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","in","is","lambda","match","nonlocal|10","not","or","pass","raise","return","try","while","with","yield"],L={$pattern:/[A-Za-z]\w+|__\w+__/,keyword:a,built_in:["__import__","abs","all","any","ascii","bin","bool","breakpoint","bytearray","bytes","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","exec","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","print","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip"],literal:["__debug__","Ellipsis","False","None","NotImplemented","True"],type:["Any","Callable","Coroutine","Dict","List","Literal","Generic","Optional","Sequence","Set","Tuple","Type","Union"]},S={className:"meta",begin:/^(>>>|\.\.\.) /},y={className:"subst",begin:/\{/,end:/\}/,keywords:L,illegal:/#/},f={begin:/\{\{/,relevance:0},d={className:"string",contains:[t.BACKSLASH_ESCAPE],variants:[{begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,end:/'''/,contains:[t.BACKSLASH_ESCAPE,S],relevance:10},{begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,end:/"""/,contains:[t.BACKSLASH_ESCAPE,S],relevance:10},{begin:/([fF][rR]|[rR][fF]|[fF])'''/,end:/'''/,contains:[t.BACKSLASH_ESCAPE,S,f,y]},{begin:/([fF][rR]|[rR][fF]|[fF])"""/,end:/"""/,contains:[t.BACKSLASH_ESCAPE,S,f,y]},{begin:/([uU]|[rR])'/,end:/'/,relevance:10},{begin:/([uU]|[rR])"/,end:/"/,relevance:10},{begin:/([bB]|[bB][rR]|[rR][bB])'/,end:/'/},{begin:/([bB]|[bB][rR]|[rR][bB])"/,end:/"/},{begin:/([fF][rR]|[rR][fF]|[fF])'/,end:/'/,contains:[t.BACKSLASH_ESCAPE,f,y]},{begin:/([fF][rR]|[rR][fF]|[fF])"/,end:/"/,contains:[t.BACKSLASH_ESCAPE,f,y]},t.APOS_STRING_MODE,t.QUOTE_STRING_MODE]},j="[0-9](_?[0-9])*",T=`(\\b(${j}))?\\.(${j})|\\b(${j})\\.`,_=`\\b|${a.join("|")}`,k={className:"number",relevance:0,variants:[{begin:`(\\b(${j})|(${T}))[eE][+-]?(${j})[jJ]?(?=${_})`},{begin:`(${T})[jJ]?`},{begin:`\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${_})`},{begin:`\\b0[bB](_?[01])+[lL]?(?=${_})`},{begin:`\\b0[oO](_?[0-7])+[lL]?(?=${_})`},{begin:`\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${_})`},{begin:`\\b(${j})[jJ](?=${_})`}]},U={className:"comment",begin:r.lookahead(/# type:/),end:/$/,keywords:L,contains:[{begin:/# type:/},{begin:/#/,end:/\b\B/,endsWithParent:!0}]},M={className:"params",variants:[{className:"",begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:L,contains:["self",S,k,d,t.HASH_COMMENT_MODE]}]};return y.contains=[d,k,S],{name:"Python",aliases:["py","gyp","ipython"],unicodeRegex:!0,keywords:L,illegal:/(<\/|\?)|=>/,contains:[S,k,{scope:"variable.language",match:/\bself\b/},{beginKeywords:"if",relevance:0},{match:/\bor\b/,scope:"keyword"},d,U,t.HASH_COMMENT_MODE,{match:[/\bdef/,/\s+/,i],scope:{1:"keyword",3:"title.function"},contains:[M]},{variants:[{match:[/\bclass/,/\s+/,i,/\s*/,/\(\s*/,i,/\s*\)/]},{match:[/\bclass/,/\s+/,i]}],scope:{1:"keyword",3:"title.class",6:"title.class.inherited"}},{className:"meta",begin:/^[\t ]*@/,end:/(?=#)|$/,contains:[k,M,d]}]}}function pi(t){const r=["bool","byte","char","decimal","delegate","double","dynamic","enum","float","int","long","nint","nuint","object","sbyte","short","string","ulong","uint","ushort"],i=["public","private","protected","static","internal","protected","abstract","async","extern","override","unsafe","virtual","new","sealed","partial"],a=["default","false","null","true"],c=["abstract","as","base","break","case","catch","class","const","continue","do","else","event","explicit","extern","finally","fixed","for","foreach","goto","if","implicit","in","interface","internal","is","lock","namespace","new","operator","out","override","params","private","protected","public","readonly","record","ref","return","scoped","sealed","sizeof","stackalloc","static","struct","switch","this","throw","try","typeof","unchecked","unsafe","using","virtual","void","volatile","while"],m=["add","alias","and","ascending","args","async","await","by","descending","dynamic","equals","file","from","get","global","group","init","into","join","let","nameof","not","notnull","on","or","orderby","partial","record","remove","required","scoped","select","set","unmanaged","value|0","var","when","where","with","yield"],x={keyword:c.concat(m),built_in:r,literal:a},L=t.inherit(t.TITLE_MODE,{begin:"[a-zA-Z](\\.?\\w)*"}),S={className:"number",variants:[{begin:"\\b(0b[01']+)"},{begin:"(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"},{begin:"(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"}],relevance:0},y={className:"string",begin:/"""("*)(?!")(.|\n)*?"""\1/,relevance:1},f={className:"string",begin:'@"',end:'"',contains:[{begin:'""'}]},d=t.inherit(f,{illegal:/\n/}),j={className:"subst",begin:/\{/,end:/\}/,keywords:x},T=t.inherit(j,{illegal:/\n/}),_={className:"string",begin:/\$"/,end:'"',illegal:/\n/,contains:[{begin:/\{\{/},{begin:/\}\}/},t.BACKSLASH_ESCAPE,T]},k={className:"string",begin:/\$@"/,end:'"',contains:[{begin:/\{\{/},{begin:/\}\}/},{begin:'""'},j]},U=t.inherit(k,{illegal:/\n/,contains:[{begin:/\{\{/},{begin:/\}\}/},{begin:'""'},T]});j.contains=[k,_,f,t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,S,t.C_BLOCK_COMMENT_MODE],T.contains=[U,_,d,t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,S,t.inherit(t.C_BLOCK_COMMENT_MODE,{illegal:/\n/})];const M={variants:[y,k,_,f,t.APOS_STRING_MODE,t.QUOTE_STRING_MODE]},K={begin:"<",end:">",contains:[{beginKeywords:"in out"},L]},ne=t.IDENT_RE+"(<"+t.IDENT_RE+"(\\s*,\\s*"+t.IDENT_RE+")*>)?(\\[\\])?",R={begin:"@"+t.IDENT_RE,relevance:0};return{name:"C#",aliases:["cs","c#"],keywords:x,illegal:/::/,contains:[t.COMMENT("///","$",{returnBegin:!0,contains:[{className:"doctag",variants:[{begin:"///",relevance:0},{begin:"<!--|-->"},{begin:"</?",end:">"}]}]}),t.C_LINE_COMMENT_MODE,t.C_BLOCK_COMMENT_MODE,{className:"meta",begin:"#",end:"$",keywords:{keyword:"if else elif endif define undef warning error line region endregion pragma checksum"}},M,S,{beginKeywords:"class interface",relevance:0,end:/[{;=]/,illegal:/[^\s:,]/,contains:[{beginKeywords:"where class"},L,K,t.C_LINE_COMMENT_MODE,t.C_BLOCK_COMMENT_MODE]},{beginKeywords:"namespace",relevance:0,end:/[{;=]/,illegal:/[^\s:]/,contains:[L,t.C_LINE_COMMENT_MODE,t.C_BLOCK_COMMENT_MODE]},{beginKeywords:"record",relevance:0,end:/[{;=]/,illegal:/[^\s:]/,contains:[L,K,t.C_LINE_COMMENT_MODE,t.C_BLOCK_COMMENT_MODE]},{className:"meta",begin:"^\\s*\\[(?=[\\w])",excludeBegin:!0,end:"\\]",excludeEnd:!0,contains:[{className:"string",begin:/"/,end:/"/}]},{beginKeywords:"new return throw await else",relevance:0},{className:"function",begin:"("+ne+"\\s+)+"+t.IDENT_RE+"\\s*(<[^=]+>\\s*)?\\(",returnBegin:!0,end:/\s*[{;=]/,excludeEnd:!0,keywords:x,contains:[{beginKeywords:i.join(" "),relevance:0},{begin:t.IDENT_RE+"\\s*(<[^=]+>\\s*)?\\(",returnBegin:!0,contains:[t.TITLE_MODE,K],relevance:0},{match:/\(\)/},{className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:x,relevance:0,contains:[M,S,t.C_BLOCK_COMMENT_MODE]},t.C_LINE_COMMENT_MODE,t.C_BLOCK_COMMENT_MODE]},R]}}const gi=Xe({__name:"LangSelector",props:{modelValue:{}},emits:["update:modelValue"],setup(t,{emit:r}){const i=r,a=[{value:"js",label:"JavaScript"},{value:"cpp",label:"C++"},{value:"java",label:"Java"},{value:"python",label:"Python"},{value:"csharp",label:"C#"}];function c(m){i("update:modelValue",m)}return(m,x)=>{const L=re("el-option"),S=re("el-select");return Q(),Le(S,{"model-value":t.modelValue,size:"small",style:{width:"120px"},onChange:c},{default:W(()=>[(Q(),Se(kr,null,Cr(a,y=>q(L,{key:y.value,label:y.label,value:y.value},null,8,["label","value"])),64))]),_:1},8,["model-value"])}}}),hi={class:"text"},fi=Xe({__name:"AiStatusBar",props:{status:{}},setup(t){const r=t,i=Z(()=>{switch(r.status){case"idle":return"js可修改：变量赋值、条件循环、函数调用（建议小步修改）";case"rendering":return"正在为你切换到该语言代码...";case"cached":return"js可修改：变量赋值、条件循环、函数调用（建议小步修改）";case"display-only":return"js可修改：变量赋值、条件循环、函数调用（建议小步修改）";case"syncing":return"正在应用你的修改并刷新动画...";case"synced":return"修改成功：可继续修改变量赋值、条件循环、函数调用（建议小步修改）";case"invalid-change":return"未检测到有效代码变化，请确认你确实修改了代码内容";case"error":return"这次修改没有成功，已恢复到 JavaScript 代码";default:return"可切换语言查看实现，并联动动画学习"}});return(a,c)=>(Q(),Se("div",{class:Mr(["ai-status-bar",`s-${t.status}`])},[c[0]||(c[0]=ie("span",{class:"dot"},null,-1)),ie("span",hi,Oe(i.value),1)],2))}}),mi=Mt(fi,[["__scopeId","data-v-ec12cce8"]]),Ot="ds-vis:lang",vi=10080*60*1e3;function ot(t,r){return`${Ot}:${t}:${r}`}function bi(t){let r=5381;for(let i=0;i<t.length;i++)r=r*33^t.charCodeAt(i);return(r>>>0).toString(16)}class yi{get(r,i,a){const c=ot(r,i);try{const m=localStorage.getItem(c);if(!m)return null;const x=JSON.parse(m);return!x.createdAt||Date.now()-x.createdAt>vi||x.sourceHash!==a?(localStorage.removeItem(c),null):x}catch{return null}}set(r){const i=ot(r.algorithmName,r.language);try{localStorage.setItem(i,JSON.stringify(r))}catch{}}clear(r,i){const a=ot(r,i);localStorage.removeItem(a)}clearAlgorithm(r){const i=`${Ot}:${r}:`;for(let a=localStorage.length-1;a>=0;a--){const c=localStorage.key(a);c?.startsWith(i)&&localStorage.removeItem(c)}}}function _i(){const t=[Fr,Ur,zr,Hr,Gr,Wr,Vr],r={};return t.forEach(i=>{Object.entries(i).forEach(([a,c])=>{r[a]||(r[a]=c.code)})}),r}const wi=_i(),Ni={kmp:{cpp:`#include <iostream>
#include <string>
#include <vector>
using namespace std;

int kmpSearch(const string& text, const string& pattern) {
  if (pattern.empty()) return 0;
  vector<int> next(pattern.size(), 0);
  for (int i = 1, j = 0; i < (int)pattern.size();) {
    if (pattern[i] == pattern[j]) next[i++] = ++j;
    else if (j > 0) j = next[j - 1];
    else next[i++] = 0;
  }
  for (int i = 0, j = 0; i < (int)text.size();) {
    if (text[i] == pattern[j]) { i++; j++; } // [帧:匹配]
    if (j == (int)pattern.size()) return i - j; // [帧:完成]
    if (i < (int)text.size() && text[i] != pattern[j]) {
      if (j > 0) j = next[j - 1]; // [帧:移位]
      else i++; // [帧:失配]
    }
  }
  return -1; // [帧:完成]
}

int main() {
  string text = "ababcabcacbab";
  string pattern = "abcac";
  cout << kmpSearch(text, pattern) << endl;
  return 0;
}`,java:`public class KmpDemo {
  static int kmpSearch(String text, String pattern) {
  if (pattern.isEmpty()) return 0;
  int[] next = new int[pattern.length()];
  for (int i = 1, j = 0; i < pattern.length();) {
    if (pattern.charAt(i) == pattern.charAt(j)) next[i++] = ++j;
    else if (j > 0) j = next[j - 1];
    else next[i++] = 0;
  }
  for (int i = 0, j = 0; i < text.length();) {
    if (text.charAt(i) == pattern.charAt(j)) { i++; j++; } // [帧:匹配]
    if (j == pattern.length()) return i - j; // [帧:完成]
    if (i < text.length() && text.charAt(i) != pattern.charAt(j)) {
      if (j > 0) j = next[j - 1]; // [帧:移位]
      else i++; // [帧:失配]
    }
  }
  return -1; // [帧:完成]
}

  public static void main(String[] args) {
    String text = "ababcabcacbab";
    String pattern = "abcac";
    System.out.println(kmpSearch(text, pattern));
  }
}`,python:`def kmp_search(text, pattern):
    if not pattern:
        return 0
    next_arr = [0] * len(pattern)
    i, j = 1, 0
    while i < len(pattern):
        if pattern[i] == pattern[j]:
            j += 1
            next_arr[i] = j
            i += 1
        elif j > 0:
            j = next_arr[j - 1]
        else:
            i += 1
    i = j = 0
    while i < len(text):
        if text[i] == pattern[j]:  # [帧:匹配]
            i += 1
            j += 1
        if j == len(pattern):
            return i - j  # [帧:完成]
        if i < len(text) and text[i] != pattern[j]:
            if j > 0:
                j = next_arr[j - 1]  # [帧:移位]
            else:
                i += 1  # [帧:失配]
        return -1  # [帧:完成]


      if __name__ == "__main__":
        text = "ababcabcacbab"
        pattern = "abcac"
        print(kmp_search(text, pattern))`,csharp:`using System;

      public class KmpDemo {
        static int KmpSearch(string text, string pattern) {
  if (string.IsNullOrEmpty(pattern)) return 0;
  int[] next = new int[pattern.Length];
  for (int i = 1, j = 0; i < pattern.Length;) {
    if (pattern[i] == pattern[j]) next[i++] = ++j;
    else if (j > 0) j = next[j - 1];
    else next[i++] = 0;
  }
  for (int i = 0, j = 0; i < text.Length;) {
    if (text[i] == pattern[j]) { i++; j++; } // [帧:匹配]
    if (j == pattern.Length) return i - j; // [帧:完成]
    if (i < text.Length && text[i] != pattern[j]) {
      if (j > 0) j = next[j - 1]; // [帧:移位]
      else i++; // [帧:失配]
    }
  }
  return -1; // [帧:完成]
}

  public static void Main(string[] args) {
    string text = "ababcabcacbab";
    string pattern = "abcac";
    Console.WriteLine(KmpSearch(text, pattern));
  }
}`},bruteForce:{cpp:`#include <iostream>
#include <string>
using namespace std;

int bruteForceSearch(const string& text, const string& pattern) {
  if (pattern.empty()) return 0;
  for (int i = 0; i <= (int)text.size() - (int)pattern.size(); i++) {
    int j = 0;
    while (j < (int)pattern.size() && text[i + j] == pattern[j]) j++; // [帧:比较]
    if (j == (int)pattern.size()) return i; // [帧:完成]
  }
  return -1; // [帧:完成]
}

int main() {
  string text = "ababcabcacbab";
  string pattern = "abcac";
  cout << bruteForceSearch(text, pattern) << endl;
  return 0;
}`,java:`public class BruteForceSearchDemo {
  static int bruteForceSearch(String text, String pattern) {
  if (pattern.isEmpty()) return 0;
  for (int i = 0; i <= text.length() - pattern.length(); i++) {
    int j = 0;
    while (j < pattern.length() && text.charAt(i + j) == pattern.charAt(j)) j++; // [帧:比较]
    if (j == pattern.length()) return i; // [帧:完成]
  }
  return -1; // [帧:完成]
}

  public static void main(String[] args) {
    String text = "ababcabcacbab";
    String pattern = "abcac";
    System.out.println(bruteForceSearch(text, pattern));
  }
}`,python:`def brute_force_search(text, pattern):
    if not pattern:
        return 0
    for i in range(len(text) - len(pattern) + 1):
        j = 0
        while j < len(pattern) and text[i + j] == pattern[j]:  # [帧:比较]
            j += 1
        if j == len(pattern):
            return i  # [帧:完成]
      return -1  # [帧:完成]


    if __name__ == "__main__":
      text = "ababcabcacbab"
      pattern = "abcac"
      print(brute_force_search(text, pattern))`,csharp:`using System;

    public class BruteForceSearchDemo {
      static int BruteForceSearch(string text, string pattern) {
  if (string.IsNullOrEmpty(pattern)) return 0;
  for (int i = 0; i <= text.Length - pattern.Length; i++) {
    int j = 0;
    while (j < pattern.Length && text[i + j] == pattern[j]) j++; // [帧:比较]
    if (j == pattern.Length) return i; // [帧:完成]
  }
  return -1; // [帧:完成]
}

  public static void Main(string[] args) {
    string text = "ababcabcacbab";
    string pattern = "abcac";
    Console.WriteLine(BruteForceSearch(text, pattern));
  }
}`},sequential:{cpp:`#include <iostream>
#include <vector>
using namespace std;

int sequentialSearch(const vector<int>& arr, int target) {
  for (int i = 0; i < (int)arr.size(); i++) {
    if (arr[i] == target) return i; // [帧:比较]
  }
  return -1; // [帧:完成]
}

int main() {
  vector<int> arr = {12, 7, 19, 3, 25, 8};
  int target = 25;
  int index = sequentialSearch(arr, target);
  cout << "数组: [12, 7, 19, 3, 25, 8]" << endl;
  cout << "目标值: " << target << endl;
  cout << (index >= 0 ? "找到下标: " + to_string(index) : "未找到") << endl;
  return 0;
}`,java:`import java.util.Arrays;

public class SequentialSearchDemo {
  static int sequentialSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
      if (arr[i] == target) return i; // [帧:比较]
    }
    return -1; // [帧:完成]
  }

  public static void main(String[] args) {
    int[] arr = {12, 7, 19, 3, 25, 8};
    int target = 25;
    int index = sequentialSearch(arr, target);
    System.out.println("数组: " + Arrays.toString(arr));
    System.out.println("目标值: " + target);
    System.out.println(index >= 0 ? "找到下标: " + index : "未找到");
  }
}`,python:`def sequential_search(arr, target):
    for i, value in enumerate(arr):
        if value == target:
            return i  # [帧:比较]
    return -1  # [帧:完成]


if __name__ == "__main__":
    arr = [12, 7, 19, 3, 25, 8]
    target = 25
    idx = sequential_search(arr, target)
    print("数组:", arr)
    print("目标值:", target)
    print(f"找到下标: {idx}" if idx >= 0 else "未找到")`,csharp:`using System;

public class SequentialSearchDemo {
  static int SequentialSearch(int[] arr, int target) {
    for (int i = 0; i < arr.Length; i++) {
      if (arr[i] == target) return i; // [帧:比较]
    }
    return -1; // [帧:完成]
  }

  public static void Main(string[] args) {
    int[] arr = {12, 7, 19, 3, 25, 8};
    int target = 25;
    int index = SequentialSearch(arr, target);
    Console.WriteLine("数组: [" + string.Join(", ", arr) + "]");
    Console.WriteLine("目标值: " + target);
    Console.WriteLine(index >= 0 ? "找到下标: " + index : "未找到");
  }
}`},binary:{cpp:`#include <algorithm>
#include <iostream>
#include <stdexcept>
#include <vector>

using namespace std;

bool isNonDecreasing(const vector<int>& arr) {
  return adjacent_find(arr.begin(), arr.end(), greater<int>()) == arr.end();
}

int binarySearchIterative(const vector<int>& arr, int target) {
  int left = 0;
  int right = static_cast<int>(arr.size()) - 1;

  while (left <= right) {
    int mid = left + (right - left) / 2; // [帧:中点]

    if (arr[mid] == target) {
      return mid; // [帧:比较]
    }

    if (arr[mid] < target) {
      left = mid + 1; // [帧:右移]
    } else {
      right = mid - 1; // [帧:左移]
    }
  }

  return -1; // [帧:完成]
}

int binarySearchRecursive(const vector<int>& arr, int target, int left, int right) {
  if (left > right) return -1;

  int mid = left + (right - left) / 2;
  if (arr[mid] == target) return mid;
  if (arr[mid] < target) return binarySearchRecursive(arr, target, mid + 1, right);
  return binarySearchRecursive(arr, target, left, mid - 1);
}

void printArray(const vector<int>& arr) {
  cout << "[";
  for (size_t i = 0; i < arr.size(); ++i) {
    cout << arr[i] << (i + 1 == arr.size() ? "" : ", ");
  }
  cout << "]" << endl;
}

int main() {
  try {
    vector<int> arr = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int target = 23;

    if (!isNonDecreasing(arr)) {
      throw invalid_argument("二分查找要求数组为非递减有序。");
    }

    cout << "数组: ";
    printArray(arr);
    cout << "目标值: " << target << endl;

    int iterativeIndex = binarySearchIterative(arr, target);
    int recursiveIndex = binarySearchRecursive(arr, target, 0, static_cast<int>(arr.size()) - 1);
    // 期望一致结果：target=23 时下标为 5

    if (iterativeIndex != -1) {
      cout << "迭代版本结果: 在下标 " << iterativeIndex << " 找到" << endl;
    } else {
      cout << "迭代版本结果: 未找到" << endl;
    }

    if (recursiveIndex != -1) {
      cout << "递归版本结果: 在下标 " << recursiveIndex << " 找到" << endl;
    } else {
      cout << "递归版本结果: 未找到" << endl;
    }

    return 0;
  } catch (const exception& ex) {
    cerr << "错误: " << ex.what() << endl;
    return 1;
  }
}`,java:`import java.util.Arrays;

public class BinarySearchDemo {
  static boolean isNonDecreasing(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) return false;
    }
    return true;
  }

  static int binarySearchIterative(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
      int mid = left + (right - left) / 2; // [帧:中点]
      if (arr[mid] == target) return mid; // [帧:比较]
      if (arr[mid] < target) left = mid + 1; // [帧:右移]
      else right = mid - 1; // [帧:左移]
    }
    return -1; // [帧:完成]
  }

  static int binarySearchRecursive(int[] arr, int target, int left, int right) {
    if (left > right) return -1;
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) return binarySearchRecursive(arr, target, mid + 1, right);
    return binarySearchRecursive(arr, target, left, mid - 1);
  }

  public static void main(String[] args) {
    try {
      int[] arr = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
      int target = 23;

      if (!isNonDecreasing(arr)) {
        throw new IllegalArgumentException("二分查找要求数组为非递减有序。");
      }

      System.out.println("数组: " + Arrays.toString(arr));
      System.out.println("目标值: " + target);

      int iterativeIndex = binarySearchIterative(arr, target);
      int recursiveIndex = binarySearchRecursive(arr, target, 0, arr.length - 1);
      // 期望一致结果：target=23 时下标为 5

      System.out.println(iterativeIndex != -1
          ? "迭代版本结果: 在下标 " + iterativeIndex + " 找到"
          : "迭代版本结果: 未找到");

      System.out.println(recursiveIndex != -1
          ? "递归版本结果: 在下标 " + recursiveIndex + " 找到"
          : "递归版本结果: 未找到");
    } catch (Exception ex) {
      System.out.println("错误: " + ex.getMessage());
    }
  }
}`,python:`def is_non_decreasing(arr):
    return all(arr[i] >= arr[i - 1] for i in range(1, len(arr)))


def binary_search_iterative(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = left + (right - left) // 2  # [帧:中点]
        if arr[mid] == target:
            return mid  # [帧:比较]
        if arr[mid] < target:
            left = mid + 1  # [帧:右移]
        else:
            right = mid - 1  # [帧:左移]
    return -1  # [帧:完成]


def binary_search_recursive(arr, target, left, right):
    if left > right:
        return -1
    mid = left + (right - left) // 2
    if arr[mid] == target:
        return mid
    if arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    return binary_search_recursive(arr, target, left, mid - 1)


if __name__ == "__main__":
    try:
        arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
        target = 23

        if not is_non_decreasing(arr):
            raise ValueError("二分查找要求数组为非递减有序。")

        print("数组:", arr)
        print("目标值:", target)

        iterative_index = binary_search_iterative(arr, target)
        recursive_index = binary_search_recursive(arr, target, 0, len(arr) - 1)
        # 期望一致结果：target=23 时下标为 5

        print(f"迭代版本结果: 在下标 {iterative_index} 找到" if iterative_index != -1 else "迭代版本结果: 未找到")
        print(f"递归版本结果: 在下标 {recursive_index} 找到" if recursive_index != -1 else "递归版本结果: 未找到")
    except Exception as ex:
        print("错误:", ex)`,csharp:`using System;
using System.Linq;

public class BinarySearchDemo {
  static bool IsNonDecreasing(int[] arr) {
    for (int i = 1; i < arr.Length; i++) {
      if (arr[i] < arr[i - 1]) return false;
    }
    return true;
  }

  static int BinarySearchIterative(int[] arr, int target) {
    int left = 0, right = arr.Length - 1;
    while (left <= right) {
      int mid = left + (right - left) / 2; // [帧:中点]
      if (arr[mid] == target) return mid; // [帧:比较]
      if (arr[mid] < target) left = mid + 1; // [帧:右移]
      else right = mid - 1; // [帧:左移]
    }
    return -1; // [帧:完成]
  }

  static int BinarySearchRecursive(int[] arr, int target, int left, int right) {
    if (left > right) return -1;
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) return BinarySearchRecursive(arr, target, mid + 1, right);
    return BinarySearchRecursive(arr, target, left, mid - 1);
  }

  public static void Main() {
    try {
      int[] arr = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
      int target = 23;

      if (!IsNonDecreasing(arr)) {
        throw new ArgumentException("二分查找要求数组为非递减有序。");
      }

      Console.WriteLine("数组: [" + string.Join(", ", arr) + "]");
      Console.WriteLine("目标值: " + target);

      int iterativeIndex = BinarySearchIterative(arr, target);
      int recursiveIndex = BinarySearchRecursive(arr, target, 0, arr.Length - 1);
      // 期望一致结果：target=23 时下标为 5

      Console.WriteLine(iterativeIndex != -1
        ? $"迭代版本结果: 在下标 {iterativeIndex} 找到"
        : "迭代版本结果: 未找到");

      Console.WriteLine(recursiveIndex != -1
        ? $"递归版本结果: 在下标 {recursiveIndex} 找到"
        : "递归版本结果: 未找到");
    } catch (Exception ex) {
      Console.WriteLine("错误: " + ex.Message);
    }
  }
}`},interpolation:{cpp:`#include <iostream>
#include <vector>
using namespace std;

int interpolationSearch(const vector<int>& arr, int target) {
  int low = 0, high = (int)arr.size() - 1;
  while (low <= high && target >= arr[low] && target <= arr[high]) {
    if (low == high) return arr[low] == target ? low : -1;
    if (arr[high] == arr[low]) break;
    int pos = low + (int)((long long)(target - arr[low]) * (high - low) / (arr[high] - arr[low])); // [帧:探测]
    if (arr[pos] == target) return pos; // [帧:比较]
    if (arr[pos] < target) low = pos + 1; // [帧:右移]
    else high = pos - 1; // [帧:左移]
  }
  return -1; // [帧:完成]
}

int main() {
  vector<int> arr = {3, 7, 12, 18, 24, 31, 40, 52, 68};
  int target = 31;
  int index = interpolationSearch(arr, target);
  cout << "目标值: " << target << "，结果: " << index << endl;
  return 0;
}`,java:`public class InterpolationSearchDemo {
  static int interpolationSearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;
    while (low <= high && target >= arr[low] && target <= arr[high]) {
      if (low == high) return arr[low] == target ? low : -1;
      if (arr[high] == arr[low]) break;
      int pos = low + (int)((long)(target - arr[low]) * (high - low) / (arr[high] - arr[low])); // [帧:探测]
      if (arr[pos] == target) return pos; // [帧:比较]
      if (arr[pos] < target) low = pos + 1; // [帧:右移]
      else high = pos - 1; // [帧:左移]
    }
    return -1; // [帧:完成]
  }

  public static void main(String[] args) {
    int[] arr = {3, 7, 12, 18, 24, 31, 40, 52, 68};
    int target = 31;
    System.out.println("结果: " + interpolationSearch(arr, target));
  }
}`,python:`def interpolation_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high and arr[low] <= target <= arr[high]:
        if low == high:
            return low if arr[low] == target else -1
        if arr[high] == arr[low]:
            break
        pos = low + (target - arr[low]) * (high - low) // (arr[high] - arr[low])  # [帧:探测]
        if arr[pos] == target:
            return pos  # [帧:比较]
        if arr[pos] < target:
            low = pos + 1  # [帧:右移]
        else:
            high = pos - 1  # [帧:左移]
    return -1  # [帧:完成]


if __name__ == "__main__":
    arr = [3, 7, 12, 18, 24, 31, 40, 52, 68]
    print("结果:", interpolation_search(arr, 31))`,csharp:`using System;

public class InterpolationSearchDemo {
  static int InterpolationSearch(int[] arr, int target) {
    int low = 0, high = arr.Length - 1;
    while (low <= high && target >= arr[low] && target <= arr[high]) {
      if (low == high) return arr[low] == target ? low : -1;
      if (arr[high] == arr[low]) break;
      int pos = low + (int)((long)(target - arr[low]) * (high - low) / (arr[high] - arr[low])); // [帧:探测]
      if (arr[pos] == target) return pos; // [帧:比较]
      if (arr[pos] < target) low = pos + 1; // [帧:右移]
      else high = pos - 1; // [帧:左移]
    }
    return -1; // [帧:完成]
  }

  public static void Main(string[] args) {
    int[] arr = {3, 7, 12, 18, 24, 31, 40, 52, 68};
    Console.WriteLine("结果: " + InterpolationSearch(arr, 31));
  }
}`},jump:{cpp:`#include <cmath>
#include <iostream>
#include <vector>
using namespace std;

int jumpSearch(const vector<int>& arr, int target) {
  int n = (int)arr.size();
  int step = (int)sqrt(n);
  int prev = 0;
  while (prev < n && arr[min(step, n) - 1] < target) {
    prev = step;
    step += (int)sqrt(n); // [帧:跳跃]
    if (prev >= n) return -1;
  }
  while (prev < min(step, n)) {
    if (arr[prev] == target) return prev; // [帧:比较]
    prev++; // [帧:扫描]
  }
  return -1; // [帧:完成]
}

int main() {
  vector<int> arr = {2, 5, 9, 12, 16, 23, 31, 44, 57};
  cout << "结果: " << jumpSearch(arr, 31) << endl;
  return 0;
}`,java:`public class JumpSearchDemo {
  static int jumpSearch(int[] arr, int target) {
    int n = arr.length;
    int step = (int)Math.sqrt(n);
    int prev = 0;
    while (prev < n && arr[Math.min(step, n) - 1] < target) {
      prev = step;
      step += (int)Math.sqrt(n); // [帧:跳跃]
      if (prev >= n) return -1;
    }
    while (prev < Math.min(step, n)) {
      if (arr[prev] == target) return prev; // [帧:比较]
      prev++; // [帧:扫描]
    }
    return -1; // [帧:完成]
  }

  public static void main(String[] args) {
    int[] arr = {2, 5, 9, 12, 16, 23, 31, 44, 57};
    System.out.println("结果: " + jumpSearch(arr, 31));
  }
}`,python:`import math

def jump_search(arr, target):
    n = len(arr)
    step = int(math.sqrt(n))
    prev = 0
    while prev < n and arr[min(step, n) - 1] < target:
        prev = step
        step += int(math.sqrt(n))  # [帧:跳跃]
        if prev >= n:
            return -1
    while prev < min(step, n):
        if arr[prev] == target:
            return prev  # [帧:比较]
        prev += 1  # [帧:扫描]
    return -1  # [帧:完成]


if __name__ == "__main__":
    arr = [2, 5, 9, 12, 16, 23, 31, 44, 57]
    print("结果:", jump_search(arr, 31))`,csharp:`using System;

public class JumpSearchDemo {
  static int JumpSearch(int[] arr, int target) {
    int n = arr.Length;
    int step = (int)Math.Sqrt(n);
    int prev = 0;
    while (prev < n && arr[Math.Min(step, n) - 1] < target) {
      prev = step;
      step += (int)Math.Sqrt(n); // [帧:跳跃]
      if (prev >= n) return -1;
    }
    while (prev < Math.Min(step, n)) {
      if (arr[prev] == target) return prev; // [帧:比较]
      prev++; // [帧:扫描]
    }
    return -1; // [帧:完成]
  }

  public static void Main(string[] args) {
    int[] arr = {2, 5, 9, 12, 16, 23, 31, 44, 57};
    Console.WriteLine("结果: " + JumpSearch(arr, 31));
  }
}`},bst:{cpp:`#include <iostream>
using namespace std;

struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
  TreeNode(int v): val(v), left(nullptr), right(nullptr) {}
};

TreeNode* bstSearch(TreeNode* root, int target) {
  TreeNode* cur = root;
  while (cur != nullptr) {
    if (cur->val == target) return cur; // [帧:比较]
    if (target < cur->val) cur = cur->left; // [帧:左移]
    else cur = cur->right; // [帧:右移]
  }
  return nullptr; // [帧:完成]
}

int main() {
  TreeNode* root = new TreeNode(10);
  root->left = new TreeNode(5);
  root->right = new TreeNode(18);
  root->right->left = new TreeNode(13);
  cout << (bstSearch(root, 13) ? "找到" : "未找到") << endl;
  return 0;
}`,java:`public class BstSearchDemo {
  static class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int v) { val = v; }
  }

  static TreeNode bstSearch(TreeNode root, int target) {
    TreeNode cur = root;
    while (cur != null) {
      if (cur.val == target) return cur; // [帧:比较]
      if (target < cur.val) cur = cur.left; // [帧:左移]
      else cur = cur.right; // [帧:右移]
    }
    return null; // [帧:完成]
  }

  public static void main(String[] args) {
    TreeNode root = new TreeNode(10);
    root.left = new TreeNode(5);
    root.right = new TreeNode(18);
    root.right.left = new TreeNode(13);
    System.out.println(bstSearch(root, 13) != null ? "找到" : "未找到");
  }
}`,python:`class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None


def bst_search(root, target):
    cur = root
    while cur is not None:
        if cur.val == target:
            return cur  # [帧:比较]
        if target < cur.val:
            cur = cur.left  # [帧:左移]
        else:
            cur = cur.right  # [帧:右移]
    return None  # [帧:完成]


if __name__ == "__main__":
    root = TreeNode(10)
    root.left = TreeNode(5)
    root.right = TreeNode(18)
    root.right.left = TreeNode(13)
    print("找到" if bst_search(root, 13) else "未找到")`,csharp:`using System;

public class BstSearchDemo {
  class TreeNode {
    public int Val;
    public TreeNode? Left;
    public TreeNode? Right;
    public TreeNode(int v) { Val = v; }
  }

  static TreeNode? BstSearch(TreeNode? root, int target) {
    var cur = root;
    while (cur != null) {
      if (cur.Val == target) return cur; // [帧:比较]
      if (target < cur.Val) cur = cur.Left; // [帧:左移]
      else cur = cur.Right; // [帧:右移]
    }
    return null; // [帧:完成]
  }

  public static void Main(string[] args) {
    var root = new TreeNode(10);
    root.Left = new TreeNode(5);
    root.Right = new TreeNode(18);
    root.Right.Left = new TreeNode(13);
    Console.WriteLine(BstSearch(root, 13) != null ? "找到" : "未找到");
  }
}`},hash:{cpp:`#include <iostream>
#include <unordered_map>
using namespace std;

int hashSearch(const unordered_map<int, int>& table, int key) {
  auto it = table.find(key); // [帧:探测]
  if (it == table.end()) return -1; // [帧:完成]
  return it->second; // [帧:比较]
}

int main() {
  unordered_map<int, int> table = {{17, 0}, {23, 1}, {31, 2}};
  cout << "查找 23 -> " << hashSearch(table, 23) << endl;
  return 0;
}`,java:`import java.util.HashMap;
import java.util.Map;

public class HashSearchDemo {
  static int hashSearch(Map<Integer, Integer> table, int key) {
    Integer value = table.get(key); // [帧:探测]
    if (value == null) return -1; // [帧:完成]
    return value; // [帧:比较]
  }

  public static void main(String[] args) {
    Map<Integer, Integer> table = new HashMap<>();
    table.put(17, 0);
    table.put(23, 1);
    table.put(31, 2);
    System.out.println("查找 23 -> " + hashSearch(table, 23));
  }
}`,python:`def hash_search(table, key):
    value = table.get(key)  # [帧:探测]
    if value is None:
        return -1  # [帧:完成]
    return value  # [帧:比较]


if __name__ == "__main__":
    table = {17: 0, 23: 1, 31: 2}
    print("查找 23 ->", hash_search(table, 23))`,csharp:`using System;
using System.Collections.Generic;

public class HashSearchDemo {
  static int HashSearch(Dictionary<int, int> table, int key) {
    if (!table.TryGetValue(key, out var value)) return -1; // [帧:探测]
    return value; // [帧:比较]
  }

  public static void Main(string[] args) {
    var table = new Dictionary<int, int> { {17, 0}, {23, 1}, {31, 2} };
    Console.WriteLine("查找 23 -> " + HashSearch(table, 23));
  }
}`},bubble:{cpp:`#include <iostream>
#include <vector>
using namespace std;

void bubbleSort(vector<int>& arr) {
  int n = (int)arr.size();
  for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr[j], arr[j + 1]); // [帧:交换]
      }
    }
  }
}

int main() {
  vector<int> arr = {9, 4, 7, 1, 5};
  bubbleSort(arr);
  for (int v : arr) cout << v << ' ';
  return 0;
}`,java:`import java.util.Arrays;

public class BubbleSortDemo {
  static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
      for (int j = 0; j < n - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          int temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp; // [帧:交换]
        }
      }
    }
  }

  public static void main(String[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    bubbleSort(arr);
    System.out.println(Arrays.toString(arr));
  }
}`,python:`def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]  # [帧:交换]


if __name__ == "__main__":
    arr = [9, 4, 7, 1, 5]
    bubble_sort(arr)
    print(arr)`,csharp:`using System;

public class BubbleSortDemo {
  static void BubbleSort(int[] arr) {
    int n = arr.Length;
    for (int i = 0; i < n - 1; i++) {
      for (int j = 0; j < n - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]); // [帧:交换]
        }
      }
    }
  }

  public static void Main(string[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    BubbleSort(arr);
    Console.WriteLine("[" + string.Join(", ", arr) + "]");
  }
}`},selection:{cpp:`#include <iostream>
#include <vector>
using namespace std;

void selectionSort(vector<int>& arr) {
  int n = (int)arr.size();
  for (int i = 0; i < n - 1; i++) {
    int minIdx = i;
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j; // [帧:比较]
    }
    if (minIdx != i) swap(arr[i], arr[minIdx]); // [帧:交换]
  }
}

int main() {
  vector<int> arr = {9, 4, 7, 1, 5};
  selectionSort(arr);
  for (int v : arr) cout << v << ' ';
  return 0;
}`,java:`import java.util.Arrays;

public class SelectionSortDemo {
  static void selectionSort(int[] arr) {
  int n = arr.length;
  for (int i = 0; i < n - 1; i++) {
    int minIdx = i;
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j; // [帧:比较]
    }
    if (minIdx != i) {
      int temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp; // [帧:交换]
    }
  }
}

  public static void main(String[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    selectionSort(arr);
    System.out.println(Arrays.toString(arr));
  }
}`,python:`def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j  # [帧:比较]
        if min_idx != i:
          arr[i], arr[min_idx] = arr[min_idx], arr[i]  # [帧:交换]


    if __name__ == "__main__":
      arr = [9, 4, 7, 1, 5]
      selection_sort(arr)
      print(arr)`,csharp:`using System;

public class SelectionSortDemo {
  static void SelectionSort(int[] arr) {
  int n = arr.Length;
  for (int i = 0; i < n - 1; i++) {
    int minIdx = i;
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j; // [帧:比较]
    }
    if (minIdx != i) {
      (arr[i], arr[minIdx]) = (arr[minIdx], arr[i]); // [帧:交换]
    }
  }

  public static void Main(string[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    SelectionSort(arr);
    Console.WriteLine("[" + string.Join(", ", arr) + "]");
  }
}`},insertion:{cpp:`#include <iostream>
#include <vector>
using namespace std;

void insertionSort(vector<int>& arr) {
  for (int i = 1; i < (int)arr.size(); i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]; // [帧:移位]
      j--;
    }
    arr[j + 1] = key; // [帧:插入]
  }
}

int main() {
  vector<int> arr = {9, 4, 7, 1, 5};
  insertionSort(arr);
  for (int v : arr) cout << v << ' ';
  return 0;
}`,java:`import java.util.Arrays;

public class InsertionSortDemo {
  static void insertionSort(int[] arr) {
  for (int i = 1; i < arr.length; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]; // [帧:移位]
      j--;
    }
    arr[j + 1] = key; // [帧:插入]
  }
}

  public static void main(String[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    insertionSort(arr);
    System.out.println(Arrays.toString(arr));
  }
}`,python:`def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]  # [帧:移位]
            j -= 1
        arr[j + 1] = key  # [帧:插入]


    if __name__ == "__main__":
      arr = [9, 4, 7, 1, 5]
      insertion_sort(arr)
      print(arr)`,csharp:`using System;

public class InsertionSortDemo {
  static void InsertionSort(int[] arr) {
  for (int i = 1; i < arr.Length; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]; // [帧:移位]
      j--;
    }
    arr[j + 1] = key; // [帧:插入]
  }

  public static void Main(string[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    InsertionSort(arr);
    Console.WriteLine("[" + string.Join(", ", arr) + "]");
  }
}`},quick:{cpp:`#include <iostream>
#include <vector>
using namespace std;

void quickSort(vector<int>& arr, int left, int right) {
  if (left >= right) return;
  int pivot = arr[right];
  int i = left - 1;
  for (int j = left; j < right; j++) {
    if (arr[j] <= pivot) {
      i++;
      swap(arr[i], arr[j]); // [帧:交换]
    }
  }
  swap(arr[i + 1], arr[right]); // [帧:分区]
  int p = i + 1;
  quickSort(arr, left, p - 1);
  quickSort(arr, p + 1, right);
}

int main() {
  vector<int> arr = {9, 4, 7, 1, 5};
  quickSort(arr, 0, (int)arr.size() - 1);
  for (int v : arr) cout << v << ' ';
  return 0;
}`,java:`import java.util.Arrays;

public class QuickSortDemo {
  static void quickSort(int[] arr, int left, int right) {
  if (left >= right) return;
  int pivot = arr[right];
  int i = left - 1;
  for (int j = left; j < right; j++) {
    if (arr[j] <= pivot) {
      i++;
      int temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp; // [帧:交换]
    }
  }
  int temp = arr[i + 1];
  arr[i + 1] = arr[right];
  arr[right] = temp; // [帧:分区]
  int p = i + 1;
  quickSort(arr, left, p - 1);
  quickSort(arr, p + 1, right);
}

  public static void main(String[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    quickSort(arr, 0, arr.length - 1);
    System.out.println(Arrays.toString(arr));
  }
}`,python:`def quick_sort(arr, left, right):
    if left >= right:
        return
    pivot = arr[right]
    i = left - 1
    for j in range(left, right):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]  # [帧:交换]
    arr[i + 1], arr[right] = arr[right], arr[i + 1]  # [帧:分区]
    p = i + 1
    quick_sort(arr, left, p - 1)
    quick_sort(arr, p + 1, right)


  if __name__ == "__main__":
    arr = [9, 4, 7, 1, 5]
    quick_sort(arr, 0, len(arr) - 1)
    print(arr)`,csharp:`using System;

public class QuickSortDemo {
  static void QuickSort(int[] arr, int left, int right) {
  if (left >= right) return;
  int pivot = arr[right];
  int i = left - 1;
  for (int j = left; j < right; j++) {
    if (arr[j] <= pivot) {
      i++;
      (arr[i], arr[j]) = (arr[j], arr[i]); // [帧:交换]
    }
  }
  (arr[i + 1], arr[right]) = (arr[right], arr[i + 1]); // [帧:分区]
  int p = i + 1;
  QuickSort(arr, left, p - 1);
  QuickSort(arr, p + 1, right);
}

  public static void Main(string[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    QuickSort(arr, 0, arr.Length - 1);
    Console.WriteLine("[" + string.Join(", ", arr) + "]");
  }
}`},heap:{cpp:`#include <iostream>
#include <vector>
using namespace std;

void heapify(vector<int>& arr, int n, int i) {
  int largest = i;
  int l = 2 * i + 1;
  int r = 2 * i + 2;
  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;
  if (largest != i) {
    swap(arr[i], arr[largest]); // [帧:交换]
    heapify(arr, n, largest);
  }
}

void heapSort(vector<int>& arr) {
  int n = (int)arr.size();
  for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i); // [帧:建堆]
  for (int i = n - 1; i > 0; i--) {
    swap(arr[0], arr[i]); // [帧:提取]
    heapify(arr, i, 0);
  }
}

int main() {
  vector<int> arr = {9, 4, 7, 1, 5};
  heapSort(arr);
  for (int v : arr) cout << v << ' ';
  return 0;
}`,java:`import java.util.Arrays;

public class HeapSortDemo {
  static void heapify(int[] arr, int n, int i) {
  int largest = i;
  int l = 2 * i + 1;
  int r = 2 * i + 2;
  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;
  if (largest != i) {
    int temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp; // [帧:交换]
    heapify(arr, n, largest);
  }
}

static void heapSort(int[] arr) {
  int n = arr.length;
  for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i); // [帧:建堆]
  for (int i = n - 1; i > 0; i--) {
    int temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp; // [帧:提取]
    heapify(arr, i, 0);
  }
}

  public static void main(String[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    heapSort(arr);
    System.out.println(Arrays.toString(arr));
  }
}`,python:`def heapify(arr, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2
    if l < n and arr[l] > arr[largest]:
        largest = l
    if r < n and arr[r] > arr[largest]:
        largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]  # [帧:交换]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)  # [帧:建堆]
    for i in range(n - 1, 0, -1):
      arr[0], arr[i] = arr[i], arr[0]  # [帧:提取]
      heapify(arr, i, 0)


  if __name__ == "__main__":
    arr = [9, 4, 7, 1, 5]
    heap_sort(arr)
    print(arr)`,csharp:`using System;

public class HeapSortDemo {
  static void Heapify(int[] arr, int n, int i) {
  int largest = i;
  int l = 2 * i + 1;
  int r = 2 * i + 2;
  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;
  if (largest != i) {
    (arr[i], arr[largest]) = (arr[largest], arr[i]); // [帧:交换]
    Heapify(arr, n, largest);
  }
}

static void HeapSort(int[] arr) {
  int n = arr.Length;
  for (int i = n / 2 - 1; i >= 0; i--) Heapify(arr, n, i); // [帧:建堆]
  for (int i = n - 1; i > 0; i--) {
    (arr[0], arr[i]) = (arr[i], arr[0]); // [帧:提取]
    Heapify(arr, i, 0);
  }
}

  public static void Main(string[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    HeapSort(arr);
    Console.WriteLine("[" + string.Join(", ", arr) + "]");
  }
}`},shell:{cpp:`#include <iostream>
#include <vector>
using namespace std;

void shellSort(vector<int>& arr) {
  int n = (int)arr.size();
  for (int gap = n / 2; gap > 0; gap /= 2) {
    for (int i = gap; i < n; i++) {
      int temp = arr[i];
      int j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap]; // [帧:移位]
        j -= gap;
      }
      arr[j] = temp; // [帧:插入]
    }
  }
}

int main() {
  vector<int> arr = {9, 4, 7, 1, 5};
  shellSort(arr);
  for (int v : arr) cout << v << ' ';
  return 0;
}`,java:`import java.util.Arrays;

public class ShellSortDemo {
  static void shellSort(int[] arr) {
  int n = arr.length;
  for (int gap = n / 2; gap > 0; gap /= 2) {
    for (int i = gap; i < n; i++) {
      int temp = arr[i];
      int j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap]; // [帧:移位]
        j -= gap;
      }
      arr[j] = temp; // [帧:插入]
    }
  }
}

  public static void main(String[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    shellSort(arr);
    System.out.println(Arrays.toString(arr));
  }
}`,python:`def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]  # [帧:移位]
                j -= gap
            arr[j] = temp  # [帧:插入]
          gap //= 2


      if __name__ == "__main__":
        arr = [9, 4, 7, 1, 5]
        shell_sort(arr)
        print(arr)`,csharp:`using System;

public class ShellSortDemo {
  static void ShellSort(int[] arr) {
  int n = arr.Length;
  for (int gap = n / 2; gap > 0; gap /= 2) {
    for (int i = gap; i < n; i++) {
      int temp = arr[i];
      int j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap]; // [帧:移位]
        j -= gap;
      }
      arr[j] = temp; // [帧:插入]
    }
  }

  public static void Main(string[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    ShellSort(arr);
    Console.WriteLine("[" + string.Join(", ", arr) + "]");
  }
}`},merge:{cpp:`#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int>& arr, int left, int mid, int right) {
  vector<int> temp;
  int i = left, j = mid + 1;
  while (i <= mid && j <= right) {
    if (arr[i] <= arr[j]) temp.push_back(arr[i++]);
    else temp.push_back(arr[j++]);
  }
  while (i <= mid) temp.push_back(arr[i++]);
  while (j <= right) temp.push_back(arr[j++]);
  for (int k = 0; k < (int)temp.size(); k++) {
    arr[left + k] = temp[k]; // [帧:合并]
  }
}

void mergeSort(vector<int>& arr, int left, int right) {
  if (left >= right) return;
  int mid = left + (right - left) / 2;
  mergeSort(arr, left, mid);
  mergeSort(arr, mid + 1, right);
  merge(arr, left, mid, right);
}

int main() {
  vector<int> arr = {9, 4, 7, 1, 5};
  mergeSort(arr, 0, (int)arr.size() - 1);
  for (int v : arr) cout << v << ' ';
  return 0;
}`,java:`import java.util.Arrays;

public class MergeSortDemo {
  static void merge(int[] arr, int left, int mid, int right) {
  int[] temp = new int[right - left + 1];
  int i = left, j = mid + 1, k = 0;
  while (i <= mid && j <= right) {
    if (arr[i] <= arr[j]) temp[k++] = arr[i++];
    else temp[k++] = arr[j++];
  }
  while (i <= mid) temp[k++] = arr[i++];
  while (j <= right) temp[k++] = arr[j++];
  for (int t = 0; t < temp.length; t++) {
    arr[left + t] = temp[t]; // [帧:合并]
  }
}

static void mergeSort(int[] arr, int left, int right) {
  if (left >= right) return;
  int mid = left + (right - left) / 2;
  mergeSort(arr, left, mid);
  mergeSort(arr, mid + 1, right);
  merge(arr, left, mid, right);
}

  public static void main(String[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    mergeSort(arr, 0, arr.length - 1);
    System.out.println(Arrays.toString(arr));
  }
}`,python:`def merge(arr, left, mid, right):
    temp = []
    i, j = left, mid + 1
    while i <= mid and j <= right:
        if arr[i] <= arr[j]:
            temp.append(arr[i])
            i += 1
        else:
            temp.append(arr[j])
            j += 1
    while i <= mid:
        temp.append(arr[i])
        i += 1
    while j <= right:
        temp.append(arr[j])
        j += 1
    for k, value in enumerate(temp):
        arr[left + k] = value  # [帧:合并]

def merge_sort(arr, left, right):
    if left >= right:
        return
    mid = left + (right - left) // 2
    merge_sort(arr, left, mid)
    merge_sort(arr, mid + 1, right)
    merge(arr, left, mid, right)


  if __name__ == "__main__":
    arr = [9, 4, 7, 1, 5]
    merge_sort(arr, 0, len(arr) - 1)
    print(arr)`,csharp:`using System;
using System.Collections.Generic;

public class MergeSortDemo {
  static void Merge(int[] arr, int left, int mid, int right) {
  var temp = new List<int>();
  int i = left, j = mid + 1;
  while (i <= mid && j <= right) {
    if (arr[i] <= arr[j]) temp.Add(arr[i++]);
    else temp.Add(arr[j++]);
  }
  while (i <= mid) temp.Add(arr[i++]);
  while (j <= right) temp.Add(arr[j++]);
  for (int k = 0; k < temp.Count; k++) {
    arr[left + k] = temp[k]; // [帧:合并]
  }
}

static void MergeSort(int[] arr, int left, int right) {
  if (left >= right) return;
  int mid = left + (right - left) / 2;
  MergeSort(arr, left, mid);
  MergeSort(arr, mid + 1, right);
  Merge(arr, left, mid, right);
}

  public static void Main(string[] args) {
    int[] arr = {9, 4, 7, 1, 5};
    MergeSort(arr, 0, arr.Length - 1);
    Console.WriteLine("[" + string.Join(", ", arr) + "]");
  }
}`},insert:{cpp:`#include <iostream>
#include <vector>
using namespace std;

void insertAt(vector<int>& arr, int index, int value) {
  if (index < 0 || index > (int)arr.size()) return;
  arr.push_back(0);
  for (int i = (int)arr.size() - 1; i > index; i--) {
    arr[i] = arr[i - 1]; // [帧:移位]
  }
  arr[index] = value; // [帧:插入]
}

int main() {
  vector<int> arr = {1, 3, 5, 7};
  insertAt(arr, 2, 99);
  for (int v : arr) cout << v << ' ';
  return 0;
}`,java:`import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class LinearInsertDemo {
  static void insertAt(List<Integer> arr, int index, int value) {
  if (index < 0 || index > arr.size()) return;
  arr.add(0);
  for (int i = arr.size() - 1; i > index; i--) {
    arr.set(i, arr.get(i - 1)); // [帧:移位]
  }
  arr.set(index, value); // [帧:插入]
}

  public static void main(String[] args) {
    List<Integer> arr = new ArrayList<>(Arrays.asList(1, 3, 5, 7));
    insertAt(arr, 2, 99);
    System.out.println(arr);
  }
}`,python:`def insert_at(arr, index, value):
    if index < 0 or index > len(arr):
        return
    arr.append(0)
    for i in range(len(arr) - 1, index, -1):
        arr[i] = arr[i - 1]  # [帧:移位]
    arr[index] = value  # [帧:插入]


if __name__ == "__main__":
    arr = [1, 3, 5, 7]
    insert_at(arr, 2, 99)
    print(arr)`,csharp:`using System;
using System.Collections.Generic;

public class LinearInsertDemo {
  static void InsertAt(List<int> arr, int index, int value) {
  if (index < 0 || index > arr.Count) return;
  arr.Add(0);
  for (int i = arr.Count - 1; i > index; i--) {
    arr[i] = arr[i - 1]; // [帧:移位]
  }
  arr[index] = value; // [帧:插入]
}

  public static void Main(string[] args) {
    var arr = new List<int> {1, 3, 5, 7};
    InsertAt(arr, 2, 99);
    Console.WriteLine("[" + string.Join(", ", arr) + "]");
  }
}`},delete:{cpp:`#include <iostream>
#include <vector>
using namespace std;

void deleteAt(vector<int>& arr, int index) {
  if (index < 0 || index >= (int)arr.size()) return;
  for (int i = index; i < (int)arr.size() - 1; i++) {
    arr[i] = arr[i + 1]; // [帧:移位]
  }
  arr.pop_back(); // [帧:删除]
}

int main() {
  vector<int> arr = {1, 3, 5, 7};
  deleteAt(arr, 2);
  for (int v : arr) cout << v << ' ';
  return 0;
}`,java:`import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class LinearDeleteDemo {
  static void deleteAt(List<Integer> arr, int index) {
  if (index < 0 || index >= arr.size()) return;
  for (int i = index; i < arr.size() - 1; i++) {
    arr.set(i, arr.get(i + 1)); // [帧:移位]
  }
  arr.remove(arr.size() - 1); // [帧:删除]
}

  public static void main(String[] args) {
    List<Integer> arr = new ArrayList<>(Arrays.asList(1, 3, 5, 7));
    deleteAt(arr, 2);
    System.out.println(arr);
  }
}`,python:`def delete_at(arr, index):
    if index < 0 or index >= len(arr):
        return
    for i in range(index, len(arr) - 1):
        arr[i] = arr[i + 1]  # [帧:移位]
    arr.pop()  # [帧:删除]


if __name__ == "__main__":
    arr = [1, 3, 5, 7]
    delete_at(arr, 2)
    print(arr)`,csharp:`using System;
using System.Collections.Generic;

public class LinearDeleteDemo {
  static void DeleteAt(List<int> arr, int index) {
  if (index < 0 || index >= arr.Count) return;
  for (int i = index; i < arr.Count - 1; i++) {
    arr[i] = arr[i + 1]; // [帧:移位]
  }
  arr.RemoveAt(arr.Count - 1); // [帧:删除]
}

  public static void Main(string[] args) {
    var arr = new List<int> {1, 3, 5, 7};
    DeleteAt(arr, 2);
    Console.WriteLine("[" + string.Join(", ", arr) + "]");
  }
}`},search:{cpp:`#include <iostream>
#include <vector>
using namespace std;

int findValue(const vector<int>& arr, int target) {
  for (int i = 0; i < (int)arr.size(); i++) {
    if (arr[i] == target) return i; // [帧:比较]
  }
  return -1; // [帧:完成]
}

int main() {
  vector<int> arr = {1, 3, 5, 7};
  cout << findValue(arr, 5) << endl;
  return 0;
}`,java:`public class LinearSearchDemo {
  static int findValue(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
      if (arr[i] == target) return i; // [帧:比较]
    }
    return -1; // [帧:完成]
  }

  public static void main(String[] args) {
    int[] arr = {1, 3, 5, 7};
    System.out.println(findValue(arr, 5));
  }
}`,python:`def find_value(arr, target):
    for i, value in enumerate(arr):
        if value == target:
            return i  # [帧:比较]
    return -1  # [帧:完成]


if __name__ == "__main__":
    arr = [1, 3, 5, 7]
    print(find_value(arr, 5))`,csharp:`using System;

public class LinearSearchDemo {
  static int FindValue(int[] arr, int target) {
    for (int i = 0; i < arr.Length; i++) {
      if (arr[i] == target) return i; // [帧:比较]
    }
    return -1; // [帧:完成]
  }

  public static void Main(string[] args) {
    int[] arr = {1, 3, 5, 7};
    Console.WriteLine(FindValue(arr, 5));
  }
}`},reverse:{cpp:`#include <iostream>
#include <vector>
using namespace std;

void reverseArray(vector<int>& arr) {
  int left = 0, right = (int)arr.size() - 1;
  while (left < right) {
    swap(arr[left], arr[right]); // [帧:交换]
    left++;
    right--;
  }
}

int main() {
  vector<int> arr = {1, 3, 5, 7};
  reverseArray(arr);
  for (int v : arr) cout << v << ' ';
  return 0;
}`,java:`import java.util.Arrays;

public class LinearReverseDemo {
  static void reverseArray(int[] arr) {
    int left = 0, right = arr.length - 1;
    while (left < right) {
      int temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp; // [帧:交换]
      left++;
      right--;
    }
  }

  public static void main(String[] args) {
    int[] arr = {1, 3, 5, 7};
    reverseArray(arr);
    System.out.println(Arrays.toString(arr));
  }
}`,python:`def reverse_array(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]  # [帧:交换]
        left += 1
        right -= 1


if __name__ == "__main__":
    arr = [1, 3, 5, 7]
    reverse_array(arr)
    print(arr)`,csharp:`using System;

public class LinearReverseDemo {
  static void ReverseArray(int[] arr) {
    int left = 0, right = arr.Length - 1;
    while (left < right) {
      (arr[left], arr[right]) = (arr[right], arr[left]); // [帧:交换]
      left++;
      right--;
    }
  }

  public static void Main(string[] args) {
    int[] arr = {1, 3, 5, 7};
    ReverseArray(arr);
    Console.WriteLine("[" + string.Join(", ", arr) + "]");
  }
}`},linkedInsert:{cpp:`#include <iostream>
using namespace std;

struct ListNode {
  int val;
  ListNode* next;
  ListNode(int v) : val(v), next(nullptr) {}
};

ListNode* insertAfter(ListNode* head, int target, int value) {
  ListNode* cur = head;
  while (cur != nullptr && cur->val != target) {
    cur = cur->next; // [帧:遍历]
  }
  if (cur == nullptr) return head;
  ListNode* node = new ListNode(value);
  node->next = cur->next;
  cur->next = node; // [帧:插入]
  return head;
}

int main() {
  auto* a = new ListNode(1);
  auto* b = new ListNode(3);
  auto* c = new ListNode(5);
  a->next = b;
  b->next = c;
  ListNode* head = insertAfter(a, 3, 4);
  for (ListNode* p = head; p != nullptr; p = p->next) cout << p->val << ' ';
  return 0;
}`,java:`public class LinkedInsertDemo {
  static class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
  }

  static ListNode insertAfter(ListNode head, int target, int value) {
    ListNode cur = head;
    while (cur != null && cur.val != target) {
      cur = cur.next; // [帧:遍历]
    }
    if (cur == null) return head;
    ListNode node = new ListNode(value);
    node.next = cur.next;
    cur.next = node; // [帧:插入]
    return head;
  }

  public static void main(String[] args) {
    ListNode a = new ListNode(1);
    ListNode b = new ListNode(3);
    ListNode c = new ListNode(5);
    a.next = b;
    b.next = c;
    ListNode head = insertAfter(a, 3, 4);
    for (ListNode p = head; p != null; p = p.next) System.out.print(p.val + " ");
  }
}`,python:`def insert_after(head, target, value):
    cur = head
    while cur is not None and cur.val != target:
        cur = cur.next  # [帧:遍历]
    if cur is None:
        return head
    node = ListNode(value)
    node.next = cur.next
    cur.next = node  # [帧:插入]
    return head


class ListNode:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next


if __name__ == "__main__":
    head = ListNode(1, ListNode(3, ListNode(5)))
    head = insert_after(head, 3, 4)
    p = head
    while p is not None:
        print(p.val, end=" ")
        p = p.next`,csharp:`using System;

public class LinkedInsertDemo {
  public class ListNode {
    public int Val;
    public ListNode? Next;
    public ListNode(int val) { Val = val; }
  }

  static ListNode? InsertAfter(ListNode? head, int target, int value) {
    var cur = head;
    while (cur != null && cur.Val != target) {
      cur = cur.Next; // [帧:遍历]
    }
    if (cur == null) return head;
    var node = new ListNode(value);
    node.Next = cur.Next;
    cur.Next = node; // [帧:插入]
    return head;
  }

  public static void Main(string[] args) {
    var head = new ListNode(1) { Next = new ListNode(3) { Next = new ListNode(5) } };
    head = InsertAfter(head, 3, 4);
    for (var p = head; p != null; p = p.Next) Console.Write(p.Val + " ");
  }
}`},linkedDelete:{cpp:`#include <iostream>
using namespace std;

struct ListNode {
  int val;
  ListNode* next;
  ListNode(int v) : val(v), next(nullptr) {}
};

ListNode* deleteValue(ListNode* head, int target) {
  ListNode dummy(0);
  dummy.next = head;
  ListNode* cur = &dummy;
  while (cur->next != nullptr && cur->next->val != target) {
    cur = cur->next; // [帧:遍历]
  }
  if (cur->next != nullptr) {
    ListNode* doomed = cur->next;
    cur->next = doomed->next; // [帧:删除]
    delete doomed;
  }
  return dummy.next;
}

int main() {
  auto* a = new ListNode(1);
  auto* b = new ListNode(3);
  auto* c = new ListNode(5);
  a->next = b;
  b->next = c;
  ListNode* head = deleteValue(a, 3);
  for (ListNode* p = head; p != nullptr; p = p->next) cout << p->val << ' ';
  return 0;
}`,java:`public class LinkedDeleteDemo {
  static class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
  }

  static ListNode deleteValue(ListNode head, int target) {
    ListNode dummy = new ListNode(0);
    dummy.next = head;
    ListNode cur = dummy;
    while (cur.next != null && cur.next.val != target) {
      cur = cur.next; // [帧:遍历]
    }
    if (cur.next != null) {
      cur.next = cur.next.next; // [帧:删除]
    }
    return dummy.next;
  }

  public static void main(String[] args) {
    ListNode a = new ListNode(1);
    ListNode b = new ListNode(3);
    ListNode c = new ListNode(5);
    a.next = b;
    b.next = c;
    ListNode head = deleteValue(a, 3);
    for (ListNode p = head; p != null; p = p.next) System.out.print(p.val + " ");
  }
}`,python:`def delete_value(head, target):
    dummy = ListNode(0)
    dummy.next = head
    cur = dummy
    while cur.next is not None and cur.next.val != target:
        cur = cur.next  # [帧:遍历]
    if cur.next is not None:
        cur.next = cur.next.next  # [帧:删除]
    return dummy.next


class ListNode:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next


if __name__ == "__main__":
    head = ListNode(1, ListNode(3, ListNode(5)))
    head = delete_value(head, 3)
    p = head
    while p is not None:
        print(p.val, end=" ")
        p = p.next`,csharp:`using System;

public class LinkedDeleteDemo {
  public class ListNode {
    public int Val;
    public ListNode? Next;
    public ListNode(int val) { Val = val; }
  }

  static ListNode? DeleteValue(ListNode? head, int target) {
    var dummy = new ListNode(0) { Next = head };
    var cur = dummy;
    while (cur.Next != null && cur.Next.Val != target) {
      cur = cur.Next; // [帧:遍历]
    }
    if (cur.Next != null) {
      cur.Next = cur.Next.Next; // [帧:删除]
    }
    return dummy.Next;
  }

  public static void Main(string[] args) {
    var head = new ListNode(1) { Next = new ListNode(3) { Next = new ListNode(5) } };
    head = DeleteValue(head, 3);
    for (var p = head; p != null; p = p.Next) Console.Write(p.Val + " ");
  }
}`},stackPush:{cpp:`#include <iostream>
#include <vector>
using namespace std;

void stackPush(vector<int>& st, int value) {
  st.push_back(value); // [帧:入栈]
}

int main() {
  vector<int> st = {1, 2};
  stackPush(st, 3);
  for (int v : st) cout << v << ' ';
  return 0;
}`,java:`import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class StackPushDemo {
  static void stackPush(List<Integer> st, int value) {
    st.add(value); // [帧:入栈]
  }

  public static void main(String[] args) {
    List<Integer> st = new ArrayList<>(Arrays.asList(1, 2));
    stackPush(st, 3);
    System.out.println(st);
  }
}`,python:`def stack_push(st, value):
    st.append(value)  # [帧:入栈]


if __name__ == "__main__":
    st = [1, 2]
    stack_push(st, 3)
    print(st)`,csharp:`using System;
using System.Collections.Generic;

public class StackPushDemo {
  static void StackPush(List<int> st, int value) {
    st.Add(value); // [帧:入栈]
  }

  public static void Main(string[] args) {
    var st = new List<int> {1, 2};
    StackPush(st, 3);
    Console.WriteLine("[" + string.Join(", ", st) + "]");
  }
}`},stackPop:{cpp:`#include <iostream>
#include <vector>
using namespace std;

int stackPop(vector<int>& st) {
  if (st.empty()) return -1;
  int value = st.back();
  st.pop_back(); // [帧:出栈]
  return value;
}

int main() {
  vector<int> st = {1, 2, 3};
  cout << stackPop(st) << endl;
  return 0;
}`,java:`import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class StackPopDemo {
  static int stackPop(List<Integer> st) {
    if (st.isEmpty()) return -1;
    return st.remove(st.size() - 1); // [帧:出栈]
  }

  public static void main(String[] args) {
    List<Integer> st = new ArrayList<>(Arrays.asList(1, 2, 3));
    System.out.println(stackPop(st));
  }
}`,python:`def stack_pop(st):
    if not st:
        return -1
    return st.pop()  # [帧:出栈]


if __name__ == "__main__":
    st = [1, 2, 3]
    print(stack_pop(st))`,csharp:`using System;
using System.Collections.Generic;

public class StackPopDemo {
  static int StackPop(List<int> st) {
    if (st.Count == 0) return -1;
    int value = st[st.Count - 1];
    st.RemoveAt(st.Count - 1); // [帧:出栈]
    return value;
  }

  public static void Main(string[] args) {
    var st = new List<int> {1, 2, 3};
    Console.WriteLine(StackPop(st));
  }
}`},stackPeek:{cpp:`#include <iostream>
#include <vector>
using namespace std;

int stackPeek(const vector<int>& st) {
  if (st.empty()) return -1;
  return st.back(); // [帧:查看]
}

int main() {
  vector<int> st = {1, 2, 3};
  cout << stackPeek(st) << endl;
  return 0;
}`,java:`import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class StackPeekDemo {
  static int stackPeek(List<Integer> st) {
    if (st.isEmpty()) return -1;
    return st.get(st.size() - 1); // [帧:查看]
  }

  public static void main(String[] args) {
    List<Integer> st = new ArrayList<>(Arrays.asList(1, 2, 3));
    System.out.println(stackPeek(st));
  }
}`,python:`def stack_peek(st):
    if not st:
        return -1
    return st[-1]  # [帧:查看]


if __name__ == "__main__":
    st = [1, 2, 3]
    print(stack_peek(st))`,csharp:`using System;
using System.Collections.Generic;

public class StackPeekDemo {
  static int StackPeek(List<int> st) {
    if (st.Count == 0) return -1;
    return st[st.Count - 1]; // [帧:查看]
  }

  public static void Main(string[] args) {
    var st = new List<int> {1, 2, 3};
    Console.WriteLine(StackPeek(st));
  }
}`},queueEnqueue:{cpp:`#include <iostream>
#include <queue>
using namespace std;

void queueEnqueue(queue<int>& q, int value) {
  q.push(value); // [帧:入队]
}

int main() {
  queue<int> q;
  q.push(1);
  q.push(2);
  queueEnqueue(q, 3);
  cout << q.front() << endl;
  return 0;
}`,java:`import java.util.LinkedList;
import java.util.Queue;

public class QueueEnqueueDemo {
  static void queueEnqueue(Queue<Integer> q, int value) {
    q.offer(value); // [帧:入队]
  }

  public static void main(String[] args) {
    Queue<Integer> q = new LinkedList<>();
    q.offer(1);
    q.offer(2);
    queueEnqueue(q, 3);
    System.out.println(q);
  }
}`,python:`from collections import deque

def queue_enqueue(q, value):
    q.append(value)  # [帧:入队]


if __name__ == "__main__":
    q = deque([1, 2])
    queue_enqueue(q, 3)
    print(list(q))`,csharp:`using System;
using System.Collections.Generic;

public class QueueEnqueueDemo {
  static void QueueEnqueue(Queue<int> q, int value) {
    q.Enqueue(value); // [帧:入队]
  }

  public static void Main(string[] args) {
    var q = new Queue<int>();
    q.Enqueue(1);
    q.Enqueue(2);
    QueueEnqueue(q, 3);
    Console.WriteLine("[" + string.Join(", ", q) + "]");
  }
}`},queueDequeue:{cpp:`#include <iostream>
#include <queue>
using namespace std;

int queueDequeue(queue<int>& q) {
  if (q.empty()) return -1;
  int value = q.front();
  q.pop(); // [帧:出队]
  return value;
}

int main() {
  queue<int> q;
  q.push(1);
  q.push(2);
  q.push(3);
  cout << queueDequeue(q) << endl;
  return 0;
}`,java:`import java.util.LinkedList;
import java.util.Queue;

public class QueueDequeueDemo {
  static int queueDequeue(Queue<Integer> q) {
    if (q.isEmpty()) return -1;
    return q.poll(); // [帧:出队]
  }

  public static void main(String[] args) {
    Queue<Integer> q = new LinkedList<>();
    q.offer(1);
    q.offer(2);
    q.offer(3);
    System.out.println(queueDequeue(q));
  }
}`,python:`from collections import deque

def queue_dequeue(q):
    if not q:
        return -1
    return q.popleft()  # [帧:出队]


if __name__ == "__main__":
    q = deque([1, 2, 3])
    print(queue_dequeue(q))`,csharp:`using System;
using System.Collections.Generic;

public class QueueDequeueDemo {
  static int QueueDequeue(Queue<int> q) {
    if (q.Count == 0) return -1;
    return q.Dequeue(); // [帧:出队]
  }

  public static void Main(string[] args) {
    var q = new Queue<int>();
    q.Enqueue(1);
    q.Enqueue(2);
    q.Enqueue(3);
    Console.WriteLine(QueueDequeue(q));
  }
}`},queuePeek:{cpp:`#include <iostream>
#include <queue>
using namespace std;

int queuePeek(const queue<int>& q) {
  if (q.empty()) return -1;
  return q.front(); // [帧:查看]
}

int main() {
  queue<int> q;
  q.push(1);
  q.push(2);
  q.push(3);
  cout << queuePeek(q) << endl;
  return 0;
}`,java:`import java.util.LinkedList;
import java.util.Queue;

public class QueuePeekDemo {
  static int queuePeek(Queue<Integer> q) {
    if (q.isEmpty()) return -1;
    return q.peek(); // [帧:查看]
  }

  public static void main(String[] args) {
    Queue<Integer> q = new LinkedList<>();
    q.offer(1);
    q.offer(2);
    q.offer(3);
    System.out.println(queuePeek(q));
  }
}`,python:`from collections import deque

def queue_peek(q):
    if not q:
        return -1
    return q[0]  # [帧:查看]


if __name__ == "__main__":
    q = deque([1, 2, 3])
    print(queue_peek(q))`,csharp:`using System;
using System.Collections.Generic;

public class QueuePeekDemo {
  static int QueuePeek(Queue<int> q) {
    if (q.Count == 0) return -1;
    return q.Peek(); // [帧:查看]
  }

  public static void Main(string[] args) {
    var q = new Queue<int>();
    q.Enqueue(1);
    q.Enqueue(2);
    q.Enqueue(3);
    Console.WriteLine(QueuePeek(q));
  }
}`},preorder:{cpp:`#include <iostream>
#include <vector>
using namespace std;

struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

void preorder(TreeNode* root, vector<int>& out) {
  if (root == nullptr) return;
  out.push_back(root->val); // [帧:访问节点]
  preorder(root->left, out); // [帧:访问左子树]
  preorder(root->right, out); // [帧:访问右子树]
}

int main() {
  TreeNode* root = new TreeNode(1);
  root->left = new TreeNode(2);
  root->right = new TreeNode(3);
  vector<int> out;
  preorder(root, out);
  for (int v : out) cout << v << ' ';
  return 0;
}`,java:`import java.util.ArrayList;
import java.util.List;

public class PreorderDemo {
  static class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
  }

  static void preorder(TreeNode root, List<Integer> out) {
    if (root == null) return;
    out.add(root.val); // [帧:访问节点]
    preorder(root.left, out); // [帧:访问左子树]
    preorder(root.right, out); // [帧:访问右子树]
  }

  public static void main(String[] args) {
    TreeNode root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    List<Integer> out = new ArrayList<>();
    preorder(root, out);
    System.out.println(out);
  }
}`,python:`def preorder(root, out):
    if root is None:
        return
    out.append(root.val)  # [帧:访问节点]
    preorder(root.left, out)  # [帧:访问左子树]
    preorder(root.right, out)  # [帧:访问右子树]


class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


if __name__ == "__main__":
    root = TreeNode(1, TreeNode(2), TreeNode(3))
    out = []
    preorder(root, out)
    print(out)`,csharp:`using System;
using System.Collections.Generic;

public class PreorderDemo {
  public class TreeNode {
    public int Val;
    public TreeNode? Left;
    public TreeNode? Right;
    public TreeNode(int val) { Val = val; }
  }

  static void Preorder(TreeNode? root, List<int> output) {
    if (root == null) return;
    output.Add(root.Val); // [帧:访问节点]
    Preorder(root.Left, output); // [帧:访问左子树]
    Preorder(root.Right, output); // [帧:访问右子树]
  }

  public static void Main(string[] args) {
    var root = new TreeNode(1) { Left = new TreeNode(2), Right = new TreeNode(3) };
    var outList = new List<int>();
    Preorder(root, outList);
    Console.WriteLine("[" + string.Join(", ", outList) + "]");
  }
}`},inorder:{cpp:`#include <iostream>
#include <vector>
using namespace std;

struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

void inorder(TreeNode* root, vector<int>& out) {
  if (root == nullptr) return;
  inorder(root->left, out); // [帧:访问左子树]
  out.push_back(root->val); // [帧:访问节点]
  inorder(root->right, out); // [帧:访问右子树]
}

int main() {
  TreeNode* root = new TreeNode(2);
  root->left = new TreeNode(1);
  root->right = new TreeNode(3);
  vector<int> out;
  inorder(root, out);
  for (int v : out) cout << v << ' ';
  return 0;
}`,java:`import java.util.ArrayList;
import java.util.List;

public class InorderDemo {
  static class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
  }

  static void inorder(TreeNode root, List<Integer> out) {
    if (root == null) return;
    inorder(root.left, out); // [帧:访问左子树]
    out.add(root.val); // [帧:访问节点]
    inorder(root.right, out); // [帧:访问右子树]
  }

  public static void main(String[] args) {
    TreeNode root = new TreeNode(2);
    root.left = new TreeNode(1);
    root.right = new TreeNode(3);
    List<Integer> out = new ArrayList<>();
    inorder(root, out);
    System.out.println(out);
  }
}`,python:`def inorder(root, out):
    if root is None:
        return
    inorder(root.left, out)  # [帧:访问左子树]
    out.append(root.val)  # [帧:访问节点]
    inorder(root.right, out)  # [帧:访问右子树]


class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


if __name__ == "__main__":
    root = TreeNode(2, TreeNode(1), TreeNode(3))
    out = []
    inorder(root, out)
    print(out)`,csharp:`using System;
using System.Collections.Generic;

public class InorderDemo {
  public class TreeNode {
    public int Val;
    public TreeNode? Left;
    public TreeNode? Right;
    public TreeNode(int val) { Val = val; }
  }

  static void Inorder(TreeNode? root, List<int> output) {
    if (root == null) return;
    Inorder(root.Left, output); // [帧:访问左子树]
    output.Add(root.Val); // [帧:访问节点]
    Inorder(root.Right, output); // [帧:访问右子树]
  }

  public static void Main(string[] args) {
    var root = new TreeNode(2) { Left = new TreeNode(1), Right = new TreeNode(3) };
    var outList = new List<int>();
    Inorder(root, outList);
    Console.WriteLine("[" + string.Join(", ", outList) + "]");
  }
}`},postorder:{cpp:`#include <iostream>
#include <vector>
using namespace std;

struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

void postorder(TreeNode* root, vector<int>& out) {
  if (root == nullptr) return;
  postorder(root->left, out); // [帧:访问左子树]
  postorder(root->right, out); // [帧:访问右子树]
  out.push_back(root->val); // [帧:访问节点]
}

int main() {
  TreeNode* root = new TreeNode(2);
  root->left = new TreeNode(1);
  root->right = new TreeNode(3);
  vector<int> out;
  postorder(root, out);
  for (int v : out) cout << v << ' ';
  return 0;
}`,java:`import java.util.ArrayList;
import java.util.List;

public class PostorderDemo {
  static class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
  }

  static void postorder(TreeNode root, List<Integer> out) {
    if (root == null) return;
    postorder(root.left, out); // [帧:访问左子树]
    postorder(root.right, out); // [帧:访问右子树]
    out.add(root.val); // [帧:访问节点]
  }

  public static void main(String[] args) {
    TreeNode root = new TreeNode(2);
    root.left = new TreeNode(1);
    root.right = new TreeNode(3);
    List<Integer> out = new ArrayList<>();
    postorder(root, out);
    System.out.println(out);
  }
}`,python:`def postorder(root, out):
    if root is None:
        return
    postorder(root.left, out)  # [帧:访问左子树]
    postorder(root.right, out)  # [帧:访问右子树]
    out.append(root.val)  # [帧:访问节点]


class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


if __name__ == "__main__":
    root = TreeNode(2, TreeNode(1), TreeNode(3))
    out = []
    postorder(root, out)
    print(out)`,csharp:`using System;
using System.Collections.Generic;

public class PostorderDemo {
  public class TreeNode {
    public int Val;
    public TreeNode? Left;
    public TreeNode? Right;
    public TreeNode(int val) { Val = val; }
  }

  static void Postorder(TreeNode? root, List<int> output) {
    if (root == null) return;
    Postorder(root.Left, output); // [帧:访问左子树]
    Postorder(root.Right, output); // [帧:访问右子树]
    output.Add(root.Val); // [帧:访问节点]
  }

  public static void Main(string[] args) {
    var root = new TreeNode(2) { Left = new TreeNode(1), Right = new TreeNode(3) };
    var outList = new List<int>();
    Postorder(root, outList);
    Console.WriteLine("[" + string.Join(", ", outList) + "]");
  }
}`},levelorder:{cpp:`#include <iostream>
#include <queue>
#include <vector>
using namespace std;

struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

vector<int> levelOrder(TreeNode* root) {
  vector<int> out;
  if (root == nullptr) return out;
  queue<TreeNode*> q;
  q.push(root);
  while (!q.empty()) {
    TreeNode* node = q.front();
    q.pop();
    out.push_back(node->val); // [帧:访问节点]
    if (node->left) q.push(node->left); // [帧:访问左子树]
    if (node->right) q.push(node->right); // [帧:访问右子树]
  }
  return out;
}

int main() {
  TreeNode* root = new TreeNode(1);
  root->left = new TreeNode(2);
  root->right = new TreeNode(3);
  vector<int> out = levelOrder(root);
  for (int v : out) cout << v << ' ';
  return 0;
}`,java:`import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class LevelOrderDemo {
  static class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
  }

  static List<Integer> levelOrder(TreeNode root) {
    List<Integer> out = new ArrayList<>();
    if (root == null) return out;
    Queue<TreeNode> q = new LinkedList<>();
    q.offer(root);
    while (!q.isEmpty()) {
      TreeNode node = q.poll();
      out.add(node.val); // [帧:访问节点]
      if (node.left != null) q.offer(node.left); // [帧:访问左子树]
      if (node.right != null) q.offer(node.right); // [帧:访问右子树]
    }
    return out;
  }

  public static void main(String[] args) {
    TreeNode root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    System.out.println(levelOrder(root));
  }
}`,python:`from collections import deque

def level_order(root):
    out = []
    if root is None:
        return out
    q = deque([root])
    while q:
        node = q.popleft()
        out.append(node.val)  # [帧:访问节点]
        if node.left is not None:
            q.append(node.left)  # [帧:访问左子树]
        if node.right is not None:
            q.append(node.right)  # [帧:访问右子树]
    return out`,csharp:`using System;
using System.Collections.Generic;

public class LevelOrderDemo {
  public class TreeNode {
    public int Val;
    public TreeNode? Left;
    public TreeNode? Right;
    public TreeNode(int val) { Val = val; }
  }

  static List<int> LevelOrder(TreeNode? root) {
    var output = new List<int>();
    if (root == null) return output;
    var queue = new Queue<TreeNode>();
    queue.Enqueue(root);
    while (queue.Count > 0) {
      var node = queue.Dequeue();
      output.Add(node.Val); // [帧:访问节点]
      if (node.Left != null) queue.Enqueue(node.Left); // [帧:访问左子树]
      if (node.Right != null) queue.Enqueue(node.Right); // [帧:访问右子树]
    }
    return output;
  }

  public static void Main(string[] args) {
    var root = new TreeNode(1) { Left = new TreeNode(2), Right = new TreeNode(3) };
    Console.WriteLine("[" + string.Join(", ", LevelOrder(root)) + "]");
  }
}`},avl:{cpp:`#include <algorithm>
#include <iostream>
using namespace std;

struct AvlNode {
  int val;
  int height;
  AvlNode* left;
  AvlNode* right;
  AvlNode(int v) : val(v), height(1), left(nullptr), right(nullptr) {}
};

int height(AvlNode* node) { return node ? node->height : 0; }

void updateHeight(AvlNode* node) {
  node->height = max(height(node->left), height(node->right)) + 1;
}

AvlNode* rotateLeft(AvlNode* x) {
  AvlNode* y = x->right;
  x->right = y->left;
  y->left = x;
  updateHeight(x);
  updateHeight(y);
  return y; // [帧:左旋]
}

AvlNode* rotateRight(AvlNode* y) {
  AvlNode* x = y->left;
  y->left = x->right;
  x->right = y;
  updateHeight(y);
  updateHeight(x);
  return x; // [帧:右旋]
}

int main() {
  AvlNode* y = new AvlNode(20);
  y->left = new AvlNode(10);
  y->left->left = new AvlNode(5);
  updateHeight(y->left);
  updateHeight(y);
  AvlNode* root = rotateRight(y);
  cout << root->val << endl;
  return 0;
}`,java:`public class AvlRotateDemo {
  static class AvlNode {
    int val;
    int height = 1;
    AvlNode left;
    AvlNode right;
    AvlNode(int val) { this.val = val; }
  }

  static int height(AvlNode node) { return node == null ? 0 : node.height; }

  static void updateHeight(AvlNode node) {
    node.height = Math.max(height(node.left), height(node.right)) + 1;
  }

  static AvlNode rotateLeft(AvlNode x) {
    AvlNode y = x.right;
    x.right = y.left;
    y.left = x;
    updateHeight(x);
    updateHeight(y);
    return y; // [帧:左旋]
  }

  static AvlNode rotateRight(AvlNode y) {
    AvlNode x = y.left;
    y.left = x.right;
    x.right = y;
    updateHeight(y);
    updateHeight(x);
    return x; // [帧:右旋]
  }

  public static void main(String[] args) {
    AvlNode y = new AvlNode(20);
    y.left = new AvlNode(10);
    y.left.left = new AvlNode(5);
    updateHeight(y.left);
    updateHeight(y);
    AvlNode root = rotateRight(y);
    System.out.println(root.val);
  }
}`,python:`class AvlNode:
    def __init__(self, val):
        self.val = val
        self.height = 1
        self.left = None
        self.right = None


def height(node):
    return 0 if node is None else node.height

def update_height(node):
    node.height = max(height(node.left), height(node.right)) + 1

def rotate_left(x):
    y = x.right
    x.right = y.left
    y.left = x
    update_height(x)
    update_height(y)
    return y  # [帧:左旋]

def rotate_right(y):
    x = y.left
    y.left = x.right
    x.right = y
    update_height(y)
    update_height(x)
    return x  # [帧:右旋]


if __name__ == "__main__":
    y = AvlNode(20)
    y.left = AvlNode(10)
    y.left.left = AvlNode(5)
    update_height(y.left)
    update_height(y)
    root = rotate_right(y)
    print(root.val)`,csharp:`using System;

public class AvlRotateDemo {
  public class AvlNode {
    public int Val;
    public int Height = 1;
    public AvlNode? Left;
    public AvlNode? Right;
    public AvlNode(int val) { Val = val; }
  }

  static int Height(AvlNode? node) => node?.Height ?? 0;

  static void UpdateHeight(AvlNode node) {
    node.Height = Math.Max(Height(node.Left), Height(node.Right)) + 1;
  }

  static AvlNode RotateLeft(AvlNode x) {
    var y = x.Right!;
    x.Right = y.Left;
    y.Left = x;
    UpdateHeight(x);
    UpdateHeight(y);
    return y; // [帧:左旋]
  }

  static AvlNode RotateRight(AvlNode y) {
    var x = y.Left!;
    y.Left = x.Right;
    x.Right = y;
    UpdateHeight(y);
    UpdateHeight(x);
    return x; // [帧:右旋]
  }

  public static void Main(string[] args) {
    var y = new AvlNode(20) { Left = new AvlNode(10) };
    y.Left.Left = new AvlNode(5);
    UpdateHeight(y.Left);
    UpdateHeight(y);
    var root = RotateRight(y);
    Console.WriteLine(root.Val);
  }
}`},bstInsert:{cpp:`#include <iostream>
using namespace std;

struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

TreeNode* bstInsert(TreeNode* root, int value) {
  if (root == nullptr) return new TreeNode(value); // [帧:插入]
  if (value < root->val) root->left = bstInsert(root->left, value); // [帧:访问左子树]
  else if (value > root->val) root->right = bstInsert(root->right, value); // [帧:访问右子树]
  return root;
}

void inorder(TreeNode* root) {
  if (!root) return;
  inorder(root->left);
  cout << root->val << ' ';
  inorder(root->right);
}

int main() {
  TreeNode* root = nullptr;
  root = bstInsert(root, 5);
  root = bstInsert(root, 2);
  root = bstInsert(root, 8);
  inorder(root);
  return 0;
}`,java:`public class BstInsertDemo {
  static class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
  }

  static TreeNode bstInsert(TreeNode root, int value) {
    if (root == null) return new TreeNode(value); // [帧:插入]
    if (value < root.val) root.left = bstInsert(root.left, value); // [帧:访问左子树]
    else if (value > root.val) root.right = bstInsert(root.right, value); // [帧:访问右子树]
    return root;
  }

  static void inorder(TreeNode root) {
    if (root == null) return;
    inorder(root.left);
    System.out.print(root.val + " ");
    inorder(root.right);
  }

  public static void main(String[] args) {
    TreeNode root = null;
    root = bstInsert(root, 5);
    root = bstInsert(root, 2);
    root = bstInsert(root, 8);
    inorder(root);
  }
}`,python:`class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None


def bst_insert(root, value):
    if root is None:
        return TreeNode(value)  # [帧:插入]
    if value < root.val:
        root.left = bst_insert(root.left, value)  # [帧:访问左子树]
    elif value > root.val:
        root.right = bst_insert(root.right, value)  # [帧:访问右子树]
    return root


def inorder(root):
    if root is None:
        return
    inorder(root.left)
    print(root.val, end=" ")
    inorder(root.right)


if __name__ == "__main__":
    root = None
    root = bst_insert(root, 5)
    root = bst_insert(root, 2)
    root = bst_insert(root, 8)
    inorder(root)`,csharp:`using System;

public class BstInsertDemo {
  public class TreeNode {
    public int Val;
    public TreeNode? Left;
    public TreeNode? Right;
    public TreeNode(int val) { Val = val; }
  }

  static TreeNode BstInsert(TreeNode? root, int value) {
    if (root == null) return new TreeNode(value); // [帧:插入]
    if (value < root.val) root.left = bstInsert(root.left, value); // [帧:访问左子树]
    else if (value > root.val) root.right = bstInsert(root.right, value); // [帧:访问右子树]
    return root;
  }

  static void Inorder(TreeNode? root) {
    if (root == null) return;
    Inorder(root.Left);
    Console.Write(root.Val + " ");
    Inorder(root.Right);
  }

  public static void Main(string[] args) {
    TreeNode? root = null;
    root = BstInsert(root, 5);
    root = BstInsert(root, 2);
    root = BstInsert(root, 8);
    Inorder(root);
  }
}`},bstDelete:{cpp:`#include <iostream>
using namespace std;

struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

TreeNode* minNode(TreeNode* node) {
  while (node->left != nullptr) node = node->left;
  return node;
}

TreeNode* bstDelete(TreeNode* root, int key) {
  if (root == nullptr) return nullptr;
  if (key < root->val) root->left = bstDelete(root->left, key); // [帧:访问左子树]
  else if (key > root->val) root->right = bstDelete(root->right, key); // [帧:访问右子树]
  else {
    if (root->left == nullptr) return root->right; // [帧:删除]
    if (root->right == nullptr) return root->left; // [帧:删除]
    TreeNode* succ = minNode(root->right);
    root->val = succ->val; // [帧:替换]
    root->right = bstDelete(root->right, succ->val);
  }
  return root;
}

TreeNode* insert(TreeNode* root, int value) {
  if (!root) return new TreeNode(value);
  if (value < root->val) root->left = insert(root->left, value);
  else if (value > root->val) root->right = insert(root->right, value);
  return root;
}

void inorder(TreeNode* root) {
  if (!root) return;
  inorder(root->left);
  cout << root->val << ' ';
  inorder(root->right);
}

int main() {
  TreeNode* root = nullptr;
  root = insert(root, 5);
  root = insert(root, 2);
  root = insert(root, 8);
  root = bstDelete(root, 5);
  inorder(root);
  return 0;
}`,java:`public class BstDeleteDemo {
  static class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
  }

  static TreeNode minNode(TreeNode node) {
    while (node.left != null) node = node.left;
    return node;
  }

  static TreeNode bstDelete(TreeNode root, int key) {
    if (root == null) return null;
    if (key < root.val) root.left = bstDelete(root.left, key); // [帧:访问左子树]
    else if (key > root.val) root.right = bstDelete(root.right, key); // [帧:访问右子树]
    else {
      if (root.left == null) return root.right; // [帧:删除]
      if (root.right == null) return root.left; // [帧:删除]
      TreeNode succ = minNode(root.right);
      root.val = succ.val; // [帧:替换]
      root.right = bstDelete(root.right, succ.val);
    }
    return root;
  }

  static TreeNode insert(TreeNode root, int value) {
    if (root == null) return new TreeNode(value);
    if (value < root.val) root.left = insert(root.left, value);
    else if (value > root.val) root.right = insert(root.right, value);
    return root;
  }

  static void inorder(TreeNode root) {
    if (root == null) return;
    inorder(root.left);
    System.out.print(root.val + " ");
    inorder(root.right);
  }

  public static void main(String[] args) {
    TreeNode root = null;
    root = insert(root, 5);
    root = insert(root, 2);
    root = insert(root, 8);
    root = bstDelete(root, 5);
    inorder(root);
  }
}`,python:`class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None


def min_node(node):
    while node.left is not None:
        node = node.left
    return node


def bst_delete(root, key):
    if root is None:
        return None
    if key < root.val:
        root.left = bst_delete(root.left, key)  # [帧:访问左子树]
    elif key > root.val:
        root.right = bst_delete(root.right, key)  # [帧:访问右子树]
    else:
        if root.left is None:
            return root.right  # [帧:删除]
        if root.right is None:
            return root.left  # [帧:删除]
        succ = min_node(root.right)
        root.val = succ.val  # [帧:替换]
        root.right = bst_delete(root.right, succ.val)
    return root


def insert(root, value):
    if root is None:
        return TreeNode(value)
    if value < root.val:
        root.left = insert(root.left, value)
    elif value > root.val:
        root.right = insert(root.right, value)
    return root


def inorder(root):
    if root is None:
        return
    inorder(root.left)
    print(root.val, end=" ")
    inorder(root.right)


if __name__ == "__main__":
    root = None
    root = insert(root, 5)
    root = insert(root, 2)
    root = insert(root, 8)
    root = bst_delete(root, 5)
    inorder(root)`,csharp:`using System;

public class BstDeleteDemo {
  public class TreeNode {
    public int Val;
    public TreeNode? Left;
    public TreeNode? Right;
    public TreeNode(int val) { Val = val; }
  }

  static TreeNode MinNode(TreeNode node) {
    while (node.Left != null) node = node.Left;
    return node;
  }

  static TreeNode? BstDelete(TreeNode? root, int key) {
    if (root == null) return null;
    if (key < root.Val) root.Left = BstDelete(root.Left, key); // [帧:访问左子树]
    else if (key > root.Val) root.Right = BstDelete(root.Right, key); // [帧:访问右子树]
    else {
      if (root.Left == null) return root.Right; // [帧:删除]
      if (root.Right == null) return root.Left; // [帧:删除]
      var succ = MinNode(root.Right);
      root.Val = succ.Val; // [帧:替换]
      root.Right = BstDelete(root.Right, succ.Val);
    }
    return root;
  }

  static TreeNode Insert(TreeNode? root, int value) {
    if (root == null) return new TreeNode(value);
    if (value < root.Val) root.Left = Insert(root.Left, value);
    else if (value > root.Val) root.Right = Insert(root.Right, value);
    return root;
  }

  static void Inorder(TreeNode? root) {
    if (root == null) return;
    Inorder(root.Left);
    Console.Write(root.Val + " ");
    Inorder(root.Right);
  }

  public static void Main(string[] args) {
    TreeNode? root = null;
    root = Insert(root, 5);
    root = Insert(root, 2);
    root = Insert(root, 8);
    root = BstDelete(root, 5);
    Inorder(root);
  }
}`},huffman:{cpp:`#include <iostream>
#include <queue>
#include <unordered_map>
#include <vector>
using namespace std;

struct Node {
  char ch;
  int freq;
  Node* left;
  Node* right;
  Node(char c, int f) : ch(c), freq(f), left(nullptr), right(nullptr) {}
};

Node* buildHuffman(const unordered_map<char, int>& freq) {
  auto cmp = [](Node* a, Node* b) { return a->freq > b->freq; };
  priority_queue<Node*, vector<Node*>, decltype(cmp)> pq(cmp);
  for (auto& [ch, f] : freq) pq.push(new Node(ch, f));
  while (pq.size() > 1) {
    Node* a = pq.top(); pq.pop();
    Node* b = pq.top(); pq.pop();
    Node* parent = new Node('\0', a->freq + b->freq);
    parent->left = a;
    parent->right = b;
    pq.push(parent); // [帧:合并]
  }
  return pq.top();
}

int main() {
  unordered_map<char, int> freq = {{'a', 5}, {'b', 9}, {'c', 12}, {'d', 13}};
  Node* root = buildHuffman(freq);
  cout << root->freq << endl;
  return 0;
}`,java:`import java.util.Map;
import java.util.HashMap;
import java.util.PriorityQueue;

public class HuffmanDemo {
  static class Node {
    char ch;
    int freq;
    Node left;
    Node right;
    Node(char ch, int freq) { this.ch = ch; this.freq = freq; }
  }

  static Node buildHuffman(Map<Character, Integer> freq) {
    PriorityQueue<Node> pq = new PriorityQueue<>((a, b) -> Integer.compare(a.freq, b.freq));
    for (Map.Entry<Character, Integer> e : freq.entrySet()) {
      pq.offer(new Node(e.getKey(), e.getValue()));
    }
    while (pq.size() > 1) {
      Node a = pq.poll();
      Node b = pq.poll();
      Node parent = new Node('\0', a.freq + b.freq);
      parent.left = a;
      parent.right = b;
      pq.offer(parent); // [帧:合并]
    }
    return pq.peek();
  }

  public static void main(String[] args) {
    Map<Character, Integer> freq = new HashMap<>();
    freq.put('a', 5);
    freq.put('b', 9);
    freq.put('c', 12);
    freq.put('d', 13);
    Node root = buildHuffman(freq);
    System.out.println(root.freq);
  }
}`,python:`import heapq

class Node:
    def __init__(self, ch, freq):
        self.ch = ch
        self.freq = freq
        self.left = None
        self.right = None


def build_huffman(freq):
    heap = [[f, Node(ch, f)] for ch, f in freq.items()]
    heapq.heapify(heap)
    while len(heap) > 1:
        fa, a = heapq.heappop(heap)
        fb, b = heapq.heappop(heap)
        parent = Node('\0', fa + fb)
        parent.left = a
        parent.right = b
        heapq.heappush(heap, [fa + fb, parent])  # [帧:合并]
    return heap[0][1]


if __name__ == "__main__":
    freq = {'a': 5, 'b': 9, 'c': 12, 'd': 13}
    root = build_huffman(freq)
    print(root.freq)`,csharp:`using System;
using System.Collections.Generic;

public class HuffmanDemo {
  public class Node {
    public char Ch;
    public int Freq;
    public Node? Left;
    public Node? Right;
    public Node(char ch, int freq) { Ch = ch; Freq = freq; }
  }

  static Node BuildHuffman(Dictionary<char, int> freq) {
    var pq = new PriorityQueue<Node, int>();
    foreach (var kv in freq) {
      pq.Enqueue(new Node(kv.Key, kv.Value), kv.Value);
    }
    while (pq.Count > 1) {
      var a = pq.Dequeue();
      var b = pq.Dequeue();
      var parent = new Node('\0', a.Freq + b.Freq) { Left = a, Right = b };
      pq.Enqueue(parent, parent.Freq); // [帧:合并]
    }
    return pq.Dequeue();
  }

  public static void Main(string[] args) {
    var freq = new Dictionary<char, int> { {'a', 5}, {'b', 9}, {'c', 12}, {'d', 13} };
    var root = BuildHuffman(freq);
    Console.WriteLine(root.Freq);
  }
}`},dijkstra:{cpp:`#include <climits>
#include <iostream>
#include <utility>
#include <vector>
using namespace std;

struct Graph {
  int n;
  vector<vector<pair<int, int>>> adj;
};

vector<int> dijkstra(const Graph& graph, int start) {
  vector<int> dist(graph.n, INT_MAX);
  vector<bool> used(graph.n, false);
  dist[start] = 0;
  for (int i = 0; i < graph.n; i++) {
    int v = -1;
    for (int j = 0; j < graph.n; j++) {
      if (!used[j] && (v == -1 || dist[j] < dist[v])) v = j;
    }
    if (v == -1 || dist[v] == INT_MAX) break;
    used[v] = true; // [帧:访问节点]
    for (auto [to, w] : graph.adj[v]) {
      if (dist[v] + w < dist[to]) {
        dist[to] = dist[v] + w; // [帧:更新距离]
      }
    }
  }
  return dist;
}

int main() {
  Graph g{4, {{{1, 2}, {2, 5}}, {{2, 1}, {3, 4}}, {{3, 1}}, {}}};
  vector<int> dist = dijkstra(g, 0);
  for (int d : dist) cout << d << ' ';
  return 0;
}`,java:`import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class DijkstraDemo {
  static class Edge {
    int to, w;
    Edge(int to, int w) { this.to = to; this.w = w; }
  }

  static class Graph {
    int n;
    List<Edge>[] adj;
    Graph(int n) {
      this.n = n;
      this.adj = new ArrayList[n];
      for (int i = 0; i < n; i++) this.adj[i] = new ArrayList<>();
    }
    void addEdge(int u, int v, int w) { this.adj[u].add(new Edge(v, w)); }
  }

  static int[] dijkstra(Graph graph, int start) {
    int[] dist = new int[graph.n];
    boolean[] used = new boolean[graph.n];
    java.util.Arrays.fill(dist, Integer.MAX_VALUE);
    dist[start] = 0;
    for (int i = 0; i < graph.n; i++) {
      int v = -1;
      for (int j = 0; j < graph.n; j++) {
        if (!used[j] && (v == -1 || dist[j] < dist[v])) v = j;
      }
      if (v == -1 || dist[v] == Integer.MAX_VALUE) break;
      used[v] = true; // [帧:访问节点]
      for (Edge e : graph.adj[v]) {
        if (dist[v] + e.w < dist[e.to]) {
          dist[e.to] = dist[v] + e.w; // [帧:更新距离]
        }
      }
    }
    return dist;
  }

  public static void main(String[] args) {
    Graph g = new Graph(4);
    g.addEdge(0, 1, 2);
    g.addEdge(0, 2, 5);
    g.addEdge(1, 2, 1);
    g.addEdge(1, 3, 4);
    g.addEdge(2, 3, 1);
    System.out.println(Arrays.toString(dijkstra(g, 0)));
  }
}`,python:`class Graph:
    def __init__(self, n):
        self.n = n
        self.adj = [[] for _ in range(n)]

    def add_edge(self, u, v, w):
        self.adj[u].append((v, w))


def dijkstra(graph, start):
    dist = [float('inf')] * graph.n
    used = [False] * graph.n
    dist[start] = 0
    for _ in range(graph.n):
        v = -1
        for j in range(graph.n):
            if not used[j] and (v == -1 or dist[j] < dist[v]):
                v = j
        if v == -1 or dist[v] == float('inf'):
            break
        used[v] = True  # [帧:访问节点]
        for to, w in graph.adj[v]:
            if dist[v] + w < dist[to]:
                dist[to] = dist[v] + w  # [帧:更新距离]
    return dist


if __name__ == "__main__":
    g = Graph(4)
    g.add_edge(0, 1, 2)
    g.add_edge(0, 2, 5)
    g.add_edge(1, 2, 1)
    g.add_edge(1, 3, 4)
    g.add_edge(2, 3, 1)
    print(dijkstra(g, 0))`,csharp:`using System;
using System.Collections.Generic;
using System.Linq;

public class DijkstraDemo {
  public class Edge {
    public int To;
    public int W;
    public Edge(int to, int w) { To = to; W = w; }
  }

  public class Graph {
    public int N;
    public List<Edge>[] Adj;
    public Graph(int n) {
      N = n;
      Adj = new List<Edge>[n];
      for (int i = 0; i < n; i++) Adj[i] = new List<Edge>();
    }
    public void AddEdge(int u, int v, int w) => Adj[u].Add(new Edge(v, w));
  }

  static int[] Dijkstra(Graph graph, int start) {
    int[] dist = Enumerable.Repeat(int.MaxValue, graph.N).ToArray();
    bool[] used = new bool[graph.N];
    dist[start] = 0;
    for (int i = 0; i < graph.N; i++) {
      int v = -1;
      for (int j = 0; j < graph.N; j++) {
        if (!used[j] && (v == -1 || dist[j] < dist[v])) v = j;
      }
      if (v == -1 || dist[v] == int.MaxValue) break;
      used[v] = true; // [帧:访问节点]
      foreach (var edge in graph.Adj[v]) {
        if (dist[v] + edge.W < dist[edge.To]) {
          dist[edge.To] = dist[v] + edge.W; // [帧:更新距离]
        }
      }
    }
    return dist;
  }

  public static void Main(string[] args) {
    var g = new Graph(4);
    g.AddEdge(0, 1, 2);
    g.AddEdge(0, 2, 5);
    g.AddEdge(1, 2, 1);
    g.AddEdge(1, 3, 4);
    g.AddEdge(2, 3, 1);
    Console.WriteLine("[" + string.Join(", ", Dijkstra(g, 0)) + "]");
  }
}`},prim:{cpp:`#include <climits>
#include <iostream>
#include <utility>
#include <vector>
using namespace std;

struct Edge {
  int from;
  int to;
  int w;
};

struct Graph {
  int n;
  vector<vector<pair<int, int>>> adj;
};

vector<Edge> prim(const Graph& graph, int start) {
  vector<bool> inMst(graph.n, false);
  vector<Edge> result;
  inMst[start] = true;
  while ((int)result.size() < graph.n - 1) {
    Edge best{-1, -1, INT_MAX};
    for (int v = 0; v < graph.n; v++) {
      if (!inMst[v]) continue;
      for (auto [to, w] : graph.adj[v]) {
        if (!inMst[to] && w < best.w) best = {v, to, w};
      }
    }
    if (best.from == -1) break;
    inMst[best.to] = true; // [帧:访问节点]
    result.push_back(best); // [帧:选边]
  }
  return result;
}

int main() {
  Graph g{4, {{{1, 2}, {2, 5}}, {{0, 2}, {2, 1}, {3, 4}}, {{0, 5}, {1, 1}, {3, 1}}, {{1, 4}, {2, 1}}}};
  auto mst = prim(g, 0);
  for (auto& e : mst) cout << "(" << e.from << "," << e.to << "," << e.w << ") ";
  return 0;
}`,java:`import java.util.ArrayList;
import java.util.List;

public class PrimDemo {
  static class Edge {
    int from, to, w;
    Edge(int from, int to, int w) { this.from = from; this.to = to; this.w = w; }
    public String toString() { return "(" + from + "," + to + "," + w + ")"; }
  }

  static class Graph {
    int n;
    List<Edge>[] adj;
    Graph(int n) {
      this.n = n;
      this.adj = new ArrayList[n];
      for (int i = 0; i < n; i++) this.adj[i] = new ArrayList<>();
    }
    void addUndirectedEdge(int u, int v, int w) {
      adj[u].add(new Edge(u, v, w));
      adj[v].add(new Edge(v, u, w));
    }
  }

  static List<Edge> prim(Graph graph, int start) {
    boolean[] inMst = new boolean[graph.n];
    List<Edge> result = new ArrayList<>();
    inMst[start] = true;
    while (result.size() < graph.n - 1) {
      Edge best = null;
      for (int v = 0; v < graph.n; v++) {
        if (!inMst[v]) continue;
        for (Edge e : graph.adj[v]) {
          if (!inMst[e.to] && (best == null || e.w < best.w)) best = new Edge(v, e.to, e.w);
        }
      }
      if (best == null) break;
      inMst[best.to] = true; // [帧:访问节点]
      result.add(best); // [帧:选边]
    }
    return result;
  }

  public static void main(String[] args) {
    Graph g = new Graph(4);
    g.addUndirectedEdge(0, 1, 2);
    g.addUndirectedEdge(0, 2, 5);
    g.addUndirectedEdge(1, 2, 1);
    g.addUndirectedEdge(1, 3, 4);
    g.addUndirectedEdge(2, 3, 1);
    System.out.println(prim(g, 0));
  }
}`,python:`class Graph:
    def __init__(self, n):
        self.n = n
        self.adj = [[] for _ in range(n)]

    def add_undirected_edge(self, u, v, w):
        self.adj[u].append((v, w))
        self.adj[v].append((u, w))


def prim(graph, start):
    in_mst = [False] * graph.n
    result = []
    in_mst[start] = True
    while len(result) < graph.n - 1:
        best = None
        for v in range(graph.n):
            if not in_mst[v]:
                continue
            for to, w in graph.adj[v]:
                if not in_mst[to] and (best is None or w < best[2]):
                    best = (v, to, w)
        if best is None:
            break
        in_mst[best[1]] = True  # [帧:访问节点]
        result.append(best)  # [帧:选边]
    return result


if __name__ == "__main__":
    g = Graph(4)
    g.add_undirected_edge(0, 1, 2)
    g.add_undirected_edge(0, 2, 5)
    g.add_undirected_edge(1, 2, 1)
    g.add_undirected_edge(1, 3, 4)
    g.add_undirected_edge(2, 3, 1)
    print(prim(g, 0))`,csharp:`using System;
using System.Collections.Generic;

public class PrimDemo {
  public class Edge {
    public int From;
    public int To;
    public int W;
    public Edge(int from, int to, int w) { From = from; To = to; W = w; }
    public override string ToString() => $"({From},{To},{W})";
  }

  public class Graph {
    public int N;
    public List<Edge>[] Adj;
    public Graph(int n) {
      N = n;
      Adj = new List<Edge>[n];
      for (int i = 0; i < n; i++) Adj[i] = new List<Edge>();
    }
    public void AddUndirectedEdge(int u, int v, int w) {
      Adj[u].Add(new Edge(u, v, w));
      Adj[v].Add(new Edge(v, u, w));
    }
  }

  static List<Edge> Prim(Graph graph, int start) {
    bool[] inMst = new bool[graph.N];
    var result = new List<Edge>();
    inMst[start] = true;
    while (result.Count < graph.N - 1) {
      Edge? best = null;
      for (int v = 0; v < graph.N; v++) {
        if (!inMst[v]) continue;
        foreach (var e in graph.Adj[v]) {
          if (!inMst[e.To] && (best == null || e.W < best.W)) best = new Edge(v, e.To, e.W);
        }
      }
      if (best == null) break;
      inMst[best.To] = true; // [帧:访问节点]
      result.Add(best); // [帧:选边]
    }
    return result;
  }

  public static void Main(string[] args) {
    var g = new Graph(4);
    g.AddUndirectedEdge(0, 1, 2);
    g.AddUndirectedEdge(0, 2, 5);
    g.AddUndirectedEdge(1, 2, 1);
    g.AddUndirectedEdge(1, 3, 4);
    g.AddUndirectedEdge(2, 3, 1);
    Console.WriteLine(string.Join(" ", Prim(g, 0)));
  }
}`},kruskal:{cpp:`#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

struct Edge {
  int from;
  int to;
  int w;
};

struct Graph {
  int n;
  vector<Edge> edges;
};

struct DSU {
  vector<int> p, r;
  DSU(int n) : p(n), r(n, 0) { for (int i = 0; i < n; i++) p[i] = i; }
  int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
  bool unite(int a, int b) {
    a = find(a); b = find(b);
    if (a == b) return false;
    if (r[a] < r[b]) swap(a, b);
    p[b] = a;
    if (r[a] == r[b]) r[a]++;
    return true;
  }
};

vector<Edge> kruskal(Graph graph) {
  sort(graph.edges.begin(), graph.edges.end(), [](const Edge& a, const Edge& b) { return a.w < b.w; });
  DSU dsu(graph.n);
  vector<Edge> result;
  for (auto& e : graph.edges) {
    if (dsu.unite(e.from, e.to)) {
      result.push_back(e); // [帧:选边]
      if ((int)result.size() == graph.n - 1) break;
    }
  }
  return result;
}

int main() {
  Graph g{4, {{0,1,2}, {0,2,5}, {1,2,1}, {1,3,4}, {2,3,1}}};
  auto mst = kruskal(g);
  for (auto& e : mst) cout << "(" << e.from << "," << e.to << "," << e.w << ") ";
  return 0;
}`,java:`import java.util.ArrayList;
import java.util.List;

public class KruskalDemo {
  static class Edge {
    int from, to, w;
    Edge(int from, int to, int w) { this.from = from; this.to = to; this.w = w; }
    public String toString() { return "(" + from + "," + to + "," + w + ")"; }
  }

  static class Graph {
    int n;
    List<Edge> edges = new ArrayList<>();
    Graph(int n) { this.n = n; }
    void addEdge(int u, int v, int w) { edges.add(new Edge(u, v, w)); }
  }

  static class DSU {
    int[] p, r;
    DSU(int n) {
      p = new int[n];
      r = new int[n];
      for (int i = 0; i < n; i++) p[i] = i;
    }
    int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
    boolean unite(int a, int b) {
      a = find(a); b = find(b);
      if (a == b) return false;
      if (r[a] < r[b]) { int t = a; a = b; b = t; }
      p[b] = a;
      if (r[a] == r[b]) r[a]++;
      return true;
    }
  }

  static List<Edge> kruskal(Graph graph) {
    graph.edges.sort((a, b) -> Integer.compare(a.w, b.w));
    DSU dsu = new DSU(graph.n);
    List<Edge> result = new ArrayList<>();
    for (Edge e : graph.edges) {
      if (dsu.unite(e.from, e.to)) {
        result.add(e); // [帧:选边]
        if (result.size() == graph.n - 1) break;
      }
    }
    return result;
  }

  public static void main(String[] args) {
    Graph g = new Graph(4);
    g.addEdge(0, 1, 2);
    g.addEdge(0, 2, 5);
    g.addEdge(1, 2, 1);
    g.addEdge(1, 3, 4);
    g.addEdge(2, 3, 1);
    System.out.println(kruskal(g));
  }
}`,python:`class Edge:
    def __init__(self, from_, to, w):
        self.from_ = from_
        self.to = to
        self.w = w


class Graph:
    def __init__(self, n):
        self.n = n
        self.edges = []

    def add_edge(self, u, v, w):
        self.edges.append(Edge(u, v, w))


class DSU:
    def __init__(self, n):
        self.p = list(range(n))
        self.r = [0] * n

    def find(self, x):
        if self.p[x] != x:
            self.p[x] = self.find(self.p[x])
        return self.p[x]

    def unite(self, a, b):
        a, b = self.find(a), self.find(b)
        if a == b:
            return False
        if self.r[a] < self.r[b]:
            a, b = b, a
        self.p[b] = a
        if self.r[a] == self.r[b]:
            self.r[a] += 1
        return True


def kruskal(graph):
    edges = sorted(graph.edges, key=lambda e: e.w)
    dsu = DSU(graph.n)
    result = []
    for e in edges:
        if dsu.unite(e.from_, e.to):
            result.append(e)  # [帧:选边]
            if len(result) == graph.n - 1:
                break
    return [(e.from_, e.to, e.w) for e in result]


if __name__ == "__main__":
    g = Graph(4)
    g.add_edge(0, 1, 2)
    g.add_edge(0, 2, 5)
    g.add_edge(1, 2, 1)
    g.add_edge(1, 3, 4)
    g.add_edge(2, 3, 1)
    print(kruskal(g))`,csharp:`using System;
using System.Collections.Generic;

public class KruskalDemo {
  public class Edge {
    public int From;
    public int To;
    public int W;
    public Edge(int from, int to, int w) { From = from; To = to; W = w; }
    public override string ToString() => $"({From},{To},{W})";
  }

  public class Graph {
    public int N;
    public List<Edge> Edges = new();
    public Graph(int n) { N = n; }
    public void AddEdge(int u, int v, int w) => Edges.Add(new Edge(u, v, w));
  }

  public class Dsu {
    private readonly int[] p;
    private readonly int[] r;
    public Dsu(int n) {
      p = new int[n];
      r = new int[n];
      for (int i = 0; i < n; i++) p[i] = i;
    }
    private int Find(int x) => p[x] == x ? x : p[x] = Find(p[x]);
    public bool Unite(int a, int b) {
      a = Find(a);
      b = Find(b);
      if (a == b) return false;
      if (r[a] < r[b]) (a, b) = (b, a);
      p[b] = a;
      if (r[a] == r[b]) r[a]++;
      return true;
    }
  }

  static List<Edge> Kruskal(Graph graph) {
    graph.Edges.Sort((a, b) => a.W.CompareTo(b.W));
    var dsu = new Dsu(graph.N);
    var result = new List<Edge>();
    foreach (var e in graph.Edges) {
      if (dsu.Unite(e.From, e.To)) {
        result.Add(e); // [帧:选边]
        if (result.Count == graph.N - 1) break;
      }
    }
    return result;
  }

  public static void Main(string[] args) {
    var g = new Graph(4);
    g.AddEdge(0, 1, 2);
    g.AddEdge(0, 2, 5);
    g.AddEdge(1, 2, 1);
    g.AddEdge(1, 3, 4);
    g.AddEdge(2, 3, 1);
    Console.WriteLine(string.Join(" ", Kruskal(g)));
  }
}`},dfs:{cpp:`#include <iostream>
#include <vector>
using namespace std;

void dfs(int v, const vector<vector<int>>& g, vector<bool>& used, vector<int>& order) {
  used[v] = true; // [帧:访问节点]
  order.push_back(v); // [帧:访问节点]
  for (int to : g[v]) {
    if (!used[to]) dfs(to, g, used, order); // [帧:访问边]
  }
}

int main() {
  vector<vector<int>> g = {{1, 2}, {2, 3}, {3}, {}};
  vector<bool> used(g.size(), false);
  vector<int> order;
  dfs(0, g, used, order);
  for (int v : order) cout << v << ' ';
  return 0;
}`,java:`import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class DfsDemo {
  static void dfs(int v, List<List<Integer>> g, boolean[] used, List<Integer> order) {
    used[v] = true; // [帧:访问节点]
    order.add(v); // [帧:访问节点]
    for (int to : g.get(v)) {
      if (!used[to]) dfs(to, g, used, order); // [帧:访问边]
    }
  }

  public static void main(String[] args) {
    List<List<Integer>> g = new ArrayList<>();
    g.add(Arrays.asList(1, 2));
    g.add(Arrays.asList(2, 3));
    g.add(Arrays.asList(3));
    g.add(Arrays.asList());
    boolean[] used = new boolean[g.size()];
    List<Integer> order = new ArrayList<>();
    dfs(0, g, used, order);
    System.out.println(order);
  }
}`,python:`def dfs(v, g, used, order):
    used[v] = True  # [帧:访问节点]
    order.append(v)  # [帧:访问节点]
    for to in g[v]:
        if not used[to]:
            dfs(to, g, used, order)  # [帧:访问边]


if __name__ == "__main__":
    g = [[1, 2], [2, 3], [3], []]
    used = [False] * len(g)
    order = []
    dfs(0, g, used, order)
    print(order)`,csharp:`using System;
using System.Collections.Generic;

public class DfsDemo {
  static void Dfs(int v, List<int>[] g, bool[] used, List<int> order) {
    used[v] = true; // [帧:访问节点]
    order.Add(v); // [帧:访问节点]
    foreach (var to in g[v]) {
      if (!used[to]) Dfs(to, g, used, order); // [帧:访问边]
    }
  }

  public static void Main(string[] args) {
    var g = new[] {
      new List<int> {1, 2},
      new List<int> {2, 3},
      new List<int> {3},
      new List<int>()
    };
    var used = new bool[g.Length];
    var order = new List<int>();
    Dfs(0, g, used, order);
    Console.WriteLine("[" + string.Join(", ", order) + "]");
  }
}`},bfs:{cpp:`#include <iostream>
#include <queue>
#include <vector>
using namespace std;

vector<int> bfs(int start, const vector<vector<int>>& g) {
  vector<int> order;
  vector<bool> used(g.size(), false);
  queue<int> q;
  q.push(start);
  used[start] = true;
  while (!q.empty()) {
    int v = q.front();
    q.pop();
    order.push_back(v); // [帧:访问节点]
    for (int to : g[v]) {
      if (!used[to]) {
        used[to] = true;
        q.push(to); // [帧:访问边]
      }
    }
  }
  return order;
}

int main() {
  vector<vector<int>> g = {{1, 2}, {2, 3}, {3}, {}};
  auto order = bfs(0, g);
  for (int v : order) cout << v << ' ';
  return 0;
}`,java:`import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class BfsDemo {
  static List<Integer> bfs(int start, List<List<Integer>> g) {
    List<Integer> order = new ArrayList<>();
    boolean[] used = new boolean[g.size()];
    Queue<Integer> q = new LinkedList<>();
    q.offer(start);
    used[start] = true;
    while (!q.isEmpty()) {
      int v = q.poll();
      order.add(v); // [帧:访问节点]
      for (int to : g.get(v)) {
        if (!used[to]) {
          used[to] = true;
          q.offer(to); // [帧:访问边]
        }
      }
    }
    return order;
  }

  public static void main(String[] args) {
    List<List<Integer>> g = new ArrayList<>();
    g.add(Arrays.asList(1, 2));
    g.add(Arrays.asList(2, 3));
    g.add(Arrays.asList(3));
    g.add(Arrays.asList());
    System.out.println(bfs(0, g));
  }
}`,python:`from collections import deque

def bfs(start, g):
    order = []
    used = [False] * len(g)
    q = deque([start])
    used[start] = True
    while q:
        v = q.popleft()
        order.append(v)  # [帧:访问节点]
        for to in g[v]:
            if not used[to]:
                used[to] = True
                q.append(to)  # [帧:访问边]
    return order


if __name__ == "__main__":
    g = [[1, 2], [2, 3], [3], []]
    print(bfs(0, g))`,csharp:`using System;
using System.Collections.Generic;

public class BfsDemo {
  static List<int> Bfs(int start, List<int>[] g) {
    var order = new List<int>();
    var used = new bool[g.Length];
    var q = new Queue<int>();
    q.Enqueue(start);
    used[start] = true;
    while (q.Count > 0) {
      int v = q.Dequeue();
      order.Add(v); // [帧:访问节点]
      foreach (var to in g[v]) {
        if (!used[to]) {
          used[to] = true;
          q.Enqueue(to); // [帧:访问边]
        }
      }
    }
    return order;
  }

  public static void Main(string[] args) {
    var g = new[] {
      new List<int> {1, 2},
      new List<int> {2, 3},
      new List<int> {3},
      new List<int>()
    };
    Console.WriteLine("[" + string.Join(", ", Bfs(0, g)) + "]");
  }
}`}};function Tt(t,r){return wi[t]||r}function Bt(t){return t.replace(/([a-z0-9])([A-Z])/g,"$1 $2").split(/[^a-zA-Z0-9]+/).filter(Boolean).map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join("")}function xi(t,r){return/\bmain\s*\(/.test(r)?r:`#include <iostream>
#include <vector>
#include <string>
#include <queue>
#include <stack>
#include <unordered_map>
#include <unordered_set>
#include <algorithm>
using namespace std;

${r}

int main() {
  cout << "${t} template loaded." << endl;
  return 0;
}`}function Li(t,r){if(/\bclass\s+\w+/.test(r)&&/\bmain\s*\(/.test(r))return r;const i=`${Bt(t)||"Algorithm"}Demo`,a=r.replace(/^(\s*)(?!static\b)([A-Za-z_][\w<>,\[\]\s]*\s+[A-Za-z_]\w*\s*\()/gm,"$1static $2");return`import java.util.*;

public class ${i} {
${a.split(`
`).map(c=>`  ${c}`).join(`
`)}

  public static void main(String[] args) {
    System.out.println("${t} template loaded.");
  }
}`}function Si(t,r){return/if\s+__name__\s*==\s*['"]__main__['"]/.test(r)?r:`${r}

if __name__ == "__main__":
    print("${t} template loaded.")`}function Ei(t,r){if(/\bstatic\s+void\s+Main\s*\(/.test(r))return r;const i=`${Bt(t)||"Algorithm"}Demo`,a=r.replace(/^(\s*)(?!static\b)([A-Za-z_][\w<>,\[\]\s]*\s+[A-Za-z_]\w*\s*\()/gm,"$1static $2");return`using System;
using System.Collections.Generic;
using System.Linq;

public class ${i} {
${a.split(`
`).map(c=>`  ${c}`).join(`
`)}

  public static void Main(string[] args) {
    Console.WriteLine("${t} template loaded.");
  }
}`}function ji(t,r,i){switch(r){case"cpp":return xi(t,i);case"java":return Li(t,i);case"python":return Si(t,i);case"csharp":return Ei(t,i);default:return i}}function Ii(t,r){const a=Ni[t]?.[r]||null,c=a?ji(t,r,a):null;return typeof window<"u"&&console.log(`getTemplate(${t}, ${r}) ->`,c?"命中":"未命中"),c}function Ai(t,r){return Ii(t,r)}const dt=new yi,Ti="local-v2";function ki(t){return t.split(`
`)}function Ci(t,r){const i=t.split(",").map(a=>a.trim()).filter(Boolean);return r==="cpp"?i.map(a=>`auto ${a}`).join(", "):r==="java"?i.map(a=>`Object ${a}`).join(", "):r==="csharp"?i.map(a=>`dynamic ${a}`).join(", "):i.join(", ")}function Pt(t,r){return t.replace(/function\s+(\w+)\s*\(([^)]*)\)/,(i,a,c)=>{const m=Ci(c,r);return r==="cpp"?`std::vector<Frame> ${a}(${m})`:r==="java"?`List<Frame> ${a}(${m})`:r==="csharp"?`List<Frame> ${a}(${m})`:`def ${a}(${m})`})}function Mi(t,r){let i=t.replace(/===/g,"==").replace(/!==/g,"!=").replace(/\btrue\b/g,"true").replace(/\bfalse\b/g,"false").replace(/\bnull\b/g,"null");return i=Pt(i,r),r==="cpp"&&(i=i.replace(/\bconst\b/g,"auto").replace(/\blet\b/g,"auto").replace(/\.length\b/g,".size()").replace(/\.push\(/g,".push_back(").replace(/Math\.floor\(/g,"std::floor(").replace(/\[\.\.\.(\w+)\]/g,"$1")),r==="java"&&(i=i.replace(/\bconst\b/g,"var").replace(/\blet\b/g,"var").replace(/\.length\b/g,".size()").replace(/\.push\(/g,".add(").replace(/Math\.floor\(/g,"(int)Math.floor(").replace(/\[\.\.\.(\w+)\]/g,"new ArrayList<>($1)")),r==="csharp"&&(i=i.replace(/\bconst\b/g,"var").replace(/\blet\b/g,"var").replace(/\.length\b/g,".Count").replace(/\.push\(/g,".Add(").replace(/Math\.floor\(/g,"(int)Math.Floor(").replace(/\[\.\.\.(\w+)\]/g,"new List<dynamic>($1)")),i}function qi(t){const r=/for\s*\(\s*(?:let|var)?\s*(\w+)\s*=\s*(.+?)\s*;\s*\1\s*([<>]=?)\s*(.+?)\s*;\s*\1(\+\+|--)\s*\)/,i=t.match(r);if(i){const y=i[1],f=i[2],d=i[3],j=i[4],T=i[5]==="--"?-1:1;if(d==="<")return`for ${y} in range(${f}, ${j}):`;if(d==="<=")return`for ${y} in range(${f}, ${j} + 1):`;if(d===">"||d===">="){const _=d===">="?`${j} - 1`:j;return`for ${y} in range(${f}, ${_}, ${T}):`}}const a=/while\s*\((.*)\)/,c=t.match(a);if(c)return`while ${c[1]}:`;const m=/if\s*\((.*)\)/,x=t.match(m);if(x)return`if ${x[1]}:`;const L=/else\s+if\s*\((.*)\)/,S=t.match(L);return S?`elif ${S[1]}:`:/^else\b/.test(t)?"else:":t}function Ft(t){let r=t.replace(/===/g,"==").replace(/!==/g,"!=").replace(/\bconst\b/g,"").replace(/\blet\b/g,"").replace(/;/g,"").replace(/\|\|/g,"or").replace(/&&/g,"and").replace(/\btrue\b/g,"True").replace(/\bfalse\b/g,"False").replace(/\bnull\b/g,"None").replace(/\.length\b/g,"__len__()").replace(/Math\.floor\(/g,"math.floor(").replace(/\.push\(/g,".append(");return r=Pt(r,"python"),r=qi(r),r=r.replace(/\b__len__\(\)\b/g,".__len__()").replace(/(\w+)\.__len__\(\)/g,"len($1)").replace(/\[\.\.\.(\w+)\]/g,"$1[:]"),r.trimEnd()}function Ri(t){const r=[];let i=0;for(const a of t){const c=a.trim();if(!c){r.push("");continue}const m=c.startsWith("}")||c.startsWith("};");m&&(i=Math.max(0,i-1));const x=c.replace(/^}\s*/,"").replace(/\s*{\s*$/,"").replace(/\s*}\s*$/,"").trim();if(!x)r.push("");else{const f=Ft(x),d="  ".repeat(Math.max(i,0));r.push(`${d}${f}`)}const L=(c.match(/{/g)||[]).length,S=(c.match(/}/g)||[]).length,y=L-S;!m&&y>0&&(i+=y)}return r}function Di(t,r){return r==="js"?t:r==="python"?Ft(t):Mi(t,r)}function $i(t,r){const i=ki(t);return{displayCode:(r==="python"?Ri(i):i.map(c=>{const m=c.match(/^\s*/)?.[0]||"",x=c.trim();return`${m}${Di(x,r)}`})).join(`
`),lineMap:i.map((c,m)=>({displayLine:m+1,jsExpr:c.trim(),frameType:"unknown",patchable:!1}))}}function Oi(t){const r=t.split(`
`);return{displayCode:t,lineMap:r.map((i,a)=>({displayLine:a+1,jsExpr:i.trim(),frameType:"unknown",patchable:!1}))}}function Bi(t,r,i,a={}){const c=!!a.preferSourceCode,m=!!a.disableExplicitTemplate;if(i==="js")return{displayCode:c?r:Tt(t,r),lineMap:[],fromCache:!0};const x=c?r:Tt(t,r),L=m?null:Ai(t,i),y=bi(`${Ti}:${t}:${i}:${c?"source":"template"}:${m?"no-explicit":"explicit"}:${L||x}`),f=dt.get(t,i,y);if(f)return{displayCode:f.displayCode,lineMap:f.lineMap,fromCache:!0};const d=L?Oi(L):$i(x,i);return dt.set({algorithmName:t,language:i,displayCode:d.displayCode,lineMap:d.lineMap,sourceHash:y,createdAt:Date.now()}),{...d,fromCache:!1}}function kt(t){dt.clearAlgorithm(t)}const Pi={class:"code-editor-panel"},Fi={class:"panel-header"},Ui={class:"header-actions"},zi=["innerHTML"],Hi={key:1,class:"error-message"},Gi={class:"error-detail"},Wi=1200,Qi=Xe({__name:"CodeEditorPanel",props:{algorithmCode:{},inputArray:{},highlightLine:{},isPlaying:{type:Boolean},usePseudoCode:{type:Boolean},pseudoCode:{},enableFullscreen:{type:Boolean},isFullscreen:{type:Boolean},algorithmKey:{}},emits:["codeChanged","applyCode","toggleFullscreen"],setup(t,{emit:r}){De.registerLanguage("javascript",li),De.registerLanguage("cpp",di),De.registerLanguage("java",ci),De.registerLanguage("python",ui),De.registerLanguage("csharp",pi);const i=t,a=r,c=P(i.algorithmCode.code),m=P(i.algorithmCode.fullCode||i.algorithmCode.code),x=P(i.algorithmCode.code),L=P(i.algorithmCode.fullCode||i.algorithmCode.code),S=P(""),y=P(),f=P(!1),d=P(!!i.algorithmCode.fullCode),j=P(!1),T=P(!1),_=P("js"),k=P(""),U=P(""),M=P("idle"),K=P("");let ne=0;function R(){M.value="synced",ne=Date.now()+Wi}function ae(){return M.value==="synced"&&Date.now()<ne}const X=Z(()=>i.algorithmKey||i.algorithmCode.title),ve=Z(()=>{switch(_.value){case"cpp":return"cpp";case"java":return"java";case"python":return"python";case"csharp":return"csharp";default:return"javascript"}}),se=Z(()=>d.value&&i.algorithmCode.fullCode?_.value==="js"?m.value:k.value:c.value),Ae=Z(()=>d.value&&i.algorithmCode.fullCode?se.value:c.value),Te=Z(()=>{if(!d.value||_.value==="js")return new Set;const v=new Set;return se.value.split(`
`).forEach((_e,ee)=>{v.add(ee)}),v});function Y(){if(!d.value||i.usePseudoCode){U.value="";return}U.value=_.value==="js"?m.value:k.value}function be(v){if(!i.usePseudoCode){if(v!=="js"&&i.algorithmCode.fullCode&&!d.value&&(d.value=!0),!d.value&&v==="js"){Y();return}if(v==="js"){M.value="idle",k.value="",Y();return}try{M.value="rendering";const A=Bi(X.value,m.value,v,{preferSourceCode:!0,disableExplicitTemplate:!0});k.value=A.displayCode,K.value=A.displayCode,ae()||(M.value=A.fromCache?"cached":"display-only"),Y()}catch{M.value="error",S.value="本地语言展示生成失败，已回退到 JavaScript 模式。",_.value="js"}}}const Be=Z(()=>{try{if(i.usePseudoCode&&i.pseudoCode)return i.pseudoCode.code.map((Fe,ze)=>`<div class="${ze===i.highlightLine?"code-line highlighted-line":"code-line"}"><span class="line-content">${Fe}</span></div>`).join("");const v=se.value;return De.highlight(v,{language:ve.value}).value.split(`
`).map((we,oe)=>{const Fe=!d.value&&i.highlightLine!==void 0&&oe===i.highlightLine,ze=d.value&&_.value!=="js"&&Te.value.has(oe);return`<div class="${["code-line",Fe?"highlighted-line":"",ze?"effective-line":""].filter(Boolean).join(" ")}"><span class="line-content">${we}</span></div>`}).join("")}catch{return Ae.value}});function ge(){S.value="",!(!d.value||i.usePseudoCode||_.value!=="js")&&(m.value=U.value,T.value=!0)}function Pe(v){const A=v instanceof Error?v.message:"未知语法错误";if(!(v instanceof Error))return A;const ee=(v.stack||"").match(/<anonymous>:(\d+):(\d+)/);if(!ee)return A;const we=ee[1],oe=ee[2];return`${A}（第 ${we} 行，第 ${oe} 列）`}function ke(v){try{new Function(v)}catch(A){return typeof window<"u"&&console.log("[CodeEditorPanel:syntax-failed]",{message:A instanceof Error?A.message:String(A),codePreview:v.split(`
`).slice(0,12).join(`
`)}),M.value="error",S.value=`JavaScript 语法错误：${Pe(A)}`,!1}return typeof window<"u"&&console.log("[CodeEditorPanel:syntax-ok]",{lineCount:v.split(`
`).length}),a("applyCode",v),T.value=!1,R(),!0}function Ce(){!d.value||i.usePseudoCode||_.value!=="js"||(m.value=U.value,ke(m.value))}function z(){i.usePseudoCode||!d.value||_.value==="js"&&(f.value=!0,Pr(()=>{y.value&&y.value.focus()}))}function de(){d.value=!d.value,f.value=!1,T.value=!1,j.value=d.value,d.value&&_.value!=="js"&&be(_.value),Y()}function he(){setTimeout(()=>{T.value&&Ce(),f.value=!1},100)}function ye(){c.value=x.value,m.value=L.value,S.value="",T.value=!1,_.value!=="js"&&(kt(X.value),be(_.value)),Y()}return Ie(()=>i.algorithmCode.code,v=>{c.value=v,x.value=v,S.value=""}),Ie(()=>i.algorithmCode.fullCode,v=>{v&&(m.value=v,L.value=v,_.value!=="js"&&(kt(X.value),be(_.value)))}),Ie(_,v=>{be(v)}),Ie(()=>i.isPlaying,v=>{if(_.value==="js"&&v){if(!i.algorithmCode.fullCode||j.value||!d.value)return;d.value=!1,f.value=!1,T.value=!1,Y()}}),Ie(()=>i.algorithmCode,v=>{v&&v.code&&(c.value=v.code,x.value=v.code,v.fullCode&&(m.value=v.fullCode,L.value=v.fullCode),_.value="js",k.value="",K.value="",M.value="idle",d.value=!!v.fullCode,j.value=!1,Y())},{immediate:!0,deep:!0}),qr(()=>{i.algorithmCode&&i.algorithmCode.code&&(c.value=i.algorithmCode.code,x.value=i.algorithmCode.code,i.algorithmCode.fullCode&&(m.value=i.algorithmCode.fullCode,L.value=i.algorithmCode.fullCode),d.value=!!i.algorithmCode.fullCode,j.value=!1),f.value=!1,Y()}),(v,A)=>{const _e=re("el-icon"),ee=re("el-button"),we=re("el-alert");return Q(),Se("div",Pi,[ie("div",Fi,[ie("h4",null,Oe(t.algorithmCode.title),1),ie("div",Ui,[t.algorithmCode.fullCode&&!t.usePseudoCode?(Q(),Le(gi,{key:0,modelValue:_.value,"onUpdate:modelValue":A[0]||(A[0]=oe=>_.value=oe)},null,8,["modelValue"])):me("",!0),t.enableFullscreen?(Q(),Le(ee,{key:1,size:"small",type:"primary",onClick:A[1]||(A[1]=oe=>a("toggleFullscreen")),title:t.isFullscreen?"退出全屏":"开启全屏"},{default:W(()=>[q(_e,null,{default:W(()=>[t.isFullscreen?(Q(),Le(pe(Rr),{key:0})):(Q(),Le(pe(Dr),{key:1}))]),_:1})]),_:1},8,["title"])):me("",!0),t.algorithmCode.fullCode&&_.value==="js"?(Q(),Le(ee,{key:2,size:"small",onClick:de,type:d.value?"primary":""},{default:W(()=>[lt(Oe(d.value?"简化版":"完整版"),1)]),_:1},8,["type"])):me("",!0),d.value&&f.value&&T.value&&_.value==="js"?(Q(),Le(ee,{key:3,size:"small",type:"success",onClick:Ce},{default:W(()=>[q(_e,null,{default:W(()=>[q(pe($r))]),_:1}),A[3]||(A[3]=lt(" 应用代码 ",-1))]),_:1})):me("",!0),q(ee,{size:"small",onClick:ye},{default:W(()=>[q(_e,null,{default:W(()=>[q(pe(Ct))]),_:1})]),_:1})])]),ie("div",{class:"editor-container",onClick:z},[f.value?me("",!0):(Q(),Se("div",{key:0,class:"code-highlight",innerHTML:Be.value},null,8,zi)),f.value&&d.value&&!t.usePseudoCode&&_.value==="js"?Or((Q(),Se("textarea",{key:1,"onUpdate:modelValue":A[2]||(A[2]=oe=>U.value=oe),class:"code-textarea",spellcheck:"false",onInput:ge,onBlur:he,ref_key:"textareaRef",ref:y},null,544)),[[Br,U.value]]):me("",!0)]),t.algorithmCode.fullCode&&d.value&&!t.usePseudoCode?(Q(),Le(mi,{key:0,status:M.value},null,8,["status"])):me("",!0),S.value?(Q(),Se("div",Hi,[q(we,{type:"error",closable:!1},{title:W(()=>[...A[4]||(A[4]=[ie("div",{class:"error-title"},"代码执行错误",-1)])]),default:W(()=>[ie("pre",Gi,Oe(S.value),1)]),_:1})])):me("",!0)])}}});export{Ji as C,Qi as _,Gr as a,zr as b,Ur as c,Vr as g,Fr as l,Hr as s,Wr as t,Ki as u};
