<script setup lang="ts">
const { isHelpSlideoverOpen } = useDashboard();

const links = [
  {
    id: "videos",
    label: "Videos",
    icon: "i-heroicons-play",
    to: "/",
  },
  {
    id: "avatars",
    label: "Avatars",
    to: "/avatars",
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
  <UDashboardLayout>
    <UDashboardPanel
      :width="250"
      :resizable="{ min: 200, max: 300 }"
      collapsible
    >
      <UDashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }">
        <template #left>
          <span
            class="truncate text-gray-900 dark:text-white font-semibold text-xl"
          >
            Doorbell DevRel
          </span>
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
</template>
