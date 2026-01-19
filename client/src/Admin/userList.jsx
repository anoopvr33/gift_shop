import { useEffect, useState } from "react";
import Sidebar from "../components/sideBar";
import "../css/Admin/userList.css";
import { GetAllUser, UpdateUserHook } from "../Hooks/userHook";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  const UpdateUser = () => {};

  useEffect(() => {
    const fetchProduct = async () => {
      const users = await GetAllUser();

      console.log("all users list", users);
      setUsers(users);
    };

    fetchProduct();
  }, []);

  return (
    <div className="users-container">
      <Sidebar></Sidebar>

      <h1>Users List</h1>

      <div className="table">
        <div className="table-header">
          <span>User</span>
          <span>Email</span>
          {/* <span>Role</span> */}
          {/* <span>Status</span> */}
          <span>Action</span>
        </div>

        {users.map((user) => (
          <div className="table-row" key={user.id}>
            <div className="user-info">
              <img src={user.profilepic} alt={user.name} />
              <span>{user.name}</span>
            </div>

            <span>{user.email}</span>
            {/* <span>{user.role}</span> */}
            {user?.block === "block" ? (
              <button
                onClick={() =>
                  UpdateUserHook({ ...user, block: "unblock" }, user._id)
                }
              >
                Unblock
              </button>
            ) : (
              <button
                onClick={() =>
                  UpdateUserHook({ ...user, block: "block" }, user._id)
                }
              >
                Block
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
