import axios from "axios";

const CustomAxios = axios.create({
  baseURL: "http://localhost:3003",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default CustomAxios;
