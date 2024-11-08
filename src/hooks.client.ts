import * as Sentry from "@sentry/sveltekit";

Sentry.init({
    dsn: "https://726cac664c16ca75bb5e53fc75ac3712@o4508141635239936.ingest.us.sentry.io/4508141636222976",
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV.toLowerCase()
});

const myErrorHandler = ({error, event}) => {
    console.error("A client side error occured:", error, event);
}

export const handleError = Sentry.handleErrorWithSentry(myErrorHandler);