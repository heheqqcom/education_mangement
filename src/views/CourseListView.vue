<template>
  <div class="course-list">
    <div class="page-header">
      <h1>课程管理</h1>
      <router-link to="/courses/add" class="btn btn-add">
        <i class="fas fa-plus"></i> 添加课程
      </router-link>
    </div>

    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="搜索课程名称或教师" @input="handleSearch">
      <select v-model="filterType" @change="handleSearch">
        <option value="">全部类型</option>
        <option value="必修">必修课程</option>
        <option value="选修">选修课程</option>
      </select>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>课程编号</th>
            <th>课程名称</th>
            <th>授课教师</th>
            <th>课程类型</th>
            <th>学分</th>
            <th>课时</th>
            <th>上课时间</th>
            <th>上课地点</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="course in paginatedCourses" :key="course.id">
            <td>{{ course.courseId }}</td>
            <td>{{ course.name }}</td>
            <td>{{ getTeacherName(course.teacherId) }}</td>
            <td>{{ course.type }}</td>
            <td>{{ course.credits }}</td>
            <td>{{ course.hours }}</td>
            <td>{{ course.schedule }}</td>
            <td>{{ course.location }}</td>
            <td class="actions">
              <router-link :to="`/courses/edit/${course.id}`" class="btn-edit">
                <i class="fas fa-edit">编辑</i>
              </router-link>
              <button @click="handleDelete(course.id)" class="btn-delete">
                <i class="fas fa-trash">删除</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 删除确认弹窗 -->
    <div v-if="showDeleteModal" class="modal">
      <div class="modal-content">
        <h3>确认删除</h3>
        <p>确定要删除这门课程吗？此操作不可恢复。</p>
        <div class="modal-buttons">
          <button @click="confirmDelete" class="btn-confirm">确认</button>
          <button @click="showDeleteModal = false" class="btn-cancel">取消</button>
        </div>
      </div>
    </div>
  </div>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
    <span>第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { getCourses, getCourseById, addCourse, updateCourse, deleteCourse, getTeacherCourses, filterCoursesByType, getTeachers } from '../utils/storage'


export default {
  name: 'CourseListView',
  setup() {
    const courses = ref([])
    const teachers = ref([])
    const searchQuery = ref('')
    const filterType = ref('')
    const showDeleteModal = ref(false)
    const pendingDeleteId = ref(null)
    const currentPage = ref(1)
    const itemsPerPage = ref(10)

    onMounted(() => {
      loadData()
    })

    const loadData = () => {
      courses.value = getCourses()
      teachers.value = getTeachers()
    }

    const getTeacherName = (teacherId) => {
      const teacher = teachers.value.find(t => t.id === teacherId)
      return teacher ? teacher.name : '未分配'
    }

    const filteredCourses = computed(() => {
      return courses.value.filter(course => {
        const matchesSearch =
          course.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          getTeacherName(course.teacherId).toLowerCase().includes(searchQuery.value.toLowerCase())

        const matchesType = !filterType.value || course.type === filterType.value

        return matchesSearch && matchesType
      })
    })

    const handleSearch = () => {
      // 搜索逻辑已通过计算属性实现
    }

    const handleDelete = (id) => {
      pendingDeleteId.value = id
      showDeleteModal.value = true
    }

    const confirmDelete = () => {
      if (pendingDeleteId.value) {
        deleteCourse(pendingDeleteId.value)
        loadData()
        showDeleteModal.value = false
        pendingDeleteId.value = null
      }
    }
    const paginatedCourses = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      const end = start + itemsPerPage.value
      return filteredCourses.value.slice(start, end)
    })

    const totalPages = computed(() => Math.ceil(filteredCourses.value.length / itemsPerPage.value))

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }

    return {
      courses,
      searchQuery,
      filterType,
      showDeleteModal,
      filteredCourses,
      getTeacherName,
      handleSearch,
      handleDelete,
      confirmDelete,
      paginatedCourses,
      currentPage,
      totalPages,
      prevPage,
      nextPage
    }
  }
}
</script>

<style scoped>
.course-list {
  padding: 2rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #e0f7fa;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.page-header h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #333;
}

.btn-add {
  padding: 0.6rem 1rem;
  background-color: #00acc1;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s, transform 0.3s;
}

.btn-add:hover {
  background-color: #00838f;
  transform: translateY(-2px);
}

.search-bar {
  display: flex;
  gap: 16px;
  margin-bottom: 2rem;
}

.search-bar input,
.search-bar select {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.search-bar input:focus {
  border-color: #007bff;
  outline: none;
}

.search-bar input {
  flex: 1;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

th {
  background-color: #e0f7fa;
  color: #004d40;
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid #b2ebf2;
  font-weight: bold;
}

td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr.hover-row {
  background-color: #f1f1f1;
}

tr:hover {
  background-color: #e9ecef;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn-edit,
.btn-delete {
  padding: 6px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s, transform 0.3s;
}

.btn-edit {
  background-color: #2196F3;
}

.btn-edit:hover {
  background-color: #1976d2;
  transform: translateY(-2px);
}

.btn-delete {
  background-color: #f44336;
}

.btn-delete:hover {
  background-color: #d32f2f;
  transform: translateY(-2px);
}

/* 模态框样式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-content h3 {
  margin-top: 0;
  font-size: 1.5rem;
  color: #333;
}

.modal-content p {
  margin: 1rem 0;
  color: #666;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn-confirm,
.btn-cancel {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-confirm {
  background-color: #f44336;
  color: white;
}

.btn-cancel {
  background-color: #6c757d;
  color: white;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.pagination button {
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #00acc1;
  color: white;
  margin: 0 0.5rem;
  transition: background-color 0.3s, transform 0.3s;
}

.pagination button:hover {
  background-color: #00838f;
  transform: translateY(-2px);
}

.pagination button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .search-bar {
    flex-direction: column;
  }

  .actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>