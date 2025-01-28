<script setup lang="ts">
import type { Component } from "vue";

import NoComponent from "./NoComponent.vue";
import hero from "./Hero.vue";
import grid from "./Grid.vue";
import landing_section from "./LandingSection.vue";

type Mapping = {
  [name: string]: Component;
};

const mapping: Mapping = {
  hero,
  landing_section,
  grid,
};

function getComponentForName(name: string) {
  return mapping[name] ?? NoComponent;
}

interface ComponentEntry {
  [key: string]: {
    [key: string]: any;
  };
}

function mapComponentsToKV(components: ComponentEntry[]) {
  return components.map((obj: any) => {
    const entries = Object.entries(obj);
    const componentNameAndProps = entries && entries[0];

    let name = "";
    let props = null;

    if (componentNameAndProps && componentNameAndProps[0]) {
      name = componentNameAndProps[0];
    }

    if (componentNameAndProps && componentNameAndProps[1]) {
      props = componentNameAndProps[1];
    }

    return { name, props };
  });
}

const props = defineProps({
  page: {
    type: Object,
    required: true,
  },
});

const components = computed(() => {
  return mapComponentsToKV(props.page?.components);
});
</script>

<template>
  <section
    class="mb-12"
    v-if="page && page?.components"
    v-bind="page.cslp && page.cslp.components"
    :class="components.length === 0 ? 'visual-builder__empty-block-parent' : ''"
  >
    <component
      v-for="(component, index) in components"
      :is="getComponentForName(component?.name)"
      :key="(component?.props?._metadata.uid as string)"
      v-bind="component.props"
      :name="component?.name"
      :data-cslp="page.cslp && page.cslp[`components__${index}`]['data-cslp']"
    />
  </section>
</template>
