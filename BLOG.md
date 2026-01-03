# 数据结构可视化演示系统：从零到一的开发实践

## 项目简介

这是一个基于 **Vue 3 + TypeScript + Tauri** 开发的数据结构与算法可视化演示系统，支持打包成桌面应用，可直接在U盘上运行。项目涵盖了常见的数据结构和经典算法，通过动画演示帮助理解算法执行过程。

🔗 **在线演示**：[部署链接]  
📦 **源码地址**：[GitHub仓库]  
💾 **桌面版下载**：[Release页面]

---

## 技术栈

### 前端技术
- **Vue 3** (Composition API)：现代化的渐进式框架
- **TypeScript**：类型安全，代码可维护性强
- **Vite**：极速的构建工具
- **Element Plus**：优雅的UI组件库
- **vis-network**：强大的图形可视化库

### 桌面端
- **Tauri 2.x**：基于Rust的轻量级桌面应用框架
- **Rust**：高性能的系统级语言

### 特色技术点
- 帧动画系统设计
- 算法与动画解耦架构
- TypeScript 泛型应用
- 自定义动画播放器

---

## 核心功能

### 1. 线性结构
- **顺序表**：插入、删除、查找操作
- **链表**：头插法、指针操作、节点删除
- 实时同步输入框与可视化视图
- 详细的指针操作步骤描述

### 2. 栈与队列
- **栈**：入栈、出栈动画
- **队列**：入队、出队可视化
- 动态显示栈顶/队头队尾指针

### 3. 字符串算法
- **KMP算法**：next数组计算过程
- 模式匹配的逐步演示
- 详细的状态转移说明

### 4. 树结构
- **二叉树遍历**：前序、中序、后序、层序
- **二叉搜索树**：插入、删除操作
- **AVL树**：自平衡调整（LL/RR/LR/RL旋转）
- **哈夫曼树**：构建过程的森林展示
- 自动布局算法优化节点位置

### 5. 图算法
- **最短路径**：Dijkstra算法（带详细松弛操作说明）
- **最小生成树**：
  - Prim算法（顶点扩展策略）
  - Kruskal算法（边排序 + 并查集）
- **图遍历**：DFS、BFS
- 实时高亮当前访问节点和边

### 6. 排序算法
- 冒泡、选择、插入排序
- 快速排序（分区过程）
- 归并排序（分治思想）
- 对比次数和交换次数统计

### 7. 查找算法
- 顺序查找
- 二分查找
- 步骤计数和性能对比

---

## 实现亮点

### 🎨 1. 帧动画系统设计

**核心思想**：将算法执行过程拆解为独立的"帧"，每帧记录一个状态快照。

```typescript
interface Frame {
  type: 'highlight' | 'swap' | 'insert' | 'delete'
  index: number
  value?: any
  description: string
  data: any  // 当前状态的完整数据
}
```

**优势**：
- ✅ 算法逻辑与动画渲染完全解耦
- ✅ 支持暂停、继续、快进、后退
- ✅ 可导出动画序列用于教学

### 🧩 2. 算法与视图分离

**目录结构**：
```
src/
├── core/algorithms/    # 纯算法实现，返回帧序列
│   ├── sorting.ts      # 排序算法
│   ├── tree.ts         # 树算法
│   └── graph.ts        # 图算法
├── views/              # UI组件，负责渲染和交互
│   ├── SortingView.vue
│   └── TreeView.vue
└── core/player/        # 动画播放控制器
    └── AnimationPlayer.ts
```

**示例**：链表插入算法
```typescript
export function linkedListInsert(nodes: Node[], position: number, value: number) {
  const frames: Frame[] = []
  let prev = nodes[0]!
  
  // 1. 寻找前驱节点
  frames.push({
    type: 'highlight',
    description: `从头节点${prev.value}开始遍历`,
    data: { nodes: [...nodes], current: prev.id }
  })
  
  // 2. 修改指针
  frames.push({
    type: 'move',
    description: `步骤1：新节点.next = 前驱.next`,
    data: { nodes: [...nodes], newNode: newNodeId }
  })
  
  // 3. 完成插入
  frames.push({
    type: 'reset',
    description: `步骤2：前驱.next = 新节点`,
    data: { nodes: updatedNodes }
  })
  
  return frames
}
```

### 🎯 3. 链表指针操作的详细说明

在链表操作中，特别强调了指针修改的顺序和原因：

```typescript
// 插入节点时的两步操作
newNode.next = prev.next  // 先让新节点指向后继
prev.next = newNode       // 再让前驱指向新节点

// 配合详细描述
description: `步骤1：将新节点${value}的next指针指向${nextValue}（防止链表断裂）`
description: `步骤2：将前驱节点${prev.value}的next指针修改为指向新节点${value}`
```

### 🌲 4. 哈夫曼树构建的森林可视化

**问题**：传统实现只显示最终的哈夫曼树，无法看到构建过程。

**解决方案**：在每次合并后，递归收集所有子树节点，完整保留森林状态。

```typescript
function collectAllNodes(node: HuffmanNode): HuffmanNode[] {
  const result = [node]
  if (node.left) result.push(...collectAllNodes(node.left))
  if (node.right) result.push(...collectAllNodes(node.right))
  return result
}

// 每次合并后收集整个森林
const allTreeNodes = forest.flatMap(tree => collectAllNodes(tree))
frames.push({
  type: 'merge',
  description: `合并节点${min1.weight}和${min2.weight}，生成父节点${newNode.weight}`,
  data: { nodes: allTreeNodes }  // 完整森林状态
})
```

### 📊 5. 图算法的教学级描述

**Dijkstra算法**示例：
```typescript
description: `检查边 ${current.id} → ${neighbor.id}，
             尝试松弛操作：
             新距离 = dist[${current.id}] + weight(${current.id}, ${neighbor.id}) 
                    = ${newDist}
             ${newDist < oldDist ? '经过' + current.id + '更短，更新' : '不会更短，保持原值'}`
```

**Kruskal算法**示例：
```typescript
description: `检查边 ${edge.from} - ${edge.to} (权重 ${edge.label})：
             find(${edge.from}) = ${root1}, find(${edge.to}) = ${root2}
             ${root1 !== root2 ? '不在同一集合，加入MST' : '会形成环，跳过'}`
```

### 🎮 6. 动画播放控制器

**AnimationPlayer** 提供完整的播放控制：
- ⏯️ 播放/暂停
- ⏮️ ⏭️ 上一帧/下一帧
- ⏩ 速度调节（0.5x - 2x）
- 📍 进度条拖拽跳转

---

## 打包部署方案

### Web版本
```bash
pnpm build  # 生成 dist/ 静态文件
pnpm preview  # 本地预览

# 部署到服务器
scp -r dist/* user@server:/var/www/html/
```

### 桌面版（Tauri）

**环境准备**：
1. 安装 Rust：https://rustup.rs/
2. Windows需安装 Visual Studio Build Tools
3. 系统需有 WebView2（Win10/11自带）

**打包命令**：
```bash
pnpm tauri:build
```

**输出文件**：
- `src-tauri/target/release/app.exe`  
  → **便携版**，可直接复制到U盘
  
- `src-tauri/target/release/bundle/nsis/`  
  → **安装包**，带卸载程序

**体积对比**：
- Electron版：~150MB
- Tauri版：**~5MB**（不含WebView2）

---

## 关键代码片段

### 算法切换时清空旧帧

**问题**：切换算法后，如果不清空旧帧，点击"运行"会播放上一个算法的动画。

**解决**：
```vue
// TreeView.vue
const resetDemo = () => {
  load([])  // 清空帧序列，禁用播放按钮
  network.value?.setData({ nodes: [], edges: [] })
}

watch(selectedAlgorithm, () => {
  resetDemo()  // 切换算法时自动清空
})
```

### 输入框与视图同步

**问题**：动画完成后，顺序表的视图变化了，但输入框的值没有更新。

**解决**：
```vue
// LinearView.vue
watch(isFinished, (finished) => {
  if (finished && dataStructure.value === 'sequential') {
    // 从 AnimationPlayer 获取最终状态
    const finalFrame = player.value?.getCurrentFrame()
    if (finalFrame?.data?.array) {
      inputArray.value = finalFrame.data.array.join(',')
    }
  }
})
```

---

## 使用说明

### 开发模式
```bash
pnpm install   # 安装依赖
pnpm dev       # 启动开发服务器（Web版）
pnpm tauri:dev # 启动 Tauri 开发模式（桌面版）
```

### 操作流程
1. 选择数据结构类型（如"顺序表"或"链表"）
2. 输入初始数据（逗号分隔，如 `10,20,30`）
3. 点击"开始演示"按钮
4. 选择具体操作（插入/删除/查找）
5. 点击"运行"执行算法
6. 使用控制栏控制动画播放

---

## 技术难点与解决方案

### 1. TypeScript 类型安全问题

**遇到的错误**：
```typescript
error TS18048: 'prev' is possibly 'undefined'
```

**解决方法**：
- 方案A：使用非空断言 `prev!.value`
- 方案B：添加类型守卫 `if (!prev) return`
- 方案C：文件顶部添加 `// @ts-nocheck`（临时方案）

### 2. 哈夫曼树布局优化

**问题**：多棵树重叠显示。

**解决**：
```typescript
// 计算每棵树的宽度，水平排列
let currentX = 0
roots.forEach((root, index) => {
  const treeWidth = getTreeWidth(root.id) * LEVEL_SEPARATION
  layoutTree(root.id, currentX + treeWidth / 2, 0)
  currentX += treeWidth + TREE_SPACING
})
```

### 3. 队列动画显示异常

**原因**：按钮绑定错误，队列的"入队"按钮调用了栈的 `handlePush`。

**修复**：
```vue
<!-- 修改前 -->
<el-button @click="handlePush">入队</el-button>

<!-- 修改后 -->
<el-button @click="dataStructure === 'stack' ? handlePush() : handleEnqueue()">
  {{ dataStructure === 'stack' ? '入栈' : '入队' }}
</el-button>
```

---

## 性能优化

1. **虚拟列表**：排序视图中，数据量大时使用虚拟滚动
2. **节流控制**：动画播放时使用 `requestAnimationFrame`
3. **懒加载**：路由组件按需加载
4. **Tree Shaking**：Vite 自动移除未使用代码

---

## 未来规划

- [ ] 增加红黑树可视化
- [ ] 支持B树/B+树
- [ ] 添加动态规划算法
- [ ] 支持导出动画为GIF
- [ ] 多语言支持（中/英）
- [ ] 移动端适配

---

## 总结

这个项目是对**前端工程化**、**算法可视化**、**桌面应用开发**的综合实践，核心价值在于：

✨ **教学友好**：详细的步骤描述，适合算法学习  
🏗️ **架构清晰**：算法与视图分离，易于扩展  
📦 **部署灵活**：Web版 + 桌面版双模式  
⚡ **性能优越**：Tauri打包体积仅5MB，启动秒开

如果这个项目对你有帮助，欢迎 **Star ⭐** 支持！

---

## 开源协议

MIT License

## 联系方式

- 邮箱：[your-email@example.com]
- 博客：[your-blog.com]
- GitHub：[@your-username]

---

**最后更新时间**：2026年1月3日
