export const login = (username, password) => {
  const loginTime = new Date().getTime()
  localStorage.setItem('loginTime', loginTime)
  localStorage.setItem('token', 'user-token')
}

export const checkAuth = () => {
  const loginTime = localStorage.getItem('loginTime')
  const currentTime = new Date().getTime()
  const threeHours = 48 * 60 * 60 * 1000
  
  return loginTime && (currentTime - loginTime < threeHours)
}

export const logout = () => {
  localStorage.removeItem('loginTime')
  localStorage.removeItem('token')
}
