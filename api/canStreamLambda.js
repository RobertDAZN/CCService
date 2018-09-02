import { handler as canStream } from "./canStream";

export const handler = async event => {
  await canStream({ userId: event.pathParameters.id });
};
