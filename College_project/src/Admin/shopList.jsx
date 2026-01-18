import { useEffect, useState } from "react";
import Sidebar from "../components/sideBar";
import "../css/Admin/shopList.css";
import { GetAllShop, UpdateShopHook } from "../Hooks/shopHook";

const ShopList = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const shops = await GetAllShop();
      setShops(shops);
    };

    fetchProduct();
  }, []);

  return (
    <div className="shoplist">
      <Sidebar />
      <h1>Shop List</h1>

      <div className="shoplist-sub">
        <table className="shop-table">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Mobile</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {shops.map((item) => (
              <tr key={item._id}>
                <td>
                  <img
                    src={item.profilepic}
                    alt="Profile"
                    className="table-profile-img"
                  />
                </td>

                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.location}</td>
                <td>{item.phone}</td>

                <td>
                  <select
                    value={item.approve}
                    onChange={(e) =>
                      setShops((prev) =>
                        prev.map((i) =>
                          i._id === item._id
                            ? { ...i, approve: e.target.value }
                            : i
                        )
                      )
                    }
                  >
                    <option value="Not Approved">Not Approved</option>
                    <option value="Approved">Approved</option>
                  </select>
                </td>

                <td>
                  <button
                    className="update-btn"
                    onClick={() => UpdateShopHook(item, item._id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShopList;
