import { handler as canStream } from "./canStream";
import { StreamServiceFakeImplementation } from "../external/StreamServiceFakeImplementation";

export const handler = async event => {
  const res = await canStream(
    { userId: event.pathParameters.id },
    new StreamServiceFakeImplementation()
  );
  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: res.body && JSON.stringify(res.body),
    statusCode: res.statusCode || 200
  };
};
