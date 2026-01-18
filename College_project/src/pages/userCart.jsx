import { useEffect, useState } from "react";
import "../css/pages/userCart.css";
import Header from "../components/header";
import {
  DeleteOneCartHook,
  GetAllCartHook,
  UpdateCartHook,
} from "../Hooks/cartHook";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const UpdateCart = async () => {
    await Promise.all(
      cart.map((i, index) => {
        return UpdateCartHook(i.id, i.qty);
      })
    );
    navigate("/checkout");
  };

  useEffect(() => {
    const GetCart = async () => {
      const data = await GetAllCartHook();
      const Mycart = data.map((i) => {
        return {
          image: i.product.image,
          name: i.product.productname,
          price: i.product.price,
          id: i._id,
          qty: 1,
        };
      });
      setCart(Mycart);
    };
    GetCart();
  }, []);

  useEffect(() => {}, [cart]);

  return (
    <div className="cart-container">
      <Header />
      <h1 style={{ textAlign: "center" }}>My Cart</h1>

      {cart.length === 0 ? (
        <p className="empty">Your cart is empty</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-img"
                    />
                  </td>

                  <td>
                    <strong>{item.name}</strong>
                    <br />
                    <small>Shop: Trends</small>
                  </td>

                  <td>₹ {item.price}</td>

                  <td>
                    <div className="qty">
                      <button onClick={() => decreaseQty(item.id)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => increaseQty(item.id)}>+</button>
                    </div>
                  </td>

                  <td>₹ {item.price * item.qty}</td>

                  <td>
                    <button
                      className="remove"
                      onClick={() => DeleteOneCartHook(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-total">
            <h2>Total Amount: ₹ {totalAmount}</h2>
            <button onClick={UpdateCart} className="checkout">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
