"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCart, removeFromCart } from "@/lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    setCart(getCart());

    const update = () => setCart(getCart());
    window.addEventListener("cart-updated", update);

    return () => window.removeEventListener("cart-updated", update);
  }, []);

  if (!cart.length) return <div style={{ padding: 40 }}>Cart is empty</div>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Your Cart</h1>

      {cart.map((item) => (
        <div key={item.uid} style={{ marginBottom: 20 }}>
          <img src={item.image} width={120} />
          <h3>{item.title}</h3>

          <Link href={`/product/${item.slug}`}>View</Link>

          <button onClick={() => removeFromCart(item.uid)}>
            Remove
          </button>
        </div>
      ))}

      <Link href="/checkout">
        <button style={{ marginTop: 20 }}>Checkout</button>
      </Link>
    </div>
  );
}
