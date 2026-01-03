import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: '首页' }
  },
  // 第2、3章：线性表、栈、队列
  {
    path: '/linear',
    name: 'Linear',
    component: () => import('../views/LinearView.vue'),
    meta: { title: '线性表', chapter: '2-3' }
  },
  {
    path: '/stack-queue',
    name: 'StackQueue',
    component: () => import('../views/StackQueueView.vue'),
    meta: { title: '栈与队列', chapter: '3' }
  },
  // 第4章：串
  {
    path: '/string',
    name: 'String',
    component: () => import('../views/StringView.vue'),
    meta: { title: '串与KMP', chapter: '4' }
  },
  // 第5章：树与二叉树
  {
    path: '/tree',
    name: 'Tree',
    component: () => import('../views/TreeView.vue'),
    meta: { title: '树与二叉树', chapter: '5' }
  },
  // 第6章：图
  {
    path: '/graph',
    name: 'Graph',
    component: () => import('../views/GraphView.vue'),
    meta: { title: '图', chapter: '6' }
  },
  // 第7章：查找
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/SearchView.vue'),
    meta: { title: '查找', chapter: '7' }
  },
  // 第8章：内部排序
  {
    path: '/sorting',
    name: 'Sorting',
    component: () => import('../views/SortingView.vue'),
    meta: { title: '内部排序', chapter: '8' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
