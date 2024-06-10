import { fetchProducts } from "@/actions";
import { ProductWrapper } from "./_components/product-wrapper";

export const dynamic = "force-dynamic";

export default async function Page() {
  const products = await fetchProducts();

  return <ProductWrapper products={products.data} />;
}
