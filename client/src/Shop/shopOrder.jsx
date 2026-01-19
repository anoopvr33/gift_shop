import { useEffect, useState } from "react";
import "../css/pages/userOrder.css";
import { GetAllOrderShopHook, UpdateOrderHook } from "../Hooks/orderHook";
import ShopHeader from "../components/shopHeader";
import Arrow from "../components/arrow";

const ShopOrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await GetAllOrderShopHook();

      const mappedOrders = data.map((i) => ({
        id: i._id,
        image: i.product.image,
        name: i.product.productname,
        quantity: i.quantity,
        total: i.product.price * i.quantity,
        status: i.status,
        payment: i.payment || "Paid",
      }));

      setOrders(mappedOrders);
    };

    fetchOrders();
  }, []);

  const handleStatusChange = (id, value) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: value } : o))
    );
  };

  const handleUpdate = (status, id) => {
    UpdateOrderHook(status, id);
  };

  return (
    <div className="order-page">
      <Arrow></Arrow>
      {/* <ShopHeader /> */}
      <h2>Shop Orders</h2>

      {orders.length === 0 ? (
        <p className="empty">No orders found</p>
      ) : (
        <div className="table-wrapper">
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Total (₹)</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((ord) => (
                <tr key={ord.id}>
                  <td>{ord.id}</td>

                  <td className="product-cell">
                    <img src={ord.image} alt={ord.name} />
                    <span>{ord.name}</span>
                  </td>

                  <td>{ord.quantity}</td>
                  <td>{ord.total}</td>

                  <td>
                    <span className={`status ${ord.status.toLowerCase()}`}>
                      {ord.status}
                    </span>

                    <select
                      value={ord.status}
                      onChange={(e) =>
                        handleStatusChange(ord.id, e.target.value)
                      }
                      style={{ marginLeft: "10px" }}
                    >
                      <option value="pending">Pending</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td>
                    <button
                      style={{
                        backgroundColor: "green",
                        padding: "10px",
                        color: "white",
                      }}
                      onClick={() => handleUpdate(ord.status, ord.id)}
                      className="update-btn"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShopOrderHistory;
