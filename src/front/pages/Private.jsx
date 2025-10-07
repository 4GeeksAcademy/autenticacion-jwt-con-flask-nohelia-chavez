import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; {/*redirige si ek token es invalido*/}

const API = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/+$/, "");

export default function Private() {
  const nav = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");  {/*lee el tokendel sessionStorage*/}
    if (!token) { nav("/login"); return; }            {/*si no hay token vuelve al login*/}


    {/*llama a GET api/private */}
    fetch(`${API}/api/private`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => setUser(d.data))
      .catch(() => nav("/login"));
  }, [nav]);

  const logout = () => { sessionStorage.removeItem("token"); nav("/login"); };

  return (
    <div className="container mt-4">
      <h2>Zona privada</h2>
      <pre className="bg-light p-3 rounded">{JSON.stringify(user, null, 2)}</pre>
      <button className="btn btn-outline-danger mt-3" onClick={logout}>Logout</button>
    </div>
  );
}
