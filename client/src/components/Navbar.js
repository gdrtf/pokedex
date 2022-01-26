import { Link } from "react-router-dom";

export default function Navbar({ user }) {
  const logout = () => {
    window.open("http://localhost:3001/auth/logout", "_self")
  }

  return (
    <div className="navbar">
      <span className="title">
        <Link className="menu link" to="/">Pokédex</Link>
      </span>
      {user ? (
        <ul className="menu-group">
          <li className="menu">
            <img src={user.photos[0].value} alt="user" className="avatar" />
          </li>
          <li className="menu">{user.displayName}</li>
          <li className="menu link" onClick={logout}>Logout</li>
        </ul>
      ) : (
        <Link className="menu link" to="/login">Login</Link>
      )}
    </div>
  )
}