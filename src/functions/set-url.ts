import { APIGatewayProxyEvent } from "aws-lambda";
import { nanoid } from "nanoid";

import { formatJSONResponse } from "@/libs/api-gateway";
import { dynamo } from "@/libs/dynamo";

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const body = JSON.parse(event.body);
    const tableName = process.env.URL_TABLE;
    const baseUrl = process.env.BASE_URL;

    const originalUrl = body.url;
    const uniqueId = nanoid(8);
    const shortUrl = `${baseUrl}/${uniqueId}`;

    const data = {
      id: uniqueId,
      shortUrl,
      originalUrl,
    };

    await dynamo.write(data, tableName);

    return formatJSONResponse({ data: { shortUrl, originalUrl } });
  } catch (error) {
    console.log("error", error);

    return formatJSONResponse({
      statusCode: 502,
      data: {
        message: error.message,
      },
    });
  }
};
