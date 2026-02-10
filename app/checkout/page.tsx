"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCart, removeFromCart } from "@/lib/cart";
import "@/compstyles/checkout.css";
import { clearCart } from "@/lib/cart";
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  
const router = useRouter();
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
clearCart();
window.dispatchEvent(new Event("cart-updated"));
router.push("/products");

        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } finally {
      setLoading(false);
    }
  };

 if (!cart.length) {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "520px",
          width: "100%",
          backdropFilter: "blur(6px)",
          
    border: "2px solid #000",   // 👈 black outline
    padding: "28px",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🛒</div>

        <h2
          style={{
            fontSize: "26px",
            fontWeight: 600,
            marginBottom: "10px",
          }}
        >
          Your cart is empty
        </h2>

        <p
          style={{
            fontSize: "15px",
            lineHeight: 1.6,
            marginBottom: "24px",
          }}
        >
          You haven’t added any products yet. Start exploring and add items to
          your cart.
        </p>

        <a
          href="/product"
          style={{
            padding: "12px 24px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 600,
            display: "inline-block",
            border: "1px solid currentColor",
          }}
        >
          Browse Products
        </a>
      </div>
    </div>
  );
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
