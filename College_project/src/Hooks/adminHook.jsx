import CustomAxios from "../utils/axios";

export const RegisterAdmin = async (data) => {
  if (!data) return alert("pls fill all fields");

  const response = await CustomAxios.post("/admin/signup", data);
  console.log("register admin response", response);

  if (response.data.success) {
    alert("successfull registration");
    window.location.href = "/admin-login";
  } else {
    return alert("error: email already exist");
  }
};

export const LoginAdmin = async (data) => {
  const response = await CustomAxios.post("/admin/login", data);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    window.location.href = "/admin-dashboard";
  } else {
    return alert("Invalid Credentials");
  }
};
