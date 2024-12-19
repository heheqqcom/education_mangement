<template>
  <div class="course-form">
    <h2>{{ isEdit ? '编辑课程' : '添加课程' }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-col">
          <label class="form-label">课程编号</label>
          <input type="text" :value="formData.courseId || '保存后自动生成'" disabled class="readonly-input">
        </div>
        <div class="form-col">
          <label class="form-label">课程名称</label>
          <input type="text" v-model="formData.name" required placeholder="请输入课程名称">
        </div>
      </div>

      <div class="form-row">
        <div class="form-col">
          <label class="form-label">授课教师</label>
          <select v-model="formData.teacherId" required>
            <option value="">请选择教师</option>
            <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">
              {{ teacher.name }} ({{ teacher.title }})
            </option>
          </select>
        </div>
        <div class="form-col">
          <label class="form-label">学分</label>
          <input type="number" v-model="formData.credits" required min="0.5" max="10" step="0.5" placeholder="请输入学分">
        </div>
      </div>

      <div class="form-row">
        <div class="form-col">
          <label class="form-label">课时</label>
          <input type="number" v-model="formData.hours" required min="16" max="120" placeholder="请输入课时">
        </div>
        <div class="form-col">
          <label class="form-label">课程类型</label>
          <select v-model="formData.type" required>
            <option value="">请选择课程类型</option>
            <option value="必修">必修</option>
            <option value="选修">选修</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-col">
          <label class="form-label">上课时间</label>
          <input type="text" v-model="formData.schedule" required placeholder="请输入上课时间">
        </div>
        <div class="form-col">
          <label class="form-label">上课地点</label>
          <input type="text" v-model="formData.location" required placeholder="请输入上课地点">
        </div>
      </div>

      <div class="form-row">
        <div class="form-col">
          <label class="form-label">课程描述</label>
          <textarea v-model="formData.description" rows="3" placeholder="请输入课程描述"></textarea>
        </div>
      </div>

      <div class="form-buttons">
        <button type="submit" class="btn btn-primary">
          {{ isEdit ? '保存修改' : '添加课程' }}
        </button>
        <button type="button" class="btn btn-secondary" @click="handleCancel">
          取消
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getCourses, addCourse, updateCourse, getTeachers } from '../utils/storage'

export default {
  name: 'CourseForm',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const teachers = ref([])

    const formData = reactive({
      name: '',
      teacherId: '',
      credits: '',
      hours: '',
      type: '',
      schedule: '',
      location: '',
      description: ''
    })

    onMounted(() => {
      teachers.value = getTeachers()

      if (props.isEdit) {
        const courses = getCourses()
        const courseId = route.params.id
        const course = courses.find(c => c.id === parseInt(courseId))
        if (course) {
          Object.assign(formData, course)
        }
      }
    })

    const handleSubmit = () => {
      if (props.isEdit) {
        updateCourse(parseInt(route.params.id), formData)
      } else {
        addCourse(formData)
      }
      router.push('/courses')
    }

    const handleCancel = () => {
      router.push('/courses')
    }

    return {
      formData,
      teachers,
      handleSubmit,
      handleCancel
    }
  }
}
</script>

<style scoped>
.course-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-row {
  display: flex;
  flex-wrap: wrap;
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

.readonly-input {
  background-color: #f5f5f5;
  cursor: not-allowed;
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
  background-color: #429dff;
  color: white;
}

.btn-primary:hover {
  background-color: #1e7bde;
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

  .course-form {
    margin: 1rem;
    padding: 1rem;
  }
}
</style>