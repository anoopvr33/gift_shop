import { getId } from "../utils";
import CustomAxios from "../utils/axios";

export const AddOrderHook = async (data) => {
  if (!data) return alert("pls fill all fields");

  const response = await CustomAxios.post("/order/add", data);
  console.log("register user response", response);

  if (response.data.success) {
    return alert("successfull add product");
  } else {
    return alert("error occured");
  }
};

export const GetAllOrderHook = async () => {
  //   if (!data) return alert("pls fill all fields");

  const response = await CustomAxios.get(`/sold/get/my/${getId()}`);
  console.log("order response", response);

  if (response.data.success) {
    // alert("successfull add product");
    return response.data.orders;
  } else {
    return alert("error occured");
  }
};
export const GetAllOrderShopHook = async () => {
  //   if (!data) return alert("pls fill all fields");

  const response = await CustomAxios.get(`/sold/get/shop/${getId()}`);
  console.log("order response", response);

  if (response.data.success) {
    // alert("successfull add product");
    return response.data.orders;
  } else {
    return alert("error occured");
  }
};
export const GetAllOrder = async () => {
  //   if (!data) return alert("pls fill all fields");

  const response = await CustomAxios.get(`/sold/get-all`);
  console.log("order response", response);

  if (response.data.success) {
    // alert("successfull add product");
    return response.data.orders;
  } else {
    return alert("error occured");
  }
};

export const UpdateOrderHook = async (data, id) => {
  if (!data) return alert("pls fill all fields");

  const response = await CustomAxios.patch(`/sold/update/${id}`, {
    status: data,
  });
  console.log("order update", response);

  if (response.data.success) {
    return alert("successfull updated order");
  } else {
    return alert("error occured");
  }
};
