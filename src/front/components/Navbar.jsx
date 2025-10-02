import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const nav = useNavigate();
  const token = sessionStorage.getItem("token");

  const logout = ()=>{
    sessionStorage.removeItem("token");
    nav("/login");
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">React Boilerplate</Link>
        <div className="ml-auto">
          <Link className="btn btn-outline-primary me-2" to="/signup">Signup</Link>
          {!token && <Link className="btn btn-primary" to="/login">Login</Link>}
          {token && <button className="btn btn-danger" onClick={logout}>Logout</button>}
        </div>
      </div>
    </nav>
  );
};
