import http from "../../lib/http";

export const login = async ({ username, password }) => {
  const res = await http.post("/auth/login", { username, password });
  return res.data;
};

export const signup = async ({ email, password, nickname }) => {
  const res = await http.post("/auth/signup", { email, password, nickname });
  return res.data;
};

export const me = async () => {
  const res = await http.get("/auth/me");
  return res.data;
};

export const logout = async () => {
  const res = await http.post("/auth/logout");
  return res.data;
};
