import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login2";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import axios from 'axios';
import cookies from 'js-cookie';

export const publicAPI = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const privateAPI = axios.create({
  baseURI:"http://localhost:3000/api",
  withCredentials: true,
});

privateAPI.interceptors.request.use((config)=> {
  const token = cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
