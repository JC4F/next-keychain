import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const data = await request.json();
  console.log(data);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: "eur",
  });

  return Response.json({ clientSecret: paymentIntent.client_secret });
}
