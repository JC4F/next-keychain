import db from "@/lib/database/db";
import { OrderItemTable } from "@/lib/database/types";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  const body = await request.text();
  console.log("check webhook body: ", body);
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret!);
  } catch (error: any) {
    console.log(`Webhook error: ${error.message}`);
    return new NextResponse(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  // Successfully constructed event.
  console.log("✅ Success:", session);

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent status: ${paymentIntent.status}`);
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      console.log(
        `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
      );
      break;
    }
    case "charge.updated":
    case "charge.succeeded": {
      const orderId = session.metadata?.orderId!;
      await db
        .updateTable("Order")
        .set({
          isCheckout: true,
        })
        .where("id", "=", orderId)
        .executeTakeFirst();

      const orderItems = (await db
        .selectFrom("OrderItem")
        .where("orderId", "=", orderId)
        .selectAll()
        .execute()) as OrderItemTable[];

      console.log(orderId, orderItems);

      orderItems.forEach(async (item) => {
        await db.deleteFrom("Card").where("id", "=", item.cardId).execute();
      });

      break;
    }
    default: {
      console.warn(`Unhandled event type: ${event.type}`);
      break;
    }
  }

  return new NextResponse(null, { status: 200 });
}
