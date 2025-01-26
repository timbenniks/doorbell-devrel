import contentstack, { Region } from "@contentstack/delivery-sdk"
import ContentstackLivePreview, { type IStackSdk } from "@contentstack/live-preview-utils";

export default defineNuxtPlugin(async (nuxtApp) => {
  const {
    apiKey,
    deliveryToken,
    previewToken,
    environment,
    preview
  } = nuxtApp.$config.public;

  const stack = contentstack.stack({
    apiKey,
    deliveryToken,
    environment,
    region: Region.EU,
    live_preview: {
      enable: preview ? true : false,
      preview_token: previewToken,
      host: "eu-rest-preview.contentstack.com",
    }
  });

  let livePreviewSdk
  let emptyBlockClass

  if (preview && import.meta.client) {
    const { default: ContentstackLivePreview, VB_EmptyBlockParentClass } = await import('@contentstack/live-preview-utils')

    livePreviewSdk = ContentstackLivePreview
    emptyBlockClass = VB_EmptyBlockParentClass

    ContentstackLivePreview.init({
      ssr: false,
      mode: "builder",
      enable: preview ? true : false,
      stackSdk: stack.config as IStackSdk,
      stackDetails: {
        apiKey,
        environment
      },
      editButton: {
        enable: false,
      }
    });
  }

  return {
    provide: {
      stack,
      preview,
      ContentstackLivePreview: livePreviewSdk || null,
      VB_EmptyBlockParentClass: emptyBlockClass || null,
    },
  };
});