import { useNavigate } from "react-router-dom";
import "../css/components/productCard.css";
import { AddCartHook } from "../Hooks/cartHook";
import { useEffect, useState } from "react";
import { GetUser } from "../Hooks/userHook";
import { getId } from "../utils";

const ProductCard = ({ product, admin }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  console.log("fless", product);

  useEffect(() => {
    const fetchUser = async () => {
      const body = await GetUser(getId());

      console.log("Shop profile", body);
      setUser(body);
    };

    fetchUser();
  }, []);

  return (
    <div className="product-card">
      <img src={product?.image} alt={product?.name} />

      <div className="product-info">
        <span className="type">{product?.type}</span>
        <p>{product?.category}</p>
        <h2>{product?.productname}</h2>

        <p style={{ fontWeight: "700", fontSize: "16px" }}>
          <span className="price">₹{product?.price}</span>{" "}
        </p>
        <p>
          <b>Quantity:</b>{" "}
          {product?.isAvailable ? (
            "Is Available"
          ) : (
            <b style={{ color: "red" }}>Not Available</b>
          )}
        </p>
        <p>
          <b>shopname:</b> {product?.seller?.name}
        </p>
        <p>
          <b>Location:</b> {product?.location}
        </p>

        <div className="btn-group">
          {admin ? (
            ""
          ) : (
            <button
              disabled={!product?.isAvailable || user.block === "block"}
              onClick={() => AddCartHook(product?._id, product.seller._id)}
              className="cart"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
