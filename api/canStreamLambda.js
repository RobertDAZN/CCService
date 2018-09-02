import { handler as canStream } from "./canStream";

export const handler = async event => {
  const res = await canStream({ userId: event.pathParameters.id });
  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: res.body && JSON.stringify(res.body),
    statusCode: res.statusCode || 200
  };
};
