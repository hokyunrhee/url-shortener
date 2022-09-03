import type { AWS } from "@serverless/typescript";

export const functions: AWS["functions"] = {
  setUrl: {
    handler: "src/functions/set-url.handler",
    events: [
      {
        httpApi: {
          path: "/",
          method: "post",
        },
      },
    ],
  },
};
