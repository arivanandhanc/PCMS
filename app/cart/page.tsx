"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCart, removeFromCart } from "@/lib/cart";
import "@/compstyles/cart.css";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    setCart(getCart());

    const update = () => setCart(getCart());
    window.addEventListener("cart-updated", update);

    return () => window.removeEventListener("cart-updated", update);
  }, []);

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
    <div className="cart">
      <h1 className="cart-title">Your Cart</h1>

      <div className="cart-list">
        {cart.map((item) => (
          <div key={item.uid} className="cart-item">
            <img src={item.image} className="cart-image" />

            <div className="cart-info">
              <h3>{item.title}</h3>

              <div className="cart-actions">
                <Link href={`/product/${item.slug}`}>View product</Link>

                <button
                  className="cart-remove"
                  onClick={() => removeFromCart(item.uid)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link href="/checkout">
        <button className="cart-checkout">Proceed to Checkout</button>
      </Link>
    </div>
  );
}
