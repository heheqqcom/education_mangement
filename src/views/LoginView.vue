<template>
    <div class="auth-container">
        <div class="auth-box">
            <!-- Logo 和 表单容器 -->
            <div class="auth-content">
                <!-- Logo -->
                <div class="auth-info">
                    <img src="../assets/logo.png" alt="Logo" class="logo">
                </div>

                <!-- 登录表单 -->
                <form v-if="isLogin" @submit.prevent="handleLogin" class="auth-form">
                    <h2 class="title">登录</h2>
                    <div class="form-group">
                        <input v-model="loginForm.username" type="text" placeholder="用户名" required>
                    </div>
                    <div class="form-group">
                        <input v-model="loginForm.password" type="password" placeholder="密码" required>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="submit-btn">登录</button>
                    </div>
                    <span class="toggle-text" @click="isLogin = false">注册</span>
                </form>

                <!-- 注册表单 -->
                <form v-else @submit.prevent="handleRegister" class="auth-form">
                    <h2 class="title">注册</h2>
                    <div class="form-group">
                        <input v-model="registerForm.username" type="text" placeholder="用户名" required>
                    </div>
                    <div class="form-group">
                        <input v-model="registerForm.password" type="password" placeholder="密码" required>
                    </div>
                    <div class="form-group">
                        <input v-model="registerForm.confirmPassword" type="password" placeholder="确认密码" required>
                    </div>
                    <div class="form-group">
                        <input v-model="registerForm.email" type="email" placeholder="邮箱" required>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="submit-btn">注册</button>
                    </div>
                    <span class="toggle-text" @click="isLogin = true">登录</span>
                </form>
            </div>

            <!-- 提示消息 -->
            <div v-if="message" :class="['message', message.type]">
                {{ message.text }}
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../utils/auth'
import { register } from '../utils/storage'

export default {
    name: 'LoginView',
    setup() {
        const router = useRouter()
        const isLogin = ref(true)
        const message = ref(null)

        const loginForm = reactive({
            username: '',
            password: ''
        })

        const registerForm = reactive({
            username: '',
            password: '',
            confirmPassword: '',
            email: ''
        })

        const handleLogin = () => {
            // 简单的登录验证
            if ((loginForm.username === 'admin' && loginForm.password === '123456') || (loginForm.username === registerForm.username && loginForm.password === registerForm.password)) {
                login(loginForm.username, loginForm.password)
                router.push('/')
            } else {
                showMessage('用户名或密码错误', 'error')
            }
        }

        const handleRegister = () => {
            if (registerForm.password !== registerForm.confirmPassword) {
                showMessage('两次输入的密码不一致', 'error')
                return
            }

            const users = JSON.parse(localStorage.getItem('users') || '[]')
            if (users.some(user => user.username === registerForm.username)) {
                showMessage('用户名已存在', 'error')
                return
            }

            // 使用 register 函数注册用户
            register({
                username: registerForm.username,
                password: registerForm.password,
                email: registerForm.email,
                createTime: new Date().toISOString()
            })

            showMessage('注册成功！请登录', 'success')
            isLogin.value = true
        }

        const showMessage = (text, type) => {
            message.value = { text, type }
            setTimeout(() => {
                message.value = null
            }, 3000)
        }

        // 在组件挂载时显示欢迎弹窗
        onMounted(() => {
            alert('欢迎来到成职教务系统！');
        })

        return {
            isLogin,
            loginForm,
            registerForm,
            message,
            handleLogin,
            handleRegister
        }
    }
}
</script>

<style scoped>
.auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #b3e5fc, #81d4fa);
    /* 淡蓝色渐变背景 */
}

.auth-box {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 800px;
    /* 增加最大宽度以适应 Logo 和表单 */
    /* 调整宽度以适应表单 */
    height: auto;
    /* 自动高度 */
}

.auth-content {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 2rem;
}

.auth-info {
    width: 300px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.logo {
    width: 300px;
    /* 根据实际情况调整大小 */
    height: auto;
}

.auth-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
}

.form-group input {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.submit-btn {
    width: 100%;
    padding: 0.8rem;

    background-color: #0288d1;
    /* 按钮背景颜色 */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
}

.submit-btn:hover {
    background-color: #0277bd;
    /* 按钮悬停时的背景颜色 */
}

.toggle-text {
    width: fit-content;
    cursor: pointer;
    color: #0288d1;
    font-size: 0.9rem;
}

.toggle-text:hover {
    text-decoration: underline;
}

.message {
    margin-top: 1rem;
    padding: 0.8rem;
    border-radius: 4px;
    text-align: center;
}

.message.success {
    background-color: #d4edda;
    color: #155724;
}

.message.error {
    background-color: #f8d7da;
    color: #721c24;
}

@media (max-width: 768px) {
    .auth-box {
        max-width: 500px;
    }

    .auth-content {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .form-actions {
        flex-direction: column;
        align-items: flex-end;
    }

    .toggle-text {
        margin-top: 0.5rem;
    }
}

@media (max-width: 480px) {
    .auth-box {
        margin: 1rem;
    }

    .auth-content {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .form-actions {
        flex-direction: column;
        align-items: flex-end;
    }

    .toggle-text {
        margin-top: 0.5rem;
    }
}
</style>