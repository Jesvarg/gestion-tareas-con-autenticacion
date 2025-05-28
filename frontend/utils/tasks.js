import api from "./api";

//Tareas  
export const getTasks = () => api.get("/tasks/").then(res => res.data);
export const getTaskById = (id) => api.get(`/tasks/${id}`).then(res => res.data);
export const createTask = (data) => api.post("/tasks/new", data);
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);
export const deleteTask = (id) => api.delete(`/tasks/delete/${id}`);