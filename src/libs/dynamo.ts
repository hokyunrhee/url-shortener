import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  PutCommandInput,
  GetCommand,
  GetCommandInput,
} from "@aws-sdk/lib-dynamodb";

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
  read: async (id: string, tableName: string) => {
    const input: GetCommandInput = {
      TableName: tableName,
      Key: {
        id,
      },
    };
    const command = new GetCommand(input);

    const response = await dynamoClient.send(command);

    return response.Item;
  },
};
