<script setup lang="ts">
const { isHelpSlideoverOpen } = useDashboard();

const links = [
  {
    id: "videos",
    label: "Videos",
    icon: "i-heroicons-play",
    to: "/app",
  },
  {
    id: "avatars",
    label: "Avatars",
    to: "/app/avatars",
    icon: "i-heroicons-user",
  },
];

const groups = [
  {
    key: "links",
    label: "Go to",
    commands: links.map((link) => ({
      ...link,
    })),
  },
];
</script>

<template>
  <Head>
    <Script
      src="https://media-library.cloudinary.com/global/all.js"
      async
    ></Script>
  </Head>
  <UDashboardLayout>
    <UDashboardPanel
      :width="250"
      :resizable="{ min: 200, max: 300 }"
      collapsible
    >
      <UDashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }">
        <template #left>
          <div class="flex space-x-2 items-center">
            <UAvatar
              :as="NuxtImg"
              sizes="sm:60px"
              src="/logo.png"
              size="md"
              alt="Doorbell DevRel"
            />

            <span
              class="truncate text-gray-900 dark:text-white font-semibold text-xl"
              >Doorbell DevRel</span
            >
          </div>
        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <template #header>
          <UDashboardSearchButton />
        </template>

        <UDashboardSidebarLinks :links="links" />

        <UDivider />

        <div class="flex-1" />

        <UDivider class="sticky bottom-0" />

        <template #footer>
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />

    <HelpSlideover />

    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </UDashboardLayout>

  <UNotifications />
  <UModals />
</template>
