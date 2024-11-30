import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart } from "../store/cartSlice";
import conf from "../conf/conf.js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useSelector((state) => state.cart);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { total } = location.state || { total: 0 };
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    setLoading(true);

    const baseURL = `${conf.apiUrl}/api/v1/orders/create-payment-intent`;
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: Math.round(total * 100) }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error:", errorResponse);
      toast.error("Payment failed. Please try again.");
      setLoading(false);
      return; 
    }

    const { clientSecret } = await response.json();

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    setLoading(false);

    if (error) {
      console.log("Payment error:", error);
      toast.error("Payment error: " + error.message);
    } else {
      console.log("Payment successful!", paymentIntent);
      toast.success("Payment Successful!");
      dispatch(clearCart());
      navigate('/payment-success');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold">Checkout</h2>
      <div className="mt-4">
        <p>Total: ₹{total.toFixed(2)}</p>
        <hr className="my-4" />
        <p className="font-bold">Total: ₹{total.toFixed(2)}</p>
      </div>
      <CardElement className="border p-2 rounded mt-4" />
      <button
        type="submit"
        className="mt-4 w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
        disabled={loading || !stripe}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

const CheckoutPage = () => {
  return (
    <div className="h-screen bg-gray-100 pt-20 flex justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default CheckoutPage;
