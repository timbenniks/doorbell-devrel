<script setup lang="ts">
import { formatInTimeZone } from "date-fns-tz";
import { getCSImageVersion } from "@/utils/getCSImageVersion";

defineProps<{
  data: any;
}>();
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
      :to="`/app/videos/${video.uid}`"
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
          <NuxtImg
            v-if="video.animated_poster"
            provider="contentstack"
            :src="video.animated_poster.filename"
            width="90"
            height="160"
            fit="fill"
            :alt="video.title"
            sizes="sm:400px"
            :modifiers="{
              assetuid: video.animated_poster.uid,
              versionuid: getCSImageVersion(video.animated_poster),
            }"
            loading="lazy"
            fetchpriority="auto"
            class="absolute w-full h-full z-10"
          />

          <NuxtImg
            v-if="video && video.poster"
            provider="contentstack"
            :src="video.poster?.filename"
            :quality="90"
            width="90"
            height="160"
            fit="fill"
            :alt="video?.title"
            format="pjpg"
            sizes="sm:400px md:800px lg:1600"
            :modifiers="{
              assetuid: video.poster?.uid,
              auto: 'avif',
              versionuid: getCSImageVersion(video.poster),
            }"
            loading="lazy"
            fetchpriority="auto"
            class="absolute w-full h-full z-20 thumb"
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
