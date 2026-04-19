<template>
  <div class="home-view">
    <header class="hero">
      <div class="hero-content">
        <h1>从底层逻辑到代码高亮<br><span>一次看懂数据结构</span></h1>

        <div class="hero-actions">
          <button class="btn btn-primary" @click="scrollToModules">
            <el-icon><Promotion /></el-icon>
            开始探索
          </button>
        </div>
      </div>
    </header>

    <main class="modules-section" ref="modulesRef">
      <div class="grid-container">
        <div
          v-for="card in cards"
          :key="card.title"
          class="module-card"
          :class="card.theme"
          @click="openCard(card.path, card.disabled)"
        >
          <div class="icon-wrapper">
            <el-icon :size="24"><component :is="card.icon" /></el-icon>
          </div>
          <div class="card-chapter">{{ card.chapter }}</div>
          <h3>{{ card.title }}</h3>
          <p>{{ card.desc }}</p>
          <el-icon class="card-arrow" :size="18"><Right /></el-icon>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Operation,
  SetUp,
  Document,
  Share,
  Connection,
  Search,
  Sort,
  Promotion,
  Right,
  MoreFilled
} from '@element-plus/icons-vue'

const router = useRouter()
const modulesRef = ref<HTMLElement | null>(null)

const cards = [
  {
    chapter: 'Chapter 2',
    title: '线性表',
    desc: '探索顺序表与链表的底层奥秘。包含节点的插入、删除、查找与链表逆置的可视化演示。',
    icon: Operation,
    path: '/linear',
    theme: 'c-linear'
  },
  {
    chapter: 'Chapter 3',
    title: '栈与队列',
    desc: '直观理解 LIFO 与 FIFO 特性。观察数据入栈、出队的全过程以及指针的实时状态变化。',
    icon: SetUp,
    path: '/stack-queue',
    theme: 'c-stack'
  },
  {
    chapter: 'Chapter 4',
    title: '串与 KMP',
    desc: '破解字符串匹配的难题。对比朴素匹配，深入解析 KMP 算法中 next 数组的神奇回溯机制。',
    icon: Document,
    path: '/string',
    theme: 'c-string'
  },
  {
    chapter: 'Chapter 5',
    title: '树与二叉树',
    desc: '从前中后序遍历到二叉搜索树的动态增删，以及哈夫曼编码树的完整构建过程。',
    icon: Share,
    path: '/tree',
    theme: 'c-tree'
  },
  {
    chapter: 'Chapter 6',
    title: '图算法',
    desc: '节点与连边的交织。动态追踪 DFS/BFS 遍历，解析最短路径与最小生成树生成。',
    icon: Connection,
    path: '/graph',
    theme: 'c-graph'
  },
  {
    chapter: 'Chapter 7',
    title: '查找算法',
    desc: '从简单的顺序、二分查找，到复杂的二叉搜索树、散列表冲突处理的可视化。',
    icon: Search,
    path: '/search',
    theme: 'c-search'
  },
  {
    chapter: 'Chapter 8',
    title: '内部排序',
    desc: '多达 7 种经典排序算法同台竞技。查看比较次数、交换次数及代码高亮联动。',
    icon: Sort,
    path: '/sorting',
    theme: 'c-sort'
  },
  {
    chapter: 'Future',
    title: '更多内容...',
    desc: '高级数据结构与综合实战演练模块正在紧锣密鼓地开发中，敬请期待。',
    icon: MoreFilled,
    path: '',
    theme: 'c-disabled',
    disabled: true
  }
]

function goTo(path: string) {
  router.push(path)
}

function scrollToModules() {
  modulesRef.value?.scrollIntoView({ behavior: 'smooth' })
}

function openCard(path: string, disabled?: boolean) {
  if (disabled || !path) return
  goTo(path)
}
</script>

<style scoped>
.home-view {
  --primary: #409eff;
  --primary-light: #ecf5ff;
  --success: #67c23a;
  --warning: #e6a23c;
  --danger: #f56c6c;
  --purple: #8e44ad;
  --teal: #1abc9c;
  --text-main: #1f2f3d;
  --text-regular: #606266;
  --text-muted: #909399;
  --bg-body: #f8fafc;
  --bg-card: #ffffff;
  --border-color: #ebeef5;

  position: relative;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-body);
  color: var(--text-main);
}

.home-view::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(rgba(64, 158, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(64, 158, 255, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(circle at center, black 0%, transparent 80%);
  -webkit-mask-image: radial-gradient(circle at center, black 0%, transparent 80%);
  z-index: 0;
  pointer-events: none;
}

.navbar {
  position: relative;
  z-index: 20;
  flex-shrink: 0;
  height: 60px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  padding: 0 40px;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
  color: var(--text-main);
  text-decoration: none;
  cursor: pointer;
}

.nav-brand .el-icon {
  color: var(--primary);
  font-size: 24px;
}

.hero {
  position: relative;
  z-index: 10;
  padding: 3vh 20px 2vh;
  text-align: center;
  flex-shrink: 0;
}

.hero-content {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 14px;
  background: var(--primary-light);
  color: var(--primary);
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 16px;
  border: 1px solid rgba(64, 158, 255, 0.2);
}

.hero h1 {
  font-size: 40px;
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 12px;
  color: #111827;
  line-height: 1.2;
}

.hero h1 span {
  background: linear-gradient(135deg, var(--primary) 0%, #8e44ad 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero p {
  font-size: 15px;
  color: var(--text-regular);
  margin-bottom: 20px;
  max-width: 600px;
  margin-inline: auto;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  font-size: 13px;
  font-weight: 500;
}

.stat-item .el-icon {
  color: var(--primary);
  font-size: 16px;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  border: none;
}

.btn-primary {
  background: var(--primary);
  color: #fff;
  box-shadow: 0 4px 14px rgba(64, 158, 255, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(64, 158, 255, 0.4);
  background: #3a8ee6;
}

.btn-secondary {
  background: #fff;
  color: var(--text-main);
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.btn-secondary:hover {
  border-color: var(--primary);
  color: var(--primary);
  transform: translateY(-2px);
}

.modules-section {
  position: relative;
  z-index: 10;
  flex: 1;
  min-height: 0;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 3vh;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 16px;
  height: 100%;
}

.module-card {
  background: var(--bg-card);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.03);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.03);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

.module-card:nth-child(1) {
  animation-delay: 0.1s;
}

.module-card:nth-child(2) {
  animation-delay: 0.15s;
}

.module-card:nth-child(3) {
  animation-delay: 0.2s;
}

.module-card:nth-child(4) {
  animation-delay: 0.25s;
}

.module-card:nth-child(5) {
  animation-delay: 0.3s;
}

.module-card:nth-child(6) {
  animation-delay: 0.35s;
}

.module-card:nth-child(7) {
  animation-delay: 0.4s;
}

.module-card:nth-child(8) {
  animation-delay: 0.45s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.module-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08);
  border-color: rgba(0, 0, 0, 0.08);
}

.module-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--theme-color, var(--primary));
  opacity: 0;
  transition: opacity 0.3s;
}

.module-card:hover::after {
  opacity: 1;
}

.icon-wrapper {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  color: var(--theme-color, var(--primary));
  background: var(--theme-bg, var(--primary-light));
  transition: transform 0.3s;
}

.module-card:hover .icon-wrapper {
  transform: scale(1.1) rotate(-5deg);
}

.card-chapter {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 2px;
}

.module-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 6px;
}

.module-card p {
  font-size: 13px;
  color: var(--text-regular);
  line-height: 1.5;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-arrow {
  margin-top: 12px;
  align-self: flex-end;
  color: var(--theme-color, var(--primary));
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s;
}

.module-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(0);
}

.c-linear {
  --theme-color: #3498db;
  --theme-bg: #e8f4f8;
}

.c-stack {
  --theme-color: #9b59b6;
  --theme-bg: #f4e8f8;
}

.c-string {
  --theme-color: #e67e22;
  --theme-bg: #fdf2e9;
}

.c-tree {
  --theme-color: #2ecc71;
  --theme-bg: #eafaf1;
}

.c-graph {
  --theme-color: #e74c3c;
  --theme-bg: #fdedec;
}

.c-search {
  --theme-color: #1abc9c;
  --theme-bg: #e8f8f5;
}

.c-sort {
  --theme-color: #34495e;
  --theme-bg: #ebedef;
}

.c-disabled {
  background: transparent;
  border: 1px dashed var(--border-color);
  box-shadow: none;
  opacity: 0.7;
  cursor: not-allowed;
}

.c-disabled:hover {
  transform: none;
  box-shadow: none;
  border-color: var(--border-color);
}

.c-disabled .icon-wrapper {
  background: #f0f2f5;
  color: #a8abb2;
}

@media (max-height: 700px), (max-width: 1024px) {
  .home-view {
    height: auto;
    min-height: 100%;
    overflow-y: auto;
  }

  .grid-container {
    grid-template-rows: auto;
  }
}

@media (max-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .hero h1 {
    font-size: 32px;
  }
}

@media (max-width: 480px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}
</style>
