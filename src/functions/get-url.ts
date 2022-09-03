import { APIGatewayProxyEvent } from "aws-lambda";

import { formatJSONResponse } from "@/libs/api-gateway";
import { dynamo } from "@/libs/dynamo";

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const tableName = process.env.URL_TABLE;
    const { id } = event.pathParameters || {};

    if (!id) {
      return formatJSONResponse({
        statusCode: 400,
        data: {
          message: "mssing id in path",
        },
      });
    }

    const record = await dynamo.read(id, tableName);
    const originalUrl = record.originalUrl;

    return formatJSONResponse({
      statusCode: 301,
      headers: {
        Location: originalUrl,
      },
    });
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
