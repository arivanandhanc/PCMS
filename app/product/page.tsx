import "@/compstyles/product.css";
import Link from "next/link";
import { getProductList, getProductByUid } from "@/lib/contentstack";

export default async function ProductsPage() {
  const plp = await getProductList();

  if (!plp?.products?.length) return <div>No products found</div>;

  const products = await Promise.all(
    plp.products.map((ref: any) => getProductByUid(ref.uid))
  );

  return (
    <div className="plp">
      <div className="plp-head">
        <h1>{plp.title}</h1>
      </div>

      <div className="plp-grid">
        {products.map((product: any) => {
          const imageUrl =
            product.product_image?.url ||
            product.product_image?.[0]?.url;

          return (
            <Link key={product.uid} href={`/product/${product.slug}`}>
  <div className="product-card">
    {imageUrl && (
      <img
        src={imageUrl}
        className="product-image"
        alt={product.title_of_the_product}
      />
    )}
    <h3 className="product-name">
      {product.title_of_the_product}
    </h3>
  </div>
</Link>

          );
        })}
      </div>
    </div>
  );
}
