<template>
    <div class="teacher-add">
        <div class="page-header">
            <h1>添加教师</h1>
            <router-link to="/teachers" class="btn-back">
                <i class="fas fa-arrow-left"></i> 返回列表
            </router-link>
        </div>

        <div class="content-wrapper">
            <TeacherForm :isEdit="false" />
        </div>
    </div>
</template>

<script>
import TeacherForm from '../components/TeacherForm.vue'

export default {
    name: 'TeacherAddView',
    components: {
        TeacherForm
    }
}
</script>

<style scoped>
.teacher-add {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 20px auto;
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
    margin: 0;
}

.btn-back {
    padding: 10px 20px;
    background-color: #429dff;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
    font-size: 1rem;
}

.btn-back:hover {
    background-color: #1e7bde;
}

.content-wrapper {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
    .teacher-add {
        padding: 10px;
    }

    .page-header {
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
    }
}
</style>