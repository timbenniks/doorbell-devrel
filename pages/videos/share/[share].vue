<script setup lang="ts">
import { generateCloudinaryUrl } from "../../../utils/cloudinaryUrl";

definePageMeta({
  layout: "auth",
});

const route = useRoute();

const { data: video } = useVideoById(route.params.share as string);

const cloudinaryUrl = computed(() => {
  let url = "";

  if (video && video.value) {
    url = generateCloudinaryUrl(
      video.value.cloudinary_video,
      video.value.background_noise,
      video.value.vignette,
      video.value.intro
    );
  }

  return url;
});

useSeoMeta({
  title: `Doorbell DevRel: ${video && video?.value?.title}`,
  ogTitle: `Doorbell DevRel: ${video && video?.value?.title}`,
  description: video && video?.value?.description,
  ogDescription: video && video?.value?.description,
  twitterCard: "summary_large_image",
  ogType: "video.other",
  ogUrl: `https://doorbelldevrel.timbenniks.dev/videos/share/${
    video && video?.value?.uid
  }`,
  ogVideo: cloudinaryUrl.value,
  ogVideoSecureUrl: cloudinaryUrl.value,
  ogVideoType: "video/mp4",
  ogVideoWidth: "720",
  ogVideoHeight: "1280",
  twitterDescription: video && video?.value?.description,
  twitterTitle: video && video?.value?.title,
});
</script>

<template>
  <UCard class="max-w-[480px] w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <h1 v-if="video" class="font-bold text-2xl mb-4">{{ video.title }}</h1>
    <VideoPlayer
      v-if="cloudinaryUrl"
      :url="cloudinaryUrl"
      poster=""
      class="max-w-lg"
    />
  </UCard>
</template>
