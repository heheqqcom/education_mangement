<template>
  <div class="app">
    <!-- 根据路由判断是否显示导航栏 -->
    <NavBar v-if="showNavBar" />
    
    <!-- 路由视图容器 -->
    <div class="main-container">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  },
  setup() {
    const route = useRoute()
    
    // 计算属性：判断是否显示导航栏
    const showNavBar = computed(() => {
      return route.name !== 'Login'
    })

    return {
      showNavBar
    }
  }
}
</script>

<style>

.app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.main-container {
  flex: 1;
  overflow-y: auto;
}

/* 页面切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
