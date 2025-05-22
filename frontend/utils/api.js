import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Añadir token automáticamente si existe
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });


export const getTasks = () => api.get("/tasks/").then(res => res.data);
export const getTaskById = (id) => api.get(`/tasks/${id}`).then(res => res.data);
export const createTask = (data) => api.post("/tasks/new", data);
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);
export const deleteTask = (id) => api.delete(`/tasks/delete/${id}`);
export const login = (creds) => api.post("/login", creds);
