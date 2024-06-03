import { fetchProductById } from "@/actions";
import { redirect } from "next/navigation";
import { ProductWrapper } from "./_components/product-wrapper";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  if (id === "new") return <ProductWrapper />;

  const product = await fetchProductById(id);

  if (!product.data) return redirect("/404");
  else return <ProductWrapper product={product.data} />;
}
