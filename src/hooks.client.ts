import * as Sentry from "@sentry/sveltekit";
console.log(process.env.NODE_ENV.toLowerCase());

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV.toLowerCase()
});

const myErrorHandler = ({error, event}) => {
    console.error("A client side error occured:", error, event);
}

export const handleError = Sentry.handleErrorWithSentry(myErrorHandler);