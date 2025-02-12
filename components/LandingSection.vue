<script lang="ts" setup>
import { getCSImageVersion } from "@/utils/getCSImageVersion";

const props = defineProps({
  title: {
    type: String,
  },
  rich_description: {
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
  navigation_id: {
    type: String,
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
    :id="navigation_id"
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

    <NuxtImg
      v-if="image?.url"
      v-bind="cslp?.image"
      provider="cloudinary"
      :src="image.url"
      width="1000"
      height="700"
      fit="fill"
      alt="The Doorbell DevRel"
      sizes="sm:100vw md:300px lg:500px"
      loading="lazy"
      class="rounded-lg"
      densities="x1"
    />
  </ULandingSection>
</template>
