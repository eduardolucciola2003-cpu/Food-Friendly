import React from 'react';import { createRoot } from 'react-dom/client';
const api = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';
function App(){
  const [health,setHealth]=React.useState(null);
  React.useEffect(()=>{ fetch(api+'/health').then(r=>r.json()).then(setHealth); },[]);
  return <div style={{fontFamily:'system-ui',padding:24}}>
    <h1>Food Friendly Admin</h1>
    <p>API Base: {api}</p>
    <pre>{JSON.stringify(health,null,2)}</pre>
  </div>;
}
createRoot(document.getElementById('root')).render(<App/>);