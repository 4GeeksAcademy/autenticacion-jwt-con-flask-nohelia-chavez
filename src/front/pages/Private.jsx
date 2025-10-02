import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_BACKEND_URL;

export default function Private(){
  const nav = useNavigate();
  const [me, setMe] = useState(null);
  const token = sessionStorage.getItem("token");

  useEffect(()=>{
    if(!token){ nav("/login"); return; }
    (async ()=>{
      const resp = await fetch(`${API}/api/private`,{
        headers:{ Authorization: `Bearer ${token}` }
      });
      if(resp.status === 401){ sessionStorage.removeItem("token"); nav("/login"); return; }
      const data = await resp.json();
      setMe(data.user);
    })();
  }, [token, nav]);

  if(!token) return null;

  return (
    <div className="container mt-4">
      <h2>Zona privada</h2>
      {me ? <pre>{JSON.stringify(me, null, 2)}</pre> : "Cargando..."}
    </div>
  );
}
