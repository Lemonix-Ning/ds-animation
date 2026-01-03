import { ref, computed } from 'vue'
import type { AnimationFrame, PlayerStatus, PlayerConfig } from '../types'

/**
 * 动画播放器类
 * 负责消费算法产生的帧序列，控制动画播放
 */
export class AnimationPlayer<T extends AnimationFrame = AnimationFrame> {
  // 帧序列
  private frames = ref<T[]>([])
  // 当前帧索引
  private currentIndex = ref(-1)
  // 播放状态
  private status = ref<PlayerStatus>('idle')
  // 播放定时器
  private timer: number | null = null
  // 配置
  private config = ref<PlayerConfig>({
    speed: 500,
    autoPlay: false
  })
  // 帧变化回调
  private onFrameChange: ((frame: T | null, index: number) => void) | null = null

  constructor(config?: Partial<PlayerConfig>) {
    if (config) {
      this.config.value = { ...this.config.value, ...config }
    }
  }

  /**
   * 加载帧序列
   */
  load(frames: T[]) {
    this.stop()
    this.frames.value = frames
    this.currentIndex.value = -1
    this.status.value = 'idle'
  }

  /**
   * 开始播放
   */
  play() {
    if (this.frames.value.length === 0) return
    
    if (this.currentIndex.value >= this.frames.value.length - 1) {
      // 已播放完毕，重新开始
      this.currentIndex.value = -1
    }
    
    this.status.value = 'playing'
    this.scheduleNext()
  }

  /**
   * 暂停播放
   */
  pause() {
    this.clearTimer()
    this.status.value = 'paused'
  }

  /**
   * 停止并重置
   */
  stop() {
    this.clearTimer()
    this.currentIndex.value = -1
    this.status.value = 'idle'
    this.notifyFrameChange()
  }

  /**
   * 单步前进
   */
  stepForward() {
    if (this.currentIndex.value < this.frames.value.length - 1) {
      this.currentIndex.value++
      this.notifyFrameChange()
      
      if (this.currentIndex.value >= this.frames.value.length - 1) {
        this.status.value = 'finished'
      }
    }
  }

  /**
   * 单步后退
   */
  stepBackward() {
    if (this.currentIndex.value > 0) {
      this.currentIndex.value--
      this.notifyFrameChange()
      this.status.value = 'paused'
    } else if (this.currentIndex.value === 0) {
      this.currentIndex.value = -1
      this.notifyFrameChange()
      this.status.value = 'idle'
    }
  }

  /**
   * 跳转到指定帧
   */
  goTo(index: number) {
    if (index >= -1 && index < this.frames.value.length) {
      this.pause()
      this.currentIndex.value = index
      this.notifyFrameChange()
      
      if (index >= this.frames.value.length - 1) {
        this.status.value = 'finished'
      } else if (index < 0) {
        this.status.value = 'idle'
      } else {
        this.status.value = 'paused'
      }
    }
  }

  /**
   * 设置播放速度
   */
  setSpeed(speed: number) {
    this.config.value.speed = speed
    // 如果正在播放，重新调度
    if (this.status.value === 'playing') {
      this.clearTimer()
      this.scheduleNext()
    }
  }

  /**
   * 设置帧变化回调
   */
  setOnFrameChange(callback: (frame: T | null, index: number) => void) {
    this.onFrameChange = callback
  }

  /**
   * 获取当前帧
   */
  getCurrentFrame(): T | null {
    if (this.currentIndex.value >= 0 && this.currentIndex.value < this.frames.value.length) {
      return this.frames.value[this.currentIndex.value] as T
    }
    return null
  }

  /**
   * 获取所有帧
   */
  getFrames(): T[] {
    return this.frames.value as T[]
  }

  /**
   * 获取响应式状态
   */
  getState() {
    return {
      frames: this.frames,
      currentIndex: this.currentIndex,
      status: this.status,
      config: this.config,
      currentFrame: computed(() => this.getCurrentFrame()),
      progress: computed(() => {
        if (this.frames.value.length === 0) return 0
        return ((this.currentIndex.value + 1) / this.frames.value.length) * 100
      }),
      totalFrames: computed(() => this.frames.value.length),
      isPlaying: computed(() => this.status.value === 'playing'),
      isPaused: computed(() => this.status.value === 'paused'),
      isFinished: computed(() => this.status.value === 'finished'),
      isIdle: computed(() => this.status.value === 'idle')
    }
  }

  /**
   * 调度下一帧
   */
  private scheduleNext() {
    this.timer = window.setTimeout(() => {
      if (this.status.value !== 'playing') return
      
      this.currentIndex.value++
      this.notifyFrameChange()
      
      if (this.currentIndex.value >= this.frames.value.length - 1) {
        this.status.value = 'finished'
      } else {
        this.scheduleNext()
      }
    }, this.config.value.speed)
  }

  /**
   * 清除定时器
   */
  private clearTimer() {
    if (this.timer !== null) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  /**
   * 通知帧变化
   */
  private notifyFrameChange() {
    if (this.onFrameChange) {
      this.onFrameChange(this.getCurrentFrame(), this.currentIndex.value)
    }
  }
}

/**
 * 创建播放器的组合式函数
 */
export function useAnimationPlayer<T extends AnimationFrame = AnimationFrame>(config?: Partial<PlayerConfig>) {
  const player = new AnimationPlayer<T>(config)
  const state = player.getState()
  
  return {
    player,
    ...state,
    load: (frames: T[]) => player.load(frames),
    play: () => player.play(),
    pause: () => player.pause(),
    stop: () => player.stop(),
    stepForward: () => player.stepForward(),
    stepBackward: () => player.stepBackward(),
    goTo: (index: number) => player.goTo(index),
    setSpeed: (speed: number) => player.setSpeed(speed),
    setOnFrameChange: (cb: (frame: T | null, index: number) => void) => player.setOnFrameChange(cb)
  }
}
