<script lang="ts" setup>
import { getCSImageVersion } from "@/utils/getCSImageVersion";

const props = defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  headline: {
    type: String,
  },
  icon: {
    type: String,
  },
  align: {
    type: String,
  },
  image: {
    type: Object,
  },
  features: {
    type: Array,
  },
  cslp: {
    type: Object,
  },
});

const computedFeatures = computed(() => {
  return props?.features.map((feature: any) => {
    const { icon, name, description, cslp } = feature.feature;

    return {
      icon,
      name,
      description,
      cslp,
    };
  });
});
</script>

<template>
  <ULandingSection
    :align="align"
    :features="computedFeatures"
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
      <p
        v-if="description"
        class="text-lg/8 text-gray-600 dark:text-gray-300"
        v-bind="cslp && cslp?.description"
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
      width="1000"
      height="700"
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
  </ULandingSection>
</template>
