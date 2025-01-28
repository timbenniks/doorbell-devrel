<script setup lang="ts">
const links = computed(() => [
  {
    label: "About",
    to: "#about",
    icon: "i-heroicons-cube-transparent",
  },

  {
    label: "FAQ",
    to: "#faq",
    icon: "i-heroicons-question-mark-circle",
  },
]);

const NuxtImg = resolveComponent("NuxtImg");
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      <div class="flex space-x-2 items-center">
        <UAvatar
          :as="NuxtImg"
          sizes="sm:60px"
          src="/logo.png"
          size="lg"
          alt="Doorbell DevRel"
        />

        <span>Doorbell DevRel</span>
      </div>
    </template>

    <template #right>
      <UButton
        label="Sign in"
        color="white"
        variant="ghost"
        trailing-icon="i-heroicons-user"
        class="hidden lg:flex"
        to="/login"
      />
    </template>

    <template #panel>
      <UAsideLinks :links="links" />

      <UButton to="/login" label="Sign in" color="white" block class="mb-3" />
    </template>
  </UHeader>
</template>
