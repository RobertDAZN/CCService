import { settings } from "../configuration/settings";
import { errorNumbers } from "../configuration/errorNumbers";

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
  return {
    statusCode: 200,
    body: { errorNumber: errorNumbers.NumberOfStreamsExceeded }
  };
};
