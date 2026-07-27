import './Avatar.css'

function Avatar({ user }) {
  return (
    <div className="Avatar">
      <img
        className="user-img"
        src={user.avatarurl}
        alt={`${user.username}'s avatar`}
      />
    </div>
  )
}

export default Avatar
