import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://98636e20d7b60640c6db633eb4ee5d27@o4509820002500608.ingest.us.sentry.io/4509820007874560",

  integrations: [Sentry.replayIntegration()],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
