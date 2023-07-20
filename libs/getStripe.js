import { config } from "../config";
import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(config.stripePublishableKey);
  }

  return stripePromise;
};

export default getStripe;
