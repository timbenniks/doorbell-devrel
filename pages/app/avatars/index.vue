<script setup lang="ts">
import { getCSImageVersion } from "@/utils/getCSImageVersion";

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
          <UButton icon="i-heroicons-user" size="md" to="/app/avatars/new"
            >New Avatar</UButton
          >
          <UButton
            :loading="false"
            icon="i-heroicons-play"
            size="md"
            to="/app/videos/new"
          >
            New Video
          </UButton>
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <UBlogList
          orientation="horizontal"
          :ui="{
            wrapper:
              'flex flex-col lg:grid grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-16',
          }"
        >
          <UBlogPost
            v-if="avatars"
            v-for="avatar in avatars"
            :key="avatar.uid"
            orientation="vertical"
            :description="`Voice: ${avatar.voice}`"
            :to="`/app/avatars/${avatar.uid}`"
            :title="avatar.avatar"
            :ui="{
              image: {
                wrapper:
                  'ring-1 ring-gray-200 dark:ring-gray-800 relative overflow-hidden aspect-[9/16] w-full rounded-lg pointer-events-none',
              },
            }"
          >
            <template #image>
              <NuxtImg
                v-if="avatar.thumbnail?.url"
                provider="contentstack"
                :src="avatar.thumbnail.filename"
                :quality="90"
                width="90"
                height="160"
                fit="fill"
                :alt="avatar.avatar"
                format="pjpg"
                sizes="sm:400px md:800px lg:1600"
                :modifiers="{
                  assetuid: avatar.thumbnail.uid,
                  auto: 'avif',
                  versionuid: getCSImageVersion(avatar.thumbnail),
                }"
                loading="lazy"
                fetchpriority="auto"
                class="rounded-lg w-full block"
              />
            </template>
          </UBlogPost>
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
