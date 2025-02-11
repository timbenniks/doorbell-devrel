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
  <AppHeader
    v-if="page"
    :navigation="page.navigation"
    v-bind="page.cslp && page.cslp?.navigation"
  />
  <ComponentList v-if="page" :page="page" />
  <AppFooter />
</template>
