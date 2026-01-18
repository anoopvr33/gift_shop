import { useEffect, useState } from "react";
import "../css/Shop/addProduct.css";
import { useNavigate } from "react-router-dom";
import { AddProductHook } from "../Hooks/productHook";
import CustomAxios from "../utils/axios";
import { getId } from "../utils";
import { GetOneShopHook, UpdateShopHook } from "../Hooks/shopHook";
import { GetUser, UpdateUserHook } from "../Hooks/userHook";

const EditShop = () => {
  const [imageData, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    profilepic: "",
    location: "",
    category: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);
    setImage(formData);

    setPreview(URL.createObjectURL(file));
  };

  const submitProduct = async (e) => {
    e.preventDefault();

    if (!preview) {
      await UpdateShopHook(form);
      return (window.location.href = "/shop-profile");
    }
    const ImageUrl = await CustomAxios.post("/image/upload", imageData);
    const image = ImageUrl.data.url;

    const FinalProduct = { ...form, profilepic: image };

    await UpdateShopHook(FinalProduct);
    window.location.href = "/shop-profile";
    setForm({
      name: "",
      email: "",
      phone: "",
      profilepic: "",
      location: "",
      category: "",
    });
    setImage(null);
    setPreview(null);
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await GetOneShopHook(getId());

      console.log("User profile", data);
      setForm({
        ...form,
        name: data.name,
        email: data.email,
        phone: data.phone,
        profilepic: data.profilepic,
        location: data.location,
        category: data.category,
      });
    };

    fetchEmployees();
  }, []);

  useEffect(() => {}, [form, preview]);

  return (
    <div className="add-product-container">
      <i onClick={() => navigate(-1)} class="fa-solid fa-arrow-left"></i>

      <h1>Update Shop</h1>

      <form className="product-form" onSubmit={submitProduct}>
        {/* Image Upload */}
        <div className="image-box">
          {form.profilepic || preview ? (
            <>
              <img src={!preview ? form.profilepic : preview} alt="preview" />
              <button
                type="button"
                className="remove-img"
                onClick={() => {
                  removeImage, setForm({ ...form, profilepic: "" });
                }}
              >
                Remove Image
              </button>
            </>
          ) : (
            <label className="upload-label">
              + Upload Image
              <input type="file" accept="image/*" onChange={onImage} hidden />
            </label>
          )}
        </div>
        {/* Inputs */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={onChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={onChange}
          required
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          value={form.email}
          onChange={onChange}
          required
        />
        <input
          type="number"
          name="phone"
          placeholder="phone"
          value={form.phone}
          onChange={onChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={onChange}
          required
        />

        <button type="submit" className="submit-btn">
          Update Shop
        </button>
      </form>
    </div>
  );
};

export default EditShop;
