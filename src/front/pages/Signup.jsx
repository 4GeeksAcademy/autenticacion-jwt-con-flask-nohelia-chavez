import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/+$/, "");

export default function Signup() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`${API}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      let data = {};
      try { data = await resp.json(); } catch {}
      if (!resp.ok) return setMsg(data.msg || `Error ${resp.status}`);
      setMsg("Usuario creado. Redirigiendo a login…");
      setTimeout(() => nav("/login"), 700);
    } catch {
      setMsg("No se pudo conectar con el backend");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Signup</h2>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={onSubmit}>
        <input className="form-control mb-2" type="email" placeholder="email"
          value={form.email} onChange={e=>setForm({ ...form, email: e.target.value })} required />
        <input className="form-control mb-3" type="password" placeholder="password"
          value={form.password} onChange={e=>setForm({ ...form, password: e.target.value })} required />
        <button className="btn btn-primary">Create account</button>
      </form>
    </div>
  );
}
