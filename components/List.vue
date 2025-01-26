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
    image: "i-heroicons-lock-closed",
  },
  {
    title: "Fast",
    description:
      "Qui reprehenderit nostrud dolore nisi ad fugiat labore eiusmod sint aliquip nisi voluptate.",
    image: "i-heroicons-rocket-launch",
  },
  {
    title: "Affordable",
    description: "Reprehenderit fugiat elit in do ipsum ut pariatur.",
    image: "i-heroicons-currency-dollar",
  },
  {
    title: "Scalable",
    description:
      "Lorem deserunt et eiusmod. Ea in consectetur minim officia ullamco enim deserunt est.",
    image: "i-heroicons-chart-bar",
  },
]);
</script>

<template>
  <ULandingSection
    title="page.features.title"
    description="page.features.description"
    headline="page.features.headline"
  >
    <UBlogList orientation="horizontal">
      <UBlogPost
        title="Nuxt 3.9"
        description="Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server components, new composables, a new loading API and more."
        date="Dec 25, 2023"
        orientation="vertical"
        :image="{ src: 'https://picsum.photos/640/360', alt: 'Nuxt 3.9' }"
        :authors="[
          {
            name: 'Daniel Roe',
            avatar: { src: 'https://github.com/danielroe.png' },
            to: 'https://twitter.com/danielcroe',
            target: '_blank',
          },
        ]"
        :badge="{ label: 'Release' }"
      />
      <UBlogPost
        title="Nuxt 3.9"
        description="Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive server components, new composables, a new loading API and more."
        date="Dec 25, 2023"
        orientation="vertical"
        :image="{ src: 'https://picsum.photos/640/360', alt: 'Nuxt 3.9' }"
        :authors="[
          {
            name: 'Daniel Roe',
            avatar: { src: 'https://github.com/danielroe.png' },
            to: 'https://twitter.com/danielcroe',
            target: '_blank',
          },
        ]"
        :badge="{ label: 'Release' }"
      />
    </UBlogList>
  </ULandingSection>
</template>
