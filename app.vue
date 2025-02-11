<script setup lang="ts">
const colorMode = useColorMode();

const color = computed(() =>
  colorMode.value === "dark" ? "#111827" : "white"
);

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { key: "theme-color", name: "theme-color", content: color },
  ],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en",
  },
});

const title = "Doorbell DevRel";
const description = "Doorbell DevRel";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.visual-builder__empty-block {
  border: 2px dashed #e879f9;
  background-color: rgba(232, 121, 249, 0.2);
  padding: 0.5rem !important;
  align-items: start !important;
  justify-content: start !important;
  gap: 0.5rem !important;
  min-height: fit-content !important;
}

.visual-builder__empty-block-title {
  color: #fff !important;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 100px;
}
</style>
