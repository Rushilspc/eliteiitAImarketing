const VALID_EMAIL = 'eliteiit123@gmail.com'
const VALID_PASSWORD = 'Elite1801@'

export function validateCredentials(email: string, password: string): boolean {
  return email === VALID_EMAIL && password === VALID_PASSWORD
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('isAuthenticated') === 'true'
}

export function setAuthenticated(value: boolean): void {
  if (typeof window === 'undefined') return
  if (value) {
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userEmail', VALID_EMAIL)
  } else {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userEmail')
  }
}

export function getUserEmail(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('userEmail')
}

export function logout(): void {
  setAuthenticated(false)
}
