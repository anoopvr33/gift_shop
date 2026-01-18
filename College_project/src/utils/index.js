import { jwtDecode } from "jwt-decode";

export const getId = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  return decoded.id;
};

export const getRole = () => {
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  return decode.role;
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  try {
    const decode = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decode.exp > currentTime;
  } catch (e) {
    return false;
  }
};

export const checkpermission = (roles) => {
  const loggedInUserRole = getRole();
  return roles.includes(loggedInUserRole);
};
