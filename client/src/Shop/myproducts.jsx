import { useEffect, useState } from "react";
import "../css/pages/userProduct.css";
import { useNavigate } from "react-router-dom";
// import Header from "../components/header";
import ProductCard from "../components/productCard";
import ShopHeader from "../components/shopHeader";
import ShopProductCard from "../components/shopProductCard";
import {
  GetAllProductHook,
  GetFilterProductHook,
  GetMyFilterProductHook,
  GetMyProductHook,
} from "../Hooks/productHook";
import { getId } from "../utils";
import Arrow from "../components/arrow";

const MyProducts = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await GetMyProductHook(getId());

      console.log("shop all product", data);
      setData(data);
    };

    fetchProduct();
  }, []);

  const fetchFilter = async () => {
    if (!search) return;

    const data = await GetMyFilterProductHook(search);

    console.log("shop filter product", data);
    setData(data);
  };

  useEffect(() => {}, [data]);

  return (
    <div className="userproduct-search-page">
      <ShopHeader></ShopHeader>
      {/* <Arrow></Arrow> */}

      <h1>Product List</h1>
      <button
        onClick={() => navigate("/shop-add")}
        style={{
          backgroundColor: "rgba(5, 116, 243, 1)",
          padding: "10px",
          color: "white",
          border: "none",
        }}
      >
        Add Product +
      </button>
      {/* Search */}
      {/* <div className="userproduct-search-box">
        <input
          type="text"
          placeholder="Search Products .."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={fetchFilter}>Search</button>
      </div>  */}
      {/* Cards */}
      <div className="userproduct-card-container-shop">
        {data.length === 0 ? (
          <p>No Products </p>
        ) : (
          data?.map((item) => (
            <ShopProductCard product={item}></ShopProductCard>
          ))
        )}
      </div>
    </div>
  );
};

export default MyProducts;
