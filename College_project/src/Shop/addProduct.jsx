import { useEffect, useState } from "react";
import "../css/Shop/addProduct.css";
import { useNavigate } from "react-router-dom";
import { AddProductHook } from "../Hooks/productHook";
import CustomAxios from "../utils/axios";
import { getId } from "../utils";
import { GetOneShopHook } from "../Hooks/shopHook";

const AddProduct = () => {
  const [imageData, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    seller: getId(),
    category: "",
    productname: "",
    price: "",
    description: "",
    quantity: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
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

    const ImageUrl = await CustomAxios.post("/image/upload", imageData);
    const image = ImageUrl.data.url;

    const FinalProduct = { ...product, image, location: location };

    await AddProductHook(FinalProduct);
    setProduct({
      seller: getId(),
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
      const { location } = await GetOneShopHook(getId());
      setLocation(location);
    };

    fetchEmployees();
  }, []);

  useEffect(() => {}, [location]);

  return (
    <div className="add-product-container">
      <i onClick={() => navigate(-1)} class="fa-solid fa-arrow-left"></i>

      <h1>Add Product</h1>

      <form className="product-form" onSubmit={submitProduct}>
        {/* Image Upload */}
        <div className="image-box">
          {preview ? (
            <>
              <img src={preview} alt="preview" />
              <button
                type="button"
                className="remove-img"
                onClick={removeImage}
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
          value={product.category}
          onChange={onChange}
          required
        />
        <input
          type="text"
          name="productname"
          placeholder="productname"
          value={product.productname}
          onChange={onChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="price"
          value={product.price}
          onChange={onChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="description"
          value={product.description}
          onChange={onChange}
          required
        />{" "}
        <input
          type="number"
          name="quantity"
          placeholder="quantity"
          value={product.quantity}
          onChange={onChange}
          required
        />
        <button type="submit" className="submit-btn">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
