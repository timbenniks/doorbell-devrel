<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const {
  data: videos,
  refresh: refreshVideos,
  status: videosStatus,
} = useGetVideos();

const listRefreshing = ref(false);

async function refreshList() {
  listRefreshing.value = true;
  await refreshVideos();
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
          <UButton icon="i-heroicons-play" size="md" to="/videos/new"
            >New Video</UButton
          >
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <p v-if="videosStatus !== 'success'">Loading...</p>
        <p v-if="videos?.length === 0 && videosStatus === 'success'">
          No videos yet...

          <ULink
            to="/videos/new"
            active-class="text-primary"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Create one here.
          </ULink>
        </p>
        <VideosList v-else :data="videos" />
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style>
.blogpost:hover .thumb {
  opacity: 0;
}
</style>
