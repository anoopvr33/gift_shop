import { useEffect, useState } from "react";
import Sidebar from "../components/sideBar";
import "../css/Admin/dashboard.css";
import { GetAllUser } from "../Hooks/userHook";
import { GetAllShop } from "../Hooks/shopHook";
import { GetAllFeedback } from "../Hooks/feedback";
import { GetAllProductHook } from "../Hooks/productHook";
import { GetAllOrder } from "../Hooks/orderHook";

const AdminDashboard = () => {
  const [data, setData] = useState({ title: "Total Users", count: "" });
  const [data2, setData2] = useState({ title: "Total Shops", count: "" });
  const [stats, setStats] = useState({ title: "Total Feedbacks", count: "" });
  const [sold, setSold] = useState({ title: "Total Orders", count: "" });
  const [product, setProduct] = useState({
    title: "Total Products",
    count: "",
  });
  const [orders, setOrder] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const users = await GetAllUser();
      const shops = await GetAllShop();
      const feedback = await GetAllFeedback();
      const getproduct = await GetAllProductHook();
      const getOrder = await GetAllOrder();

      console.log("shop all product", data, getOrder);
      setOrder(getOrder);
      setData({ ...data, count: users.length });
      setData2({ ...data2, count: shops.length });
      setStats({ ...stats, count: feedback.length });
      setSold({ ...sold, count: getOrder.length });
      setProduct({ ...product, count: getproduct.length });
    };

    fetchProduct();
  }, []);

  useEffect(() => {}, [data, data2, stats, orders]);

  return (
    <div className="admin-dashboard">
      <Sidebar></Sidebar>
      <h1>Dashboard</h1>

      <div className="stats-container">
        <div className="stat-card">
          <h2>{data.count}</h2>
          <p>{data.title}</p>
        </div>{" "}
        <div className="stat-card">
          <h2>{data2.count}</h2>
          <p>{data2.title}</p>
        </div>{" "}
        <div className="stat-card">
          <h2>{product.count}</h2>
          <p>{product.title}</p>
        </div>
        <div className="stat-card">
          <h2>{sold.count}</h2>
          <p>{sold.title}</p>
        </div>
      </div>
      <div className="table-wrapper">
        <table className="order-products-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product Name</th>
              <th>User</th>
              <th>Status</th>
              {/* <th>Placed At</th> */}
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-row">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.product.productname}</td>
                  <td>
                    {order.user?.name} <br />
                    <small>{order.customer?.email}</small>
                  </td>
                  <td>
                    <span className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  {/* <td>Expected next 2 days</td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
