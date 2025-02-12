<script setup lang="ts">
const NuxtImg = resolveComponent("NuxtImg");

const props = defineProps({
  navigation: {
    type: Array,
  },
});

const links = computed(() => {
  return props.navigation.map((item) => ({
    label: item.link.title,
    to: item.link.id_on_page,
  }));
});
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
          loading="eager"
          alt="Logo of the Doorbell DevRel by Tim Benniks"
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
