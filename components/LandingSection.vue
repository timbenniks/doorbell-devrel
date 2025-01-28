<script lang="ts" setup>
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
  icon: {
    type: String,
  },
  align: {
    type: String,
  },
  image: {
    type: Object,
  },
  cslp: {
    type: Object,
  },
});
</script>

<template>
  <ULandingSection
    :title="title"
    :description="description"
    :align="align"
    :headline="headline"
  >
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
