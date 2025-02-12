<script lang="ts" setup>
import { formatInTimeZone } from "date-fns-tz";

defineProps({
  title: {
    type: String,
  },
  rich_description: {
    type: String,
  },
  headline: {
    type: String,
  },
  orientation: {
    type: String,
    default: "horizontal",
  },
  items: {
    type: Array,
  },
  navigation_id: {
    type: String,
  },
  cslp: {
    type: Object,
  },
});
</script>

<template>
  <ULandingSection
    :id="navigation_id"
    :ui="{
      wrapper: 'py-12 sm:py-16',
    }"
  >
    <template #headline>
      <p
        v-if="headline"
        class="block text-base/7 font-semibold text-primary"
        v-bind="cslp && cslp?.headline"
      >
        {{ headline }}
      </p>
    </template>

    <template #title>
      <template v-if="cslp">
        <span v-bind="cslp && cslp?.title">{{ title }}</span>
      </template>
      <template v-else>{{ title }}</template>
    </template>

    <template #description>
      <div
        v-if="rich_description"
        class="text-lg/8 text-gray-600 dark:text-gray-300 prose"
        v-bind="cslp && cslp?.rich_description"
        v-html="rich_description"
      />
    </template>

    <UBlogList
      :orientation="orientation"
      :ui="{
        wrapper:
          'flex flex-col lg:grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-16',
      }"
      v-bind="cslp && cslp.items"
    >
      <UBlogPost
        v-bind="cslp && cslp?.description"
        class="blogpost"
        v-for="(video, index) in items"
        :data-cslp="cslp && cslp[`items__${index}`]['data-cslp']"
        :to="`/app/videos/share/${video.uid}`"
        :key="video.video_id"
        :title="video.title"
        :badge="{
          label: 'Doorbell DevRel',
          color: 'blue',
        }"
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
              src: 'https://res.cloudinary.com/dwfcofnrd/image/fetch/f_auto,q_auto/w_60,h_60/https://avatars.githubusercontent.com/u/121096?v=4',
              alt: 'Tim Benniks',
              loading: 'lazy',
            },
          },
        ]"
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
              v-if="video.poster?.url"
              provider="cloudinary"
              :src="video.poster.url"
              width="90"
              height="160"
              fit="fill"
              :alt="video.title"
              sizes="280px"
              loading="lazy"
              class="rounded-lg w-full block"
              densities="x1"
            />
          </div>
        </template>
      </UBlogPost>
    </UBlogList>
  </ULandingSection>
</template>
