import { useNavigate } from "react-router-dom";
import "../css/components/shopProduct.css";

const ShopProductTable = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="one-table-wrapper">
      <table className="one-product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price (₹)</th>
            <th>Availability</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr key={product._id}>
            <td>
              <img
                src={product.image}
                alt={product.productname}
                className="table-img"
              />
            </td>

            <td>{product.productname}</td>
            <td>{product.category}</td>
            <td>₹{product.price}</td>

            <td>
              <span
                className={`availability ${
                  product.isAvailable ? "available" : "out"
                }`}
              >
                {product.isAvailable ? "Available" : "Out of Stock"}
              </span>
            </td>

            <td>{product.location}</td>

            <td>
              <button
                className="update-btn"
                onClick={() => navigate(`/edit-product/${product._id}`)}
              >
                Update
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShopProductTable;
