import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("Loading…");

  useEffect(() => {
    const API = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/+$/, "");
    fetch(`${API}/api/hello`)
      .then(r => r.json())
      .then(d => setMessage(d.message))
      .catch(() => setMessage("Backend no disponible"));
  }, []);

  return (
    <div className="container mt-4">
      <h1>Hello Rigo!!</h1>
      <p className="alert alert-info">{message}</p>
    </div>
  );
}
