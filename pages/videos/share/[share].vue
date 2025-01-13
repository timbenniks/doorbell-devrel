<script setup lang="ts">
import contentstack, { Region } from "@contentstack/delivery-sdk";
import { generateCloudinaryUrl } from "../../../utils/cloudinaryUrl";
import { useShare } from "@vueuse/core";
import { isClient } from "@vueuse/shared";

definePageMeta({
  layout: "auth",
});

const route = useRoute();

const { apiKey, deliveryToken, environment } = useRuntimeConfig().public;

const stack = contentstack.stack({
  apiKey,
  deliveryToken,
  environment,
  region: Region.EU,
});

const video = await stack
  .contentType("video")
  .entry(route.params.share as string)
  .fetch();

const cloudinaryUrl = computed(() => {
  const url = generateCloudinaryUrl(
    video.cloudinary_video,
    video.background_noise,
    video.vignette,
    video.intro
  );

  return url;
});

useSeoMeta({
  title: `Doorbell DevRel: ${video.title}`,
  ogTitle: `Doorbell DevRel: ${video.title}`,
  description: video.description,
  ogDescription: video.description,
  twitterCard: "summary_large_image",
  ogImage: video.poster.url,
  ogType: "video.other",
  ogUrl: `https://doorbelldevrel.timbenniks.dev/videos/share/${video.uid}`,
  ogVideo: cloudinaryUrl.value,
  ogVideoSecureUrl: cloudinaryUrl.value,
  ogVideoType: "video/mp4",
  ogVideoWidth: "720",
  ogVideoHeight: "1280",
  twitterDescription: video.description,
  twitterTitle: video.title,
});

const options = ref({
  title: `Doorbell DevRel: ${video.title}`,
  text: video.description,
  url: isClient ? location.href : "",
  file: cloudinaryUrl.value,
});

const { share, isSupported } = useShare(options);

function startShare() {
  return share().catch((err) => err);
}
</script>

<template>
  <UCard class="max-w-[480px] w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <h1 v-if="video" class="font-bold text-2xl mb-4">{{ video.title }}</h1>
    <UButton @click="startShare" class="mb-4">Share</UButton>
    <VideoPlayer
      v-if="cloudinaryUrl"
      :url="cloudinaryUrl"
      poster=""
      class="max-w-lg"
    />
  </UCard>
</template>
