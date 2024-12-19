<template>
    <div class="student-list">
        <div class="list-header">
            <h2>学生列表</h2>
            <router-link to="/students/add" class="btn btn-add">添加学生</router-link>
        </div>

        <!-- 搜索框 -->
        <div class="search-box">
            <input type="text" v-model="searchQuery" placeholder="搜索学生姓名..." @input="handleSearch">
        </div>

        <!-- 学生列表表格 -->
        <div class="table-container">
            <table class="student-table" v-if="paginatedStudents.length">
                <thead>
                    <tr>
                        <th>学号</th>
                        <th>姓名</th>
                        <th>年龄</th>
                        <th>性别</th>
                        <th>班级</th>
                        <th>联系电话</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="student in paginatedStudents" :key="student.id">
                        <td>{{ student.studentId }}</td>
                        <td>{{ student.name }}</td>
                        <td>{{ student.age }}</td>
                        <td>{{ student.gender }}</td>
                        <td>{{ student.className }}</td>
                        <td>{{ student.phone }}</td>
                        <td class="action-buttons">
                            <router-link :to="`/students/edit/${student.id}`" class="btn btn-edit">
                                编辑
                            </router-link>
                            <button class="btn btn-delete" @click="handleDelete(student.id)">
                                删除
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-else class="no-data">
                暂无学生数据
            </div>
        </div>

        <!-- 确认删除对话框 -->
        <div class="modal" v-if="showDeleteModal">
            <div class="modal-content">
                <h3>确认删除</h3>
                <p>确定要删除这名学生吗？此操作不可撤销。</p>
                <div class="modal-buttons">
                    <button @click="confirmDelete" class="btn btn-delete">确认</button>
                    <button @click="showDeleteModal = false" class="btn">取消</button>
                </div>
            </div>
        </div>

        <!-- 分页导航 -->
        <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
            <span>{{ currentPage }} / {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { getStudents, deleteStudent } from '../utils/storage'

export default {
    name: 'StudentListView',
    setup() {
        const students = ref([])
        const filteredStudents = ref([])
        const searchQuery = ref('')
        const showDeleteModal = ref(false)
        const pendingDeleteId = ref(null)
        const currentPage = ref(1)
        const pageSize = ref(10)

        // 加载学生数据
        const loadStudents = () => {
            students.value = getStudents()
            handleSearch()
        }

        // 搜索功能
        const handleSearch = () => {
            if (!searchQuery.value) {
                filteredStudents.value = students.value
                return
            }

            filteredStudents.value = students.value.filter(student =>
                student.name.toLowerCase().includes(searchQuery.value.toLowerCase())
            )
        }

        // 删除确认
        const handleDelete = (id) => {
            pendingDeleteId.value = id
            showDeleteModal.value = true
        }

        // 确认删除
        const confirmDelete = () => {
            if (pendingDeleteId.value) {
                deleteStudent(pendingDeleteId.value)
                loadStudents()
                showDeleteModal.value = false
                pendingDeleteId.value = null
            }
        }

        // 计算总页数
        const totalPages = computed(() => Math.ceil(filteredStudents.value.length / pageSize.value))

        // 计算当前页的学生数据
        const paginatedStudents = computed(() => {
            const start = (currentPage.value - 1) * pageSize.value
            const end = start + pageSize.value
            return filteredStudents.value.slice(start, end)
        })

        // 上一页
        const prevPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--
            }
        }

        // 下一页
        const nextPage = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value++
            }
        }

        onMounted(() => {
            loadStudents()
        })

        return {
            paginatedStudents,
            searchQuery,
            showDeleteModal,
            handleSearch,
            handleDelete,
            confirmDelete,
            currentPage,
            totalPages,
            prevPage,
            nextPage,
        }
    }
}
</script>

<style scoped>
.list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding: 1rem;
    background-color: #e0f7fa;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.list-header h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #004d40;
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


.btn {
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s, transform 0.3s;
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

.search-box {
    margin-bottom: 2rem;
}

.search-box input {
    width: 100%;
    max-width: 300px;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s;
}

.search-box input:focus {
    border-color: #007bff;
    outline: none;
}

.table-container {
    overflow-x: auto;
}

.student-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2rem;
}

.student-table th {
    background-color: #e0f7fa;
    color: #004d40;
    padding: 1rem;
    text-align: left;
    border-bottom: 2px solid #b2ebf2;
    font-weight: bold;
}

.student-table td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.student-table tr:nth-child(even) {
    background-color: #f9f9f9;
}

.student-table tr.hover-row {
    background-color: #f1f1f1;
}

.student-table tr:hover {
    background-color: #e9ecef;
}

.no-data {
    text-align: center;
    padding: 2rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    font-size: 1.2rem;
    color: #666;
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
    .list-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }

    .search-box input {
        width: 100%;
    }

    .action-buttons {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
}
</style>