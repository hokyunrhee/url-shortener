import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";

const dynamoClient = new DynamoDBClient({});

export const dynamo = {
  write: async (data: Record<string, any>, tableName: string) => {
    const input: PutCommandInput = {
      TableName: tableName,
      Item: data,
    };
    const command = new PutCommand(input);

    await dynamoClient.send(command);

    return data;
  },
};
