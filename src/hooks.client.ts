import * as Sentry from "@sentry/sveltekit";

Sentry.init({
  dsn: "https://22ffdff6755c2e1f38dc9054b9de714e@o4508141635239936.ingest.us.sentry.io/4508141636222976",
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV.toLowerCase(),
  integrations: [
    Sentry.feedbackIntegration({
        colorScheme: "light"
    })
  ]
});

const myErrorHandler = ({error, event}) => {
  console.error("A client side error occured:", error, event);
}

export const handleError = Sentry.handleErrorWithSentry(myErrorHandler);