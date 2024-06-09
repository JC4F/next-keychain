import Stripe from "stripe";

let stripePromise: Stripe;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  return stripePromise;
};
