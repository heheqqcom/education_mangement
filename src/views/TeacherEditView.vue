<template>
    <div class="teacher-edit">
      <div class="page-header">
        <h1>编辑教师信息</h1>
        <router-link to="/teachers" class="btn-back">
          <i class="fas fa-arrow-left"></i> 返回列表
        </router-link>
      </div>
  
      <div class="content-wrapper">
        <div v-if="loading" class="loading">
          <i class="fas fa-spinner fa-spin"></i> 加载中...
        </div>
        <div v-else-if="error" class="error-message">
          {{ error }}
        </div>
        <TeacherForm v-else :isEdit="true" />
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { getTeacherById } from '../utils/storage'
  import TeacherForm from '../components/TeacherForm.vue'
  
  export default {
    name: 'TeacherEditView',
    components: {
      TeacherForm
    },
    setup() {
      const route = useRoute()
      const router = useRouter()
      const loading = ref(true)
      const error = ref(null)
  
      onMounted(async () => {
        try {
          const teacherId = parseInt(route.params.id)
          const teacher = getTeacherById(teacherId)
          
          if (!teacher) {
            error.value = '未找到该教师信息'
            router.push('/teachers')
          }
        } catch (err) {
          error.value = '加载教师信息失败'
        } finally {
          loading.value = false
        }
      })
  
      return {
        loading,
        error
      }
    }
  }
  </script>
  
  <style scoped>
  .teacher-edit {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  
  .page-header h1 {
    font-size: 1.8rem;
    color: #333;
    margin: 0;
  }
  
  .btn-back {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background-color: #6c757d;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .btn-back:hover {
    background-color: #5a6268;
  }
  
  .content-wrapper {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    min-height: 200px;
  }
  
  .loading, .error-message {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    color: #666;
  }
  
  .error-message {
    color: #dc3545;
  }
  </style>
  