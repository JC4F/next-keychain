import { fetchProducts } from "@/actions";
import { ListProduct } from "./_components/list-product";

export default async function Page() {
  const products = await fetchProducts();

  return <ListProduct products={products.data} />;
}
