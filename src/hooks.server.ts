import * as Sentry from "@sentry/sveltekit";
import { authHandle } from "./auth";
import { sequence } from "@sveltejs/kit/hooks";

Sentry.init({
    dsn: "https://22ffdff6755c2e1f38dc9054b9de714e@o4508141635239936.ingest.us.sentry.io/4508141636222976",
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV.toLowerCase()
});

const myErrorHandler = ({ error, event }) => {
    console.error("A server side error occured:", error);
}
export const handleError = Sentry.handleErrorWithSentry(myErrorHandler);

export const handle = sequence(Sentry.sentryHandle(), authHandle);