<template>
  <div class="app-container">
    <!-- 侧边栏 -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h1>数据结构演示</h1>
        <p>Data Structure Animation</p>
      </div>
      <el-menu
        :default-active="activeMenu"
        router
        class="sidebar-menu"
      >
        <el-menu-item index="/home">
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
        </el-menu-item>
        
        <el-sub-menu index="chapter-2-3">
          <template #title>
            <el-icon><List /></el-icon>
            <span>第2-3章 线性结构</span>
          </template>
          <el-menu-item index="/linear">
            <el-icon><Operation /></el-icon>
            <span>线性表</span>
          </el-menu-item>
          <el-menu-item index="/stack-queue">
            <el-icon><SetUp /></el-icon>
            <span>栈与队列</span>
          </el-menu-item>
        </el-sub-menu>
        
        <el-menu-item index="/string">
          <el-icon><Document /></el-icon>
          <span>第4章 串(KMP)</span>
        </el-menu-item>
        
        <el-menu-item index="/tree">
          <el-icon><Share /></el-icon>
          <span>第5章 树与二叉树</span>
        </el-menu-item>
        
        <el-menu-item index="/graph">
          <el-icon><Connection /></el-icon>
          <span>第6章 图</span>
        </el-menu-item>
        
        <el-menu-item index="/search">
          <el-icon><Search /></el-icon>
          <span>第7章 查找</span>
        </el-menu-item>
        
        <el-menu-item index="/sorting">
          <el-icon><Sort /></el-icon>
          <span>第8章 内部排序</span>
        </el-menu-item>
      </el-menu>
    </aside>
    
    <!-- 主内容区 -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeMenu = computed(() => route.path)
</script>

<style scoped>
.sidebar-menu {
  flex: 1;
  overflow-y: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
