import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import productService from "../connectServer/config";
import { useNavigate } from "react-router-dom";
import { clearCart } from '../store/cartSlice'; // Import your clearCart action

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize the dispatch function

  const handleCheckout = () => {
    navigate("/checkout", { state: { total } });
  };

  const handleClearCart = () => {
    setProducts([]);
    dispatch(clearCart()); // Dispatch the action to clear the Redux cart
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productDetails = await Promise.all(
          cartItems.map((item) =>
            productService.getSingleProduct(item.productId)
          )
        );

        const fetchedProducts = productDetails.map((response) => ({
          ...response.data,
          quantity:
            cartItems.find((item) => item.productId === response.data._id)
              ?.quantity || 1,
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (cartItems.length > 0) {
      fetchProducts();
    }
  }, [cartItems]);

  const handleQuantityChange = (itemId, change) => {
    setProducts((prev) =>
      prev.map((product) =>
        product._id === itemId
          ? {
              ...product,
              quantity: Math.max(1, (product.quantity || 1) + change),
            }
          : product
      )
    );
  };

  // Calculate subtotal
  const calculateSubtotal = () => {
    return products.reduce(
      (total, product) => total + product.price * (product.quantity || 1),
      0
    );
  };

  const subtotal = calculateSubtotal();
  const shipping = 24.99; // You can modify this as needed
  const total = subtotal + shipping;

  return (
    <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">
        Shopping Bag Items
      </h1>
      <div className="mx-auto max-w-5xl px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
            >
              <img
                src={product.productImage}
                alt="product-image"
                className="w-full rounded-lg sm:w-40"
              />
              <div className="flex justify-between items-center sm:ml-4 sm:w-full">
                <h2 className="text-xl font-bold text-gray-900">
                  {product.name}
                </h2>
                
                <div className="flex flex-row items-center">
                  <button
                    className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
                    onClick={() => handleQuantityChange(product._id, -1)}
                  >
                    -
                  </button>
                  <span className="py-4 px-6 rounded-lg">{product.quantity}</span>
                  <button
                    className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
                    onClick={() => handleQuantityChange(product._id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Subtotal Section */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">₹{subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">₹{shipping.toFixed(2)}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div>
              <p className="mb-1 text-lg font-bold">₹{total.toFixed(2)}</p>
              <p className="text-sm text-gray-700">including GST</p>
            </div>
          </div>
          <button
            className="mt-6 w-full rounded-md bg-black py-1.5 font-medium text-blue-50 hover:bg-blue-gray-700"
            onClick={handleCheckout}
          >
            Check out
          </button>
          <button
            className="mt-4 w-full rounded-md bg-red-500 py-1.5 font-medium text-white hover:bg-red-600"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
