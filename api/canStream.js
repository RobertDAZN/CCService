import { settings } from "../configuration/settings";
import { errorNumbers } from "../configuration/errorNumbers";

export const handler = async (event, streamService) => {
  try {
    if (!event.userId) {
      return { statusCode: 400 };
    }
    const streamServiceResponse = await streamService.getNumberOfVideosBeingWatched(
      event.userId
    );
    if (streamServiceResponse.errorNumber) {
      switch (streamServiceResponse.errorNumber) {
        case 401:
          return { statusCode: 401 };
        default:
          return { statusCode: 500 };
      }
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
  } catch (error) {
    return {
      statusCode: 500
    };
  }
};
