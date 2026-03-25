import { CollectionConfig } from "payload";

export const Cards: CollectionConfig = {
  slug: "cards",
  fields: [
    { name: "person", type: "text", required: true },
    { name: "world", type: "text", required: true },
    { name: "object", type: "text", required: true },
    { name: "action", type: "text", required: true },
    { name: "nature", type: "text", required: true },
    { name: "random", type: "text", required: true },
    { name: "allplay", type: "text", required: true },
  ],
};
