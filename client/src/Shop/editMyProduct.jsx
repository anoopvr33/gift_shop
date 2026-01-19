import { useEffect, useState } from "react";
import "../css/Shop/addProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  AddProductHook,
  GetOneProductForEdit,
  GetOneProductHook,
  UpdateProductHook,
} from "../Hooks/productHook";
import CustomAxios from "../utils/axios";
import { getId } from "../utils";
import { GetOneShopHook } from "../Hooks/shopHook";
import { GetUser, UpdateUserHook } from "../Hooks/userHook";

const EditProduct = () => {
  const [imageData, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setProduct] = useState({
    image: "",
    category: "",
    productname: "",
    price: "",
    description: "",
    quantity: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...form, [name]: value });
  };

  const onChange2 = (e) => {
    const { name, checked } = e.target;

    setProduct({
      ...form,
      [name]: checked,
    });
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

    if (
      !form.category ||
      !form.description ||
      !form.price ||
      !form.productname ||
      !form.quantity
    )
      return alert("all fields required");
    if (preview === null && form.image) {
      console.log("haaaiiii");
      await UpdateProductHook(form, id);
      return (window.location.href = "/shop-products");
    }

    const ImageUrl = await CustomAxios.post("/image/upload", imageData);
    const image = ImageUrl.data.url;

    const FinalProduct = { ...form, image: image };

    await UpdateProductHook(FinalProduct, id);
    window.location.href = "/shop-products";
    setProduct({
      category: "",
      productname: "",
      price: "",
      description: "",
      quantity: "",
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
      const data = await GetOneProductForEdit(id);

      console.log("User profile", data);
      setProduct({
        ...form,
        image: data.image,
        category: data.category,
        productname: data.productname,
        price: data.price,
        description: data.description,
        quantity: data.quantity,
        isAvailable: data.isAvailable,
      });
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    console.log("previewwww", form, preview);
  }, [form, preview]);

  return (
    <div className="add-product-container">
      <i onClick={() => navigate(-1)} class="fa-solid fa-arrow-left"></i>

      <h1>Add Product</h1>

      <form className="product-form" onSubmit={submitProduct}>
        {/* Image Upload */}
        <div className="image-box">
          {form.image || preview ? (
            <>
              <img src={!preview ? form.image : preview} alt="preview" />
              <button
                type="button"
                className="remove-img"
                onClick={() => {
                  (removeImage, setProduct({ ...form, image: "" }));
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
          name="category"
          placeholder="category"
          value={form.category}
          onChange={onChange}
          required
        />
        <input
          type="text"
          name="productname"
          placeholder="productname"
          value={form.productname}
          onChange={onChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="price"
          value={form.price}
          onChange={onChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="description"
          value={form.description}
          onChange={onChange}
          required
        />{" "}
        <input
          type="number"
          name="quantity"
          placeholder="quantity"
          value={form.quantity}
          onChange={onChange}
          required
        />
        <label htmlFor="">
          <input
            type="checkbox"
            name="isAvailable"
            placeholder="isAvailable"
            checked={form.isAvailable}
            onChange={onChange2}
            // required
          />
          isAvailable
        </label>
        <button type="submit" className="submit-btn">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
