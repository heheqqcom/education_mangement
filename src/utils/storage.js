export const saveStudents = (students) => {
  localStorage.setItem('students', JSON.stringify(students))
}

export const register = (userData) => {
  // 保存到用户列表
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  users.push(userData)
  localStorage.setItem('users', JSON.stringify(users))
  
  // 保存当前用户数据
  localStorage.setItem('userData', JSON.stringify(userData))
}

export const initializeUsers = () => {
  if (!localStorage.getItem('users')) {
    const defaultUsers = [
      {
        id: 1,
        username: 'deng123',
        password: '123456',
        email: '333666999@qq.com'
      }
    ]
    localStorage.setItem('users', JSON.stringify(defaultUsers))
  }
}

export const getStudents = () => {
  return JSON.parse(localStorage.getItem('students') || '[]')
}

export const addStudent = (student) => {
  const students = getStudents()
  // 获取最大ID并生成新的学生号
  const maxId = students.reduce((max, student) => {
    return student.id > max ? student.id : max
  }, 0)
  
  // 新增学生时自动生成ID和学号
  const newStudent = {
    id: maxId + 1,
    studentId: `STU${String(maxId + 1).padStart(4, '0')}`,  // 生成学号 STU0001
    ...student
  }
  
  students.push(newStudent)
  saveStudents(students)
  return newStudent
}


export const updateStudent = (id, updatedStudent) => {
  const students = getStudents()
  const index = students.findIndex(s => s.id === id)
  if (index !== -1) {
    students[index] = { ...students[index], ...updatedStudent }
    saveStudents(students)
  }
}

export const deleteStudent = (id) => {
  const students = getStudents()
  const filteredStudents = students.filter(s => s.id !== id)
  saveStudents(filteredStudents)
}


// 初始化示例数据
const initializeStudentData = () => {
  const defaultStudents = [
    {
      id: 1,
      studentId: 'STU0001',
      name: '张三',
      age: 20,
      gender: '男',
      className: '计算机科学1班',
      phone: '13800138001',
      email: 'zhangsan@example.com',
      address: '北京市海淀区',
      remarks: '班级代表'
    },
    {
      id: 2,
      studentId: 'STU0002',
      name: '李四',
      age: 19,
      gender: '女',
      className: '计算机科学1班',
      phone: '13800138002',
      email: 'lisi@example.com',
      address: '上海市浦东新区',
      remarks: '学习委员'
    },
    {
      id: 3,
      studentId: 'STU0003',
      name: '王五',
      age: 21,
      gender: '男',
      className: '软件工程2班',
      phone: '13800138003',
      email: 'wangwu@example.com',
      address: '广州市天河区',
      remarks: '体育委员'
    },
    {
      id: 4,
      studentId: 'STU0004',
      name: '赵六',
      age: 20,
      gender: '女',
      className: '软件工程2班',
      phone: '13800138004',
      email: 'zhaoliu@example.com',
      address: '深圳市南山区',
      remarks: '生活委员'
    },
    {
      id: 5,
      studentId: 'STU0005',
      name: '孙七',
      age: 19,
      gender: '男',
      className: '数据科学3班',
      phone: '13800138005',
      email: 'sunqi@example.com',
      address: '成都市武侯区',
      remarks: '团支书'
    }
  ]

  // 如果本地存储中没有数据，则初始化
  if (!localStorage.getItem('students')) {
    localStorage.setItem('students', JSON.stringify(defaultStudents))
  }
}

// 在应用启动时调用初始化函数
initializeStudentData()

// 课程相关的存储方法
export const getCourses = () => {
  return JSON.parse(localStorage.getItem('courses') || '[]')
}

export const getCourseById = (id) => {
  const courses = getCourses()
  return courses.find(course => course.id === id)
}

export const addCourse = (course) => {
  const courses = getCourses()
  const maxId = courses.reduce((max, course) => Math.max(max, course.id), 0)
  
  const newCourse = {
    id: maxId + 1,
    courseId: `C${String(maxId + 1).padStart(4, '0')}`,
    createTime: new Date().toISOString(),
    ...course
  }
  
  courses.push(newCourse)
  localStorage.setItem('courses', JSON.stringify(courses))
  return newCourse
}

export const updateCourse = (id, courseData) => {
  const courses = getCourses()
  const index = courses.findIndex(course => course.id === id)
  
  if (index !== -1) {
    courses[index] = {
      ...courses[index],
      ...courseData,
      updateTime: new Date().toISOString()
    }
    localStorage.setItem('courses', JSON.stringify(courses))
    return courses[index]
  }
  return null
}

export const deleteCourse = (id) => {
  const courses = getCourses()
  const filteredCourses = courses.filter(course => course.id !== id)
  localStorage.setItem('courses', JSON.stringify(filteredCourses))
}

export const getTeacherCourses = (teacherId) => {
  const courses = getCourses()
  return courses.filter(course => course.teacherId === teacherId)
}

export const searchCourses = (query) => {
  const courses = getCourses()
  const lowercaseQuery = query.toLowerCase()
  
  return courses.filter(course => 
    course.name.toLowerCase().includes(lowercaseQuery) ||
    course.courseId.toLowerCase().includes(lowercaseQuery)
  )
}

export const filterCoursesByType = (type) => {
  const courses = getCourses()
  return courses.filter(course => course.type === type)
}

export const initializeCourses = () => {
  if (localStorage.getItem('courses')) {
    return
  }

  const courses = [
    {
      id: 1,
      courseId: 'C0001',
      name: '高等数学(上)',
      teacherId: 1,
      credits: 5.0,
      hours: 80,
      type: '必修',
      schedule: '周一 1-2节, 周三 3-4节',
      location: '教学楼A-101',
      description: '主要包含函数、极限、导数、积分等内容'
    },
    {
      id: 2,
      courseId: 'C0002',
      name: '大学物理(上)',
      teacherId: 2,
      credits: 4.0,
      hours: 64,
      type: '必修',
      schedule: '周二 3-4节, 周四 1-2节',
      location: '理科楼B-202',
      description: '力学、热学基础知识'
    },
    {
      id: 3,
      courseId: 'C0003',
      name: '程序设计基础',
      teacherId: 1,
      credits: 3.5,
      hours: 56,
      type: '必修',
      schedule: '周一 5-6节, 周五 3-4节',
      location: '计算机楼C-303',
      description: 'C语言程序设计入门课程'
    },
    {
      id: 4,
      courseId: 'C0004',
      name: '线性代数',
      teacherId: 1,
      credits: 3.0,
      hours: 48,
      type: '必修',
      schedule: '周二 1-2节',
      location: '教学楼A-201',
      description: '矩阵、向量空间、线性变换等内容'
    },
    {
      id: 5,
      courseId: 'C0005',
      name: '数据结构',
      teacherId: 2,
      credits: 4.0,
      hours: 64,
      type: '必修',
      schedule: '周三 5-6节, 周五 7-8节',
      location: '计算机楼C-305',
      description: '基础数据结构与算法设计'
    },
    {
      id: 6,
      courseId: 'C0006',
      name: '计算机网络',
      teacherId: 2,
      credits: 3.5,
      hours: 56,
      type: '选修',
      schedule: '周四 3-4节',
      location: '计算机楼C-401',
      description: 'TCP/IP协议栈与网络编程基础'
    },
    {
      id: 7,
      courseId: 'C0007',
      name: '数据库原理',
      teacherId: 1,
      credits: 3.0,
      hours: 48,
      type: '选修',
      schedule: '周五 5-6节',
      location: '计算机楼C-302',
      description: '关系数据库理论与SQL语言'
    },
    {
      id: 8,
      courseId: 'C0008',
      name: '操作系统',
      teacherId: 1,
      credits: 4.0,
      hours: 64,
      type: '必修',
      schedule: '周二 5-6节, 周四 7-8节',
      location: '计算机楼C-304',
      description: '操作系统原理与实现技术'
    }
  ]
  
  localStorage.setItem('courses', JSON.stringify(courses))
}




// Teacher 相关方法
export const getTeachers = () => {
  return JSON.parse(localStorage.getItem('teachers') || '[]')
}

export const getTeacherById = (id) => {
  const teachers = getTeachers()
  return teachers.find(teacher => teacher.id === id)
}

export const addTeacher = (teacher) => {
  const teachers = getTeachers()
  const maxId = teachers.reduce((max, teacher) => Math.max(max, teacher.id), 0)
  
  const newTeacher = {
    id: maxId + 1,
    teacherId: `T${String(maxId + 1).padStart(4, '0')}`,
    createTime: new Date().toISOString(),
    ...teacher
  }
  
  teachers.push(newTeacher)
  localStorage.setItem('teachers', JSON.stringify(teachers))
  return newTeacher
}

export const updateTeacher = (id, teacherData) => {
  const teachers = getTeachers()
  const index = teachers.findIndex(teacher => teacher.id === id)
  
  if (index !== -1) {
    teachers[index] = {
      ...teachers[index],
      ...teacherData,
      updateTime: new Date().toISOString()
    }
    localStorage.setItem('teachers', JSON.stringify(teachers))
    return teachers[index]
  }
  return null
}

export const deleteTeacher = (id) => {
  const teachers = getTeachers()
  const filteredTeachers = teachers.filter(teacher => teacher.id !== id)
  localStorage.setItem('teachers', JSON.stringify(filteredTeachers))
}

// 初始化教师数据
export const initializeTeachers = () => {
  if (localStorage.getItem('teachers')) {
    return
  }

  const teachers = [
    {
      id: 1,
      teacherId: 'T0001',
      name: '张教授',
      gender: '男',
      title: '教授',
      department: '数学系',
      phone: '13800138001',
      email: 'zhang@example.com',
      office: 'A-101'
    },
    {
      id: 2,
      teacherId: 'T0002',
      name: '李副教授',
      gender: '女',
      title: '副教授',
      department: '物理系',
      phone: '13800138002',
      email: 'li@example.com',
      office: 'B-202'
    }
  ]
  
  localStorage.setItem('teachers', JSON.stringify(teachers))
}
