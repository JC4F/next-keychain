import { fetchProduct } from "@/actions";
import { ListProduct } from "./_components/list-product";

export default async function Page() {
  const products = await fetchProduct();

  return <ListProduct products={products.data} />;
}
