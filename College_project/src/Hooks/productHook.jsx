import { getId } from "../utils";
import CustomAxios from "../utils/axios";

export const AddProductHook = async (data) => {
  if (!data) return alert("pls fill all fields");

  const response = await CustomAxios.post("/product/add", data);
  console.log("add product", response);

  if (response.data.success) {
    return alert("successfull add product");
  } else {
    return alert("error occured");
  }
};

export const GetAllProductHook = async () => {
  //   if (!data) return alert("pls fill all fields");

  const response = await CustomAxios.get("/product/get");
  console.log("all aproducts", response);

  if (response.data.success) {
    // alert("successfull add product");
    return response.data.allproduct;
  } else {
    return alert("error occured");
  }
};

export const GetOneProductHook = async (data) => {
  if (!data) return alert("Id not found");

  const response = await CustomAxios.get(`/product/get/${data}`);
  console.log("register user response", response);

  if (response.data.success) {
    // alert("successfull add product");
    return response.data.product;
  } else {
    return alert("error occured");
  }
};

export const GetOneProductForEdit = async (data) => {
  if (!data) return alert("Id not found");

  const response = await CustomAxios.get(`/product/get-one/${data}`);
  console.log("register user response", response);

  if (response.data.success) {
    // alert("successfull add product");
    return response.data.allproduct;
  } else {
    return alert("error occured");
  }
};

export const GetMyProductHook = async (data) => {
  if (!data) return alert("Id not found");

  const response = await CustomAxios.get(`/product/get/my/${data}`);
  console.log("register user response", response);

  if (response.data.success) {
    // alert("successfull add product");
    return response.data.allproduct;
  } else {
    return alert("error occured");
  }
};

export const GetFilterProductHook = async (data) => {
  if (!data) return alert("Id not found");

  const response = await CustomAxios.post(`/product/get/filter`, {
    productname: data,
  });
  console.log("filter product", response);

  if (response.data.success) {
    // alert("successfull add product");
    return response.data.allproduct;
  } else {
    return alert("error occured");
  }
};
export const GetMyFilterProductHook = async (data) => {
  if (!data) return alert("Id not found");

  const response = await CustomAxios.post(`/product/get/filter/${getId()}`, {
    productname: data,
  });
  console.log("filter product", response);

  if (response.data.success) {
    // alert("successfull add product");
    return response.data.allproduct;
  } else {
    return alert("error occured");
  }
};

export const UpdateProductHook = async (data, id) => {
  if (!data) return alert("pls fill all fields");

  const response = await CustomAxios.patch(`/product/update/${id}`, data);
  console.log("register user response", response);

  if (response.data.success) {
    return alert("successfull update product");
  } else {
    return alert("error occured");
  }
};
