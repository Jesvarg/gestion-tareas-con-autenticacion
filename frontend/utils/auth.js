import api from "./api";
// Auth
export const login = (creds) => api.post("/login", creds).then(res => res.data);
export const register = (creds) => api.post("/api/register", creds).then(res => res.data);