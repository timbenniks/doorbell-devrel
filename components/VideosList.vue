<script setup lang="ts">
import { formatInTimeZone } from "date-fns-tz";

defineProps<{
  data: any;
}>();

function getCSImageVersion(thumbnail: any) {
  const { apiKey, assetHost } = useRuntimeConfig().public;

  const assetuid = thumbnail?.uid;
  const url = thumbnail?.url;
  const src = thumbnail?.filename;

  const baseStr = url.split(src)[0];

  const versionuid = baseStr.split(
    `https://${assetHost}/${apiKey}/${assetuid}/`
  )[1];

  return versionuid && versionuid.slice(0, -1);
}
</script>

<template>
  <UBlogList
    orientation="horizontal"
    :ui="{
      wrapper:
        'flex flex-col lg:grid grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-16',
    }"
  >
    <UBlogPost
      class="blogpost"
      v-for="video in data"
      :to="`/videos/${video.uid}`"
      :key="video.video_id"
      :title="video.title"
      :date="
        video.created_at &&
        formatInTimeZone(
          video.created_at,
          'Europe/Berlin',
          `MMM d, yyyy 'at' HH:mm`
        )
      "
      orientation="vertical"
      :authors="[
        {
          name: 'Tim Benniks',
          avatar: {
            src: 'https://avatars.githubusercontent.com/u/121096?v=4',
          },
        },
      ]"
      :badge="{
        label: video.heygen_status,
        color: video.heygen_status === 'processing' ? 'red' : 'indigo',
      }"
      :ui="{
        image: {
          wrapper:
            'ring-1 ring-gray-200 dark:ring-gray-800 relative overflow-hidden aspect-[9/16] w-full rounded-lg pointer-events-none',
        },
      }"
    >
      <template #image>
        <div class="relative w-full h-full">
          <img
            v-if="video.animated_poster"
            :src="video.animated_poster.url"
            :width="90"
            :height="160"
            :alt="video.title"
            class="absolute w-full h-full z-10"
            loading="lazy"
            fetchpriority="auto"
          />

          <NuxtImg
            v-if="video.poster"
            provider="contentstack"
            :src="video.poster.filename"
            :quality="90"
            :width="90"
            :height="160"
            fit="fill"
            :alt="video.title"
            sizes="sm:400px md:800px"
            :modifiers="{
              assetuid: video.poster.uid,
              auto: 'avif',
              versionuid: getCSImageVersion(video.poster),
            }"
            class="absolute w-full h-full z-20 thumb"
            loading="lazy"
            fetchpriority="auto"
          />

          <USkeleton
            v-if="!video.poster && !video.animated_poster"
            class="relative w-full h-full"
          />
        </div>
      </template>
    </UBlogPost>
  </UBlogList>
</template>
