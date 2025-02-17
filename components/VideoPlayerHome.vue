<script lang="ts" setup>
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
  video_id: {
    type: String,
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
        v-if="description"
        class="text-lg/8 text-gray-600 dark:text-gray-300 prose"
        v-bind="cslp && cslp?.description"
        v-html="description"
      />
    </template>

    <lite-youtube :videoid="video_id" v-if="video_id"></lite-youtube>
  </ULandingSection>
</template>
