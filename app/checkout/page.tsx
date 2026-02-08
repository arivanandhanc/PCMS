"use client";

import { useEffect, useState } from "react";
import { getCart, removeFromCart } from "@/lib/cart";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Load cart
  useEffect(() => {
    setCart(getCart());
  }, []);

  // Load Razorpay script once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // 1️⃣ Create order from server
      const res = await fetch("/api/create-order", {
        method: "POST",
        body: JSON.stringify({ amount: total }),
      });

      const order = await res.json();

      // 2️⃣ Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Your Store",
        description: "Order Payment",
        order_id: order.id,

        handler: function (response: any) {
          alert("✅ Payment Successful!");

          console.log("Razorpay Response:", response);

          // Next step: send to API for Contentstack email
        },

        theme: {
          color: "#005bb5",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed to start");
    } finally {
      setLoading(false);
    }
  };

  if (!cart.length)
    return <div style={{ padding: 60 }}>Cart is empty</div>;

  return (
    <div style={{ padding: 60 }}>
      <h1>Checkout</h1>

      {cart.map((item) => (
        <div
          key={item.uid}
          style={{
            marginBottom: 20,
            display: "flex",
            gap: 20,
            alignItems: "center",
          }}
        >
          <img src={item.image} width={80} />
          <div>
            <h3>{item.title}</h3>
            <p>Qty: {item.qty}</p>
            <p>₹ {item.price * item.qty}</p>
          </div>
          <button onClick={() => removeFromCart(item.uid)}>
            Remove
          </button>
        </div>
      ))}

      <h2>Total: ₹ {total}</h2>

      <button
        onClick={handlePayment}
        disabled={loading}
        style={{
          padding: 20,
          marginTop: 20,
          background: "#005bb5",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Processing..." : "Proceed to Payment"}
      </button>
    </div>
  );
}
