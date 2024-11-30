import React from "react";
import { useParams } from "react-router-dom";
import productService from "../connectServer/config"; // Adjust the path accordingly
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import QuantitySelector from "../components/QuantitySelector";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = React.useState(null);
  const [error, setError] = React.useState(null);

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product._id, quantity }));
    toast.success("Product added to cart", {
      autoClose: 1000,
    });
    console.log(quantity);
  };

  const goToCart = () => { 
    navigate("/cart");
  };

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.getSingleProduct(productId);
        console.log("API Response:", response); // Log the response to the console
        setProduct(response.data); // Adjust based on your response structure
      } catch (err) {
        console.error("Error fetching product:", err); // Log the error
        setError(err.message);
      }
    };

    fetchProduct();
  }, [productId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  // return (
  //     <div>
  //         <h1>{product.name}</h1>
  //         <img src={product.productImage} alt={product.name} />
  //         <p>{product.description}</p>
  //         <p>Price: ${product.price}</p>
  //         <p>Stock: {product.stock}</p>
  //     </div>
  // );

  return (
    <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
      <div className="flex flex-col gap-6 lg:w-2/4">
        <img
          src={product.productImage}
          alt={product.name}
          className="w-full h-full aspect-square object-cover rounded-xl"
        />
      </div>

      <div className="flex flex-col gap-4 lg:w-2/4">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
        </div>
        <p className="text-gray-700">{product.description}</p>
        <h6 className="text-2xl font-semibold">₹{product.price}</h6>
        <div className="flex flex-row items-center gap-12">
          <div>
            <h1>{product.name}</h1>
            <QuantitySelector
              initialAmount={quantity}
              maxAmount={product.stock}
              onChange={(newQuantity) => setQuantity(newQuantity)} // Use newQuantity directly
            />
          </div>
          <div className="flex flex-col">
            <button
              className="bg-black text-white font-semibold py-3 px-16 rounded-xl h-full mb-2 hover:bg-blue-gray-700"
              onClick={handleAddToCart}
            >
              Add to Bag
            </button>
            <button className="bg-black text-white font-semibold py-3 px-16 rounded-xl h-full hover:bg-blue-gray-700" onClick={goToCart}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
