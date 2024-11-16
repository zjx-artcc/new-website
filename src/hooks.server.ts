import * as Sentry from "@sentry/sveltekit";
import { authHandle } from "./auth";
import { sequence } from "@sveltejs/kit/hooks";

Sentry.init({
    dsn: "https://726cac664c16ca75bb5e53fc75ac3712@o4508141635239936.ingest.us.sentry.io/4508141636222976",
    tracesSampleRate: 1.0,
});

const myErrorHandler = ({ error, event }) => {
    console.error("A server side error occured:", error);
}
export const handleError = Sentry.handleErrorWithSentry(myErrorHandler);

export const handle = sequence(Sentry.sentryHandle(), authHandle);