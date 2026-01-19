import { useEffect, useState } from "react";
import "../css/pages/userCheckout.css";
import { GetAllCartHook } from "../Hooks/cartHook";
import { BuyNow } from "../Hooks/checkout";

const Checkout = () => {
  const [cart, setCart] = useState([]);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const placeOrder = async (e) => {
    e.preventDefault();
    await BuyNow(totalAmount);
    // alert("Payment Successful & Order Placed!");
  };

  useEffect(() => {
    const GetCart = async () => {
      const data = await GetAllCartHook();
      const Mycart = data.map((i) => {
        return {
          image: i.product.image,
          name: i.product.productname,
          price: i.product.price,
          id: i.product._id,
          qty: i.quantity,
          seller: i.product.seller,
        };
      });
      setCart(Mycart);
    };
    GetCart();
  }, []);

  useEffect(() => {
    console.log("my checkout items", cart);
  }, [cart]);

  return (
    <div className="checkout-container">
      {/* Address */}
      <div className="address-box">
        <h2>Delivery Address</h2>

        <form onSubmit={placeOrder}>
          <input type="text" placeholder="Full Name" required />
          <input type="text" placeholder="Mobile Number" required />
          <input type="text" placeholder="Address Line" required />
          <input type="text" placeholder="City" required />
          <input type="text" placeholder="State" required />
          <input type="text" placeholder="Pincode" required />

          <button type="submit" className="pay-btn">
            Pay Now
          </button>
        </form>
      </div>

      {/* Cart */}
      <div className="cart-box">
        <h2>Order Summary</h2>

        {cart.map((item) => (
          <div className="checkout-item" key={item.id}>
            <img src={item.image} alt={item.name} />

            <div>
              <h4>{item.name}</h4>
              <p>
                ₹ {item.price} × {item.qty}
              </p>
            </div>

            <b>₹ {item.price * item.qty}</b>
          </div>
        ))}

        <div className="total">
          <h3>Total</h3>
          <h3>₹ {totalAmount}</h3>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
