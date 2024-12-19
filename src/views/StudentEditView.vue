<template>
    <div class="student-edit">
        <div class="page-header">
            <div class="header-actions">
                <router-link to="/students" class="btn btn-back">
                    返回列表
                </router-link>
            </div>
        </div>

        <div v-if="studentExists">
            <StudentForm :isEdit="true" />
        </div>
        <div v-else class="not-found">
            <h2>未找到该学生信息</h2>
            <p>该学生可能已被删除或ID不存在</p>
            <router-link to="/students" class="btn btn-primary">
                返回学生列表
            </router-link>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import StudentForm from '../components/StudentForm.vue'
import { getStudents } from '../utils/storage'

export default {
    name: 'StudentEditView',
    components: {
        StudentForm
    },
    setup() {
        const route = useRoute()
        const studentExists = ref(false)

        onMounted(() => {
            const students = getStudents()
            const studentId = parseInt(route.params.id)
            studentExists.value = students.some(s => s.id === studentId)
        })

        return {
            studentExists
        }
    }
}
</script>

<style scoped>
.student-edit {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.page-header h1 {
    font-size: 1.8rem;
    color: #333;
}

.header-actions {
    display: flex;
    gap: 10px;
}

.btn {
    padding: 0.8rem 1.5rem;
    border-radius: 4px;
    text-decoration: none;
    transition: background-color 0.3s;
    color: white;
}

.btn-back {
    background-color: #6c757d;
}

.btn-back:hover {
    background-color: #5a6268;
}

.btn-primary {
    background-color: #007bff;
    /* 调整为与主题色调一致 */
}

.btn-primary:hover {
    background-color: #0056b3;
    /* 悬停状态的背景色也调整为与主题色调一致 */
}

.not-found {
    text-align: center;
    padding: 40px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
}

.not-found h2 {
    color: #333;
    margin-bottom: 10px;
}

.not-found p {
    color: #666;
    margin-bottom: 20px;
}

@media (max-width: 768px) {
    .page-header {
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
    }

    .student-edit {
        margin: 1rem;
        padding: 1rem;
    }
}
</style>