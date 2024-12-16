<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const {
  data: videos,
  refresh: refreshVideos,
  status: videosStatus,
} = useGetVideos();

const {
  data: processing,
  refresh: refreshProcessing,
  status: processingStatus,
} = useProcessingVideos({
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
      <UDashboardNavbar title="Videos" />

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
        <p>{{ videosStatus }}</p>
        <p>{{ processingStatus }}</p>
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
