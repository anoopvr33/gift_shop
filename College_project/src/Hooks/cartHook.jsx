import { getId } from "../utils";
import CustomAxios from "../utils/axios";

export const AddCartHook = async (data, sell) => {
  if (!data) return alert("some error");

  const response = await CustomAxios.post("/cart/post", {
    product: data,
    customer: getId(),
    seller: sell,
  });
  console.log("add cart response", response);

  if (response.data.success) {
    return alert("successfull added cart, please refresh");
  } else {
    return alert("error occured");
  }
};

export const GetAllCartHook = async () => {
  //   if (!data) return alert("pls fill all fields");

  const response = await CustomAxios.get(`/cart/get/${getId()}`);
  console.log("get cart response", response);

  if (response.data.success) {
    // alert("successfull add product");
    return response.data.allcart;
  } else {
    return alert("error occured");
  }
};

export const DeleteAllCartHook = async (res) => {
  //   if (!data) return alert("pls fill all fields");

  const response = await CustomAxios.delete(`/cart/delete/many/${getId()}`);
  console.log("delete cart response", response);

  if (response.data.success) {
    window.location.href = `/payment-success?reference=${res.data.reference}`;
    // alert("successfully deleted");
    // return response.data.allproduct;
  } else {
    return alert("error occured");
  }
};

export const UpdateCartHook = async (id, qty) => {
  //   if (!data) return alert("pls fill all fields");

  const response = await CustomAxios.patch(`/cart/update/${id}`, {
    quantity: qty,
  });
  console.log("register user response", response);

  if (response.data.success) {
    alert("successfully updated");
    // return response.data.allproduct;
  } else {
    return alert("error occured");
  }
};

export const DeleteOneCartHook = async (id) => {
  //   if (!data) return alert("pls fill all fields");

  const response = await CustomAxios.delete(`/cart/delete/${id}`);
  console.log("register user response", response);

  if (response.data.success) {
    alert("successfully deleted");
    // return response.data.allproduct;
  } else {
    return alert("error occured");
  }
};
