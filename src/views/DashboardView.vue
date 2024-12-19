<template>
    <div class="dashboard">
        <!-- 统计卡片区域 -->
        <div class="stat-cards">
            <div class="stat-card">
                <div class="stat-icon">
                    <img src="../assets/total_students.png" alt="学生总数" />
                </div>
                <div class="stat-content">
                    <h3>学生总数</h3>
                    <div class="stat-number">{{ totalStudents }}</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">
                    <img src="../assets/male_students.png" alt="男生人数" />
                </div>
                <div class="stat-content">
                    <h3>男生人数</h3>
                    <div class="stat-number">{{ maleCount }}</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">
                    <img src="../assets/female_students.png" alt="女生人数" />
                </div>
                <div class="stat-content">
                    <h3>女生人数</h3>
                    <div class="stat-number">{{ femaleCount }}</div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">
                    <img src="../assets/class_count.png" alt="班级数量" />
                </div>
                <div class="stat-content">
                    <h3>班级数量</h3>
                    <div class="stat-number">{{ classCount }}</div>
                </div>
            </div>
        </div>

        <!-- 最近添加的学生 -->
        <div class="recent-section">
            <h2>最近添加的学生</h2>
            <div class="recent-students">
                <table v-if="recentStudents.length">
                    <thead>
                        <tr>
                            <th>学号</th>
                            <th>姓名</th>
                            <th>班级</th>
                            <th>性别</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="student in recentStudents" :key="student.id">
                            <td>{{ student.studentId }}</td>
                            <td>{{ student.name }}</td>
                            <td>{{ student.className }}</td>
                            <td>{{ student.gender }}</td>
                            <td>
                                <router-link :to="`/students/edit/${student.id}`" class="btn btn-edit">
                                    查看详情
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-else class="no-data">
                    暂无学生数据
                </div>
            </div>
        </div>

        <!-- 班级分布 -->
        <div class="class-distribution">
            <h2>班级分布</h2>
            <div class="distribution-cards">
                <div v-for="(count, className) in classDistribution" :key="className" class="distribution-card">
                    <h3>{{ className }}</h3>
                    <div class="distribution-number">{{ count }}人</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { getStudents } from '../utils/storage'

export default {
    name: 'DashboardView',
    setup() {
        const students = ref([])

        // 计算统计数据
        const totalStudents = computed(() => students.value.length)
        const maleCount = computed(() =>
            students.value.filter(s => s.gender === '男').length
        )
        const femaleCount = computed(() =>
            students.value.filter(s => s.gender === '女').length
        )

        // 获取最近添加的5个学生
        const recentStudents = computed(() => {
            return [...students.value]
                .sort((a, b) => b.id - a.id)
                .slice(0, 5)
        })

        // 计算班级分布
        const classDistribution = computed(() => {
            const distribution = {}
            students.value.forEach(student => {
                distribution[student.className] = (distribution[student.className] || 0) + 1
            })
            return distribution
        })

        // 计算班级数量
        const classCount = computed(() =>
            Object.keys(classDistribution.value).length
        )

        onMounted(() => {
            students.value = getStudents()
        })

        return {
            totalStudents,
            maleCount,
            femaleCount,
            classCount,
            recentStudents,
            classDistribution
        }
    }
}
</script>

<style scoped>
.dashboard {
    padding: 20px;
    background-color: #f9f9f9;
}

.stat-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.stat-card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
}

.stat-icon {
    font-size: 2.5rem;
    margin-right: 20px;
}

.stat-icon img {
    width: 40px; /* 根据需要调整图片大小 */
    height: 40px;
    object-fit: contain; /* 保持图片比例 */
}

.stat-content h3 {
    color: #666;
    margin-bottom: 5px;
}

.stat-number {
    font-size: 1.8rem;
    font-weight: bold;
    color: #333;
}

.recent-section {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
}

.recent-section h2 {
    margin-bottom: 20px;
    color: #333;
}

.recent-students table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.recent-students th,
.recent-students td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #eee;
}

.recent-students th {
    background-color: #f8f9fa;
    font-weight: bold;
    color: #333;
}

.btn {
    padding: 6px 12px;
    border-radius: 4px;
    text-decoration: none;
    font-size: 0.9rem;
    transition: background-color 0.3s, transform 0.3s;
}

.btn-edit {
    background-color: #7ee5ff;
    color: #000;
}

.btn-edit:hover {
    background-color: #48c8de;
    transform: translateY(-2px);
}

.class-distribution {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.class-distribution h2 {
    margin-bottom: 20px;
    color: #333;
}

.distribution-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
}

.distribution-card {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
}

.distribution-card h3 {
    color: #666;
    margin-bottom: 10px;
}

.distribution-number {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
}

.no-data {
    text-align: center;
    padding: 20px;
    color: #666;
}

@media (max-width: 768px) {
    .stat-cards {
        grid-template-columns: 1fr;
    }

    .distribution-cards {
        grid-template-columns: 1fr 1fr;
    }

    .recent-students {
        overflow-x: auto;
    }
}
</style>