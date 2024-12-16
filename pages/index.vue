<script setup lang="ts">
const items = [
  [
    {
      label: "New Video",
      icon: "i-heroicons-play",
      to: "https://app.heygen.com/create-v3/draft?vt=p",
      target: "_blank",
    },
  ],
];

definePageMeta({
  middleware: "auth",
});

const { data: videos, refresh: refreshVideos } = useGetVideos();
const { data: processing, refresh: refreshProcessing } = useProcessingVideos({
  limit: 2,
});
const listRefreshing = ref(false);

async function refreshList() {
  listRefreshing.value = true;
  await refreshVideos();
  await refreshProcessing();
  listRefreshing.value = false;
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Videos">
        <template #right>
          <UDropdown :items="items">
            <UButton
              icon="i-heroicons-plus"
              size="md"
              class="ml-1.5 rounded-full"
            />
          </UDropdown>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <UButton
            :loading="listRefreshing"
            icon="i-heroicons-arrow-path-20-solid"
            size="md"
            @click="refreshList()"
          >
            Refresh list
          </UButton>
          <UButton
            icon="i-heroicons-play"
            size="md"
            to="https://app.heygen.com/create-v3/draft?vt=p"
            target="_blank"
            >New Video</UButton
          >
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <VideosList :processing="processing && processing[0]" :data="videos" />
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style>
.blogpost:hover .thumb {
  opacity: 0;
}
</style>
