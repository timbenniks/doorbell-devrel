<script lang="ts" setup>
const items = ref([
  {
    title: "Easy to use",
    description:
      "Id laborum laboris duis nostrud excepteur ut velit nulla magna Lorem proident non.",
    icon: "i-heroicons-cog",
  },
  {
    title: "Reliable",
    description:
      "Magna Lorem ex cillum fugiat ad enim aute irure sit duis minim.",
    icon: "i-heroicons-check",
  },
  {
    title: "Secure",
    description:
      "Proident nostrud excepteur sint ut culpa consectetur aute adipisicing non anim ullamco.",
    icon: "i-heroicons-lock-closed",
  },
  {
    title: "Fast",
    description:
      "Qui reprehenderit nostrud dolore nisi ad fugiat labore eiusmod sint aliquip nisi voluptate.",
    icon: "i-heroicons-rocket-launch",
  },
  {
    title: "Affordable",
    description: "Reprehenderit fugiat elit in do ipsum ut pariatur.",
    icon: "i-heroicons-currency-dollar",
  },
  {
    title: "Scalable",
    description:
      "Lorem deserunt et eiusmod. Ea in consectetur minim officia ullamco enim deserunt est.",
    icon: "i-heroicons-chart-bar",
  },
]);
</script>

<template>
  <ULandingSection
    title="page.features.title"
    description="page.features.description"
    headline="page.features.headline"
  >
    <UPageGrid
      id="about"
      class="scroll-mt-[calc(var(--header-height)+140px+128px+96px)]"
    >
      <ULandingCard v-for="(item, index) in items" :key="index" v-bind="item" />
    </UPageGrid>
  </ULandingSection>
</template>
