import { getId } from "../utils";
import CustomAxios from "../utils/axios";

export const AddFeedback = async (data) => {
  if (!data) return alert("pls fill all fields");

  const response = await CustomAxios.post("/feedback/post", {
    customer: getId(),
    feedback: data,
  });
  console.log("add complaint", response);

  if (response.data.success) {
    return alert("successfull submitted");
  } else {
    return alert("error occured");
  }
};

export const GetAllFeedback = async () => {
  //   if (!data) return alert("pls fill all fields");

  const response = await CustomAxios.get("/feedback/get");
  console.log("all complaint", response);

  if (response.data.success) {
    // alert("successfull add product");
    return response.data.alldata;
  } else {
    return alert("error occured");
  }
};

export const DeleteFeedback = async (res) => {
  //   if (!data) return alert("pls fill all fields");

  const response = await CustomAxios.delete(`/feedback/delete/${res}`);
  console.log("delete cart response", response);

  if (response.data.success) {
    // window.location.href = `/payment-success?reference=${res.data.reference}`;
    return alert("successfully deleted");
    // return response.data.allproduct;
  } else {
    return alert("error occured");
  }
};
