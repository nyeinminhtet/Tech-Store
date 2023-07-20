import { config } from "../config";
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "t62seha6",
  dataset: "production",
  apiVersion: "2022-03-10",
  useCdn: true,
  token: config.sanityToken,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
