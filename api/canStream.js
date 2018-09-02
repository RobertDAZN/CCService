import { settings } from "../configuration/settings";
import { errorNumbers } from "../configuration/errorNumbers";

export const handler = async (event, streamService) => {
  if (!event.userId) {
    return { statusCode: 400 };
  }
  const streamServiceResponse = await streamService.getNumberOfVideosBeingWatched(
    event.userId
  );
  if (
    streamServiceResponse.errorNumber &&
    streamServiceResponse.errorNumber === 401
  ) {
    return { statusCode: 401 };
  }
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
