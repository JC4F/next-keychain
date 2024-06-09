import { fetchCards } from "@/actions";
import { auth } from "@/lib/auth/auth";
import { CardWrapper } from "./_components/card-wrapper";

export default async function Page() {
  const session = await auth();
  const cards = await fetchCards(session?.user.id!);

  return <CardWrapper cards={cards.data || []} />;
}
