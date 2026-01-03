// @ts-nocheck
import type { LinearFrame, AlgorithmInfo } from '../types'


/**
 * 线性表操作算法
 */

// 顺序表插入
export function sequentialInsert(arr: any[], index: number, value: any): LinearFrame[] {
  const frames: LinearFrame[] = []
  const data = [...arr]
  
  frames.push({
    type: 'reset',
    index: -1,
    description: `开始在位置 ${index} 插入元素 ${value}`,
    data: { array: [...data] }
  })
  
  // 检查插入位置是否合法
  if (index < 0 || index > data.length) {
    frames.push({
      type: 'highlight',
      index: -1,
      description: `插入位置 ${index} 不合法！有效范围: 0 ~ ${data.length}`,
      data: { array: [...data], error: true }
    })
    return frames
  }
  
  // 从后向前移动元素
  for (let i = data.length - 1; i >= index; i--) {
    frames.push({
      type: 'highlight',
      index: i,
      description: `准备将 arr[${i}]=${data[i]} 后移到 arr[${i + 1}]`,
      data: { array: [...data] }
    })
    
    frames.push({
      type: 'move',
      index: i,
      value: data[i],
      description: `arr[${i + 1}] = arr[${i}] = ${data[i]}`,
      data: { array: [...data], moveFrom: i, moveTo: i + 1 }
    })
  }
  
  // 插入新元素
  data.splice(index, 0, value)
  frames.push({
    type: 'insert',
    index: index,
    value: value,
    description: `在位置 ${index} 插入元素 ${value}`,
    data: { array: [...data] }
  })
  
  frames.push({
    type: 'reset',
    index: -1,
    description: `插入完成！数组长度: ${data.length}`,
    data: { array: [...data] }
  })
  
  return frames
}

// 顺序表删除
export function sequentialDelete(arr: any[], index: number): LinearFrame[] {
  const frames: LinearFrame[] = []
  const data = [...arr]
  
  frames.push({
    type: 'reset',
    index: -1,
    description: `开始删除位置 ${index} 的元素`,
    data: { array: [...data] }
  })
  
  // 检查删除位置是否合法
  if (index < 0 || index >= data.length) {
    frames.push({
      type: 'highlight',
      index: -1,
      description: `删除位置 ${index} 不合法！有效范围: 0 ~ ${data.length - 1}`,
      data: { array: [...data], error: true }
    })
    return frames
  }
  
  const deletedValue = data[index]
  
  frames.push({
    type: 'highlight',
    index: index,
    description: `找到要删除的元素 arr[${index}]=${deletedValue}`,
    data: { array: [...data] }
  })
  
  frames.push({
    type: 'delete',
    index: index,
    value: deletedValue,
    description: `删除元素 ${deletedValue}`,
    data: { array: [...data], deleting: index }
  })
  
  // 从前向后移动元素
  for (let i = index; i < data.length - 1; i++) {
    frames.push({
      type: 'move',
      index: i,
      value: data[i + 1],
      description: `arr[${i}] = arr[${i + 1}] = ${data[i + 1]}`,
      data: { array: [...data], moveFrom: i + 1, moveTo: i }
    })
  }
  
  data.splice(index, 1)
  frames.push({
    type: 'reset',
    index: -1,
    description: `删除完成！返回值: ${deletedValue}，数组长度: ${data.length}`,
    data: { array: [...data] }
  })
  
  return frames
}

// 顺序表查找
export function sequentialSearch(arr: any[], target: any): LinearFrame[] {
  const frames: LinearFrame[] = []
  const data = [...arr]
  
  frames.push({
    type: 'reset',
    index: -1,
    description: `开始查找元素 ${target}`,
    data: { array: [...data], target }
  })
  
  for (let i = 0; i < data.length; i++) {
    frames.push({
      type: 'search',
      index: i,
      description: `比较 arr[${i}]=${data[i]} 与目标值 ${target}`,
      data: { array: [...data], comparing: i }
    })
    
    if (data[i] === target) {
      frames.push({
        type: 'highlight',
        index: i,
        description: `找到目标！arr[${i}]=${target}`,
        data: { array: [...data], found: i }
      })
      return frames
    }
  }
  
  frames.push({
    type: 'reset',
    index: -1,
    description: `未找到元素 ${target}`,
    data: { array: [...data], notFound: true }
  })
  
  return frames
}

// 链表节点
export interface LinkedListNode {
  id: string
  value: any
  next: string | null
}

// 链表逆置
export function linkedListReverse(nodes: LinkedListNode[]): LinearFrame[] {
  const frames: LinearFrame[] = []
  
  if (nodes.length === 0) {
    frames.push({
      type: 'reset',
      index: -1,
      description: '链表为空，无需逆置',
      data: { nodes: [] }
    })
    return frames
  }
  
  // 创建节点副本
  const nodesCopy = nodes.map(n => ({ ...n }))
  
  frames.push({
    type: 'reset',
    index: -1,
    description: '开始链表逆置 - 使用三指针法（prev、curr、next）',
    data: { nodes: nodesCopy.map(n => ({ ...n })) }
  })
  
  // 使用三指针法逆置
  let prev: string | null = null
  let curr: string | null = nodesCopy[0]?.id ?? null
  let step = 1
  
  while (curr !== null) {
    const currNode = nodesCopy.find(n => n.id === curr)!
    const nextId = currNode.next
    const nextValue = nextId ? nodesCopy.find(n => n.id === nextId)?.value : null
    const prevValue = prev ? nodesCopy.find(n => n.id === prev)?.value : null
    
    frames.push({
      type: 'highlight',
      index: nodesCopy.findIndex(n => n.id === curr),
      description: `步骤${step}: prev=${prevValue ?? 'NULL'}, curr=${currNode.value}, next=${nextValue ?? 'NULL'} - 保存curr的next指针`,
      data: { 
        nodes: nodesCopy.map(n => ({ ...n })),
        current: curr,
        prev: prev
      }
    })
    
    // 修改指针
    currNode.next = prev
    
    frames.push({
      type: 'move',
      index: nodesCopy.findIndex(n => n.id === curr),
      description: `步骤${step}: 修改指针 - 将节点${currNode.value}的next指针从${nextValue ?? 'NULL'}改为${prevValue ?? 'NULL'}（反转）`,
      data: { 
        nodes: nodesCopy.map(n => ({ ...n })),
        modified: curr
      }
    })
    
    frames.push({
      type: 'highlight',
      index: nodesCopy.findIndex(n => n.id === curr),
      description: `步骤${step}: 移动指针 - prev向前移动到${currNode.value}, curr向前移动到${nextValue ?? 'NULL'}`,
      data: { 
        nodes: nodesCopy.map(n => ({ ...n })),
        current: curr
      }
    })
    
    prev = curr
    curr = nextId!
    step++
  }
  
  frames.push({
    type: 'reset',
    index: -1,
    description: '链表逆置完成！新的头节点为prev指针所指向的节点',
    data: { nodes: nodesCopy.map(n => ({ ...n })), reversed: true }
  })
  
  return frames
}

// 链表插入
export function linkedListInsert(nodes: LinkedListNode[], position: number, value: any): LinearFrame[] {
  const frames: LinearFrame[] = []
  const nodesCopy = nodes.map(n => ({ ...n }))
  
  frames.push({
    type: 'reset',
    index: -1,
    description: `开始在位置 ${position} 插入节点 ${value} - 需要找到前驱节点并修改指针`,
    data: { nodes: nodesCopy.map(n => ({ ...n })) }
  })
  
  if (position < 0 || position > nodesCopy.length) {
    frames.push({
      type: 'highlight',
      index: -1,
      description: `插入位置 ${position} 不合法！有效范围: 0 ~ ${nodesCopy.length}`,
      data: { nodes: nodesCopy.map(n => ({ ...n })), error: true }
    })
    return frames
  }
  
  // 创建新节点
  const newNodeId = `node-${Date.now()}`
  const newNode: LinkedListNode = {
    id: newNodeId,
    value: value,
    next: null
  }
  
  if (position === 0) {
    // 头插
    const firstValue = nodesCopy.length > 0 ? nodesCopy[0]!.value : 'NULL'
    frames.push({
      type: 'insert',
      index: 0,
      value: value,
      description: `创建新节点 ${value}，其next指针初始化为NULL`,
      data: { nodes: nodesCopy.map(n => ({ ...n })), newNode: newNodeId }
    })
    
    newNode.next = nodesCopy.length > 0 ? nodesCopy[0]!.id : null
    nodesCopy.unshift(newNode)
    
    frames.push({
      type: 'reset',
      index: -1,
      description: `头插法：将新节点${value}的next指针指向原头节点${firstValue}，更新head指针指向新节点${value}`,
      data: { nodes: nodesCopy.map(n => ({ ...n })) }
    })
  } else {
    // 找到前驱节点
    let prev = nodesCopy[0]
    frames.push({
      type: 'highlight',
      index: 0,
      description: `从头节点${prev.value}开始遍历，寻找位置${position}的前驱节点（第${position - 1}个节点）`,
      data: { nodes: nodesCopy.map(n => ({ ...n })), current: prev.id }
    })
    
    for (let i = 1; i < position; i++) {
      const nextNode = nodesCopy.find(n => n.id === prev.next)
      if (nextNode) {
        frames.push({
          type: 'highlight',
          index: i,
          description: `沿着next指针移动：从节点${prev.value}移动到节点${nextNode.value}`,
          data: { nodes: nodesCopy.map(n => ({ ...n })), current: nextNode.id }
        })
        prev = nextNode
      }
    }
    
    const nextValue = prev!.next ? nodesCopy.find(n => n.id === prev!.next)?.value : 'NULL'
    frames.push({
      type: 'highlight',
      index: position - 1,
      description: `找到前驱节点${prev!.value}，其next指针当前指向${nextValue}`,
      data: { nodes: nodesCopy.map(n => ({ ...n })), current: prev!.id }
    })
    
    // 插入新节点
    frames.push({
      type: 'insert',
      index: position,
      value: value,
      description: `创建新节点${value}，准备插入到节点${prev!.value}之后`,
      data: { nodes: nodesCopy.map(n => ({ ...n })), newNode: newNodeId }
    })
    
    newNode.next = prev!.next
    frames.push({
      type: 'move',
      index: position,
      description: `步骤1：将新节点${value}的next指针指向${nextValue}（即原来${prev!.value}.next所指向的节点）`,
      data: { nodes: nodesCopy.map(n => ({ ...n })), newNode: newNodeId }
    })
    
    prev!.next = newNodeId
    nodesCopy.splice(position, 0, newNode)
    
    frames.push({
      type: 'reset',
      index: -1,
      description: `步骤2：将前驱节点${prev!.value}的next指针修改为指向新节点${value}，插入完成`,
      data: { nodes: nodesCopy.map(n => ({ ...n })) }
    })
  }
  
  return frames
}

// 链表删除
export function linkedListDelete(nodes: LinkedListNode[], position: number): LinearFrame[] {
  const frames: LinearFrame[] = []
  const nodesCopy = nodes.map(n => ({ ...n }))
  
  frames.push({
    type: 'reset',
    index: -1,
    description: `开始删除位置 ${position} 的节点 - 需要找到前驱节点并修改其next指针`,
    data: { nodes: nodesCopy.map(n => ({ ...n })) }
  })
  
  if (position < 0 || position >= nodesCopy.length) {
    frames.push({
      type: 'highlight',
      index: -1,
      description: `删除位置 ${position} 不合法！有效范围: 0 ~ ${nodesCopy.length - 1}`,
      data: { nodes: nodesCopy.map(n => ({ ...n })), error: true }
    })
    return frames
  }
  
  if (position === 0) {
    // 删除头节点
    const deletedValue = nodesCopy[0]!.value
    const nextValue = nodesCopy[0]!.next ? nodesCopy.find(n => n.id === nodesCopy[0]!.next)?.value : 'NULL'
    
    frames.push({
      type: 'highlight',
      index: 0,
      description: `要删除的是头节点${deletedValue}，其next指针指向${nextValue}`,
      data: { nodes: nodesCopy.map(n => ({ ...n })), deleting: nodesCopy[0]!.id }
    })
    
    frames.push({
      type: 'delete',
      index: 0,
      value: deletedValue,
      description: `将head指针从${deletedValue}移动到${nextValue}，释放节点${deletedValue}的内存`,
      data: { nodes: nodesCopy.map(n => ({ ...n })), deleting: nodesCopy[0]!.id }
    })
    
    nodesCopy.shift()
    
    frames.push({
      type: 'reset',
      index: -1,
      description: `删除头节点${deletedValue}完成，新的头节点为${nextValue}`,
      data: { nodes: nodesCopy.map(n => ({ ...n })) }
    })
  } else {
    // 找到前驱节点
    let prev = nodesCopy[0]
    frames.push({
      type: 'highlight',
      index: 0,
      description: `从头节点${prev.value}开始遍历，寻找位置${position}的前驱节点（第${position - 1}个节点）`,
      data: { nodes: nodesCopy.map(n => ({ ...n })), current: prev.id }
    })
    
    for (let i = 1; i < position; i++) {
      const nextNode = nodesCopy.find(n => n.id === prev.next)
      if (nextNode) {
        frames.push({
          type: 'highlight',
          index: i,
          description: `沿着next指针移动：从节点${prev.value}移动到节点${nextNode.value}`,
          data: { nodes: nodesCopy.map(n => ({ ...n })), current: nextNode.id }
        })
        prev = nextNode
      }
    }
    
    const toDelete = nodesCopy.find(n => n.id === prev!.next)
    if (!toDelete) return frames
    
    const afterDelete = toDelete.next ? nodesCopy.find(n => n.id === toDelete.next)?.value : 'NULL'
    
    frames.push({
      type: 'highlight',
      index: position,
      description: `找到前驱节点${prev!.value}，其next指针指向要删除的节点${toDelete.value}`,
      data: { nodes: nodesCopy.map(n => ({ ...n })), deleting: toDelete.id }
    })
    
    frames.push({
      type: 'delete',
      index: position,
      value: toDelete.value,
      description: `准备删除节点${toDelete.value}，该节点的next指针指向${afterDelete}`,
      data: { nodes: nodesCopy.map(n => ({ ...n })), deleting: toDelete.id }
    })
    
    prev!.next = toDelete.next
    nodesCopy.splice(position, 1)
    
    frames.push({
      type: 'reset',
      index: -1,
      description: `将前驱节点${prev!.value}的next指针修改为指向${afterDelete}，跳过并释放节点${toDelete.value}`,
      data: { nodes: nodesCopy.map(n => ({ ...n })) }
    })
  }
  
  return frames
}

// 算法信息
export const linearAlgorithms = {
  insert: {
    name: '顺序表插入',
    description: '在指定位置插入元素，需要移动后续所有元素',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },
  delete: {
    name: '顺序表删除',
    description: '删除指定位置的元素，需要移动后续所有元素',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },
  search: {
    name: '顺序查找',
    description: '从头到尾依次比较，直到找到目标或遍历完成',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },
  reverse: {
    name: '链表逆置',
    description: '使用三指针法原地逆置单链表',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },
  linkedInsert: {
    name: '链表插入',
    description: '在指定位置插入新节点，只需修改指针',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },
  linkedDelete: {
    name: '链表删除',
    description: '删除指定位置的节点，只需修改指针',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  }
}
