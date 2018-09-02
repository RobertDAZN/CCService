import { settings } from "../configuration/settings";

export const handler = async (event, streamService) => {
  const streamServiceResponse = await streamService.getNumberOfVideosBeingWatched(
    event.userId
  );
  if (
    streamServiceResponse.numberOfVideosBeingWatched < settings.streamsLimit
  ) {
    return {
      statusCode: 200
    };
  }
};
