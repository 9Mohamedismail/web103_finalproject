import { useEffect, useState } from 'react'
import HomePage from './pages/HomePage.jsx'

const API_URL = 'http://localhost:3001'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/login/success`, {
          credentials: 'include',
        })

        if (!response.ok) {
          setUser(null)
          return
        }

        const json = await response.json()
        setUser(json.user)
      } catch {
        setUser(null)
      }
    }

    getUser()
  }, [])

  const logout = async () => {
    await fetch(`${API_URL}/auth/logout`, {
      credentials: 'include',
    })
    window.location.href = '/'
  }

  return <HomePage apiUrl={API_URL} user={user} onLogout={logout} />
}

export default App
