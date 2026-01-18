import { useEffect, useState } from "react";
import "../css/pages/userProduct.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import ProductCard from "../components/productCard";
import { GetAllProductHook, GetFilterProductHook } from "../Hooks/productHook";
import { GetUser } from "../Hooks/userHook";
import { getId } from "../utils";
import Arrow from "../components/arrow";

const UserProducts = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await GetAllProductHook();

      console.log("shop all product", data);
      setData(data);
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const body = await GetUser(getId());

      console.log("Shop profile", body);
      setUser(body);
    };

    fetchUser();
  }, []);

  const fetchFilter = async () => {
    if (!search) return;

    const data = await GetFilterProductHook(search);

    console.log("shop filter product ", data);
    setData(data);
  };

  useEffect(() => {}, [data]);

  return (
    <div className="userproduct-search-page">
      {/* <Header></Header> */}
      <Arrow></Arrow>
      <h1 style={{ textAlign: "center" }}>Available Products</h1>
      {user?.block === "block" ? (
        <p style={{ textAlign: "center", color: "red" }}>
          you are unable to purchase, got blocked by admin
        </p>
      ) : (
        ""
      )}
      {/* Search */}
      <div className="userproduct-search-box">
        <input
          type="text"
          placeholder="Search Products .."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={fetchFilter}>Search</button>
      </div>

      {/* Cards */}
      <div className="userproduct-card-container">
        {data.length === 0
          ? "No products available"
          : data.map((item) => <ProductCard product={item}></ProductCard>)}
      </div>
    </div>
  );
};

export default UserProducts;
