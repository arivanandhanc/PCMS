"use client";

import { useEffect, useState } from "react";
import { getCart, removeFromCart } from "@/lib/cart";
import "@/compstyles/checkout.css";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCart(getCart());

    const update = () => setCart(getCart());
    window.addEventListener("cart-updated", update);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => window.removeEventListener("cart-updated", update);
  }, []);

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handlePayment = async () => {
    if (!email) {
      alert("Please enter email for order confirmation");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      const data = await res.json();

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "CMS Store",
        description: "Order Payment",
        theme: { color: "#005bb5" },

        handler: async (response: any) => {
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
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } finally {
      setLoading(false);
    }
  };

  if (!cart.length) {
    return <div className="checkout-empty">Your cart is empty</div>;
  }

  return (
    <div className="checkout">
      <h1 className="checkout-title">Secure Checkout</h1>

      {/* Email Card */}
      <div className="checkout-email-card">
        <label>Email for order confirmation *</label>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Items */}
      <div className="checkout-items">
        {cart.map((item) => (
          <div key={item.uid} className="checkout-item">
            <img src={item.image} className="checkout-image" />

            <div className="checkout-info">
              <h3>{item.title}</h3>
              <p>Qty: {item.qty}</p>
              <p className="checkout-price">₹ {item.price * item.qty}</p>
            </div>

            <button
              className="checkout-remove"
              onClick={() => removeFromCart(item.uid)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="checkout-total-card">
        <div>Total Amount</div>
        <strong>₹ {total}</strong>
      </div>

      {/* Pay */}
      <button
        onClick={handlePayment}
        disabled={loading}
        className="checkout-pay"
      >
        {loading ? "Processing..." : "Proceed to Payment"}
      </button>
    </div>
  );
}
