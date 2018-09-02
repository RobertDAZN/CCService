import * as sinon from "sinon";
import { StreamServiceMockBuilder } from "../test-utils/StreamServiceMockBuilder";
import { handler } from "./canStream";
import { errorNumbers } from "../configuration/errorNumbers";
import { settings } from "../configuration/settings";

describe("handler", () => {
  const userId = "378eb840-f70f-11e6-9d1a-1359b3b22944";
  const sandbox = sinon.createSandbox();
  let streamServiceMockBuilder;

  beforeEach(function() {
    streamServiceMockBuilder = new StreamServiceMockBuilder(sandbox);
  });
  afterEach(function() {
    sandbox.restore();
  });

  it("returns success if user is streaming 2 videos", async () => {
    const streamServiceMock = streamServiceMockBuilder
      .returns(2)
      .for(userId)
      .build();
    var res = await handler({ userId }, streamServiceMock);
    expect(res.statusCode).toBe(200);
    expect(!res.body || !res.body.errorNumber).toBe(true);
  });
  it("returns success if user is streaming no videos", async () => {
    const streamServiceMock = streamServiceMockBuilder
      .returns(0)
      .for(userId)
      .build();
    var res = await handler({ userId }, streamServiceMock);
    expect(res.statusCode).toBe(200);
    expect(!res.body || !res.body.errorNumber).toBe(true);
  });
  it("returns success if user is streaming -1 videos", async () => {
    const streamServiceMock = streamServiceMockBuilder
      .returns(-1)
      .for(userId)
      .build();
    var res = await handler({ userId }, streamServiceMock);
    expect(res.statusCode).toBe(200);
    expect(!res.body || !res.body.errorNumber).toBe(true);
  });
  it("returns error if user is already streaming maximum number of videos", async () => {
    const streamServiceMock = streamServiceMockBuilder
      .returns(settings.streamsLimit)
      .for(userId)
      .build();
    var res = await handler({ userId }, streamServiceMock);
    expect(res.statusCode).toBe(200);
    expect(res.body.errorNumber).toBe(errorNumbers.NumberOfStreamsExceeded);
  });
});
