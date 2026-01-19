import { getId } from "../utils";
import CustomAxios from "../utils/axios";

export const RegisterUser = async (data) => {
  if (!data) return alert("please fill all fields");

  const response = await CustomAxios.post("/user/signup", data);
  console.log("register user response", response);

  if (response.data.success) {
    alert("successfull registration");
    window.location.href = "/user_login";
  } else {
    return alert("Email registered or something went wrong");
  }
};

export const LoginUser = async (data) => {
  const response = await CustomAxios.post("/user/login", data);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    window.location.href = "/home";
  } else {
    return alert("Invalid Credentials");
  }
};

export const GetUser = async (data) => {
  if (!data) return alert("Id not found");

  const response = await CustomAxios.get(`/user/get/${data}`);
  console.log("My user response", response);

  if (response.data.success) {
    // alert("successfull add product");
    return response.data.myuser;
  } else {
    return alert("error occured");
  }
};

export const GetAllUser = async () => {
  const response = await CustomAxios.get(`/user/get`);
  console.log("all users response", response);

  if (response.data.success) {
    // alert("successfull add product");
    return response.data.alluser;
  } else {
    return alert("error occured");
  }
};

export const UpdateUserHook = async (data, id) => {
  if (!data) return alert("pls fill all fields");

  console.log("my sers update", data);
  // if (data) return;

  const response = await CustomAxios.patch(
    `/user/update/${id ? id : getId()}`,
    data,
  );
  console.log("register user response", response);

  if (response.data.success) {
    return alert("successfull update profile");
  } else {
    return alert("error occured");
  }
};
