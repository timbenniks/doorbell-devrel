<script lang="ts" setup>
import { formatInTimeZone } from "date-fns-tz";
import { getCSImageVersion } from "@/utils/getCSImageVersion";

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
      <h3
        v-bind="cslp && cslp?.title"
        class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl"
        v-if="title"
      >
        {{ title }}
      </h3>
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
              provider="contentstack"
              :src="video.poster.filename"
              :quality="90"
              width="90"
              height="160"
              fit="fill"
              :alt="video.title"
              format="pjpg"
              sizes="sm:400px"
              :modifiers="{
                assetuid: video.poster.uid,
                auto: 'avif',
                versionuid: getCSImageVersion(video.poster),
              }"
              loading="lazy"
              fetchpriority="auto"
              class="rounded-lg w-full block"
            />
          </div>
        </template>
      </UBlogPost>
    </UBlogList>
  </ULandingSection>
</template>
