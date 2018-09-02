import * as sinon from "sinon";
import * as canStream from "./canStream";
import * as lambda from "./canStreamLambda";

describe("handler", () => {
  const sandbox = sinon.createSandbox();
  const userId = "378eb840-f70f-11e6-9d1a-1359b3b22944";
  let canStreamMock;

  beforeEach(function() {
    canStreamMock = sandbox.stub(canStream, "handler");
  });
  afterEach(function() {
    sandbox.restore();
  });

  it("calls internal handler with valid arguments", async () => {
    const event = {
      pathParameters: {
        id: userId
      }
    };
    canStreamMock.returns({});

    await lambda.handler(event);

    sinon.assert.calledWith(canStreamMock, { userId: event.pathParameters.id });
  });
  it("returns body if internal handler returned one", async () => {
    const event = {
      pathParameters: {
        id: userId
      }
    };
    const body = { whatever: "whatever" };
    canStreamMock.returns({ body });

    var res = await lambda.handler(event);

    expect(res.body).toBe(JSON.stringify(body));
  });
});
