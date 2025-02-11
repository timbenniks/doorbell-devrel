<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  rich_description: {
    type: String,
  },
  headline: {
    type: String,
  },
  grid: {
    type: Array,
  },
  navigation_id: {
    type: String,
  },
  cslp: {
    type: Object,
  },
});

const computedGrid = computed(() => {
  return props?.grid.map((item: any) => {
    return {
      title: item.item.title,
      icon: item.item.icon,
      description: item.item.description,
      orientation: item.item.orientation,
      cslp: item.item.cslp,
    };
  });
});
</script>

<template>
  <ULandingSection
    :description="description"
    :ui="{
      wrapper: 'py-12 sm:py-16',
    }"
    :id="navigation_id"
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
    <UPageGrid
      v-if="computedGrid.length > 0"
      id="about"
      class="scroll-mt-[calc(var(--header-height)+140px+128px+96px)]"
      v-bind="cslp && cslp.grid"
    >
      <ULandingCard
        v-for="(item, index) in computedGrid"
        :key="index"
        v-bind="item"
        :data-cslp="cslp && cslp[`grid__${index}`]['data-cslp']"
      >
        <template #title>
          <p
            v-bind="item.cslp && item.cslp.title"
            :name="item.title"
            class="text-gray-900 dark:text-white text-base font-bold truncate"
          >
            {{ item.title }}
          </p>
        </template>

        <template #description>
          <div
            class="text-[15px] text-gray-500 dark:text-gray-400 mt-1"
            v-bind="item.cslp && item.cslp.description"
          >
            {{ item.description }}
          </div>
        </template>
      </ULandingCard>
    </UPageGrid>
  </ULandingSection>
</template>
