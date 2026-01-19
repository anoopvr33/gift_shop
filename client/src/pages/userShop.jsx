import { useEffect, useState } from "react";
import "../css/pages/userShop.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import { GetAllShop, GetFilterShopHook } from "../Hooks/shopHook";
import Arrow from "../components/arrow";

const data = [
  {
    id: 1,
    name: "Mountain",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
  {
    id: 2,
    name: "Beach",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    id: 3,
    name: "Forest",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  {
    id: 4,
    name: "Desert",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
];

const UserShop = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await GetAllShop();

      console.log("shop all product", data);
      setData(data);
    };

    fetchProduct();
  }, []);

  const fetchFilter = async () => {
    if (!search) return;

    const data = await GetFilterShopHook(search);

    console.log("shop filter product", data);
    setData(data);
  };

  useEffect(() => {}, [data]);

  return (
    <div className="search-page">
      <Arrow></Arrow>
      {/* <Header></Header> */}
      <h1 style={{ textAlign: "center" }}>Explore Shopes</h1>

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={fetchFilter}>Search</button>
      </div>

      {/* Cards */}
      <div className="card-container">
        {data.map((item) => (
          <div className="card" key={item._id}>
            <img src={item.profilepic} alt={item.name} />
            <h2>{item.name}</h2>
            <p>Owner:{item.owner}</p>
            <p>Location:{item.location}</p>
            <p>{item.type}</p>
            <p>{item.category}</p>
            <p
              onClick={() => (window.location.href = `tel:${item.phone}`)}
              style={{
                border: "1px solid green",
                width: "fit-content",
                margin: "auto",
                marginBottom: "20px",
                padding: "5px 10px",
              }}
            >
              Contact
            </p>
            <button
              onClick={() => navigate(`/shop/${item._id}`)}
              style={{
                width: "200px",
                padding: "10px",
                borderRadius: "20px",
                backgroundColor: "rgba(77, 110, 210, 1)",
                color: "white",
              }}
            >
              view products
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserShop;
