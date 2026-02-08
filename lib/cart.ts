export function getCart() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function addToCart(item: any) {
  const cart = getCart();

  const existing = cart.find((i: any) => i.uid === item.uid);

  if (existing) {
    existing.qty = (existing.qty || 1) + 1;   // ✅ safe increment
  } else {
    cart.push({
      ...item,
      qty: 1,                                 // ✅ ALWAYS set qty
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
}

export function removeFromCart(uid: string) {
  const cart = getCart().filter((i: any) => i.uid !== uid);
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
}

export function getCartCount() {
  return getCart().reduce((sum: number, i: any) => sum + (i.qty || 1), 0);
}
