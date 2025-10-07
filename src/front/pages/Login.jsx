import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/+$/, "");

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" }); //estado control de dos campos
  const [msg, setMsg] = useState("");                            //errores para mostrar al user


  //POST
  const onSubmit = async (e) => {  //manejador
    e.preventDefault();            //evita el racargo de  la pagina

    //llama al endpoint, envia  json y define headers
    try {
      const resp = await fetch(`${API}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });


      {/*si el backend no responde JSON por error, 500, 404... el catch {} evita que la app se rompa y deja data = {}.*/}
      let data = {};
      try { data = await resp.json(); } catch {}
      if (!resp.ok) return setMsg(data.msg || "Login inválido");
      sessionStorage.setItem("token", data.token);
      nav("/private");
    } catch {
      setMsg("No se pudo conectar con el backend");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={onSubmit}>
        <input className="form-control mb-2" type="email" placeholder="email"
          value={form.email} onChange={e=>setForm({ ...form, email: e.target.value })} required />
        <input className="form-control mb-3" type="password" placeholder="password"
          value={form.password} onChange={e=>setForm({ ...form, password: e.target.value })} required />
        <button className="btn btn-success">Login</button>
      </form>
    </div>
  );
}
