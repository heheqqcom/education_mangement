<template>
    <div class="student-add">
        <div class="page-header">

            <router-link to="/students" class="btn btn-back">
                返回列表
            </router-link>
        </div>
        <StudentForm />
    </div>
</template>

<script>
import StudentForm from '../components/StudentForm.vue'

export default {
    name: 'StudentAddView',
    components: {
        StudentForm
    }
}
</script>

<style scoped>
.student-add {
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
    /* 调整为与主题色调一致 */
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
    font-size: 1rem;
}

.btn-back:hover {
    background-color: #1e7bde;
    /* 悬停状态的背景色也调整为与主题色调一致 */
}

@media (max-width: 768px) {
    .page-header {
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
    }
}

/* 添加一些额外的样式以提高整体美观度 */
.student-form {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.form-group button {
    padding: 10px 20px;
    background-color:#429dff;
    /* 调整为与主题色调一致 */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
}

.form-group button:hover {
    background-color: #2f7cce;
    /* 悬停状态的背景色也调整为与主题色调一致 */
}
</style>