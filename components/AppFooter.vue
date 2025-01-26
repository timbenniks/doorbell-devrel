<template>
  <UFooter>
    <template #left>
      <p class="text-sm">
        Doorbell DevRel by Tim Benniks<br />
        <span class="text-gray-500 dark:text-gray-400 text-xs"
          >Copyright © {{ new Date().getFullYear() }}. All rights
          reserved.</span
        >
      </p>
    </template>

    <template #right>
      <UColorModeButton size="sm" />

      <UButton
        to="https://github.com/timbenniks/doorbell-devrel"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="gray"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
