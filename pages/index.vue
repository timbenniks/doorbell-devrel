<script setup lang="ts">
definePageMeta({
  layout: "site",
});

const { data: page } = await useGetPage({
  contentTypeUid: "page",
  url: "/",
  referenceFieldPath: [
    "components.list.items.video",
    "components.list.items.avatar",
  ],
  locale: "en-us",
  replaceHtmlCslp: true,
});

useHead({
  script: [
    {
      type: "module",
      defer: true,
      src: "/youtube.js",
      tagPosition: "bodyClose",
    },
  ],
});

useSeoMeta({
  description: page.value?.meta?.description,
  title: page.value?.meta.title,
  ogImage: page.value?.meta?.image.url,
});
</script>

<template>
  <AppHeader
    v-if="page"
    :navigation="page.navigation"
    v-bind="page.cslp && page.cslp?.navigation"
  />

  <ComponentList v-if="page" :page="page" />
  <AppFooter />
</template>
