<script setup lang="ts">
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
  image: {
    type: Object,
  },
  orientation: {
    type: String,
  },
  links: {
    type: Object,
  },
  no_image: {
    type: Boolean,
  },
  no_links: {
    type: Boolean,
  },
  cslp: {
    type: Object,
  },
});

const computedlinks = computed(() => {
  return props?.links.map((link: any) => {
    return {
      label: link.link.label,
      icon: link.link.icon,
      color: link.link.color,
      to: link.link.link.href,
      size: "xl",
    };
  });
});
</script>

<template>
  <ULandingHero
    :orientation="orientation as 'vertical' | 'horizontal' | undefined"
    :links="computedlinks"
  >
    <template #headline>
      <UBadge
        v-if="headline"
        variant="subtle"
        size="lg"
        class="relative rounded-full font-semibold"
      >
        <span v-bind="cslp && cslp?.headline">{{ headline }}</span>
      </UBadge>
    </template>

    <template #title>
      <h1
        v-bind="cslp && cslp?.title"
        class="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl"
      >
        {{ title }}
      </h1>
    </template>

    <template #description>
      <p
        v-bind="cslp && cslp?.description"
        class="mt-6 text-lg tracking-tight text-gray-600 dark:text-gray-300"
      >
        {{ description }}
      </p>
    </template>

    <template #links>
      <div
        class="flex space-x-4 mt-8"
        v-if="!no_links"
        v-bind="cslp && cslp?.links"
        :class="links?.length === 0 ? 'visual-builder__empty-block-parent' : ''"
      >
        <UButton
          v-for="(link, index) in computedlinks"
          :key="index"
          v-bind="link"
          class="flex items-center space-x-2"
          :data-cslp="cslp && cslp[`links__${index}`]['data-cslp']"
        />
      </div>
    </template>

    <NuxtImg
      v-if="image?.url && !no_image"
      v-bind="cslp && cslp?.image"
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

    <ImagePlaceholder
      v-if="!image?.url && !no_image"
      v-bind="cslp && cslp?.image"
    />
  </ULandingHero>
</template>
