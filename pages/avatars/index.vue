<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const { data: avatars } = useGetAvatars();
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Videos" />

      <UDashboardToolbar>
        <template #left>
          <UButton icon="i-heroicons-user" size="md" to="/avatars/new"
            >New Avatar</UButton
          >
          <UButton
            :loading="false"
            icon="i-heroicons-play"
            size="md"
            to="/videos/new"
          >
            New Video
          </UButton>
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <UBlogList orientation="horizontal">
          <UBlogPost
            v-if="avatars"
            v-for="avatar in avatars"
            :key="avatar.uid"
            orientation="vertical"
            :description="`Voice: ${avatar.voice}`"
            :to="`/avatars/${avatar.uid}`"
            :title="avatar.avatar"
            :image="avatar.thumbnail.url"
            :ui="{
              image: {
                wrapper:
                  'ring-1 ring-gray-200 dark:ring-gray-800 relative overflow-hidden aspect-[960/720] w-full rounded-lg pointer-events-none',
              },
            }"
          />
        </UBlogList>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style>
.blogpost:hover .thumb {
  opacity: 0;
}
</style>
