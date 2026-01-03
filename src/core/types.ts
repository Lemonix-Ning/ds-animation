/**
 * 动画帧类型定义
 * 采用命令模式，算法执行产生帧序列，播放器消费帧序列
 */

// 基础动画帧接口
export interface AnimationFrame {
  type: string
  description: string
  data?: any
}

// 排序算法帧类型
export interface SortFrame extends AnimationFrame {
  type: 'compare' | 'swap' | 'set' | 'sorted' | 'pivot' | 'partition' | 'merge' | 'highlight' | 'reset'
  indices: number[]
  values?: number[]
  description: string
}

// 线性表操作帧
export interface LinearFrame extends AnimationFrame {
  type: 'insert' | 'delete' | 'search' | 'highlight' | 'move' | 'reset'
  index: number
  value?: any
  description: string
}

// 栈操作帧
export interface StackFrame extends AnimationFrame {
  type: 'push' | 'pop' | 'peek' | 'highlight' | 'reset'
  value?: any
  description: string
}

// 队列操作帧
export interface QueueFrame extends AnimationFrame {
  type: 'enqueue' | 'dequeue' | 'peek' | 'highlight' | 'reset'
  value?: any
  position?: 'front' | 'rear'
  description: string
}

// KMP算法帧
export interface KMPFrame extends AnimationFrame {
  type: 'compare' | 'match' | 'mismatch' | 'shift' | 'next-calc' | 'complete'
  textIndex: number
  patternIndex: number
  nextArray?: number[]
  description: string
}

// 树操作帧
export interface TreeFrame extends AnimationFrame {
  type: 'visit' | 'insert' | 'delete' | 'highlight' | 'connect' | 'create-node' | 'merge' | 'reset'
  nodeId: string | number
  parentId?: string | number
  value?: any
  position?: 'left' | 'right'
  description: string
}

// 图操作帧
export interface GraphFrame extends AnimationFrame {
  type: 'visit-node' | 'visit-edge' | 'select-edge' | 'update-distance' | 'highlight' | 'reset'
  nodeId?: string | number
  edgeId?: string
  fromNode?: string | number
  toNode?: string | number
  weight?: number
  distance?: number
  description: string
}

// 查找操作帧
export interface SearchFrame extends AnimationFrame {
  type: 'compare' | 'found' | 'not-found' | 'probe' | 'insert' | 'highlight' | 'reset'
  index?: number
  key?: any
  description: string
}

// 播放器状态
export type PlayerStatus = 'idle' | 'playing' | 'paused' | 'finished'

// 播放器配置
export interface PlayerConfig {
  speed: number // 动画速度 (ms)
  autoPlay: boolean
}

// 算法信息
export interface AlgorithmInfo {
  name: string
  nameEn: string
  description: string
  timeComplexity: string
  spaceComplexity: string
  stable?: boolean // 排序算法稳定性
}

// 预设案例
export interface PresetCase {
  name: string
  data: any
  description: string
}
