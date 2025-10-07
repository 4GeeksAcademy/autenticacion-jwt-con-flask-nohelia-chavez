//importa utilidades de react-router-dom:
//link para navegar sin recargar la pagina
//useNavigate hook para redirigir el codigo

import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => { // declara y exporta el component navbar
  const nav = useNavigate(); //funcion de la navegacion

  //lee el token guardado en sessionStorage si hay usuario registrad
  //si existe, entonces el usuario está autenticado
  const token = sessionStorage.getItem("token");


  //esta funcion cierra sesion
  //quita el token del sessionStorage
  //redirige a la pagina de /login
  const logout = ()=>{
    sessionStorage.removeItem("token");
    nav("/login");
  };
    //mi barra nav
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">React Boilerplate</Link>
        <div className="ml-auto">
          <Link className="btn btn-outline-primary me-2" to="/signup">Signup</Link>
          {!token && <Link className="btn btn-primary" to="/login">Login</Link>}
          {token && <button className="btn btn-danger" onClick={logout}>Logout</button>}  {/*boton logout */}
        </div>
      </div>
    </nav>
  );
};
