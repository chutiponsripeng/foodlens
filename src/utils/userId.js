// สร้าง userId แบบ random และเก็บไว้ใน localStorage
export function getUserId() {
  let userId = localStorage.getItem('foodlens_user_id')
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substr(2, 9)
    localStorage.setItem('foodlens_user_id', userId)
  }
  return userId
}