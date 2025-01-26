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
</script>

<template>
  <AppHeader />
  <ComponentList v-if="page" :page="page" />
  <AppFooter />

  <!-- <Hero />
  <TextImage />
  <List />
  <Grid />
   -->
</template>
