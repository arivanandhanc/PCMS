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

  if (!cart.length)
    return <div className="cart-empty">Your cart is empty</div>;

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
