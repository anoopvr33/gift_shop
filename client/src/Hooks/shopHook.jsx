import { getId } from "../utils";
import CustomAxios from "../utils/axios";

export const RegisterShop = async (data) => {
  if (!data) return alert("pls fill all fields");

  const response = await CustomAxios.post("/shop/signup", data);
  console.log("register user response", response);

  if (response.data.success) {
    alert("successfull registration");
    window.location.href = "/shop-login";
  } else {
    return alert("error occured");
  }
};

export const LoginShop = async (data) => {
  console.log("shop data", data);
  const response = await CustomAxios.post("/shop/login", data);

  console.log("shop login", response);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    window.location.href = "/shop-products";
  } else {
    return alert("Invalid Credentials");
  }
};

export const GetOneShopHook = async (data) => {
  if (!data) return alert("Id not found");

  const response = await CustomAxios.get(`/shop/get/${data}`);
  console.log("one shop response", response);

  if (response.data.success) {
    // alert("successfull add product");
    return response.data.myshop;
  } else {
    return alert("error occured");
  }
};

export const GetFilterShopHook = async (data) => {
  if (!data) return alert("Id not found");

  console.log("my daaaaat", data);

  const response = await CustomAxios.post(`/shop/get/filter`, {
    name: data,
  });
  console.log("filter product", response);

  if (response.data.success) {
    // alert("successfull add product");
    return response.data.allshop;
  } else {
    return alert("error occured");
  }
};

export const GetAllShop = async () => {
  const response = await CustomAxios.get(`/shop/get`);
  console.log("all shop response", response);

  if (response.data.success) {
    // alert("successfull add product");
    return response.data.allshop;
  } else {
    return alert("error occured");
  }
};

export const UpdateShopHook = async (data, id) => {
  if (!data) return alert("pls fill all fields");

  console.log("updated shop", data, id);
  const response = await CustomAxios.patch(
    `/shop/update/${id ? id : getId()}`,
    data
  );
  console.log("register user response", response);

  if (response.data.success) {
    return alert("successfull update shop");
  } else {
    return alert("error occured");
  }
};
