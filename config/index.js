export const config = {
  sanityToken: process.env.NEXT_PUBLIC_SANITY_TOKEN || "",
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || "",
  stripeSecret: process.env.STRIPE_SECRET_KEY || "",
};
