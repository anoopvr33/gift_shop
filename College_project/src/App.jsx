import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Routes, Route } from "react-router-dom";
import Login from "./Authentication/userLogin";
import WelcomePage from "./pages/welcome";
import UserHome from "./pages/userHome";
import UserProfile from "./pages/userProfile";
import UserShop from "./pages/userShop";
import UserProducts from "./pages/userProducts";
import CartPage from "./pages/userCart";
import OrderHistory from "./pages/userOrder";
import Feedback from "./pages/userFeedback";
import ShopLogin from "./Authentication/shopLogin";
import AdminLogin from "./Authentication/adminLogin";
import AdminDashboard from "./Admin/dashboard";
import UsersList from "./Admin/userList";
import ShopList from "./Admin/shopList";
import FeedbackList from "./Admin/feedback";

import "./App.css";
import ShopComplaintList from "./Admin/shopComplaint";
import UserComplaintList from "./Admin/userComplaint";
import MyProducts from "./Shop/myproducts";
import AddProduct from "./Shop/addProduct";
import ShopProfile from "./Shop/shopProfile";
import Checkout from "./pages/userCheckout";
import UserRegister from "./Authentication/userRegister";
import ShopRegister from "./Authentication/shopRegister";
import AdminRegister from "./Authentication/adminRegister";
import ComplaintPage from "./pages/userComplaint";
import UserEdit from "./pages/userEdit";
import PaymentSuccess from "./pages/paymentSuccess";
import ShopData from "./pages/shopData";
import EditProduct from "./Shop/editMyProduct";
import EditShop from "./Shop/editShop";
import ShopOrderHistory from "./Shop/shopOrder";
import ShopComplaintPage from "./Shop/shopComplaint";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProducts from "./Admin/products";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/register" element={<UserRegister />}></Route>
        <Route path="/user_login" element={<Login />}></Route>
        <Route path="/home" element={<UserHome />}></Route>
        <Route path="/user_shop" element={<UserShop />}></Route>
        <Route path="/user_products" element={<UserProducts />}></Route>
        <Route path="/order" element={<OrderHistory />}></Route>
        <Route path="/feedback" element={<Feedback />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/complaint" element={<ComplaintPage />}></Route>

        <Route element={<ProtectedRoute roles={"USER"} />}>
          <Route path="/edit-profile" element={<UserEdit />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>{" "}
          <Route path="/profile" element={<UserProfile />}></Route>
        </Route>

        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/shop/:id" element={<ShopData />} />

        {/* ////////////////////////////////////----------------shop */}
        <Route path="/shop-login" element={<ShopLogin />}></Route>
        <Route path="/shop-register" element={<ShopRegister />}></Route>
        <Route path="/shop-products" element={<MyProducts />}></Route>
        <Route path="/shop-add" element={<AddProduct />}></Route>
        <Route element={<ProtectedRoute roles={"SELLER"} />}>
          <Route path="/shop-profile" element={<ShopProfile />}></Route>
        </Route>

        <Route path="/edit-product/:id" element={<EditProduct />}></Route>
        <Route path="/edit-shop" element={<EditShop />}></Route>
        <Route path="/order-shop" element={<ShopOrderHistory />}></Route>
        <Route path="/complaint-shop" element={<ShopComplaintPage />}></Route>

        {/* ///////////////////////////////////////-------------------admin */}
        <Route element={<ProtectedRoute roles={"ADMIN"} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
        </Route>
        <Route path="/admin-login" element={<AdminLogin />}></Route>
        <Route path="/admin-register" element={<AdminRegister />}></Route>

        <Route path="/admin-userlist" element={<UsersList />}></Route>
        <Route path="/admin-shoplist" element={<ShopList />}></Route>
        <Route path="/admin-feedbacklist" element={<FeedbackList />}></Route>
        <Route path="/admin-products" element={<AdminProducts />}></Route>
        <Route
          path="/admin-shop-enquiry"
          element={<ShopComplaintList />}
        ></Route>
        <Route
          path="/admin-user-enquiry"
          element={<UserComplaintList />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
