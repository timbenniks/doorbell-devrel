<script setup lang="ts">
definePageMeta({
  layout: "auth",
  middleware: "auth",
});

useSeoMeta({
  title: "Login",
});

const providers = [
  {
    label: "Continue with GitHub",
    icon: "i-simple-icons-github",
    color: "white" as const,
    external: true,
    to: "/auth/github",
  },
];
</script>

<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <UAuthForm
      :providers="providers"
      title="Log in here"
      align="top"
      icon="i-heroicons-lock-closed"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ trailingIcon: 'i-heroicons-arrow-right-20-solid' }"
    >
      <template #description>
        Welcome to the Doorbell DevRel video creator.
      </template>
    </UAuthForm>
  </UCard>
</template>
