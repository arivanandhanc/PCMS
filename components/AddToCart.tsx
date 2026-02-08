"use client";

import { addToCart } from "@/lib/cart";

export default function AddToCart({ product }: any) {
  const handleAdd = () => {
    addToCart({
      uid: product.uid,
      title: product.title_of_the_product,
      image: product.product_image?.url,
      slug: product.slug,
      price: product.product_price,   // ⭐ FROM CMS
      qty: 1,
    });

    alert("Added to cart");
  };

  return (
    <button onClick={handleAdd} className="pdp-button">
      Add to Cart
    </button>
  );
}
