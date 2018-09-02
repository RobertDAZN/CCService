import * as sinon from "sinon";
import { StreamServiceMockBuilder } from "../test-utils/StreamServiceMockBuilder";
import { handler } from "./canStream";

describe("handler", () => {
  const userId = "378eb840-f70f-11e6-9d1a-1359b3b22944";
  const sandbox = sinon.createSandbox();

  afterEach(function() {
    sandbox.restore();
  });

  it("returns success if user is streaming 2 videos", async () => {
    let streamServiceMockBuilder = new StreamServiceMockBuilder(sandbox);
    const streamServiceMock = streamServiceMockBuilder
      .returns(2)
      .for(userId)
      .build();
    var res = await handler({ userId }, streamServiceMock);
    expect(res.statusCode).toBe(200);
  });
});
