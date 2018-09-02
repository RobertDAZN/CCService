export class StreamServiceMockBuilder {
  constructor(sinonSandbox) {
    this.sandbox = sinonSandbox;
  }
  returns(numberOfVideosBeingWatched) {
    if (this.result) throw Error("result is already set");
    this.result = { numberOfVideosBeingWatched };
    return this;
  }
  for(user) {
    if (this.user) throw Error("user is already set");
    this.user = user;
    return this;
  }
  errors(errorNumber) {
    if (this.result) throw Error("result is already set");
    this.result = { errorNumber };
    return this;
  }
  build() {
    return {
      getNumberOfVideosBeingWatched: this.sandbox.fake(
        async user =>
          user && user === this.user
            ? this.result
            : { numberOfVideosBeingWatched: 0 }
      )
    };
  }
}
