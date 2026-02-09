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
  const [email, setEmail] = useState("");

  useEffect(() => {
    setCart(getCart());

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handlePayment = async () => {
    if (!email) {
      alert("Please enter email for order confirmation");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Create Razorpay order from your server
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

      // 2️⃣ Razorpay options
      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "CMS Store",
        description: "Order Payment",

        handler: async function (response: any) {
          // 3️⃣ Call your automation API AFTER payment success
          await fetch("/api/run-automation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              total,
              items: cart,
              paymentId: response.razorpay_payment_id,
            }),
          });

          alert("✅ Payment successful. Order email sent!");
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

      {/* ✅ Email input */}
      <div style={{ marginBottom: 30 }}>
        <label>Email for order confirmation *</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: 12,
            width: 320,
            border: "1px solid #ccc",
            marginTop: 8,
            display: "block",
          }}
        />
      </div>

      {/* Cart items */}
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
