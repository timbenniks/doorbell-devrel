<script setup lang="ts">
import { formatInTimeZone } from "date-fns-tz";

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
      :to="`/videos/${video.uid}`"
      :key="video.video_id"
      :title="video.title"
      :date="
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
      :badge="{ label: video.heygen_status }"
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
            :src="video.animated_poster.url"
            class="absolute w-full h-full z-10"
          />
          <img
            :src="video.poster.url"
            class="absolute w-full h-full z-20 thumb"
          />
        </div>
      </template>
    </UBlogPost>
  </UBlogList>
</template>
