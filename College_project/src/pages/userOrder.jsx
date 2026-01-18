import { useEffect, useState } from "react";
import Header from "../components/header";
import "../css/pages/userOrder.css";
import { GetAllOrderHook, UpdateOrderHook } from "../Hooks/orderHook";
import Arrow from "../components/arrow";

const OrderHistory = () => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const GetCart = async () => {
      const data = await GetAllOrderHook();
      const MyOrder = data.map((i) => {
        // return {
        //   image: i.product.image,
        //   name: i.product.productname,
        //   price: i.product.price,
        //   id: i._id,
        //   quantity: i.quantity,
        //   status: i.status,
        //   date: new Date(),
        //   total: i.product.price * i.quantity,
        // };
        const date = new Date();
        return {
          status: i.status,
          image: i.product.image,
          name: i.product.productname,
          id: i._id,
          quantity: i.quantity,
          date: date.toLocaleDateString(),
          total: i.product.price * i.quantity,
        };
      });

      console.log("mu order", data);

      setOrder(MyOrder);
    };
    GetCart();
  }, []);

  return (
    // <div className="order-container">
    //   <Header></Header>
    //   {/* <h1>Order History</h1> */}

    //   {order.length === 0 ? (
    //     <p className="empty">No orders found</p>
    //   ) : (
    //     order.map((order) => (
    //       <div className="order-card" key={order.id}>
    //         <div className="order-header">
    //           <div>
    //             <h3>{order.id}</h3>
    //             <p>Date: {order.date}</p>
    //           </div>

    //           <span className={`status ${order.status.toLowerCase()}`}>
    //             {order.status}
    //           </span>
    //         </div>

    //         <div className="order-items">
    //           <p>
    //             <img
    //               style={{
    //                 width: "100px",
    //                 height: "60px",
    //                 objectFit: "cover",
    //                 borderRadius: "10px",
    //               }}
    //               src={order.image}
    //               alt=""
    //             />
    //             {order.name} × {order.quantity}
    //           </p>
    //         </div>

    //         <div className="order-footer">
    //           <h3>Total: ₹ {order.total}</h3>
    //           {order.status.toLowerCase() == "pending" ? (
    //             <button onClick={() => UpdateOrderHook("cancelled", order.id)}>
    //               cancel
    //             </button>
    //           ) : order.status == "delivered" ? (
    //             "delivered"
    //           ) : (
    //             ""
    //           )}
    //           {/* <button>View Details</button> */}
    //         </div>
    //       </div>
    //     ))
    //   )}
    // </div>
    <div className="order-page">
      <Arrow></Arrow>
      <h2>My Orders</h2>

      <div className="table-wrapper">
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price (₹)</th>
              <th>Status</th>
              <th>Payment</th>
            </tr>
          </thead>

          <tbody>
            {order.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>

                <td className="product-cell">
                  <img src={order.image} alt={order.name} />
                  <span>{order.name}</span>
                </td>

                <td>{order.quantity}</td>
                <td>{order.total}</td>

                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>{" "}
                  {order.status == "cancelled" ? (
                    ""
                  ) : (
                    <span
                      style={{ color: "red" }}
                      onClick={() => UpdateOrderHook("cancelled", order.id)}
                    >
                      cancel
                    </span>
                  )}
                </td>

                <td>{order.status == "cancelled" ? "return" : "paid"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
