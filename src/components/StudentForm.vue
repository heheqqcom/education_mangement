<template>
  <div class="student-form">
    <h2>{{ isEdit ? '编辑学生' : '添加学生' }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-col">
          <label class="form-label">学号</label>
          <input type="text" :value="formData.studentId || '保存后自动生成'" disabled class="readonly-input">
        </div>
        <div class="form-col">
          <label class="form-label">姓名</label>
          <input type="text" v-model="formData.name" required placeholder="请输入姓名">
        </div>
      </div>

      <div class="form-row">
        <div class="form-col">
          <label class="form-label">年龄</label>
          <input type="number" v-model="formData.age" required min="1" max="100" placeholder="请输入年龄">
        </div>
        <div class="form-col">
          <label class="form-label">性别</label>
          <select v-model="formData.gender" required>
            <option value="">请选择性别</option>
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-col">
          <label class="form-label">班级</label>
          <input type="text" v-model="formData.className" required placeholder="请输入班级">
        </div>
        <div class="form-col">
          <label class="form-label">联系电话</label>
          <input type="tel" v-model="formData.phone" required pattern="[0-9]{11}" placeholder="请输入手机号码">
        </div>
      </div>

      <div class="form-row">
        <div class="form-col">
          <label class="form-label">邮箱</label>
          <input type="email" v-model="formData.email" required placeholder="请输入邮箱">
        </div>
        <div class="form-col">
          <label class="form-label">地址</label>
          <input type="text" v-model="formData.address" placeholder="请输入地址">
        </div>
      </div>

      <div class="form-row">
        <div class="form-col">
          <label class="form-label">备注</label>
          <textarea v-model="formData.remarks" rows="3" placeholder="请输入备注信息"></textarea>
        </div>
      </div>

      <div class="form-buttons">
        <button type="submit" class="btn btn-primary">
          {{ isEdit ? '保存修改' : '添加学生' }}
        </button>
        <button type="button" class="btn btn-secondary" @click="handleCancel">
          取消
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getStudents, addStudent, updateStudent } from '../utils/storage'

export default {
  name: 'StudentForm',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()

    const formData = reactive({
      name: '',
      age: '',
      gender: '',
      className: '',
      phone: '',
      email: '',
      address: '',
      remarks: ''
    })

    onMounted(() => {
      if (props.isEdit) {
        const students = getStudents()
        const studentId = route.params.id
        const student = students.find(s => s.id === parseInt(studentId))
        if (student) {
          Object.assign(formData, student)
        }
      }
    })

    const handleSubmit = () => {
      if (props.isEdit) {
        updateStudent(parseInt(route.params.id), formData)
      } else {
        addStudent(formData) // 系统会自动生成 studentId
      }
      router.push('/students')
    }

    const handleCancel = () => {
      router.push('/students')
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
.readonly-input {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.student-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.student-form h2 {
  margin-bottom: 2rem;
  color: #333;
}

.form-row {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-col {
  flex: 1;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
}

input,
select,
textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

select {
  background-color: white;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #429dff; /* 调整为与主题色调一致 */
  color: white;
}

.btn-primary:hover {
  background-color: #1e7bde; /* 悬停状态的背景色也调整为与主题色调一致 */
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 1rem;
  }

  .student-form {
    margin: 1rem;
    padding: 1rem;
  }
}
</style>
