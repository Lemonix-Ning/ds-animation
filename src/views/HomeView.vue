<template>
  <div class="home-view">
    <div class="content-header">
      <h2>数据结构可视化演示系统</h2>
    </div>
    <div class="content-body">
      <div class="welcome-card">
        <h1>欢迎使用数据结构演示系统</h1>
        <p class="subtitle">直观理解数据结构与算法的核心原理</p>
        
        <div class="feature-grid">
          <div class="feature-item" @click="$router.push('/linear')">
            <el-icon class="feature-icon" :size="48"><Operation /></el-icon>
            <h3>线性表</h3>
            <p>顺序表、链表的插入、删除、查找操作演示</p>
          </div>
          
          <div class="feature-item" @click="$router.push('/stack-queue')">
            <el-icon class="feature-icon" :size="48"><SetUp /></el-icon>
            <h3>栈与队列</h3>
            <p>栈的入栈出栈、队列的入队出队操作演示</p>
          </div>
          
          <div class="feature-item" @click="$router.push('/string')">
            <el-icon class="feature-icon" :size="48"><Document /></el-icon>
            <h3>串与KMP</h3>
            <p>字符串匹配、KMP算法next数组计算演示</p>
          </div>
          
          <div class="feature-item" @click="$router.push('/tree')">
            <el-icon class="feature-icon" :size="48"><Share /></el-icon>
            <h3>树与二叉树</h3>
            <p>二叉树遍历、哈夫曼树构建演示</p>
          </div>
          
          <div class="feature-item" @click="$router.push('/graph')">
            <el-icon class="feature-icon" :size="48"><Connection /></el-icon>
            <h3>图</h3>
            <p>最短路径、最小生成树算法演示</p>
          </div>
          
          <div class="feature-item" @click="$router.push('/search')">
            <el-icon class="feature-icon" :size="48"><Search /></el-icon>
            <h3>查找</h3>
            <p>二叉搜索树、哈希表查找演示</p>
          </div>
          
          <div class="feature-item" @click="$router.push('/sorting')">
            <el-icon class="feature-icon" :size="48"><Sort /></el-icon>
            <h3>内部排序</h3>
            <p>冒泡、快排、堆排序等算法动态演示</p>
          </div>
        </div>
        
        <div class="tips-section">
          <el-alert
            title="使用提示"
            type="info"
            :closable="false"
            show-icon
          >
            <template #default>
              <ul>
                <li>点击左侧菜单选择要演示的数据结构或算法</li>
                <li>使用底部控制条控制动画播放：开始、暂停、单步执行</li>
                <li>可调整动画速度以适应讲解节奏</li>
                <li>支持自定义输入数据进行演示</li>
              </ul>
            </template>
          </el-alert>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.home-view {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.welcome-card {
  background: #fff;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.welcome-card h1 {
  font-size: 28px;
  color: #303133;
  margin-bottom: 10px;
  text-align: center;
}

.subtitle {
  text-align: center;
  color: #909399;
  font-size: 16px;
  margin-bottom: 40px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.feature-item {
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7ed 100%);
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.feature-item:hover h3,
.feature-item:hover p,
.feature-item:hover .feature-icon {
  color: #fff;
}

.feature-icon {
  color: #409eff;
  margin-bottom: 15px;
  transition: color 0.3s ease;
}

.feature-item h3 {
  font-size: 18px;
  color: #303133;
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

.feature-item p {
  font-size: 13px;
  color: #909399;
  line-height: 1.5;
  transition: color 0.3s ease;
}

.tips-section {
  margin-top: 20px;
}

.tips-section ul {
  margin: 10px 0 0 20px;
  line-height: 2;
}
</style>
