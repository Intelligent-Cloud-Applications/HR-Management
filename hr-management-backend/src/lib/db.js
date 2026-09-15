import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  QueryCommand,
  ScanCommand,
  TransactWriteCommand,
} from "@aws-sdk/lib-dynamodb"
import { REGION } from "../config.js"

const client = new DynamoDBClient({ region: REGION })
export const ddb = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
})

export async function getItem(table, key) {
  const result = await ddb.send(new GetCommand({ TableName: table, Key: key }))
  return result.Item || null
}

export async function putItem(table, item) {
  await ddb.send(new PutCommand({ TableName: table, Item: item }))
  return item
}

export async function deleteItem(table, key) {
  await ddb.send(new DeleteCommand({ TableName: table, Key: key }))
}

export async function query(params) {
  const result = await ddb.send(new QueryCommand(params))
  return {
    items: result.Items || [],
    lastKey: result.LastEvaluatedKey,
  }
}

export async function scan(params) {
  const result = await ddb.send(new ScanCommand(params))
  return {
    items: result.Items || [],
    lastKey: result.LastEvaluatedKey,
  }
}

export async function updateItem(table, key, attrs) {
  const names = {}
  const values = {}
  const sets = []

  for (const [field, value] of Object.entries(attrs)) {
    if (value === undefined) continue
    names[`#${field}`] = field
    values[`:${field}`] = value
    sets.push(`#${field} = :${field}`)
  }

  if (!sets.length) {
    return getItem(table, key)
  }

  const result = await ddb.send(
    new UpdateCommand({
      TableName: table,
      Key: key,
      UpdateExpression: `SET ${sets.join(", ")}`,
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: values,
      ReturnValues: "ALL_NEW",
    })
  )
  return result.Attributes
}

export async function transactWrite(items) {
  await ddb.send(new TransactWriteCommand({ TransactItems: items }))
}

export async function queryAll(params) {
  const items = []
  let lastKey
  do {
    const page = await query({ ...params, ExclusiveStartKey: lastKey })
    items.push(...page.items)
    lastKey = page.lastKey
  } while (lastKey)
  return items
}
