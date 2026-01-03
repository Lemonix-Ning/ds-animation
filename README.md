# 数据结构可视化演示系统

一个基于 **Vue 3 + TypeScript + Tauri** 的轻量级数据结构演示动画系统，专为课堂教学设计，支持"U盘随开随用"。

## 功能特性

### 核心特性
- **即插即用**：打包成单个 `.exe` 文件，无需安装环境，U盘直接运行
- **高扩展性**：采用"算法-动画"分离架构，新增算法只需编写算法函数
- **教学友好**：支持播放/暂停/单步执行，可调节动画速度
- **自定义数据**：支持自定义输入数据进行演示

### 数据结构覆盖
| 章节 | 内容 | 算法 |
|------|------|------|
| 第2-3章 | 线性结构 | 顺序表操作、链表操作、栈、队列 |
| 第4章 | 串 | KMP算法、next数组计算 |
| 第5章 | 树与二叉树 | 前序/中序/后序/层序遍历、哈夫曼树 |
| 第6章 | 图 | Dijkstra最短路径、Prim最小生成树 |
| 第7章 | 查找 | 二分查找、BST查找、哈希表 |
| 第8章 | 内部排序 | 冒泡、选择、插入、快排、堆排、归并、希尔 |

## 技术栈

- **前端框架**：Vue 3 + Composition API
- **构建工具**：Vite
- **语言**：TypeScript
- **UI组件库**：Element Plus
- **图形可视化**：vis-network（树、图）
- **桌面打包**：Tauri（生成轻量级 .exe）

## 项目结构

```
ds-animation/
├── src/
│   ├── core/                    # 核心模块
│   │   ├── types.ts             # 类型定义
│   │   ├── player/              # 动画播放器
│   │   │   └── AnimationPlayer.ts
│   │   └── algorithms/          # 算法实现（纯函数，返回动画帧）
│   │       ├── sorting.ts       # 排序算法
│   │       ├── linear.ts        # 线性表算法
│   │       ├── stackQueue.ts    # 栈和队列算法
│   │       ├── kmp.ts           # KMP算法
│   │       ├── tree.ts          # 树算法
│   │       ├── graph.ts         # 图算法
│   │       └── search.ts        # 查找算法
│   ├── components/              # 通用组件
│   │   └── common/
│   │       └── ControlBar.vue   # 播放控制条
│   ├── views/                   # 页面视图
│   │   ├── HomeView.vue         # 首页
│   │   ├── SortingView.vue      # 排序演示
│   │   ├── LinearView.vue       # 线性表演示
│   │   ├── StackQueueView.vue   # 栈队列演示
│   │   ├── StringView.vue       # 串/KMP演示
│   │   ├── TreeView.vue         # 树演示
│   │   ├── GraphView.vue        # 图演示
│   │   └── SearchView.vue       # 查找演示
│   ├── router/                  # 路由配置
│   ├── App.vue                  # 主应用组件
│   └── main.ts                  # 入口文件
├── src-tauri/                   # Tauri 配置
│   └── tauri.conf.json
└── package.json
```

## 架构设计

### 算法-动画分离架构

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   算法函数       │ --> │   动画帧序列     │ --> │   动画播放器     │
│ (纯函数)        │     │ (数据结构)       │     │ (控制渲染)       │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

**优势**：
1. 算法逻辑与UI渲染完全解耦
2. 新增算法只需编写返回帧序列的纯函数
3. 支持播放/暂停/单步/跳转等控制
4. 便于单元测试

### 动画帧格式示例

```typescript
// 排序帧
interface SortFrame {
  type: 'compare' | 'swap' | 'sorted' | 'reset'
  indices: number[]
  values: number[]
  description: string
}

// 树遍历帧
interface TreeFrame {
  type: 'visit' | 'push' | 'pop' | 'complete'
  nodeId: string
  description: string
  data?: { visitedNodes: string[], stack: string[] }
}
```

## 开发指南

### 环境要求
- Node.js 18+
- pnpm 8+
- Rust（仅打包时需要）

### 安装依赖
```bash
pnpm install
```

### 开发模式
```bash
pnpm dev
```

### 构建 Web 版本
```bash
pnpm build
```

### 构建桌面应用
```bash
# 需要先安装 Rust
pnpm tauri:build
```

## 扩展新算法

1. 在 `src/core/algorithms/` 下创建算法文件
2. 定义帧类型和算法函数
3. 在对应的 View 组件中引用
4. 算法函数示例：

```typescript
export function myAlgorithm(data: number[]): MyFrame[] {
  const frames: MyFrame[] = []
  
  // 算法逻辑
  for (let i = 0; i < data.length; i++) {
    // 生成动画帧
    frames.push({
      type: 'step',
      index: i,
      description: `处理第 ${i} 个元素`
    })
  }
  
  return frames
}
```

## 使用说明

1. 从左侧菜单选择要演示的数据结构或算法
2. 可自定义输入数据或使用预设案例
3. 点击"开始演示"生成动画帧
4. 使用底部控制条控制播放：
   - ⏮ 重置到开始
   - ◀ 上一步
   - ▶/⏸ 播放/暂停
   - ▶ 下一步
5. 拖动进度条可跳转到任意步骤
6. 调节速度滑块控制动画快慢

## 许可证

MIT License
