<script setup lang="ts">
import { getCSImageVersion } from "@/utils/getCSImageVersion";

defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  headline: {
    type: String,
  },
  image: {
    type: Object,
  },
  orientation: {
    type: String,
  },
  cslp: {
    type: Object,
  },
});
</script>

<template>
  <ULandingHero
    :orientation="orientation as 'vertical' | 'horizontal' | undefined"
  >
    <template #headline>
      <UBadge
        v-if="headline"
        variant="subtle"
        size="lg"
        class="relative rounded-full font-semibold"
      >
        <span v-bind="cslp?.headline">{{ headline }}</span>
      </UBadge>
    </template>

    <template #title>
      <h1
        v-bind="cslp?.title"
        class="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl"
      >
        {{ title }}
      </h1>
    </template>

    <template #description>
      <p
        v-bind="cslp?.description"
        class="mt-6 text-lg tracking-tight text-gray-600 dark:text-gray-300"
      >
        {{ description }}
      </p>
    </template>

    <NuxtImg
      v-if="image?.url"
      v-bind="cslp?.image"
      provider="contentstack"
      :src="image.filename"
      :quality="90"
      width="1577"
      height="795"
      fit="fill"
      alt="The Doorbell DevRel"
      format="pjpg"
      sizes="sm:400px md:800px lg:1600"
      :modifiers="{
        assetuid: image.uid,
        auto: 'avif',
        versionuid: getCSImageVersion(image),
      }"
      loading="eager"
      fetchpriority="high"
      class="rounded-lg"
    />
  </ULandingHero>
</template>
