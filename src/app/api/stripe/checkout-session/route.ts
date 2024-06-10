import { auth } from "@/lib/auth/auth";
import db from "@/lib/database/db";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const data = await request.json();
  const session = await auth();

  if (!session) {
    return Response.json({
      message: "Unauthorized",
      data: null,
    });
  }

  try {
    const order = await db
      .insertInto("Order")
      // @ts-ignore
      .values({
        userId: session.user.id,
        isCheckout: false,
        address: data.address,
        totalPrice: data.total,
      })
      .returningAll()
      .executeTakeFirst();

    const orderItems = data.orders.map((item: any) => ({
      orderId: order?.id,
      userId: session.user.id,
      cardId: item.cardId,
      mainImage: item.mainImage,
      images: item.images,
      title: item.title,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
    }));
    await db.insertInto("OrderItem").values(orderItems).execute();

    const lineItems = data.orders.map((item: any) => ({
      price: item.externalPriceId,
      quantity: item.quantity,
    }));

    // Create Checkout Sessions from body params.
    const stripeSession = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/order?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/card?canceled=true`,
      payment_intent_data: {
        metadata: {
          orderId: order?.id!,
        },
      },
    });

    return Response.json({
      message: "Create payment suscess",
      data: stripeSession.url,
    });
  } catch (err) {
    console.log("create session error: ", err);
    return Response.json({ message: "Can't perform this action", data: null });
  }
}
