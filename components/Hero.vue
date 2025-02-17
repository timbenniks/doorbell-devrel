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
  navigation_id: {
    type: String,
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
    :id="navigation_id"
    :orientation="orientation as 'vertical' | 'horizontal' | undefined"
    :links="computedlinks"
    :ui="{
      wrapper: 'py-12 sm:py-16 md:py-20',
    }"
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
      <template v-if="cslp">
        <span v-bind="cslp && cslp?.title">{{ title }}</span>
      </template>
      <template v-else>{{ title }}</template>
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
      provider="cloudinary"
      :src="image.url"
      width="1577"
      height="795"
      alt="The Doorbell DevRel"
      sizes="sm:400px lg:1200px"
      loading="eager"
      fit="fill"
      fetchpriority="high"
      class="rounded-lg"
      densities="x1"
    />

    <ImagePlaceholder
      v-if="!image?.url && !no_image"
      v-bind="cslp && cslp?.image"
    />
  </ULandingHero>
</template>
