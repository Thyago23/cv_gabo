import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL_PROD || 'http://localhost:3000';
      const res = await axios.post(`${apiUrl}/api/login`, credentials);
      localStorage.setItem('token', res.data.token);
      navigate('/admin');
    } catch (err) {
      alert('Error de acceso');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl mb-4 font-bold">Admin</h2>
        <input 
          type="text" 
          className="block w-full mb-2 p-2 border"
          onChange={(e) => setCredentials({...credentials, username: e.target.value})}
        />
        <input 
          type="password" 
          className="block w-full mb-4 p-2 border"
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
        />
        <button className="w-full bg-black text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;