import { fetchOrders } from "@/actions";
import { redirect } from "@/lib";
import { auth } from "@/lib/auth/auth";
import { Order } from "./_components/order";

export default async function Page() {
  const session = await auth();
  if (!session) return redirect("/product");

  const orders = (await fetchOrders(session.user.id, session.user.role)) as any;

  return <Order orders={orders.data || []} />;
}
