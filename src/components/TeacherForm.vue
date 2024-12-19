<template>
    <form class="teacher-form" @submit.prevent="handleSubmit">
      <div class="form-grid">
        <div class="form-group">
          <label>姓名</label>
          <input 
            type="text" 
            v-model="formData.name"
            required
            placeholder="请输入教师姓名"
          >
        </div>
  
        <div class="form-group">
          <label>性别</label>
          <select v-model="formData.gender" required>
            <option value="">请选择性别</option>
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </div>
  
        <div class="form-group">
          <label>职称</label>
          <select v-model="formData.title" required>
            <option value="">请选择职称</option>
            <option value="教授">教授</option>
            <option value="副教授">副教授</option>
            <option value="讲师">讲师</option>
            <option value="助教">助教</option>
            <option value="主任">主任</option>
          </select>
        </div>
  
        <div class="form-group">
          <label>所属院系</label>
          <select v-model="formData.department" required>
            <option value="">请选择院系</option>
            <option value="计算机科学与技术系">计算机科学与技术系</option>
            <option value="数学系">数学系</option>
            <option value="物理系">物理系</option>
            <option value="化学系">化学系</option>
            <option value="生物系">生物系</option>
          </select>
        </div>
  
        <div class="form-group">
          <label>联系电话</label>
          <input 
            type="tel" 
            v-model="formData.phone"
            required
            pattern="[0-9]{11}"
            placeholder="请输入11位手机号"
          >
        </div>
  
        <div class="form-group">
          <label>电子邮箱</label>
          <input 
            type="email" 
            v-model="formData.email"
            required
            placeholder="请输入邮箱地址"
          >
        </div>
  
        <div class="form-group">
          <label>办公室</label>
          <input 
            type="text" 
            v-model="formData.office"
            required
            placeholder="请输入办公室位置"
          >
        </div>
      </div>
  
      <div class="form-footer">
        <button type="submit" class="btn-submit">
          {{ isEdit ? '保存修改' : '添加教师' }}
        </button>
        <button type="button" class="btn-cancel" @click="handleCancel">
          取消
        </button>
      </div>
    </form>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { addTeacher, updateTeacher, getTeacherById } from '../utils/storage'
  
  export default {
    name: 'TeacherForm',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    setup(props) {
      const route = useRoute()
      const router = useRouter()
      
      const formData = ref({
        name: '',
        gender: '',
        title: '',
        department: '',
        phone: '',
        email: '',
        office: ''
      })
  
      onMounted(() => {
        if (props.isEdit) {
          const teacherId = parseInt(route.params.id)
          const teacherData = getTeacherById(teacherId)
          if (teacherData) {
            formData.value = { ...teacherData }
          }
        }
      })
  
      const handleSubmit = () => {
        if (props.isEdit) {
          updateTeacher(parseInt(route.params.id), formData.value)
        } else {
          addTeacher(formData.value)
        }
        router.push('/teachers')
      }
  
      const handleCancel = () => {
        router.push('/teachers')
      }
  
      return {
        formData,
        handleSubmit,
        handleCancel
      }
    }
  }
  </script>
  
  <style scoped>
  .teacher-form {
    padding: 24px;
  }
  
  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .form-group label {
    font-weight: 500;
    color: #333;
  }
  
  .form-group input,
  .form-group select {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .form-group input:focus,
  .form-group select:focus {
    border-color: #4CAF50;
    outline: none;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
  
  .form-footer {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    padding-top: 24px;
    border-top: 1px solid #eee;
  }
  
  .btn-submit,
  .btn-cancel {
    padding: 10px 24px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn-submit {
    background-color: #429dff;
    color: white;
  }
  
  .btn-submit:hover {
    background-color: #1e7bde;
  }
  
  .btn-cancel {
    background-color: #6c757d;
    color: white;
  }
  
  .btn-cancel:hover {
    background-color: #5a6268;
  }
  
  @media (max-width: 768px) {
    .teacher-form {
      padding: 16px;
    }
  
    .form-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>
  