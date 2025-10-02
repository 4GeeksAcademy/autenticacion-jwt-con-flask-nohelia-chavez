import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_BACKEND_URL;

export default function Login(){
  const nav = useNavigate();
  const [form, setForm] = useState({email:"", password:""});
  const [msg, setMsg] = useState("");

  const onSubmit = async (e)=>{
    e.preventDefault();
    const resp = await fetch(`${API}/api/login`,{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(form)
    });
    const data = await resp.json();
    if(resp.ok){
      sessionStorage.setItem("token", data.token);
      setMsg("¡Login OK! Redirigiendo…");
      nav("/private");
    }else{
      setMsg(data.msg || "Login inválido");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={onSubmit}>
        <input className="form-control mb-2" type="email" placeholder="email"
               value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <input className="form-control mb-3" type="password" placeholder="password"
               value={form.password} onChange={e=>setForm({...form, password:e.target.value})}/>
        <button className="btn btn-success">Login</button>
      </form>
    </div>
  );
}
