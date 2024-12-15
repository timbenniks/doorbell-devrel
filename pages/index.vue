<script setup lang="ts">
import { format, fromUnixTime } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
const items = [
  [
    {
      label: "New Video",
      icon: "i-heroicons-play",
      to: "/new-video",
    },
  ],
];

definePageMeta({
  middleware: "auth",
});

const { data } = useEnhancedVideoList({ limit: 10 });
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Videos" badge="4">
        <template #right>
          <UDropdown :items="items">
            <UButton
              icon="i-heroicons-plus"
              size="md"
              class="ml-1.5 rounded-full"
            />
          </UDropdown>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <p>toolbar</p>
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
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
            :to="`/videos/${video.video_id}`"
            :key="video.video_id"
            :title="video.video_title"
            :date="
              formatInTimeZone(
                fromUnixTime(video.created_at),
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
            :badge="{ label: video.data.status }"
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
                  :src="video.data.gif_url"
                  class="absolute w-full h-full z-10"
                />
                <img
                  :src="video.data.thumbnail_url"
                  class="absolute w-full h-full z-20 thumb"
                />
              </div>
            </template>
          </UBlogPost>
        </UBlogList>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style>
.blogpost:hover .thumb {
  opacity: 0;
}
</style>
