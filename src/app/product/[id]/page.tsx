import { redirect } from "next/navigation";
import { ProductWrapper } from "./_components/product-wrapper";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  switch (id) {
    case "new":
      return <ProductWrapper />;

    default:
      redirect("/404");
  }
}
