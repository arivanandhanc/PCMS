import "@/compstyles/pdp.css";
import { getProductBySlug } from "@/lib/contentstack";
import AddToCart from "@/components/AddToCart";


export default async function ProductPage(props: any) {
  const { slug } = await props.params;

  const product: any = await getProductBySlug(slug);
  if (!product) return <div>Product not found</div>;

  const imageUrl = product.product_image?.url;
  const showAddToCart = product.available_for_cart_;

  return (
    <div className="pdp-wrapper">
      <div className="pdp-card">
        {imageUrl && (
          <img
            src={imageUrl}
            className="pdp-image"
            alt={product.title_of_the_product}
          />
        )}

        <div className="pdp-details">
          <h1 className="pdp-title">
            {product.title_of_the_product}
          </h1>

          <p className="pdp-description">
            {product.product_descritpion}
          </p>

          {showAddToCart && (
           <AddToCart product={product} />

          )}
        </div>
      </div>
    </div>
  );
}
