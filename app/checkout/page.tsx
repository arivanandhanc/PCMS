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

  useEffect(() => {
    setCart(getCart());

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // 1️⃣ Ask server to create Razorpay order
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to create order");
        return;
      }

      // 2️⃣ Use ONLY data from server
      const options = {
        key: data.key,                 // ✅ from API
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "CMS Store",
        description: "Order Payment",

        handler: function (response: any) {
          alert("✅ Payment Successful!");
          console.log("Payment response:", response);
          // next: call API to send email / save order
        },

        theme: { color: "#005bb5" },
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

  if (!cart.length) {
    return <div style={{ padding: 60 }}>Cart is empty</div>;
  }

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
