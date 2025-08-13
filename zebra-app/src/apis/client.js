import axios from 'axios'
const client=axios.create({baseURL:import.meta.env.VITE_API_BASE,withCredentials:true})
client.interceptors.request.use(c=>{const t=localStorage.getItem('token');if(t)c.headers.Authorization=`Bearer ${t}`;return c});
export default client
