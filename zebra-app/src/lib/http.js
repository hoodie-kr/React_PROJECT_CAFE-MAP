import axios from "axios";

const http = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default http;
