import type { StackFrame, QueueFrame } from '../types'

/**
 * 栈操作算法
 */

// 栈入栈
export function stackPush(stack: any[], value: any): StackFrame[] {
  const frames: StackFrame[] = []
  const data = [...stack]
  
  frames.push({
    type: 'reset',
    description: `准备将元素 ${value} 入栈`,
    data: { stack: [...data] }
  })
  
  frames.push({
    type: 'highlight',
    description: `栈顶位置: ${data.length}`,
    data: { stack: [...data], topIndex: data.length }
  })
  
  data.push(value)
  frames.push({
    type: 'push',
    value: value,
    description: `元素 ${value} 入栈成功，栈顶 = ${data.length - 1}`,
    data: { stack: [...data], pushed: value }
  })
  
  return frames
}

// 栈出栈
export function stackPop(stack: any[]): StackFrame[] {
  const frames: StackFrame[] = []
  const data = [...stack]
  
  frames.push({
    type: 'reset',
    description: '准备出栈操作',
    data: { stack: [...data] }
  })
  
  if (data.length === 0) {
    frames.push({
      type: 'highlight',
      description: '栈为空，无法出栈！',
      data: { stack: [...data], error: true }
    })
    return frames
  }
  
  frames.push({
    type: 'peek',
    value: data[data.length - 1],
    description: `栈顶元素: ${data[data.length - 1]}`,
    data: { stack: [...data], topIndex: data.length - 1 }
  })
  
  const popped = data.pop()
  frames.push({
    type: 'pop',
    value: popped,
    description: `元素 ${popped} 出栈成功`,
    data: { stack: [...data], popped }
  })
  
  return frames
}

// 栈查看栈顶
export function stackPeek(stack: any[]): StackFrame[] {
  const frames: StackFrame[] = []
  const data = [...stack]
  
  frames.push({
    type: 'reset',
    description: '查看栈顶元素',
    data: { stack: [...data] }
  })
  
  if (data.length === 0) {
    frames.push({
      type: 'highlight',
      description: '栈为空！',
      data: { stack: [...data], error: true }
    })
    return frames
  }
  
  frames.push({
    type: 'peek',
    value: data[data.length - 1],
    description: `栈顶元素: ${data[data.length - 1]}（不出栈）`,
    data: { stack: [...data], topIndex: data.length - 1 }
  })
  
  return frames
}

/**
 * 队列操作算法
 */

// 队列入队
export function queueEnqueue(queue: any[], value: any): QueueFrame[] {
  const frames: QueueFrame[] = []
  const data = [...queue]
  
  frames.push({
    type: 'reset',
    description: `准备将元素 ${value} 入队`,
    data: { queue: [...data] }
  })
  
  frames.push({
    type: 'highlight',
    position: 'rear',
    description: `队尾位置: ${data.length}`,
    data: { queue: [...data], rearIndex: data.length }
  })
  
  data.push(value)
  frames.push({
    type: 'enqueue',
    value: value,
    position: 'rear',
    description: `元素 ${value} 入队成功`,
    data: { queue: [...data], enqueued: value }
  })
  
  return frames
}

// 队列出队
export function queueDequeue(queue: any[]): QueueFrame[] {
  const frames: QueueFrame[] = []
  const data = [...queue]
  
  frames.push({
    type: 'reset',
    description: '准备出队操作',
    data: { queue: [...data] }
  })
  
  if (data.length === 0) {
    frames.push({
      type: 'highlight',
      description: '队列为空，无法出队！',
      data: { queue: [...data], error: true }
    })
    return frames
  }
  
  frames.push({
    type: 'peek',
    value: data[0],
    position: 'front',
    description: `队首元素: ${data[0]}`,
    data: { queue: [...data], frontIndex: 0 }
  })
  
  const dequeued = data.shift()
  frames.push({
    type: 'dequeue',
    value: dequeued,
    position: 'front',
    description: `元素 ${dequeued} 出队成功`,
    data: { queue: [...data], dequeued }
  })
  
  return frames
}

// 队列查看队首
export function queuePeek(queue: any[]): QueueFrame[] {
  const frames: QueueFrame[] = []
  const data = [...queue]
  
  frames.push({
    type: 'reset',
    description: '查看队首元素',
    data: { queue: [...data] }
  })
  
  if (data.length === 0) {
    frames.push({
      type: 'highlight',
      description: '队列为空！',
      data: { queue: [...data], error: true }
    })
    return frames
  }
  
  frames.push({
    type: 'peek',
    value: data[0],
    position: 'front',
    description: `队首元素: ${data[0]}（不出队）`,
    data: { queue: [...data], frontIndex: 0 }
  })
  
  return frames
}

// 算法信息
export const stackQueueAlgorithms = {
  stack: {
    push: {
      name: '入栈 Push',
      description: '将元素压入栈顶',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)'
    },
    pop: {
      name: '出栈 Pop',
      description: '弹出栈顶元素',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)'
    },
    peek: {
      name: '查看栈顶 Peek',
      description: '查看栈顶元素但不弹出',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)'
    }
  },
  queue: {
    enqueue: {
      name: '入队 Enqueue',
      description: '将元素加入队尾',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)'
    },
    dequeue: {
      name: '出队 Dequeue',
      description: '移除队首元素',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)'
    },
    peek: {
      name: '查看队首 Peek',
      description: '查看队首元素但不移除',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)'
    }
  }
}
