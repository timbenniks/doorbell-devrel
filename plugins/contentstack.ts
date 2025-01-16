import contentstack, { Region } from "@contentstack/delivery-sdk"

export default defineNuxtPlugin((nuxtApp) => {
  const {
    apiKey,
    deliveryToken,
    environment,
  } = nuxtApp.$config.public;

  const stack = contentstack.stack({
    apiKey,
    deliveryToken,
    environment,
    region: Region.EU,
  });

  return {
    provide: {
      stack
    },
  };
});