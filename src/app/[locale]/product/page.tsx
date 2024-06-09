import { fetchProducts } from "@/actions";
import { ProductWrapper } from "./_components/product-wrapper";

export default async function Page() {
  const products = await fetchProducts();

  return <ProductWrapper products={products.data} />;
}
