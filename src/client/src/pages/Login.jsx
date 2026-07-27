function Login({ apiUrl }) {
  const authUrl = `${apiUrl}/auth/github`

  return (
    <a className="navbar__login" href={authUrl}>
      Log in with GitHub
    </a>
  )
}

export default Login
