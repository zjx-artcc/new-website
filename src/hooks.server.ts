import * as Sentry from "@sentry/sveltekit";
import { authHandle } from "./auth";
import { sequence } from "@sveltejs/kit/hooks";

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV
});

const myErrorHandler = ({ error, event }) => {
    console.error("A server side error occured:", error);
}
export const handleError = Sentry.handleErrorWithSentry(myErrorHandler);

export const handle = sequence(Sentry.sentryHandle(), authHandle);