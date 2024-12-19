<template>
  <nav class="navbar">
    <div class="nav-brand">
      <span class="brand-text">教务管理系统</span>
    </div>

    <div class="nav-menu">
      <router-link to="/" class="nav-item">
        <i class="fas fa-home"></i>
        首页
      </router-link>
      <router-link to="/students" class="nav-item">
        <i class="fas fa-user-graduate"></i>
        学生管理
      </router-link>
      <router-link to="/teachers" class="nav-item">
        <i class="fas fa-chalkboard-teacher"></i>
        教师管理
      </router-link>
      <router-link to="/courses" class="nav-item">
        <i class="fas fa-book"></i>
        课程管理
      </router-link>
    </div>

    <div class="nav-user">
      <div class="user-info" @click="toggleDropdown">
        <img :src="userAvatar" alt="Avatar" class="avatar">
        <span class="username">{{ userData.username }}</span>
        <i class="fas fa-chevron-down"></i>
      </div>

      <div v-show="showDropdown" class="dropdown-menu">
        <div class="dropdown-item" @click="showProfile">
          <i class="fas fa-user"></i>
          个人信息
        </div>
        <div class="dropdown-item" @click="handleLogout">
          <i class="fas fa-sign-out-alt"></i>
          退出登录
        </div>
      </div>
    </div>

    <!-- 个人信息弹窗 -->
    <div v-if="showProfileModal" class="modal">
      <div class="modal-content">
        <h3>个人信息</h3>
        <div class="profile-info">
          <p><strong>用户名:</strong> {{ userData.username }}</p>
          <p><strong>邮箱:</strong> {{ userData.email }}</p>
          <p><strong>注册时间:</strong> {{ userData.createTime }}</p>
        </div>
        <button @click="showProfileModal = false" class="close-btn">关闭</button>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import defaultAvatar from '../assets/avatar.png'

export default {
  name: 'NavBar',
  setup() {
    const router = useRouter()
    const showDropdown = ref(false)
    const showProfileModal = ref(false)
    const userData = ref({})
    const userAvatar = ref(defaultAvatar)

    onMounted(() => {
      const storedUserData = JSON.parse(localStorage.getItem('userData') || '{}')
      userData.value = storedUserData
    })

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value
    }

    const showProfile = () => {
      showProfileModal.value = true
      showDropdown.value = false
    }

    const handleLogout = () => {
      localStorage.removeItem('userData')
      router.push('/login')
    }

    return {
      showDropdown,
      showProfileModal,
      userData,
      userAvatar,
      toggleDropdown,
      showProfile,
      handleLogout
    }
  }
}
</script>


<style scoped>
.navbar {
  background-color: #82ddfb;
  color: #333;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav-brand {
  display: flex;
  align-items: center;
}

.brand-text {
  font-size: 24px;
  font-weight: bold;
}

.nav-menu {
  display: flex;
  gap: 20px;
}

.nav-item {
  color: #333;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 0.3s;
}

.nav-item:hover {
  color: #007bff;
}

.nav-item i {
  margin-right: 5px;
}

.nav-user {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 150px;
  margin-top: 5px;
}

.dropdown-item {
  padding: 8px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}

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
  z-index: 1001;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.modal-content h3 {
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: bold;
}

.profile-info p {
  margin: 5px 0;
}

.close-btn {
  margin-top: 15px;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.close-btn:hover {
  background-color: #0056b3;
}
</style>