import { handler } from "./canStream";

describe("handler", () => {
  const userId = "378eb840-f70f-11e6-9d1a-1359b3b22944";

  it("returns success if user is streaming 2 videos", async () => {
    var res = await handler({ userId });
    expect(res.statusCode).toBe(200);
  });
});
