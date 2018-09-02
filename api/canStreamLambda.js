import { handler as canStream } from "./canStream";

export const handler = async event => {
  const res = await canStream({ userId: event.pathParameters.id });
  return {
    body: res.body && JSON.stringify(res.body)
  };
};
