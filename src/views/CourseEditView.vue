<template>
    <div class="course-edit">
      <div class="page-header">
        <h1>编辑课程</h1>
        <router-link to="/courses" class="btn-back">
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
        <CourseForm v-else :isEdit="true" />
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { getCourseById } from '../utils/storage'
  import CourseForm from '../components/CourseForm.vue'
  
  export default {
    name: 'CourseEditView',
    components: {
      CourseForm
    },
    setup() {
      const route = useRoute()
      const router = useRouter()
      const loading = ref(true)
      const error = ref(null)
  
      onMounted(async () => {
        try {
          const courseId = parseInt(route.params.id)
          const course = getCourseById(courseId)
          
          if (!course) {
            error.value = '未找到该课程'
            router.push('/courses')
          }
        } catch (err) {
          error.value = '加载课程信息失败'
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
  .course-edit {
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
  
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    color: #666;
    gap: 8px;
  }
  
  .error-message {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    color: #dc3545;
    font-weight: bold;
  }
  
  @media (max-width: 768px) {
    .course-edit {
      padding: 10px;
    }
    
    .page-header {
      flex-direction: column;
      gap: 12px;
      align-items: flex-start;
    }
  }
  </style>
  