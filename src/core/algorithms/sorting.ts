import type { SortFrame, AlgorithmInfo } from '../types'

/**
 * 排序算法集合
 * 每个算法返回动画帧序列，不直接操作DOM
 */

// 冒泡排序
export function bubbleSort(arr: number[]): SortFrame[] {
  const frames: SortFrame[] = []
  const data = [...arr]
  const n = data.length
  
  frames.push({
    type: 'reset',
    indices: [],
    values: [...data],
    description: `开始冒泡排序，数组长度: ${n}`
  })
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      // 比较
      frames.push({
        type: 'compare',
        indices: [j, j + 1],
        values: [...data],
        description: `比较 arr[${j}]=${data[j]} 和 arr[${j + 1}]=${data[j + 1]}`
      })
      
      if ((data[j] ?? 0) > (data[j + 1] ?? 0)) {
        // 交换
        const bubbleTemp1 = data[j + 1] ?? 0
        const bubbleTemp2 = data[j] ?? 0
        data[j] = bubbleTemp1
        data[j + 1] = bubbleTemp2
        frames.push({
          type: 'swap',
          indices: [j, j + 1],
          values: [...data],
          description: `交换 arr[${j}] 和 arr[${j + 1}]`
        })
      }
    }
    // 标记已排序
    frames.push({
      type: 'sorted',
      indices: [n - 1 - i],
      values: [...data],
      description: `第 ${i + 1} 轮结束，arr[${n - 1 - i}]=${data[n - 1 - i]} 已就位`
    })
  }
  
  // 最后一个元素
  frames.push({
    type: 'sorted',
    indices: [0],
    values: [...data],
    description: '排序完成！'
  })
  
  return frames
}

// 选择排序
export function selectionSort(arr: number[]): SortFrame[] {
  const frames: SortFrame[] = []
  const data = [...arr]
  const n = data.length
  
  frames.push({
    type: 'reset',
    indices: [],
    values: [...data],
    description: `开始选择排序，数组长度: ${n}`
  })
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    
    frames.push({
      type: 'highlight',
      indices: [i],
      values: [...data],
      description: `第 ${i + 1} 轮：从位置 ${i} 开始寻找最小值`
    })
    
    for (let j = i + 1; j < n; j++) {
      frames.push({
        type: 'compare',
        indices: [minIdx, j],
        values: [...data],
        description: `比较当前最小值 arr[${minIdx}]=${data[minIdx]} 和 arr[${j}]=${data[j]}`
      })
      
      if ((data[j] ?? 0) < (data[minIdx] ?? 0)) {
        minIdx = j
        frames.push({
          type: 'highlight',
          indices: [minIdx],
          values: [...data],
          description: `更新最小值位置为 ${minIdx}，值为 ${data[minIdx]}`
        })
      }
    }
    
    if (minIdx !== i) {
      const selTemp1 = data[minIdx] ?? 0
      const selTemp2 = data[i] ?? 0
      data[i] = selTemp1
      data[minIdx] = selTemp2
      frames.push({
        type: 'swap',
        indices: [i, minIdx],
        values: [...data],
        description: `交换 arr[${i}] 和 arr[${minIdx}]`
      })
    }
    
    frames.push({
      type: 'sorted',
      indices: [i],
      values: [...data],
      description: `arr[${i}]=${data[i]} 已就位`
    })
  }
  
  frames.push({
    type: 'sorted',
    indices: [n - 1],
    values: [...data],
    description: '排序完成！'
  })
  
  return frames
}

// 插入排序
export function insertionSort(arr: number[]): SortFrame[] {
  const frames: SortFrame[] = []
  const data = [...arr]
  const n = data.length
  
  frames.push({
    type: 'reset',
    indices: [],
    values: [...data],
    description: `开始插入排序，数组长度: ${n}`
  })
  
  frames.push({
    type: 'sorted',
    indices: [0],
    values: [...data],
    description: `arr[0]=${data[0]} 作为初始有序区`
  })
  
  for (let i = 1; i < n; i++) {
    const key = data[i]
    let j = i - 1
    
    frames.push({
      type: 'highlight',
      indices: [i],
      values: [...data],
      description: `取出 arr[${i}]=${key} 准备插入有序区`
    })
    
    while (j >= 0 && (data[j] ?? 0) > (key ?? 0)) {
      frames.push({
        type: 'compare',
        indices: [j, j + 1],
        values: [...data],
        description: `比较 arr[${j}]=${data[j]} > ${key}，需要后移`
      })
      
      data[j + 1] = data[j] ?? 0
      frames.push({
        type: 'set',
        indices: [j + 1],
        values: [...data],
        description: `arr[${j + 1}] = arr[${j}] = ${data[j]}`
      })
      j--
    }
    
    data[j + 1] = key ?? 0
    frames.push({
      type: 'set',
      indices: [j + 1],
      values: [...data],
      description: `将 ${key} 插入到位置 ${j + 1}`
    })
    
    frames.push({
      type: 'sorted',
      indices: Array.from({ length: i + 1 }, (_, idx) => idx),
      values: [...data],
      description: `前 ${i + 1} 个元素已有序`
    })
  }
  
  return frames
}

// 快速排序
export function quickSort(arr: number[]): SortFrame[] {
  const frames: SortFrame[] = []
  const data = [...arr]
  
  frames.push({
    type: 'reset',
    indices: [],
    values: [...data],
    description: `开始快速排序，数组长度: ${data.length}`
  })
  
  const sortedIndices = new Set<number>()
  
  function partition(low: number, high: number): number {
    const pivot = data[high]
    
    frames.push({
      type: 'pivot',
      indices: [high],
      values: [...data],
      description: `选择 arr[${high}]=${pivot} 作为基准`
    })
    
    let i = low - 1
    
    for (let j = low; j < high; j++) {
      frames.push({
        type: 'compare',
        indices: [j, high],
        values: [...data],
        description: `比较 arr[${j}]=${data[j]} 和基准 ${pivot}`
      })
      
      if ((data[j] ?? 0) <= (pivot ?? 0)) {
        i++
        if (i !== j) {
          const temp1 = data[j] ?? 0
          const temp2 = data[i] ?? 0
          data[i] = temp1
          data[j] = temp2
          frames.push({
            type: 'swap',
            indices: [i, j],
            values: [...data],
            description: `arr[${j}]=${data[j]} <= ${pivot}，交换 arr[${i}] 和 arr[${j}]`
          })
        }
      }
    }
    
    const pivotTemp = data[high] ?? 0
    data[high] = data[i + 1] ?? 0
    data[i + 1] = pivotTemp
    frames.push({
      type: 'swap',
      indices: [i + 1, high],
      values: [...data],
      description: `将基准 ${pivot} 放到正确位置 ${i + 1}`
    })
    
    sortedIndices.add(i + 1)
    frames.push({
      type: 'sorted',
      indices: [i + 1],
      values: [...data],
      description: `arr[${i + 1}]=${data[i + 1]} 已就位`
    })
    
    return i + 1
  }
  
  function quickSortRecursive(low: number, high: number) {
    if (low < high) {
      frames.push({
        type: 'partition',
        indices: Array.from({ length: high - low + 1 }, (_, i) => low + i),
        values: [...data],
        description: `处理子数组 [${low}..${high}]`
      })
      
      const pi = partition(low, high)
      quickSortRecursive(low, pi - 1)
      quickSortRecursive(pi + 1, high)
    } else if (low === high) {
      sortedIndices.add(low)
      frames.push({
        type: 'sorted',
        indices: [low],
        values: [...data],
        description: `arr[${low}]=${data[low]} 已就位（单元素子数组）`
      })
    }
  }
  
  quickSortRecursive(0, data.length - 1)
  
  frames.push({
    type: 'sorted',
    indices: Array.from({ length: data.length }, (_, i) => i),
    values: [...data],
    description: '排序完成！'
  })
  
  return frames
}

// 堆排序
export function heapSort(arr: number[]): SortFrame[] {
  const frames: SortFrame[] = []
  const data = [...arr]
  const n = data.length
  
  frames.push({
    type: 'reset',
    indices: [],
    values: [...data],
    description: `开始堆排序，数组长度: ${n}`
  })
  
  // 堆化
  function heapify(size: number, i: number) {
    let largest = i
    const left = 2 * i + 1
    const right = 2 * i + 2
    
    if (left < size) {
      frames.push({
        type: 'compare',
        indices: [largest, left],
        values: [...data],
        description: `比较节点 arr[${largest}]=${data[largest]} 和左子节点 arr[${left}]=${data[left]}`
      })
      if ((data[left] ?? 0) > (data[largest] ?? 0)) {
        largest = left
      }
    }
    
    if (right < size) {
      frames.push({
        type: 'compare',
        indices: [largest, right],
        values: [...data],
        description: `比较节点 arr[${largest}]=${data[largest]} 和右子节点 arr[${right}]=${data[right]}`
      })
      if ((data[right] ?? 0) > (data[largest] ?? 0)) {
        largest = right
      }
    }
    
    if (largest !== i) {
      const heapTemp1 = data[largest] ?? 0
      const heapTemp2 = data[i] ?? 0
      data[i] = heapTemp1
      data[largest] = heapTemp2
      frames.push({
        type: 'swap',
        indices: [i, largest],
        values: [...data],
        description: `交换 arr[${i}] 和 arr[${largest}]`
      })
      heapify(size, largest)
    }
  }
  
  // 建堆
  frames.push({
    type: 'highlight',
    indices: [],
    values: [...data],
    description: '开始建立最大堆'
  })
  
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i)
  }
  
  frames.push({
    type: 'highlight',
    indices: [],
    values: [...data],
    description: '最大堆建立完成，开始排序'
  })
  
  // 排序
  for (let i = n - 1; i > 0; i--) {
    const sortTemp1 = data[i] ?? 0
    const sortTemp2 = data[0] ?? 0
    data[0] = sortTemp1
    data[i] = sortTemp2
    frames.push({
      type: 'swap',
      indices: [0, i],
      values: [...data],
      description: `将堆顶 ${data[i]} 与 arr[${i}] 交换`
    })
    
    frames.push({
      type: 'sorted',
      indices: [i],
      values: [...data],
      description: `arr[${i}]=${data[i]} 已就位`
    })
    
    heapify(i, 0)
  }
  
  frames.push({
    type: 'sorted',
    indices: [0],
    values: [...data],
    description: '排序完成！'
  })
  
  return frames
}

// 希尔排序
export function shellSort(arr: number[]): SortFrame[] {
  const frames: SortFrame[] = []
  const data = [...arr]
  const n = data.length
  
  frames.push({
    type: 'reset',
    indices: [],
    values: [...data],
    description: `开始希尔排序，数组长度: ${n}`
  })
  
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    frames.push({
      type: 'highlight',
      indices: [],
      values: [...data],
      description: `当前增量 gap = ${gap}`
    })
    
    for (let i = gap; i < n; i++) {
      const temp = data[i]
      let j = i
      
      frames.push({
        type: 'highlight',
        indices: [i],
        values: [...data],
        description: `取出 arr[${i}]=${temp}`
      })
      
      while (j >= gap && (data[j - gap] ?? 0) > (temp ?? 0)) {
        frames.push({
          type: 'compare',
          indices: [j - gap, j],
          values: [...data],
          description: `比较 arr[${j - gap}]=${data[j - gap]} > ${temp}`
        })
        
        data[j] = data[j - gap] ?? 0
        frames.push({
          type: 'set',
          indices: [j],
          values: [...data],
          description: `arr[${j}] = arr[${j - gap}] = ${data[j]}`
        })
        j -= gap
      }
      
      data[j] = temp ?? 0
      frames.push({
        type: 'set',
        indices: [j],
        values: [...data],
        description: `将 ${temp} 插入到位置 ${j}`
      })
    }
  }
  
  frames.push({
    type: 'sorted',
    indices: Array.from({ length: n }, (_, i) => i),
    values: [...data],
    description: '排序完成！'
  })
  
  return frames
}

// 归并排序
export function mergeSort(arr: number[]): SortFrame[] {
  const frames: SortFrame[] = []
  const data = [...arr]
  
  frames.push({
    type: 'reset',
    indices: [],
    values: [...data],
    description: `开始归并排序，数组长度: ${data.length}`
  })
  
  function merge(left: number, mid: number, right: number) {
    const leftArr = data.slice(left, mid + 1)
    const rightArr = data.slice(mid + 1, right + 1)
    
    frames.push({
      type: 'partition',
      indices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
      values: [...data],
      description: `合并 [${left}..${mid}] 和 [${mid + 1}..${right}]`
    })
    
    let i = 0, j = 0, k = left
    
    while (i < leftArr.length && j < rightArr.length) {
      frames.push({
        type: 'compare',
        indices: [left + i, mid + 1 + j],
        values: [...data],
        description: `比较 ${leftArr[i]} 和 ${rightArr[j]}`
      })
      
      if ((leftArr[i] ?? 0) <= (rightArr[j] ?? 0)) {
        data[k] = leftArr[i] ?? 0
        i++
      } else {
        data[k] = rightArr[j] ?? 0
        j++
      }
      
      frames.push({
        type: 'merge',
        indices: [k],
        values: [...data],
        description: `放入 ${data[k]} 到位置 ${k}`
      })
      k++
    }
    
    while (i < leftArr.length) {
      data[k] = leftArr[i] ?? 0
      frames.push({
        type: 'merge',
        indices: [k],
        values: [...data],
        description: `放入剩余元素 ${data[k]} 到位置 ${k}`
      })
      i++
      k++
    }
    
    while (j < rightArr.length) {
      data[k] = rightArr[j] ?? 0
      frames.push({
        type: 'merge',
        indices: [k],
        values: [...data],
        description: `放入剩余元素 ${data[k]} 到位置 ${k}`
      })
      j++
      k++
    }
  }
  
  function mergeSortRecursive(left: number, right: number) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2)
      
      frames.push({
        type: 'partition',
        indices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
        values: [...data],
        description: `分割 [${left}..${right}] 为 [${left}..${mid}] 和 [${mid + 1}..${right}]`
      })
      
      mergeSortRecursive(left, mid)
      mergeSortRecursive(mid + 1, right)
      merge(left, mid, right)
    }
  }
  
  mergeSortRecursive(0, data.length - 1)
  
  frames.push({
    type: 'sorted',
    indices: Array.from({ length: data.length }, (_, i) => i),
    values: [...data],
    description: '排序完成！'
  })
  
  return frames
}

// 算法信息
export const sortingAlgorithms: Record<string, { 
  fn: (arr: number[]) => SortFrame[], 
  info: AlgorithmInfo 
}> = {
  bubble: {
    fn: bubbleSort,
    info: {
      name: '冒泡排序',
      nameEn: 'Bubble Sort',
      description: '重复遍历数组，比较相邻元素并交换，直到没有需要交换的元素',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      stable: true
    }
  },
  selection: {
    fn: selectionSort,
    info: {
      name: '选择排序',
      nameEn: 'Selection Sort',
      description: '每次从未排序部分选择最小元素，放到已排序部分末尾',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      stable: false
    }
  },
  insertion: {
    fn: insertionSort,
    info: {
      name: '插入排序',
      nameEn: 'Insertion Sort',
      description: '将未排序元素插入到已排序部分的正确位置',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      stable: true
    }
  },
  quick: {
    fn: quickSort,
    info: {
      name: '快速排序',
      nameEn: 'Quick Sort',
      description: '选择基准元素，将数组分为小于和大于基准的两部分，递归排序',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(log n)',
      stable: false
    }
  },
  heap: {
    fn: heapSort,
    info: {
      name: '堆排序',
      nameEn: 'Heap Sort',
      description: '利用堆数据结构，反复取出堆顶最大元素',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
      stable: false
    }
  },
  shell: {
    fn: shellSort,
    info: {
      name: '希尔排序',
      nameEn: 'Shell Sort',
      description: '插入排序的改进版，使用递减的增量序列',
      timeComplexity: 'O(n log n) ~ O(n²)',
      spaceComplexity: 'O(1)',
      stable: false
    }
  },
  merge: {
    fn: mergeSort,
    info: {
      name: '归并排序',
      nameEn: 'Merge Sort',
      description: '分治法，将数组分成两半递归排序，然后合并',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      stable: true
    }
  }
}
