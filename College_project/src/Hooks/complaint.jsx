import { getId } from "../utils";
import CustomAxios from "../utils/axios";

export const AddComplaint = async (data) => {
  if (!data) return alert("pls fill all fields");

  const response = await CustomAxios.post("/complaint/post", {
    customer: getId(),
    complaint: data,
  });
  console.log("add complaint", response);

  if (response.data.success) {
    return alert("successfull submitted");
  } else {
    return alert("error occured");
  }
};
export const AddShopComplaint = async (data) => {
  if (!data) return alert("pls fill all fields");

  const response = await CustomAxios.post("/complaint/post", {
    seller: getId(),
    complaint: data,
  });
  console.log("add complaint", response);

  if (response.data.success) {
    return alert("successfull submitted");
  } else {
    return alert("error occured");
  }
};

export const GetAllComplaint = async () => {
  //   if (!data) return alert("pls fill all fields");

  const response = await CustomAxios.get("/complaint/cus/get");
  console.log("all complaint", response);

  if (response.data.success) {
    // alert("successfull add product");
    return response.data.alldata;
  } else {
    return alert("error occured");
  }
};
export const GetAllShopComplaint = async () => {
  //   if (!data) return alert("pls fill all fields");

  const response = await CustomAxios.get("/complaint/sel/get");
  console.log("all complaint", response);

  if (response.data.success) {
    // alert("successfull add product");
    return response.data.alldata;
  } else {
    return alert("error occured");
  }
};

export const DeleteComplaint = async (res) => {
  //   if (!data) return alert("pls fill all fields");

  const response = await CustomAxios.delete(`/complaint/delete/${res}`);
  console.log("delete cart response", response);

  if (response.data.success) {
    // window.location.href = `/payment-success?reference=${res.data.reference}`;
    return alert("successfully deleted");
    // return response.data.allproduct;
  } else {
    return alert("error occured");
  }
};
