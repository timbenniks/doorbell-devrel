<script setup lang="ts">
const items = [
  [
    {
      label: "New Video",
      icon: "i-heroicons-play",
      to: "/new-video",
    },
  ],
];

definePageMeta({
  middleware: "auth",
});

const { data: videos } = useGetVideos();
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Videos" badge="4">
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
          <p>toolbar</p>
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
<VideosList :data="videos" />
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style>
.blogpost:hover .thumb {
  opacity: 0;
}
</style>
