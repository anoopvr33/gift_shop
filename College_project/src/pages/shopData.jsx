import { useEffect, useState } from "react";
import "../css/pages/userProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/header";
import ProductCard from "../components/productCard";
import {
  GetAllProductHook,
  GetFilterProductHook,
  GetMyProductHook,
} from "../Hooks/productHook";
import { GetOneShopHook } from "../Hooks/shopHook";
import Arrow from "../components/arrow";
// import "../css/pages/userProfile.css";

const ShopData = () => {
  //   const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [shop, setShop] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const dataaa = await GetMyProductHook(id);

      console.log("shop all product", dataaa);
      setData(dataaa);
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    const fetchFilter = async () => {
      //   if (!search) return;

      const getshop = await GetOneShopHook(id);

      console.log("shop filter product ", getshop);
      setShop(getshop);
      //   setData(data);
    };
    fetchFilter();
  }, []);

  useEffect(() => {
    console.log("fleeeee", data);
  }, [data]);

  return (
    <div
      style={{
        margin: "40px auto",
        width: "80%",
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        // backgroundColor: "red",
      }}
      className="usershop-list"
    >
      {/* <Header></Header> */}
      {/* Search */}
      <Arrow></Arrow>
      <div style={{ display: "flex", gap: "40px" }} className="shop-head">
        <img
          style={{
            width: "200px",
            borderRadius: "20px",
            height: "300px",
            objectFit: "cover",
          }}
          src={shop?.profilepic}
          alt=""
        />
        <div className="shop-tale">
          <h1>{shop?.name}</h1>
          <p>{shop?.email}</p>
          <p>{shop?.location}</p>
          <p>
            {shop?.approve == "Not Approved" ? (
              <p style={{ color: "red" }}>Not Approved</p>
            ) : (
              ""
            )}
          </p>
        </div>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "50px",
        }}
        className="usershop-containd"
      >
        {data.length === 0 ? (
          <p style={{ textAlign: "center", width: "100%" }}>No products</p>
        ) : (
          data.map((item) => (
            //   <p>{item.category}</p>
            <ProductCard product={item}></ProductCard>
          ))
        )}
      </div>
    </div>
  );
};

export default ShopData;
