// This is just a fake in case you deploy it as there is no Streaming Service to contact.
// In reality this would be an adapter which would call the stream service for us.
// (how this adapter would communicate with the streaming can be very easy or complicated)
export class StreamServiceFakeImplementation {
  getNumberOfStreamsBeingWatched(userId) {
    return Promise.resolve({
      numberOfVideosBeingWatched: Math.floor(Math.random() * 6)
    });
  }
}
