<template>
    <div class="teacher-list">
        <div class="page-header">
            <h1>教师管理</h1>
            <router-link to="/teachers/add" class="btn btn-add">
                <i class="fas fa-plus"></i> 添加教师
            </router-link>
        </div>

        <div class="search-bar">
            <input type="text" v-model="searchQuery" placeholder="搜索教师姓名或工号" @input="handleSearch">
            <select v-model="filterTitle" @change="handleSearch">
                <option value="">全部职称</option>
                <option value="教授">教授</option>
                <option value="副教授">副教授</option>
                <option value="讲师">讲师</option>
                <option value="助教">助教</option>
                <option value="主任">主任</option>
            </select>
            <select v-model="filterDepartment" @change="handleSearch">
                <option value="">全部院系</option>
                <option v-for="dept in departments" :key="dept" :value="dept">
                    {{ dept }}
                </option>
            </select>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>工号</th>
                        <th>姓名</th>
                        <th>性别</th>
                        <th>职称</th>
                        <th>所属院系</th>
                        <th>联系电话</th>
                        <th>邮箱</th>
                        <th>办公室</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="teacher in paginatedTeachers" :key="teacher.id">
                        <td>{{ teacher.teacherId }}</td>
                        <td>{{ teacher.name }}</td>
                        <td>{{ teacher.gender }}</td>
                        <td>{{ teacher.title }}</td>
                        <td>{{ teacher.department }}</td>
                        <td>{{ teacher.phone }}</td>
                        <td>{{ teacher.email }}</td>
                        <td>{{ teacher.office }}</td>
                        <td class="actions">
                            <router-link :to="`/teachers/edit/${teacher.id}`" class="btn-edit">
                                <i class="fas fa-edit">编辑</i>
                            </router-link>
                            <button @click="showCourses(teacher)" class="btn-view">
                                <i class="fas fa-book">查看</i>
                            </button>
                            <button @click="handleDelete(teacher)" class="btn-delete">
                                <i class="fas fa-trash">删除</i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- 课程列表弹窗 -->
        <div v-if="showCoursesModal" class="modal">
            <div class="modal-content">
                <h3>{{ selectedTeacher?.name }}的课程列表</h3>
                <div class="courses-list">
                    <div v-if="teacherCourses.length === 0" class="no-courses">
                        暂无课程
                    </div>
                    <div v-else v-for="course in teacherCourses" :key="course.id" class="course-item">
                        <h4>{{ course.name }}</h4>
                        <p>课程编号: {{ course.courseId }}</p>
                        <p>类型: {{ course.type }}</p>
                        <p>时间: {{ course.schedule }}</p>
                    </div>
                </div>
                <button @click="showCoursesModal = false" class="btn-close">关闭</button>
            </div>
        </div>

        <!-- 删除确认弹窗 -->
        <div v-if="showDeleteModal" class="modal">
            <div class="modal-content">
                <h3>确认删除</h3>
                <p>确定要删除教师 {{ selectedTeacher?.name }} 吗？此操作不可恢复。</p>
                <div class="modal-buttons">
                    <button @click="confirmDelete" class="btn-confirm">确认</button>
                    <button @click="cancelDelete" class="btn-cancel">取消</button>
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
import { getTeachers, deleteTeacher, getTeacherCourses } from '../utils/storage'

export default {
    name: 'TeacherListView',
    setup() {
        const teachers = ref([])
        const searchQuery = ref('')
        const filterTitle = ref('')
        const filterDepartment = ref('')
        const showDeleteModal = ref(false)
        const showCoursesModal = ref(false)
        const selectedTeacher = ref(null)
        const teacherCourses = ref([])
        const currentPage = ref(1)
        const itemsPerPage = ref(10)

        const loadData = () => {
            teachers.value = getTeachers()
        }

        onMounted(() => {
            loadData()
        })

        const departments = computed(() => {
            const depts = new Set(teachers.value.map(t => t.department))
            return Array.from(depts)
        })

        const filteredTeachers = computed(() => {
            return teachers.value.filter(teacher => {
                const matchesSearch =
                    teacher.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                    teacher.teacherId.toLowerCase().includes(searchQuery.value.toLowerCase())

                const matchesTitle = !filterTitle.value || teacher.title === filterTitle.value
                const matchesDepartment = !filterDepartment.value || teacher.department === filterDepartment.value

                return matchesSearch && matchesTitle && matchesDepartment
            })
        })

        const handleSearch = () => {
            // 搜索逻辑已通过计算属性实现
        }

        const showCourses = (teacher) => {
            selectedTeacher.value = teacher
            teacherCourses.value = getTeacherCourses(teacher.id)
            showCoursesModal.value = true
        }

        const handleDelete = (teacher) => {
            selectedTeacher.value = teacher
            showDeleteModal.value = true
        }

        const confirmDelete = () => {
            if (selectedTeacher.value) {
                deleteTeacher(selectedTeacher.value.id)
                loadData()
                showDeleteModal.value = false
                selectedTeacher.value = null
            }
        }

        const cancelDelete = () => {
            showDeleteModal.value = false
            selectedTeacher.value = null
        }

        const paginatedTeachers = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage.value
            const end = start + itemsPerPage.value
            return filteredTeachers.value.slice(start, end)
        })

        const totalPages = computed(() => Math.ceil(filteredTeachers.value.length / itemsPerPage.value))

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
            teachers,
            searchQuery,
            filterTitle,
            filterDepartment,
            departments,
            showDeleteModal,
            showCoursesModal,
            selectedTeacher,
            teacherCourses,
            filteredTeachers,
            handleSearch,
            showCourses,
            handleDelete,
            confirmDelete,
            cancelDelete,
            paginatedTeachers,
            currentPage,
            totalPages,
            prevPage,
            nextPage
        }
    }
}
</script>
<style scoped>
.teacher-list {
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
.btn-view,
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

.btn-view {
    background-color: #ff9800;
}

.btn-view:hover {
    background-color: #fb8c00;
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